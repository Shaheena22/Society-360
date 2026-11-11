import { Router, Request, Response } from 'express';
import { db, Complaint } from '../models/store';
import { CATEGORIES } from '../config/taxonomy';
import { AIService } from '../services/aiService';
import { RoutingEngine } from '../services/routingEngine';

const router = Router();

// GET all complaints with optional filtering
router.get('/', (req: Request, res: Response) => {
  const { category, status, priority, departmentId, ward } = req.query;

  let list = Array.from(db.complaints.values());

  if (category) list = list.filter(c => c.category === category);
  if (status) list = list.filter(c => c.status === status);
  if (priority) list = list.filter(c => c.priority === priority);
  if (departmentId) list = list.filter(c => c.departmentId === departmentId || c.coRoutedDepartments?.includes(departmentId as string));
  if (ward) list = list.filter(c => c.location.ward === ward);

  // Sort descending by creation date
  list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  res.json({ success: true, count: list.length, data: list });
});

// GET single complaint detail
router.get('/:id', (req: Request, res: Response) => {
  const complaint = db.complaints.get(req.params.id);
  if (!complaint) {
    return res.status(404).json({ success: false, message: 'Complaint not found' });
  }
  res.json({ success: true, data: complaint });
});

// POST Create new complaint (Generic)
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      reporterId,
      reporterName,
      category: categoryId,
      subcategory,
      customFields,
      rawDescription,
      inputMode,
      languageUsed,
      mediaUrls,
      location,
      priority: customPriority
    } = req.body;

    const lat = location?.lat || 17.1582;
    const lng = location?.lng || 76.8422;

    // Check for duplicates (FR-3.6-03)
    const duplicate = AIService.detectDuplicate(lat, lng, categoryId);

    // Process via AI Smart Complaint Generator (FR-3.3-01)
    const aiResult = await AIService.generateSmartDescription(rawDescription || 'Civic issue reported', languageUsed || 'English');

    const priority = customPriority || aiResult.priority;
    const routingInfo = RoutingEngine.assignDepartment(categoryId, priority);

    const now = new Date();
    const slaDeadline = new Date(now.getTime() + routingInfo.slaHours * 3600 * 1000).toISOString();

    const id = `CMP-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newComplaint: Complaint = {
      id,
      reporterId: reporterId || null,
      reporterName: reporterName || (reporterId ? 'Citizen User' : 'Anonymous Citizen'),
      category: categoryId,
      subcategory: subcategory || null,
      customFields: customFields || {},
      description: rawDescription || aiResult.structuredDescription,
      aiGeneratedDescription: aiResult.structuredDescription,
      inputMode: inputMode || 'text',
      languageUsed: languageUsed || 'English',
      mediaUrls: mediaUrls || [],
      location: {
        lat,
        lng,
        address: location?.address || 'Kalaburagi City',
        ward: location?.ward || 'Ward 1'
      },
      status: 'Submitted',
      priority,
      departmentId: routingInfo.primaryDeptId,
      coRoutedDepartments: routingInfo.coRoutedDepts,
      confirmations: reporterId ? [reporterId] : [],
      duplicateOf: duplicate ? duplicate.id : null,
      createdAt: now.toISOString(),
      slaDeadline,
      routingHistory: [
        {
          departmentId: routingInfo.primaryDeptId,
          timestamp: now.toISOString(),
          reason: `Auto-routed to ${routingInfo.primaryDeptId} based on taxonomy and location.`
        }
      ]
    };

    db.complaints.set(id, newComplaint);
    db.addAuditLog(reporterId || 'ANONYMOUS', 'citizen', 'CREATE_COMPLAINT', id, `Created complaint ${id} under category ${categoryId}`);

    res.status(201).json({
      success: true,
      message: duplicate ? `Complaint logged. Note: Potential duplicate of ${duplicate.id} detected within 100m.` : 'Complaint created and routed successfully.',
      isDuplicate: !!duplicate,
      duplicateId: duplicate ? duplicate.id : null,
      data: newComplaint
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST Voice Complaint Pipeline (FR-3.2)
router.post('/voice', async (req: Request, res: Response) => {
  try {
    const { audioData, languageHint, reporterId, location } = req.body;

    const transcription = await AIService.transcribeAudio(audioData || '', languageHint || 'English');
    const aiResult = await AIService.generateSmartDescription(transcription.text, transcription.detectedLanguage);

    res.json({
      success: true,
      transcription: transcription.text,
      detectedLanguage: transcription.detectedLanguage,
      suggestedCategory: aiResult.suggestedCategory,
      aiGeneratedDescription: aiResult.structuredDescription,
      priority: aiResult.priority
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST Photo Category Detection (FR-3.4)
router.post('/photo-detect', async (req: Request, res: Response) => {
  try {
    const { imageUrl } = req.body;
    const classification = await AIService.classifyImage(imageUrl || '');
    res.json({
      success: true,
      data: classification
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST Community Verification Confirm (FR-3.6-01)
router.post('/:id/confirm', (req: Request, res: Response) => {
  const complaint = db.complaints.get(req.params.id);
  const { userId } = req.body;

  if (!complaint) {
    return res.status(404).json({ success: false, message: 'Complaint not found' });
  }

  if (!Array.isArray(complaint.confirmations)) {
    complaint.confirmations = [];
  }

  const effectiveUserId = userId || 'usr-citizen-1';

  if (!complaint.confirmations.includes(effectiveUserId)) {
    complaint.confirmations.push(effectiveUserId);
    
    // Award citizen verification reward points (FR-3.11-01)
    const user = db.users.get(effectiveUserId);
    if (user) {
      user.points = (user.points || 0) + 10;
      if (user.points >= 500) user.badge = 'Platinum';
      else if (user.points >= 300) user.badge = 'Gold';
      else if (user.points >= 150) user.badge = 'Silver';
    }
  } else {
    // Toggle off if already confirmed
    complaint.confirmations = complaint.confirmations.filter(u => u !== effectiveUserId);
  }

  res.json({ success: true, count: complaint.confirmations.length, data: complaint });
});

// PATCH Update status (Staff / Admin RBAC)
router.patch('/:id/status', (req: Request, res: Response) => {
  const complaint = db.complaints.get(req.params.id);
  const { status, resolutionNotes, resolutionMediaUrls, actorId } = req.body;

  if (!complaint) {
    return res.status(404).json({ success: false, message: 'Complaint not found' });
  }

  complaint.status = status;
  if (status === 'Resolved') {
    complaint.resolvedAt = new Date().toISOString();
    complaint.resolutionNotes = resolutionNotes || 'Issue addressed by municipal staff.';
    complaint.resolutionMediaUrls = resolutionMediaUrls || [];

    // Award reporter points for resolution (FR-3.11-01)
    if (complaint.reporterId) {
      const reporter = db.users.get(complaint.reporterId);
      if (reporter) {
        reporter.points += 50;
        if (reporter.points >= 500) reporter.badge = 'Platinum';
        else if (reporter.points >= 300) reporter.badge = 'Gold';
      }
    }
  }

  db.addAuditLog(actorId || 'STAFF', 'staff', 'UPDATE_STATUS', complaint.id, `Status updated to ${status}`);

  res.json({ success: true, data: complaint });
});

// POST Citizen Verify Resolution
router.post('/:id/verify-resolution', (req: Request, res: Response) => {
  const complaint = db.complaints.get(req.params.id);
  const { userId, feedbackNotes } = req.body;

  if (!complaint) {
    return res.status(404).json({ success: false, message: 'Complaint not found' });
  }

  complaint.status = 'Verified Resolved';
  complaint.citizenResolutionVerified = true;
  complaint.citizenVerifiedAt = new Date().toISOString();
  complaint.citizenFeedback = feedbackNotes || 'Citizen verified satisfactory resolution on the ground.';

  const user = db.users.get(userId || 'usr-citizen-1');
  if (user) {
    user.points = (user.points || 0) + 25;
  }

  db.addAuditLog(userId || 'CITIZEN', 'citizen', 'VERIFY_RESOLUTION', complaint.id, 'Citizen confirmed resolution on-site');

  res.json({ success: true, message: 'Resolution verified by citizen! +25 Citizen Points awarded.', data: complaint });
});

// POST Citizen Dispute False Resolution
router.post('/:id/dispute', (req: Request, res: Response) => {
  const complaint = db.complaints.get(req.params.id);
  const { userId, disputeReason, disputePhotoUrl } = req.body;

  if (!complaint) {
    return res.status(404).json({ success: false, message: 'Complaint not found' });
  }

  complaint.status = 'Disputed / Re-Opened';
  complaint.isDisputed = true;
  complaint.disputeReason = disputeReason || 'Citizen reported issue is NOT resolved despite officer claim.';
  complaint.disputePhotoUrl = disputePhotoUrl || '';
  complaint.disputedAt = new Date().toISOString();
  complaint.escalationLevel = 'High (Vigilance & Super Admin Alert)';
  complaint.slaTarget = new Date(Date.now() + 12 * 3600 * 1000).toISOString();

  db.addAuditLog(userId || 'CITIZEN', 'citizen', 'DISPUTE_RESOLUTION', complaint.id, `Citizen disputed resolution: ${disputeReason || 'Unresolved'}`);

  res.json({
    success: true,
    message: 'False resolution disputed! Issue has been Re-Opened and escalated to Super Admin & Department Head Vigilance.',
    data: complaint
  });
});

// POST Feedback (FR-3.7-04)
router.post('/:id/feedback', (req: Request, res: Response) => {
  const complaint = db.complaints.get(req.params.id);
  const { rating, comments } = req.body;

  if (!complaint) {
    return res.status(404).json({ success: false, message: 'Complaint not found' });
  }

  complaint.feedbackRating = rating;
  complaint.feedbackComments = comments;

  res.json({ success: true, data: complaint });
});

export default router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_1 = require("../models/store");
const aiService_1 = require("../services/aiService");
const routingEngine_1 = require("../services/routingEngine");
const router = (0, express_1.Router)();
// GET all complaints with optional filtering
router.get('/', (req, res) => {
    const { category, status, priority, departmentId, ward } = req.query;
    let list = Array.from(store_1.db.complaints.values());
    if (category)
        list = list.filter(c => c.category === category);
    if (status)
        list = list.filter(c => c.status === status);
    if (priority)
        list = list.filter(c => c.priority === priority);
    if (departmentId)
        list = list.filter(c => c.departmentId === departmentId || c.coRoutedDepartments?.includes(departmentId));
    if (ward)
        list = list.filter(c => c.location.ward === ward);
    // Sort descending by creation date
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json({ success: true, count: list.length, data: list });
});
// GET single complaint detail
router.get('/:id', (req, res) => {
    const complaint = store_1.db.complaints.get(req.params.id);
    if (!complaint) {
        return res.status(404).json({ success: false, message: 'Complaint not found' });
    }
    res.json({ success: true, data: complaint });
});
// POST Create new complaint (Generic)
router.post('/', async (req, res) => {
    try {
        const { reporterId, reporterName, category: categoryId, rawDescription, inputMode, languageUsed, mediaUrls, location } = req.body;
        const lat = location?.lat || 17.1582;
        const lng = location?.lng || 76.8422;
        // Check for duplicates (FR-3.6-03)
        const duplicate = aiService_1.AIService.detectDuplicate(lat, lng, categoryId);
        // Process via AI Smart Complaint Generator (FR-3.3-01)
        const aiResult = await aiService_1.AIService.generateSmartDescription(rawDescription || 'Civic issue reported', languageUsed || 'English');
        const priority = aiResult.priority;
        const routingInfo = routingEngine_1.RoutingEngine.assignDepartment(categoryId, priority);
        const now = new Date();
        const slaDeadline = new Date(now.getTime() + routingInfo.slaHours * 3600 * 1000).toISOString();
        const id = `CMP-2026-${Math.floor(100 + Math.random() * 900)}`;
        const newComplaint = {
            id,
            reporterId: reporterId || null,
            reporterName: reporterName || (reporterId ? 'Citizen User' : 'Anonymous Citizen'),
            category: categoryId,
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
        store_1.db.complaints.set(id, newComplaint);
        store_1.db.addAuditLog(reporterId || 'ANONYMOUS', 'citizen', 'CREATE_COMPLAINT', id, `Created complaint ${id} under category ${categoryId}`);
        res.status(201).json({
            success: true,
            message: duplicate ? `Complaint logged. Note: Potential duplicate of ${duplicate.id} detected within 100m.` : 'Complaint created and routed successfully.',
            isDuplicate: !!duplicate,
            duplicateId: duplicate ? duplicate.id : null,
            data: newComplaint
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// POST Voice Complaint Pipeline (FR-3.2)
router.post('/voice', async (req, res) => {
    try {
        const { audioData, languageHint, reporterId, location } = req.body;
        const transcription = await aiService_1.AIService.transcribeAudio(audioData || '', languageHint || 'English');
        const aiResult = await aiService_1.AIService.generateSmartDescription(transcription.text, transcription.detectedLanguage);
        res.json({
            success: true,
            transcription: transcription.text,
            detectedLanguage: transcription.detectedLanguage,
            suggestedCategory: aiResult.suggestedCategory,
            aiGeneratedDescription: aiResult.structuredDescription,
            priority: aiResult.priority
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// POST Photo Category Detection (FR-3.4)
router.post('/photo-detect', async (req, res) => {
    try {
        const { imageUrl } = req.body;
        const classification = await aiService_1.AIService.classifyImage(imageUrl || '');
        res.json({
            success: true,
            data: classification
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// POST Community Verification Confirm (FR-3.6-01)
router.post('/:id/confirm', (req, res) => {
    const complaint = store_1.db.complaints.get(req.params.id);
    const { userId } = req.body;
    if (!complaint) {
        return res.status(404).json({ success: false, message: 'Complaint not found' });
    }
    if (userId && !complaint.confirmations.includes(userId)) {
        complaint.confirmations.push(userId);
        // Award citizen verification reward points (FR-3.11-01)
        const user = store_1.db.users.get(userId);
        if (user) {
            user.points += 10;
            if (user.points >= 500)
                user.badge = 'Platinum';
            else if (user.points >= 300)
                user.badge = 'Gold';
            else if (user.points >= 150)
                user.badge = 'Silver';
        }
    }
    res.json({ success: true, count: complaint.confirmations.length, data: complaint });
});
// PATCH Update status (Staff / Admin RBAC)
router.patch('/:id/status', (req, res) => {
    const complaint = store_1.db.complaints.get(req.params.id);
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
            const reporter = store_1.db.users.get(complaint.reporterId);
            if (reporter) {
                reporter.points += 50;
                if (reporter.points >= 500)
                    reporter.badge = 'Platinum';
                else if (reporter.points >= 300)
                    reporter.badge = 'Gold';
            }
        }
    }
    store_1.db.addAuditLog(actorId || 'STAFF', 'staff', 'UPDATE_STATUS', complaint.id, `Status updated to ${status}`);
    res.json({ success: true, data: complaint });
});
// POST Feedback (FR-3.7-04)
router.post('/:id/feedback', (req, res) => {
    const complaint = store_1.db.complaints.get(req.params.id);
    const { rating, comments } = req.body;
    if (!complaint) {
        return res.status(404).json({ success: false, message: 'Complaint not found' });
    }
    complaint.feedbackRating = rating;
    complaint.feedbackComments = comments;
    res.json({ success: true, data: complaint });
});
exports.default = router;

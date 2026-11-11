const express = require('express');
const { db } = require('../models/store');

const router = express.Router();

// ==========================================
// 1. ANONYMOUS SAFETY MODE
// ==========================================
router.post('/safety/trigger', (req, res) => {
  const { userId, location, voicePhrase } = req.body;

  const user = userId ? db.users.get(userId) : null;
  const contacts = user ? user.trustedContacts : ['Emergency Helpline 112'];

  const alertLog = {
    id: `ALERT-${Date.now()}`,
    userId: userId || 'ANONYMOUS',
    userName: user ? user.name : 'Discreet Citizen Alert',
    location: location || { lat: 17.1582, lng: 76.8422, address: 'Kalaburagi City Center' },
    phraseUsed: voicePhrase || 'Voice Phrase Activated',
    notifiedContacts: contacts,
    timestamp: new Date().toISOString(),
    status: 'DISPATCHED_TO_TRUSTED_CONTACTS'
  };

  db.addAuditLog('SAFETY_TRIGGER', 'citizen', 'EMERGENCY_ALERT', alertLog.id, `Emergency alert triggered via voice phrase.`);

  res.json({
    success: true,
    message: 'Emergency Safety Alert dispatched instantly to trusted contacts.',
    data: alertLog
  });
});

// ==========================================
// 2. BLOOD DONOR REQUEST BOARD
// ==========================================
router.get('/blood', (req, res) => {
  const { bloodGroup, urgency } = req.query;

  let requests = Array.from(db.bloodRequests.values()).filter(b => b.status === 'Active');
  if (bloodGroup) requests = requests.filter(b => b.bloodGroup === bloodGroup);
  if (urgency) requests = requests.filter(b => b.urgency === urgency);

  const matchingDonors = Array.from(db.users.values()).filter(u => u.donorProfile && u.donorProfile.available);

  res.json({ success: true, count: requests.length, data: requests, matchingDonorsCount: matchingDonors.length });
});

router.post('/blood', (req, res) => {
  const { requesterId, requesterName, bloodGroup, hospital, location, urgency, unitsNeeded, contactPhone } = req.body;

  const id = `BLD-${Math.floor(100 + Math.random() * 900)}`;
  const newRequest = {
    id,
    requesterId: requesterId || 'usr-citizen-1',
    requesterName: requesterName || 'Citizen Requester',
    bloodGroup: bloodGroup || 'O+',
    hospital: hospital || 'District Hospital',
    location: location || 'Kalaburagi',
    urgency: urgency || 'High',
    unitsNeeded: unitsNeeded || 1,
    contactPhone: contactPhone || '+91 9876543210',
    status: 'Active',
    createdAt: new Date().toISOString()
  };

  db.bloodRequests.set(id, newRequest);

  const matchedDonors = Array.from(db.users.values()).filter(
    u => u.donorProfile && u.donorProfile.bloodGroup === bloodGroup && u.donorProfile.available
  );

  res.status(201).json({
    success: true,
    message: `Blood request posted. Broadcast dispatched to ${matchedDonors.length} matching opted-in donors nearby.`,
    matchedDonorsCount: matchedDonors.length,
    data: newRequest
  });
});

router.post('/blood/:id/fulfill', (req, res) => {
  const request = db.bloodRequests.get(req.params.id);
  if (!request) {
    return res.status(404).json({ success: false, message: 'Blood request not found' });
  }

  request.status = 'Fulfilled';
  res.json({ success: true, message: 'Blood request marked fulfilled.', data: request });
});

// Donor Opt-In
router.post('/blood/donor-optin', (req, res) => {
  const { userId, bloodGroup, location, contactPhone } = req.body;

  const user = db.users.get(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  user.donorProfile = {
    bloodGroup,
    available: true,
    location: location || 'Kalaburagi',
    contactPhone: contactPhone || user.phone
  };

  res.json({ success: true, message: 'Opted-in to Blood Donor Board.', user });
});

// ==========================================
// 3. COMMUNITY MEDICAL CAMP LOCATOR
// ==========================================
router.get('/medical-camps', (req, res) => {
  const camps = Array.from(db.medicalCamps.values());
  res.json({ success: true, data: camps });
});

router.post('/medical-camps', (req, res) => {
  const { organizerId, organizerName, title, location, ward, date, time, servicesOffered, contactPhone } = req.body;

  const id = `CMP-MED-${Math.floor(10 + Math.random() * 90)}`;
  const newCamp = {
    id,
    organizerId: organizerId || 'usr-organizer-1',
    organizerName: organizerName || 'Registered NGO',
    verified: true,
    title: title || 'Free Medical Health Camp',
    location: location || 'Kalaburagi Center',
    ward: ward || 'Ward 1',
    date: date || '2026-08-15',
    time: time || '10:00 AM - 04:00 PM',
    servicesOffered: servicesOffered || ['General Physician Checkup', 'Blood Pressure Check'],
    contactPhone: contactPhone || '+91 8472250100',
    remindersCount: 0,
    createdAt: new Date().toISOString()
  };

  db.medicalCamps.set(id, newCamp);
  res.status(201).json({ success: true, message: 'Medical camp published.', data: newCamp });
});

router.post('/medical-camps/:id/reminder', (req, res) => {
  const camp = db.medicalCamps.get(req.params.id);
  if (!camp) {
    return res.status(404).json({ success: false, message: 'Camp not found' });
  }

  camp.remindersCount++;
  res.json({ success: true, message: 'Reminder set for Medical Camp.', remindersCount: camp.remindersCount });
});

module.exports = router;

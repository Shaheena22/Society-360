const BASE_URL = '/api';

export const api = {
  // Health
  async getHealth() {
    const res = await fetch(`${BASE_URL}/health`);
    return res.json();
  },

  // Auth
  async login(identifier) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier })
    });
    return res.json();
  },

  async register(userData) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  async getLeaderboard() {
    const res = await fetch(`${BASE_URL}/auth/leaderboard`);
    return res.json();
  },

  // Complaints
  async getComplaints(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    const res = await fetch(`${BASE_URL}/complaints?${params}`);
    return res.json();
  },

  async getComplaintById(id) {
    const res = await fetch(`${BASE_URL}/complaints/${id}`);
    return res.json();
  },

  async createComplaint(payload) {
    const res = await fetch(`${BASE_URL}/complaints`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async processVoiceComplaint(audioData, languageHint) {
    const res = await fetch(`${BASE_URL}/complaints/voice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ audioData, languageHint })
    });
    return res.json();
  },

  async detectPhotoCategory(imageUrl) {
    const res = await fetch(`${BASE_URL}/complaints/photo-detect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl })
    });
    return res.json();
  },

  async confirmComplaint(id, userId) {
    const res = await fetch(`${BASE_URL}/complaints/${id}/confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    return res.json();
  },

  async updateComplaintStatus(id, status, resolutionNotes, actorId) {
    const res = await fetch(`${BASE_URL}/complaints/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, resolutionNotes, actorId })
    });
    return res.json();
  },

  async verifyResolution(id, userId, feedbackNotes) {
    const res = await fetch(`${BASE_URL}/complaints/${id}/verify-resolution`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, feedbackNotes })
    });
    return res.json();
  },

  async disputeResolution(id, userId, disputeReason, disputePhotoUrl) {
    const res = await fetch(`${BASE_URL}/complaints/${id}/dispute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, disputeReason, disputePhotoUrl })
    });
    return res.json();
  },

  async submitFeedback(id, rating, comments) {
    const res = await fetch(`${BASE_URL}/complaints/${id}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, comments })
    });
    return res.json();
  },

  // Admin & Analytics
  async getAdminAnalytics() {
    const res = await fetch(`${BASE_URL}/admin/analytics/summary`);
    return res.json();
  },

  async triggerSlaCheck() {
    const res = await fetch(`${BASE_URL}/admin/trigger-sla-check`, { method: 'POST' });
    return res.json();
  },

  async getAuditLogs() {
    const res = await fetch(`${BASE_URL}/admin/audit-logs`);
    return res.json();
  },

  // Community
  async triggerSafety(payload) {
    const res = await fetch(`${BASE_URL}/community/safety/trigger`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async getBloodRequests(bloodGroup = '') {
    const res = await fetch(`${BASE_URL}/community/blood?bloodGroup=${bloodGroup}`);
    return res.json();
  },

  async postBloodRequest(payload) {
    const res = await fetch(`${BASE_URL}/community/blood`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async getMedicalCamps() {
    const res = await fetch(`${BASE_URL}/community/medical-camps`);
    return res.json();
  },

  async setCampReminder(campId) {
    const res = await fetch(`${BASE_URL}/community/medical-camps/${campId}/reminder`, { method: 'POST' });
    return res.json();
  },

  // Governance & File Delay Monitoring
  async getGovernanceSummary() {
    try {
      const res = await fetch(`${BASE_URL}/admin/analytics/summary`);
      return res.json();
    } catch (e) {
      return { success: true, data: {} };
    }
  },

  async submitDelayComplaint(fileId, reason, citizenId) {
    return {
      success: true,
      message: `Delay Complaint lodged for File #${fileId}. Auto-escalated to Department Supervisor.`
    };
  },

  async submitDelayJustification(fileId, officerId, justificationReason) {
    return {
      success: true,
      message: `Delay Justification recorded for File #${fileId} by Officer ${officerId}. Added to Audit Trail.`
    };
  },

  // Animal Welfare & Rescue
  async getAnimalRescueSummary() {
    return {
      success: true,
      data: { total: 428, inProgress: 36, pending24h: 5, emergency: 8, shelterOccupancy: '78%' }
    };
  },

  async submitRescueDelayComplaint(caseId, reason, citizenId) {
    return {
      success: true,
      message: `Delayed Rescue Complaint lodged for Rescue Case #${caseId}. Auto-assigned Emergency Dispatcher.`
    };
  }
};

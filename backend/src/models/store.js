const { CATEGORIES, DEPARTMENTS, MODULES } = require('../config/taxonomy');

class DataStore {
  constructor() {
    this.users = new Map();
    this.complaints = new Map();
    this.bloodRequests = new Map();
    this.medicalCamps = new Map();
    this.auditLogs = [];

    this.seedInitialData();
  }

  seedInitialData() {
    // Seed default users
    const defaultUsers = [
      {
        uid: 'usr-admin-1',
        name: 'Dr. Suresh Kumar (Admin)',
        phone: '+91 9845012345',
        email: 'admin@civic.gov.in',
        preferredLanguage: 'English',
        role: 'admin',
        points: 450,
        badge: 'Platinum',
        trustedContacts: ['+91 9845099999'],
        createdAt: new Date().toISOString()
      },
      {
        uid: 'usr-staff-roads',
        name: 'Er. Rajesh Sharma (Staff)',
        phone: '+91 9845012346',
        email: 'staff.roads@civic.gov.in',
        preferredLanguage: 'Kannada',
        role: 'staff',
        points: 120,
        badge: 'Silver',
        trustedContacts: [],
        createdAt: new Date().toISOString()
      },
      {
        uid: 'usr-citizen-1',
        name: 'Anita Deshmukh',
        phone: '+91 9876543210',
        email: 'anita.d@gmail.com',
        preferredLanguage: 'Kannada',
        role: 'citizen',
        points: 180,
        badge: 'Silver',
        trustedContacts: ['+91 9876543211', '+91 9876543212'],
        donorProfile: {
          bloodGroup: 'O+',
          available: true,
          location: 'Kalaburagi Central',
          contactPhone: '+91 9876543210'
        },
        createdAt: new Date().toISOString()
      }
    ];

    defaultUsers.forEach(u => this.users.set(u.uid, u));

    // Seed initial complaints across 8 modules
    const seedComplaints = [
      {
        id: 'CMP-2026-001',
        reporterId: 'usr-citizen-1',
        reporterName: 'Anita Deshmukh',
        category: 'pothole',
        moduleId: 'civic',
        description: 'Large deep crater pothole near Central University entrance road causing frequent traffic jams and motorcycle skids.',
        aiGeneratedDescription: 'High-severity road infrastructure hazard: ~1.5m crater pothole identified on University Main Access Road, Ward 12. Poses immediate risk to two-wheelers.',
        inputMode: 'voice',
        languageUsed: 'Kannada',
        mediaUrls: ['https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=600'],
        location: { lat: 17.1582, lng: 76.8422, address: 'Main Gate Road, CUK Campus, Kalaburagi', ward: 'Ward 12' },
        status: 'In Progress',
        priority: 'High',
        departmentId: 'dept-roads',
        confirmations: ['usr-citizen-1', 'usr-admin-1'],
        duplicateOf: null,
        createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
        slaDeadline: new Date(Date.now() + 12 * 3600 * 1000).toISOString(),
        routingHistory: [
          { departmentId: 'dept-roads', timestamp: new Date(Date.now() - 36 * 3600 * 1000).toISOString(), reason: 'Auto-assigned by Routing Engine based on pothole classification.' }
        ]
      },
      {
        id: 'CMP-2026-002',
        reporterId: 'usr-citizen-1',
        reporterName: 'Anita Deshmukh',
        category: 'poverty_hunger',
        moduleId: 'poverty',
        description: 'Severe food shortage reported at daily wage worker settlement near Railway Station.',
        aiGeneratedDescription: 'High-Urgency Food Insecurity Alert: 40+ migrant daily wage families requiring immediate ration supply in Ward 4 settlement.',
        inputMode: 'voice',
        languageUsed: 'Hindi',
        mediaUrls: [],
        location: { lat: 17.3297, lng: 76.8343, address: 'Railway Colony Settlement, Kalaburagi', ward: 'Ward 4' },
        status: 'Submitted',
        priority: 'High',
        departmentId: 'dept-poverty',
        confirmations: ['usr-citizen-1'],
        duplicateOf: null,
        createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
        slaDeadline: new Date(Date.now() + 8 * 3600 * 1000).toISOString(),
        routingHistory: [
          { departmentId: 'dept-poverty', timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString(), reason: 'Auto-assigned to Poverty Alleviation & Food Security Cell.' }
        ]
      },
      {
        id: 'CMP-2026-003',
        reporterId: null, // Anonymous
        category: 'corruption_bribery',
        moduleId: 'corruption',
        description: 'Public official demanding unauthorized cash bribe for issuing property tax clearance certificate.',
        aiGeneratedDescription: 'Anti-Corruption Complaint: Illegal cash demand of ₹2,000 reported at Zonal Tax Office. Anonymous submission.',
        inputMode: 'text',
        languageUsed: 'English',
        mediaUrls: [],
        location: { lat: 17.3341, lng: 76.8285, address: 'Zonal Municipal Tax Office, Ward 2', ward: 'Ward 2' },
        status: 'Submitted',
        priority: 'High',
        departmentId: 'dept-vigilance',
        confirmations: [],
        duplicateOf: null,
        createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
        slaDeadline: new Date(Date.now() + 10 * 3600 * 1000).toISOString(),
        routingHistory: [
          { departmentId: 'dept-vigilance', timestamp: new Date(Date.now() - 14 * 3600 * 1000).toISOString(), reason: 'Priority escalation to Vigilance Directorate.' }
        ]
      },
      {
        id: 'CMP-2026-004',
        reporterId: 'usr-citizen-1',
        reporterName: 'Anita Deshmukh',
        category: 'animal_rescue',
        moduleId: 'animal',
        description: 'Injured street dog hit by vehicle requiring urgent veterinary care.',
        aiGeneratedDescription: 'Animal Emergency: Injured canine suffering leg trauma near Super Market Circle. Requires immediate animal rescue & care.',
        inputMode: 'voice',
        languageUsed: 'Hindi',
        mediaUrls: ['https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=600'],
        location: { lat: 17.3341, lng: 76.8285, address: 'Super Market Circle, Ward 2', ward: 'Ward 2' },
        status: 'Resolved',
        priority: 'High',
        departmentId: 'dept-animal',
        confirmations: ['usr-citizen-1', 'usr-staff-roads'],
        duplicateOf: null,
        createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
        slaDeadline: new Date(Date.now() - 66 * 3600 * 1000).toISOString(),
        resolvedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        resolutionNotes: 'NGO Rescue team dispatched. Canine treated and relocated to shelter.',
        feedbackRating: 5,
        feedbackComments: 'Extremely quick response by rescue team! Thank you.',
        routingHistory: [
          { departmentId: 'dept-animal', timestamp: new Date(Date.now() - 72 * 3600 * 1000).toISOString(), reason: 'Expedited routing to Animal Welfare Cell.' }
        ]
      }
    ];

    seedComplaints.forEach(c => this.complaints.set(c.id, c));

    // Seed Blood Requests & Medical Camps
    this.bloodRequests.set('BLD-101', {
      id: 'BLD-101',
      requesterId: 'usr-citizen-1',
      requesterName: 'Anita Deshmukh',
      bloodGroup: 'O+',
      hospital: 'District Civil Hospital, Kalaburagi',
      location: 'Sedam Road, Kalaburagi',
      urgency: 'Emergency',
      unitsNeeded: 2,
      contactPhone: '+91 9876543210',
      status: 'Active',
      createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
    });

    this.medicalCamps.set('CMP-MED-01', {
      id: 'CMP-MED-01',
      organizerId: 'usr-organizer-1',
      organizerName: 'Red Cross Kalaburagi Chapter',
      verified: true,
      title: 'Free Mega Health & Malnutrition Checkup Camp',
      location: 'Community Hall, Ward 8, Kalaburagi',
      ward: 'Ward 8',
      date: '2026-08-10',
      time: '09:00 AM - 04:00 PM',
      servicesOffered: ['General Physician', 'Malnutrition Screening', 'Free Medicine', 'Food Ration Kits'],
      contactPhone: '+91 8472250100',
      remindersCount: 42,
      createdAt: new Date().toISOString()
    });
  }

  addAuditLog(actorId, actorRole, action, targetId, details) {
    const log = {
      id: `LOG-${Date.now()}`,
      actorId,
      actorRole,
      action,
      targetId,
      timestamp: new Date().toISOString(),
      details
    };
    this.auditLogs.unshift(log);
  }
}

const db = new DataStore();

module.exports = {
  db
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// In-Memory persistent data store with pre-seeded demo records
class DataStore {
    users = new Map();
    complaints = new Map();
    bloodRequests = new Map();
    medicalCamps = new Map();
    auditLogs = [];
    constructor() {
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
                name: 'Er. Rajesh Sharma (Roads Dept)',
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
            },
            {
                uid: 'usr-organizer-1',
                name: 'Red Cross Kalaburagi Chapter',
                phone: '+91 8472250100',
                email: 'info@redcross-klb.org',
                preferredLanguage: 'English',
                role: 'organizer',
                points: 300,
                badge: 'Gold',
                trustedContacts: [],
                createdAt: new Date().toISOString()
            }
        ];
        defaultUsers.forEach(u => this.users.set(u.uid, u));
        // Seed initial complaints
        const seedComplaints = [
            {
                id: 'CMP-2026-001',
                reporterId: 'usr-citizen-1',
                reporterName: 'Anita Deshmukh',
                category: 'pothole',
                description: 'Large deep crater pothole near Central University entrance road causing frequent traffic jams and motorcycle skids.',
                aiGeneratedDescription: 'High-severity road infrastructure hazard: ~1.5m crater pothole identified on University Main Access Road, Ward 12. Poses immediate risk to two-wheelers.',
                inputMode: 'voice',
                languageUsed: 'Kannada',
                mediaUrls: ['https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=600'],
                location: {
                    lat: 17.1582,
                    lng: 76.8422,
                    address: 'Main Gate Road, CUK Campus, Kalaburagi',
                    ward: 'Ward 12'
                },
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
                category: 'water_leakage',
                description: 'Clean drinking water pipe burst flooding the residential street for past 6 hours.',
                aiGeneratedDescription: 'Major municipal utility issue: Pipeline burst near Station Road overhead tank causing severe water loss and local street flooding in Ward 4.',
                inputMode: 'photo',
                languageUsed: 'English',
                mediaUrls: ['https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=600'],
                location: {
                    lat: 17.3297,
                    lng: 76.8343,
                    address: 'Station Road, Near Overhead Tank, Kalaburagi',
                    ward: 'Ward 4'
                },
                status: 'Submitted',
                priority: 'High',
                departmentId: 'dept-water',
                confirmations: ['usr-citizen-1'],
                duplicateOf: null,
                createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
                slaDeadline: new Date(Date.now() + 8 * 3600 * 1000).toISOString(),
                routingHistory: [
                    { departmentId: 'dept-water', timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString(), reason: 'Auto-assigned to Water Board.' }
                ]
            },
            {
                id: 'CMP-2026-003',
                reporterId: null, // Anonymous
                category: 'deforestation_mining',
                description: 'Illegal tree chopping taking place inside reserve forest boundary overnight.',
                aiGeneratedDescription: 'Environmental Violation: Unapproved felling of mature timber trees reported in North Forest Perimeter. Anonymous submission.',
                inputMode: 'text',
                languageUsed: 'English',
                mediaUrls: ['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600'],
                location: {
                    lat: 17.2001,
                    lng: 76.9011,
                    address: 'North Forest Range Perimeter, Kalaburagi',
                    ward: 'Ward 18'
                },
                status: 'Submitted',
                priority: 'High',
                departmentId: 'dept-forest',
                confirmations: [],
                duplicateOf: null,
                createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
                slaDeadline: new Date(Date.now() + 10 * 3600 * 1000).toISOString(),
                routingHistory: [
                    { departmentId: 'dept-forest', timestamp: new Date(Date.now() - 14 * 3600 * 1000).toISOString(), reason: 'Priority escalation to Forest Protection Department.' }
                ]
            },
            {
                id: 'CMP-2026-004',
                reporterId: 'usr-citizen-1',
                reporterName: 'Anita Deshmukh',
                category: 'animal_welfare',
                description: 'Injured street dog hit by vehicle requiring urgent veterinary care.',
                aiGeneratedDescription: 'Animal Emergency: Injured canine suffering leg trauma near Super Market Circle. Requires immediate animal rescue & care.',
                inputMode: 'voice',
                languageUsed: 'Hindi',
                mediaUrls: ['https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=600'],
                location: {
                    lat: 17.3341,
                    lng: 76.8285,
                    address: 'Super Market Circle, Ward 2',
                    ward: 'Ward 2'
                },
                status: 'Resolved',
                priority: 'High',
                departmentId: 'dept-animal',
                confirmations: ['usr-citizen-1', 'usr-staff-roads'],
                duplicateOf: null,
                createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
                slaDeadline: new Date(Date.now() - 66 * 3600 * 1000).toISOString(),
                resolvedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
                resolutionNotes: 'NGO Rescue team dispatched. Canine treated and relocated to shelter shelter ID-44.',
                resolutionMediaUrls: ['https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=600'],
                feedbackRating: 5,
                feedbackComments: 'Extremely quick response by rescue team! Thank you.',
                routingHistory: [
                    { departmentId: 'dept-animal', timestamp: new Date(Date.now() - 72 * 3600 * 1000).toISOString(), reason: 'Expedited routing to Animal Welfare Cell.' }
                ]
            }
        ];
        seedComplaints.forEach(c => this.complaints.set(c.id, c));
        // Seed Blood Requests
        const seedBlood = [
            {
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
            },
            {
                id: 'BLD-102',
                requesterId: 'usr-admin-1',
                requesterName: 'Dr. Suresh Kumar',
                bloodGroup: 'B-',
                hospital: 'ESIC Medical College Hospital',
                location: 'Sedam Road',
                urgency: 'High',
                unitsNeeded: 1,
                contactPhone: '+91 9845012345',
                status: 'Active',
                createdAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString()
            }
        ];
        seedBlood.forEach(b => this.bloodRequests.set(b.id, b));
        // Seed Medical Camps
        const seedCamps = [
            {
                id: 'CMP-MED-01',
                organizerId: 'usr-organizer-1',
                organizerName: 'Red Cross Kalaburagi Chapter',
                verified: true,
                title: 'Free Mega Health & Eye Checkup Camp',
                location: 'Community Hall, Ward 8, Kalaburagi',
                ward: 'Ward 8',
                date: '2026-08-10',
                time: '09:00 AM - 04:00 PM',
                servicesOffered: ['General Physician', 'Eye Screening', 'Blood Sugar Test', 'Free Medicine Distribution'],
                contactPhone: '+91 8472250100',
                remindersCount: 42,
                createdAt: new Date().toISOString()
            },
            {
                id: 'CMP-MED-02',
                organizerId: 'usr-organizer-1',
                organizerName: 'Red Cross Kalaburagi Chapter',
                verified: true,
                title: 'Stray Dog Vaccination & Rabies Drive',
                location: 'Municipal Animal Shelter Ground',
                ward: 'Ward 3',
                date: '2026-08-15',
                time: '08:00 AM - 01:00 PM',
                servicesOffered: ['Rabies Vaccination', 'De-worming', 'Pet Registration'],
                contactPhone: '+91 8472250100',
                remindersCount: 18,
                createdAt: new Date().toISOString()
            }
        ];
        seedCamps.forEach(mc => this.medicalCamps.set(mc.id, mc));
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
exports.db = new DataStore();

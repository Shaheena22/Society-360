import { ALL_CIVIC_DEPARTMENTS } from '../data/civicDepartments';

const STORAGE_KEY = 'civic_officers_registry';
const AUDIT_LOG_KEY = 'civic_audit_logs';

// Default initial official roster mapped from ALL_CIVIC_DEPARTMENTS
// Some officials are pre-assigned multiple departments to demonstrate concurrent multi-department charges!
const DEFAULT_OFFICIALS = [
  {
    id: 'off-roads',
    name: 'Er. Rajesh Sharma',
    designation: 'Executive Engineer (PWD)',
    email: 'staff.roads@civic.gov.in',
    phone: '+91 98450 11001',
    employeeId: 'GOV-KA-2026-01',
    primaryDeptId: 'dept-roads',
    assignedDepartments: ['dept-roads', 'dept-water', 'dept-civic'],
    jurisdiction: 'Kalaburagi City Corporation (Zone 1 & 2)',
    status: 'Active On-Duty',
    joinedDate: '2023-04-15'
  },
  {
    id: 'off-waste',
    name: 'Inspector Vijay Patil',
    designation: 'Chief Sanitary Officer',
    email: 'staff.waste@civic.gov.in',
    phone: '+91 98450 11002',
    employeeId: 'GOV-KA-2026-02',
    primaryDeptId: 'dept-waste',
    assignedDepartments: ['dept-waste', 'dept-health', 'dept-environment'],
    jurisdiction: 'Swachh Bharat North Division',
    status: 'Active On-Duty',
    joinedDate: '2022-08-10'
  },
  {
    id: 'off-water',
    name: 'Eng. Suresh Reddy',
    designation: 'Chief Water Officer (KUWSDB)',
    email: 'staff.water@civic.gov.in',
    phone: '+91 98450 11003',
    employeeId: 'GOV-KA-2026-03',
    primaryDeptId: 'dept-water',
    assignedDepartments: ['dept-water'],
    jurisdiction: 'Bheema River Intake & Water Treatment Plants',
    status: 'Active On-Duty',
    joinedDate: '2021-01-20'
  },
  {
    id: 'off-electricity',
    name: 'Er. P. Deshmukh',
    designation: 'Superintending Engineer (HESCOM)',
    email: 'staff.electricity@civic.gov.in',
    phone: '+91 98450 11004',
    employeeId: 'GOV-KA-2026-04',
    primaryDeptId: 'dept-electricity',
    assignedDepartments: ['dept-electricity'],
    jurisdiction: 'Kalaburagi Urban Grid & Sub-stations',
    status: 'Active On-Duty',
    joinedDate: '2020-11-05'
  },
  {
    id: 'off-corruption',
    name: 'Director K. Singh, IPS',
    designation: 'Superintendent of Police (Vigilance)',
    email: 'staff.vigilance@civic.gov.in',
    phone: '+91 98450 11005',
    employeeId: 'GOV-KA-2026-05',
    primaryDeptId: 'dept-corruption',
    assignedDepartments: ['dept-corruption', 'dept-governance'],
    jurisdiction: 'Lokayukta Division - Hyderabad-Karnataka Region',
    status: 'Active On-Duty',
    joinedDate: '2019-06-18'
  },
  {
    id: 'off-poverty',
    name: 'Officer Meena Rao, IAS',
    designation: 'Project Director (Poverty Alleviation)',
    email: 'staff.poverty@civic.gov.in',
    phone: '+91 98450 11006',
    employeeId: 'GOV-KA-2026-06',
    primaryDeptId: 'dept-poverty',
    assignedDepartments: ['dept-poverty', 'dept-social'],
    jurisdiction: 'District Urban Development Cell',
    status: 'Active On-Duty',
    joinedDate: '2022-03-01'
  },
  {
    id: 'off-governance',
    name: 'K. S. Narayanan',
    designation: 'Joint Secretary (Administrative Reforms)',
    email: 'staff.governance@civic.gov.in',
    phone: '+91 98450 11007',
    employeeId: 'GOV-KA-2026-07',
    primaryDeptId: 'dept-governance',
    assignedDepartments: ['dept-governance'],
    jurisdiction: 'Municipal Secretariat & Sakala Mission',
    status: 'Active On-Duty',
    joinedDate: '2018-09-12'
  },
  {
    id: 'off-unemployment',
    name: 'Shri Vikram Patil',
    designation: 'District Employment Officer',
    email: 'staff.employment@civic.gov.in',
    phone: '+91 98450 11008',
    employeeId: 'GOV-KA-2026-08',
    primaryDeptId: 'dept-unemployment',
    assignedDepartments: ['dept-unemployment'],
    jurisdiction: 'District Livelihood & Skill Training Hub',
    status: 'Active On-Duty',
    joinedDate: '2021-07-22'
  },
  {
    id: 'off-traffic',
    name: 'Insp. R. Singh',
    designation: 'Assistant Commissioner of Police (Traffic)',
    email: 'staff.traffic@civic.gov.in',
    phone: '+91 98450 11009',
    employeeId: 'GOV-KA-2026-09',
    primaryDeptId: 'dept-traffic',
    assignedDepartments: ['dept-traffic', 'dept-emergency'],
    jurisdiction: 'Kalaburagi Traffic Sub-Division',
    status: 'Active On-Duty',
    joinedDate: '2020-04-14'
  },
  {
    id: 'off-health',
    name: 'Dr. Meena Kumar',
    designation: 'District Health Officer (DHO)',
    email: 'staff.health@civic.gov.in',
    phone: '+91 98450 11010',
    employeeId: 'GOV-KA-2026-10',
    primaryDeptId: 'dept-health',
    assignedDepartments: ['dept-health', 'dept-animal'],
    jurisdiction: 'Urban Primary Health Centers & Disease Surveillance',
    status: 'Active On-Duty',
    joinedDate: '2017-12-01'
  },
  {
    id: 'off-safety',
    name: 'Smt. Ananya Sen',
    designation: 'Deputy Superintendent of Police (Women & Child)',
    email: 'staff.safety@civic.gov.in',
    phone: '+91 98450 11011',
    employeeId: 'GOV-KA-2026-11',
    primaryDeptId: 'dept-safety',
    assignedDepartments: ['dept-safety'],
    jurisdiction: 'Kalaburagi Women Police Station & 112 Command',
    status: 'Active On-Duty',
    joinedDate: '2021-02-14'
  },
  {
    id: 'off-education',
    name: 'Dr. G. K. Hegde',
    designation: 'Deputy Director of Public Instruction (DDPI)',
    email: 'staff.education@civic.gov.in',
    phone: '+91 98450 11012',
    employeeId: 'GOV-KA-2026-12',
    primaryDeptId: 'dept-education',
    assignedDepartments: ['dept-education'],
    jurisdiction: 'Government & Aided Schools Inspectorate',
    status: 'Active On-Duty',
    joinedDate: '2019-10-10'
  },
  {
    id: 'off-environment',
    name: 'Smt. Kavitha Reddy',
    designation: 'Senior Environmental Officer (KSPCB)',
    email: 'staff.environment@civic.gov.in',
    phone: '+91 98450 11013',
    employeeId: 'GOV-KA-2026-13',
    primaryDeptId: 'dept-environment',
    assignedDepartments: ['dept-environment', 'dept-waste'],
    jurisdiction: 'Industrial Area & River Pollution Control Wing',
    status: 'Active On-Duty',
    joinedDate: '2022-01-15'
  },
  {
    id: 'off-emergency',
    name: 'Cmdt. S. V. Nair',
    designation: 'Chief Fire & Emergency Services Officer',
    email: 'staff.emergency@civic.gov.in',
    phone: '+91 98450 11014',
    employeeId: 'GOV-KA-2026-14',
    primaryDeptId: 'dept-emergency',
    assignedDepartments: ['dept-emergency', 'dept-traffic'],
    jurisdiction: 'Kalaburagi District Fire Stations & Disaster Response',
    status: 'Active On-Duty',
    joinedDate: '2018-05-20'
  },
  {
    id: 'off-civic',
    name: 'Er. A. K. Joshi',
    designation: 'Chief City Engineer (City Corporation)',
    email: 'staff.civic@civic.gov.in',
    phone: '+91 98450 11015',
    employeeId: 'GOV-KA-2026-15',
    primaryDeptId: 'dept-civic',
    assignedDepartments: ['dept-civic', 'dept-roads'],
    jurisdiction: 'City Corporation Civil Works Directorate',
    status: 'Active On-Duty',
    joinedDate: '2019-03-09'
  },
  {
    id: 'off-social',
    name: 'Smt. Vandana Shinde',
    designation: 'District Social Welfare Officer',
    email: 'staff.social@civic.gov.in',
    phone: '+91 98450 11016',
    employeeId: 'GOV-KA-2026-16',
    primaryDeptId: 'dept-social',
    assignedDepartments: ['dept-social', 'dept-poverty'],
    jurisdiction: 'District Social Welfare & Community Hostel Cell',
    status: 'Active On-Duty',
    joinedDate: '2020-09-01'
  },
  {
    id: 'off-animal',
    name: 'Dr. Anita Deshpande',
    designation: 'Chief Veterinary Officer (Animal Welfare)',
    email: 'staff.animal@civic.gov.in',
    phone: '+91 98450 11017',
    employeeId: 'GOV-KA-2026-17',
    primaryDeptId: 'dept-animal',
    assignedDepartments: ['dept-animal', 'dept-health'],
    jurisdiction: 'District Veterinary Polyclinic & Cattle Rescues',
    status: 'Active On-Duty',
    joinedDate: '2023-02-11'
  }
];

export function getOfficersRegistry() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading officers registry from storage:', err);
  }

  // Fallback to default list & persist
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_OFFICIALS));
  } catch (err) {}
  return DEFAULT_OFFICIALS;
}

export function saveOfficersRegistry(officers) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(officers));
  } catch (err) {
    console.error('Error saving officers registry:', err);
  }
}

export function recordAuditLog(action, details, actor = 'Super Admin Dr. Suresh Kumar') {
  try {
    const newLog = {
      id: 'log-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      action,
      details,
      actor,
      timestamp: new Date().toISOString()
    };
    const existing = getStoredAuditLogs();
    const updated = [newLog, ...existing].slice(0, 100);
    localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(updated));
    return newLog;
  } catch (err) {
    console.error('Error recording audit log:', err);
  }
}

export function getStoredAuditLogs() {
  try {
    const saved = localStorage.getItem(AUDIT_LOG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {}
  return [
    { id: 'log-1', action: 'AUTO_ROUTING', details: 'Ticket #CMP-2026-001 routed to dept-roads with 24h SLA', timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: 'log-2', action: 'SLA_CHECK', details: 'Automated background cron executed. 0 violations detected.', timestamp: new Date(Date.now() - 7200000).toISOString() },
    { id: 'log-3', action: 'ADMIN_LOGIN', details: 'Super Admin Dr. Suresh Kumar authenticated from Kalaburagi DC Office', timestamp: new Date(Date.now() - 14400000).toISOString() },
    { id: 'log-4', action: 'INTEGRITY_AUDIT', details: 'SHA-256 cryptographic hash verified for 248 municipal ticket state transitions.', timestamp: new Date(Date.now() - 28800000).toISOString() }
  ];
}

export function createGovernmentOfficial({
  name,
  designation,
  email,
  phone,
  primaryDeptId,
  assignedDepartments = [],
  jurisdiction
}) {
  const currentList = getOfficersRegistry();
  const primaryDept = ALL_CIVIC_DEPARTMENTS.find(d => d.id === primaryDeptId) || ALL_CIVIC_DEPARTMENTS[0];
  
  // Ensure assignedDepartments contains primaryDeptId
  const deptSet = new Set([primaryDeptId, ...assignedDepartments]);
  const finalAssignedDepts = Array.from(deptSet);

  const empNumber = String(currentList.length + 1).padStart(2, '0');
  const newOfficer = {
    id: `off-${Date.now()}`,
    name: name.trim(),
    designation: designation?.trim() || 'Government Officer',
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || '+91 94800 00000',
    employeeId: `GOV-KA-2026-${empNumber}`,
    primaryDeptId: primaryDept.id,
    assignedDepartments: finalAssignedDepts,
    jurisdiction: jurisdiction?.trim() || 'Kalaburagi City Corporation',
    status: 'Active On-Duty',
    joinedDate: new Date().toISOString().split('T')[0]
  };

  const updatedList = [newOfficer, ...currentList];
  saveOfficersRegistry(updatedList);

  const deptNames = finalAssignedDepts
    .map(id => ALL_CIVIC_DEPARTMENTS.find(d => d.id === id)?.name || id)
    .join(', ');

  recordAuditLog(
    'OFFICIAL_COMMISSIONED',
    `Super Admin registered new Government Official: ${newOfficer.name} (${newOfficer.designation}, Email: ${newOfficer.email}). Assigned Departments: ${deptNames}.`
  );

  return newOfficer;
}

export function deleteGovernmentOfficial(officerId) {
  const currentList = getOfficersRegistry();
  const target = currentList.find(o => o.id === officerId);
  if (!target) return false;

  const updatedList = currentList.filter(o => o.id !== officerId);
  saveOfficersRegistry(updatedList);

  recordAuditLog(
    'OFFICIAL_REVOKED',
    `Super Admin revoked credentials and removed Government Official: ${target.name} (${target.designation}, Email: ${target.email}, Dept: ${target.primaryDeptId}) from active municipal registry.`
  );

  return true;
}

export function getOfficerAssignedDepts(officerOrEmail) {
  if (!officerOrEmail) return ['dept-roads'];
  
  const currentList = getOfficersRegistry();
  let found = null;

  if (typeof officerOrEmail === 'string') {
    found = currentList.find(o => o.id === officerOrEmail || o.email.toLowerCase() === officerOrEmail.toLowerCase());
  } else if (officerOrEmail.email) {
    found = currentList.find(o => o.email.toLowerCase() === officerOrEmail.email.toLowerCase());
  } else if (officerOrEmail.id) {
    found = currentList.find(o => o.id === officerOrEmail.id);
  }

  if (found && Array.isArray(found.assignedDepartments) && found.assignedDepartments.length > 0) {
    return found.assignedDepartments;
  }
  
  if (officerOrEmail.departmentId) {
    return [officerOrEmail.departmentId];
  }

  return ['dept-roads'];
}

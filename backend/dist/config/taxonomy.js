"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORIES = exports.DEPARTMENTS = void 0;
exports.DEPARTMENTS = [
    { id: 'dept-roads', name: 'Roads & Civil Infrastructure Dept', contactEmail: 'roads@cuk.gov.in', contactPhone: '+91 800-111-2221', headName: 'Er. R. K. Sharma' },
    { id: 'dept-waste', name: 'Sanitation & Solid Waste Management', contactEmail: 'waste@cuk.gov.in', contactPhone: '+91 800-111-2222', headName: 'Dr. Sunita Rao' },
    { id: 'dept-water', name: 'Water Supply & Sewerage Board', contactEmail: 'water@cuk.gov.in', contactPhone: '+91 800-111-2223', headName: 'Er. Anand V' },
    { id: 'dept-electrical', name: 'Electrical & Street Lighting Dept', contactEmail: 'lighting@cuk.gov.in', contactPhone: '+91 800-111-2224', headName: 'Er. P. Deshmukh' },
    { id: 'dept-animal', name: 'Animal Welfare & Control Cell', contactEmail: 'animals@cuk.gov.in', contactPhone: '+91 800-111-2225', headName: 'Dr. A. K. Patil' },
    { id: 'dept-forest', name: 'Environment & Forest Protection Dept', contactEmail: 'forest@cuk.gov.in', contactPhone: '+91 800-111-2226', headName: 'Smt. Kavitha Reddy' },
    { id: 'dept-traffic', name: 'Traffic & Enforcement Wing', contactEmail: 'traffic@cuk.gov.in', contactPhone: '+91 800-111-2227', headName: 'Insp. R. Singh' },
    { id: 'dept-health', name: 'Public Health & Medical Services', contactEmail: 'health@cuk.gov.in', contactPhone: '+91 800-111-2228', headName: 'Dr. Meena Kumar' }
];
exports.CATEGORIES = [
    {
        id: 'pothole',
        name: 'Potholes & Road Damage',
        group: 'Roads & Infrastructure',
        defaultPriority: 'High',
        defaultDepartment: 'dept-roads',
        slaHours: { High: 24, Medium: 48, Low: 96 },
        keywords: ['pothole', 'crater', 'asphalt', 'tar', 'road broken', 'tar road', 'accident hazard']
    },
    {
        id: 'garbage_burning',
        name: 'Open Garbage Burning',
        group: 'Waste & Environment',
        defaultPriority: 'High',
        defaultDepartment: 'dept-waste',
        slaHours: { High: 12, Medium: 24, Low: 48 },
        keywords: ['garbage burning', 'fire', 'smoke', 'toxic fumes', 'burning waste', 'plastic burn']
    },
    {
        id: 'illegal_dumping',
        name: 'Illegal Waste Dumping',
        group: 'Waste & Environment',
        defaultPriority: 'Medium',
        defaultDepartment: 'dept-waste',
        slaHours: { High: 24, Medium: 72, Low: 120 },
        keywords: ['dumping', 'garbage pile', 'trash dumping', 'debris', 'black spot', 'smell']
    },
    {
        id: 'recycling_pickup',
        name: 'Recyclable Item Pickup Request',
        group: 'Waste & Environment',
        defaultPriority: 'Low',
        defaultDepartment: 'dept-waste',
        slaHours: { High: 24, Medium: 48, Low: 72 },
        keywords: ['recycling', 'e-waste', 'plastic scrap', 'paper disposal', 'metal scrap', 'glass pickup']
    },
    {
        id: 'water_leakage',
        name: 'Water Leakage & Pipe Burst',
        group: 'Utilities',
        defaultPriority: 'High',
        defaultDepartment: 'dept-water',
        slaHours: { High: 12, Medium: 24, Low: 48 },
        keywords: ['water leak', 'pipe burst', 'water wasting', 'gushing water', 'main pipeline', 'overflow']
    },
    {
        id: 'streetlight',
        name: 'Broken Street Light',
        group: 'Utilities',
        defaultPriority: 'Medium',
        defaultDepartment: 'dept-electrical',
        slaHours: { High: 24, Medium: 48, Low: 72 },
        keywords: ['streetlight', 'dark road', 'light bulb', 'pole light', 'no light', 'pitch dark']
    },
    {
        id: 'animal_welfare',
        name: 'Injured / Stray Animal Emergency',
        group: 'Animal Welfare',
        defaultPriority: 'High',
        defaultDepartment: 'dept-animal',
        slaHours: { High: 6, Medium: 24, Low: 48 },
        keywords: ['injured dog', 'sick animal', 'stray cat', 'rabid dog', 'animal bite', 'abandoned pet']
    },
    {
        id: 'deforestation_mining',
        name: 'Deforestation & Illegal Mining',
        group: 'Waste & Environment',
        defaultPriority: 'High',
        defaultDepartment: 'dept-forest',
        slaHours: { High: 12, Medium: 24, Low: 72 },
        keywords: ['tree cutting', 'deforestation', 'sand mining', 'illegal quarrying', 'forest destruction', 'timber']
    },
    {
        id: 'illegal_parking',
        name: 'Illegal Vehicle Parking',
        group: 'Roads & Infrastructure',
        defaultPriority: 'Medium',
        defaultDepartment: 'dept-traffic',
        slaHours: { High: 12, Medium: 24, Low: 48 },
        keywords: ['illegal parking', 'blocked gate', 'no parking zone', 'abandoned car', 'footpath parking']
    },
    {
        id: 'open_manhole',
        name: 'Open / Missing Manhole Cover',
        group: 'Public Hazards',
        defaultPriority: 'High',
        defaultDepartment: 'dept-water',
        slaHours: { High: 6, Medium: 12, Low: 24 },
        keywords: ['manhole', 'open drain', 'sewage pit', 'missing cover', 'chamber open']
    },
    {
        id: 'tree_hazard',
        name: 'Fallen / Leaning Tree Hazard',
        group: 'Public Hazards',
        defaultPriority: 'High',
        defaultDepartment: 'dept-forest',
        slaHours: { High: 12, Medium: 24, Low: 48 },
        keywords: ['fallen tree', 'branch falling', 'leaning tree', 'electric line tree', 'storm damage']
    },
    {
        id: 'sound_pollution',
        name: 'Sound & Noise Pollution',
        group: 'Utilities',
        defaultPriority: 'Medium',
        defaultDepartment: 'dept-traffic',
        slaHours: { High: 12, Medium: 24, Low: 48 },
        keywords: ['noise', 'loudspeaker', 'construction noise', 'high decibel', 'midnight sound']
    },
    {
        id: 'public_toilet',
        name: 'Unmaintained Public Toilet',
        group: 'Community Services',
        defaultPriority: 'Medium',
        defaultDepartment: 'dept-health',
        slaHours: { High: 24, Medium: 48, Low: 72 },
        keywords: ['public toilet', 'dirty washroom', 'sanitation', 'no water toilet', 'broken flush']
    }
];

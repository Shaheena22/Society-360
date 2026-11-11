import React, { useState, useEffect } from 'react';
import {
  Mic, Camera, MapPin, QrCode, WifiOff, Award, Heart, Stethoscope, Sparkles,
  CheckCircle2, Search, Volume2, TrendingUp, RefreshCw, Send, PlusCircle, Check,
  ArrowLeft, ArrowRight, Star, Dog, MessageSquare, Phone, Building2, Bell, Home,
  Calendar, FileText, User, Plus, ShieldAlert, X, Eye, Navigation, ThumbsUp, ChevronRight,
  Flame, Lock, AlertTriangle
} from 'lucide-react';
import { api } from '../services/api';
import { t, translateCategory } from '../services/translations';
import FileGovernanceDashboard from './FileGovernanceDashboard';
import AnimalWelfareDashboard from './AnimalWelfareDashboard';
import WomenChildSafetyDashboard from './WomenChildSafetyDashboard';
import EmergencySafetyDashboard from './EmergencySafetyDashboard';
import AntiCorruptionDashboard from './AntiCorruptionDashboard';
import UnemploymentJobsDashboard from './UnemploymentJobsDashboard';
import WaterCleanlinessDashboard from './WaterCleanlinessDashboard';
import EducationDashboard from './EducationDashboard';
import PovertyNecessitiesDashboard from './PovertyNecessitiesDashboard';
import PublicGovernanceDashboard from './PublicGovernanceDashboard';
import RoadsInfrastructureDashboard from './RoadsInfrastructureDashboard';
import StreetLightingElectricityDashboard from './StreetLightingElectricityDashboard';
import SocialRightsWelfareDashboard from './SocialRightsWelfareDashboard';
import HealthMedicalDashboard from './HealthMedicalDashboard';
import EnvironmentDashboard from './EnvironmentDashboard';
import TrafficTransportDashboard from './TrafficTransportDashboard';
import { CameraCaptureModal, GPSLocationWidget } from './CameraGPSModule';
import { VoiceAssistantModal, GlobalAudioPlayerBar } from './VoiceAssistantModal';
import QRScannerModal from './QRScannerModal';
import ComplaintQRCard from './ComplaintQRCard';
import { getVoiceLangCode } from '../services/voiceAssistant';

export const MODULES_LIST = [
  { id: 'poverty', name: 'Poverty & Basic Necessities', icon: '🏠', color: 'from-amber-700 to-orange-800', desc: 'Hunger relief, homeless shelters, malnutrition, daily wage worker aid & economic assessment' },
  { id: 'governance', name: 'Public Governance & Delays', icon: '🏛️', color: 'from-yellow-700 to-amber-800', desc: 'Government service delays, certificate backlog, scheme payment delays & officer accountability' },
  { id: 'roads', name: 'Roads & Public Infrastructure', icon: '🛣️', color: 'from-slate-700 to-stone-800', desc: 'Potholes, damaged roads, bridge safety, footpaths, signals & public structures' },
  { id: 'electricity', name: 'Street Lighting & Electricity', icon: '💡', color: 'from-yellow-500 to-amber-600', desc: 'Streetlights off, power outages, voltage spikes, exposed wires & transformers' },
  { id: 'corruption', name: 'Anti-Corruption & Vigilance', icon: '⚖️', color: 'from-rose-700 to-pink-800', desc: 'Bribery demands, illegal commissions, fake docs, tender irregularities & recruitment fraud' },
  { id: 'unemployment', name: 'Unemployment & Jobs', icon: '💼', color: 'from-blue-700 to-indigo-800', desc: 'Skill training, job vacancies, apprenticeships, resume assistance & job fairs' },
  { id: 'waste', name: 'Waste & Cleanliness', icon: '🗑️', color: 'from-amber-600 to-yellow-700', desc: 'Garbage collection, illegal dumping, waste burning, plastic & e-waste disposal' },
  { id: 'water', name: 'Water & Sanitation', icon: '💧', color: 'from-cyan-600 to-blue-700', desc: 'Water leaks, no supply, contaminated water, sewerage overflow & open drains' },
  { id: 'traffic', name: 'Traffic & Transport', icon: '🚦', color: 'from-red-600 to-amber-700', desc: 'Illegal parking, road congestion, dangerous driving & public bus service issues' },
  { id: 'health', name: 'Health & Medical Support', icon: '🩺', color: 'from-emerald-600 to-teal-700', desc: 'Medical camps, emergency hospitals, ambulances, blood donors & medicines' },
  { id: 'safety', name: 'Women & Child Safety', icon: '🛡️', color: 'from-purple-600 to-pink-700', desc: 'Unsafe public areas, street harassment, missing children & child welfare' },
  { id: 'education', name: 'Education', icon: '🎓', color: 'from-indigo-600 to-purple-700', desc: 'School infrastructure, teacher issues, scholarships & digital education support' },
  { id: 'environment', name: 'Environment', icon: '🌿', color: 'from-emerald-700 to-green-800', desc: 'Illegal tree cutting, deforestation, air/water pollution & green space loss' },
  { id: 'emergency', name: 'Public Safety & Emergency', icon: '🚨', color: 'from-red-700 to-rose-900', desc: 'Fire emergency, accidents, building safety hazards, floods & landslides' },
  { id: 'animal', name: 'Animal Welfare & Rescue', icon: '🐕', color: 'from-orange-600 to-amber-800', desc: 'Stray animal injury rescue, vaccination drive request' },
  { id: 'social', name: 'Social Rights & Welfare', icon: '🤝', color: 'from-purple-700 to-indigo-900', desc: 'Disability assistance, pension delay, community welfare' }
];

export const CATEGORY_TAXONOMY = [
  // 1. POVERTY & BASIC NECESSITIES (10 Modules)
  { id: 'poverty_hunger', moduleId: 'poverty', key: 'cat_poverty_hunger', icon: '🍚', name: 'Hunger & Food Insecurity' },
  { id: 'poverty_homelessness', moduleId: 'poverty', key: 'cat_poverty_homelessness', icon: '🏠', name: 'Homelessness Assistance' },
  { id: 'poverty_basic_necessities', moduleId: 'poverty', key: 'cat_poverty_basic_necessities', icon: '🍛', name: 'Lack of Basic Necessities' },
  { id: 'poverty_child_malnutrition', moduleId: 'poverty', key: 'cat_poverty_child_malnutrition', icon: '👶', name: 'Child Malnutrition Reporting' },
  { id: 'poverty_financial_distress', moduleId: 'poverty', key: 'cat_poverty_financial_distress', icon: '💰', name: 'Financial Distress Support' },
  { id: 'poverty_daily_wage', moduleId: 'poverty', key: 'cat_poverty_daily_wage', icon: '👷', name: 'Daily Wage Worker Assistance' },
  { id: 'poverty_vulnerable_family', moduleId: 'poverty', key: 'cat_poverty_vulnerable_family', icon: '🧑‍🦽', name: 'Vulnerable Family Support' },
  { id: 'poverty_food_request', moduleId: 'poverty', key: 'cat_poverty_food_request', icon: '🧺', name: 'Food/Essential Item Request' },
  { id: 'poverty_elderly_support', moduleId: 'poverty', key: 'cat_poverty_elderly_support', icon: '👴', name: 'Elderly Basic Needs Support' },
  { id: 'poverty_economic_vulnerability', moduleId: 'poverty', key: 'cat_poverty_economic_vulnerability', icon: '📊', name: 'Economic Vulnerability Assessment' },

  // 2. PUBLIC GOVERNANCE & DELAYS (10 Modules)
  { id: 'gov_service_delay', moduleId: 'governance', key: 'cat_gov_service_delay', icon: '📄', name: 'Government Service Delay' },
  { id: 'gov_office_delay', moduleId: 'governance', key: 'cat_gov_office_delay', icon: '🏢', name: 'Office Service Delay' },
  { id: 'gov_scheme_payment_delay', moduleId: 'governance', key: 'cat_gov_scheme_payment_delay', icon: '💳', name: 'Benefit/Scheme Payment Delay' },
  { id: 'gov_cert_delay', moduleId: 'governance', key: 'cat_gov_cert_delay', icon: '📑', name: 'Certificate/Document Delay' },
  { id: 'gov_school_misconduct', moduleId: 'governance', key: 'cat_gov_school_misconduct', icon: '🏫', name: 'School/College Official Misconduct' },
  { id: 'gov_health_corruption', moduleId: 'governance', key: 'cat_gov_health_corruption', icon: '🏥', name: 'Healthcare Service Corruption' },
  { id: 'gov_bribery_demand', moduleId: 'governance', key: 'cat_gov_bribery_demand', icon: '💰', name: 'Bribery / Illegal Payment Demand' },
  { id: 'gov_officer_misconduct', moduleId: 'governance', key: 'cat_gov_officer_misconduct', icon: '📢', name: 'Government Officer Misconduct' },
  { id: 'gov_complaint_not_actioned', moduleId: 'governance', key: 'cat_gov_complaint_not_actioned', icon: '📝', name: 'Complaint Not Actioned' },
  { id: 'gov_excessive_delay', moduleId: 'governance', key: 'cat_gov_excessive_delay', icon: '⏳', name: 'Excessive Administrative Delay' },

  // 3. ROADS & PUBLIC INFRASTRUCTURE (12 Modules)
  { id: 'roads_pothole', moduleId: 'roads', key: 'cat_roads_pothole', icon: '🕳️', name: 'Pothole Reporting' },
  { id: 'roads_damaged_road', moduleId: 'roads', key: 'cat_roads_damaged_road', icon: '🛣️', name: 'Damaged Road' },
  { id: 'roads_damaged_bridge', moduleId: 'roads', key: 'cat_roads_damaged_bridge', icon: '🌉', name: 'Damaged Bridge / Flyover' },
  { id: 'roads_road_obstruction', moduleId: 'roads', key: 'cat_roads_road_obstruction', icon: '🚧', name: 'Road Obstruction' },
  { id: 'roads_traffic_signal', moduleId: 'roads', key: 'cat_roads_traffic_signal', icon: '🚦', name: 'Traffic Signal Problem' },
  { id: 'roads_unsafe_footpath', moduleId: 'roads', key: 'cat_roads_unsafe_footpath', icon: '🚸', name: 'Missing / Unsafe Footpath' },
  { id: 'roads_bus_stop', moduleId: 'roads', key: 'cat_roads_bus_stop', icon: '🚌', name: 'Bus Stop Infrastructure Problem' },
  { id: 'roads_drainage_problem', moduleId: 'roads', key: 'cat_roads_drainage_problem', icon: '🚰', name: 'Public Drainage Problem' },
  { id: 'roads_broken_infra', moduleId: 'roads', key: 'cat_roads_broken_infra', icon: '🧱', name: 'Broken Public Infrastructure' },
  { id: 'roads_unsafe_construction', moduleId: 'roads', key: 'cat_roads_unsafe_construction', icon: '🏗️', name: 'Unsafe Construction / Public Structure' },
  { id: 'roads_illegal_parking', moduleId: 'roads', key: 'cat_roads_illegal_parking', icon: '🅿️', name: 'Illegal / Unsafe Parking' },
  { id: 'roads_accessibility_problem', moduleId: 'roads', key: 'cat_roads_accessibility_problem', icon: '♿', name: 'Accessibility Infrastructure Problem' },

  // 4. STREET LIGHTING & ELECTRICITY (12 Modules)
  { id: 'elec_streetlight_not_working', moduleId: 'electricity', key: 'cat_elec_streetlight_not_working', icon: '💡', name: 'Street Light Not Working' },
  { id: 'elec_multiple_lights_off', moduleId: 'electricity', key: 'cat_elec_multiple_lights_off', icon: '🌑', name: 'Multiple Street Lights Off' },
  { id: 'elec_power_outage', moduleId: 'electricity', key: 'cat_elec_power_outage', icon: '🔌', name: 'Electricity Power Outage' },
  { id: 'elec_fluctuation', moduleId: 'electricity', key: 'cat_elec_fluctuation', icon: '⚡', name: 'Electricity Fluctuation / Low Voltage' },
  { id: 'elec_exposed_wire', moduleId: 'electricity', key: 'cat_elec_exposed_wire', icon: '🔥', name: 'Exposed Electrical Wire' },
  { id: 'elec_damaged_pole', moduleId: 'electricity', key: 'cat_elec_damaged_pole', icon: '🏚️', name: 'Damaged Electrical Pole' },
  { id: 'elec_spark_fire_risk', moduleId: 'electricity', key: 'cat_elec_spark_fire_risk', icon: '💥', name: 'Electrical Spark / Fire Risk' },
  { id: 'elec_transformer_problem', moduleId: 'electricity', key: 'cat_elec_transformer_problem', icon: '🏠', name: 'Transformer Problem' },
  { id: 'elec_tree_wire_conflict', moduleId: 'electricity', key: 'cat_elec_tree_wire_conflict', icon: '🌳', name: 'Tree / Electric Wire Conflict' },
  { id: 'elec_coverage_problem', moduleId: 'electricity', key: 'cat_elec_coverage_problem', icon: '🛣️', name: 'Street Lighting Coverage Problem' },
  { id: 'elec_public_building_problem', moduleId: 'electricity', key: 'cat_elec_public_building_problem', icon: '🏢', name: 'Public Building Electricity Problem' },
  { id: 'elec_equipment_damage', moduleId: 'electricity', key: 'cat_elec_equipment_damage', icon: '🔋', name: 'Public Electrical Equipment Damage' },

  // 5. ANTI-CORRUPTION & VIGILANCE
  { id: 'corruption_bribery', moduleId: 'corruption', key: 'cat_corruption_bribery', icon: '💵', name: 'Bribery Demand by Office Staff' },
  { id: 'corruption_misconduct', moduleId: 'corruption', key: 'cat_corruption_misconduct', icon: '📋', name: 'Official Misconduct / Service Denial' },
  { id: 'corruption_illegal_commission', moduleId: 'corruption', key: 'cat_corruption_illegal_commission', icon: '💸', name: 'Illegal Commission / Extra Money Demand' },
  { id: 'corruption_gov_scheme', moduleId: 'corruption', key: 'cat_corruption_gov_scheme', icon: '🏛️', name: 'Corruption in Government Schemes' },
  { id: 'corruption_fake_docs', moduleId: 'corruption', key: 'cat_corruption_fake_docs', icon: '📜', name: 'Fake Government Documents' },
  { id: 'corruption_tender_irregularity', moduleId: 'corruption', key: 'cat_corruption_tender_irregularity', icon: '📑', name: 'Tender / Contract Irregularity' },
  { id: 'corruption_recruitment_bribe', moduleId: 'corruption', key: 'cat_corruption_recruitment_bribe', icon: '💼', name: 'Recruitment / Job Bribe' },
  { id: 'corruption_police_misconduct', moduleId: 'corruption', key: 'cat_corruption_police_misconduct', icon: '🚔', name: 'Police Misconduct' },
  { id: 'corruption_land_record_manipulation', moduleId: 'corruption', key: 'cat_corruption_land_record_manipulation', icon: '🗺️', name: 'Land/Property Record Manipulation' },
  { id: 'corruption_ration_corruption', moduleId: 'corruption', key: 'cat_corruption_ration_corruption', icon: '🌾', name: 'Ration/Food Scheme Corruption' },
  { id: 'corruption_school_misconduct', moduleId: 'corruption', key: 'cat_corruption_school_misconduct', icon: '🏫', name: 'School/College Official Misconduct' },
  { id: 'corruption_healthcare_corruption', moduleId: 'corruption', key: 'cat_corruption_healthcare_corruption', icon: '🏥', name: 'Healthcare Service Corruption' },

  // 6. UNEMPLOYMENT & JOBS
  { id: 'unemployment_skills', moduleId: 'unemployment', key: 'cat_unemployment_skills', icon: '🛠️', name: 'Youth Skill Training Hub Request' },
  { id: 'unemployment_gig', moduleId: 'unemployment', key: 'cat_unemployment_gig', icon: '🛵', name: 'Local Worker Placement Support' },
  { id: 'unemployment_job_vacancy', moduleId: 'unemployment', key: 'cat_unemployment_job_vacancy', icon: '💼', name: 'Job Vacancy Assistance' },
  { id: 'unemployment_gov_job_scheme', moduleId: 'unemployment', key: 'cat_unemployment_gov_job_scheme', icon: '🏛️', name: 'Government Job Scheme Information' },
  { id: 'unemployment_apprenticeship', moduleId: 'unemployment', key: 'cat_unemployment_apprenticeship', icon: '🎓', name: 'Apprenticeship Request' },
  { id: 'unemployment_internship', moduleId: 'unemployment', key: 'cat_unemployment_internship', icon: '💻', name: 'Internship Opportunity Support' },
  { id: 'unemployment_resume_assistance', moduleId: 'unemployment', key: 'cat_unemployment_resume_assistance', icon: '📄', name: 'Resume/CV Assistance' },
  { id: 'unemployment_job_fair', moduleId: 'unemployment', key: 'cat_unemployment_job_fair', icon: '🎪', name: 'Job Fair Request' },
  { id: 'unemployment_skill_cert', moduleId: 'unemployment', key: 'cat_unemployment_skill_cert', icon: '📜', name: 'Skill Certification Support' },
  { id: 'unemployment_daily_wage', moduleId: 'unemployment', key: 'cat_unemployment_daily_wage', icon: '🔨', name: 'Daily Wage Worker Support' },
  { id: 'unemployment_migrant_worker', moduleId: 'unemployment', key: 'cat_unemployment_migrant_worker', icon: '🧳', name: 'Migrant Worker Employment Support' },
  { id: 'unemployment_women_employment', moduleId: 'unemployment', key: 'cat_unemployment_women_employment', icon: '👩‍💼', name: 'Women Employment Support' },
  { id: 'unemployment_job_scam', moduleId: 'unemployment', key: 'cat_unemployment_job_scam', icon: '🚨', name: 'Job Scam/Fraud Reporting' },
  { id: 'unemployment_career_guidance', moduleId: 'unemployment', key: 'cat_unemployment_career_guidance', icon: '🧭', name: 'Career Guidance' },

  // 7. WASTE & CLEANLINESS
  { id: 'waste_garbage_not_collected', moduleId: 'waste', key: 'cat_waste_garbage_not_collected', icon: '🗑️', name: 'Garbage Not Collected' },
  { id: 'waste_overflowing_bin', moduleId: 'waste', key: 'cat_waste_overflowing_bin', icon: '🚮', name: 'Overflowing Garbage Bin' },
  { id: 'waste_illegal_dumping', moduleId: 'waste', key: 'cat_waste_illegal_dumping', icon: '⚠️', name: 'Illegal Dumping' },
  { id: 'waste_burning', moduleId: 'waste', key: 'cat_waste_burning', icon: '🔥', name: 'Waste Burning' },
  { id: 'waste_plastic_problem', moduleId: 'waste', key: 'cat_waste_plastic_problem', icon: '🥤', name: 'Plastic Waste Problem' },
  { id: 'waste_e_waste', moduleId: 'waste', key: 'cat_waste_e_waste', icon: '💻', name: 'E-Waste Disposal' },
  { id: 'waste_biomedical_waste', moduleId: 'waste', key: 'cat_waste_biomedical_waste', icon: '💉', name: 'Biomedical Waste Issue' },
  { id: 'waste_construction_waste', moduleId: 'waste', key: 'cat_waste_construction_waste', icon: '🧱', name: 'Construction Waste' },
  { id: 'waste_drain_gutter_waste', moduleId: 'waste', key: 'cat_waste_drain_gutter_waste', icon: '🌊', name: 'Drain/Gutter Waste' },
  { id: 'waste_public_toilet', moduleId: 'waste', key: 'cat_waste_public_toilet', icon: '🚽', name: 'Public Toilet Cleanliness' },
  { id: 'waste_recycling_pickup', moduleId: 'waste', key: 'cat_waste_recycling_pickup', icon: '♻️', name: 'Recycling Pickup Request' },
  { id: 'waste_stray_animal_waste', moduleId: 'waste', key: 'cat_waste_stray_animal_waste', icon: '🐕', name: 'Stray Animal Waste Problem' },

  // 8. WATER & SANITATION
  { id: 'water_leakage', moduleId: 'water', key: 'cat_water_leakage', icon: '💧', name: 'Water Leakage' },
  { id: 'water_no_supply', moduleId: 'water', key: 'cat_water_no_supply', icon: '🚫', name: 'No Water Supply' },
  { id: 'water_contaminated', moduleId: 'water', key: 'cat_water_contaminated', icon: '🧪', name: 'Contaminated Water' },
  { id: 'water_low_pressure', moduleId: 'water', key: 'cat_water_low_pressure', icon: '📉', name: 'Low Water Pressure' },
  { id: 'water_broken_pipeline', moduleId: 'water', key: 'cat_water_broken_pipeline', icon: '🔧', name: 'Broken Water Pipeline' },
  { id: 'water_illegal_connection', moduleId: 'water', key: 'cat_water_illegal_connection', icon: '🔌', name: 'Illegal Water Connection' },
  { id: 'water_sewerage_overflow', moduleId: 'water', key: 'cat_water_sewerage_overflow', icon: '🌊', name: 'Sewerage Overflow' },
  { id: 'water_open_drain', moduleId: 'water', key: 'cat_water_open_drain', icon: '⚠️', name: 'Open Drain' },
  { id: 'water_drainage_blockage', moduleId: 'water', key: 'cat_water_drainage_blockage', icon: '🚧', name: 'Drainage Blockage' },
  { id: 'water_rainwater_drainage', moduleId: 'water', key: 'cat_water_rainwater_drainage', icon: '🌧️', name: 'Rainwater Drainage Problem' },
  { id: 'water_public_drinking', moduleId: 'water', key: 'cat_water_public_drinking', icon: '🚰', name: 'Public Drinking Water Facility' },

  // 9. TRAFFIC & TRANSPORT
  { id: 'traffic_illegal_parking', moduleId: 'traffic', key: 'cat_traffic_illegal_parking', icon: '🚗', name: 'Illegal Parking' },
  { id: 'traffic_signal_problem', moduleId: 'traffic', key: 'cat_traffic_signal_problem', icon: '🚦', name: 'Traffic Signal Problem' },
  { id: 'traffic_road_congestion', moduleId: 'traffic', key: 'cat_traffic_road_congestion', icon: '🚙', name: 'Road Congestion' },
  { id: 'traffic_dangerous_driving', moduleId: 'traffic', key: 'cat_traffic_dangerous_driving', icon: '🏎️', name: 'Dangerous Driving Reporting' },
  { id: 'traffic_bus_stop_problem', moduleId: 'traffic', key: 'cat_traffic_bus_stop_problem', icon: '🚏', name: 'Bus Stop Problem' },
  { id: 'traffic_bus_service_issue', moduleId: 'traffic', key: 'cat_traffic_bus_service_issue', icon: '🚌', name: 'Public Bus Service Issue' },
  { id: 'traffic_overcharging', moduleId: 'traffic', key: 'cat_traffic_overcharging', icon: '🚕', name: 'Auto/Taxi Overcharging' },
  { id: 'traffic_missing_road_markings', moduleId: 'traffic', key: 'cat_traffic_missing_road_markings', icon: '🛣️', name: 'Missing Road Markings' },
  { id: 'traffic_school_zone_traffic', moduleId: 'traffic', key: 'cat_traffic_school_zone_traffic', icon: '🏫', name: 'School-Zone Traffic Problem' },

  // 10. HEALTH & MEDICAL SUPPORT
  { id: 'health_medical_camp', moduleId: 'health', key: 'cat_health_medical_camp', icon: '🏥', name: 'Medical Camp Request' },
  { id: 'health_nearest_hospital', moduleId: 'health', key: 'cat_health_nearest_hospital', icon: '🩺', name: 'Nearest Hospital/Clinic' },
  { id: 'health_ambulance_assistance', moduleId: 'health', key: 'cat_health_ambulance_assistance', icon: '🚑', name: 'Ambulance Assistance' },
  { id: 'health_blood_donor', moduleId: 'health', key: 'cat_health_blood_donor', icon: '🩸', name: 'Blood Donor Request' },
  { id: 'health_medicine_availability', moduleId: 'health', key: 'cat_health_medicine_availability', icon: '💊', name: 'Medicine Availability' },
  { id: 'health_public_health_hazard', moduleId: 'health', key: 'cat_health_public_health_hazard', icon: '⚠️', name: 'Public Health Hazard' },
  { id: 'health_vaccination_info', moduleId: 'health', key: 'cat_health_vaccination_info', icon: '💉', name: 'Vaccination Information' },
  { id: 'health_sanitation_health_risk', moduleId: 'health', key: 'cat_health_sanitation_health_risk', icon: '☣️', name: 'Sanitation-Related Health Risk' },
  { id: 'health_emergency_medical_location', moduleId: 'health', key: 'cat_health_emergency_medical_location', icon: '📍', name: 'Emergency Medical Location' },
  { id: 'health_elderly_health_assistance', moduleId: 'health', key: 'cat_health_elderly_health_assistance', icon: '👴', name: 'Elderly Health Assistance' },

  // 11. WOMEN & CHILD SAFETY
  { id: 'safety_unsafe_public_place', moduleId: 'safety', key: 'cat_safety_unsafe_public_place', icon: '🛡️', name: 'Unsafe Public Place' },
  { id: 'safety_street_harassment', moduleId: 'safety', key: 'cat_safety_street_harassment', icon: '🚨', name: 'Street Harassment Reporting' },
  { id: 'safety_missing_child', moduleId: 'safety', key: 'cat_safety_missing_child', icon: '🧒', name: 'Missing Child Assistance' },
  { id: 'safety_child_labour', moduleId: 'safety', key: 'cat_safety_child_labour', icon: '🛑', name: 'Child Labour Reporting' },
  { id: 'safety_school_safety', moduleId: 'safety', key: 'cat_safety_school_safety', icon: '🏫', name: 'School Safety Issue' },
  { id: 'safety_women_safety_location', moduleId: 'safety', key: 'cat_safety_women_safety_location', icon: '👩', name: 'Women Safety Location' },
  { id: 'safety_domestic_support', moduleId: 'safety', key: 'cat_safety_domestic_support', icon: '🏠', name: 'Domestic Support Referral' },
  { id: 'safety_child_welfare', moduleId: 'safety', key: 'cat_safety_child_welfare', icon: '🧸', name: 'Child Welfare Assistance' },

  // 12. EDUCATION
  { id: 'edu_school_infra', moduleId: 'education', key: 'cat_edu_school_infra', icon: '🏫', name: 'School Infrastructure Problem' },
  { id: 'edu_teacher_staff_issue', moduleId: 'education', key: 'cat_edu_teacher_staff_issue', icon: '👨‍🏫', name: 'Teacher/Staff Issue' },
  { id: 'edu_missing_facilities', moduleId: 'education', key: 'cat_edu_missing_facilities', icon: '📚', name: 'Missing School Facilities' },
  { id: 'edu_scholarship_info', moduleId: 'education', key: 'cat_edu_scholarship_info', icon: '🎓', name: 'Scholarship Information' },
  { id: 'edu_student_skill_training', moduleId: 'education', key: 'cat_edu_student_skill_training', icon: '💻', name: 'Student Skill Training' },
  { id: 'edu_digital_education', moduleId: 'education', key: 'cat_edu_digital_education', icon: '📱', name: 'Digital Education Support' },
  { id: 'edu_dropout_assistance', moduleId: 'education', key: 'cat_edu_dropout_assistance', icon: '🤝', name: 'Dropout Assistance' },
  { id: 'edu_school_transport', moduleId: 'education', key: 'cat_edu_school_transport', icon: '🚌', name: 'School Transport Problem' },

  // 13. ENVIRONMENT
  { id: 'env_illegal_tree_cutting', moduleId: 'environment', key: 'cat_env_illegal_tree_cutting', icon: '🪓', name: 'Illegal Tree Cutting' },
  { id: 'env_deforestation_reporting', moduleId: 'environment', key: 'cat_env_deforestation_reporting', icon: '🌲', name: 'Deforestation Reporting' },
  { id: 'env_air_pollution', moduleId: 'environment', key: 'cat_env_air_pollution', icon: '💨', name: 'Air Pollution' },
  { id: 'env_water_pollution', moduleId: 'environment', key: 'cat_env_water_pollution', icon: '🌊', name: 'Water Pollution' },
  { id: 'env_noise_pollution', moduleId: 'environment', key: 'cat_env_noise_pollution', icon: '📢', name: 'Noise Pollution' },
  { id: 'env_illegal_mining', moduleId: 'environment', key: 'cat_env_illegal_mining', icon: '⛏️', name: 'Illegal Mining' },
  { id: 'env_industrial_pollution', moduleId: 'environment', key: 'cat_env_industrial_pollution', icon: '🏭', name: 'Industrial Pollution' },
  { id: 'env_burning_waste', moduleId: 'environment', key: 'cat_env_burning_waste', icon: '🔥', name: 'Burning of Waste' },
  { id: 'env_loss_green_space', moduleId: 'environment', key: 'cat_env_loss_green_space', icon: '🌱', name: 'Loss of Green Space' },
  { id: 'env_wildlife_animal_welfare', moduleId: 'environment', key: 'cat_env_wildlife_animal_welfare', icon: '🐾', name: 'Wildlife/Animal Welfare' },

  // 14. PUBLIC SAFETY & EMERGENCY
  { id: 'emergency_fire', moduleId: 'emergency', key: 'cat_emergency_fire', icon: '🔥', name: 'Fire Emergency' },
  { id: 'emergency_accident', moduleId: 'emergency', key: 'cat_emergency_accident', icon: '🚑', name: 'Accident Reporting' },
  { id: 'emergency_building_safety', moduleId: 'emergency', key: 'cat_emergency_building_safety', icon: '🏢', name: 'Building Safety Hazard' },
  { id: 'emergency_flood', moduleId: 'emergency', key: 'cat_emergency_flood', icon: '🌊', name: 'Flood Reporting' },
  { id: 'emergency_landslide', moduleId: 'emergency', key: 'cat_emergency_landslide', icon: '⛰️', name: 'Landslide Reporting' },
  { id: 'emergency_fallen_tree', moduleId: 'emergency', key: 'cat_emergency_fallen_tree', icon: '🌳', name: 'Fallen Tree' },

  // 15. SOCIAL RIGHTS & WELFARE (12 Modules)
  { id: 'social_scheme_awareness', moduleId: 'social', key: 'cat_social_scheme_awareness', icon: '📢', name: 'Lack of Awareness of Government Welfare Schemes' },
  { id: 'social_benefit_delay_denial', moduleId: 'social', key: 'cat_social_benefit_delay_denial', icon: '💳', name: 'Delay or Denial of Welfare Benefits' },
  { id: 'social_legal_aid', moduleId: 'social', key: 'cat_social_legal_aid', icon: '⚖️', name: 'Difficulty Accessing Free Legal Aid' },
  { id: 'social_citizen_rights_awareness', moduleId: 'social', key: 'cat_social_citizen_rights_awareness', icon: '📜', name: 'Lack of Awareness About Citizen Rights' },
  { id: 'social_discrimination', moduleId: 'social', key: 'cat_social_discrimination', icon: '🚫', name: 'Discrimination and Social Exclusion' },
  { id: 'social_senior_citizen_access', moduleId: 'social', key: 'cat_social_senior_citizen_access', icon: '👴', name: 'Senior Citizens Unable to Access Welfare Services' },
  { id: 'social_disability_support', moduleId: 'social', key: 'cat_social_disability_support', icon: '♿', name: 'Lack of Support Awareness for Persons with Disabilities' },
  { id: 'social_unemployment_awareness', moduleId: 'social', key: 'cat_social_unemployment_awareness', icon: '💼', name: 'Unemployment and Lack of Awareness of Employment Support' },
  { id: 'social_women_welfare_awareness', moduleId: 'social', key: 'cat_social_women_welfare_awareness', icon: '👩', name: 'Lack of Awareness About Women’s Welfare Services' },
  { id: 'social_homeless_vulnerable', moduleId: 'social', key: 'cat_social_homeless_vulnerable', icon: '🏠', name: 'Difficulty Finding Support for Homeless and Vulnerable People' },
  { id: 'social_child_welfare_education', moduleId: 'social', key: 'cat_social_child_welfare_education', icon: '🧒', name: 'Lack of Awareness About Child Welfare and Education Support' },
  { id: 'social_informal_workers_security', moduleId: 'social', key: 'cat_social_informal_workers_security', icon: '👷', name: 'Lack of Awareness About Social Security for Informal Workers' },

  // 16. ANIMAL WELFARE AND RESCUE (13 Modules)
  { id: 'animal_injured_reporting', moduleId: 'animal', key: 'cat_animal_injured_reporting', icon: '🐾', name: 'Report Injured Animal' },
  { id: 'animal_rescue_delay', moduleId: 'animal', key: 'cat_animal_rescue_delay', icon: '⏳', name: 'Delay in Rescuing Injured / Stray Animals' },
  { id: 'animal_nearby_orgs', moduleId: 'animal', key: 'cat_animal_nearby_orgs', icon: '📍', name: 'Find Nearby Animal Rescue Organizations' },
  { id: 'animal_missing_pet', moduleId: 'animal', key: 'cat_animal_missing_pet', icon: '🔍', name: 'Missing Pet Reporting & Reunification' },
  { id: 'animal_adoption_awareness', moduleId: 'animal', key: 'cat_animal_adoption_awareness', icon: '🐕', name: 'Animal Adoption Support' },
  { id: 'animal_abandonment', moduleId: 'animal', key: 'cat_animal_abandonment', icon: '🚪', name: 'Abandonment of Pets & Domestic Animals' },
  { id: 'animal_shelter_info', moduleId: 'animal', key: 'cat_animal_shelter_info', icon: '🏠', name: 'Animal Shelters & Sanctuaries Directory' },
  { id: 'animal_emergency_vet', moduleId: 'animal', key: 'cat_animal_emergency_vet', icon: '🩺', name: 'Emergency Veterinary Assistance' },
  { id: 'animal_food_water_support', moduleId: 'animal', key: 'cat_animal_food_water_support', icon: '🍲', name: 'Food & Water Support for Stray Animals' },
  { id: 'animal_abuse_cruelty', moduleId: 'animal', key: 'cat_animal_abuse_cruelty', icon: '🚨', name: 'Animal Abuse & Cruelty Reporting (PCA Act)' },
  { id: 'animal_volunteer_coordination', moduleId: 'animal', key: 'cat_animal_volunteer_coordination', icon: '🤝', name: 'Rescuer & Volunteer Coordination' },
  { id: 'animal_vaccine_sterilization', moduleId: 'animal', key: 'cat_animal_vaccine_sterilization', icon: '💉', name: 'Animal Vaccination & ABC Sterilization' },
  { id: 'animal_shelter_found_pet', moduleId: 'animal', key: 'cat_animal_shelter_found_pet', icon: '🦮', name: 'Finding Shelter for a Found Animal or Pet' },

  // SPECIAL & LEGACY CATEGORIES
  { id: 'pothole', moduleId: 'roads', key: 'cat_pothole', icon: '🛣️', name: 'Pothole Reporting' },
  { id: 'garbage_accumulation', moduleId: 'waste', key: 'cat_garbage_accumulation', icon: '🗑️', name: 'Garbage Accumulation' },
  { id: 'open_manhole', moduleId: 'roads', key: 'cat_open_manhole', icon: '⚠️', name: 'Open Manhole' },
  { id: 'streetlight', moduleId: 'electricity', key: 'cat_streetlight', icon: '💡', name: 'Street Light Not Working' },
  { id: 'social_child_rights', moduleId: 'social', key: 'cat_social_child_rights', icon: '🧒', name: 'Child Rights & Education Support' },
  { id: 'social_welfare', moduleId: 'social', key: 'cat_social_welfare', icon: '🛡️', name: 'Senior Citizen / Disabled Welfare Delay' },
  { id: 'gov_delay_7', moduleId: 'governance', key: 'cat_gov_delay_7', icon: '📁', name: 'Civic File Delay > 7 Days' },
  { id: 'animal_emergency', moduleId: 'animal', key: 'cat_animal_emergency', icon: '🚨', name: 'High-Priority Emergency Rescue' }
];

export const SBM_TOILETS = [
  { id: 'sbm-t1', name: 'Kalaburagi Bus Stand SBM Complex', distance: '0.3 km', rating: 4.8, status: 'Open • Clean', accessible: true },
  { id: 'sbm-t2', name: 'Ward 12 Community Smart Toilet', distance: '0.7 km', rating: 4.6, status: 'Open • Disinfected', accessible: true },
  { id: 'sbm-t3', name: 'Railway Station West SBM Washroom', distance: '1.2 km', rating: 4.4, status: 'Open 24x7', accessible: true }
];

export default function CitizenView({ language, speakText, currentUser }) {
  const [complaints, setComplaints] = useState([]);
  
  // Selected Section View (One by One Navigation Hub)
  // 'hub' | 'wizard' | 'my_issues' | 'map' | 'cleanliness' | 'blood' | 'rewards'
  const [activeSection, setActiveSection] = useState('hub');

  // Guided Reporting Stepper Wizard State (Step 1 to 4)
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardDomain, setWizardDomain] = useState('civic');
  const [selectedCategory, setSelectedCategory] = useState('garbage_accumulation');

  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Voice & Form State
  const [isRecording, setIsRecording] = useState(false);
  const [voiceQueryInput, setVoiceQueryInput] = useState('');
  const [voiceQueryResult, setVoiceQueryResult] = useState(null);
  const [voiceTranscription, setVoiceTranscription] = useState('');
  const [aiDraft, setAiDraft] = useState(null);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [aiDetectedCategory, setAiDetectedCategory] = useState(null);
  const [descriptionInput, setDescriptionInput] = useState('');
  const [inputMode, setInputMode] = useState('text');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [locationAddress, setLocationAddress] = useState('Kalaburagi Main Road, Ward 12');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [liveGpsCoords, setLiveGpsCoords] = useState('17.3325° N, 76.8380° E');
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [latestSubmittedComplaint, setLatestSubmittedComplaint] = useState(null);
  const [qrReceiptModalComplaint, setQrReceiptModalComplaint] = useState(null);

  const handleQRScanSuccess = (parsed) => {
    if (!parsed) return;
    if (parsed.type === 'ASSET') {
      if (parsed.domain) setWizardDomain(parsed.domain);
      if (parsed.category) setSelectedCategory(parsed.category);
      if (parsed.address) setLocationAddress(parsed.address);
      if (parsed.details) setDescriptionInput(`[Scanned Municipal Asset: ${parsed.assetId}] - ${parsed.details}`);
      setActiveSection('wizard');
      setWizardStep(3);
      if (speakText) speakText(`Smart City Asset ${parsed.assetId} verified. Auto-filled complaint wizard at Step 3.`);
    } else if (parsed.type === 'TRACK') {
      setActiveSection('my_issues');
      setSearchQuery(parsed.complaintId || '');
      if (speakText) speakText(`Grievance tracking receipt ${parsed.complaintId} opened.`);
    } else if (parsed.type === 'TOILET') {
      setActiveSection('cleanliness');
      if (speakText) speakText(`Smart Toilet ${parsed.toiletName} verified. Opening feedback.`);
    }
  };

  // Feedback & Extras
  const [feedbackComplaint, setFeedbackComplaint] = useState(null);
  const [ratingStars, setRatingStars] = useState(5);
  const [feedbackComments, setFeedbackComments] = useState('');

  const [bloodRequests, setBloodRequests] = useState([]);
  const [medicalCamps, setMedicalCamps] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  const [showBloodModal, setShowBloodModal] = useState(false);
  const [newBlood, setNewBlood] = useState({ bloodGroup: 'O+', hospital: '', urgency: 'Emergency', contactPhone: '' });
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState(null);

  const [offlineDrafts, setOfflineDrafts] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    loadData();
    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);
    return () => {
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
    };
  }, []);

  const handleNetworkChange = () => {
    setIsOnline(navigator.onLine);
    if (navigator.onLine && offlineDrafts.length > 0) {
      speakText('Internet restored. Synchronizing queued offline complaint drafts...');
      syncOfflineDrafts();
    }
  };

  const loadData = async () => {
    try {
      const cmpRes = await api.getComplaints();
      if (cmpRes.success) setComplaints(cmpRes.data);

      const bldRes = await api.getBloodRequests();
      if (bldRes.success) setBloodRequests(bldRes.data);

      const campRes = await api.getMedicalCamps();
      if (campRes.success) setMedicalCamps(campRes.data);

      const lbRes = await api.getLeaderboard();
      if (lbRes.success) setLeaderboard(lbRes.data);
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  const handleConfirmIssue = async (complaintId) => {
    if (!complaintId) return;
    const userUid = currentUser?.uid || currentUser?.id || 'usr-citizen-1';

    // Optimistic UI state update so counter instantly increments on click
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        const existingConfirms = Array.isArray(c.confirmations) ? [...c.confirmations] : [];
        const hasConfirmed = existingConfirms.includes(userUid);
        const updatedConfirms = hasConfirmed
          ? existingConfirms.filter(u => u !== userUid)
          : [...existingConfirms, userUid];

        return {
          ...c,
          confirmations: updatedConfirms,
          confirmCount: updatedConfirms.length
        };
      }
      return c;
    }));

    try {
      const res = await api.confirmComplaint(complaintId, userUid);
      if (res.success) {
        if (speakText) {
          speakText(`Issue verification updated! Current confirmations: ${res.count ?? 'incremented'}.`);
        }
        loadData();
      }
    } catch (err) {
      console.error('Error confirming complaint:', err);
    }
  };

  // Citizen Resolution Verification & Anti-Fake-Closure Dispute Handlers
  const [disputeModalOpen, setDisputeModalOpen] = useState(false);
  const [selectedComplaintForDispute, setSelectedComplaintForDispute] = useState(null);
  const [disputeReason, setDisputeReason] = useState('');
  const [disputePhotoEvidence, setDisputePhotoEvidence] = useState('');
  const [disputeSubmitting, setDisputeSubmitting] = useState(false);

  const handleVerifyResolution = async (complaintId) => {
    try {
      const userUid = currentUser?.uid || currentUser?.id || 'usr-citizen-1';
      const res = await api.verifyResolution(complaintId, userUid, 'Citizen confirmed resolution on ground.');
      if (res.success) {
        if (speakText) speakText('Thank you! Resolution confirmed. You earned 25 citizen points.');
        alert('🎉 Resolution Confirmed!\nThank you for verifying work quality on the ground. +25 Citizen Points awarded.');
        loadData();
      }
    } catch (err) {
      console.error('Error verifying resolution:', err);
    }
  };

  const openDisputeModal = (complaint) => {
    setSelectedComplaintForDispute(complaint);
    setDisputeReason('');
    setDisputePhotoEvidence('');
    setDisputeModalOpen(true);
  };

  const handleDisputeSubmit = async () => {
    if (!selectedComplaintForDispute) return;
    if (!disputeReason.trim()) {
      alert('Please provide a reason explaining why the issue is not resolved.');
      return;
    }
    setDisputeSubmitting(true);
    try {
      const userUid = currentUser?.uid || currentUser?.id || 'usr-citizen-1';
      const res = await api.disputeResolution(selectedComplaintForDispute.id, userUid, disputeReason, disputePhotoEvidence);
      if (res.success) {
        if (speakText) speakText('Resolution disputed! Complaint has been re-opened and escalated to Super Admin and Lokayukta.');
        alert('🚨 False Resolution Disputed!\nTicket #' + selectedComplaintForDispute.id + ' has been Re-Opened with HIGH ESCALATION to Super Admin & Vigilance Cell.');
        setDisputeModalOpen(false);
        setSelectedComplaintForDispute(null);
        setDisputeReason('');
        setDisputePhotoEvidence('');
        loadData();
      }
    } catch (err) {
      console.error('Error disputing resolution:', err);
    } finally {
      setDisputeSubmitting(false);
    }
  };

  const handleToggleVoiceRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setInputMode('voice');
      speakText(`Recording spoken complaint in ${language}. Speak now.`);

      setTimeout(async () => {
        const res = await api.processVoiceComplaint('', language);
        if (res.success) {
          setVoiceTranscription(res.transcription);
          setAiDraft({
            structured: res.aiGeneratedDescription,
            category: res.suggestedCategory,
            priority: res.priority
          });
          setSelectedCategory(res.suggestedCategory.id || 'garbage_accumulation');
          setDescriptionInput(res.aiGeneratedDescription);
          setIsRecording(false);
          speakText(`Transcription complete. Auto-classified as ${res.suggestedCategory.name}.`);
        }
      }, 3500);
    } else {
      setIsRecording(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setSelectedPhoto(fakeUrl);
      setInputMode('photo');
      speakText('Running AI image classification...');

      const res = await api.detectPhotoCategory(fakeUrl);
      if (res.success) {
        setAiDetectedCategory(res.data.category);
        setSelectedCategory(res.data.category.id || 'garbage_accumulation');
        speakText(`AI detected issue category: ${res.data.category.name} with 92% confidence.`);
      }
    }
  };

  // Safety Custom Fields State for all 8 categories
  const [safetyFields, setSafetyFields] = useState({
    // 1. Unsafe Public Place
    unsafe_address: 'Main Market Road, Ward 12, Kalaburagi',
    unsafe_place_type: 'Dark Alley / Unlit Street',
    unsafe_description: '',
    unsafe_datetime: new Date().toISOString().slice(0, 16),
    unsafe_landmark: 'Near Old Bus Stand Water Tank',
    unsafe_frequency: 'Daily after sunset',
    unsafe_severity: 'High',
    unsafe_contact: currentUser ? `${currentUser.name} (${currentUser.phone || '+91 9876543210'})` : '',
    unsafe_anonymous: false,
    unsafe_photo: null,

    // 2. Street Harassment
    harass_location: 'Station Road Junction, Kalaburagi',
    harass_datetime: new Date().toISOString().slice(0, 16),
    harass_type: 'Catcalling / Verbal Harassment',
    harass_description: '',
    harass_suspect_description: '',
    harass_ongoing: 'No',
    harass_witness_details: '',
    harass_immediate_danger: 'No',
    harass_police_assistance: 'Yes',
    harass_contact: currentUser ? `${currentUser.name}` : '',
    harass_anonymous: true,
    harass_evidence: null,

    // 3. Missing Child Assistance
    missing_child_name: '',
    missing_child_age: '',
    missing_child_gender: 'Boy',
    missing_datetime_last_seen: new Date().toISOString().slice(0, 16),
    missing_last_location: 'Central Park Play Area, Ward 12',
    missing_clothing: 'Blue t-shirt, dark denim shorts, red sandals',
    missing_id_marks: 'Small birthmark on left wrist, wears spectacles',
    missing_height_appearance: 'Approx 3 feet 8 inches, slim build, short hair',
    missing_parent_name: currentUser?.name || '',
    missing_parent_contact: currentUser?.phone || '+91 98765 00000',
    missing_fir_number: '',
    missing_additional_info: 'Speaks Kannada and Hindi.',
    missing_photo: null,

    // 4. Child Labour Reporting
    labour_location: 'Auto Garage & Tea Stall, Ring Road, Kalaburagi',
    labour_workplace_type: 'Restaurant / Tea Stall (Dhaba)',
    labour_child_age: '9 - 11 years',
    labour_child_count: '2',
    labour_work_type: 'Carrying heavy hot kettles and dishwashing',
    labour_working_hours: '7:00 AM to 9:00 PM daily (14+ hours)',
    labour_employer_details: 'Ramesh Tea Corner, Shop #14',
    labour_datetime_observed: new Date().toISOString().slice(0, 16),
    labour_description: '',
    labour_photo: null,
    labour_contact: '',
    labour_anonymous: true,

    // 5. School Safety Issue
    school_name: 'Govt Higher Secondary Model School',
    school_location: 'Near University Road, Ward 12',
    school_safety_type: 'Ragging / Severe Bullying',
    school_description: '',
    school_datetime: new Date().toISOString().slice(0, 16),
    school_authority_involved: 'Senior student group & bus attendant',
    school_students_affected: 'Multiple students (Class 8 & 9)',
    school_ongoing: 'Yes',
    school_severity: 'High',
    school_photo: null,
    school_reporter_details: currentUser ? `${currentUser.name}` : '',
    school_anonymous: false,

    // 6. Women Safety Location
    women_safety_location: 'Underpass connecting Ward 11 and Ward 12',
    women_safety_landmark: 'Next to Railway Overbridge',
    women_safety_concern_type: 'Pitch Dark / Complete Streetlight Failure',
    women_safety_unsafe_hours: 'Post 7:30 PM until dawn (All Night)',
    women_safety_description: '',
    women_safety_lighting: 'Pitch dark (all 6 light fixtures non-functional)',
    women_safety_cctv: 'No CCTV surveillance installed',
    women_safety_frequency: 'Daily occurrence',
    women_safety_improvement: 'Install 2 High-Mast LED Poles, CCTV Cameras & Pink Patrol',
    women_safety_photo: null,
    women_safety_contact: currentUser ? `${currentUser.name}` : '',
    women_safety_anonymous: false,

    // 7. Domestic Support Referral
    domestic_support_type: 'Emergency Safe Shelter & Legal Protection Order',
    domestic_nature_of_problem: 'Continuous physical violence, domestic abuse and financial deprivation',
    domestic_current_location: 'Ward 12, Kalaburagi',
    domestic_in_danger: 'Yes',
    domestic_medical_needed: 'Yes',
    domestic_shelter_needed: 'Yes',
    domestic_counselling_needed: 'Yes',
    domestic_legal_needed: 'Yes',
    domestic_preferred_contact: 'Discreet WhatsApp Message',
    domestic_safe_time: '10:00 AM - 12:00 PM when alone',
    domestic_contact_details: 'Discreet safe contact line',
    domestic_anonymous: true,

    // 8. Child Welfare Assistance
    welfare_child_name: 'Unknown / Rescued Child',
    welfare_approx_age: '5 - 6 years',
    welfare_gender: 'Girl',
    welfare_current_location: 'Near Railway Station Platform 1 Shelter',
    welfare_concern_type: 'Abandoned / Severe Malnutrition & Illness',
    welfare_condition_desc: 'Child appears malnourished, alone, feverish and in distress',
    welfare_parent_details: 'Not found in vicinity',
    welfare_medical_needed: 'Yes',
    welfare_food_shelter_needed: 'Yes',
    welfare_datetime: new Date().toISOString().slice(0, 16),
    welfare_photo: null,
    welfare_contact: currentUser ? `${currentUser.name}` : '',
    welfare_anonymous: false
  });

  // Emergency & Public Safety Custom Fields State for all 6 subcategories
  const [emergencyFields, setEmergencyFields] = useState({
    // 1. Fire Emergency
    fire_incident_type: 'Building Fire (Commercial / Residential)',
    fire_address: 'Main Market Complex, Ward 12, Kalaburagi',
    fire_landmark: 'Near Central Bank Building',
    fire_datetime: new Date().toISOString().slice(0, 16),
    fire_description: '',
    fire_severity: 'Critical',
    fire_trapped: 'No',
    fire_injured_count: '0',
    fire_nearby_hazards: 'Gas cylinders on ground floor, overhead electrical transformer',
    fire_complainant_name: currentUser?.name || 'Anita Deshmukh',
    fire_mobile_number: currentUser?.phone || '+91 98765 43210',
    fire_gps: '17.1582, 76.8422 (Ward 12)',
    fire_photo: null,

    // 2. Accident Reporting
    accident_type: 'Vehicle Collision (Car & Two-Wheeler)',
    accident_location: 'Ring Road Junction, Near Flyover, Kalaburagi',
    accident_landmark: 'Opposite HP Petrol Pump',
    accident_datetime: new Date().toISOString().slice(0, 16),
    accident_vehicles_involved: '2 (Car & Bike)',
    accident_vehicle_details: 'KA-32-M-4821 (White Sedan), KA-32-EE-1092 (Motorcycle)',
    accident_injured_count: '1',
    accident_seriously_injured: 'Yes',
    accident_ambulance_required: 'Yes',
    accident_traffic_obstruction: 'Yes',
    accident_description: '',
    accident_witness_details: 'Shopkeeper at petrol pump tea stall',
    accident_gps: '17.1590, 76.8430',
    accident_name: currentUser?.name || 'Anita Deshmukh',
    accident_phone: currentUser?.phone || '+91 98765 43210',
    accident_photo: null,

    // 3. Building Safety Hazard
    bld_hazard_type: 'Structural Cracks & Balcony Collapse Risk',
    bld_address: 'Building #42, Shivaji Nagar Main Road, Ward 12',
    bld_type: 'Residential Apartment (G+4)',
    bld_floors: '4 Floors',
    bld_location_within: 'Pillar #3 & 2nd Floor Balcony Slab',
    bld_description: '',
    bld_severity: 'High - Serious Collapse Risk',
    bld_occupied: 'Yes',
    bld_people_at_risk: '16 Families (~60 People)',
    bld_datetime_noticed: new Date().toISOString().slice(0, 16),
    bld_gps: '17.1575, 76.8410',
    bld_name: currentUser?.name || 'Anita Deshmukh',
    bld_phone: currentUser?.phone || '+91 98765 43210',
    bld_photo: null,

    // 4. Flood Reporting
    flood_type: 'Road & Underpass Waterlogging / Drainage Overflow',
    flood_location: 'Railway Station Underpass & Colony Road, Kalaburagi',
    flood_landmark: 'Near Station West Gate',
    flood_datetime: new Date().toISOString().slice(0, 16),
    flood_water_level: 'High (3 to 4 Feet Submerged)',
    flood_area_affected: 'Approx 500 meters stretch, 20 shops',
    flood_people_affected: '200+ commuters & local residents',
    flood_houses_affected: '12 ground-floor houses & 8 shops',
    flood_roads_blocked: 'Yes',
    flood_electricity_affected: 'Yes',
    flood_trapped: 'No',
    flood_evacuation: 'Yes',
    flood_gps: '17.1560, 76.8440',
    flood_name: currentUser?.name || 'Anita Deshmukh',
    flood_phone: currentUser?.phone || '+91 98765 43210',
    flood_photo: null,

    // 5. Landslide Reporting
    landslide_type: 'Hill Slope Collapse & Rockfall Road Blockage',
    landslide_location: 'Ghat Section Road, Outer Ring Route',
    landslide_landmark: 'Near Viewpoint Km Stone 14',
    landslide_datetime: new Date().toISOString().slice(0, 16),
    landslide_severity: 'Major Slope Failure (Entire lane blocked)',
    landslide_road_blocked: 'Yes',
    landslide_buildings_affected: 'No',
    landslide_trapped_injured: 'No',
    landslide_vehicles_affected: '1 Truck stranded safely',
    landslide_affected_area: 'Approx 80 meters road stretch',
    landslide_risk_further: 'High (Active rain & loose gravel)',
    landslide_gps: '17.1620, 76.8500',
    landslide_name: currentUser?.name || 'Anita Deshmukh',
    landslide_phone: currentUser?.phone || '+91 98765 43210',
    landslide_photo: null,

    // 6. Fallen Tree
    tree_location: 'Court Road, Opposite Civil Hospital Main Gate',
    tree_landmark: 'Near Govt Hospital Gate #2',
    tree_datetime: new Date().toISOString().slice(0, 16),
    tree_cause: 'Heavy Rain & Wind Storm',
    tree_blocking_road: 'Yes',
    tree_on_building: 'No',
    tree_on_vehicle: 'Yes (1 Parked Car Damaged)',
    tree_wires_affected: 'Yes (HT Power Cable Snapped)',
    tree_injured: 'No',
    tree_traffic_obstruction: 'Complete',
    tree_urgency: 'Emergency / Immediate Removal',
    tree_gps: '17.1585, 76.8415',
    tree_name: currentUser?.name || 'Anita Deshmukh',
    tree_phone: currentUser?.phone || '+91 98765 43210',
    tree_photo: null
  });

  // 1. Anti-Corruption & Vigilance Fields State
  const [corruptionFields, setCorruptionFields] = useState({
    // Common
    identity_preference: 'Confidential',
    incident_date: new Date().toISOString().slice(0, 10),
    incident_time: '11:30',
    gps_location: '17.3297° N, 76.8343° E (Kalaburagi)',
    witness_details: '',
    previous_complaint: 'No',
    previous_complaint_id: '',
    evidence_file: null,

    // Bribery
    bribe_dept_name: 'Revenue & Tehsildar Office, Kalaburagi',
    bribe_dept_address: 'Mini Vidhana Soudha, Main Road',
    bribe_official_name: 'R. K. Kulkarni',
    bribe_official_designation: 'First Division Assistant (FDA)',
    bribe_service_requested: 'Land Mutation Certificate & Khata Transfer',
    bribe_purpose_visit: 'Document submission & verification',
    bribe_amount_demanded: '5000',
    bribe_amount_paid: '0',
    bribe_reason_given: 'Speed up file processing and bypass objection',
    bribe_payment_method: 'Cash',
    bribe_category: 'Bribe for document processing',

    // Misconduct
    misconduct_dept_name: 'Kalaburagi City Municipal Corporation',
    misconduct_office_address: 'Station Road, Kalaburagi',
    misconduct_official_name: 'S. N. Patil',
    misconduct_designation: 'Assistant Executive Engineer',
    misconduct_service_requested: 'Sanction for Domestic Water Connection',
    misconduct_ref_number: 'APP-2026-KMC-9941',
    misconduct_service_status: 'Service Denied',
    misconduct_reason_given: 'File misplaced / Officer unavailable indefinitely',
    misconduct_prev_visits: '4',
    misconduct_category: 'Unauthorized refusal',

    // Commission
    comm_dept_name: 'Regional Transport Office (RTO), Kalaburagi',
    comm_agent_name: 'Vijay Agency / Token Counter Staff',
    comm_designation: 'Licensing Agent / Counter Clerk',
    comm_service_involved: 'Commercial Driving License Renewal',
    comm_official_fee: '500',
    comm_extra_demanded: '1200',
    comm_reason_given: 'Processing facilitation and immediate token issuance',
    comm_receipt_provided: 'No',
    comm_payment_method: 'UPI (QR Code shown at side desk)',

    // Scheme
    scheme_name: 'Pradhan Mantri Awas Yojana (Urban)',
    scheme_category: 'Housing',
    scheme_department: 'Urban Poverty Alleviation Board',
    scheme_app_number: 'PMAY-U-2026-4821',
    scheme_beneficiary_name: currentUser?.name || 'Anita Deshmukh',
    scheme_beneficiary_id: 'BEN-KA-99120',
    scheme_expected_benefit: '₹1,50,000 Installment Subsidy',
    scheme_benefit_received: '₹1,00,000 Received (₹50,000 Withheld)',
    scheme_amount_demanded: '15000',
    scheme_official_name: 'Field Officer Mahendra',

    // Fake Docs
    fake_doc_type: 'Income & Caste Certificate',
    fake_doc_number: 'RD-0038842199-KAR',
    fake_issuing_office: 'Old City Center Nadakacheri',
    fake_why_fake: 'QR code fails verification and barcode belongs to different citizen',

    // Tender
    tender_number: 'KMC-ROAD-TNDR-2026-08',
    tender_dept: 'Public Works Department (PWD) / KMC Civil Cell',
    tender_project_name: 'Ward 12 Stormwater Drain & Bitumen Road Asphalt Project',
    tender_contractor: 'Apex Infra Projects Pvt Ltd',
    tender_contract_value: '₹2,40,00,000',
    tender_estimated_cost: '₹1,60,00,000',
    tender_irregularity_category: 'Bid manipulation & Overpricing',
    tender_amount_involved: '₹80,00,000 Excess Inflation',

    // Recruitment
    recruitment_org: 'Karnataka Municipal Administrative Services Board',
    recruitment_job_position: 'Junior Health Inspector (Group C)',
    recruitment_amount_demanded: '400000',
    recruitment_official_name: 'Middleman claiming access to Selection Committee',
    recruitment_category: 'Bribe for job selection',

    // Police
    police_station_name: 'Brahampur Police Station, Kalaburagi',
    police_officer_name: 'Sub-Inspector (PSI) R. Hiremath',
    police_badge_no: 'PSI-KA-32-441',
    police_type_misconduct: 'Refusal to register complaint',
    police_money_demanded: '₹10,000 demanded to accept theft FIR',
    police_category: 'Refusal to register FIR & Bribe demand',

    // Land
    land_survey_no: 'Survey # 142/2B, Ward 12',
    land_owner_name: 'Govind Rao Deshmukh (Deceased)',
    land_official_involved: 'Village Accountant & Sub-Registrar Clerk',
    land_category: 'Unauthorized ownership change & Forged mutation',

    // Ration
    ration_shop_no: 'Fair Price Shop (FPS) # 44, Ward 12',
    ration_card_no: 'BPL-KAR-0842-1192',
    ration_quantity_expected: '20 kg Rice, 5 kg Wheat',
    ration_quantity_received: '12 kg Rice, 3 kg Wheat',
    ration_amount_paid: '₹150',
    ration_category: 'Less ration supplied & Overcharging',

    // School Misconduct
    school_inst_name: 'Adarsha PU College & Science Institute',
    school_official_name: 'Principal S. M. Channur',
    school_misconduct_cat: 'Unauthorized fee & Certificate withholding',
    school_amount_involved: '₹12,000 mandatory donation',

    // Health
    health_hospital_name: 'Kalaburagi District Civil General Hospital (GIMS)',
    health_staff_name: 'Staff Nurse & Pharmacy In-Charge',
    health_category: 'Free medicine being sold & Bribe for surgery date',
    health_official_fee: '0',
    health_extra_amount: '8000'
  });

  // 2. Unemployment & Jobs Fields State
  const [unemploymentFields, setUnemploymentFields] = useState({
    user_name: currentUser?.name || 'Rahul Patil',
    user_age: '24',
    user_gender: 'Male',
    user_education: 'Diploma in Computer Science / IT',
    skill_category: 'Computer/IT',
    skill_required: 'Python & Web Full Stack Development',
    skill_preferred_center: 'Govt Tool Room & Training Centre (GTTC), Kalaburagi',
    skill_training_mode: 'Hybrid (Offline + Online)',
    gig_job_type: 'Technician & Office IT Support',
    gig_expected_salary: '₹18,000 - ₹22,000 / month',
    gig_max_travel: '10 km',
    job_role_required: 'Junior Software Associate / Data Entry Operator',
    apprentice_college: 'Government Polytechnic College, Kalaburagi',
    resume_objective: 'Seeking an entry-level software associate position to build scalable civic web applications',
    resume_target_role: 'Associate React Developer / IT Specialist',
    scam_company_name: 'FastTrack Career Consultancy Pvt Ltd',
    scam_recruiter_phone: '+91 99001 88412',
    scam_fraud_type: 'Registration fee scam / Advance laptop security demand',
    scam_amount_demanded: '₹4,500',
    scam_amount_paid: '₹1,500',
    scam_description: 'Demanded advance security fee for laptop courier. Stopped responding once paid.',
    migrant_native_district: 'Rural Afzalpur, Kalaburagi',
    migrant_support_type: 'Job placement + Municipal Shelter'
  });

  // 3. Water & Cleanliness Fields State
  const [cleanlinessFields, setCleanlinessFields] = useState({
    waste_collection_point: 'Doorstep Household Gate # 14',
    waste_days_not_collected: '3',
    waste_type: 'Household Wet Waste',
    bin_location: 'Near Old Bus Stand Circle',
    bin_number: 'KMC-BIN-084',
    bin_condition: 'Overflowing for 4 days and animals scattering waste',
    dumping_location: 'Empty plot behind Ward 12 Community Hall',
    dumping_waste_type: 'Construction Debris & Industrial Plastic Scrap',
    burning_location: 'Open Ground near Central Railway Tracks',
    burning_waste_type: 'Dry leaves and toxic plastic packaging',
    plastic_type: 'Single-use plastic bags & thermocol cups',
    ewaste_types: '2 Desktop CPUs, Old CRT Monitor, 4 Batteries',
    bio_hospital_name: 'City Care Nursing Home / Private Clinic',
    bio_waste_type: 'Used syringes, infected dressings & blood-contaminated cotton',
    construction_site: 'Building Plot # 44 Commercial Complex',
    construction_waste: 'Broken concrete slabs, sand mounds & bricks',
    drain_location: 'Main Storm Drain near Brahampur Junction',
    drain_blockage: 'Complete blockage with stagnant sewage overflow',
    toilet_location: 'Bus Stand SBM Community Toilet Complex',
    toilet_condition: 'Very Dirty (No running water & choked toilets)',
    recycle_material: 'Cardboard cartons, Old newspapers, Plastic bottles',
    animal_waste_type: 'Stray Cattle dung & street dog scattered waste',
    accumulation_spot: 'Chronic Blackspot, Corner of 4th Cross, Ward 12',
    water_conn_number: 'KUWSDB-CONN-009841',
    water_days_without_supply: '4 Days',
    water_leakage_location: 'Underground Main Pipeline near Sedam Road Petrol Pump',
    contamination_water_source: 'Municipal Tap Water Supply (KUWSDB)',
    contamination_color: 'Yellowish-brown muddy color with sewage odor'
  });

  // 4. Education Fields State
  const [educationFields, setEducationFields] = useState({
    school_name: 'Government Girls Model High School, Brahampur',
    school_address: 'Near Old Bus Stand Road, Kalaburagi',
    school_code: 'UDISE-29040812901',
    infra_problem_type: 'Roof leakage & ceiling cracks in Science Lab',
    infra_location: 'Room # 14 (Ground Floor Science Wing)',
    infra_students_affected: '45 Students in Class 10',
    teacher_name: 'Science Teacher & Laboratory In-charge',
    teacher_issue: 'Teacher absenteeism & unauthorized fee demand',
    facility_missing: 'Functional Separate Girls Toilets & Safe Drinking Water RO Filter',
    scholarship_name: 'Karnataka Post-Matric & Minority Pre-Matric Scholarship',
    scholarship_app_no: 'NSP-KA-2026-991204',
    scholarship_issue: 'Scholarship DBT payment delayed by 6 months',
    skill_interest: 'Python Coding, Web Design & AI Literacy',
    digital_device_need: 'Student Tablet & Free Education SIM Card',
    dropout_reason: 'Inability to afford textbooks & transportation after family crisis',
    transport_bus_no: 'Route # 12B (Afzalpur Cross to Model School)'
  });

  const handleCorruptionChange = (field, value) => {
    setCorruptionFields(prev => ({ ...prev, [field]: value }));
  };

  const handleUnemploymentChange = (field, value) => {
    setUnemploymentFields(prev => ({ ...prev, [field]: value }));
  };

  const handleCleanlinessChange = (field, value) => {
    setCleanlinessFields(prev => ({ ...prev, [field]: value }));
  };

  const handleEducationChange = (field, value) => {
    setEducationFields(prev => ({ ...prev, [field]: value }));
  };

  const handleSafetyChange = (field, value) => {
    setSafetyFields(prev => ({ ...prev, [field]: value }));
  };

  const handleEmergencyChange = (field, value) => {
    setEmergencyFields(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitComplaint = async (e) => {
    if (e) e.preventDefault();

    let finalDesc = descriptionInput || voiceTranscription || 'Society 360 complaint filed by citizen.';
    let finalAddress = locationAddress;
    let finalAnonymous = isAnonymous;
    let customFields = {};
    let customPriority = 'Medium';

    // Compile specific domain payload when safety category is selected
    if (selectedCategory === 'safety_unsafe_public_place') {
      finalAddress = safetyFields.unsafe_address || locationAddress;
      finalAnonymous = safetyFields.unsafe_anonymous;
      customPriority = safetyFields.unsafe_severity === 'Critical' ? 'High' : 'High';
      customFields = {
        locationAddress: safetyFields.unsafe_address,
        placeType: safetyFields.unsafe_place_type,
        description: safetyFields.unsafe_description,
        dateTimeNoticed: safetyFields.unsafe_datetime,
        landmark: safetyFields.unsafe_landmark,
        frequency: safetyFields.unsafe_frequency,
        severityLevel: safetyFields.unsafe_severity,
        reporterContact: safetyFields.unsafe_contact,
        isAnonymous: safetyFields.unsafe_anonymous
      };
      finalDesc = `[UNSAFE PUBLIC PLACE] ${safetyFields.unsafe_place_type} at ${safetyFields.unsafe_address} (Near ${safetyFields.unsafe_landmark}). Severity: ${safetyFields.unsafe_severity}. Frequency: ${safetyFields.unsafe_frequency}. Details: ${safetyFields.unsafe_description || descriptionInput || 'Unsafe area reported.'}`;
    } else if (selectedCategory === 'safety_street_harassment') {
      finalAddress = safetyFields.harass_location || locationAddress;
      finalAnonymous = safetyFields.harass_anonymous;
      customPriority = 'High';
      customFields = {
        location: safetyFields.harass_location,
        dateTime: safetyFields.harass_datetime,
        harassmentType: safetyFields.harass_type,
        description: safetyFields.harass_description,
        suspectDescription: safetyFields.harass_suspect_description,
        isOngoing: safetyFields.harass_ongoing,
        witnessDetails: safetyFields.harass_witness_details,
        immediateDanger: safetyFields.harass_immediate_danger,
        policeAssistanceRequired: safetyFields.harass_police_assistance,
        reporterContact: safetyFields.harass_contact,
        isAnonymous: safetyFields.harass_anonymous
      };
      finalDesc = `[STREET HARASSMENT] ${safetyFields.harass_type} at ${safetyFields.harass_location}. Ongoing: ${safetyFields.harass_ongoing}. Immediate Danger: ${safetyFields.harass_immediate_danger}. Police SOS: ${safetyFields.harass_police_assistance}. Suspect: ${safetyFields.harass_suspect_description || 'N/A'}. Details: ${safetyFields.harass_description || descriptionInput || 'Harassment reported.'}`;
    } else if (selectedCategory === 'safety_missing_child') {
      finalAddress = safetyFields.missing_last_location || locationAddress;
      finalAnonymous = false;
      customPriority = 'High';
      customFields = {
        childName: safetyFields.missing_child_name || 'Missing Child',
        age: safetyFields.missing_child_age,
        gender: safetyFields.missing_child_gender,
        dateTimeLastSeen: safetyFields.missing_datetime_last_seen,
        lastKnownLocation: safetyFields.missing_last_location,
        clothingWorn: safetyFields.missing_clothing,
        idMarks: safetyFields.missing_id_marks,
        heightAppearance: safetyFields.missing_height_appearance,
        parentName: safetyFields.missing_parent_name,
        parentContact: safetyFields.missing_parent_contact,
        firNumber: safetyFields.missing_fir_number,
        additionalInfo: safetyFields.missing_additional_info
      };
      finalDesc = `[MISSING CHILD ASSISTANCE] Child: ${safetyFields.missing_child_name}, Age: ${safetyFields.missing_child_age}, Gender: ${safetyFields.missing_child_gender}. Last seen at ${safetyFields.missing_last_location} on ${safetyFields.missing_datetime_last_seen}. Clothing: ${safetyFields.missing_clothing}. Marks: ${safetyFields.missing_id_marks}. Parent Contact: ${safetyFields.missing_parent_contact}. FIR: ${safetyFields.missing_fir_number || 'N/A'}.`;
    } else if (selectedCategory === 'safety_child_labour') {
      finalAddress = safetyFields.labour_location || locationAddress;
      finalAnonymous = safetyFields.labour_anonymous;
      customPriority = 'High';
      customFields = {
        location: safetyFields.labour_location,
        workplaceType: safetyFields.labour_workplace_type,
        approxAge: safetyFields.labour_child_age,
        childrenCount: safetyFields.labour_child_count,
        workType: safetyFields.labour_work_type,
        workingHours: safetyFields.labour_working_hours,
        employerDetails: safetyFields.labour_employer_details,
        dateTimeObserved: safetyFields.labour_datetime_observed,
        description: safetyFields.labour_description,
        isAnonymous: safetyFields.labour_anonymous
      };
      finalDesc = `[CHILD LABOUR REPORT] ${safetyFields.labour_child_count} child(ren) (~${safetyFields.labour_child_age}) at ${safetyFields.labour_workplace_type} (${safetyFields.labour_location}). Work: ${safetyFields.labour_work_type}. Hours: ${safetyFields.labour_working_hours}. Employer: ${safetyFields.labour_employer_details}. Details: ${safetyFields.labour_description || descriptionInput || 'Child labour observed.'}`;
    } else if (selectedCategory === 'safety_school_safety') {
      finalAddress = safetyFields.school_location || locationAddress;
      finalAnonymous = safetyFields.school_anonymous;
      customPriority = safetyFields.school_severity === 'Critical' ? 'High' : 'High';
      customFields = {
        schoolName: safetyFields.school_name,
        schoolLocation: safetyFields.school_location,
        safetyIssueType: safetyFields.school_safety_type,
        description: safetyFields.school_description,
        dateTime: safetyFields.school_datetime,
        authorityInvolved: safetyFields.school_authority_involved,
        studentsAffected: safetyFields.school_students_affected,
        isOngoing: safetyFields.school_ongoing,
        severityLevel: safetyFields.school_severity,
        reporterDetails: safetyFields.school_reporter_details,
        isAnonymous: safetyFields.school_anonymous
      };
      finalDesc = `[SCHOOL SAFETY ISSUE] ${safetyFields.school_name} (${safetyFields.school_location}) - ${safetyFields.school_safety_type}. Ongoing: ${safetyFields.school_ongoing}. Students affected: ${safetyFields.school_students_affected}. Authority: ${safetyFields.school_authority_involved}. Details: ${safetyFields.school_description || descriptionInput || 'School safety issue reported.'}`;
    } else if (selectedCategory === 'safety_women_safety_location') {
      finalAddress = safetyFields.women_safety_location || locationAddress;
      finalAnonymous = safetyFields.women_safety_anonymous;
      customPriority = 'Medium';
      customFields = {
        exactLocation: safetyFields.women_safety_location,
        landmark: safetyFields.women_safety_landmark,
        safetyConcernType: safetyFields.women_safety_concern_type,
        unsafeHours: safetyFields.women_safety_unsafe_hours,
        description: safetyFields.women_safety_description,
        lightingCondition: safetyFields.women_safety_lighting,
        cctvAvailability: safetyFields.women_safety_cctv,
        frequencyOfIncidents: safetyFields.women_safety_frequency,
        suggestedImprovement: safetyFields.women_safety_improvement,
        isAnonymous: safetyFields.women_safety_anonymous
      };
      finalDesc = `[WOMEN SAFETY LOCATION] ${safetyFields.women_safety_location} (Near ${safetyFields.women_safety_landmark}). Concern: ${safetyFields.women_safety_concern_type}. Lighting: ${safetyFields.women_safety_lighting}. CCTV: ${safetyFields.women_safety_cctv}. Suggested: ${safetyFields.women_safety_improvement}. Unsafe hours: ${safetyFields.women_safety_unsafe_hours}.`;
    } else if (selectedCategory === 'safety_domestic_support') {
      finalAddress = safetyFields.domestic_current_location || locationAddress;
      finalAnonymous = safetyFields.domestic_anonymous;
      customPriority = 'High';
      customFields = {
        supportType: safetyFields.domestic_support_type,
        natureOfProblem: safetyFields.domestic_nature_of_problem,
        currentLocation: safetyFields.domestic_current_location,
        currentlyInDanger: safetyFields.domestic_in_danger,
        medicalHelpRequired: safetyFields.domestic_medical_needed,
        shelterRequired: safetyFields.domestic_shelter_needed,
        counsellingRequired: safetyFields.domestic_counselling_needed,
        legalAssistanceRequired: safetyFields.domestic_legal_needed,
        preferredContactMethod: safetyFields.domestic_preferred_contact,
        safeContactTime: safetyFields.domestic_safe_time,
        contactDetails: safetyFields.domestic_contact_details,
        isAnonymous: safetyFields.domestic_anonymous
      };
      finalDesc = `[DOMESTIC SUPPORT REFERRAL] Support: ${safetyFields.domestic_support_type}. In Danger: ${safetyFields.domestic_in_danger}. Medical: ${safetyFields.domestic_medical_needed}, Shelter: ${safetyFields.domestic_shelter_needed}, Legal: ${safetyFields.domestic_legal_needed}. Safe time: ${safetyFields.domestic_safe_time}. Mode: ${safetyFields.domestic_preferred_contact}.`;
    } else if (selectedCategory === 'safety_child_welfare') {
      finalAddress = safetyFields.welfare_current_location || locationAddress;
      finalAnonymous = safetyFields.welfare_anonymous;
      customPriority = 'High';
      customFields = {
        childName: safetyFields.welfare_child_name,
        approxAge: safetyFields.welfare_approx_age,
        gender: safetyFields.welfare_gender,
        currentLocation: safetyFields.welfare_current_location,
        welfareConcernType: safetyFields.welfare_concern_type,
        conditionDescription: safetyFields.welfare_condition_desc,
        parentDetails: safetyFields.welfare_parent_details,
        medicalAssistanceRequired: safetyFields.welfare_medical_needed,
        foodShelterRequired: safetyFields.welfare_food_shelter_needed,
        dateTimeObserved: safetyFields.welfare_datetime,
        isAnonymous: safetyFields.welfare_anonymous
      };
      finalDesc = `[CHILD WELFARE ASSISTANCE] Child: ${safetyFields.welfare_child_name} (~${safetyFields.welfare_approx_age}, ${safetyFields.welfare_gender}) at ${safetyFields.welfare_current_location}. Concern: ${safetyFields.welfare_concern_type}. Condition: ${safetyFields.welfare_condition_desc}. Medical needed: ${safetyFields.welfare_medical_needed}, Food/Shelter: ${safetyFields.welfare_food_shelter_needed}.`;
    }

    // Compile specific domain payload when EMERGENCY category is selected
    else if (selectedCategory === 'emergency_fire') {
      finalAddress = emergencyFields.fire_address || locationAddress;
      customPriority = 'High';
      customFields = {
        incidentType: emergencyFields.fire_incident_type,
        exactAddress: emergencyFields.fire_address,
        landmark: emergencyFields.fire_landmark,
        dateTimeOfIncident: emergencyFields.fire_datetime,
        description: emergencyFields.fire_description,
        severity: emergencyFields.fire_severity,
        anyoneTrapped: emergencyFields.fire_trapped,
        peopleInjuredCount: emergencyFields.fire_injured_count,
        nearbyHazards: emergencyFields.fire_nearby_hazards,
        complainantName: emergencyFields.fire_complainant_name,
        mobileNumber: emergencyFields.fire_mobile_number,
        gpsLocation: emergencyFields.fire_gps
      };
      finalDesc = `[FIRE EMERGENCY] ${emergencyFields.fire_incident_type} at ${emergencyFields.fire_address} (Near ${emergencyFields.fire_landmark}). Severity: ${emergencyFields.fire_severity}. Trapped: ${emergencyFields.fire_trapped}. Injured: ${emergencyFields.fire_injured_count}. Hazards: ${emergencyFields.fire_nearby_hazards}. Complainant: ${emergencyFields.fire_complainant_name} (${emergencyFields.fire_mobile_number}). Details: ${emergencyFields.fire_description || descriptionInput || 'Fire emergency reported.'}`;
    } else if (selectedCategory === 'emergency_accident') {
      finalAddress = emergencyFields.accident_location || locationAddress;
      customPriority = 'High';
      customFields = {
        accidentType: emergencyFields.accident_type,
        exactLocation: emergencyFields.accident_location,
        landmark: emergencyFields.accident_landmark,
        dateTime: emergencyFields.accident_datetime,
        vehiclesInvolvedCount: emergencyFields.accident_vehicles_involved,
        vehicleDetails: emergencyFields.accident_vehicle_details,
        injuredPeopleCount: emergencyFields.accident_injured_count,
        seriouslyInjured: emergencyFields.accident_seriously_injured,
        ambulanceRequired: emergencyFields.accident_ambulance_required,
        trafficObstruction: emergencyFields.accident_traffic_obstruction,
        description: emergencyFields.accident_description,
        witnessDetails: emergencyFields.accident_witness_details,
        gpsLocation: emergencyFields.accident_gps,
        complainantName: emergencyFields.accident_name,
        mobileNumber: emergencyFields.accident_phone
      };
      finalDesc = `[ACCIDENT REPORT] ${emergencyFields.accident_type} at ${emergencyFields.accident_location} (Near ${emergencyFields.accident_landmark}). Vehicles: ${emergencyFields.accident_vehicle_details}. Injured: ${emergencyFields.accident_injured_count} (Serious: ${emergencyFields.accident_seriously_injured}). Ambulance needed: ${emergencyFields.accident_ambulance_required}. Traffic blocked: ${emergencyFields.accident_traffic_obstruction}. Complainant: ${emergencyFields.accident_name} (${emergencyFields.accident_phone}). Details: ${emergencyFields.accident_description || descriptionInput || 'Accident reported.'}`;
    } else if (selectedCategory === 'emergency_building_safety') {
      finalAddress = emergencyFields.bld_address || locationAddress;
      customPriority = 'High';
      customFields = {
        hazardType: emergencyFields.bld_hazard_type,
        buildingAddress: emergencyFields.bld_address,
        buildingType: emergencyFields.bld_type,
        numberOfFloors: emergencyFields.bld_floors,
        locationWithinBuilding: emergencyFields.bld_location_within,
        description: emergencyFields.bld_description,
        severityLevel: emergencyFields.bld_severity,
        isOccupied: emergencyFields.bld_occupied,
        peopleAtRiskCount: emergencyFields.bld_people_at_risk,
        dateTimeNoticed: emergencyFields.bld_datetime_noticed,
        gpsLocation: emergencyFields.bld_gps,
        complainantName: emergencyFields.bld_name,
        contactNumber: emergencyFields.bld_phone
      };
      finalDesc = `[BUILDING SAFETY HAZARD] ${emergencyFields.bld_hazard_type} at ${emergencyFields.bld_address} (${emergencyFields.bld_type}, ${emergencyFields.bld_floors}). Spot: ${emergencyFields.bld_location_within}. Severity: ${emergencyFields.bld_severity}. Occupied: ${emergencyFields.bld_occupied} (~${emergencyFields.bld_people_at_risk} at risk). Complainant: ${emergencyFields.bld_name} (${emergencyFields.bld_phone}). Details: ${emergencyFields.bld_description || descriptionInput || 'Building hazard reported.'}`;
    } else if (selectedCategory === 'emergency_flood') {
      finalAddress = emergencyFields.flood_location || locationAddress;
      customPriority = 'High';
      customFields = {
        floodType: emergencyFields.flood_type,
        exactLocation: emergencyFields.flood_location,
        landmark: emergencyFields.flood_landmark,
        dateTime: emergencyFields.flood_datetime,
        waterLevel: emergencyFields.flood_water_level,
        areaAffected: emergencyFields.flood_area_affected,
        peopleAffectedCount: emergencyFields.flood_people_affected,
        housesAffectedCount: emergencyFields.flood_houses_affected,
        roadsBlocked: emergencyFields.flood_roads_blocked,
        electricityAffected: emergencyFields.flood_electricity_affected,
        peopleTrapped: emergencyFields.flood_trapped,
        evacuationRequired: emergencyFields.flood_evacuation,
        gpsLocation: emergencyFields.flood_gps,
        complainantName: emergencyFields.flood_name,
        mobileNumber: emergencyFields.flood_phone
      };
      finalDesc = `[FLOOD REPORT] ${emergencyFields.flood_type} at ${emergencyFields.flood_location} (Near ${emergencyFields.flood_landmark}). Water Level: ${emergencyFields.flood_water_level}. Area: ${emergencyFields.flood_area_affected}. Houses: ${emergencyFields.flood_houses_affected}. Roads blocked: ${emergencyFields.flood_roads_blocked}, Power off: ${emergencyFields.flood_electricity_affected}, Evacuation needed: ${emergencyFields.flood_evacuation}. Complainant: ${emergencyFields.flood_name} (${emergencyFields.flood_phone}).`;
    } else if (selectedCategory === 'emergency_landslide') {
      finalAddress = emergencyFields.landslide_location || locationAddress;
      customPriority = 'High';
      customFields = {
        landslideType: emergencyFields.landslide_type,
        exactLocation: emergencyFields.landslide_location,
        landmark: emergencyFields.landslide_landmark,
        dateTime: emergencyFields.landslide_datetime,
        sizeSeverity: emergencyFields.landslide_severity,
        roadBlocked: emergencyFields.landslide_road_blocked,
        buildingsAffected: emergencyFields.landslide_buildings_affected,
        peopleTrappedInjured: emergencyFields.landslide_trapped_injured,
        vehiclesAffected: emergencyFields.landslide_vehicles_affected,
        affectedArea: emergencyFields.landslide_affected_area,
        riskOfFurtherLandslide: emergencyFields.landslide_risk_further,
        gpsLocation: emergencyFields.landslide_gps,
        complainantName: emergencyFields.landslide_name,
        contactNumber: emergencyFields.landslide_phone
      };
      finalDesc = `[LANDSLIDE REPORT] ${emergencyFields.landslide_type} at ${emergencyFields.landslide_location} (Near ${emergencyFields.landslide_landmark}). Severity: ${emergencyFields.landslide_severity}. Road Blocked: ${emergencyFields.landslide_road_blocked}. Vehicles: ${emergencyFields.landslide_vehicles_affected}. Further Risk: ${emergencyFields.landslide_risk_further}. Complainant: ${emergencyFields.landslide_name} (${emergencyFields.landslide_phone}).`;
    } else if (selectedCategory === 'emergency_fallen_tree') {
      finalAddress = emergencyFields.tree_location || locationAddress;
      customPriority = 'High';
      customFields = {
        exactLocation: emergencyFields.tree_location,
        landmark: emergencyFields.tree_landmark,
        dateTime: emergencyFields.tree_datetime,
        cause: emergencyFields.tree_cause,
        treeBlockingRoad: emergencyFields.tree_blocking_road,
        treeFallenOnBuilding: emergencyFields.tree_on_building,
        treeFallenOnVehicle: emergencyFields.tree_on_vehicle,
        electricalWiresAffected: emergencyFields.tree_wires_affected,
        peopleInjured: emergencyFields.tree_injured,
        trafficObstruction: emergencyFields.tree_traffic_obstruction,
        urgencyLevel: emergencyFields.tree_urgency,
        gpsLocation: emergencyFields.tree_gps,
        complainantName: emergencyFields.tree_name,
        mobileNumber: emergencyFields.tree_phone
      };
      finalDesc = `[FALLEN TREE HAZARD] Fallen tree at ${emergencyFields.tree_location} (Near ${emergencyFields.tree_landmark}). Cause: ${emergencyFields.tree_cause}. Traffic Obstruction: ${emergencyFields.tree_traffic_obstruction}. Power wires affected: ${emergencyFields.tree_wires_affected}, Vehicle hit: ${emergencyFields.tree_on_vehicle}. Urgency: ${emergencyFields.tree_urgency}. Complainant: ${emergencyFields.tree_name} (${emergencyFields.tree_phone}).`;
    }

    const payload = {
      reporterId: finalAnonymous ? null : currentUser?.uid || 'usr-citizen-1',
      reporterName: finalAnonymous ? 'Anonymous Citizen' : currentUser?.name || 'Anita Deshmukh',
      category: selectedCategory,
      subcategory: selectedCategory,
      customFields,
      priority: customPriority,
      rawDescription: finalDesc,
      inputMode,
      languageUsed: language,
      mediaUrls: selectedPhoto ? [selectedPhoto] : [],
      location: {
        lat: 17.1582 + (Math.random() - 0.5) * 0.05,
        lng: 76.8422 + (Math.random() - 0.5) * 0.05,
        address: finalAddress,
        ward: `Ward ${Math.floor(Math.random() * 20) + 1}`
      }
    };

    if (!isOnline) {
      setOfflineDrafts([...offlineDrafts, payload]);
      setSubmitSuccessMsg('Network unavailable. Saved to Offline Queue. Will auto-sync when online.');
      speakText('Draft saved offline.');
      setActiveSection('my_issues');
      return;
    }

    try {
      const res = await api.createComplaint(payload);
      if (res.success) {
        const createdObj = res.data || {
          ...payload,
          id: res.id || `CMP-${Math.floor(10000 + Math.random() * 90000)}`,
          createdAt: new Date().toISOString(),
          status: 'Submitted'
        };
        setLatestSubmittedComplaint(createdObj);
        setQrReceiptModalComplaint(createdObj);
        setSubmitSuccessMsg(res.message || 'Complaint submitted and auto-assigned to Department Cell!');
        speakText('Complaint submitted! Digital QR tracking receipt generated.');
        setDescriptionInput('');
        setVoiceTranscription('');
        setSelectedPhoto(null);
        setAiDraft(null);
        setWizardStep(1);
        setActiveSection('my_issues');
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const syncOfflineDrafts = async () => {
    for (const draft of offlineDrafts) {
      await api.createComplaint(draft);
    }
    setOfflineDrafts([]);
    loadData();
  };

  const handleCreateBloodRequest = async (e) => {
    if (e) e.preventDefault();
    if (!newBlood.hospital || !newBlood.contactPhone) return;

    const payload = {
      requesterId: currentUser?.uid || 'usr-citizen-1',
      requesterName: currentUser?.name || 'Anita Deshmukh',
      bloodGroup: newBlood.bloodGroup,
      hospital: newBlood.hospital,
      urgency: newBlood.urgency,
      contactPhone: newBlood.contactPhone
    };

    try {
      const res = await api.postBloodRequest(payload);
      if (res.success) {
        setSubmitSuccessMsg(res.message || `Urgent ${newBlood.bloodGroup} Blood Request posted successfully!`);
        if (speakText) speakText(`Urgent ${newBlood.bloodGroup} Blood Request posted successfully! Matching donors notified.`);
        setShowBloodModal(false);
        setNewBlood({ bloodGroup: 'O+', hospital: '', urgency: 'Emergency', contactPhone: '' });
        loadData();
      }
    } catch (err) {
      console.error('Error posting blood request:', err);
    }
  };

  const filteredComplaints = complaints.filter((c) => {
    if (filterCategory && c.category !== filterCategory) return false;
    if (filterStatus && c.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.id.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.location.address.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const selectedDomainObj = MODULES_LIST.find(m => m.id === wizardDomain) || MODULES_LIST[0];
  const domainCategories = CATEGORY_TAXONOMY.filter(c => c.moduleId === wizardDomain);
  const selectedCatObj = CATEGORY_TAXONOMY.find(c => c.id === selectedCategory) || CATEGORY_TAXONOMY[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-28 font-outfit">
      
      {/* 1. TOP ETHNIC WELCOME BANNER */}
      <div className="ethnic-card p-5 rounded-3xl shadow-lg gold-glow flex flex-col md:flex-row md:items-center justify-between gap-4 border-2 border-amber-300">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <h2 className="text-xl md:text-2xl font-black font-cinzel text-amber-950 flex items-center space-x-2">
              <span>Namaste, {currentUser?.name || 'Anita Deshmukh'}</span>
              <span className="text-2xl">🙏</span>
            </h2>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
              Survekshan Rank #4
            </span>
            <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-bold border border-orange-300 font-mono">
              Green Points: 420 🌟
            </span>
          </div>
          <p className="text-xs md:text-sm text-amber-900/80 font-bold flex items-center gap-1">
            <MapPin className="w-4 h-4 text-amber-700 inline" />
            <span>Kalaburagi Municipal Corporation, Karnataka • Ward 12</span>
          </p>
        </div>

        {/* Global Navigation Section Switcher Buttons */}
        <div className="flex items-center space-x-2 bg-amber-50 p-1.5 rounded-2xl border border-amber-300 overflow-x-auto">
          <button
            onClick={() => setActiveSection('hub')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 whitespace-nowrap ${
              activeSection === 'hub' ? 'bg-amber-700 text-white shadow-md' : 'text-amber-950 hover:bg-amber-200/60'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Services Hub</span>
          </button>

          <button
            onClick={() => {
              setActiveSection('wizard');
              setWizardStep(1);
              speakText('Opening File Complaint Wizard');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 whitespace-nowrap ${
              activeSection === 'wizard' ? 'bg-amber-700 text-white shadow-md' : 'text-amber-950 hover:bg-amber-200/60'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>File Complaint</span>
          </button>

          <button
            onClick={() => setActiveSection('my_issues')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 whitespace-nowrap ${
              activeSection === 'my_issues' ? 'bg-amber-700 text-white shadow-md' : 'text-amber-950 hover:bg-amber-200/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Track Status</span>
          </button>

          <button
            onClick={() => setActiveSection('map')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 whitespace-nowrap ${
              activeSection === 'map' ? 'bg-amber-700 text-white shadow-md' : 'text-amber-950 hover:bg-amber-200/60'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>GPS Heatmap</span>
          </button>

          <button
            onClick={() => setActiveSection('cleanliness')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 whitespace-nowrap ${
              activeSection === 'cleanliness' ? 'bg-amber-700 text-white shadow-md' : 'text-amber-950 hover:bg-amber-200/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cleanliness & Toilets</span>
          </button>

          <button
            onClick={() => setActiveSection('blood')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 whitespace-nowrap ${
              activeSection === 'blood' ? 'bg-amber-700 text-white shadow-md' : 'text-amber-950 hover:bg-amber-200/60'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Blood & Health</span>
          </button>

          <button
            onClick={() => setActiveSection('rewards')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 whitespace-nowrap ${
              activeSection === 'rewards' ? 'bg-amber-700 text-white shadow-md' : 'text-amber-950 hover:bg-amber-200/60'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Rewards</span>
          </button>
        </div>
      </div>

      {/* SUCCESS NOTIFICATION BANNER */}
      {submitSuccessMsg && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-2xl text-xs font-bold text-emerald-900 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{submitSuccessMsg}</span>
          </div>
          <button onClick={() => setSubmitSuccessMsg(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 1: SERVICES SELECTION HUB (Select 1-by-1 Main Navigation Screen) */}
      {/* ========================================================================= */}
      {activeSection === 'hub' && (
        <div className="space-y-6">
          
          {/* Visual Civic Overview & Smart City Hero Card */}
          <div
            style={{ background: 'linear-gradient(135deg, #180e04 0%, #0b1329 50%, #241004 100%)' }}
            className="p-6 md:p-8 rounded-3xl shadow-2xl gold-glow border-2 border-amber-400 text-white relative overflow-hidden"
          >
            {/* Background Decorative Lighting Overlay */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-600/10 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 text-left max-w-2xl">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/25 border border-amber-300/60 text-amber-300 text-xs font-black font-cinzel shadow-sm">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{t('smartCityTitle', language)}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black font-cinzel text-white tracking-wide leading-tight drop-shadow-md">
                  {t('heroTitle', language)}
                </h3>
                <p className="text-xs md:text-sm text-slate-100 font-medium leading-relaxed opacity-95">
                  {t('heroSub', language)}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="px-4 py-2.5 rounded-2xl bg-black/40 backdrop-blur-md border border-amber-400/30 text-center shadow-md">
                    <p className="text-[11px] text-amber-300 uppercase font-black tracking-wider">{t('resolvedIssues', language)}</p>
                    <p className="text-lg font-black text-white font-mono">{complaints.filter(c => c.status === 'Resolved').length || 14}</p>
                  </div>
                  <div className="px-4 py-2.5 rounded-2xl bg-black/40 backdrop-blur-md border border-amber-400/30 text-center shadow-md">
                    <p className="text-[11px] text-amber-300 uppercase font-black tracking-wider">{t('avgSlaTime', language)}</p>
                    <p className="text-lg font-black text-white font-mono">1.8 hrs</p>
                  </div>
                  <div className="px-4 py-2.5 rounded-2xl bg-black/40 backdrop-blur-md border border-amber-400/30 text-center shadow-md">
                    <p className="text-[11px] text-amber-300 uppercase font-black tracking-wider">{t('wardCleanliness', language)}</p>
                    <p className="text-lg font-black text-white font-mono">94% ⭐</p>
                  </div>
                </div>
              </div>

              {/* Visual Visual Asset Graphic / Avatar Emblem */}
              <div className="shrink-0 flex items-center justify-center p-4 rounded-3xl bg-amber-500/10 border-2 border-amber-400/40 shadow-inner">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 flex flex-col items-center justify-center text-center p-3 shadow-2xl border-2 border-amber-300 text-white">
                  <span className="text-4xl animate-bounce">🏛️</span>
                  <span className="text-xs font-black font-cinzel tracking-wider text-white mt-1">SWACHH 360</span>
                  <span className="text-[9px] text-amber-200 uppercase font-bold">Kalaburagi Corp</span>
                </div>
              </div>
            </div>
          </div>

          {/* Nearby Community Live Confirmation Alert Banner */}
          {complaints.length > 0 && (
            <div className="ethnic-card p-4.5 rounded-3xl border-2 border-amber-400 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 space-y-2 shadow-lg gold-glow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-bold text-amber-950 font-cinzel">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-600"></span>
                  </span>
                  <span className="text-amber-950 font-black">📡 Live Ward 12 Alerts • Community Issue Verification</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full border border-amber-300">
                  Real-time GPS Broadcast
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-white/95 rounded-2xl border border-amber-300/80 shadow-xs">
                <div className="space-y-0.5 text-left">
                  <p className="text-xs font-bold text-amber-950">
                    📍 {complaints[0]?.location?.address || 'Kalaburagi Main Road, Ward 12'} — <span className="text-amber-800 font-black">{complaints[0]?.category || 'Civic Issue'}</span>
                  </p>
                  <p className="text-[11px] text-slate-600 line-clamp-1 font-medium">
                    "{complaints[0]?.description || 'Civic issue reported in your vicinity'}"
                  </p>
                </div>
                {complaints[0] && (
                  <button
                    type="button"
                    onClick={() => handleConfirmIssue(complaints[0].id)}
                    className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm ${
                      (complaints[0]?.confirmations || []).includes(currentUser?.uid || 'usr-citizen-1')
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500'
                        : 'bg-gradient-to-r from-amber-700 to-orange-600 hover:opacity-95 text-white border border-amber-400'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>
                      {(complaints[0]?.confirmations || []).includes(currentUser?.uid || 'usr-citizen-1')
                        ? `✓ Confirmed (${complaints[0]?.confirmations?.length || 1} Citizens)`
                        : `Confirm This Issue (👍 ${complaints[0]?.confirmations?.length || 0} Confirmed)`}
                    </span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* QUICK CIVIC QR SCANNER BANNER */}
          <div className="ethnic-card p-4 rounded-3xl bg-gradient-to-r from-amber-900 via-stone-900 to-indigo-950 text-white shadow-lg border-2 border-amber-400 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 shrink-0">
                <QrCode className="w-6 h-6 animate-pulse" />
              </div>
              <div className="text-left space-y-0.5">
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-cinzel">
                  <span>Smart City QR Code Scanner</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400 font-mono">AUTOSCAN</span>
                </h4>
                <p className="text-xs text-amber-100/80">
                  Scan QR codes on municipal streetlights, waste bins, public toilets or grievance receipts for 1-tap action.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsQRScannerOpen(true);
                if (speakText) speakText('Opening Civic QR Scanner');
              }}
              className="shrink-0 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center space-x-1.5 border border-amber-300"
            >
              <Camera className="w-4 h-4 text-slate-950" />
              <span>📷 Scan Civic QR Code</span>
            </button>
          </div>

          <div className="text-center space-y-1">
            <h3 className="text-xl font-black font-cinzel text-amber-950">{t('selectServiceTitle', language)}</h3>
            <p className="text-xs text-amber-800/80 font-bold">{t('selectServiceSub', language)}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Tile 1: Report New Civic Issue */}
            <button
              onClick={() => {
                setActiveSection('wizard');
                setWizardStep(1);
                speakText('Launching Step-by-Step Issue Reporting Wizard');
              }}
              className="ethnic-card p-6 rounded-3xl text-left space-y-4 hover:scale-[1.02] transition-transform gold-glow border-2 border-amber-400 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-700 to-orange-600 text-white flex items-center justify-center text-2xl shadow-md border border-amber-300">
                📝
              </div>
              <div>
                <h4 className="text-base font-bold text-amber-950 group-hover:text-amber-700 flex items-center justify-between">
                  <span>{t('tileReportComplaint', language)}</span>
                  <ChevronRight className="w-5 h-5 text-amber-600" />
                </h4>
                <p className="text-xs text-amber-800/80 mt-1">
                  {t('tileReportComplaintDesc', language)}
                </p>
              </div>
            </button>

            {/* Tile 3: Track Status & My Complaints */}
            <button
              onClick={() => {
                setActiveSection('my_issues');
                speakText('Viewing your reported complaints and status');
              }}
              className="ethnic-card p-6 rounded-3xl text-left space-y-4 hover:scale-[1.02] transition-transform gold-glow border-2 border-amber-400 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-800 to-blue-700 text-white flex items-center justify-center text-2xl shadow-md border border-indigo-300">
                📋
              </div>
              <div>
                <h4 className="text-base font-bold text-amber-950 group-hover:text-indigo-800 flex items-center justify-between">
                  <span>{t('tileTrackStatus', language)}</span>
                  <ChevronRight className="w-5 h-5 text-indigo-700" />
                </h4>
                <p className="text-xs text-amber-800/80 mt-1">
                  {t('tileTrackStatusDesc', language)}
                </p>
              </div>
            </button>

            {/* Tile 4: Ward GPS Heatmap */}
            <button
              onClick={() => {
                setActiveSection('map');
                speakText('Opening Interactive Ward Map');
              }}
              className="ethnic-card p-6 rounded-3xl text-left space-y-4 hover:scale-[1.02] transition-transform gold-glow border-2 border-amber-400 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-800 to-teal-700 text-white flex items-center justify-center text-2xl shadow-md border border-emerald-300">
                🗺️
              </div>
              <div>
                <h4 className="text-base font-bold text-amber-950 group-hover:text-emerald-800 flex items-center justify-between">
                  <span>{t('tileInteractiveMap', language)}</span>
                  <ChevronRight className="w-5 h-5 text-emerald-700" />
                </h4>
                <p className="text-xs text-amber-800/80 mt-1">
                  {t('tileInteractiveMapDesc', language)}
                </p>
              </div>
            </button>

            {/* Tile 5: Swachh Bharat Cleanliness Drives */}
            <button
              onClick={() => {
                setActiveSection('cleanliness');
                speakText('Viewing Swachh Bharat cleanliness drives');
              }}
              className="ethnic-card p-6 rounded-3xl text-left space-y-4 hover:scale-[1.02] transition-transform gold-glow border-2 border-amber-400 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-600 text-white flex items-center justify-center text-2xl shadow-md border border-amber-300">
                🧹
              </div>
              <div>
                <h4 className="text-base font-bold text-amber-950 group-hover:text-amber-700 flex items-center justify-between">
                  <span>{t('tileSwachhBharat', language)}</span>
                  <ChevronRight className="w-5 h-5 text-amber-600" />
                </h4>
                <p className="text-xs text-amber-800/80 mt-1">
                  {t('tileSwachhBharatDesc', language)}
                </p>
              </div>
            </button>

            {/* Tile 6: Emergency Blood & Health Board */}
            <button
              onClick={() => {
                setActiveSection('blood');
                speakText('Opening Blood donor board');
              }}
              className="ethnic-card p-6 rounded-3xl text-left space-y-4 hover:scale-[1.02] transition-transform gold-glow border-2 border-amber-400 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-700 to-red-600 text-white flex items-center justify-center text-2xl shadow-md border border-rose-300">
                🩸
              </div>
              <div>
                <h4 className="text-base font-bold text-amber-950 group-hover:text-rose-700 flex items-center justify-between">
                  <span>{t('tileBloodHealth', language)}</span>
                  <ChevronRight className="w-5 h-5 text-rose-600" />
                </h4>
                <p className="text-xs text-amber-800/80 mt-1">
                  {t('tileBloodHealthDesc', language)}
                </p>
              </div>
            </button>

            {/* Tile 7: Rewards & Leaderboard */}
            <button
              onClick={() => {
                setActiveSection('rewards');
                speakText('Viewing Citizen Leaderboard & Rewards');
              }}
              className="ethnic-card p-6 rounded-3xl text-left space-y-4 hover:scale-[1.02] transition-transform gold-glow border-2 border-amber-400 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-800 to-indigo-800 text-white flex items-center justify-center text-2xl shadow-md border border-purple-300">
                🏆
              </div>
              <div>
                <h4 className="text-base font-bold text-amber-950 group-hover:text-purple-700 flex items-center justify-between">
                  <span>{t('tileRewards', language)}</span>
                  <ChevronRight className="w-5 h-5 text-purple-600" />
                </h4>
                <p className="text-xs text-amber-800/80 mt-1">
                  {t('tileRewardsDesc', language)}
                </p>
              </div>
            </button>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION: DEDICATED ANTI-CORRUPTION & VIGILANCE PORTAL */}
      {/* ========================================================================= */}
      {activeSection === 'corruption' && (
        <AntiCorruptionDashboard
          speakText={speakText}
          currentUser={currentUser}
          onBack={() => setActiveSection('hub')}
        />
      )}

      {/* ========================================================================= */}
      {/* SECTION: DEDICATED UNEMPLOYMENT & JOBS PORTAL */}
      {/* ========================================================================= */}
      {activeSection === 'unemployment' && (
        <UnemploymentJobsDashboard
          speakText={speakText}
          currentUser={currentUser}
          onBack={() => setActiveSection('hub')}
        />
      )}

      {/* ========================================================================= */}
      {/* SECTION: DEDICATED WATER & CLEANLINESS PORTAL */}
      {/* ========================================================================= */}
      {activeSection === 'water_cleanliness' && (
        <WaterCleanlinessDashboard
          speakText={speakText}
          currentUser={currentUser}
          onBack={() => setActiveSection('hub')}
        />
      )}

      {/* ========================================================================= */}
      {/* SECTION: DEDICATED EDUCATION PORTAL */}
      {/* ========================================================================= */}
      {activeSection === 'education_portal' && (
        <EducationDashboard
          speakText={speakText}
          currentUser={currentUser}
          onBack={() => setActiveSection('hub')}
        />
      )}

      {/* ========================================================================= */}
      {/* SECTION: DEDICATED PUBLIC SAFETY & EMERGENCY PORTAL */}
      {/* ========================================================================= */}
      {activeSection === 'emergency' && (
        <EmergencySafetyDashboard
          speakText={speakText}
          currentUser={currentUser}
          onBack={() => setActiveSection('hub')}
        />
      )}

      {/* ========================================================================= */}
      {/* SECTION: DEDICATED WOMEN & CHILD SAFETY PORTAL */}
      {/* ========================================================================= */}
      {activeSection === 'safety' && (
        <WomenChildSafetyDashboard
          speakText={speakText}
          currentUser={currentUser}
          onBack={() => setActiveSection('hub')}
        />
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: GUIDED 4-STEP ISSUE REPORTING WIZARD (Selected One by One) */}
      {/* ========================================================================= */}
      {activeSection === 'wizard' && (
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Header & Back Button */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (wizardStep > 1) {
                  setWizardStep(wizardStep - 1);
                } else {
                  setActiveSection('hub');
                }
              }}
              className="px-3.5 py-1.5 rounded-xl bg-amber-100 text-amber-950 hover:bg-amber-200 text-xs font-bold flex items-center space-x-1 border border-amber-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{wizardStep === 1 ? t('backToHub', language) : `${t('backToStep', language)} ${wizardStep - 1}`}</span>
            </button>

            <span className="text-xs font-bold text-amber-900 font-cinzel">
              Step {wizardStep} of 4
            </span>
          </div>

          {/* Stepper Progress Visual Bar */}
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="space-y-1">
                <div
                  className={`h-2 rounded-full transition-all ${
                    wizardStep >= stepNum
                      ? 'bg-gradient-to-r from-amber-700 to-orange-600 shadow-sm'
                      : 'bg-amber-200/80'
                  }`}
                />
                <p className={`text-[10px] text-center font-bold uppercase ${wizardStep === stepNum ? 'text-amber-950' : 'text-amber-800/60'}`}>
                  Step {stepNum}
                </p>
              </div>
            ))}
          </div>

          {/* STEP 1: Select Main Domain Category One-by-One */}
          {wizardStep === 1 && (
            <div className="ethnic-card p-6 rounded-3xl space-y-4 shadow-xl gold-glow border-2 border-amber-300">
              <div className="text-center space-y-1">
                <h3 className="text-lg font-black font-cinzel text-amber-950">{t('step1Title', language)}</h3>
                <p className="text-xs text-amber-800/80 font-bold">{t('step1Sub', language)}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {MODULES_LIST.map((mod) => (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => {
                      setWizardDomain(mod.id);
                      const firstCat = CATEGORY_TAXONOMY.find(c => c.moduleId === mod.id);
                      if (firstCat) setSelectedCategory(firstCat.id);
                      setWizardStep(2);
                      speakText(`Selected domain ${t(`domain_${mod.id}`, language) || mod.name}. Moving to Step 2.`);
                    }}
                    className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start space-x-3 group ${
                      wizardDomain === mod.id
                        ? 'border-amber-600 bg-amber-50 shadow-md'
                        : 'border-amber-200 bg-white hover:border-amber-400 hover:bg-amber-50/50'
                    }`}
                  >
                    <span className="text-2xl p-2 rounded-xl bg-amber-100 border border-amber-300 shrink-0">{mod.icon}</span>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-amber-950 group-hover:text-amber-700">{t(`domain_${mod.id}`, language) || mod.name}</h4>
                      <p className="text-[11px] text-amber-800/70 leading-snug">{mod.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Select Specific Sub-Category Problem */}
          {wizardStep === 2 && (
            <div className="space-y-6">
              
              {/* Special Section-Wise Delay Monitoring Header for Public Governance Module */}
              {wizardDomain === 'governance' && (
                <div
                  style={{ background: 'linear-gradient(135deg, #180e04 0%, #0b1329 50%, #17103a 100%)' }}
                  className="p-5 rounded-3xl text-white border-2 border-amber-400 shadow-xl space-y-3"
                >
                  <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs font-cinzel">
                    <Building2 className="w-4 h-4 text-amber-400" />
                    <span>Dedicated Module Section • Public Governance & Delays</span>
                  </div>
                  <h3 className="text-xl font-black font-cinzel text-white">
                    Section-Wise Civic File Delay & Governance Analytics
                  </h3>
                  <p className="text-xs text-amber-100/90 font-bold">
                    View file delay buckets (&gt;7d, &gt;15d, &gt;30d, &gt;60d), live SLA escalation tracking, AI delay predictions & officer justification audit trail below.
                  </p>
                </div>
              )}

              <div className="ethnic-card p-6 rounded-3xl space-y-4 shadow-xl gold-glow border-2 border-amber-300">
                <div className="text-center space-y-1">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                    Domain: {t(`domain_${selectedDomainObj.id}`, language) || selectedDomainObj.name} {selectedDomainObj.icon}
                  </span>
                  <h3 className="text-lg font-black font-cinzel text-amber-950 pt-1">{t('step2Title', language)}</h3>
                  <p className="text-xs text-amber-800/80 font-bold">{t('step2Sub', language)}</p>
                </div>

                <div className="space-y-2 pt-2">
                  {domainCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setWizardStep(3);
                        speakText(`Selected ${translateCategory(cat, language)}. Moving to Step 3 for details.`);
                      }}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between group ${
                        selectedCategory === cat.id
                          ? 'border-amber-600 bg-amber-50 shadow-md'
                          : 'border-amber-200 bg-white hover:border-amber-400 hover:bg-amber-50/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl p-2 rounded-xl bg-amber-100 border border-amber-300">{cat.icon}</span>
                        <span className="text-xs font-bold text-amber-950">{translateCategory(cat, language)}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* STEP 3: Choose Reporting Method & Provide Evidence */}
          {wizardStep === 3 && (
            <div className="ethnic-card p-6 rounded-3xl space-y-5 shadow-xl gold-glow border-2 border-amber-300">
              <div className="text-center space-y-1">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                  Issue: {selectedCatObj.icon} {translateCategory(selectedCatObj, language)}
                </span>
                <h3 className="text-lg font-black font-cinzel text-amber-950 pt-1">{t('step3Title', language)}</h3>
                <p className="text-xs text-amber-800/80 font-bold">{t('step3Sub', language)}</p>
              </div>

              {/* LIVE GPS & LIVE AI CAMERA INTEGRATION STRIP */}
              <div className="space-y-3 pt-2">
                <GPSLocationWidget
                  locationValue={locationAddress}
                  onLocationDetected={(addr) => setLocationAddress(addr)}
                  onGpsCoordinatesDetected={(coords) => setLiveGpsCoords(coords)}
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsVoiceAssistantOpen(true);
                      if (speakText) speakText('Opening AI Voice Assistant for speech to text transcription');
                    }}
                    className="py-2.5 px-3 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white font-bold text-xs shadow-md hover:opacity-95 flex items-center justify-center space-x-1.5 border border-amber-300"
                  >
                    <Mic className="w-4 h-4 animate-pulse" />
                    <span>AI Voice Assistant</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsCameraOpen(true);
                      if (speakText) speakText('Opening Live AI Camera viewfinder');
                    }}
                    className="py-2.5 px-3 rounded-2xl bg-gradient-to-r from-amber-700 to-orange-700 text-white font-bold text-xs shadow-md hover:opacity-95 flex items-center justify-center space-x-1.5 border border-amber-300"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Live AI Camera</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsQRScannerOpen(true);
                      if (speakText) speakText('Opening Civic QR Scanner');
                    }}
                    className="py-2.5 px-3 rounded-2xl bg-gradient-to-r from-stone-800 via-amber-900 to-stone-900 text-white font-bold text-xs shadow-md hover:opacity-95 flex items-center justify-center space-x-1.5 border border-amber-400"
                  >
                    <QrCode className="w-4 h-4 text-amber-400" />
                    <span>Scan Asset QR</span>
                  </button>
                </div>

                {selectedPhoto && (
                  <div className="flex items-center space-x-2 p-2 bg-emerald-50 rounded-2xl border border-emerald-300 text-emerald-950 text-xs font-bold w-full sm:w-auto">
                    <img src={selectedPhoto} alt="Proof" className="w-8 h-8 rounded-lg object-cover border border-emerald-400" />
                    <div className="text-[10px]">
                      <p className="text-emerald-900 font-bold">Photo Attached ✓</p>
                      <p className="text-emerald-700">{liveGpsCoords}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedPhoto(null)}
                      className="text-red-600 hover:text-red-800 ml-1"
                      title="Remove Photo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* ======================================================= */}
              {/* DYNAMIC FORM RENDERING FOR ANTI-CORRUPTION & VIGILANCE */}
              {/* ======================================================= */}
              {wizardDomain === 'corruption' && (
                <div className="pt-2">
                  <AntiCorruptionDashboard
                    speakText={speakText}
                    currentUser={currentUser}
                    initialFeatureModule={selectedCategory}
                    hideOtherModules={true}
                  />
                </div>
              )}

              {/* ======================================================= */}
              {/* DYNAMIC FORM RENDERING FOR UNEMPLOYMENT & JOBS */}
              {/* ======================================================= */}
              {wizardDomain === 'unemployment' && (
                <div className="pt-2">
                  <UnemploymentJobsDashboard
                    speakText={speakText}
                    currentUser={currentUser}
                    initialFeatureModule={selectedCategory}
                    hideOtherModules={true}
                  />
                </div>
              )}

              {/* ======================================================= */}
              {/* DYNAMIC FORM RENDERING FOR WATER & CLEANLINESS */}
              {/* ======================================================= */}
              {(wizardDomain === 'waste' || wizardDomain === 'water') && (
                <div className="pt-2">
                  <WaterCleanlinessDashboard
                    speakText={speakText}
                    currentUser={currentUser}
                    initialFeatureModule={selectedCategory}
                    hideOtherModules={true}
                  />
                </div>
              )}

              {/* ======================================================= */}
              {/* DYNAMIC FORM RENDERING FOR EDUCATION */}
              {/* ======================================================= */}
              {wizardDomain === 'education' && (
                <div className="pt-2">
                  <EducationDashboard
                    speakText={speakText}
                    currentUser={currentUser}
                    initialFeatureModule={selectedCategory}
                    hideOtherModules={true}
                  />
                </div>
              )}

              {/* ======================================================= */}
              {/* DYNAMIC FORM RENDERING FOR POVERTY & BASIC NECESSITIES */}
              {/* ======================================================= */}
              {wizardDomain === 'poverty' && (
                <div className="pt-2">
                  <PovertyNecessitiesDashboard
                    speakText={speakText}
                    currentUser={currentUser}
                    initialFeatureModule={selectedCategory}
                    hideOtherModules={true}
                  />
                </div>
              )}

              {/* ======================================================= */}
              {/* DYNAMIC FORM RENDERING FOR PUBLIC GOVERNANCE & DELAYS */}
              {/* ======================================================= */}
              {wizardDomain === 'governance' && (
                <div className="pt-2">
                  <PublicGovernanceDashboard
                    speakText={speakText}
                    currentUser={currentUser}
                    initialFeatureModule={selectedCategory}
                    hideOtherModules={true}
                  />
                </div>
              )}

              {/* ======================================================= */}
              {/* DYNAMIC FORM RENDERING FOR ROADS & INFRASTRUCTURE */}
              {/* ======================================================= */}
              {wizardDomain === 'roads' && (
                <div className="pt-2">
                  <RoadsInfrastructureDashboard
                    speakText={speakText}
                    currentUser={currentUser}
                    initialFeatureModule={selectedCategory}
                    hideOtherModules={true}
                  />
                </div>
              )}

              {/* ======================================================= */}
              {/* DYNAMIC FORM RENDERING FOR STREET LIGHTING & ELECTRICITY */}
              {/* ======================================================= */}
              {wizardDomain === 'electricity' && (
                <div className="pt-2">
                  <StreetLightingElectricityDashboard
                    speakText={speakText}
                    currentUser={currentUser}
                    initialFeatureModule={selectedCategory}
                    hideOtherModules={true}
                  />
                </div>
              )}

              {/* ======================================================= */}
              {/* DYNAMIC FORM RENDERING FOR SOCIAL RIGHTS & WELFARE */}
              {/* ======================================================= */}
              {wizardDomain === 'social' && (
                <div className="pt-2">
                  <SocialRightsWelfareDashboard
                    speakText={speakText}
                    currentUser={currentUser}
                    initialFeatureModule={selectedCategory}
                    hideOtherModules={true}
                  />
                </div>
              )}

              {/* ======================================================= */}
              {/* DYNAMIC FORM RENDERING FOR ANIMAL WELFARE AND RESCUE */}
              {/* ======================================================= */}
              {wizardDomain === 'animal' && (
                <div className="pt-2">
                  <AnimalWelfareDashboard
                    speakText={speakText}
                    currentUser={currentUser}
                    initialFeatureModule={selectedCategory}
                    hideOtherModules={true}
                  />
                </div>
              )}

              {/* ======================================================= */}
              {/* DYNAMIC FORM RENDERING FOR HEALTH & MEDICAL */}
              {/* ======================================================= */}
              {wizardDomain === 'health' && (
                <div className="pt-2">
                  <HealthMedicalDashboard
                    speakText={speakText}
                    currentUser={currentUser}
                    initialFeatureModule={selectedCategory}
                    hideOtherModules={true}
                  />
                </div>
              )}

              {/* ======================================================= */}
              {/* DYNAMIC FORM RENDERING FOR ENVIRONMENT */}
              {/* ======================================================= */}
              {wizardDomain === 'environment' && (
                <div className="pt-2">
                  <EnvironmentDashboard
                    speakText={speakText}
                    currentUser={currentUser}
                    initialFeatureModule={selectedCategory}
                    hideOtherModules={true}
                  />
                </div>
              )}

              {/* ======================================================= */}
              {/* DYNAMIC FORM RENDERING FOR TRAFFIC & TRANSPORT */}
              {/* ======================================================= */}
              {wizardDomain === 'traffic' && (
                <div className="pt-2">
                  <TrafficTransportDashboard
                    speakText={speakText}
                    currentUser={currentUser}
                    initialFeatureModule={selectedCategory}
                    hideOtherModules={true}
                  />
                </div>
              )}

              {/* ======================================================= */}
              {/* DYNAMIC FORM RENDERING FOR PUBLIC SAFETY & EMERGENCY DOMAIN */}
              {/* ======================================================= */}
              {selectedCategory === 'emergency_fire' && (
                <div className="space-y-4 pt-2">
                  <div className="p-3 bg-red-50 rounded-2xl border border-red-300 text-xs text-red-950 font-bold flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-red-600 shrink-0 animate-pulse" />
                      <span>Fire Emergency Rapid Dispatch: Direct link to Fire Station & Police Control.</span>
                    </div>
                    <a href="tel:101" className="px-3 py-1 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700">
                      Call 101 Fire
                    </a>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Complaint / Incident Type *</label>
                      <select
                        value={emergencyFields.fire_incident_type}
                        onChange={(e) => handleEmergencyChange('fire_incident_type', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                      >
                        <option>Building Fire (Commercial / Residential)</option>
                        <option>Vehicle Fire (Car / Bus / Truck / Two-Wheeler)</option>
                        <option>Electrical Fire / Transformer Sparking</option>
                        <option>Forest Fire / Grassland Blaze</option>
                        <option>Industrial / Chemical Fire</option>
                        <option>Garbage / Open Waste Fire</option>
                        <option>Other Fire Emergency</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Exact Location / Address *</label>
                      <input
                        type="text"
                        value={emergencyFields.fire_address}
                        onChange={(e) => handleEmergencyChange('fire_address', e.target.value)}
                        placeholder="Building name, street, road address"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Landmark *</label>
                      <input
                        type="text"
                        value={emergencyFields.fire_landmark}
                        onChange={(e) => handleEmergencyChange('fire_landmark', e.target.value)}
                        placeholder="Prominent nearby building or landmark"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Date and Time of Incident *</label>
                      <input
                        type="datetime-local"
                        value={emergencyFields.fire_datetime}
                        onChange={(e) => handleEmergencyChange('fire_datetime', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Severity Level *</label>
                      <select
                        value={emergencyFields.fire_severity}
                        onChange={(e) => handleEmergencyChange('fire_severity', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                      >
                        <option value="Low">Low - Contained / Minor Smoke</option>
                        <option value="Medium">Medium - Spreading Fire</option>
                        <option value="Critical">Critical - Major Blaze / Life Threat</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Is Anyone Trapped? *</label>
                      <div className="flex items-center space-x-4 pt-1.5">
                        {['Yes', 'No'].map((opt) => (
                          <label key={opt} className="flex items-center space-x-1.5 cursor-pointer text-xs font-bold">
                            <input
                              type="radio"
                              name="wiz_fire_trapped"
                              checked={emergencyFields.fire_trapped === opt}
                              onChange={() => handleEmergencyChange('fire_trapped', opt)}
                            />
                            <span className={opt === 'Yes' ? 'text-red-700 font-black' : 'text-slate-800'}>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Number of People Affected / Injured</label>
                      <input
                        type="text"
                        value={emergencyFields.fire_injured_count}
                        onChange={(e) => handleEmergencyChange('fire_injured_count', e.target.value)}
                        placeholder="E.g. 0, 2 people"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Nearby Hazards *</label>
                      <input
                        type="text"
                        value={emergencyFields.fire_nearby_hazards}
                        onChange={(e) => handleEmergencyChange('fire_nearby_hazards', e.target.value)}
                        placeholder="Gas cylinders, chemical drums, transformer"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-amber-950">Description of the Fire *</label>
                    <textarea
                      rows={2}
                      value={emergencyFields.fire_description}
                      onChange={(e) => handleEmergencyChange('fire_description', e.target.value)}
                      placeholder="Describe color of smoke, intensity, floors on fire, escape status..."
                      className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Complainant Name *</label>
                      <input
                        type="text"
                        value={emergencyFields.fire_complainant_name}
                        onChange={(e) => handleEmergencyChange('fire_complainant_name', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Mobile Number *</label>
                      <input
                        type="text"
                        value={emergencyFields.fire_mobile_number}
                        onChange={(e) => handleEmergencyChange('fire_mobile_number', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Current Location / GPS *</label>
                      <input
                        type="text"
                        value={emergencyFields.fire_gps}
                        onChange={(e) => handleEmergencyChange('fire_gps', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedCategory === 'emergency_accident' && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Accident Type *</label>
                      <select
                        value={emergencyFields.accident_type}
                        onChange={(e) => handleEmergencyChange('accident_type', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                      >
                        <option>Road Accident (Vehicle Collision)</option>
                        <option>Pedestrian Hit & Run</option>
                        <option>Two-Wheeler Skid / Crash</option>
                        <option>Heavy Vehicle (Bus / Truck) Overturning</option>
                        <option>Multi-Vehicle Pile-up</option>
                        <option>Other Accident</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Exact Accident Location *</label>
                      <input
                        type="text"
                        value={emergencyFields.accident_location}
                        onChange={(e) => handleEmergencyChange('accident_location', e.target.value)}
                        placeholder="Road, flyover, cross or junction"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Landmark *</label>
                      <input
                        type="text"
                        value={emergencyFields.accident_landmark}
                        onChange={(e) => handleEmergencyChange('accident_landmark', e.target.value)}
                        placeholder="Nearby petrol pump, signal, hotel"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Date and Time *</label>
                      <input
                        type="datetime-local"
                        value={emergencyFields.accident_datetime}
                        onChange={(e) => handleEmergencyChange('accident_datetime', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Number of Vehicles Involved *</label>
                      <input
                        type="text"
                        value={emergencyFields.accident_vehicles_involved}
                        onChange={(e) => handleEmergencyChange('accident_vehicles_involved', e.target.value)}
                        placeholder="E.g. 2 vehicles"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Vehicle Details / Registration Numbers</label>
                      <input
                        type="text"
                        value={emergencyFields.accident_vehicle_details}
                        onChange={(e) => handleEmergencyChange('accident_vehicle_details', e.target.value)}
                        placeholder="E.g. KA-32-M-4821 (Car), KA-32-EE-1092 (Bike)"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-300 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <label className="font-bold text-rose-950 block">Injured Count *</label>
                      <input
                        type="number"
                        min="0"
                        value={emergencyFields.accident_injured_count}
                        onChange={(e) => handleEmergencyChange('accident_injured_count', e.target.value)}
                        className="w-full bg-white border border-rose-300 rounded-xl p-1.5 text-xs mt-1 font-bold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-rose-950 block">Seriously Injured? *</label>
                      <div className="flex items-center space-x-3 pt-1.5">
                        {['Yes', 'No'].map((opt) => (
                          <label key={opt} className="flex items-center space-x-1 font-bold cursor-pointer text-rose-900">
                            <input
                              type="radio"
                              name="wiz_acc_serious"
                              checked={emergencyFields.accident_seriously_injured === opt}
                              onChange={() => handleEmergencyChange('accident_seriously_injured', opt)}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="font-bold text-rose-950 block">Ambulance Required? *</label>
                      <div className="flex items-center space-x-3 pt-1.5">
                        {['Yes', 'No'].map((opt) => (
                          <label key={opt} className="flex items-center space-x-1 font-bold cursor-pointer text-rose-900">
                            <input
                              type="radio"
                              name="wiz_acc_amb"
                              checked={emergencyFields.accident_ambulance_required === opt}
                              onChange={() => handleEmergencyChange('accident_ambulance_required', opt)}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="font-bold text-rose-950 block">Traffic Blocked? *</label>
                      <div className="flex items-center space-x-3 pt-1.5">
                        {['Yes', 'No'].map((opt) => (
                          <label key={opt} className="flex items-center space-x-1 font-bold cursor-pointer text-rose-900">
                            <input
                              type="radio"
                              name="wiz_acc_traffic"
                              checked={emergencyFields.accident_traffic_obstruction === opt}
                              onChange={() => handleEmergencyChange('accident_traffic_obstruction', opt)}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-amber-950">Brief Description of Accident *</label>
                    <textarea
                      rows={2}
                      value={emergencyFields.accident_description}
                      onChange={(e) => handleEmergencyChange('accident_description', e.target.value)}
                      placeholder="Describe how the crash occurred and current scene status..."
                      className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Witness Details</label>
                      <input
                        type="text"
                        value={emergencyFields.accident_witness_details}
                        onChange={(e) => handleEmergencyChange('accident_witness_details', e.target.value)}
                        placeholder="Shopkeeper / bystander info"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Complainant Name *</label>
                      <input
                        type="text"
                        value={emergencyFields.accident_name}
                        onChange={(e) => handleEmergencyChange('accident_name', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Mobile Number & GPS *</label>
                      <input
                        type="text"
                        value={emergencyFields.accident_phone}
                        onChange={(e) => handleEmergencyChange('accident_phone', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedCategory === 'emergency_building_safety' && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Hazard Type *</label>
                      <select
                        value={emergencyFields.bld_hazard_type}
                        onChange={(e) => handleEmergencyChange('bld_hazard_type', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                      >
                        <option>Structural Cracks & Balcony Collapse Risk</option>
                        <option>Severe Foundation Subsidence / Tilting</option>
                        <option>Dilapidated / Unsafe Old Building</option>
                        <option>Exposed High-Voltage Electrical Wiring in Lobby</option>
                        <option>Commercial Gas Cylinder Leakage Risk</option>
                        <option>Illegal Rooftop Construction Load Hazard</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Building Address *</label>
                      <input
                        type="text"
                        value={emergencyFields.bld_address}
                        onChange={(e) => handleEmergencyChange('bld_address', e.target.value)}
                        placeholder="Building name, plot #, street"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Building Type *</label>
                      <select
                        value={emergencyFields.bld_type}
                        onChange={(e) => handleEmergencyChange('bld_type', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-medium"
                      >
                        <option>Residential Apartment</option>
                        <option>Commercial Complex / Mall</option>
                        <option>Public / Government Building</option>
                        <option>School / Hospital Structure</option>
                        <option>Industrial Warehouse</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Number of Floors *</label>
                      <input
                        type="text"
                        value={emergencyFields.bld_floors}
                        onChange={(e) => handleEmergencyChange('bld_floors', e.target.value)}
                        placeholder="E.g. 4 Floors, Ground + 2"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Exact Location Within Building *</label>
                      <input
                        type="text"
                        value={emergencyFields.bld_location_within}
                        onChange={(e) => handleEmergencyChange('bld_location_within', e.target.value)}
                        placeholder="E.g. Basement pillar, 2nd floor balcony, roof"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Severity Level *</label>
                      <select
                        value={emergencyFields.bld_severity}
                        onChange={(e) => handleEmergencyChange('bld_severity', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                      >
                        <option value="Low">Low - Maintenance Inspection Required</option>
                        <option value="Medium">Medium - Visible Hazard</option>
                        <option value="High">High - Serious Collapse Risk</option>
                        <option value="Critical">Critical - Imminent Danger / Evacuation</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-amber-950">Description of the Hazard *</label>
                    <textarea
                      rows={2}
                      value={emergencyFields.bld_description}
                      onChange={(e) => handleEmergencyChange('bld_description', e.target.value)}
                      placeholder="Detail visible cracks, falling debris, creaking sounds..."
                      className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Is Building Occupied? *</label>
                      <div className="flex items-center space-x-4 pt-1.5">
                        {['Yes', 'No'].map((opt) => (
                          <label key={opt} className="flex items-center space-x-1.5 cursor-pointer text-xs font-bold">
                            <input
                              type="radio"
                              name="wiz_bld_occ"
                              checked={emergencyFields.bld_occupied === opt}
                              onChange={() => handleEmergencyChange('bld_occupied', opt)}
                            />
                            <span className={opt === 'Yes' ? 'text-amber-950 font-bold' : 'text-slate-800'}>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Approx People at Risk *</label>
                      <input
                        type="text"
                        value={emergencyFields.bld_people_at_risk}
                        onChange={(e) => handleEmergencyChange('bld_people_at_risk', e.target.value)}
                        placeholder="E.g. 50 residents"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Date / Time Noticed *</label>
                      <input
                        type="datetime-local"
                        value={emergencyFields.bld_datetime_noticed}
                        onChange={(e) => handleEmergencyChange('bld_datetime_noticed', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedCategory === 'emergency_flood' && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Flood Type *</label>
                      <select
                        value={emergencyFields.flood_type}
                        onChange={(e) => handleEmergencyChange('flood_type', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                      >
                        <option>Road & Underpass Waterlogging / Drainage Overflow</option>
                        <option>Residential Area Inundation</option>
                        <option>River / Canal Breach & Overflow</option>
                        <option>Flash Flood / Heavy Rainfall Deluge</option>
                        <option>Stormwater Drain Backflow</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Exact Location *</label>
                      <input
                        type="text"
                        value={emergencyFields.flood_location}
                        onChange={(e) => handleEmergencyChange('flood_location', e.target.value)}
                        placeholder="Locality, underpass, colony name"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Landmark *</label>
                      <input
                        type="text"
                        value={emergencyFields.flood_landmark}
                        onChange={(e) => handleEmergencyChange('flood_landmark', e.target.value)}
                        placeholder="Near bridge, railway gate, bus stop"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Water Level *</label>
                      <select
                        value={emergencyFields.flood_water_level}
                        onChange={(e) => handleEmergencyChange('flood_water_level', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                      >
                        <option>Low (Ankle deep / 6 inches)</option>
                        <option>Medium (Knee deep / 1.5 to 2 Feet)</option>
                        <option>High (3 to 4 Feet Submerged)</option>
                        <option>Critical (5+ Feet / Roof level threat)</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-300 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="font-bold text-blue-950 block">Roads Blocked?</span>
                      <div className="flex items-center space-x-3 pt-1">
                        {['Yes', 'No'].map((opt) => (
                          <label key={opt} className="flex items-center space-x-1 font-bold cursor-pointer text-blue-900">
                            <input
                              type="radio"
                              name="wiz_fld_roads"
                              checked={emergencyFields.flood_roads_blocked === opt}
                              onChange={() => handleEmergencyChange('flood_roads_blocked', opt)}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-bold text-blue-950 block">Electricity Off?</span>
                      <div className="flex items-center space-x-3 pt-1">
                        {['Yes', 'No'].map((opt) => (
                          <label key={opt} className="flex items-center space-x-1 font-bold cursor-pointer text-blue-900">
                            <input
                              type="radio"
                              name="wiz_fld_power"
                              checked={emergencyFields.flood_electricity_affected === opt}
                              onChange={() => handleEmergencyChange('flood_electricity_affected', opt)}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-bold text-blue-950 block">People Trapped?</span>
                      <div className="flex items-center space-x-3 pt-1">
                        {['Yes', 'No'].map((opt) => (
                          <label key={opt} className="flex items-center space-x-1 font-bold cursor-pointer text-blue-900">
                            <input
                              type="radio"
                              name="wiz_fld_trapped"
                              checked={emergencyFields.flood_trapped === opt}
                              onChange={() => handleEmergencyChange('flood_trapped', opt)}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-bold text-blue-950 block">Evacuation Needed?</span>
                      <div className="flex items-center space-x-3 pt-1">
                        {['Yes', 'No'].map((opt) => (
                          <label key={opt} className="flex items-center space-x-1 font-bold cursor-pointer text-blue-900">
                            <input
                              type="radio"
                              name="wiz_fld_evac"
                              checked={emergencyFields.flood_evacuation === opt}
                              onChange={() => handleEmergencyChange('flood_evacuation', opt)}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedCategory === 'emergency_landslide' && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Landslide Type *</label>
                      <select
                        value={emergencyFields.landslide_type}
                        onChange={(e) => handleEmergencyChange('landslide_type', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                      >
                        <option>Hill Slope Collapse & Rockfall Road Blockage</option>
                        <option>Debris Flow / Heavy Mudslide</option>
                        <option>Retaining Wall Failure on Highway</option>
                        <option>Soil Erosion & Embankment Cave-in</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Exact Location *</label>
                      <input
                        type="text"
                        value={emergencyFields.landslide_location}
                        onChange={(e) => handleEmergencyChange('landslide_location', e.target.value)}
                        placeholder="Road, Km marker, hillside address"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Landmark *</label>
                      <input
                        type="text"
                        value={emergencyFields.landslide_landmark}
                        onChange={(e) => handleEmergencyChange('landslide_landmark', e.target.value)}
                        placeholder="Nearby temple, bridge, bend"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Size / Severity of Landslide *</label>
                      <select
                        value={emergencyFields.landslide_severity}
                        onChange={(e) => handleEmergencyChange('landslide_severity', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                      >
                        <option>Minor Rockfall (Passable with caution)</option>
                        <option>Moderate Blockage (Single lane blocked)</option>
                        <option>Major Slope Failure (Entire road blocked)</option>
                        <option>Catastrophic (Structure / Vehicle buried)</option>
                      </select>
                    </div>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div>
                      <span className="font-bold text-amber-950 block">Road Blocked?</span>
                      <span className="text-red-700 font-bold">{emergencyFields.landslide_road_blocked}</span>
                    </div>
                    <div>
                      <span className="font-bold text-amber-950 block">Buildings Hit?</span>
                      <span className="text-slate-800 font-bold">{emergencyFields.landslide_buildings_affected}</span>
                    </div>
                    <div>
                      <span className="font-bold text-amber-950 block">People Trapped?</span>
                      <span className="text-slate-800 font-bold">{emergencyFields.landslide_trapped_injured}</span>
                    </div>
                    <div>
                      <span className="font-bold text-amber-950 block">Further Risk:</span>
                      <span className="text-rose-700 font-bold">{emergencyFields.landslide_risk_further}</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedCategory === 'emergency_fallen_tree' && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Exact Location *</label>
                      <input
                        type="text"
                        value={emergencyFields.tree_location}
                        onChange={(e) => handleEmergencyChange('tree_location', e.target.value)}
                        placeholder="Street, colony or avenue name"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Landmark *</label>
                      <input
                        type="text"
                        value={emergencyFields.tree_landmark}
                        onChange={(e) => handleEmergencyChange('tree_landmark', e.target.value)}
                        placeholder="Near hospital gate, school, circle"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Cause of Fall *</label>
                      <select
                        value={emergencyFields.tree_cause}
                        onChange={(e) => handleEmergencyChange('tree_cause', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                      >
                        <option>Heavy Rain & Wind Storm</option>
                        <option>Natural Decay / Termite Damage</option>
                        <option>Road Digging / Root Damage</option>
                        <option>Vehicle Impact Collision</option>
                        <option>Unknown</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Traffic Obstruction *</label>
                      <select
                        value={emergencyFields.tree_traffic_obstruction}
                        onChange={(e) => handleEmergencyChange('tree_traffic_obstruction', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                      >
                        <option>None (Fallen in park / open ground)</option>
                        <option>Partial (One lane blocked)</option>
                        <option>Complete (Entire road blocked)</option>
                      </select>
                    </div>
                  </div>
                  <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-300 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="font-bold text-emerald-950 block">Blocking Road?</span>
                      <span className="text-emerald-900 font-bold">{emergencyFields.tree_blocking_road}</span>
                    </div>
                    <div>
                      <span className="font-bold text-emerald-950 block">Fallen on Vehicle?</span>
                      <span className="text-rose-700 font-bold">{emergencyFields.tree_on_vehicle}</span>
                    </div>
                    <div>
                      <span className="font-bold text-emerald-950 block">Power Cable Affected?</span>
                      <span className="text-red-700 font-bold">{emergencyFields.tree_wires_affected}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================================= */}
              {/* DYNAMIC FORM RENDERING FOR WOMEN & CHILD SAFETY DOMAIN */}
              {/* ======================================================= */}
              {selectedCategory === 'safety_unsafe_public_place' && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Location / Exact Address *</label>
                      <input
                        type="text"
                        value={safetyFields.unsafe_address}
                        onChange={(e) => handleSafetyChange('unsafe_address', e.target.value)}
                        placeholder="E.g. Main Market Underpass, Ward 12"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Type of Unsafe Place *</label>
                      <select
                        value={safetyFields.unsafe_place_type}
                        onChange={(e) => handleSafetyChange('unsafe_place_type', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-medium"
                      >
                        <option>Dark Alley / Unlit Street</option>
                        <option>Abandoned Building / Empty Plot</option>
                        <option>Isolated Bus Stop / Railway Halt</option>
                        <option>Underpass / Pedestrian Subway</option>
                        <option>Unlit Park / Playground after dark</option>
                        <option>Overgrown Bushes / Narrow Blind Spot</option>
                        <option>Liquor Shop Vicinity with Loitering</option>
                        <option>Other Unsafe Public Spot</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Landmark Near Location *</label>
                      <input
                        type="text"
                        value={safetyFields.unsafe_landmark}
                        onChange={(e) => handleSafetyChange('unsafe_landmark', e.target.value)}
                        placeholder="Near Water Tank or Bus Stand"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Date and Time Noticed *</label>
                      <input
                        type="datetime-local"
                        value={safetyFields.unsafe_datetime}
                        onChange={(e) => handleSafetyChange('unsafe_datetime', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Frequency of Occurrence *</label>
                      <select
                        value={safetyFields.unsafe_frequency}
                        onChange={(e) => handleSafetyChange('unsafe_frequency', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-medium"
                      >
                        <option>Daily after sunset</option>
                        <option>Late night (11:00 PM to 5:00 AM)</option>
                        <option>Weekends & Holidays</option>
                        <option>Frequent & Ongoing</option>
                        <option>Occasional / One-time</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Severity Level *</label>
                      <select
                        value={safetyFields.unsafe_severity}
                        onChange={(e) => handleSafetyChange('unsafe_severity', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                      >
                        <option value="Low">Low - Minor Hazard</option>
                        <option value="Moderate">Moderate - Safety Risk</option>
                        <option value="High">High - High Risk Area</option>
                        <option value="Critical">Critical - Urgent Threat</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-amber-950">Description of Safety Issue *</label>
                    <textarea
                      rows={2}
                      value={safetyFields.unsafe_description}
                      onChange={(e) => handleSafetyChange('unsafe_description', e.target.value)}
                      placeholder="Explain why this location is unsafe (dark spots, lack of surveillance, antisocial gathering)..."
                      className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                    />
                  </div>
                </div>
              )}

              {selectedCategory === 'safety_street_harassment' && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Location of Incident *</label>
                      <input
                        type="text"
                        value={safetyFields.harass_location}
                        onChange={(e) => handleSafetyChange('harass_location', e.target.value)}
                        placeholder="Exact junction or street address"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Date and Time *</label>
                      <input
                        type="datetime-local"
                        value={safetyFields.harass_datetime}
                        onChange={(e) => handleSafetyChange('harass_datetime', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Type of Harassment *</label>
                      <select
                        value={safetyFields.harass_type}
                        onChange={(e) => handleSafetyChange('harass_type', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                      >
                        <option>Catcalling / Verbal Abuse</option>
                        <option>Stalking / Following</option>
                        <option>Inappropriate Gestures / Flashing</option>
                        <option>Physical Groping / Unwanted Contact</option>
                        <option>Threatening / Aggressive Intimidation</option>
                        <option>Group Harassment in Transit</option>
                        <option>Other Street Harassment</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Whether Incident is Ongoing? *</label>
                      <div className="flex items-center space-x-4 pt-1.5">
                        {['Yes', 'No'].map((opt) => (
                          <label key={opt} className="flex items-center space-x-1.5 cursor-pointer text-xs font-bold">
                            <input
                              type="radio"
                              name="wiz_harass_ongoing"
                              checked={safetyFields.harass_ongoing === opt}
                              onChange={() => handleSafetyChange('harass_ongoing', opt)}
                            />
                            <span className={opt === 'Yes' ? 'text-rose-700' : 'text-slate-800'}>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-amber-950">Description of Incident *</label>
                    <textarea
                      rows={2}
                      value={safetyFields.harass_description}
                      onChange={(e) => handleSafetyChange('harass_description', e.target.value)}
                      placeholder="Describe what occurred..."
                      className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Description of Person Involved (Optional)</label>
                      <input
                        type="text"
                        value={safetyFields.harass_suspect_description}
                        onChange={(e) => handleSafetyChange('harass_suspect_description', e.target.value)}
                        placeholder="Clothing, build, vehicle info"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Witness Details (Optional)</label>
                      <input
                        type="text"
                        value={safetyFields.harass_witness_details}
                        onChange={(e) => handleSafetyChange('harass_witness_details', e.target.value)}
                        placeholder="Shopkeeper / bystander info"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                  </div>
                  <div className="p-3 bg-rose-50 rounded-2xl border border-rose-300 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="font-bold text-rose-950 block">Immediate Danger?</span>
                      <div className="flex items-center space-x-3 pt-1">
                        {['Yes', 'No'].map((opt) => (
                          <label key={opt} className="flex items-center space-x-1 font-bold cursor-pointer text-rose-900">
                            <input
                              type="radio"
                              name="wiz_harass_danger"
                              checked={safetyFields.harass_immediate_danger === opt}
                              onChange={() => handleSafetyChange('harass_immediate_danger', opt)}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-bold text-rose-950 block">Police SOS Assistance Required?</span>
                      <div className="flex items-center space-x-3 pt-1">
                        {['Yes', 'No'].map((opt) => (
                          <label key={opt} className="flex items-center space-x-1 font-bold cursor-pointer text-rose-900">
                            <input
                              type="radio"
                              name="wiz_harass_police"
                              checked={safetyFields.harass_police_assistance === opt}
                              onChange={() => handleSafetyChange('harass_police_assistance', opt)}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedCategory === 'safety_missing_child' && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Child's Name *</label>
                      <input
                        type="text"
                        value={safetyFields.missing_child_name}
                        onChange={(e) => handleSafetyChange('missing_child_name', e.target.value)}
                        placeholder="Child's full name"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Age *</label>
                      <input
                        type="text"
                        value={safetyFields.missing_child_age}
                        onChange={(e) => handleSafetyChange('missing_child_age', e.target.value)}
                        placeholder="E.g. 7 years"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Gender *</label>
                      <select
                        value={safetyFields.missing_child_gender}
                        onChange={(e) => handleSafetyChange('missing_child_gender', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                      >
                        <option>Boy</option>
                        <option>Girl</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Date and Time Last Seen *</label>
                      <input
                        type="datetime-local"
                        value={safetyFields.missing_datetime_last_seen}
                        onChange={(e) => handleSafetyChange('missing_datetime_last_seen', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Last Known Location *</label>
                      <input
                        type="text"
                        value={safetyFields.missing_last_location}
                        onChange={(e) => handleSafetyChange('missing_last_location', e.target.value)}
                        placeholder="Area, park, school or bus stop"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Clothing Worn *</label>
                      <input
                        type="text"
                        value={safetyFields.missing_clothing}
                        onChange={(e) => handleSafetyChange('missing_clothing', e.target.value)}
                        placeholder="Shirt, pants, shoes colors"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Physical ID Marks *</label>
                      <input
                        type="text"
                        value={safetyFields.missing_id_marks}
                        onChange={(e) => handleSafetyChange('missing_id_marks', e.target.value)}
                        placeholder="Birthmarks, scars, specs"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Height / Appearance *</label>
                      <input
                        type="text"
                        value={safetyFields.missing_height_appearance}
                        onChange={(e) => handleSafetyChange('missing_height_appearance', e.target.value)}
                        placeholder="Height in ft/in, build, hair"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Parent / Guardian Name *</label>
                      <input
                        type="text"
                        value={safetyFields.missing_parent_name}
                        onChange={(e) => handleSafetyChange('missing_parent_name', e.target.value)}
                        placeholder="Guardian name"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Parent Contact Number *</label>
                      <input
                        type="text"
                        value={safetyFields.missing_parent_contact}
                        onChange={(e) => handleSafetyChange('missing_parent_contact', e.target.value)}
                        placeholder="Phone number"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">FIR Number (if available)</label>
                      <input
                        type="text"
                        value={safetyFields.missing_fir_number}
                        onChange={(e) => handleSafetyChange('missing_fir_number', e.target.value)}
                        placeholder="FIR # if registered"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedCategory === 'safety_child_labour' && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Location Observed *</label>
                      <input
                        type="text"
                        value={safetyFields.labour_location}
                        onChange={(e) => handleSafetyChange('labour_location', e.target.value)}
                        placeholder="Shop name or address"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Type of Workplace *</label>
                      <select
                        value={safetyFields.labour_workplace_type}
                        onChange={(e) => handleSafetyChange('labour_workplace_type', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                      >
                        <option>Restaurant / Tea Stall (Dhaba)</option>
                        <option>Brick Kiln / Quarry</option>
                        <option>Auto Repair Garage / Workshop</option>
                        <option>Construction Site</option>
                        <option>Hazardous Factory / Chemical Unit</option>
                        <option>Domestic Household Work</option>
                        <option>Retail Shop / Commercial Market</option>
                        <option>Agricultural Farm</option>
                        <option>Street Selling / Begging Syndicate</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Approximate Age of Child *</label>
                      <input
                        type="text"
                        value={safetyFields.labour_child_age}
                        onChange={(e) => handleSafetyChange('labour_child_age', e.target.value)}
                        placeholder="E.g. 9 - 11 years"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Number of Children Involved *</label>
                      <input
                        type="number"
                        min="1"
                        value={safetyFields.labour_child_count}
                        onChange={(e) => handleSafetyChange('labour_child_count', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Type of Work Being Performed *</label>
                      <input
                        type="text"
                        value={safetyFields.labour_work_type}
                        onChange={(e) => handleSafetyChange('labour_work_type', e.target.value)}
                        placeholder="E.g. Heavy lifting, handling chemicals, dishwashing"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Working Hours (if known)</label>
                      <input
                        type="text"
                        value={safetyFields.labour_working_hours}
                        onChange={(e) => handleSafetyChange('labour_working_hours', e.target.value)}
                        placeholder="E.g. 8 AM to 8 PM"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Employer / Business Details (if known)</label>
                      <input
                        type="text"
                        value={safetyFields.labour_employer_details}
                        onChange={(e) => handleSafetyChange('labour_employer_details', e.target.value)}
                        placeholder="Owner name, shop name"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Date and Time Observed *</label>
                      <input
                        type="datetime-local"
                        value={safetyFields.labour_datetime_observed}
                        onChange={(e) => handleSafetyChange('labour_datetime_observed', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedCategory === 'safety_school_safety' && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">School Name *</label>
                      <input
                        type="text"
                        value={safetyFields.school_name}
                        onChange={(e) => handleSafetyChange('school_name', e.target.value)}
                        placeholder="School name"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">School Location *</label>
                      <input
                        type="text"
                        value={safetyFields.school_location}
                        onChange={(e) => handleSafetyChange('school_location', e.target.value)}
                        placeholder="Address / Ward"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Type of Safety Issue *</label>
                      <select
                        value={safetyFields.school_safety_type}
                        onChange={(e) => handleSafetyChange('school_safety_type', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                      >
                        <option>Ragging / Severe Bullying</option>
                        <option>Lack of Boundary Wall / Broken Gates</option>
                        <option>Inappropriate Staff / Driver Behavior</option>
                        <option>Unsafe School Bus / Van Transport</option>
                        <option>Substance Abuse / Tobacco near Gate</option>
                        <option>Unhygienic Sanitation Facilities</option>
                        <option>Structural / Electrical Hazard</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Person / Authority Involved</label>
                      <input
                        type="text"
                        value={safetyFields.school_authority_involved}
                        onChange={(e) => handleSafetyChange('school_authority_involved', e.target.value)}
                        placeholder="Staff, senior students, driver"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Number of Students Affected *</label>
                      <input
                        type="text"
                        value={safetyFields.school_students_affected}
                        onChange={(e) => handleSafetyChange('school_students_affected', e.target.value)}
                        placeholder="E.g. Single student, whole grade"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Severity Level *</label>
                      <select
                        value={safetyFields.school_severity}
                        onChange={(e) => handleSafetyChange('school_severity', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                      >
                        <option value="Low">Low</option>
                        <option value="Moderate">Moderate</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {selectedCategory === 'safety_women_safety_location' && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Exact Location *</label>
                      <input
                        type="text"
                        value={safetyFields.women_safety_location}
                        onChange={(e) => handleSafetyChange('women_safety_location', e.target.value)}
                        placeholder="Street or underpass name"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Landmark *</label>
                      <input
                        type="text"
                        value={safetyFields.women_safety_landmark}
                        onChange={(e) => handleSafetyChange('women_safety_landmark', e.target.value)}
                        placeholder="Nearby railway bridge, metro, market"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Type of Safety Concern *</label>
                      <select
                        value={safetyFields.women_safety_concern_type}
                        onChange={(e) => handleSafetyChange('women_safety_concern_type', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                      >
                        <option>Pitch Dark / Complete Streetlight Failure</option>
                        <option>No CCTV Coverage / Blindspot</option>
                        <option>Isolated & Deserted Stretch</option>
                        <option>Loitering / Anti-social Gathering</option>
                        <option>Lack of Women Police Patrolling</option>
                        <option>Overgrown Vegetation / Blocked Footpaths</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Date/Time or Usual Unsafe Hours *</label>
                      <input
                        type="text"
                        value={safetyFields.women_safety_unsafe_hours}
                        onChange={(e) => handleSafetyChange('women_safety_unsafe_hours', e.target.value)}
                        placeholder="E.g. Post 7:00 PM, Late Night"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Lighting Condition *</label>
                      <select
                        value={safetyFields.women_safety_lighting}
                        onChange={(e) => handleSafetyChange('women_safety_lighting', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-medium"
                      >
                        <option>Pitch dark (all light fixtures non-functional)</option>
                        <option>Dimly lit / Fused sodium bulbs</option>
                        <option>Intermittent / Flickering lights</option>
                        <option>Poor light distribution</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Availability of CCTV / Security *</label>
                      <select
                        value={safetyFields.women_safety_cctv}
                        onChange={(e) => handleSafetyChange('women_safety_cctv', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-medium"
                      >
                        <option>No CCTV surveillance installed</option>
                        <option>CCTV present but offline/broken</option>
                        <option>CCTV present but unmonitored</option>
                        <option>Security guards unavailable</option>
                        <option>Unknown</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-amber-950">Suggested Safety Improvement *</label>
                    <input
                      type="text"
                      value={safetyFields.women_safety_improvement}
                      onChange={(e) => handleSafetyChange('women_safety_improvement', e.target.value)}
                      placeholder="E.g. Install High-Mast LED Light, Pink Police Booth, CCTV"
                      className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                    />
                  </div>
                </div>
              )}

              {selectedCategory === 'safety_domestic_support' && (
                <div className="space-y-4 pt-2">
                  <div className="p-3 bg-purple-50 rounded-2xl border border-purple-300 text-xs text-purple-950 font-bold flex items-center gap-2">
                    <Lock className="w-4 h-4 text-purple-700 shrink-0" />
                    <span>Confidential Domestic Support: Routed directly to Sakhi One-Stop Crisis Center & Legal Protection team.</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Type of Support Required *</label>
                      <select
                        value={safetyFields.domestic_support_type}
                        onChange={(e) => handleSafetyChange('domestic_support_type', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                      >
                        <option>Emergency Safe Shelter & Protection Order</option>
                        <option>Free Legal Aid & Protection Officer Assistance</option>
                        <option>Psychological Counselling & Trauma Therapy</option>
                        <option>Immediate Police Intervention / Rescue</option>
                        <option>Medical Attention & Forensic Support</option>
                        <option>Rehabilitation & Financial Skill Training</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Current Location *</label>
                      <input
                        type="text"
                        value={safetyFields.domestic_current_location}
                        onChange={(e) => handleSafetyChange('domestic_current_location', e.target.value)}
                        placeholder="Current safe address"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-amber-950">Nature of Problem *</label>
                    <textarea
                      rows={2}
                      value={safetyFields.domestic_nature_of_problem}
                      onChange={(e) => handleSafetyChange('domestic_nature_of_problem', e.target.value)}
                      placeholder="Brief details of the domestic distress situation..."
                      className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                    />
                  </div>
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div>
                      <span className="font-bold text-amber-950 block">In Danger?</span>
                      <span className="text-rose-700 font-bold">{safetyFields.domestic_in_danger}</span>
                    </div>
                    <div>
                      <span className="font-bold text-amber-950 block">Medical Help?</span>
                      <span className="text-slate-800 font-bold">{safetyFields.domestic_medical_needed}</span>
                    </div>
                    <div>
                      <span className="font-bold text-amber-950 block">Safe Shelter?</span>
                      <span className="text-slate-800 font-bold">{safetyFields.domestic_shelter_needed}</span>
                    </div>
                    <div>
                      <span className="font-bold text-amber-950 block">Legal Aid?</span>
                      <span className="text-slate-800 font-bold">{safetyFields.domestic_legal_needed}</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedCategory === 'safety_child_welfare' && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Child's Name (if known)</label>
                      <input
                        type="text"
                        value={safetyFields.welfare_child_name}
                        onChange={(e) => handleSafetyChange('welfare_child_name', e.target.value)}
                        placeholder="Child's name"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Approximate Age *</label>
                      <input
                        type="text"
                        value={safetyFields.welfare_approx_age}
                        onChange={(e) => handleSafetyChange('welfare_approx_age', e.target.value)}
                        placeholder="E.g. 5 - 6 years"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Gender *</label>
                      <select
                        value={safetyFields.welfare_gender}
                        onChange={(e) => handleSafetyChange('welfare_gender', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                      >
                        <option>Girl</option>
                        <option>Boy</option>
                        <option>Other / Unknown</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Current Location *</label>
                      <input
                        type="text"
                        value={safetyFields.welfare_current_location}
                        onChange={(e) => handleSafetyChange('welfare_current_location', e.target.value)}
                        placeholder="Where the child was observed"
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-amber-950">Type of Welfare Concern *</label>
                      <select
                        value={safetyFields.welfare_concern_type}
                        onChange={(e) => handleSafetyChange('welfare_concern_type', e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-amber-950 font-bold"
                      >
                        <option>Abandoned / Severe Malnutrition & Illness</option>
                        <option>Orphaned Child Needing Emergency Shelter</option>
                        <option>Physical Abuse / Neglect by Caregiver</option>
                        <option>Child Found Begging on Traffic Signal</option>
                        <option>Child in Need of Immediate Medical Attention</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-amber-950">Description of Child's Condition *</label>
                    <textarea
                      rows={2}
                      value={safetyFields.welfare_condition_desc}
                      onChange={(e) => handleSafetyChange('welfare_condition_desc', e.target.value)}
                      placeholder="Health status, injuries, visible distress..."
                      className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-800 font-medium"
                    />
                  </div>
                </div>
              )}

              {/* Text Description Box */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-amber-950">
                  {selectedCategory.startsWith('safety_') || selectedCategory.startsWith('emergency_') ? 'Additional Observations / Remarks' : 'Detailed Complaint Description'}
                </label>
                <textarea
                  rows={2}
                  placeholder="Additional notes, specific location markers, or emergency details..."
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(e.target.value)}
                  className="w-full bg-white border border-amber-300 text-xs text-slate-800 rounded-2xl p-3 font-medium focus:border-amber-600"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setWizardStep(4);
                  speakText('Moving to Step 4: Final review and submission.');
                }}
                className="w-full py-3 bg-gradient-to-r from-amber-700 to-orange-600 text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 flex items-center justify-center space-x-1"
              >
                <span>{t('proceedToStep4', language)}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 4: Review, Location Confirmation & One-Tap Submit */}
          {wizardStep === 4 && (
            <div className="ethnic-card p-6 rounded-3xl space-y-5 shadow-xl gold-glow border-2 border-amber-300">
              <div className="text-center space-y-1">
                <h3 className="text-lg font-black font-cinzel text-amber-950">{t('step4Title', language)}</h3>
                <p className="text-xs text-amber-800/80 font-bold">{t('step4Sub', language)}</p>
              </div>

              {/* Summary Card */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 text-xs space-y-2">
                <div className="flex justify-between border-b border-amber-200 pb-2">
                  <span className="font-bold text-amber-900">Category Domain:</span>
                  <span className="font-bold text-amber-950">{t(`domain_${selectedDomainObj.id}`, language) || selectedDomainObj.name}</span>
                </div>
                <div className="flex justify-between border-b border-amber-200 pb-2">
                  <span className="font-bold text-amber-900">Specific Problem:</span>
                  <span className="font-bold text-amber-950">{selectedCatObj.icon} {translateCategory(selectedCatObj, language)}</span>
                </div>
                <div className="flex justify-between border-b border-amber-200 pb-2">
                  <span className="font-bold text-amber-900">Auto SLA Department:</span>
                  <span className="font-bold text-red-900">
                    {selectedCategory.startsWith('emergency_')
                      ? 'Emergency Response & Disaster Operations (Rapid Dispatch 1h SLA)'
                      : selectedCategory.startsWith('safety_')
                      ? 'Women & Child Safety Cell (High-Priority SLA)'
                      : 'Municipal Civil Grievance Board (24h SLA)'}
                  </span>
                </div>

                {/* Specific Emergency Breakdown Preview */}
                {selectedCategory === 'emergency_fire' && (
                  <div className="p-2.5 bg-red-50 rounded-xl border border-red-300 space-y-1 text-red-950">
                    <p className="font-bold text-red-900">🔥 Fire Emergency Breakdown:</p>
                    <p>• Type: {emergencyFields.fire_incident_type} | Severity: {emergencyFields.fire_severity}</p>
                    <p>• Location: {emergencyFields.fire_address} (Near {emergencyFields.fire_landmark})</p>
                    <p>• Trapped: {emergencyFields.fire_trapped} | Hazards: {emergencyFields.fire_nearby_hazards}</p>
                    <p>• Complainant: {emergencyFields.fire_complainant_name} ({emergencyFields.fire_mobile_number})</p>
                  </div>
                )}
                {selectedCategory === 'emergency_accident' && (
                  <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-300 space-y-1 text-rose-950">
                    <p className="font-bold text-rose-900">🚑 Accident Report Breakdown:</p>
                    <p>• Type: {emergencyFields.accident_type} | Vehicles: {emergencyFields.accident_vehicle_details}</p>
                    <p>• Location: {emergencyFields.accident_location} (Near {emergencyFields.accident_landmark})</p>
                    <p>• Injured: {emergencyFields.accident_injured_count} (Serious: {emergencyFields.accident_seriously_injured}) | 108 Ambulance: {emergencyFields.accident_ambulance_required}</p>
                    <p>• Complainant: {emergencyFields.accident_name} ({emergencyFields.accident_phone})</p>
                  </div>
                )}
                {selectedCategory === 'emergency_building_safety' && (
                  <div className="p-2.5 bg-amber-100/80 rounded-xl border border-amber-300 space-y-1 text-amber-950">
                    <p className="font-bold text-amber-900">🏢 Building Safety Hazard Breakdown:</p>
                    <p>• Hazard: {emergencyFields.bld_hazard_type} | Severity: {emergencyFields.bld_severity}</p>
                    <p>• Building: {emergencyFields.bld_address} ({emergencyFields.bld_type}, {emergencyFields.bld_floors})</p>
                    <p>• Occupied: {emergencyFields.bld_occupied} (~{emergencyFields.bld_people_at_risk} at risk)</p>
                    <p>• Complainant: {emergencyFields.bld_name} ({emergencyFields.bld_phone})</p>
                  </div>
                )}
                {selectedCategory === 'emergency_flood' && (
                  <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-300 space-y-1 text-blue-950">
                    <p className="font-bold text-blue-900">🌊 Flood Report Breakdown:</p>
                    <p>• Type: {emergencyFields.flood_type} | Level: {emergencyFields.flood_water_level}</p>
                    <p>• Location: {emergencyFields.flood_location} (Near {emergencyFields.flood_landmark})</p>
                    <p>• Roads Blocked: {emergencyFields.flood_roads_blocked} | Evac: {emergencyFields.flood_evacuation} | Power Off: {emergencyFields.flood_electricity_affected}</p>
                    <p>• Complainant: {emergencyFields.flood_name} ({emergencyFields.flood_phone})</p>
                  </div>
                )}
                {selectedCategory === 'emergency_landslide' && (
                  <div className="p-2.5 bg-stone-100 rounded-xl border border-stone-300 space-y-1 text-stone-950">
                    <p className="font-bold text-stone-900">⛰️ Landslide Report Breakdown:</p>
                    <p>• Type: {emergencyFields.landslide_type} | Severity: {emergencyFields.landslide_severity}</p>
                    <p>• Location: {emergencyFields.landslide_location} (Near {emergencyFields.landslide_landmark})</p>
                    <p>• Road Blocked: {emergencyFields.landslide_road_blocked} | Further Risk: {emergencyFields.landslide_risk_further}</p>
                    <p>• Complainant: {emergencyFields.landslide_name} ({emergencyFields.landslide_phone})</p>
                  </div>
                )}
                {selectedCategory === 'emergency_fallen_tree' && (
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-300 space-y-1 text-emerald-950">
                    <p className="font-bold text-emerald-900">🌳 Fallen Tree Clearance Breakdown:</p>
                    <p>• Location: {emergencyFields.tree_location} (Near {emergencyFields.tree_landmark})</p>
                    <p>• Cause: {emergencyFields.tree_cause} | Traffic Blocked: {emergencyFields.tree_traffic_obstruction}</p>
                    <p>• Vehicle Hit: {emergencyFields.tree_on_vehicle} | Power Wire Hit: {emergencyFields.tree_wires_affected}</p>
                    <p>• Complainant: {emergencyFields.tree_name} ({emergencyFields.tree_phone})</p>
                  </div>
                )}

                {/* Specific Safety Breakdown Preview */}
                {selectedCategory === 'safety_unsafe_public_place' && (
                  <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-200 space-y-1">
                    <p className="font-bold text-purple-950">Unsafe Public Place Breakdown:</p>
                    <p>• Type: {safetyFields.unsafe_place_type} | Severity: {safetyFields.unsafe_severity}</p>
                    <p>• Location: {safetyFields.unsafe_address} (Near {safetyFields.unsafe_landmark})</p>
                    <p>• Frequency: {safetyFields.unsafe_frequency}</p>
                  </div>
                )}
                {selectedCategory === 'safety_street_harassment' && (
                  <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200 space-y-1">
                    <p className="font-bold text-rose-950">Street Harassment Breakdown:</p>
                    <p>• Type: {safetyFields.harass_type} | Ongoing: {safetyFields.harass_ongoing}</p>
                    <p>• Location: {safetyFields.harass_location}</p>
                    <p>• Police SOS: {safetyFields.harass_police_assistance} | Danger: {safetyFields.harass_immediate_danger}</p>
                  </div>
                )}
                {selectedCategory === 'safety_missing_child' && (
                  <div className="p-2.5 bg-amber-100/80 rounded-xl border border-amber-300 space-y-1">
                    <p className="font-bold text-amber-950">Missing Child Alert Breakdown:</p>
                    <p>• Child: {safetyFields.missing_child_name || 'Unspecified'}, {safetyFields.missing_child_age} ({safetyFields.missing_child_gender})</p>
                    <p>• Last Seen: {safetyFields.missing_last_location} at {safetyFields.missing_datetime_last_seen}</p>
                    <p>• Guardian: {safetyFields.missing_parent_name} ({safetyFields.missing_parent_contact})</p>
                  </div>
                )}
                {selectedCategory === 'safety_child_labour' && (
                  <div className="p-2.5 bg-amber-100/80 rounded-xl border border-amber-300 space-y-1">
                    <p className="font-bold text-amber-950">Child Labour Report Breakdown:</p>
                    <p>• Workplace: {safetyFields.labour_workplace_type} at {safetyFields.labour_location}</p>
                    <p>• Minors: {safetyFields.labour_child_count} children (~{safetyFields.labour_child_age})</p>
                    <p>• Work: {safetyFields.labour_work_type}</p>
                  </div>
                )}
                {selectedCategory === 'safety_school_safety' && (
                  <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-200 space-y-1">
                    <p className="font-bold text-indigo-950">School Safety Breakdown:</p>
                    <p>• School: {safetyFields.school_name} ({safetyFields.school_location})</p>
                    <p>• Concern: {safetyFields.school_safety_type} | Severity: {safetyFields.school_severity}</p>
                  </div>
                )}
                {selectedCategory === 'safety_women_safety_location' && (
                  <div className="p-2.5 bg-fuchsia-50 rounded-xl border border-fuchsia-200 space-y-1">
                    <p className="font-bold text-fuchsia-950">Women Safety Location Breakdown:</p>
                    <p>• Location: {safetyFields.women_safety_location} (Near {safetyFields.women_safety_landmark})</p>
                    <p>• Concern: {safetyFields.women_safety_concern_type} | Lighting: {safetyFields.women_safety_lighting}</p>
                    <p>• Suggested: {safetyFields.women_safety_improvement}</p>
                  </div>
                )}
                {selectedCategory === 'safety_domestic_support' && (
                  <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-200 space-y-1">
                    <p className="font-bold text-purple-950">Domestic Support Referral Breakdown:</p>
                    <p>• Required: {safetyFields.domestic_support_type}</p>
                    <p>• In Danger: {safetyFields.domestic_in_danger} | Shelter Needed: {safetyFields.domestic_shelter_needed}</p>
                    <p>• Safe Contact Mode: {safetyFields.domestic_preferred_contact} at {safetyFields.domestic_safe_time}</p>
                  </div>
                )}
                {selectedCategory === 'safety_child_welfare' && (
                  <div className="p-2.5 bg-teal-50 rounded-xl border border-teal-200 space-y-1">
                    <p className="font-bold text-teal-950">Child Welfare Request Breakdown:</p>
                    <p>• Child: {safetyFields.welfare_child_name || 'Unknown'} (~{safetyFields.welfare_approx_age}, {safetyFields.welfare_gender})</p>
                    <p>• Location: {safetyFields.welfare_current_location}</p>
                    <p>• Concern: {safetyFields.welfare_concern_type}</p>
                  </div>
                )}

                <div>
                  <span className="font-bold text-amber-900">Grievance Payload:</span>
                  <p className="text-slate-800 mt-0.5 font-medium">{descriptionInput || voiceTranscription || 'Public safety grievance recorded.'}</p>
                </div>
              </div>

              {/* Location Input & Anonymous Toggle */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950">{t('liveGpsTitle', language)}</label>
                  <input
                    type="text"
                    value={locationAddress}
                    onChange={(e) => setLocationAddress(e.target.value)}
                    className="w-full bg-white border border-amber-300 text-xs text-slate-800 rounded-xl p-2.5 font-bold"
                  />
                </div>

                <label className="flex items-center space-x-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded border-amber-300 focus:ring-amber-500"
                  />
                  <span className="text-xs font-bold text-amber-950">{t('isAnonymous', language)}</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmitComplaint}
                className="w-full py-3.5 bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 hover:opacity-95 text-white font-bold text-xs rounded-2xl shadow-lg shadow-amber-900/20 flex items-center justify-center space-x-2 border border-amber-300"
              >
                <span>{t('submitComplaint', language)}</span>
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: MY COMPLAINTS & TRACK STATUS */}
      {/* ========================================================================= */}
      {activeSection === 'my_issues' && (
        <div className="space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-amber-200 pb-3">
            <div>
              <h3 className="text-lg font-black font-cinzel text-amber-950">Track Reported Complaints</h3>
              <p className="text-xs text-amber-800/80 font-bold">Monitor live SLA countdowns, officer assignments & rate resolutions</p>
            </div>

            {/* Filter Controls & Scan QR Receipt Button */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => {
                  setIsQRScannerOpen(true);
                  if (speakText) speakText('Opening QR scanner to scan tracking receipt');
                }}
                className="px-3 py-1.5 bg-gradient-to-r from-amber-700 to-orange-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1 shadow-xs border border-amber-400"
                title="Scan Grievance Receipt QR"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Scan Receipt</span>
              </button>
              <input
                type="text"
                placeholder="Search complaint ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border border-amber-300 text-xs text-slate-800 rounded-xl px-3 py-1.5 font-bold"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-white border border-amber-300 text-xs text-amber-950 rounded-xl px-2.5 py-1.5 font-bold cursor-pointer"
              >
                <option value="">All Statuses</option>
                <option value="Pending Assignment">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          {/* Complaint Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredComplaints.length === 0 ? (
              <div className="col-span-2 ethnic-card p-8 rounded-3xl text-center text-amber-900 space-y-2">
                <p className="text-sm font-bold">No complaints matching filter criteria.</p>
                <button
                  onClick={() => { setActiveSection('wizard'); setWizardStep(1); }}
                  className="px-4 py-2 bg-amber-700 text-white rounded-xl text-xs font-bold inline-block"
                >
                  File First Issue
                </button>
              </div>
            ) : (
              filteredComplaints.map((c) => (
                <div key={c.id} className="ethnic-card p-5 rounded-3xl space-y-3 shadow-md gold-glow border-2 border-amber-300">
                  <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                    <span className="text-xs font-black font-mono text-amber-950">ID: #{c.id}</span>
                    <div className="flex items-center space-x-1.5">
                      <button
                        type="button"
                        onClick={() => setQrReceiptModalComplaint(c)}
                        title="View Official Digital QR Receipt"
                        className="px-2 py-0.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 text-[10px] font-bold flex items-center space-x-1"
                      >
                        <QrCode className="w-3 h-3 text-amber-700" />
                        <span>QR Receipt</span>
                      </button>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        c.status === 'Verified Resolved'
                          ? 'bg-emerald-600 text-white border border-emerald-500 shadow-xs'
                          : c.status === 'Disputed / Re-Opened'
                          ? 'bg-rose-600 text-white border border-rose-500 animate-pulse'
                          : c.status === 'Resolved'
                          ? 'bg-amber-500 text-slate-950 border border-amber-400 font-black'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}>
                        {c.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-amber-950">Category: {c.category}</h4>
                    <p className="text-xs text-slate-700">{c.description}</p>
                    <p className="text-[11px] text-amber-900/80 font-bold">📍 {c.location?.address || 'Kalaburagi Ward 12'}</p>
                  </div>

                  {/* CITIZEN RESOLUTION VERIFICATION & DISPUTE ACTION BOX */}
                  {c.status === 'Resolved' && (
                    <div className="p-3 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-50 rounded-2xl border-2 border-amber-400 space-y-2 text-left shadow-sm">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-black text-amber-950 flex items-center gap-1.5 font-cinzel">
                          <span>👮 Officer Marked as Resolved</span>
                        </span>
                        <span className="bg-amber-300/80 text-amber-950 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400">
                          Citizen Verification Required
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-700 font-medium">
                        Officer Notes: <strong className="text-amber-950">"{c.resolutionNotes || 'Work reported complete on-site'}"</strong>. Is this issue genuinely fixed?
                      </p>
                      <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => handleVerifyResolution(c.id)}
                          className="w-full sm:flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center space-x-1.5 transition-all"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>✓ Yes, Issue Fixed (Verify)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => openDisputeModal(c)}
                          className="w-full sm:flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center space-x-1.5 transition-all"
                        >
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>❌ NOT Fixed! Dispute & Re-Open</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* VERIFIED RESOLVED BADGE */}
                  {c.status === 'Verified Resolved' && (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center space-x-2 text-xs text-emerald-950 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>✓ Citizen Confirmed: Truly Resolved on Ground (+25 Karma Points Awarded)</span>
                    </div>
                  )}

                  {/* DISPUTED / RE-OPENED ALERT BANNER */}
                  {c.status === 'Disputed / Re-Opened' && (
                    <div className="p-3 bg-rose-50 border-2 border-rose-400 rounded-2xl space-y-1 text-xs">
                      <div className="flex items-center justify-between text-rose-950 font-black">
                        <span className="flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-rose-600 animate-pulse" />
                          <span>🚨 RE-OPENED: Citizen Disputed False Resolution</span>
                        </span>
                        <span className="bg-rose-200 text-rose-900 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
                          ESCALATED TO VIGILANCE
                        </span>
                      </div>
                      <p className="text-[11px] text-rose-800 font-medium">
                        Citizen Dispute Reason: <strong>"{c.disputeReason || 'Citizen reported issue is NOT fixed on-site.'}"</strong>
                      </p>
                    </div>
                  )}

                  <div className="pt-2 border-t border-amber-200 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <span className="text-slate-600 font-medium">Assigned: <strong>{c.assignedOfficer || 'Department Official'}</strong></span>
                    <button
                      type="button"
                      onClick={() => handleConfirmIssue(c.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs ${
                        (c.confirmations || []).includes(currentUser?.uid || 'usr-citizen-1')
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500'
                          : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>
                        {(c.confirmations || []).includes(currentUser?.uid || 'usr-citizen-1')
                          ? `✓ Confirmed (${c.confirmations?.length || 1})`
                          : `Confirm Issue (👍 ${c.confirmations?.length || 0})`}
                      </span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: GPS HEATMAP & WARD MAP */}
      {/* ========================================================================= */}
      {activeSection === 'map' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-amber-200 pb-3">
            <h3 className="text-lg font-black font-cinzel text-amber-950">Ward 12 Interactive GPS Map</h3>
            <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Live Hotspots & SBM Public Washrooms
            </span>
          </div>

          <div className="ethnic-card p-6 rounded-3xl text-center space-y-4 shadow-xl gold-glow border-2 border-amber-300 bg-amber-50/50 min-h-[350px] flex flex-col items-center justify-center">
            <MapPin className="w-12 h-12 text-amber-700 animate-bounce" />
            <div className="space-y-1">
              <h4 className="text-base font-bold text-amber-950">Kalaburagi ULB Municipal Map Layer Active</h4>
              <p className="text-xs text-amber-900/80 font-medium max-w-md mx-auto">
                Showing 14 active open civic complaints, 3 disinfected SBM smart toilets & 2 medical health camps in Ward 12.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold">
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300">🔴 Garbage Dump Hotspot</span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">🟢 SBM Smart Toilet</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: SWACHH BHARAT CLEANLINESS & TOILETS */}
      {/* ========================================================================= */}
      {activeSection === 'cleanliness' && (
        <div className="space-y-6">
          <div className="border-b border-amber-200 pb-3">
            <h3 className="text-lg font-black font-cinzel text-amber-950">Swachh Bharat Cleanliness & Toilets</h3>
            <p className="text-xs text-amber-800/80 font-bold">Locate SBM toilets, rate hygiene & participate in community drives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SBM_TOILETS.map((toilet) => (
              <div key={toilet.id} className="ethnic-card p-5 rounded-3xl space-y-3 shadow-md border-2 border-amber-300">
                <div className="flex items-center justify-between">
                  <span className="text-xl">🚻</span>
                  <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    ★ {toilet.rating}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-950">{toilet.name}</h4>
                  <p className="text-[11px] text-slate-600">{toilet.distance} • {toilet.status}</p>
                </div>
                <button
                  onClick={() => speakText(`Navigating to ${toilet.name}`)}
                  className="w-full py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Navigate GPS
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6: URGENT BLOOD DONORS & MEDICAL CAMPS */}
      {/* ========================================================================= */}
      {activeSection === 'blood' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-amber-200 pb-3">
            <div>
              <h3 className="text-lg font-black font-cinzel text-amber-950">Urgent Blood Donor & Medical Board</h3>
              <p className="text-xs text-amber-800/80 font-bold">Post emergency blood requirements & find verified health camps</p>
            </div>
            <button
              onClick={() => setShowBloodModal(true)}
              className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md"
            >
              + Post Blood Need
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bloodRequests.map((b) => (
              <div key={b.id} className="ethnic-card p-5 rounded-3xl space-y-2 border-2 border-rose-300 bg-rose-50/40">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold px-3 py-1 bg-rose-600 text-white rounded-full">
                    Group: {b.bloodGroup}
                  </span>
                  <span className="text-[10px] font-bold text-rose-800 uppercase">{b.urgency}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">Hospital: {b.hospital}</h4>
                <p className="text-xs text-slate-600">Contact: {b.contactPhone}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 7: LEADERBOARD & REWARDS */}
      {/* ========================================================================= */}
      {activeSection === 'rewards' && (
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-black font-cinzel text-amber-950">Citizen Leaderboard & Green Badges</h3>
            <p className="text-xs text-amber-800/80 font-bold">Top active civic contributors in Ward 12</p>
          </div>

          <div className="ethnic-card p-6 rounded-3xl space-y-3 shadow-xl border-2 border-amber-300">
            {leaderboard.map((user, idx) => (
              <div key={user.uid} className="flex items-center justify-between p-3 bg-amber-50 rounded-2xl border border-amber-200">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-black font-mono text-amber-900">#{idx + 1}</span>
                  <div>
                    <p className="text-xs font-bold text-amber-950">{user.name}</p>
                    <p className="text-[10px] text-amber-800 font-bold">{user.badge} Contributor</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-orange-900 bg-orange-100 px-3 py-1 rounded-full border border-orange-300 font-mono">
                  {user.points} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 8: PUBLIC GOVERNANCE & FILE DELAY MONITORING DASHBOARD */}
      {/* ========================================================================= */}
      {activeSection === 'governance_delay_tracker' && (
        <FileGovernanceDashboard speakText={speakText} currentUser={currentUser} />
      )}

      {/* ========================================================================= */}
      {/* POST EMERGENCY BLOOD REQUEST MODAL POPUP */}
      {/* ========================================================================= */}
      {showBloodModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="ethnic-card bg-white p-6 rounded-3xl max-w-md w-full border-2 border-rose-400 shadow-2xl space-y-4 font-outfit">
            
            <div className="flex items-center justify-between border-b border-rose-200 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-sm">
                  🩸
                </div>
                <h3 className="text-base font-black font-cinzel text-rose-950">Post Emergency Blood Request</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowBloodModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBloodRequest} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-900">Required Blood Group</label>
                <select
                  value={newBlood.bloodGroup}
                  onChange={(e) => setNewBlood({ ...newBlood, bloodGroup: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-slate-900 focus:ring-2 focus:ring-rose-500"
                >
                  <option value="A+">A Positive (A+)</option>
                  <option value="A-">A Negative (A-)</option>
                  <option value="B+">B Positive (B+)</option>
                  <option value="B-">B Negative (B-)</option>
                  <option value="AB+">AB Positive (AB+)</option>
                  <option value="AB-">AB Negative (AB-)</option>
                  <option value="O+">O Positive (O+)</option>
                  <option value="O-">O Negative (O-)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-900">Hospital / Medical Center Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Govt Civil Hospital, Ward 12 ICU"
                  value={newBlood.hospital}
                  onChange={(e) => setNewBlood({ ...newBlood, hospital: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-900">Emergency Urgency Level</label>
                <select
                  value={newBlood.urgency}
                  onChange={(e) => setNewBlood({ ...newBlood, urgency: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-slate-900 focus:ring-2 focus:ring-rose-500"
                >
                  <option value="Emergency">🚨 Immediate Emergency (Within 1 Hour)</option>
                  <option value="Urgent">⚡ Urgent (Within 4 Hours)</option>
                  <option value="Standard">📋 Standard (Within 24 Hours)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-900">Attendant Contact Mobile Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={newBlood.contactPhone}
                  onChange={(e) => setNewBlood({ ...newBlood, contactPhone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-slate-900 focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setShowBloodModal(false)}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Post Emergency Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI LIVE CAMERA CAPTURE MODAL */}
      <CameraCaptureModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onPhotoCaptured={(photo, ai) => {
          setSelectedPhoto(photo);
          if (ai) setAiDetectedCategory(ai);
          if (speakText) speakText('Photo proof and GPS tag attached successfully.');
        }}
        categoryName={translateCategory(selectedCatObj, language) || 'Civic Issue'}
      />

      {/* AI SPEECH-TO-TEXT & TEXT-TO-SPEECH VOICE ASSISTANT MODAL */}
      <VoiceAssistantModal
        isOpen={isVoiceAssistantOpen}
        onClose={() => setIsVoiceAssistantOpen(false)}
        initialLanguage={getVoiceLangCode(language)}
        onApplyTranscription={({ text, aiData }) => {
          setDescriptionInput(text);
          setVoiceTranscription(text);
          if (aiData) {
            if (aiData.domain) setWizardDomain(aiData.domain);
            if (aiData.category) setSelectedCategory(aiData.category);
          }
          if (speakText) speakText('Voice complaint transcribed and applied to form.');
        }}
      />

      {/* CIVIC ASSET & GRIEVANCE QR CODE SCANNER MODAL */}
      <QRScannerModal
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onScanSuccess={handleQRScanSuccess}
        language={language}
        speakText={speakText}
      />

      {/* OFFICIAL DIGITAL QR RECEIPT MODAL */}
      {qrReceiptModalComplaint && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border-2 border-amber-400 p-6 rounded-3xl max-w-md w-full relative space-y-4 shadow-2xl animate-fadeIn">
            <button
              onClick={() => setQrReceiptModalComplaint(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 font-black p-1 bg-slate-100 hover:bg-slate-200 rounded-full w-7 h-7 flex items-center justify-center"
            >
              ✕
            </button>
            <ComplaintQRCard
              complaint={qrReceiptModalComplaint}
              language={language}
              speakText={speakText}
            />
          </div>
        </div>
      )}

      {/* CITIZEN FALSE RESOLUTION DISPUTE & ESCALATION MODAL */}
      {disputeModalOpen && selectedComplaintForDispute && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border-2 border-rose-500 p-6 rounded-3xl max-w-lg w-full relative space-y-4 shadow-2xl animate-fadeIn text-left font-outfit">
            
            <div className="flex items-center justify-between border-b border-rose-200 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-sm shadow">
                  🚨
                </div>
                <div>
                  <h3 className="text-base font-black font-cinzel text-rose-950">Dispute Resolution & Re-Open Ticket</h3>
                  <p className="text-[11px] text-rose-700 font-mono font-bold">Ticket #{selectedComplaintForDispute.id} • {selectedComplaintForDispute.category}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDisputeModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-rose-50 border border-rose-300 rounded-2xl space-y-1 text-xs text-rose-950">
              <p className="font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Anti-Fake-Resolution Governance Charter</span>
              </p>
              <p className="text-[11px] text-rose-800 leading-relaxed font-medium">
                Officer marked this issue as <em>"{selectedComplaintForDispute.resolutionNotes || 'Resolved'}"</em>. If work has NOT been completed on the ground, submitting this dispute will instantly <strong>Re-Open the ticket</strong>, reset the SLA timer to 12 Hours, and flag the case for <strong>Super Admin & Lokayukta Vigilance Audit</strong>.
              </p>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">
                Ground Reality / Why is the issue NOT resolved? <span className="text-rose-600">*</span>
              </label>
              <textarea
                rows="3"
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                placeholder="E.g., Officer reported pothole filled, but 1.5m crater is still open and flooding. No municipal vehicle arrived."
                className="w-full bg-slate-50 border border-slate-300 text-xs rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-rose-500 focus:outline-none placeholder:text-slate-400"
              ></textarea>
            </div>

            {/* Photo Proof Option */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <label className="block text-xs font-bold text-slate-700">Attach Live Photo Proof of Unfinished Work:</label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCameraOpen(true)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm"
                >
                  <Camera className="w-3.5 h-3.5 text-emerald-400" />
                  <span>📷 Snap Live Geotagged Evidence</span>
                </button>
                {selectedPhoto && (
                  <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Evidence Geotagged</span>
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setDisputeModalOpen(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={disputeSubmitting || !disputeReason.trim()}
                onClick={handleDisputeSubmit}
                className="flex-1 py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:opacity-95 disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-lg flex items-center justify-center space-x-1.5"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>{disputeSubmitting ? 'Submitting...' : '🚨 Re-Open & Escalate Issue'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* GLOBAL FLOATING AUDIO BAR */}
      <GlobalAudioPlayerBar />

    </div>
  );
}

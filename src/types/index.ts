export type DisasterType = 
  | 'earthquake' 
  | 'flood' 
  | 'landslide' 
  | 'fire' 
  | 'lightning' 
  | 'coldwave' 
  | 'glof';

export type ContactCategory = 
  | 'all' 
  | 'security' 
  | 'ambulance' 
  | 'disaster' 
  | 'helpline' 
  | 'hospital' 
  | 'bloodbank';

export type NepalProvince = 
  | 'all' 
  | 'koshi' 
  | 'madhesh' 
  | 'bagmati' 
  | 'gandaki' 
  | 'lumbini' 
  | 'karnali' 
  | 'sudurpashchim';

export interface EmergencyContact {
  id: string;
  name: string;
  nepaliName: string;
  number: string;
  nepaliNumber: string;
  category: ContactCategory;
  province?: NepalProvince;
  location?: string;
  description: string;
  nepaliDescription: string;
  isTollFree?: boolean;
  is24x7?: boolean;
}

export interface PersonalContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

export interface SafeZone {
  id: string;
  name: string;
  nepaliName: string;
  type: 'open_space' | 'hospital' | 'stadium' | 'helipad' | 'high_ground';
  applicableDisasters: DisasterType[];
  address: string;
  district: string;
  province: NepalProvince;
  distance: string;
  capacity: string;
  nepaliCapacity: string;
  facilities: string[];
  lat: number;
  lng: number;
  mapX: number; // for interactive SVG map
  mapY: number;
  description: string;
}

export interface ChecklistItem {
  id: string;
  category: 'kit' | 'home' | 'plan' | 'documents';
  title: string;
  nepaliTitle: string;
  detail: string;
  priority: 'critical' | 'essential' | 'recommended';
  done: boolean;
}

export interface AdvisoryAlert {
  id: string;
  title: string;
  nepaliTitle: string;
  severity: 'critical' | 'warning' | 'advisory';
  agency: string;
  timeAgo: string;
  region: string;
  summary: string;
  nepaliSummary: string;
  actionRequired: string;
}

export interface IncidentReport {
  id: string;
  hazardType: DisasterType;
  location: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  time: string;
  description: string;
  contactNumber?: string;
}

export interface FirstAidTopic {
  id: string;
  title: string;
  nepaliTitle: string;
  urgency: 'immediate' | 'urgent' | 'standard';
  summary: string;
  steps: { stepNumber: string; action: string; nepaliAction: string; note?: string }[];
  donts: string[];
  nepaliDonts: string[];
  hasMetronome?: boolean;
}

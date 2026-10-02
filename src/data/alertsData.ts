import { AdvisoryAlert, IncidentReport } from '../types';

export const OFFICIAL_ADVISORIES: AdvisoryAlert[] = [
  {
    id: 'adv-dhm-flood-01',
    title: 'Monsoon River Inundation Alert: Koshi & Narayani Basins',
    nepaliTitle: 'मनसुन बाढी सतर्कता: कोशी तथा नारायणी जलाधार क्षेत्र',
    severity: 'critical',
    agency: 'Dept of Hydrology & Meteorology (DHM)',
    timeAgo: '१२ मिनेट अघि',
    region: 'Koshi / Madhesh / Bagmati Lowlands',
    summary: 'Water level crossed Danger Mark at Chatara and Devghat telemetry stations. Flash floods likely in downstream floodplains.',
    nepaliSummary: 'चतरा र देवघाट जलमापन केन्द्रमा जलसतह खतराको तह पार गरेको छ। तल्लो तटीय क्षेत्रका बासिन्दा तत्काल सुरक्षित स्थानमा जानुहोस्।',
    actionRequired: 'Move livestock and vulnerable residents to designated embankment shelters. Dial 1155 for water level info.'
  },
  {
    id: 'adv-nsc-seismic-02',
    title: 'Seismic Telemetry Notice: Western Nepal Micro-Tremor Activity',
    nepaliTitle: 'भूकम्पीय सूचना: पश्चिम नेपाल पराकम्प अनुगमन',
    severity: 'advisory',
    agency: 'National Seismological Centre, Lainchaur',
    timeAgo: '४५ मिनेट अघि',
    region: 'Jajarkot / Rukum West / Bajhang',
    summary: 'Magnitude 4.2 ML micro-tremor recorded at 10km depth. No structural damage reported; localized aftershocks possible.',
    nepaliSummary: 'जाजरकोट र रुकुम पश्चिम केन्द्रबिन्दु भई ४.२ म्याग्निच्युडको धक्का महसुस। हालसम्म कुनै क्षतिको विवरण छैन; सामान्य सतर्क रहनुहोस्।',
    actionRequired: 'Keep Go-Bags near main exit door; review Drop, Cover, Hold positions with household members.'
  },
  {
    id: 'adv-traffic-highway-03',
    title: 'Highway Corridor Status: Narayanghat-Mugling & BP Highway',
    nepaliTitle: 'राजमार्ग सूचना: नारायणगढ-मुग्लिन तथा बिपी राजमार्ग',
    severity: 'warning',
    agency: 'Nepal Traffic Police / Dept of Roads',
    timeAgo: '२ घण्टा अघि',
    region: 'Chitwan / Dhading / Sindhuli',
    summary: 'Debris slide partially cleared at Tuin Khola and Kalikhola. One-way traffic operating under heavy police surveillance.',
    nepaliSummary: 'तुइन खोला र कालीखोलामा खसेको लेदो पन्छाएर एकतर्फी सवारी खुलाइएको छ। राति अनावश्यक यात्रा नगर्नुहोस्।',
    actionRequired: 'Avoid non-essential nighttime travel along river highway corridors. Check status via 103.'
  }
];

export const INITIAL_INCIDENT_REPORTS: IncidentReport[] = [
  {
    id: 'rep-01',
    hazardType: 'landslide',
    location: 'Prithvi Highway, near Jogimara (धादिङ)',
    severity: 'high',
    time: 'आज बिहान ०८:३०',
    description: 'Boulders fallen on uphill lane. Trucks halted. Local police clearing debris with backhoe loader.',
    contactNumber: '010-520199'
  },
  {
    id: 'rep-02',
    hazardType: 'flood',
    location: 'Balkhu river corridor, Kathmandu (बल्खु करिडोर)',
    severity: 'moderate',
    time: '१ घण्टा अघि',
    description: 'River water overflowing onto vegetable market access road. Shopkeepers shifting crates to upper floor.',
    contactNumber: '100'
  }
];

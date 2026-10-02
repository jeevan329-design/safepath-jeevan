import { DisasterType } from '../types';

export interface ProtocolStep {
  n: string;
  nepaliN: string;
  title: string;
  nepaliTitle: string;
  desc: string;
  nepaliDesc: string;
}

export interface EmergencyProtocol {
  id: DisasterType;
  title: string;
  nepaliTitle: string;
  code: string;
  accent: string;
  badgeBg: string;
  tag: string;
  nepaliTag: string;
  summary: string;
  nepaliSummary: string;
  now: ProtocolStep[];
  then: { en: string; ne: string }[];
  donts: { en: string; ne: string }[];
  nepalContextTip: { en: string; ne: string };
}

export const PROTOCOLS: Record<DisasterType, EmergencyProtocol> = {
  earthquake: {
    id: 'earthquake',
    title: 'EARTHQUAKE',
    nepaliTitle: 'भूकम्प',
    code: 'EQ-01',
    accent: '#FF2A00',
    badgeBg: 'bg-red-500/10 text-red-500 border-red-500/30',
    tag: 'Drop · Cover · Hold On',
    nepaliTag: 'निहुरिनुहोस् · ओत लाग्नुहोस् · समात्नुहोस्',
    summary: 'Strong tremors can strike without warning. Do not run outside while shaking continues.',
    nepaliSummary: 'कम्पन सुरु हुँदा नआत्तिनुहोस्। हल्लाइरहँदा बाहिर दौडने प्रयास नगर्नुहोस्।',
    now: [
      {
        n: '01',
        nepaliN: '०१',
        title: 'DROP onto your hands and knees',
        nepaliTitle: 'भुइँमा हात र घुँडा टेकेर निहुरिनुहोस्',
        desc: 'Drop down before violent shaking knocks you to the floor. Protect your abdomen and vital organs.',
        nepaliDesc: 'कम्पनले लडाउनु अगावै घुँडा टेकेर बस्नुहोस्। यसले तपाईंलाई सन्तुलन कायम राख्न मद्दत गर्दछ।'
      },
      {
        n: '02',
        nepaliN: '०२',
        title: 'COVER your head and neck',
        nepaliTitle: 'टाउको र घाँटीलाई सुरक्षित ओत दिनुहोस्',
        desc: 'Crawl under a sturdy desk or table. If no shelter is near, crawl next to an interior wall, away from glass, mirrors, and hanging objects.',
        nepaliDesc: 'मजबुत टेबल वा खाटमुनि छिर्नुहोस्। ओत नभए भित्री भित्ता नजिक बसेर हातले टाउको छोप्नुहोस्।'
      },
      {
        n: '03',
        nepaliN: '०३',
        title: 'HOLD ON until shaking completely stops',
        nepaliTitle: 'हल्लाउन छोडुन्जेल टेबललाई दह्रोसँग समात्नुहोस्',
        desc: 'Hold your shelter with one hand and stay with it if it shifts. Protect your head with your other forearm.',
        nepaliDesc: 'टेबलको खुट्टा एक हातले दह्रोसँग समात्नुहोस्, अर्को हातले टाउको जोगाउनुहोस्।'
      },
      {
        n: '04',
        nepaliN: '०४',
        title: 'If outdoors: Move to clear open ground',
        nepaliTitle: 'यदि बाहिर हुनुहुन्छ भने: खुला ठाउँमा जानुहोस्',
        desc: 'Move immediately away from tall brick walls, utility poles, hanging power wires, and narrow gullies.',
        nepaliDesc: 'इँटाका अग्ला पर्खाल, बिजुलीका पोल, तार र पुराना भवनहरूबाट टाढा खुला चौरमा जानुहोस्।'
      },
      {
        n: '05',
        nepaliN: '०५',
        title: 'Turn off Cooking Gas (LPG) & Main Switch',
        nepaliTitle: 'ग्यास सिलिन्डरको रेगुलेटर र मुख्य बिजुली बन्द गर्नुहोस्',
        desc: 'Post-earthquake fires cause massive damage. Shut off the gas cylinder regulator and circuit breaker before exiting.',
        nepaliDesc: 'भूकम्पपछि हुने आगलागीबाट बच्न ग्यासको रेगुलेटर तुरुन्त बन्द गरी मेन स्विच काट्नुहोस्।'
      }
    ],
    then: [
      { en: 'Expect severe aftershocks (पराकम्प). Drop, cover, and hold every time.', ne: 'कडा पराकम्प आउन सक्छ। हरेक पटक निहुरिएर ओत लाग्ने अभ्यास गर्नुहोस्।' },
      { en: 'Check family and neighbors for bleeding, fractures, or entrapment.', ne: 'परिवार तथा छिमेकीको अवस्था बुझी सामान्य प्राथमिक उपचार सुरु गर्नुहोस्।' },
      { en: 'Use SMS or data messaging instead of voice calls to keep phone networks open.', ne: 'फोन लाइन व्यस्त हुन नदिन भ्वाइस कलभन्दा एसएमएस (SMS) प्रयोग गर्नुहोस्।' },
      { en: 'Do not re-enter cracked masonry buildings until inspected by structural engineers.', ne: 'चर्केका वा कमजोर संरचनाभित्र सरकारी इन्जिनियरले निरीक्षण नगरेसम्म नपस्नुहोस्।' }
    ],
    donts: [
      { en: 'Do NOT stand in doorways; they are not stronger than tables in modern buildings.', ne: 'ढोकाको चौकोसमा नउभिनुहोस्; आधुनिक घरमा यो सुरक्षित हुँदैन।' },
      { en: 'Do NOT use elevators under any circumstances.', ne: 'कुनै पनि हालतमा लिफ्ट प्रयोग नगर्नुहोस्; सिँढीको प्रयोग गर्नुहोस्।' },
      { en: 'Do NOT ignite matches, lighters, or light switches if you smell gas.', ne: 'ग्यास लिक भएको शंका लागेमा सलाई, लाइटर वा बिजुलीको स्विच नबाल्नुहोस्।' }
    ],
    nepalContextTip: {
      en: 'In Nepal traditional stone/mud mortar houses, immediately exit to an open field if you are on the ground floor near the door. Otherwise shelter under heavy wood.',
      ne: 'नेपालका परम्परागत ढुङ्गा-माटोका घरहरूमा भुइँतलामा ढोका नजिक हुनुहुन्छ भने तत्काल खुला चौरमा निस्कनुहोस्।'
    }
  },
  flood: {
    id: 'flood',
    title: 'FLOOD & INUNDATION',
    nepaliTitle: 'बाढी तथा डुबान',
    code: 'FL-02',
    accent: '#00E8FF',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    tag: 'Turn Around · Don’t Drown',
    nepaliTag: 'उच्च स्थानमा जानुहोस् · बाढीमा नपस्नुहोस्',
    summary: 'Rivers in Nepal rise rapidly during heavy monsoon downpours. Never cross raging torrents.',
    nepaliSummary: 'मनसुनको समयमा पहाडी खोला तथा तराईका नदीमा आकस्मिक बाढी आउँछ। बगेको पानीमा कहिल्यै नपस्नुहोस्।',
    now: [
      {
        n: '01',
        nepaliN: '०१',
        title: 'Evacuate immediately to designated high ground',
        nepaliTitle: 'तत्काल अग्लो सुरक्षित स्थान वा आश्रयस्थलमा जानुहोस्',
        desc: 'Do not delay to pack bulky possessions. Grab your 72-hour Go-Bag, vital IDs, and pets.',
        nepaliDesc: 'सामान पोको पार्न समय खेर नफाल्नुहोस्। आपतकालीन झोला र कागजात बोकेर उच्च स्थानतर्फ लाग्नुहोस्।'
      },
      {
        n: '02',
        nepaliN: '०२',
        title: 'Never walk or wade through moving water',
        nepaliTitle: 'बगिरहेको बाढीको पानीमा हिँड्ने प्रयास नगर्नुहोस्',
        desc: 'Just 15 cm (6 inches) of rapid water can sweep a full-grown adult off their feet. Hidden manholes and live cables are fatal.',
        nepaliDesc: 'मात्र १५ सेन्टिमिटर बगेको पानीले पनि मानिसलाई बगाउन सक्छ। खुला ढल र करेन्टको ठूलो जोखिम हुन्छ।'
      },
      {
        n: '03',
        nepaliN: '०३',
        title: 'Never drive a motorcycle or vehicle into flooded roads',
        nepaliTitle: 'सवारी साधन वा मोटरसाइकल डुबेको सडकमा नगुडाउनुहोस्',
        desc: '30 cm of water will float most passenger cars. Engine will stall and you will be swept into rivers.',
        nepaliDesc: 'पानी जमेको सडकमा गाडी नछिराउनुहोस्। इन्जिन बन्द भई गाडी बग्ने खतरा रहन्छ।'
      },
      {
        n: '04',
        nepaliN: '०४',
        title: 'Disconnect electrical breakers before water reaches sockets',
        nepaliTitle: 'पानी छिर्नु अगावै घरको मेन स्विच बन्द गर्नुहोस्',
        desc: 'If dry and safe, cut power at the main box. Never touch electrical boxes while standing in water.',
        nepaliDesc: 'सुक्खा ठाउँमा बसेर मेन स्विच काट्नुहोस्। भिजेको हात वा पानीमा उभिएर बिजुली नछुनुहोस्।'
      }
    ],
    then: [
      { en: 'Boil or chlorinate all drinking water (पियुस / WaterGuard); floodwaters harbor cholera and typhoid.', ne: 'बाढीपछि पानी उमालेर वा पियुष/क्लोरीन हालेर मात्र पिउनुहोस्; हैजा र झाडापखाला फैलिन सक्छ।' },
      { en: 'Call Department of Hydrology & Meteorology (DHM) toll-free 1155 for river water level alerts.', ne: 'नदीको बहाव थाहा पाउन जल तथा मौसम विज्ञान विभागको ११५५ मा निःशुल्क सम्पर्क गर्नुहोस्।' },
      { en: 'Watch out for snakes seeking dry shelters in houses and roofs.', ne: 'बाढीपछि सुक्खा ठाउँ खोज्दै घर वा छानामा सर्प आउन सक्छ, सतर्क रहनुहोस्।' }
    ],
    donts: [
      { en: 'Do NOT allow children to swim or play in flood retention pools.', ne: 'बालबालिकालाई बाढीको पानीमा पौडी खेल्न वा खेल्न नदिनुहोस्।' },
      { en: 'Do NOT consume fresh vegetables or food exposed to flood water.', ne: 'बाढीको पानीले छोएको खाना, तरकारी वा फलफूल नखानुहोस्।' }
    ],
    nepalContextTip: {
      en: 'In Terai and river basins (Koshy, Narayani, Karnali, Bagmati), monitor the official 1155 river sirens and village loudspeaker alerts.',
      ne: 'तराई तथा नदी तटीय क्षेत्रमा बाढी साइरन तथा माइकिङ सुन्नासाथ सुरक्षित सामुदायिक भवन वा बाँधमा जानुहोस्।'
    }
  },
  landslide: {
    id: 'landslide',
    title: 'LANDSLIDE & DEBRIS FLOW',
    nepaliTitle: 'पहिरो तथा गेग्रान बहाव',
    code: 'LS-03',
    accent: '#E8FF00',
    badgeBg: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30',
    tag: 'Move Sideways · Avoid Gullies',
    nepaliTag: 'छड्के भाग्नुहोस् · खोल्साबाट टाढा रहनुहोस्',
    summary: 'Saturated Himalayan slopes trigger sudden debris flows during monsoon. Watch for new ground cracks.',
    nepaliSummary: 'पहाडी भिरालो जमिनमा पानी धेरै परेपछि अकस्मात पहिरो खस्छ। जमिन फाटेको वा रुख ढल्किएको ख्याल गर्नुहोस्।',
    now: [
      {
        n: '01',
        nepaliN: '०१',
        title: 'Listen for unusual sounds: cracking trees & rumbling boulders',
        nepaliTitle: 'रुख भाँचिएको आवाज वा गड्याङगुडुङ सुन्नासाथ सतर्क हुनुहोस्',
        desc: 'A faint rumble that intensifies or sudden muddy creek water indicates an active slide upstream.',
        nepaliDesc: 'खोलामा एक्कासी पानी धमिलो हुनु वा माथिबाट ढुङ्गा खसेको आवाज पहिरोको प्रमुख पूर्वसंकेत हो।'
      },
      {
        n: '02',
        nepaliN: '०२',
        title: 'Run PERPENDICULAR (sideways) to the slide path',
        nepaliTitle: 'पहिरो बगेको दिशातर्फ नभई दायाँ-बायाँ (छड्के) भाग्नुहोस्',
        desc: 'Never try to outrun a debris flow downhill. Move sideways to stable ridge lines immediately.',
        nepaliDesc: 'पहिरोको सोझो तलतिर कहिल्यै नदौडिनुहोस्; जमिनको दायाँ वा बायाँतर्फ उक्लिएर सुरक्षित हुनुहोस्।'
      },
      {
        n: '03',
        nepaliN: '०३',
        title: 'Avoid low-lying stream beds and drainage ravines',
        nepaliTitle: 'खोल्सा, खोँच र पानीको प्राकृतिक निकास क्षेत्र छाड्नुहोस्',
        desc: 'Debris flows funnel through narrow valleys at speeds exceeding 40 km/h, carrying giant boulders.',
        nepaliDesc: 'पहिरोको लेदो र ढुङ्गा खोल्सा हुँदै तीव्र गतिमा बग्छ, तसर्थ खोँचमा नबस्नुहोस्।'
      }
    ],
    then: [
      { en: 'Report blocked highway corridors (Narayanghat-Mugling, BP Highway, Araniko) to Traffic Police at 103.', ne: 'राजमार्गमा पहिरो खसेमा ट्राफिक प्रहरी १०३ मा तत्काल खबर गर्नुहोस्।' },
      { en: 'Stay alert for secondary collapses; the first slide destabilizes neighboring slopes.', ne: 'पहिलो पहिरोले वरपरको माटो खुकुलो बनाउने हुँदा दोस्रो पहिरो आउन सक्छ।' }
    ],
    donts: [
      { en: 'Do NOT cross freshly cracked road surfaces on foot or on motorbike.', ne: 'धाँजा फाटेको सडक वा जमिनमाथि हिँड्ने वा गाडी कुदाउने प्रयास नगर्नुहोस्।' },
      { en: 'Do NOT return to retrieve cattle or belongings during ongoing downpour.', ne: 'मुसलधारे पानी परिरहेको बेला वस्तुभाउ वा सामान लिन घर नफर्कनुहोस्।' }
    ],
    nepalContextTip: {
      en: 'If a hillside dam creates an artificial lake (ताल थुनिनु), evacuate downstream communities immediately before catastrophic dam-break surge.',
      ne: 'पहिरोले खोला थुनेर ताल बनेमा तल्लो तटीय क्षेत्रका बासिन्दाले तुरुन्तै माथिल्लो भेगमा सुरक्षित स्थानान्तरण हुनुपर्दछ।'
    }
  },
  fire: {
    id: 'fire',
    title: 'FIRE & SMOKE INHALATION',
    nepaliTitle: 'आगलागी तथा डढेलो',
    code: 'FI-04',
    accent: '#FF5A00',
    badgeBg: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    tag: 'Get Out · Stay Low · Call 101',
    nepaliTag: 'बाहिर निस्कनुहोस् · निहुरिएर घस्रनुहोस् · १०१ मा फोन गर्नुहोस्',
    summary: 'Smoke is deadlier than flames. Crawl low beneath toxic gases and never re-enter a burning building.',
    nepaliSummary: 'आगोभन्दा पनि धुवाँ र विषाक्त ग्यास बढी घातक हुन्छ। निहुरिएर बाहिर निस्कनुहोस्।',
    now: [
      {
        n: '01',
        nepaliN: '०१',
        title: 'Crawl low under smoke towards the nearest exit',
        nepaliTitle: 'धुवाँमुनि भुइँमा निहुरिएर घस्रिँदै निकासतर्फ जानुहोस्',
        desc: 'Clean air remains near the floor (10-30 cm). Cover your nose and mouth with a damp cloth if available.',
        nepaliDesc: 'स्वच्छ हावा भुइँ नजिक हुन्छ। सकेसम्म भिजेको कपडाले नाक-मुख छोपेर घस्रनुहोस्।'
      },
      {
        n: '02',
        nepaliN: '०२',
        title: 'Feel door surfaces with back of hand before opening',
        nepaliTitle: 'ढोका खोल्नुअघि हातको पछाडिको भागले ढोका तातो छ कि छाम्नुहोस्',
        desc: 'If the door or knob is warm, flames are on the other side. Use an alternative window or secondary exit.',
        nepaliDesc: 'यदि ढोका तातो छ भने पछाडि आगो छ भन्ने बुझ्नुपर्छ; अर्को ढोका वा झ्याल प्रयोग गर्नुहोस्।'
      },
      {
        n: '03',
        nepaliN: '०३',
        title: 'If clothing catches fire: STOP, DROP, and ROLL',
        nepaliTitle: 'यदि लुगामा आगो लागेमा: रोकिनुहोस्, भुइँमा लड्नुहोस् र पल्टिनुहोस्',
        desc: 'Do not run. Cover your face with your hands and roll over back and forth until the flames are smothered.',
        nepaliDesc: 'दौडिनु हुँदैन; भुइँमा पल्टिएर यताउति गुडुल्किँदै आगो निभाउनुहोस्।'
      },
      {
        n: '04',
        nepaliN: '०४',
        title: 'Call Fire Brigade at 101 or 100',
        nepaliTitle: 'दमकल १०१ वा प्रहरी १०० मा तुरुन्त सम्पर्क गर्नुहोस्',
        desc: 'State your exact location, landmarks, and whether individuals are trapped inside.',
        nepaliDesc: 'आफ्नो स्पष्ट ठेगाना, चिनिने ठाउँ र भित्र कोही फसेको भए जानकारी गराउनुहोस्।'
      }
    ],
    then: [
      { en: 'Once outside, NEVER re-enter a burning structure for documents, wallets, or pets.', ne: 'एकपटक बाहिर निस्किएपछि सामान वा घरपालुवा जनावर लिन कहिल्यै भित्र नपस्नुहोस्।' },
      { en: 'Cool thermal burns with clean, cool running water for 15-20 minutes; do not use ice or ghee/toothpaste.', ne: 'डढेको भागमा १५-२० मिनेट चिसो पानी खन्याउनुहोस्; घिउ, मसी वा टुथपेस्ट नलगाउनुहोस्।' }
    ],
    donts: [
      { en: 'Do NOT use water on electrical or oil/grease cooking pan fires; smother with lid or damp towel.', ne: 'बिजुली वा तातो तेलको आगोमा पानी नहाल्नुहोस्; बाक्लो कपडा वा ढक्कनले छोप्नुहोस्।' },
      { en: 'Do NOT take the elevator in multi-story apartments.', ne: 'अपार्टमेन्ट वा अग्ला भवनमा लिफ्ट प्रयोग नगर्नुहोस्।' }
    ],
    nepalContextTip: {
      en: 'In dry spring months (Chaitra/Baisakh), rural forest fires (डढेलो) quickly spread into villages. Clear dry pine needles 10 meters around homes.',
      ne: 'सुक्खा मौसममा वनको डढेलो गाउँ पस्न सक्ने हुँदा घर वरपरका सुकेका पात-पतिङ्गर हटाई अग्निरेखा बनाउनुहोस्।'
    }
  },
  lightning: {
    id: 'lightning',
    title: 'LIGHTNING & THUNDERSTORM',
    nepaliTitle: 'चट्याङ तथा हावाहुरी',
    code: 'LT-05',
    accent: '#A855F7',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    tag: 'When Thunder Roars · Go Indoors',
    nepaliTag: 'गड्याङगुडुङ सुन्नासाथ · पक्की घरभित्र बस्नुहोस्',
    summary: 'Nepal records hundreds of lightning strikes annually. Take shelter in fully enclosed buildings.',
    nepaliSummary: 'नेपालमा चट्याङबाट वर्षेनी धेरैको ज्यान जान्छ। गड्याङगुडुङ गर्दा खुला ठाउँमा कहिल्यै नबस्नुहोस्।',
    now: [
      {
        n: '01',
        nepaliN: '०१',
        title: 'Seek shelter inside a substantial, grounded building',
        nepaliTitle: 'तुरुन्तै पक्की घर वा छाना भएको सुरक्षित कोठाभित्र पस्नुहोस्',
        desc: 'Avoid open tin sheds, bus waiting stops, and thatched farm huts which attract ground current.',
        nepaliDesc: 'खुला टहरा वा छाप्रो चट्याङबाट सुरक्षित हुँदैनन्; पक्की घरभित्र आश्रय लिनुहोस्।'
      },
      {
        n: '02',
        nepaliN: '०२',
        title: 'Stay away from tall isolated trees and metal poles',
        nepaliTitle: 'अग्ला रुख, धातुका पोल तथा तारबारबाट टाढा रहनुहोस्',
        desc: 'Lightning targets the tallest object in an open area. The side-flash will jump to anyone standing nearby.',
        nepaliDesc: 'खुला चौरको एक्लो रुखमुनि ओत नलाग्नुहोस्; चट्याङ रुखमा खसेर छेउमा रहेकालाई हान्न सक्छ।'
      },
      {
        n: '03',
        nepaliN: '०३',
        title: 'Assume Lightning Safety Crouch if trapped in the open',
        nepaliTitle: 'खुला ठाउँमा फसेमा: खुट्टा जोडेर टुक्रुक्क बस्नुहोस्',
        desc: 'Squat low on the balls of your feet, tuck head between knees, cover ears. Minimize contact with ground; NEVER lie flat.',
        nepaliDesc: 'भुइँमा पल्टिनु हुँदैन; खुट्टाका पन्जा मात्र भुइँमा टेकेर टाउको निहुराई टुक्रुक्क बस्नुहोस्।'
      }
    ],
    then: [
      { en: 'Unplug sensitive electronics and avoid using corded landline phones during lightning.', ne: 'चट्याङ पर्दा टेलिभिजन, फ्रिज आदि विद्युतीय उपकरणको प्लग निकाल्नुहोस्।' },
      { en: 'Lightning strike victims do NOT carry an electrical charge; administer CPR immediately if unresponsive.', ne: 'चट्याङ लागेका व्यक्तिमा करेन्ट बाँकी रहँदैन; तुरुन्त छाती थिचेर (CPR) उपचार गर्नुहोस्।' }
    ],
    donts: [
      { en: 'Do NOT use metal umbrellas or hold farming sickles/khukuri in open fields.', ne: 'खुला खेतमा धातुको डन्डी भएको छाता नओढ्नुहोस् वा हँसिया/खुकुरी नबोक्नुहोस्।' },
      { en: 'Do NOT bathe or touch running tap water during an active thunderstorm.', ne: 'चट्याङ परिरहेको बेला नुहाउने वा धाराको पानी चलाउने नगर्नुहोस्।' }
    ],
    nepalContextTip: {
      en: 'Install proper grounding (अर्थिङ) and copper arrestors on roofs in lightning-prone districts like Makwanpur, Jhapa, Dang, and Morang.',
      ne: 'मकवानपुर, झापा, दाङ लगायतका बढी चट्याङ जोखिम भएका जिल्लामा घरको छतमा लाइटनिङ एरेस्टर र अर्थिङ अनिवार्य गर्नुहोस्।'
    }
  },
  coldwave: {
    id: 'coldwave',
    title: 'COLD WAVE & WINTER FOG',
    nepaliTitle: 'शीतलहर तथा अत्यधिक चिसो',
    code: 'CW-06',
    accent: '#38BDF8',
    badgeBg: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    tag: 'Layer Warmth · Ventilate Fires',
    nepaliTag: 'न्यानो कपडा लगाउनुहोस् · कोठाको भेन्टिलेसन खुला राख्नुहोस्',
    summary: 'Dense winter fog in the Terai causes hypothermia and carbon monoxide poisoning from closed coal stoves.',
    nepaliSummary: 'तराईमा चल्ने शीतलहर र बाक्लो हुस्सुबाट बच्न कोठामा आगो ताप्दा धुवाँको निकास खुला राख्नुहोस्।',
    now: [
      {
        n: '01',
        nepaliN: '०१',
        title: 'Dress in multiple loose, warm layers',
        nepaliTitle: 'पातला तर धेरै तहका न्यानो कपडाहरू लगाउनुहोस्',
        desc: 'Trapped air between layers provides superior thermal insulation. Keep head, hands, and feet dry.',
        nepaliDesc: 'टाउको, कान, हात र खुट्टा राम्रोसँग छोप्नुहोस् किनभने शरीरको धेरै ताप यहाँबाट खेर जान्छ।'
      },
      {
        n: '02',
        nepaliN: '०२',
        title: 'NEVER sleep with an unventilated coal or wood stove (मकल / कोइला)',
        nepaliTitle: 'कोठा बन्द गरेर कोइला वा मकल बाली कहिल्यै नसुत्नुहोस्',
        desc: 'Carbon monoxide is odorless, invisible, and lethal. Always leave windows cracked for fresh oxygen.',
        nepaliDesc: 'झ्याल-ढोका पुरै थुनेर मकल बाल्दा कार्बन मोनोअक्साइड विषाक्त ग्यासले निदाएकै अवस्थामा मृत्यु हुन सक्छ।'
      },
      {
        n: '03',
        nepaliN: '०३',
        title: 'Protect vulnerable infants and elderly from hypothermia',
        nepaliTitle: 'नवजात शिशु र ज्येष्ठ नागरिकलाई चिसोबाट विशेष सुरक्षा दिनुहोस्',
        desc: 'Provide warm boiled fluids, high-calorie soups, and keep them elevated above damp cold floors.',
        nepaliDesc: 'तातो झोलिलो खाना खुवाउनुहोस् र चिसो भुइँबाट अलि माथि सुताउनुहोस्।'
      }
    ],
    then: [
      { en: 'Recognize early hypothermia: violent shivering, slurred speech, clumsy fingers, apathy.', ne: 'अत्यधिक काम्नु, बोली लरबराउनु र चेतना हराउनु हाइपोथर्मियाका लक्षण हुन्।' },
      { en: 'Warm the center of the body first (chest, neck, groin) with warm blankets, not boiling water directly.', ne: 'बिरामीलाई बिस्तारै न्यानो कम्बलले ढाक्नुहोस्; एक्कासी तातो पानीमा नडुबाउनुहोस्।' }
    ],
    donts: [
      { en: 'Do NOT give alcoholic beverages; alcohol dilates blood vessels and accelerates internal heat loss.', ne: 'चिसो भगाउने नाममा मदिरा सेवन नगर्नुहोस्; यसले भित्री तापक्रम झनै घटाउँछ।' },
      { en: 'Do NOT rub frostbitten skin vigorously.', ne: 'चिसोले कक्रिएको वा सेतो भएको छालालाई बेसरी नमल्नुहोस्।' }
    ],
    nepalContextTip: {
      en: 'Terai municipalities set up public bonfires (दाउरा वितरण) at major chowks. Check local ward offices for firewood support.',
      ne: 'तराईका विभिन्न चोकहरूमा स्थानीय तहले दाउरा वितरण गर्दछन्; वडा कार्यालयको सूचनामा ध्यान दिनुहोस्।'
    }
  },
  glof: {
    id: 'glof',
    title: 'GLACIAL LAKE OUTBURST FLOOD (GLOF)',
    nepaliTitle: 'हिमताल विस्फोट (GLOF)',
    code: 'GL-07',
    accent: '#2DD4BF',
    badgeBg: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
    tag: 'Climb 50m Above Valley Floor',
    nepaliTag: 'नदी किनारभन्दा कम्तिमा ५० मिटर माथि उक्लिनुहोस्',
    summary: 'Sudden collapse of natural moraine dams in high Himalayas unleashes catastrophic flash surges downstream.',
    nepaliSummary: 'उच्च हिमाली भेगका हिमताल फुट्दा तल्लो तटीय उपत्यकामा केही मिनेटमै विनाशकारी बाढी आउँछ।',
    now: [
      {
        n: '01',
        nepaliN: '०१',
        title: 'Immediately move to high valley flanks above 50 meters',
        nepaliTitle: 'नदीको पिँधबाट कम्तिमा ५० मिटर अग्लो डाँडातर्फ उक्लिनुहोस्',
        desc: 'GLOF surge waves can reach heights of 10 to 30 meters. Do not stay on suspension bridges or riverbanks.',
        nepaliDesc: 'हिमताल फुटेको बाढी १० देखि ३० मिटर अग्लो छालसहित आउन सक्छ; झोलुङ्गे पुल र नदी किनार तत्काल छाड्नुहोस्।'
      },
      {
        n: '02',
        nepaliN: '०२',
        title: 'Pay attention to siren towers and early warning radio',
        nepaliTitle: 'पूर्वसूचना साइरन तथा रेडियो सतर्कता ध्यानपूर्वक सुन्नुहोस्',
        desc: 'Automated sensor stations (e.g. Imja Lake, Tsho Rolpa) trigger valley sirens when water rushes out.',
        nepaliDesc: 'छो रोल्पा, इम्जा लगायतका तालहरूमा जडान गरिएका स्वचालित साइरन बज्नासाथ उच्च स्थानतर्फ लाग्नुहोस्।'
      },
      {
        n: '03',
        nepaliN: '०३',
        title: 'Warn downstream trekking trails and settlements',
        nepaliTitle: 'तल्लो भेगका पदयात्री तथा गाउँलेलाई तुरुन्त खबर गर्नुहोस्',
        desc: 'Send mobile warnings or sound local horns. Flood takes 30-90 minutes to travel 30 kilometers downriver.',
        nepaliDesc: 'तल्लो क्षेत्रका बस्तीमा फोन वा शंख/घण्टी बजाएर तुरुन्त सूचना पठाउनुहोस्।'
      }
    ],
    then: [
      { en: 'Stay on high ground for at least 12 hours; secondary debris dam bursts frequently follow.', ne: 'कम्तिमा १२ घण्टासम्म माथिल्लो भेगमै बस्नुहोस्; थुनिएका सहायक तालहरू पुनः फुट्न सक्छन्।' },
      { en: 'Avoid unstable river terraces carved away by the torrent.', ne: 'बाढीले कटान गरेका कमजोर नदी किनारका डिलहरूमा नजानुहोस्।' }
    ],
    donts: [
      { en: 'Do NOT try to cross suspension bridges while the flood surge is passing.', ne: 'बाढी उर्लिएको बेला झोलुङ्गे पुल तर्ने दुस्साहस नगर्नुहोस्।' },
      { en: 'Do NOT stop to take photos or videos near the river channel.', ne: 'नदी छेउमा गएर भिडियो खिच्ने वा फोटो खिच्ने काम नगर्नुहोस्।' }
    ],
    nepalContextTip: {
      en: 'Major vulnerable valleys include Bhotekoshi, Dudhkoshi, Tamakoshi, Marshyangdi, and Trishuli river corridors.',
      ne: 'भोटेकोशी, दुधकोशी, तामाकोशी, मर्स्याङ्दी तथा त्रिशूली करिडोरमा हिमताल विस्फोटको जोखिम उच्च मानिन्छ।'
    }
  }
};

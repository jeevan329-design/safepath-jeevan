import { FirstAidTopic } from '../types';

export const FIRST_AID_TOPICS: FirstAidTopic[] = [
  {
    id: 'cpr-resuscitation',
    title: 'Hands-Only CPR (Cardiac Arrest)',
    nepaliTitle: 'सिपिएर (CPR) — मुटु तथा श्वासप्रश्वास ब्युँझाउने विधि',
    urgency: 'immediate',
    summary: 'If an adult collapses, is unresponsive, and is not breathing normally, start chest compressions immediately.',
    steps: [
      {
        stepNumber: '01',
        action: 'Check responsiveness & shout for help',
        nepaliAction: 'काँधमा हलुका थप्थपाएर होस छ कि छैन हेर्नुहोस् र तुरुन्त १०२ मा फोन गर्न अरूलाई भन्नुहोस्।'
      },
      {
        stepNumber: '02',
        action: 'Position hands in center of chest',
        nepaliAction: 'दुई हातलाई एकमाथि अर्को गरी छातीको बीच भाग (स्तनको बीचमा) राख्नुहोस् र कुहिना सिधा गर्नुहोस्।'
      },
      {
        stepNumber: '03',
        action: 'Push hard and fast: 100–120 compressions per minute',
        nepaliAction: 'प्रतिमिनेट १०० देखि १२० पटकको गतिमा कम्तिमा ५ सेन्टिमिटर (२ इन्च) गहिराइसम्म निरन्तर थिच्नुहोस्।'
      },
      {
        stepNumber: '04',
        action: 'Allow full chest recoil after every push',
        nepaliAction: 'प्रत्येक पटक थिचेपछि छातीलाई पुरै माथि आउन दिनुहोस्; हात छातीबाट नउठाउनुहोस्।'
      }
    ],
    donts: [
      'Do NOT stop compressions for more than 10 seconds until medical help arrives.',
      'Do NOT waste time giving rescue breaths if untrained; continuous chest compressions save lives.'
    ],
    nepaliDonts: [
      'एम्बुलेन्स नआउञ्जेल वा बिरामी नब्युँझिएसम्म १० सेकेन्डभन्दा बढी छाती थिच्न नरोक्नुहोस्।',
      'तालिम नभए मुखबाट श्वास दिन समय खेर नफाल्नुहोस्; निरन्तर छाती थिच्नु नै सबैभन्दा प्रभावकारी हुन्छ।'
    ],
    hasMetronome: true,
  },
  {
    id: 'snakebite',
    title: 'Snakebite Protocol (Anti-Venom Protocol)',
    nepaliTitle: 'सर्पदंश (सर्पले टोकेमा) तत्काल अपनाउनुपर्ने नियम',
    urgency: 'immediate',
    summary: 'In Nepal Terai & hills, venomous kraits and cobras strike at night. Rapid calm transport saves lives.',
    steps: [
      {
        stepNumber: '01',
        action: 'Keep victim completely still and calm',
        nepaliAction: 'बिरामीलाई हिँड्डुल गर्न नदिनुहोस्; शान्त राख्नुहोस् ताकि मुटुको धड्कन बढेर विष छिटो नफैलियोस्।'
      },
      {
        stepNumber: '02',
        action: 'Immobilize bitten limb with a splint',
        nepaliAction: 'टोकेको खुट्टा वा हातलाई नहल्लिने गरी दाउरा वा बाँसको कप्टेराले बाँधेर सिधा राख्नुहोस्।'
      },
      {
        stepNumber: '03',
        action: 'Remove tight rings, bangles, and watches',
        nepaliAction: 'टोकेको अंग सुन्निने हुँदा औंठी, बाला, घडी र कसिलो कपडा तुरुन्त फुकाल्नुहोस्।'
      },
      {
        stepNumber: '04',
        action: 'Rush to nearest Snakebite Treatment Centre (एन्टी-स्नेक भेनम भएको अस्पताल)',
        nepaliAction: 'मोटरसाइकलमा बीचमा राखी वा एम्बुलेन्समा तुरुन्त सर्पदंश उपचार केन्द्र पुर्‍याउनुहोस्।'
      }
    ],
    donts: [
      'NEVER cut the bite wound with blades or try to suck venom out with mouth.',
      'NEVER tie a tight arterial tourniquet (tight cord/rubber) — it causes gangrene and limb amputation.',
      'NEVER apply cow dung, kerosene, chilies, or visit quack faith healers (धामी-झाँक्री).'
    ],
    nepaliDonts: [
      'घाउलाई ब्लेडले चिर्ने वा मुखले विष चुस्ने गल्ती कहिल्यै नगर्नुहोस्।',
      'डोरी वा रबरले रक्तसञ्चार नै रोकिने गरी कडा बाँध्नु हुँदैन; यसले अंग कुहिएर काट्नुपर्ने हुन्छ।',
      'गोबर, मट्टितेल, खुर्सानी नलगाउनुहोस् र धामी-झाँक्रीमा समय खेर फाली अस्पताल जान ढिला नगर्नुहोस्।'
    ]
  },
  {
    id: 'severe-bleeding',
    title: 'Severe Bleeding & Hemorrhage Control',
    nepaliTitle: 'अत्यधिक रक्तस्राव रोक्ने प्राथमिक उपाय',
    urgency: 'immediate',
    summary: 'Direct firm pressure is the gold standard for stopping massive blood loss from glass, debris, or cuts.',
    steps: [
      {
        stepNumber: '01',
        action: 'Apply firm, continuous direct pressure with clean cloth',
        nepaliAction: 'सफा कपडा, गज वा रुमालले रगत बगेको ठाउँमा हातले बलियोसँग थिच्नुहोस्।'
      },
      {
        stepNumber: '02',
        action: 'Do not remove blood-soaked pads; layer more on top',
        nepaliAction: 'कपडा रगतले भिजे पनि त्यसलाई ननिकाल्नुहोस्; माथिबाट अर्को कपडा थपेर थिचिरहनुहोस्।'
      },
      {
        stepNumber: '03',
        action: 'Elevate wound above heart level if no broken bone',
        nepaliAction: 'हड्डी नभाँचिएको भए रगत बगेको हात वा खुट्टालाई मुटुको सतहभन्दा माथि उठाउनुहोस्।'
      },
      {
        stepNumber: '04',
        action: 'Bandage firmly and keep patient warm with a blanket',
        nepaliAction: 'दह्रोसँग पट्टी बाँध्नुहोस् र रगत खेर गई बिरामी बेहोस (Shock) हुन नदिन न्यानो बनाउनुहोस्।'
      }
    ],
    donts: [
      'Do NOT pull out deeply embedded glass shards or metal rods; pack cloth around the object to stabilize it.',
      'Do NOT loosen pressure to repeatedly inspect the wound.'
    ],
    nepaliDonts: [
      'शरीरमा गहिरो गरी भासिएको सिसा, रड वा ढुङ्गा नतान्नुहोस्; त्यसको वरिपरि कपडाले आड दिनुहोस्।',
      'रगत रोकियो कि भनेर बारम्बार कपडा उप्काएर नहेर्नुहोस्।'
    ]
  },
  {
    id: 'burns',
    title: 'Thermal Burns & Scalds',
    nepaliTitle: 'आगो वा तातो पानीले पोलेको/डढेको उपचार',
    urgency: 'urgent',
    summary: 'Cooling the burn with clean tap water within the first 20 minutes dramatically reduces tissue damage.',
    steps: [
      {
        stepNumber: '01',
        action: 'Cool burn under gentle cool running water for 20 minutes',
        nepaliAction: 'पोलेको ठाउँमा कम्तिमा १५ देखि २० मिनेटसम्म सफा चिसो पानीको धारामा राख्नुहोस्।'
      },
      {
        stepNumber: '02',
        action: 'Cover loosely with clean non-stick film or dry cotton cloth',
        nepaliAction: 'सफा पातलो सुती कपडा वा प्लास्टिक र्‍यापले हावा नछिर्ने गरी हल्का छोप्नुहोस्।'
      },
      {
        stepNumber: '03',
        action: 'Give oral rehydration fluid (Jeevan Jal) if patient is conscious',
        nepaliAction: 'होस भएको अवस्थामा जीवनजल वा सफा पानी प्रशस्त पिउन दिनुहोस्।'
      }
    ],
    donts: [
      'Do NOT use ice, freezing ice water, ghee, butter, raw eggs, or blue ink.',
      'Do NOT burst intact blisters (पानीका फोका नफुटाउनुहोस्) as they shield against infection.'
    ],
    nepaliDonts: [
      'बरफ, घिउ, टुथपेस्ट, नीलो मसी वा काँचो अण्डा पोलेको घाउमा कहिल्यै नलगाउनुहोस्।',
      'छालामा उठेका पानीका फोकाहरू नफुटाउनुहोस्, यसले ब्याक्टेरिया संक्रमण गराउँछ।'
    ]
  },
  {
    id: 'altitude-sickness',
    title: 'Acute Mountain Sickness (AMS / लेक लाग्ने)',
    nepaliTitle: 'उच्च हिमाली लेक लाग्ने (AMS) — रोकथाम र उपचार',
    urgency: 'urgent',
    summary: 'Above 2,500m (8,200ft), thin oxygen causes severe headache, nausea, and pulmonary/cerebral edema.',
    steps: [
      {
        stepNumber: '01',
        action: 'STOP ascending immediately; never go higher with symptoms',
        nepaliAction: 'टाउको दुख्ने, वाकवाकी लाग्ने र रिँगटा चल्नासाथ उकालो चढ्न तत्काल बन्द गर्नुहोस्।'
      },
      {
        stepNumber: '02',
        action: 'DESCEND 500 to 1,000 meters if symptoms worsen',
        nepaliAction: 'अवस्था बिग्रिएमा तुरुन्त ५०० देखि १,००० मिटर तल झर्नुहोस्; तल ओर्लनु नै सबैभन्दा उत्तम ओखती हो।'
      },
      {
        stepNumber: '03',
        action: 'Administer emergency oxygen if available; keep hydrated with warm tea and soup',
        nepaliAction: 'उपलब्ध भए अक्सिजन दिनुहोस् र प्रशस्त तातो लसुनको झोल, चिया वा पानी खुवाउनुहोस्।'
      }
    ],
    donts: [
      'NEVER leave an altitude sickness patient alone; confusion can cause fatal falls.',
      'Do NOT disguise severe symptoms with sleeping pills.'
    ],
    nepaliDonts: [
      'लेक लागेको बिरामीलाई एक्लै नछाड्नुहोस्; होस गुमाउन सक्ने खतरा रहन्छ।',
      'निद्रा लागेन भन्दै निद्राको औषधि नदिनुहोस्; यसले श्वासप्रश्वास अझ घटाउँछ।'
    ]
  }
];

/**
 * mockData.js
 * Comprehensive mock data with all relationships populated
 * Demonstrates the full data model capabilities
 */

export const mockData = {
  sources: [
    // Social Media (flat)
    { id: 'src-facebook', name: 'Facebook', type: 'social', color: '#1877F2' },
    { id: 'src-x', name: 'X', type: 'social', color: '#000000' },
    { id: 'src-tiktok', name: 'TikTok', type: 'social', color: '#00F2EA' },
    { id: 'src-instagram', name: 'Instagram', type: 'social', color: '#E4405F' },
    { id: 'src-reddit', name: 'Reddit', type: 'social', color: '#FF4500' },
    
    // National News (hierarchical)
    { id: 'src-nat-cnn', name: 'CNN', type: 'national_news', parent: 'national_news', color: '#CC0000' },
    { id: 'src-nat-fox', name: 'Fox News', type: 'national_news', parent: 'national_news', color: '#003366' },
    { id: 'src-nat-nyt', name: 'New York Times', type: 'national_news', parent: 'national_news', color: '#1A1A1A' },
    { id: 'src-nat-wapo', name: 'Washington Post', type: 'national_news', parent: 'national_news', color: '#231F20' },
    { id: 'src-nat-msnbc', name: 'MSNBC', type: 'national_news', parent: 'national_news', color: '#0089D0' },
    
    // International News (hierarchical)
    { id: 'src-int-bbc', name: 'BBC', type: 'international_news', parent: 'international_news', color: '#BB1919' },
    { id: 'src-int-aljazeera', name: 'Al Jazeera', type: 'international_news', parent: 'international_news', color: '#D2A44D' },
    { id: 'src-int-reuters', name: 'Reuters', type: 'international_news', parent: 'international_news', color: '#FF8000' },
    { id: 'src-int-guardian', name: 'The Guardian', type: 'international_news', parent: 'international_news', color: '#052962' }
  ],

  sourceCategories: [
    { id: 'social', name: 'Social Media', color: '#9C27B0' },
    { id: 'national_news', name: 'National News', color: '#2196F3' },
    { id: 'international_news', name: 'International News', color: '#4CAF50' }
  ],

  missions: [
    {
      id: 'mission-001',
      name: 'Understand sentiment towards the American military',
      description: 'Track narratives related to US military operations, personnel, and public perception',
      color: '#1E88E5',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'mission-002',
      name: 'Understand narratives around American health',
      description: 'Monitor health-related narratives including diet, healthcare policy, and wellness trends',
      color: '#43A047',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'mission-003',
      name: 'Monitor political discourse',
      description: 'Track political narratives across the spectrum',
      color: '#E53935',
      createdAt: '2024-01-01T00:00:00Z'
    }
  ],

  narratives: [
    {
      id: 'narr-001',
      text: 'Joe Biden is cognitively unfit for the presidency',
      description: 'A pervasive narrative questioning the mental acuity and cognitive capabilities of President Biden, often citing public speaking incidents, apparent confusion during events, and comparisons to his earlier political career.',
      missionId: 'mission-003',
      status: 'in_progress',
      sentiment: -0.72,
      subNarrativeIds: ['sub-001', 'sub-002'],
      factionMentions: {
        'faction-001': { volume: 150, sentiment: -0.81 },
        'faction-002': { volume: 50, sentiment: -0.44 }
      },
      sourceVolumes: {
        'src-facebook': { volume: 65, sentiment: -0.58 },
        'src-x': { volume: 85, sentiment: -0.73 },
        'src-tiktok': { volume: 20, sentiment: -0.52 },
        'src-nat-fox': { volume: 18, sentiment: -0.86 },
        'src-nat-cnn': { volume: 8, sentiment: 0.18 },
        'src-int-bbc': { volume: 4, sentiment: 0.05 }
      },
      factionSources: {
        'faction-001': { 'src-facebook': 50, 'src-x': 60, 'src-tiktok': 15, 'src-nat-fox': 18, 'src-reddit': 7 },
        'faction-002': { 'src-x': 25, 'src-facebook': 15, 'src-tiktok': 5, 'src-nat-cnn': 3, 'src-reddit': 2 }
      },
      personIds: ['person-001', 'person-003'],
      organizationIds: ['org-001', 'org-005'],
      locationIds: ['loc-001'],
      eventIds: ['event-001'],
      volumeOverTime: [
        { date: '2024-01-01', factionVolumes: { 'faction-001': 12, 'faction-002': 4 }, sourceVolumes: { 'src-facebook': 6, 'src-x': 7, 'src-tiktok': 2, 'src-nat-fox': 1 } },
        { date: '2024-01-02', factionVolumes: { 'faction-001': 18, 'faction-002': 6 }, sourceVolumes: { 'src-facebook': 8, 'src-x': 10, 'src-tiktok': 3, 'src-nat-fox': 2, 'src-nat-cnn': 1 } },
        { date: '2024-01-03', factionVolumes: { 'faction-001': 15, 'faction-002': 8 }, sourceVolumes: { 'src-facebook': 7, 'src-x': 9, 'src-tiktok': 4, 'src-nat-fox': 2, 'src-nat-cnn': 1 } },
        { date: '2024-01-04', factionVolumes: { 'faction-001': 22, 'faction-002': 5 }, sourceVolumes: { 'src-facebook': 9, 'src-x': 12, 'src-tiktok': 3, 'src-nat-fox': 2, 'src-int-bbc': 1 } },
        { date: '2024-01-05', factionVolumes: { 'faction-001': 28, 'faction-002': 7 }, sourceVolumes: { 'src-facebook': 12, 'src-x': 15, 'src-tiktok': 4, 'src-nat-fox': 3, 'src-nat-cnn': 1 } },
        { date: '2024-01-06', factionVolumes: { 'faction-001': 35, 'faction-002': 10 }, sourceVolumes: { 'src-facebook': 15, 'src-x': 18, 'src-tiktok': 6, 'src-nat-fox': 4, 'src-nat-cnn': 2 } },
        { date: '2024-01-07', factionVolumes: { 'faction-001': 30, 'faction-002': 8 }, sourceVolumes: { 'src-facebook': 13, 'src-x': 16, 'src-tiktok': 5, 'src-nat-fox': 3, 'src-int-bbc': 1 } },
        { date: '2024-01-08', factionVolumes: { 'faction-001': 25, 'faction-002': 12 }, sourceVolumes: { 'src-facebook': 11, 'src-x': 14, 'src-tiktok': 6, 'src-nat-fox': 4, 'src-nat-cnn': 2 } },
        { date: '2024-01-09', factionVolumes: { 'faction-001': 20, 'faction-002': 9 }, sourceVolumes: { 'src-facebook': 9, 'src-x': 12, 'src-tiktok': 4, 'src-nat-fox': 3, 'src-nat-cnn': 1 } },
        { date: '2024-01-10', factionVolumes: { 'faction-001': 18, 'faction-002': 7 }, sourceVolumes: { 'src-facebook': 8, 'src-x': 10, 'src-tiktok': 3, 'src-nat-fox': 3, 'src-int-bbc': 1 } }
      ],
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'narr-002',
      text: 'A National Guard member shot a US citizen at 9th and Hennepin in Minneapolis',
      description: 'Reports and discussions surrounding an incident where a Minnesota National Guard member allegedly discharged their weapon, resulting in a civilian casualty during civil unrest in downtown Minneapolis.',
      missionId: 'mission-001',
      status: 'under_investigation',
      sentiment: -0.58,
      subNarrativeIds: ['sub-003', 'sub-004', 'sub-005'],
      factionMentions: {
        'faction-003': { volume: 200, sentiment: -0.77 },
        'faction-004': { volume: 80, sentiment: 0.48 }
      },
      sourceVolumes: {
        'src-x': { volume: 120, sentiment: -0.63 },
        'src-tiktok': { volume: 65, sentiment: -0.58 },
        'src-instagram': { volume: 40, sentiment: -0.51 },
        'src-facebook': { volume: 25, sentiment: -0.12 },
        'src-nat-cnn': { volume: 12, sentiment: -0.42 },
        'src-nat-msnbc': { volume: 8, sentiment: -0.55 },
        'src-nat-fox': { volume: 6, sentiment: 0.61 },
        'src-int-bbc': { volume: 4, sentiment: 0.08 }
      },
      factionSources: {
        'faction-003': { 'src-x': 90, 'src-tiktok': 55, 'src-instagram': 30, 'src-facebook': 15, 'src-nat-cnn': 8, 'src-nat-msnbc': 2 },
        'faction-004': { 'src-x': 30, 'src-facebook': 10, 'src-tiktok': 10, 'src-instagram': 10, 'src-nat-fox': 6, 'src-nat-cnn': 4, 'src-int-bbc': 4, 'src-nat-msnbc': 6 }
      },
      personIds: ['person-002'],
      organizationIds: ['org-002'],
      locationIds: ['loc-002'],
      eventIds: ['event-002', 'event-003', 'event-004', 'event-005'],
      volumeOverTime: [
        { date: '2024-06-15', factionVolumes: { 'faction-003': 50, 'faction-004': 20 }, sourceVolumes: { 'src-x': 30, 'src-tiktok': 18, 'src-instagram': 12, 'src-facebook': 6, 'src-nat-cnn': 4 } },
        { date: '2024-06-16', factionVolumes: { 'faction-003': 180, 'faction-004': 60 }, sourceVolumes: { 'src-x': 100, 'src-tiktok': 60, 'src-instagram': 40, 'src-facebook': 20, 'src-nat-cnn': 10, 'src-nat-msnbc': 6, 'src-nat-fox': 4 } },
        { date: '2024-06-17', factionVolumes: { 'faction-003': 220, 'faction-004': 85 }, sourceVolumes: { 'src-x': 120, 'src-tiktok': 75, 'src-instagram': 50, 'src-facebook': 30, 'src-nat-cnn': 15, 'src-nat-msnbc': 8, 'src-nat-fox': 5, 'src-int-bbc': 2 } },
        { date: '2024-06-18', factionVolumes: { 'faction-003': 150, 'faction-004': 70 }, sourceVolumes: { 'src-x': 90, 'src-tiktok': 55, 'src-instagram': 35, 'src-facebook': 20, 'src-nat-cnn': 10, 'src-nat-msnbc': 5, 'src-nat-fox': 3, 'src-int-bbc': 2 } },
        { date: '2024-06-19', factionVolumes: { 'faction-003': 100, 'faction-004': 45 }, sourceVolumes: { 'src-x': 60, 'src-tiktok': 38, 'src-instagram': 22, 'src-facebook': 12, 'src-nat-cnn': 7, 'src-nat-msnbc': 4, 'src-nat-fox': 2 } },
        { date: '2024-06-20', factionVolumes: { 'faction-003': 80, 'faction-004': 30 }, sourceVolumes: { 'src-x': 48, 'src-tiktok': 28, 'src-instagram': 16, 'src-facebook': 10, 'src-nat-cnn': 5, 'src-nat-msnbc': 3 } },
        { date: '2024-06-21', factionVolumes: { 'faction-003': 60, 'faction-004': 25 }, sourceVolumes: { 'src-x': 36, 'src-tiktok': 22, 'src-instagram': 12, 'src-facebook': 8, 'src-nat-cnn': 4, 'src-nat-msnbc': 3 } },
        { date: '2024-06-22', factionVolumes: { 'faction-003': 45, 'faction-004': 18 }, sourceVolumes: { 'src-x': 28, 'src-tiktok': 15, 'src-instagram': 10, 'src-facebook': 6, 'src-nat-cnn': 3, 'src-nat-msnbc': 1 } },
        { date: '2024-06-23', factionVolumes: { 'faction-003': 35, 'faction-004': 12 }, sourceVolumes: { 'src-x': 20, 'src-tiktok': 12, 'src-instagram': 8, 'src-facebook': 4, 'src-nat-cnn': 2, 'src-nat-msnbc': 1 } },
        { date: '2024-06-24', factionVolumes: { 'faction-003': 28, 'faction-004': 10 }, sourceVolumes: { 'src-x': 16, 'src-tiktok': 10, 'src-instagram': 6, 'src-facebook': 4, 'src-nat-cnn': 2 } }
      ],
      createdAt: '2024-06-15T00:00:00Z'
    },
    {
      id: 'narr-003',
      text: 'Processed foods cause cancer',
      description: 'Health-focused narrative linking ultra-processed foods to increased cancer risk, citing studies on food additives, preservatives, and the correlation between processed food consumption and various health outcomes.',
      missionId: 'mission-002',
      status: 'new',
      sentiment: -0.45,
      subNarrativeIds: ['sub-006', 'sub-007'],
      factionMentions: {
        'faction-005': { volume: 300, sentiment: -0.62 },
        'faction-006': { volume: 120, sentiment: -0.38 }
      },
      sourceVolumes: {
        'src-tiktok': { volume: 180, sentiment: -0.47 },
        'src-instagram': { volume: 95, sentiment: -0.41 },
        'src-facebook': { volume: 75, sentiment: -0.36 },
        'src-x': { volume: 50, sentiment: -0.53 },
        'src-reddit': { volume: 20, sentiment: -0.58 }
      },
      factionSources: {
        'faction-005': { 'src-facebook': 60, 'src-x': 40, 'src-tiktok': 100, 'src-instagram': 60, 'src-reddit': 15, 'src-nat-nyt': 10, 'src-int-guardian': 8, 'src-int-bbc': 7 },
        'faction-006': { 'src-tiktok': 80, 'src-instagram': 35, 'src-facebook': 15, 'src-x': 10, 'src-reddit': 5 }
      },
      personIds: [],
      organizationIds: ['org-003', 'org-004'],
      locationIds: [],
      eventIds: [],
      volumeOverTime: [
        { date: '2024-02-01', factionVolumes: { 'faction-005': 30, 'faction-006': 15 }, sourceVolumes: { 'src-tiktok': 20, 'src-instagram': 12, 'src-facebook': 8, 'src-x': 5 } },
        { date: '2024-02-02', factionVolumes: { 'faction-005': 45, 'faction-006': 20 }, sourceVolumes: { 'src-tiktok': 28, 'src-instagram': 18, 'src-facebook': 12, 'src-x': 7 } },
        { date: '2024-02-03', factionVolumes: { 'faction-005': 60, 'faction-006': 25 }, sourceVolumes: { 'src-tiktok': 38, 'src-instagram': 22, 'src-facebook': 15, 'src-x': 10 } },
        { date: '2024-02-04', factionVolumes: { 'faction-005': 55, 'faction-006': 22 }, sourceVolumes: { 'src-tiktok': 35, 'src-instagram': 20, 'src-facebook': 14, 'src-x': 8 } },
        { date: '2024-02-05', factionVolumes: { 'faction-005': 70, 'faction-006': 30 }, sourceVolumes: { 'src-tiktok': 45, 'src-instagram': 26, 'src-facebook': 18, 'src-x': 11 } },
        { date: '2024-02-06', factionVolumes: { 'faction-005': 65, 'faction-006': 28 }, sourceVolumes: { 'src-tiktok': 42, 'src-instagram': 24, 'src-facebook': 16, 'src-x': 11 } },
        { date: '2024-02-07', factionVolumes: { 'faction-005': 50, 'faction-006': 18 }, sourceVolumes: { 'src-tiktok': 30, 'src-instagram': 18, 'src-facebook': 12, 'src-x': 8 } },
        { date: '2024-02-08', factionVolumes: { 'faction-005': 55, 'faction-006': 20 }, sourceVolumes: { 'src-tiktok': 34, 'src-instagram': 20, 'src-facebook': 13, 'src-x': 8 } },
        { date: '2024-02-09', factionVolumes: { 'faction-005': 48, 'faction-006': 16 }, sourceVolumes: { 'src-tiktok': 28, 'src-instagram': 17, 'src-facebook': 12, 'src-x': 7 } },
        { date: '2024-02-10', factionVolumes: { 'faction-005': 42, 'faction-006': 14 }, sourceVolumes: { 'src-tiktok': 25, 'src-instagram': 15, 'src-facebook': 10, 'src-x': 6 } }
      ],
      createdAt: '2024-02-01T00:00:00Z'
    },
    {
      id: 'narr-004',
      text: 'US military presence in the Middle East is destabilizing the region',
      description: 'Foreign policy narrative arguing that American military bases and operations in Middle Eastern countries contribute to regional instability, fuel anti-American sentiment, and create conditions for ongoing conflict.',
      missionId: 'mission-001',
      status: 'resolved',
      sentiment: -0.38,
      subNarrativeIds: ['sub-008'],
      factionMentions: {
        'faction-002': { volume: 85, sentiment: -0.68 },
        'faction-003': { volume: 65, sentiment: -0.52 },
        'faction-001': { volume: 40, sentiment: 0.71 }
      },
      sourceVolumes: {
        'src-x': { volume: 70, sentiment: -0.48 },
        'src-reddit': { volume: 35, sentiment: -0.43 },
        'src-facebook': { volume: 25, sentiment: -0.08 },
        'src-int-aljazeera': { volume: 22, sentiment: -0.64 },
        'src-int-bbc': { volume: 18, sentiment: -0.18 },
        'src-int-reuters': { volume: 12, sentiment: -0.05 },
        'src-nat-cnn': { volume: 8, sentiment: 0.12 }
      },
      factionSources: {
        'faction-002': { 'src-x': 35, 'src-reddit': 25, 'src-facebook': 10, 'src-int-aljazeera': 8, 'src-int-bbc': 5, 'src-nat-cnn': 2 },
        'faction-003': { 'src-x': 25, 'src-reddit': 8, 'src-facebook': 10, 'src-int-aljazeera': 12, 'src-int-bbc': 8, 'src-int-reuters': 2 },
        'faction-001': { 'src-x': 10, 'src-facebook': 5, 'src-reddit': 2, 'src-nat-fox': 15, 'src-nat-cnn': 6, 'src-int-bbc': 2 }
      },
      personIds: ['person-001'],
      organizationIds: ['org-007'],
      locationIds: ['loc-003'],
      eventIds: [],
      volumeOverTime: [
        { date: '2024-03-01', factionVolumes: { 'faction-002': 15, 'faction-003': 10, 'faction-001': 8 }, sourceVolumes: { 'src-x': 15, 'src-reddit': 6, 'src-facebook': 5, 'src-int-aljazeera': 4, 'src-int-bbc': 3 } },
        { date: '2024-03-02', factionVolumes: { 'faction-002': 18, 'faction-003': 12, 'faction-001': 6 }, sourceVolumes: { 'src-x': 16, 'src-reddit': 8, 'src-facebook': 6, 'src-int-aljazeera': 4, 'src-int-bbc': 2 } },
        { date: '2024-03-03', factionVolumes: { 'faction-002': 22, 'faction-003': 15, 'faction-001': 5 }, sourceVolumes: { 'src-x': 18, 'src-reddit': 10, 'src-facebook': 6, 'src-int-aljazeera': 5, 'src-int-bbc': 3 } },
        { date: '2024-03-04', factionVolumes: { 'faction-002': 20, 'faction-003': 14, 'faction-001': 7 }, sourceVolumes: { 'src-x': 17, 'src-reddit': 9, 'src-facebook': 7, 'src-int-aljazeera': 5, 'src-int-bbc': 3 } },
        { date: '2024-03-05', factionVolumes: { 'faction-002': 25, 'faction-003': 18, 'faction-001': 4 }, sourceVolumes: { 'src-x': 20, 'src-reddit': 12, 'src-facebook': 6, 'src-int-aljazeera': 6, 'src-int-bbc': 3 } }
      ],
      createdAt: '2024-03-01T00:00:00Z'
    }
  ],

  subNarratives: [
    {
      id: 'sub-001',
      text: 'Biden stumbles during press conference',
      description: 'Viral clips and commentary focused on moments where President Biden appeared to lose his train of thought, misspoke, or had difficulty navigating during official press conferences.',
      parentNarrativeId: 'narr-001',
      sentiment: -0.78,
      factionMentions: {
        'faction-001': { volume: 80, sentiment: -0.84 }
      },
      personIds: ['person-001'],
      organizationIds: [],
      locationIds: ['loc-001'],
      eventIds: ['event-001'],
      volumeOverTime: [
        { date: '2024-01-05', factionVolumes: { 'faction-001': 40 } },
        { date: '2024-01-06', factionVolumes: { 'faction-001': 60 } },
        { date: '2024-01-07', factionVolumes: { 'faction-001': 35 } }
      ]
    },
    {
      id: 'sub-002',
      text: 'Democrats consider replacing Biden as candidate',
      description: 'Discussion within Democratic circles and media speculation about whether the party should nominate an alternative candidate due to concerns about electability and public perception.',
      parentNarrativeId: 'narr-001',
      sentiment: -0.15,
      factionMentions: {
        'faction-001': { volume: 45, sentiment: -0.56 },
        'faction-002': { volume: 30, sentiment: 0.18 }
      },
      personIds: ['person-001'],
      organizationIds: ['org-001'],
      locationIds: [],
      eventIds: [],
      volumeOverTime: [
        { date: '2024-01-06', factionVolumes: { 'faction-001': 25, 'faction-002': 15 } },
        { date: '2024-01-07', factionVolumes: { 'faction-001': 35, 'faction-002': 20 } }
      ]
    },
    {
      id: 'sub-003',
      text: 'National Guard clashes with protestors in Minneapolis',
      description: 'Reports of physical confrontations between National Guard units and protesters during civil demonstrations in Minneapolis, including use of crowd control measures.',
      parentNarrativeId: 'narr-002',
      sentiment: -0.68,
      factionMentions: {
        'faction-003': { volume: 120, sentiment: -0.82 }
      },
      personIds: [],
      organizationIds: ['org-002'],
      locationIds: ['loc-002'],
      eventIds: ['event-002'],
      volumeOverTime: [
        { date: '2024-06-15', factionVolumes: { 'faction-003': 80 } },
        { date: '2024-06-16', factionVolumes: { 'faction-003': 120 } }
      ]
    },
    {
      id: 'sub-004',
      text: 'President issues statement condemning violence',
      description: 'Official White House response to the Minneapolis incident, with the President calling for calm and condemning violence from all parties involved.',
      parentNarrativeId: 'narr-002',
      sentiment: 0.22,
      factionMentions: {
        'faction-003': { volume: 60, sentiment: -0.28 },
        'faction-004': { volume: 40, sentiment: 0.54 }
      },
      personIds: ['person-001'],
      organizationIds: ['org-002'],
      locationIds: ['loc-001'],
      eventIds: ['event-005'],
      volumeOverTime: [
        { date: '2024-06-16', factionVolumes: { 'faction-003': 40, 'faction-004': 30 } },
        { date: '2024-06-17', factionVolumes: { 'faction-003': 50, 'faction-004': 35 } }
      ]
    },
    {
      id: 'sub-005',
      text: 'Witnesses dispute official account of Minneapolis shooting',
      description: 'Eyewitness testimonies and citizen journalism contradicting the official National Guard narrative about the circumstances leading to the civilian shooting.',
      parentNarrativeId: 'narr-002',
      sentiment: -0.62,
      factionMentions: {
        'faction-003': { volume: 90, sentiment: -0.74 }
      },
      personIds: ['person-002'],
      organizationIds: [],
      locationIds: ['loc-002'],
      eventIds: ['event-003'],
      volumeOverTime: [
        { date: '2024-06-17', factionVolumes: { 'faction-003': 50 } },
        { date: '2024-06-18', factionVolumes: { 'faction-003': 70 } }
      ]
    },
    {
      id: 'sub-006',
      text: 'Vegans gain popularity on TikTok as alternative to processed food',
      description: 'Social media trend where vegan influencers promote plant-based diets as a healthier alternative to processed foods, gaining significant traction among younger demographics.',
      parentNarrativeId: 'narr-003',
      sentiment: 0.58,
      factionMentions: {
        'faction-006': { volume: 250, sentiment: 0.72 }
      },
      personIds: [],
      organizationIds: ['org-004'],
      locationIds: [],
      eventIds: [],
      volumeOverTime: [
        { date: '2024-02-03', factionVolumes: { 'faction-006': 80 } },
        { date: '2024-02-04', factionVolumes: { 'faction-006': 100 } },
        { date: '2024-02-05', factionVolumes: { 'faction-006': 120 } }
      ]
    },
    {
      id: 'sub-007',
      text: 'FDA accused of protecting food industry over public health',
      description: 'Criticism alleging regulatory capture at the FDA, claiming the agency prioritizes food industry interests over consumer safety when approving additives and setting standards.',
      parentNarrativeId: 'narr-003',
      sentiment: -0.71,
      factionMentions: {
        'faction-005': { volume: 180, sentiment: -0.76 }
      },
      personIds: [],
      organizationIds: ['org-003'],
      locationIds: [],
      eventIds: [],
      volumeOverTime: [
        { date: '2024-02-05', factionVolumes: { 'faction-005': 60 } },
        { date: '2024-02-06', factionVolumes: { 'faction-005': 80 } },
        { date: '2024-02-07', factionVolumes: { 'faction-005': 70 } }
      ]
    },
    {
      id: 'sub-008',
      text: 'Troops deployed to Syria face increased attacks',
      description: 'Reports of escalating attacks on US military personnel stationed in Syria, including drone strikes and rocket attacks on American bases in the region.',
      parentNarrativeId: 'narr-004',
      sentiment: -0.54,
      factionMentions: {
        'faction-002': { volume: 45, sentiment: -0.61 },
        'faction-003': { volume: 35, sentiment: -0.47 }
      },
      personIds: [],
      organizationIds: ['org-007'],
      locationIds: ['loc-003'],
      eventIds: [],
      volumeOverTime: [
        { date: '2024-03-03', factionVolumes: { 'faction-002': 20, 'faction-003': 15 } },
        { date: '2024-03-04', factionVolumes: { 'faction-002': 25, 'faction-003': 20 } }
      ]
    }
  ],

  factions: [
    {
      id: 'faction-001',
      name: 'American Right Wing',
      color: '#E53935',
      relatedFactionIds: ['faction-004'],
      memberCount: 15000000,
      affiliatedPersonIds: ['person-003'],
      affiliatedOrganizationIds: ['org-005']
    },
    {
      id: 'faction-002',
      name: 'Democratic Socialists of America',
      color: '#D81B60',
      relatedFactionIds: ['faction-003'],
      memberCount: 500000,
      affiliatedPersonIds: [],
      affiliatedOrganizationIds: ['org-006']
    },
    {
      id: 'faction-003',
      name: 'BLM Supporters',
      color: '#7C4DFF',
      relatedFactionIds: ['faction-002'],
      memberCount: 8000000,
      affiliatedPersonIds: [],
      affiliatedOrganizationIds: []
    },
    {
      id: 'faction-004',
      name: 'Law Enforcement Supporters',
      color: '#1E88E5',
      relatedFactionIds: ['faction-001'],
      memberCount: 12000000,
      affiliatedPersonIds: [],
      affiliatedOrganizationIds: ['org-002']
    },
    {
      id: 'faction-005',
      name: 'Health Activists',
      color: '#00ACC1',
      relatedFactionIds: ['faction-006'],
      memberCount: 5000000,
      affiliatedPersonIds: [],
      affiliatedOrganizationIds: []
    },
    {
      id: 'faction-006',
      name: 'Vegans',
      color: '#43A047',
      relatedFactionIds: ['faction-005'],
      memberCount: 8000000,
      affiliatedPersonIds: [],
      affiliatedOrganizationIds: ['org-004']
    }
  ],

  factionOverlaps: [
    {
      factionIds: ['faction-001', 'faction-004'],
      overlapSize: 2000000,
      sharedSentiment: { 'narr-002': 0.52 }
    },
    {
      factionIds: ['faction-002', 'faction-003'],
      overlapSize: 150000,
      sharedSentiment: { 'narr-002': -0.69 }
    },
    {
      factionIds: ['faction-005', 'faction-006'],
      overlapSize: 3000000,
      sharedSentiment: { 'narr-003': -0.48 }
    }
  ],

  locations: [
    {
      id: 'loc-001',
      name: 'White House, Washington D.C.',
      coordinates: { lat: 38.8977, lng: -77.0365 },
      type: 'landmark'
    },
    {
      id: 'loc-002',
      name: '9th and Hennepin, Minneapolis',
      coordinates: { lat: 44.9778, lng: -93.2750 },
      type: 'intersection'
    },
    {
      id: 'loc-003',
      name: 'Damascus, Syria',
      coordinates: { lat: 33.5138, lng: 36.2765 },
      type: 'city'
    },
    {
      id: 'loc-004',
      name: 'Capitol Building, Washington D.C.',
      coordinates: { lat: 38.8899, lng: -77.0091 },
      type: 'landmark'
    }
  ],

  events: [
    {
      id: 'event-001',
      text: 'Biden press conference gaffe',
      date: '2024-01-05T14:00:00Z',
      parentEventId: null,
      subEventIds: [],
      locationId: 'loc-001',
      personIds: ['person-001'],
      organizationIds: []
    },
    {
      id: 'event-002',
      text: 'National Guard clashes with protestors',
      date: '2024-06-15T18:00:00Z',
      parentEventId: null,
      subEventIds: ['event-003', 'event-004', 'event-005'],
      locationId: 'loc-002',
      personIds: ['person-002'],
      organizationIds: ['org-002']
    },
    {
      id: 'event-003',
      text: 'National Guard member shoots US citizen',
      date: '2024-06-15T20:30:00Z',
      parentEventId: 'event-002',
      subEventIds: [],
      locationId: 'loc-002',
      personIds: ['person-002'],
      organizationIds: ['org-002']
    },
    {
      id: 'event-004',
      text: 'Dozens jailed in riots following shooting',
      date: '2024-06-16T02:00:00Z',
      parentEventId: 'event-002',
      subEventIds: [],
      locationId: 'loc-002',
      personIds: [],
      organizationIds: ['org-002']
    },
    {
      id: 'event-005',
      text: 'President issues statement about National Guard shooting',
      date: '2024-06-16T14:00:00Z',
      parentEventId: 'event-002',
      subEventIds: [],
      locationId: 'loc-001',
      personIds: ['person-001'],
      organizationIds: ['org-002']
    }
  ],

  persons: [
    {
      id: 'person-001',
      name: 'Joe Biden',
      type: 'politician',
      imageUrl: null,
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-001', 'loc-004'],
      relatedEventIds: ['event-001', 'event-005'],
      factionSentiment: {
        'faction-001': -0.82,
        'faction-002': -0.28,
        'faction-003': 0.15
      }
    },
    {
      id: 'person-002',
      name: 'Unnamed National Guard Member',
      type: 'military',
      imageUrl: null,
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-002'],
      relatedEventIds: ['event-002', 'event-003'],
      factionSentiment: {
        'faction-003': -0.76,
        'faction-004': 0.35
      }
    },
    {
      id: 'person-003',
      name: 'Donald Trump',
      type: 'politician',
      imageUrl: null,
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-001', 'loc-004'],
      relatedEventIds: [],
      factionSentiment: {
        'faction-001': 0.67,
        'faction-002': -0.78,
        'faction-003': -0.69
      }
    }
  ],

  organizations: [
    {
      id: 'org-001',
      name: 'Democratic Party',
      type: 'political',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-001', 'loc-004'],
      factionSentiment: {
        'faction-001': -0.73,
        'faction-002': 0.41
      }
    },
    {
      id: 'org-002',
      name: 'Minnesota National Guard',
      type: 'military',
      affiliatedFactionIds: ['faction-004'],
      relatedLocationIds: ['loc-002'],
      factionSentiment: {
        'faction-003': -0.81,
        'faction-004': 0.64
      }
    },
    {
      id: 'org-003',
      name: 'FDA',
      type: 'government',
      affiliatedFactionIds: [],
      relatedLocationIds: [],
      factionSentiment: {
        'faction-005': -0.67,
        'faction-006': -0.52
      }
    },
    {
      id: 'org-004',
      name: 'TikTok',
      type: 'platform',
      affiliatedFactionIds: [],
      relatedLocationIds: [],
      factionSentiment: {
        'faction-006': 0.58
      }
    },
    {
      id: 'org-005',
      name: 'Republican Party',
      type: 'political',
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-001', 'loc-004'],
      factionSentiment: {
        'faction-001': 0.74,
        'faction-002': -0.79
      }
    },
    {
      id: 'org-006',
      name: 'DSA',
      type: 'political',
      affiliatedFactionIds: ['faction-002'],
      relatedLocationIds: [],
      factionSentiment: {
        'faction-002': 0.68,
        'faction-001': -0.61
      }
    },
    {
      id: 'org-007',
      name: 'US Armed Forces',
      type: 'military',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-003'],
      factionSentiment: {
        'faction-001': 0.72,
        'faction-002': -0.48,
        'faction-003': -0.37
      }
    }
  ],

  documents: []
};

/**
 * Initialize the data store with mock data if empty or outdated
 */
export function initializeMockData(dataStore) {
  // Data version for tracking schema changes (increment to force refresh)
  const MOCK_DATA_VERSION = 2; // v2: numeric sentiment values
  
  // Check if data needs refresh (empty, missing version, or old version)
  const currentVersion = dataStore.data._mockDataVersion || 0;
  const needsRefresh = currentVersion < MOCK_DATA_VERSION ||
                       dataStore.data.missions.length === 0;
  
  if (needsRefresh) {
    dataStore.data = { ...mockData, _mockDataVersion: MOCK_DATA_VERSION };
    dataStore.save();
    console.log(`Initialized with mock data v${MOCK_DATA_VERSION} (numeric sentiments)`);
  } else {
    // Merge in missing source-related fields for existing data
    let needsSave = false;
    
    if (!dataStore.data.sources || dataStore.data.sources.length === 0) {
      dataStore.data.sources = mockData.sources;
      needsSave = true;
    }
    
    if (!dataStore.data.sourceCategories || dataStore.data.sourceCategories.length === 0) {
      dataStore.data.sourceCategories = mockData.sourceCategories;
      needsSave = true;
    }
    
    if (needsSave) {
      dataStore.save();
      console.log('Merged in missing source data');
    }
  }
}

export default mockData;

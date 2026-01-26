/**
 * mockData.js
 * Comprehensive mock data with all relationships populated
 * Demonstrates the full data model capabilities
 */

export const datasetId = 'american-politics';
export const datasetName = 'American Politics';

export const mockData = {
  publishers: [
    // Social Media (flat)
    { id: 'pub-facebook', name: 'Facebook', type: 'social', color: '#1877F2' },
    { id: 'pub-x', name: 'X', type: 'social', color: '#000000' },
    { id: 'pub-tiktok', name: 'TikTok', type: 'social', color: '#00F2EA' },
    { id: 'pub-instagram', name: 'Instagram', type: 'social', color: '#E4405F' },
    { id: 'pub-reddit', name: 'Reddit', type: 'social', color: '#FF4500' },
    
    // National News (hierarchical)
    { id: 'pub-nat-cnn', name: 'CNN', type: 'national_news', parent: 'national_news', color: '#CC0000' },
    { id: 'pub-nat-fox', name: 'Fox News', type: 'national_news', parent: 'national_news', color: '#003366' },
    { id: 'pub-nat-nyt', name: 'New York Times', type: 'national_news', parent: 'national_news', color: '#1A1A1A' },
    { id: 'pub-nat-wapo', name: 'Washington Post', type: 'national_news', parent: 'national_news', color: '#231F20' },
    { id: 'pub-nat-msnbc', name: 'MSNBC', type: 'national_news', parent: 'national_news', color: '#0089D0' },
    
    // International News (hierarchical)
    { id: 'pub-int-bbc', name: 'BBC', type: 'international_news', parent: 'international_news', color: '#BB1919' },
    { id: 'pub-int-aljazeera', name: 'Al Jazeera', type: 'international_news', parent: 'international_news', color: '#D2A44D' },
    { id: 'pub-int-reuters', name: 'Reuters', type: 'international_news', parent: 'international_news', color: '#FF8000' },
    { id: 'pub-int-guardian', name: 'The Guardian', type: 'international_news', parent: 'international_news', color: '#052962' },
    
    // Internal (no colors - department names)
    { id: 'pub-dept-ops', name: 'Operations Division', type: 'internal', color: null },
    { id: 'pub-dept-intel', name: 'Intelligence Analysis', type: 'internal', color: null },
    { id: 'pub-dept-cyber', name: 'Cyber Operations', type: 'internal', color: null },
    { id: 'pub-dept-legal', name: 'Legal Affairs', type: 'internal', color: null }
  ],

  publisherCategories: [
    { id: 'social', name: 'Social Media', color: '#B07AA1' },
    { id: 'national_news', name: 'National News', color: '#4E79A7' },
    { id: 'international_news', name: 'International News', color: '#59A14F' },
    { id: 'internal', name: 'Internal', color: '#6b7280' }
  ],

  // Centralized user data for highlights and comments
  users: [
    {
      id: 'user-001',
      username: 'nthayer',
      displayName: 'Nicole Thayer',
      role: 'Senior Analyst',
      department: 'Intelligence Analysis',
      avatarUrl: 'img/placeholders/avatar-default.svg',
      isCurrentUser: true
    },
    {
      id: 'user-002',
      username: 'jsmith',
      displayName: 'John Smith',
      role: 'Analyst',
      department: 'Intelligence Analysis',
      avatarUrl: 'img/placeholders/avatar-default.svg',
      isCurrentUser: false
    },
    {
      id: 'user-003',
      username: 'mwilliams',
      displayName: 'Maria Williams',
      role: 'Team Lead',
      department: 'Cyber Operations',
      avatarUrl: 'img/placeholders/avatar-default.svg',
      isCurrentUser: false
    },
    {
      id: 'user-004',
      username: 'dchen',
      displayName: 'David Chen',
      role: 'Senior Analyst',
      department: 'Domestic Operations',
      avatarUrl: 'img/placeholders/avatar-default.svg',
      isCurrentUser: false
    },
    {
      id: 'user-005',
      username: 'agarcia',
      displayName: 'Ana Garcia',
      role: 'Analyst',
      department: 'Legal Affairs',
      avatarUrl: 'img/placeholders/avatar-default.svg',
      isCurrentUser: false
    },
    {
      id: 'user-006',
      username: 'rjohnson',
      displayName: 'Robert Johnson',
      role: 'Division Chief',
      department: 'Intelligence Analysis',
      avatarUrl: 'img/placeholders/avatar-default.svg',
      isCurrentUser: false
    }
  ],

  missions: [
    {
      id: 'mission-001',
      name: 'Understand sentiment towards the American military',
      description: 'Track narratives related to US military operations, personnel, and public perception',
      color: '#4E79A7',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'mission-002',
      name: 'Understand narratives around American health',
      description: 'Monitor health-related narratives including diet, healthcare policy, and wellness trends',
      color: '#59A14F',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'mission-003',
      name: 'Monitor political discourse',
      description: 'Track political narratives across the spectrum',
      color: '#E15759',
      createdAt: '2024-01-01T00:00:00Z'
    }
  ],

  narratives: [
    {
      id: 'narr-003',
      text: 'New studies link common food preservatives to 32% increased cancer risk',
      description: 'A wave of 2026 research has identified alarming associations between specific food preservatives and cancer. The NutriNet-Santé study found sodium nitrite—common in deli meats and processed foods—linked to a 32% increase in prostate cancer risk, while potassium nitrate is associated with 22% higher breast cancer risk. Harvard researchers reported high ultra-processed food consumption correlates with 45% higher risk of precancerous colorectal adenomas. A separate NIH-AARP study found participants with highest UPF intake had 41% higher lung cancer risk regardless of smoking status. Health experts are calling for stricter regulation of food additives and recommending consumers prioritize minimally processed, plant-based foods.',
      missionId: 'mission-002',
      status: 'in_progress',
      sentiment: -0.58,
      subNarrativeIds: ['sub-006', 'sub-007'],
      factionMentions: {
        'faction-005': { volume: 450, sentiment: -0.68 },
        'faction-006': { volume: 180, sentiment: -0.42 }
      },
      publisherVolumes: {
        'pub-tiktok': { volume: 220, sentiment: -0.52 },
        'pub-instagram': { volume: 125, sentiment: -0.45 },
        'pub-facebook': { volume: 95, sentiment: -0.38 },
        'pub-x': { volume: 85, sentiment: -0.58 },
        'pub-reddit': { volume: 45, sentiment: -0.62 },
        'pub-nat-cnn': { volume: 25, sentiment: -0.48 },
        'pub-nat-nyt': { volume: 18, sentiment: -0.42 }
      },
      factionSources: {
        'faction-005': { 'pub-facebook': 75, 'pub-x': 65, 'pub-tiktok': 140, 'pub-instagram': 85, 'pub-reddit': 35, 'pub-nat-nyt': 18, 'pub-nat-cnn': 20, 'pub-int-guardian': 12 },
        'faction-006': { 'pub-tiktok': 80, 'pub-instagram': 40, 'pub-facebook': 20, 'pub-x': 20, 'pub-reddit': 10, 'pub-nat-cnn': 5, 'pub-int-bbc': 5 }
      },
      personIds: [],
      organizationIds: ['org-003', 'org-004'],
      locationIds: [],
      eventIds: [],
      volumeOverTime: [
        { date: '2026-01-07', factionVolumes: { 'faction-005': 45, 'faction-006': 20 }, publisherVolumes: { 'pub-tiktok': 28, 'pub-instagram': 16, 'pub-facebook': 12, 'pub-x': 8, 'pub-nat-cnn': 3 } },
        { date: '2026-01-08', factionVolumes: { 'faction-005': 65, 'faction-006': 28 }, publisherVolumes: { 'pub-tiktok': 38, 'pub-instagram': 22, 'pub-facebook': 18, 'pub-x': 12, 'pub-nat-cnn': 5 } },
        { date: '2026-01-09', factionVolumes: { 'faction-005': 85, 'faction-006': 35 }, publisherVolumes: { 'pub-tiktok': 52, 'pub-instagram': 28, 'pub-facebook': 22, 'pub-x': 15, 'pub-reddit': 8 } },
        { date: '2026-01-10', factionVolumes: { 'faction-005': 95, 'faction-006': 42 }, publisherVolumes: { 'pub-tiktok': 58, 'pub-instagram': 32, 'pub-facebook': 25, 'pub-x': 18, 'pub-reddit': 10 } },
        { date: '2026-01-11', factionVolumes: { 'faction-005': 78, 'faction-006': 32 }, publisherVolumes: { 'pub-tiktok': 45, 'pub-instagram': 26, 'pub-facebook': 20, 'pub-x': 14, 'pub-reddit': 8 } },
        { date: '2026-01-12', factionVolumes: { 'faction-005': 72, 'faction-006': 28 }, publisherVolumes: { 'pub-tiktok': 42, 'pub-instagram': 24, 'pub-facebook': 18, 'pub-x': 12, 'pub-reddit': 6 } },
        { date: '2026-01-13', factionVolumes: { 'faction-005': 68, 'faction-006': 25 }, publisherVolumes: { 'pub-tiktok': 38, 'pub-instagram': 22, 'pub-facebook': 16, 'pub-x': 12, 'pub-reddit': 6 } },
        { date: '2026-01-14', factionVolumes: { 'faction-005': 82, 'faction-006': 38 }, publisherVolumes: { 'pub-tiktok': 48, 'pub-instagram': 28, 'pub-facebook': 22, 'pub-x': 16, 'pub-reddit': 8 } },
        { date: '2026-01-15', factionVolumes: { 'faction-005': 75, 'faction-006': 32 }, publisherVolumes: { 'pub-tiktok': 44, 'pub-instagram': 25, 'pub-facebook': 19, 'pub-x': 14, 'pub-reddit': 7 } },
        { date: '2026-01-16', factionVolumes: { 'faction-005': 70, 'faction-006': 28 }, publisherVolumes: { 'pub-tiktok': 40, 'pub-instagram': 22, 'pub-facebook': 18, 'pub-x': 12, 'pub-reddit': 6 } }
      ],
      documentIds: ['doc-021', 'doc-022', 'doc-023'],
      createdAt: '2026-01-07T00:00:00Z'
    },
    {
      id: 'narr-005',
      text: 'Trump\'s Greenland acquisition threats are straining US-European relations',
      description: 'A developing geopolitical narrative centered on President Trump\'s renewed threats to acquire Greenland, which has triggered sharp criticism from European leaders at the World Economic Forum in Davos. French President Macron warned of a world where "international law is trampled under foot," while European Commission President von der Leyen called for "a new form of European independence" in response to these "geopolitical shocks." The situation escalated when Trump shared private diplomatic messages on social media, including a message from Macron questioning the Greenland policy.',
      missionId: 'mission-003',
      status: 'in_progress',
      sentiment: -0.52,
      subNarrativeIds: ['sub-009', 'sub-010', 'sub-011'],
      factionMentions: {
        'faction-001': { volume: 180, sentiment: 0.62 },
        'faction-002': { volume: 120, sentiment: -0.74 }
      },
      publisherVolumes: {
        'pub-x': { volume: 145, sentiment: -0.38 },
        'pub-facebook': { volume: 85, sentiment: -0.42 },
        'pub-tiktok': { volume: 40, sentiment: -0.35 },
        'pub-nat-cnn': { volume: 28, sentiment: -0.55 },
        'pub-nat-fox': { volume: 32, sentiment: 0.48 },
        'pub-int-bbc': { volume: 45, sentiment: -0.28 },
        'pub-int-reuters': { volume: 38, sentiment: -0.12 },
        'pub-int-guardian': { volume: 22, sentiment: -0.58 }
      },
      factionSources: {
        'faction-001': { 'pub-x': 80, 'pub-facebook': 45, 'pub-tiktok': 20, 'pub-nat-fox': 30, 'pub-nat-cnn': 5 },
        'faction-002': { 'pub-x': 65, 'pub-facebook': 40, 'pub-tiktok': 20, 'pub-nat-cnn': 23, 'pub-int-bbc': 30, 'pub-int-guardian': 20 }
      },
      personIds: ['person-003', 'person-004', 'person-005', 'person-006'],
      organizationIds: ['org-008', 'org-009'],
      locationIds: ['loc-005', 'loc-006', 'loc-001'],
      eventIds: ['event-006', 'event-007', 'event-008', 'event-009'],
      volumeOverTime: [
        { date: '2026-01-20', factionVolumes: { 'faction-001': 180, 'faction-002': 120 }, publisherVolumes: { 'pub-x': 145, 'pub-facebook': 85, 'pub-tiktok': 40, 'pub-nat-cnn': 28, 'pub-nat-fox': 32, 'pub-int-bbc': 45, 'pub-int-reuters': 38, 'pub-int-guardian': 22 } }
      ],
      documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004'],
      createdAt: '2026-01-20T00:00:00Z'
    },
    {
      id: 'narr-006',
      text: 'DOJ escalates conflict with Minnesota over immigration enforcement',
      description: 'The Trump administration\'s Department of Justice is engaged in an intensifying confrontation with Minnesota state and local officials over immigration enforcement. DOJ plans to subpoena Minnesota Attorney General Keith Ellison, the governor, and Minneapolis mayor regarding alleged obstruction of federal officers during anti-ICE protests. The conflict deepened after DOJ appealed a judge\'s ruling restricting federal agents from arresting peaceful protesters or conducting warrantless car stops. Critics have denounced DOJ\'s handling of the fatal shooting of protester Renee Good by an ICE agent, noting that the FBI\'s civil rights investigation pivoted from the agent to investigating Good and her widow.',
      missionId: 'mission-003',
      status: 'under_investigation',
      sentiment: -0.68,
      subNarrativeIds: ['sub-012', 'sub-013', 'sub-014', 'sub-015'],
      factionMentions: {
        'faction-001': { volume: 160, sentiment: 0.72 },
        'faction-002': { volume: 140, sentiment: -0.81 },
        'faction-003': { volume: 185, sentiment: -0.85 },
        'faction-004': { volume: 95, sentiment: 0.65 }
      },
      publisherVolumes: {
        'pub-x': { volume: 220, sentiment: -0.55 },
        'pub-facebook': { volume: 145, sentiment: -0.48 },
        'pub-tiktok': { volume: 95, sentiment: -0.62 },
        'pub-instagram': { volume: 65, sentiment: -0.58 },
        'pub-reddit': { volume: 55, sentiment: -0.72 },
        'pub-nat-cnn': { volume: 42, sentiment: -0.45 },
        'pub-nat-fox': { volume: 38, sentiment: 0.68 },
        'pub-nat-msnbc': { volume: 35, sentiment: -0.72 },
        'pub-int-bbc': { volume: 18, sentiment: -0.22 },
        'pub-int-reuters': { volume: 15, sentiment: -0.08 }
      },
      factionSources: {
        'faction-001': { 'pub-x': 70, 'pub-facebook': 45, 'pub-nat-fox': 35, 'pub-reddit': 10 },
        'faction-002': { 'pub-x': 55, 'pub-facebook': 40, 'pub-tiktok': 25, 'pub-nat-cnn': 15, 'pub-nat-msnbc': 20 },
        'faction-003': { 'pub-x': 80, 'pub-tiktok': 60, 'pub-instagram': 50, 'pub-facebook': 45, 'pub-reddit': 35, 'pub-nat-cnn': 20, 'pub-nat-msnbc': 15 },
        'faction-004': { 'pub-x': 35, 'pub-facebook': 25, 'pub-nat-fox': 25, 'pub-reddit': 10 }
      },
      personIds: ['person-007', 'person-008', 'person-003'],
      organizationIds: ['org-010', 'org-011', 'org-012'],
      locationIds: ['loc-002', 'loc-001'],
      eventIds: ['event-010', 'event-011', 'event-012', 'event-013', 'event-014'],
      volumeOverTime: [
        { date: '2026-01-15', factionVolumes: { 'faction-001': 40, 'faction-002': 35, 'faction-003': 80, 'faction-004': 25 }, publisherVolumes: { 'pub-x': 60, 'pub-facebook': 35, 'pub-tiktok': 40, 'pub-instagram': 25, 'pub-nat-cnn': 10, 'pub-nat-fox': 8 } },
        { date: '2026-01-16', factionVolumes: { 'faction-001': 55, 'faction-002': 50, 'faction-003': 95, 'faction-004': 35 }, publisherVolumes: { 'pub-x': 85, 'pub-facebook': 50, 'pub-tiktok': 55, 'pub-instagram': 30, 'pub-nat-cnn': 15, 'pub-nat-fox': 12, 'pub-nat-msnbc': 10 } },
        { date: '2026-01-17', factionVolumes: { 'faction-001': 70, 'faction-002': 65, 'faction-003': 110, 'faction-004': 45 }, publisherVolumes: { 'pub-x': 105, 'pub-facebook': 65, 'pub-tiktok': 60, 'pub-instagram': 35, 'pub-reddit': 25, 'pub-nat-cnn': 20, 'pub-nat-fox': 18, 'pub-nat-msnbc': 15 } },
        { date: '2026-01-18', factionVolumes: { 'faction-001': 90, 'faction-002': 80, 'faction-003': 130, 'faction-004': 55 }, publisherVolumes: { 'pub-x': 130, 'pub-facebook': 85, 'pub-tiktok': 70, 'pub-instagram': 45, 'pub-reddit': 35, 'pub-nat-cnn': 28, 'pub-nat-fox': 25, 'pub-nat-msnbc': 22 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 120, 'faction-002': 100, 'faction-003': 150, 'faction-004': 70 }, publisherVolumes: { 'pub-x': 165, 'pub-facebook': 110, 'pub-tiktok': 80, 'pub-instagram': 55, 'pub-reddit': 45, 'pub-nat-cnn': 35, 'pub-nat-fox': 32, 'pub-nat-msnbc': 28 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 160, 'faction-002': 140, 'faction-003': 185, 'faction-004': 95 }, publisherVolumes: { 'pub-x': 220, 'pub-facebook': 145, 'pub-tiktok': 95, 'pub-instagram': 65, 'pub-reddit': 55, 'pub-nat-cnn': 42, 'pub-nat-fox': 38, 'pub-nat-msnbc': 35, 'pub-int-bbc': 18, 'pub-int-reuters': 15 } }
      ],
      documentIds: ['doc-005', 'doc-006', 'doc-007', 'doc-025'],
      createdAt: '2026-01-15T00:00:00Z'
    },
    {
      id: 'narr-007',
      text: 'Indiana judge and wife shot at home sparks concerns over judicial safety',
      description: 'Tippecanoe Superior Court Judge Steven Meyer and his wife Kimberly were shot at their Lafayette, Indiana home on Sunday afternoon. Both are in stable condition with arm and hip injuries respectively. The suspect remains at large as local, state, and federal agencies conduct an active investigation. The attack has prompted Indiana Supreme Court Chief Justice Loretta H. Rush to urge all state judges to "remain vigilant" about their security, highlighting broader concerns about violence targeting the judiciary.',
      missionId: 'mission-003',
      status: 'under_investigation',
      sentiment: -0.72,
      subNarrativeIds: ['sub-016', 'sub-017'],
      factionMentions: {
        'faction-001': { volume: 45, sentiment: -0.35 },
        'faction-002': { volume: 38, sentiment: -0.68 },
        'faction-004': { volume: 85, sentiment: -0.58 }
      },
      publisherVolumes: {
        'pub-x': { volume: 95, sentiment: -0.62 },
        'pub-facebook': { volume: 72, sentiment: -0.55 },
        'pub-reddit': { volume: 28, sentiment: -0.48 },
        'pub-nat-cnn': { volume: 18, sentiment: -0.42 },
        'pub-nat-fox': { volume: 22, sentiment: -0.38 },
        'pub-nat-nyt': { volume: 12, sentiment: -0.35 },
        'pub-int-bbc': { volume: 8, sentiment: -0.28 },
        'pub-int-reuters': { volume: 10, sentiment: -0.22 }
      },
      factionSources: {
        'faction-001': { 'pub-x': 20, 'pub-facebook': 15, 'pub-nat-fox': 18, 'pub-reddit': 5 },
        'faction-002': { 'pub-x': 18, 'pub-facebook': 12, 'pub-nat-cnn': 10, 'pub-reddit': 8 },
        'faction-004': { 'pub-x': 45, 'pub-facebook': 35, 'pub-nat-fox': 15, 'pub-nat-cnn': 8, 'pub-reddit': 12 }
      },
      personIds: ['person-009', 'person-010', 'person-011'],
      organizationIds: ['org-013', 'org-014', 'org-015'],
      locationIds: ['loc-007'],
      eventIds: ['event-015', 'event-016'],
      volumeOverTime: [
        { date: '2026-01-19', factionVolumes: { 'faction-001': 25, 'faction-002': 20, 'faction-004': 55 }, publisherVolumes: { 'pub-x': 55, 'pub-facebook': 40, 'pub-reddit': 15, 'pub-nat-cnn': 10, 'pub-nat-fox': 12 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 45, 'faction-002': 38, 'faction-004': 85 }, publisherVolumes: { 'pub-x': 95, 'pub-facebook': 72, 'pub-reddit': 28, 'pub-nat-cnn': 18, 'pub-nat-fox': 22, 'pub-nat-nyt': 12, 'pub-int-bbc': 8, 'pub-int-reuters': 10 } }
      ],
      documentIds: ['doc-013', 'doc-014'],
      createdAt: '2026-01-19T00:00:00Z'
    },
    {
      id: 'narr-008',
      text: 'Church protest targeting ICE pastor becomes flashpoint in Minnesota immigration battle',
      description: 'Anti-ICE protesters disrupted Sunday service at Cities Church in St. Paul, targeting David Easterwood, an ICE official who serves as a pastor there. The DOJ announced a FACE Act investigation within hours, with AG Pam Bondi declaring "attacks against law enforcement and intimidation of Christians" will be met with "full force of federal law." Assistant AG Harmeet Dhillon threatened charges against journalist Don Lemon who was present covering the protest. Trump called protesters "agitators and insurrectionists" who are "highly trained." Protest organizer Nekima Levy Armstrong defended the action, questioning how anyone "who claims to be Christian could condone" Easterwood\'s dual role. The incident highlights tensions between protecting religious spaces and protesting immigration enforcement, coming amid Operation Metro Surge which brought thousands of federal agents to Minnesota.',
      missionId: 'mission-003',
      status: 'in_progress',
      sentiment: -0.58,
      subNarrativeIds: ['sub-018', 'sub-019', 'sub-020', 'sub-021'],
      factionMentions: {
        'faction-001': { volume: 280, sentiment: 0.68 },
        'faction-002': { volume: 195, sentiment: -0.72 },
        'faction-003': { volume: 245, sentiment: -0.78 },
        'faction-004': { volume: 125, sentiment: 0.62 }
      },
      publisherVolumes: {
        'pub-x': { volume: 385, sentiment: -0.42 },
        'pub-facebook': { volume: 210, sentiment: -0.48 },
        'pub-tiktok': { volume: 165, sentiment: -0.55 },
        'pub-instagram': { volume: 95, sentiment: -0.52 },
        'pub-reddit': { volume: 78, sentiment: -0.62 },
        'pub-nat-cnn': { volume: 55, sentiment: -0.38 },
        'pub-nat-fox': { volume: 72, sentiment: 0.72 },
        'pub-nat-msnbc': { volume: 48, sentiment: -0.68 },
        'pub-nat-nyt': { volume: 28, sentiment: -0.32 },
        'pub-int-bbc': { volume: 22, sentiment: -0.18 },
        'pub-int-reuters': { volume: 18, sentiment: -0.12 }
      },
      factionSources: {
        'faction-001': { 'pub-x': 120, 'pub-facebook': 75, 'pub-nat-fox': 68, 'pub-reddit': 15, 'pub-tiktok': 25 },
        'faction-002': { 'pub-x': 85, 'pub-facebook': 55, 'pub-tiktok': 45, 'pub-nat-cnn': 30, 'pub-nat-msnbc': 35, 'pub-reddit': 25 },
        'faction-003': { 'pub-x': 130, 'pub-tiktok': 85, 'pub-instagram': 70, 'pub-facebook': 60, 'pub-reddit': 35, 'pub-nat-cnn': 20, 'pub-nat-msnbc': 12 },
        'faction-004': { 'pub-x': 50, 'pub-facebook': 35, 'pub-nat-fox': 45, 'pub-reddit': 10 }
      },
      personIds: ['person-003', 'person-012', 'person-013', 'person-014', 'person-015', 'person-016', 'person-019', 'person-020'],
      organizationIds: ['org-010', 'org-011', 'org-016', 'org-017', 'org-018', 'org-019'],
      locationIds: ['loc-008', 'loc-002', 'loc-001'],
      eventIds: ['event-017', 'event-018', 'event-019', 'event-020'],
      volumeOverTime: [
        { date: '2026-01-19', factionVolumes: { 'faction-001': 95, 'faction-002': 70, 'faction-003': 110, 'faction-004': 45 }, publisherVolumes: { 'pub-x': 145, 'pub-facebook': 85, 'pub-tiktok': 70, 'pub-instagram': 40, 'pub-reddit': 30, 'pub-nat-cnn': 22, 'pub-nat-fox': 28 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 185, 'faction-002': 125, 'faction-003': 165, 'faction-004': 85 }, publisherVolumes: { 'pub-x': 280, 'pub-facebook': 155, 'pub-tiktok': 120, 'pub-instagram': 72, 'pub-reddit': 58, 'pub-nat-cnn': 42, 'pub-nat-fox': 55, 'pub-nat-msnbc': 35 } },
        { date: '2026-01-21', factionVolumes: { 'faction-001': 280, 'faction-002': 195, 'faction-003': 245, 'faction-004': 125 }, publisherVolumes: { 'pub-x': 385, 'pub-facebook': 210, 'pub-tiktok': 165, 'pub-instagram': 95, 'pub-reddit': 78, 'pub-nat-cnn': 55, 'pub-nat-fox': 72, 'pub-nat-msnbc': 48, 'pub-nat-nyt': 28, 'pub-int-bbc': 22, 'pub-int-reuters': 18 } }
      ],
      documentIds: ['doc-008', 'doc-009', 'doc-010', 'doc-011', 'doc-012', 'doc-024'],
      createdAt: '2026-01-19T00:00:00Z'
    },
    {
      id: 'narr-009',
      text: 'Trump administration wins legal battles to expand immigration enforcement powers',
      description: 'The Trump administration secured multiple legal victories on Monday. A federal judge in Washington DC ruled that DHS can require lawmakers to provide a week\'s notice before inspecting immigration facilities, despite blocking an identical policy last month, because DHS claimed different funding sources. DOJ lawyers called Minnesota\'s lawsuit seeking to end the "federal invasion" an "absurdity" that would "render the supremacy of federal law an afterthought." The DOJ also appealed an injunction curbing aggressive ICE tactics against protesters. Meanwhile, DHS Secretary Kristi Noem backtracked on denials that federal agents used pepper spray, now claiming it was necessary to "establish law and order."',
      missionId: 'mission-003',
      status: 'new',
      sentiment: -0.48,
      subNarrativeIds: ['sub-022', 'sub-023', 'sub-024'],
      factionMentions: {
        'faction-001': { volume: 145, sentiment: 0.72 },
        'faction-002': { volume: 165, sentiment: -0.78 },
        'faction-003': { volume: 125, sentiment: -0.72 },
        'faction-004': { volume: 85, sentiment: 0.58 }
      },
      publisherVolumes: {
        'pub-x': { volume: 185, sentiment: -0.38 },
        'pub-facebook': { volume: 125, sentiment: -0.42 },
        'pub-reddit': { volume: 55, sentiment: -0.58 },
        'pub-nat-cnn': { volume: 38, sentiment: -0.45 },
        'pub-nat-fox': { volume: 45, sentiment: 0.68 },
        'pub-nat-nyt': { volume: 32, sentiment: -0.38 },
        'pub-nat-wapo': { volume: 28, sentiment: -0.42 },
        'pub-int-guardian': { volume: 22, sentiment: -0.52 },
        'pub-int-bbc': { volume: 18, sentiment: -0.28 },
        'pub-int-reuters': { volume: 15, sentiment: -0.15 }
      },
      factionSources: {
        'faction-001': { 'pub-x': 65, 'pub-facebook': 45, 'pub-nat-fox': 42, 'pub-reddit': 12 },
        'faction-002': { 'pub-x': 70, 'pub-facebook': 48, 'pub-nat-cnn': 25, 'pub-nat-nyt': 22, 'pub-nat-wapo': 20, 'pub-reddit': 28 },
        'faction-003': { 'pub-x': 55, 'pub-facebook': 38, 'pub-reddit': 18, 'pub-nat-cnn': 12, 'pub-int-guardian': 15 },
        'faction-004': { 'pub-x': 35, 'pub-facebook': 28, 'pub-nat-fox': 25, 'pub-reddit': 8 }
      },
      personIds: ['person-007', 'person-017', 'person-018', 'person-021', 'person-022', 'person-023', 'person-024', 'person-025'],
      organizationIds: ['org-010', 'org-011', 'org-017', 'org-020', 'org-021'],
      locationIds: ['loc-002', 'loc-008', 'loc-009'],
      eventIds: ['event-021', 'event-022', 'event-023', 'event-024', 'event-025'],
      volumeOverTime: [
        { date: '2026-01-20', factionVolumes: { 'faction-001': 145, 'faction-002': 165, 'faction-003': 125, 'faction-004': 85 }, publisherVolumes: { 'pub-x': 185, 'pub-facebook': 125, 'pub-reddit': 55, 'pub-nat-cnn': 38, 'pub-nat-fox': 45, 'pub-nat-nyt': 32, 'pub-nat-wapo': 28, 'pub-int-guardian': 22, 'pub-int-bbc': 18, 'pub-int-reuters': 15 } }
      ],
      documentIds: ['doc-006', 'doc-015', 'doc-016', 'doc-017'],
      createdAt: '2026-01-20T00:00:00Z'
    },
    {
      id: 'narr-010',
      text: 'RFK Jr\'s meat-heavy dietary guidelines face backlash over environmental and health impacts',
      description: 'The Trump administration\'s new dietary guidelines, championed by Health Secretary Robert F. Kennedy Jr., urge Americans to nearly double protein consumption through meat and dairy, featuring an inverted food pyramid emphasizing steak, poultry, and whole milk. Kennedy declared "we are ending the war on saturated fats." Critics warn the guidelines would devastate the environment—the World Resources Institute estimates a 25% increase in meat consumption would require 100 million additional acres of farmland (an area the size of California) and add hundreds of millions of tons of emissions. The guidelines contradict Kennedy\'s own past statements calling the factory meat industry a bigger threat than Osama bin Laden. HHS dismissed criticism as "radical dogma of the Green New Scam."',
      missionId: 'mission-002',
      status: 'new',
      sentiment: -0.55,
      subNarrativeIds: ['sub-025', 'sub-026', 'sub-027'],
      factionMentions: {
        'faction-001': { volume: 125, sentiment: 0.58 },
        'faction-005': { volume: 195, sentiment: -0.78 },
        'faction-006': { volume: 165, sentiment: -0.85 }
      },
      publisherVolumes: {
        'pub-x': { volume: 175, sentiment: -0.48 },
        'pub-facebook': { volume: 135, sentiment: -0.42 },
        'pub-tiktok': { volume: 145, sentiment: -0.55 },
        'pub-instagram': { volume: 95, sentiment: -0.52 },
        'pub-reddit': { volume: 68, sentiment: -0.62 },
        'pub-nat-cnn': { volume: 28, sentiment: -0.45 },
        'pub-nat-fox': { volume: 35, sentiment: 0.55 },
        'pub-nat-nyt': { volume: 22, sentiment: -0.52 },
        'pub-int-guardian': { volume: 32, sentiment: -0.68 },
        'pub-int-bbc': { volume: 18, sentiment: -0.38 }
      },
      factionSources: {
        'faction-001': { 'pub-x': 55, 'pub-facebook': 42, 'pub-nat-fox': 32, 'pub-tiktok': 25, 'pub-reddit': 12 },
        'faction-005': { 'pub-x': 72, 'pub-facebook': 55, 'pub-tiktok': 65, 'pub-instagram': 48, 'pub-reddit': 35, 'pub-nat-cnn': 18, 'pub-int-guardian': 25 },
        'faction-006': { 'pub-tiktok': 85, 'pub-instagram': 62, 'pub-x': 58, 'pub-facebook': 45, 'pub-reddit': 28, 'pub-int-guardian': 22 }
      },
      personIds: ['person-026', 'person-003'],
      organizationIds: ['org-022', 'org-023'],
      locationIds: ['loc-001'],
      eventIds: ['event-026'],
      volumeOverTime: [
        { date: '2026-01-18', factionVolumes: { 'faction-001': 45, 'faction-005': 75, 'faction-006': 65 }, publisherVolumes: { 'pub-x': 65, 'pub-facebook': 48, 'pub-tiktok': 55, 'pub-instagram': 35, 'pub-reddit': 25 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 85, 'faction-005': 135, 'faction-006': 115 }, publisherVolumes: { 'pub-x': 120, 'pub-facebook': 92, 'pub-tiktok': 105, 'pub-instagram': 68, 'pub-reddit': 48, 'pub-nat-cnn': 18, 'pub-nat-fox': 22 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 125, 'faction-005': 195, 'faction-006': 165 }, publisherVolumes: { 'pub-x': 175, 'pub-facebook': 135, 'pub-tiktok': 145, 'pub-instagram': 95, 'pub-reddit': 68, 'pub-nat-cnn': 28, 'pub-nat-fox': 35, 'pub-nat-nyt': 22, 'pub-int-guardian': 32, 'pub-int-bbc': 18 } }
      ],
      documentIds: ['doc-018', 'doc-019', 'doc-020'],
      createdAt: '2026-01-18T00:00:00Z'
    }
  ],

  subNarratives: [
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
      id: 'sub-009',
      text: 'Macron warns of international law being trampled at Davos',
      description: 'French President Emmanuel Macron delivered a thinly veiled critique of Trump\'s foreign policy at the World Economic Forum in Davos, warning of a world "where international law is trampled under foot" in response to Trump\'s aggressive stance on Greenland acquisition.',
      parentNarrativeId: 'narr-005',
      sentiment: -0.48,
      factionMentions: {
        'faction-001': { volume: 65, sentiment: -0.58 },
        'faction-002': { volume: 55, sentiment: 0.42 }
      },
      personIds: ['person-004', 'person-003'],
      organizationIds: ['org-009'],
      locationIds: ['loc-005'],
      eventIds: ['event-006'],
      volumeOverTime: [
        { date: '2026-01-20', factionVolumes: { 'faction-001': 65, 'faction-002': 55 } }
      ]
    },
    {
      id: 'sub-010',
      text: 'Trump shares private diplomatic messages on social media',
      description: 'President Trump posted private messages from world leaders on social media, including a message from French President Macron reading "I do not understand what you are doing on Greenland," raising concerns about diplomatic protocols and trust between allies.',
      parentNarrativeId: 'narr-005',
      sentiment: -0.61,
      factionMentions: {
        'faction-001': { volume: 70, sentiment: 0.55 },
        'faction-002': { volume: 80, sentiment: -0.72 }
      },
      personIds: ['person-003', 'person-004'],
      organizationIds: [],
      locationIds: ['loc-001'],
      eventIds: ['event-007'],
      volumeOverTime: [
        { date: '2026-01-20', factionVolumes: { 'faction-001': 70, 'faction-002': 80 } }
      ]
    },
    {
      id: 'sub-011',
      text: 'European leaders call for new form of independence from US',
      description: 'In response to Trump\'s Greenland threats and unpredictable foreign policy, European Commission President Ursula von der Leyen stated that "a new form of European independence" is needed to face "geopolitical shocks," while Greenland\'s Prime Minister called for respect of the world order.',
      parentNarrativeId: 'narr-005',
      sentiment: -0.35,
      factionMentions: {
        'faction-001': { volume: 45, sentiment: -0.48 },
        'faction-002': { volume: 60, sentiment: 0.38 }
      },
      personIds: ['person-005', 'person-006'],
      organizationIds: ['org-008'],
      locationIds: ['loc-005', 'loc-006'],
      eventIds: ['event-008', 'event-009'],
      volumeOverTime: [
        { date: '2026-01-20', factionVolumes: { 'faction-001': 45, 'faction-002': 60 } }
      ]
    },
    {
      id: 'sub-012',
      text: 'DOJ plans subpoenas for Minnesota AG, governor, and mayor',
      description: 'The Department of Justice plans to subpoena Minnesota Attorney General Keith Ellison, the state governor, and Minneapolis mayor related to an investigation of possible obstruction of federal officers during recent anti-ICE protests, escalating the confrontation between the Trump administration and Democratic state officials.',
      parentNarrativeId: 'narr-006',
      sentiment: -0.62,
      factionMentions: {
        'faction-001': { volume: 55, sentiment: 0.68 },
        'faction-002': { volume: 70, sentiment: -0.78 },
        'faction-003': { volume: 45, sentiment: -0.72 }
      },
      personIds: ['person-007'],
      organizationIds: ['org-010'],
      locationIds: ['loc-002'],
      eventIds: ['event-010'],
      volumeOverTime: [
        { date: '2026-01-20', factionVolumes: { 'faction-001': 55, 'faction-002': 70, 'faction-003': 45 } }
      ]
    },
    {
      id: 'sub-013',
      text: 'DOJ appeals ruling protecting peaceful protesters from federal agents',
      description: 'The Department of Justice appealed a judge\'s ruling that federal agents in Minnesota cannot arrest or use pepper spray on peaceful protesters or stop people in their cars without cause, seeking to expand federal enforcement powers during the immigration crackdown.',
      parentNarrativeId: 'narr-006',
      sentiment: -0.58,
      factionMentions: {
        'faction-001': { volume: 40, sentiment: 0.72 },
        'faction-002': { volume: 55, sentiment: -0.82 },
        'faction-003': { volume: 65, sentiment: -0.85 },
        'faction-004': { volume: 35, sentiment: 0.62 }
      },
      personIds: [],
      organizationIds: ['org-010', 'org-011'],
      locationIds: ['loc-002'],
      eventIds: ['event-011'],
      volumeOverTime: [
        { date: '2026-01-20', factionVolumes: { 'faction-001': 40, 'faction-002': 55, 'faction-003': 65, 'faction-004': 35 } }
      ]
    },
    {
      id: 'sub-014',
      text: 'DOJ investigates church protest where ICE agent preaches',
      description: 'The Department of Justice launched a separate investigation after demonstrators interrupted Sunday service at a church where an Immigration and Customs Enforcement agent reportedly preaches, expanding the scope of federal scrutiny of anti-ICE activism.',
      parentNarrativeId: 'narr-006',
      sentiment: -0.45,
      factionMentions: {
        'faction-001': { volume: 35, sentiment: 0.58 },
        'faction-002': { volume: 40, sentiment: -0.65 },
        'faction-003': { volume: 30, sentiment: -0.55 }
      },
      personIds: [],
      organizationIds: ['org-010', 'org-011'],
      locationIds: ['loc-002'],
      eventIds: ['event-012'],
      volumeOverTime: [
        { date: '2026-01-19', factionVolumes: { 'faction-001': 35, 'faction-002': 40, 'faction-003': 30 } }
      ]
    },
    {
      id: 'sub-015',
      text: 'FBI investigation pivots from ICE agent to slain protester Renee Good',
      description: 'Critics are denouncing the DOJ\'s handling of the fatal shooting of protester Renee Good in Minneapolis by an ICE agent. While the FBI briefly opened a civil rights investigation into the agent, the probe pivoted to investigating Good and those around her, including her widow, sparking outrage among civil rights advocates.',
      parentNarrativeId: 'narr-006',
      sentiment: -0.82,
      factionMentions: {
        'faction-001': { volume: 30, sentiment: 0.45 },
        'faction-002': { volume: 75, sentiment: -0.88 },
        'faction-003': { volume: 95, sentiment: -0.92 }
      },
      personIds: ['person-008'],
      organizationIds: ['org-011', 'org-012'],
      locationIds: ['loc-002'],
      eventIds: ['event-013', 'event-014'],
      volumeOverTime: [
        { date: '2026-01-15', factionVolumes: { 'faction-001': 10, 'faction-002': 25, 'faction-003': 45 } },
        { date: '2026-01-16', factionVolumes: { 'faction-001': 15, 'faction-002': 35, 'faction-003': 55 } },
        { date: '2026-01-17', factionVolumes: { 'faction-001': 18, 'faction-002': 45, 'faction-003': 65 } },
        { date: '2026-01-18', factionVolumes: { 'faction-001': 25, 'faction-002': 60, 'faction-003': 80 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 28, 'faction-002': 68, 'faction-003': 88 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 30, 'faction-002': 75, 'faction-003': 95 } }
      ]
    },
    {
      id: 'sub-016',
      text: 'Manhunt underway for suspect in Indiana judge shooting',
      description: 'Police are conducting an active investigation involving local, state, and federal agencies to find the person or people responsible for shooting Judge Steven Meyer and his wife at their Lafayette home. No motive or suspect description has been released. Mayor Tony Roswarski assured the community that every available resource is being used to apprehend those responsible for what he called "this senseless unacceptable act of violence."',
      parentNarrativeId: 'narr-007',
      sentiment: -0.65,
      factionMentions: {
        'faction-001': { volume: 25, sentiment: -0.42 },
        'faction-004': { volume: 60, sentiment: -0.55 }
      },
      personIds: ['person-009', 'person-010'],
      organizationIds: ['org-015'],
      locationIds: ['loc-007'],
      eventIds: ['event-015'],
      volumeOverTime: [
        { date: '2026-01-19', factionVolumes: { 'faction-001': 15, 'faction-004': 40 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 25, 'faction-004': 60 } }
      ]
    },
    {
      id: 'sub-017',
      text: 'Indiana Chief Justice warns judges to remain vigilant after shooting',
      description: 'Indiana Supreme Court Chief Justice Loretta H. Rush sent a letter to all state judges following the shooting, urging them to "please remain vigilant in your own security." She wrote, "I worry about the safety of all our judges. Any violence against a judge or a judge\'s family is completely unacceptable," highlighting growing concerns about threats to the judiciary.',
      parentNarrativeId: 'narr-007',
      sentiment: -0.58,
      factionMentions: {
        'faction-001': { volume: 20, sentiment: -0.28 },
        'faction-002': { volume: 18, sentiment: -0.52 },
        'faction-004': { volume: 45, sentiment: -0.48 }
      },
      personIds: ['person-011'],
      organizationIds: ['org-014'],
      locationIds: ['loc-007'],
      eventIds: ['event-016'],
      volumeOverTime: [
        { date: '2026-01-20', factionVolumes: { 'faction-001': 20, 'faction-002': 18, 'faction-004': 45 } }
      ]
    },
    {
      id: 'sub-018',
      text: 'DOJ invokes FACE Act to investigate church protest',
      description: 'Assistant Attorney General Harmeet Dhillon announced a federal investigation into the Cities Church protest within hours, citing the FACE Act which prohibits force or obstruction that interferes with religious worship. AG Pam Bondi declared that "attacks against law enforcement and the intimidation of Christians are being met with the full force of federal law." Deputy AG Todd Blanche said the Civil Rights Division sent experts to Minneapolis, with FBI and DHS also involved.',
      parentNarrativeId: 'narr-008',
      sentiment: -0.52,
      factionMentions: {
        'faction-001': { volume: 85, sentiment: 0.75 },
        'faction-002': { volume: 65, sentiment: -0.78 },
        'faction-003': { volume: 55, sentiment: -0.82 },
        'faction-004': { volume: 48, sentiment: 0.68 }
      },
      personIds: ['person-012', 'person-013'],
      organizationIds: ['org-010', 'org-012', 'org-017'],
      locationIds: ['loc-008', 'loc-001'],
      eventIds: ['event-018'],
      volumeOverTime: [
        { date: '2026-01-19', factionVolumes: { 'faction-001': 35, 'faction-002': 25, 'faction-003': 20, 'faction-004': 18 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 85, 'faction-002': 65, 'faction-003': 55, 'faction-004': 48 } }
      ]
    },
    {
      id: 'sub-019',
      text: 'DOJ threatens charges against journalist Don Lemon',
      description: 'Harmeet Dhillon singled out former CNN anchor Don Lemon, who was present at the protest, saying he is "on notice" and cannot use journalism as a "shield." Lemon responded that he was covering the protest as a journalist, not participating. He noted receiving "violent threats, along with homophobic and racist slurs" from "MAGA supporters." Lemon said it was "telling" that he was "cast as the face of a protest I was covering."',
      parentNarrativeId: 'narr-008',
      sentiment: -0.68,
      factionMentions: {
        'faction-001': { volume: 95, sentiment: 0.62 },
        'faction-002': { volume: 72, sentiment: -0.85 },
        'faction-003': { volume: 58, sentiment: -0.78 }
      },
      personIds: ['person-012', 'person-016'],
      organizationIds: ['org-010'],
      locationIds: ['loc-008'],
      eventIds: ['event-019'],
      volumeOverTime: [
        { date: '2026-01-20', factionVolumes: { 'faction-001': 95, 'faction-002': 72, 'faction-003': 58 } }
      ]
    },
    {
      id: 'sub-020',
      text: 'Trump calls church protesters agitators and insurrectionists',
      description: 'President Trump posted on Truth Social that the protesters were "agitators and insurrectionists" who are "professionals" and "highly trained to scream, rant, and rave, like lunatics." He said they "should be thrown in jail, or thrown out of the Country." DHS official Tricia McLaughlin blamed Minnesota Gov. Tim Walz and Minneapolis Mayor Jacob Frey "for whipping these mobs into a frenzy."',
      parentNarrativeId: 'narr-008',
      sentiment: -0.72,
      factionMentions: {
        'faction-001': { volume: 120, sentiment: 0.78 },
        'faction-002': { volume: 85, sentiment: -0.88 },
        'faction-003': { volume: 95, sentiment: -0.92 }
      },
      personIds: ['person-003', 'person-019', 'person-020'],
      organizationIds: ['org-017'],
      locationIds: ['loc-001'],
      eventIds: ['event-020'],
      volumeOverTime: [
        { date: '2026-01-21', factionVolumes: { 'faction-001': 120, 'faction-002': 85, 'faction-003': 95 } }
      ]
    },
    {
      id: 'sub-021',
      text: 'Protest organizer questions how Christian pastor can lead ICE operations',
      description: 'Nekima Levy Armstrong, former Minneapolis NAACP president and protest organizer, told CNN she doesn\'t "know how anyone who claims to be Christian could condone" Easterwood\'s behavior, calling it "unconscionable and unacceptable for someone to claim to serve as a pastor while also being responsible for a lot of what is happening here." She argued the Trump administration has "rolled back protections" for churches by allowing enforcement in protected spaces.',
      parentNarrativeId: 'narr-008',
      sentiment: -0.45,
      factionMentions: {
        'faction-001': { volume: 35, sentiment: -0.72 },
        'faction-002': { volume: 68, sentiment: 0.58 },
        'faction-003': { volume: 88, sentiment: 0.72 }
      },
      personIds: ['person-015', 'person-014'],
      organizationIds: ['org-018', 'org-016'],
      locationIds: ['loc-008'],
      eventIds: ['event-017'],
      volumeOverTime: [
        { date: '2026-01-19', factionVolumes: { 'faction-001': 15, 'faction-002': 35, 'faction-003': 48 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 35, 'faction-002': 68, 'faction-003': 88 } }
      ]
    },
    {
      id: 'sub-022',
      text: 'Judge allows DHS to block lawmakers from ICE facility inspections',
      description: 'Federal judge Jia Cobb ruled that DHS can continue requiring lawmakers provide a week\'s notice before inspecting immigration facilities, despite blocking an identical policy in December. DHS claimed it was now enforcing the policy using different funding from Trump\'s "big, beautiful bill." Three Minnesota Democrats—Ilhan Omar, Angie Craig, and Kelly Morrison—said they were illegally blocked from inspecting an ICE detention center earlier this month. Congressman Joe Neguse said "no-notice inspections were essential" and the law is "crystal-clear."',
      parentNarrativeId: 'narr-009',
      sentiment: -0.55,
      factionMentions: {
        'faction-001': { volume: 48, sentiment: 0.68 },
        'faction-002': { volume: 72, sentiment: -0.82 },
        'faction-003': { volume: 38, sentiment: -0.72 }
      },
      personIds: ['person-021', 'person-022', 'person-023', 'person-024', 'person-025'],
      organizationIds: ['org-017', 'org-011', 'org-020'],
      locationIds: ['loc-002', 'loc-009'],
      eventIds: ['event-021', 'event-022'],
      volumeOverTime: [
        { date: '2026-01-20', factionVolumes: { 'faction-001': 48, 'faction-002': 72, 'faction-003': 38 } }
      ]
    },
    {
      id: 'sub-023',
      text: 'DOJ calls Minnesota lawsuit against federal immigration surge an absurdity',
      description: 'DOJ lawyers responded to the lawsuit brought by Minnesota, Minneapolis, and St. Paul seeking to end ICE activities, calling it "an absurdity" that would "render the supremacy of federal law an afterthought to local preferences." They argued an injunction would be "unprecedented judicial overreach." AG Keith Ellison said cities were being "terrorized" by federal actions including the shooting death of Renee Good. Judge Katherine Menendez indicated she might hold another hearing.',
      parentNarrativeId: 'narr-009',
      sentiment: -0.62,
      factionMentions: {
        'faction-001': { volume: 55, sentiment: 0.75 },
        'faction-002': { volume: 68, sentiment: -0.85 },
        'faction-003': { volume: 58, sentiment: -0.78 }
      },
      personIds: ['person-007', 'person-017', 'person-008'],
      organizationIds: ['org-010', 'org-011'],
      locationIds: ['loc-002', 'loc-008'],
      eventIds: ['event-023'],
      volumeOverTime: [
        { date: '2026-01-20', factionVolumes: { 'faction-001': 55, 'faction-002': 68, 'faction-003': 58 } }
      ]
    },
    {
      id: 'sub-024',
      text: 'Noem backtracks on pepper spray denial, says it was needed for law and order',
      description: 'DHS Secretary Kristi Noem reversed her earlier insistence that federal agents had not used chemical substances including pepper spray against crowds protesting ICE actions. She now claimed the use of pepper spray was necessary to "establish law and order." The DOJ also announced it was appealing Judge Menendez\'s Friday injunction that curbed aggressive ICE tactics including retaliation against protesters and use of pepper spray.',
      parentNarrativeId: 'narr-009',
      sentiment: -0.58,
      factionMentions: {
        'faction-001': { volume: 42, sentiment: 0.55 },
        'faction-002': { volume: 58, sentiment: -0.82 },
        'faction-003': { volume: 65, sentiment: -0.85 }
      },
      personIds: ['person-018', 'person-017'],
      organizationIds: ['org-017', 'org-010', 'org-021'],
      locationIds: ['loc-001', 'loc-002'],
      eventIds: ['event-024', 'event-025'],
      volumeOverTime: [
        { date: '2026-01-19', factionVolumes: { 'faction-001': 25, 'faction-002': 35, 'faction-003': 42 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 42, 'faction-002': 58, 'faction-003': 65 } }
      ]
    },
    {
      id: 'sub-025',
      text: 'New food pyramid emphasizes meat and ends war on saturated fats',
      description: 'The Trump administration released a new inverted food pyramid emphasizing pictures of steak, poultry, ground beef, and whole milk as the most important foods to eat. RFK Jr declared "Protein and healthy fats are essential and were wrongly discouraged in prior dietary guidelines. We are ending the war on saturated fats." The guidelines are designed to nearly double the amount of protein currently consumed by Americans, dismissing an independent scientific committee\'s advice to emphasize plant-based proteins.',
      parentNarrativeId: 'narr-010',
      sentiment: -0.42,
      factionMentions: {
        'faction-001': { volume: 65, sentiment: 0.72 },
        'faction-005': { volume: 55, sentiment: -0.68 },
        'faction-006': { volume: 72, sentiment: -0.82 }
      },
      personIds: ['person-026'],
      organizationIds: ['org-022'],
      locationIds: ['loc-001'],
      eventIds: ['event-026'],
      volumeOverTime: [
        { date: '2026-01-18', factionVolumes: { 'faction-001': 35, 'faction-005': 28, 'faction-006': 38 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 52, 'faction-005': 42, 'faction-006': 58 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 65, 'faction-005': 55, 'faction-006': 72 } }
      ]
    },
    {
      id: 'sub-026',
      text: 'Scientists warn meat guidelines would require 100 million acres of new farmland',
      description: 'The World Resources Institute estimates that even a 25% increase in protein consumption through meat would require about 100 million acres of additional agricultural land each year—an area the size of California—and add hundreds of millions of tons of extra emissions. "We are seeing millions of acres of forest cut down and agricultural expansion is the lead driver of that," said WRI\'s Richard Waite. Researchers note beef requires 20 times more land and emits 20 times more greenhouse gases per gram of protein than plant proteins like beans.',
      parentNarrativeId: 'narr-010',
      sentiment: -0.72,
      factionMentions: {
        'faction-001': { volume: 28, sentiment: -0.35 },
        'faction-005': { volume: 95, sentiment: -0.82 },
        'faction-006': { volume: 68, sentiment: -0.78 }
      },
      personIds: [],
      organizationIds: ['org-023'],
      locationIds: [],
      eventIds: [],
      volumeOverTime: [
        { date: '2026-01-19', factionVolumes: { 'faction-001': 15, 'faction-005': 55, 'faction-006': 42 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 28, 'faction-005': 95, 'faction-006': 68 } }
      ]
    },
    {
      id: 'sub-027',
      text: 'RFK Jr\'s past statements on meat industry contradict new guidelines',
      description: 'Critics highlight that RFK Jr\'s new pro-meat guidelines contradict his past environmental activism. In 2004, Kennedy wrote that "the factory meat industry has polluted thousands of miles of America\'s rivers, killed billions of fish, pushed tens of thousands of family farmers off their land, sickened and killed thousands of US citizens." He even said the pork industry was "a bigger threat to the US than Osama bin Laden." HHS dismissed criticism as "radical dogma of the Green New Scam."',
      parentNarrativeId: 'narr-010',
      sentiment: -0.58,
      factionMentions: {
        'faction-001': { volume: 32, sentiment: 0.45 },
        'faction-005': { volume: 78, sentiment: -0.75 },
        'faction-006': { volume: 55, sentiment: -0.72 }
      },
      personIds: ['person-026'],
      organizationIds: ['org-022'],
      locationIds: [],
      eventIds: [],
      volumeOverTime: [
        { date: '2026-01-20', factionVolumes: { 'faction-001': 32, 'faction-005': 78, 'faction-006': 55 } }
      ]
    }
  ],

  factions: [
    {
      id: 'faction-001',
      name: 'American Right Wing',
      color: '#E15759',
      relatedFactionIds: ['faction-004'],
      memberCount: 15000000,
      affiliatedPersonIds: ['person-003'],
      affiliatedOrganizationIds: ['org-005']
    },
    {
      id: 'faction-002',
      name: 'Democratic Socialists of America',
      color: '#4E79A7',
      relatedFactionIds: ['faction-003'],
      memberCount: 500000,
      affiliatedPersonIds: [],
      affiliatedOrganizationIds: ['org-006']
    },
    {
      id: 'faction-003',
      name: 'BLM Supporters',
      color: '#B07AA1',
      relatedFactionIds: ['faction-002'],
      memberCount: 8000000,
      affiliatedPersonIds: [],
      affiliatedOrganizationIds: []
    },
    {
      id: 'faction-004',
      name: 'Law Enforcement Supporters',
      color: '#59A14F',
      relatedFactionIds: ['faction-001'],
      memberCount: 12000000,
      affiliatedPersonIds: [],
      affiliatedOrganizationIds: ['org-002']
    },
    {
      id: 'faction-005',
      name: 'Health Activists',
      color: '#76B7B2',
      relatedFactionIds: ['faction-006'],
      memberCount: 5000000,
      affiliatedPersonIds: [],
      affiliatedOrganizationIds: []
    },
    {
      id: 'faction-006',
      name: 'Vegans',
      color: '#F28E2B',
      relatedFactionIds: ['faction-005'],
      memberCount: 8000000,
      affiliatedPersonIds: [],
      affiliatedOrganizationIds: ['org-004']
    }
  ],

  factionOverlaps: [
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
      id: 'loc-004',
      name: 'Capitol Building, Washington D.C.',
      coordinates: { lat: 38.8899, lng: -77.0091 },
      type: 'landmark'
    },
    {
      id: 'loc-005',
      name: 'Davos, Switzerland',
      coordinates: { lat: 46.8027, lng: 9.8360 },
      type: 'city'
    },
    {
      id: 'loc-006',
      name: 'Greenland',
      coordinates: { lat: 71.7069, lng: -42.6043 },
      type: 'territory'
    },
    {
      id: 'loc-007',
      name: 'Lafayette, Indiana',
      coordinates: { lat: 40.4167, lng: -86.8753 },
      type: 'city'
    },
    {
      id: 'loc-008',
      name: 'St. Paul, Minnesota',
      coordinates: { lat: 44.9537, lng: -93.0900 },
      type: 'city'
    },
    {
      id: 'loc-009',
      name: 'Washington, D.C.',
      coordinates: { lat: 38.9072, lng: -77.0369 },
      type: 'city'
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
      id: 'event-006',
      text: 'Macron criticizes Trump foreign policy at Davos',
      date: '2026-01-20T10:00:00Z',
      parentEventId: null,
      subEventIds: [],
      locationId: 'loc-005',
      personIds: ['person-004', 'person-003'],
      organizationIds: ['org-009']
    },
    {
      id: 'event-007',
      text: 'Trump shares private diplomatic messages on social media',
      date: '2026-01-20T11:30:00Z',
      parentEventId: null,
      subEventIds: [],
      locationId: 'loc-001',
      personIds: ['person-003', 'person-004'],
      organizationIds: []
    },
    {
      id: 'event-008',
      text: 'Greenland PM calls for respect of world order',
      date: '2026-01-20T12:00:00Z',
      parentEventId: null,
      subEventIds: [],
      locationId: 'loc-006',
      personIds: ['person-006'],
      organizationIds: []
    },
    {
      id: 'event-009',
      text: 'Von der Leyen calls for European independence',
      date: '2026-01-20T13:00:00Z',
      parentEventId: null,
      subEventIds: [],
      locationId: 'loc-005',
      personIds: ['person-005'],
      organizationIds: ['org-008']
    },
    {
      id: 'event-010',
      text: 'DOJ plans subpoenas for Minnesota officials',
      date: '2026-01-20T12:00:00Z',
      parentEventId: null,
      subEventIds: [],
      locationId: 'loc-002',
      personIds: ['person-007'],
      organizationIds: ['org-010']
    },
    {
      id: 'event-011',
      text: 'DOJ appeals ruling restricting federal agents in Minnesota',
      date: '2026-01-20T10:00:00Z',
      parentEventId: null,
      subEventIds: [],
      locationId: 'loc-002',
      personIds: [],
      organizationIds: ['org-010', 'org-011']
    },
    {
      id: 'event-012',
      text: 'DOJ investigates church protest interruption',
      date: '2026-01-19T11:00:00Z',
      parentEventId: null,
      subEventIds: [],
      locationId: 'loc-002',
      personIds: [],
      organizationIds: ['org-010', 'org-011']
    },
    {
      id: 'event-013',
      text: 'Protester Renee Good fatally shot by ICE agent',
      date: '2026-01-15T00:00:00Z',
      parentEventId: null,
      subEventIds: ['event-014'],
      locationId: 'loc-002',
      personIds: ['person-008'],
      organizationIds: ['org-011']
    },
    {
      id: 'event-014',
      text: 'FBI investigation pivots from agent to victim and her widow',
      date: '2026-01-18T00:00:00Z',
      parentEventId: 'event-013',
      subEventIds: [],
      locationId: 'loc-002',
      personIds: ['person-008'],
      organizationIds: ['org-012']
    },
    {
      id: 'event-015',
      text: 'Indiana Judge Steven Meyer and wife shot at home',
      date: '2026-01-19T15:00:00Z',
      parentEventId: null,
      subEventIds: ['event-016'],
      locationId: 'loc-007',
      personIds: ['person-009', 'person-010'],
      organizationIds: ['org-013', 'org-015']
    },
    {
      id: 'event-016',
      text: 'Indiana Supreme Court Chief Justice urges judges to remain vigilant',
      date: '2026-01-20T10:00:00Z',
      parentEventId: 'event-015',
      subEventIds: [],
      locationId: 'loc-007',
      personIds: ['person-011'],
      organizationIds: ['org-014']
    },
    {
      id: 'event-017',
      text: 'Protesters disrupt Cities Church service targeting ICE official pastor',
      date: '2026-01-19T10:00:00Z',
      parentEventId: null,
      subEventIds: ['event-018', 'event-019', 'event-020'],
      locationId: 'loc-008',
      personIds: ['person-014', 'person-015', 'person-016'],
      organizationIds: ['org-016', 'org-011']
    },
    {
      id: 'event-018',
      text: 'DOJ announces FACE Act investigation into church protest',
      date: '2026-01-19T18:00:00Z',
      parentEventId: 'event-017',
      subEventIds: [],
      locationId: 'loc-001',
      personIds: ['person-012', 'person-013'],
      organizationIds: ['org-010']
    },
    {
      id: 'event-019',
      text: 'DOJ threatens charges against journalist Don Lemon',
      date: '2026-01-20T12:00:00Z',
      parentEventId: 'event-017',
      subEventIds: [],
      locationId: 'loc-001',
      personIds: ['person-012', 'person-016'],
      organizationIds: ['org-010']
    },
    {
      id: 'event-020',
      text: 'Trump calls protesters agitators and insurrectionists',
      date: '2026-01-21T06:00:00Z',
      parentEventId: 'event-017',
      subEventIds: [],
      locationId: 'loc-001',
      personIds: ['person-003'],
      organizationIds: []
    },
    {
      id: 'event-021',
      text: 'DHS blocks Minnesota lawmakers from ICE detention facility inspection',
      date: '2026-01-10T14:00:00Z',
      parentEventId: null,
      subEventIds: ['event-022'],
      locationId: 'loc-002',
      personIds: ['person-021', 'person-022', 'person-023'],
      organizationIds: ['org-017', 'org-011', 'org-020']
    },
    {
      id: 'event-022',
      text: 'Judge Cobb allows DHS to require week notice for facility inspections',
      date: '2026-01-20T12:00:00Z',
      parentEventId: 'event-021',
      subEventIds: [],
      locationId: 'loc-009',
      personIds: ['person-025', 'person-024'],
      organizationIds: ['org-017']
    },
    {
      id: 'event-023',
      text: 'DOJ calls Minnesota lawsuit an absurdity',
      date: '2026-01-20T15:00:00Z',
      parentEventId: null,
      subEventIds: [],
      locationId: 'loc-002',
      personIds: ['person-007', 'person-017'],
      organizationIds: ['org-010']
    },
    {
      id: 'event-024',
      text: 'DOJ appeals Menendez injunction to Eighth Circuit',
      date: '2026-01-20T16:00:00Z',
      parentEventId: null,
      subEventIds: [],
      locationId: 'loc-002',
      personIds: ['person-017'],
      organizationIds: ['org-010', 'org-021']
    },
    {
      id: 'event-025',
      text: 'Noem backtracks on pepper spray denial',
      date: '2026-01-19T18:00:00Z',
      parentEventId: null,
      subEventIds: [],
      locationId: 'loc-001',
      personIds: ['person-018'],
      organizationIds: ['org-017']
    },
    {
      id: 'event-026',
      text: 'RFK Jr releases meat-heavy dietary guidelines',
      date: '2026-01-18T00:00:00Z',
      parentEventId: null,
      subEventIds: [],
      locationId: 'loc-001',
      personIds: ['person-026'],
      organizationIds: ['org-022']
    }
  ],

  persons: [
    {
      id: 'person-001',
      name: 'Joe Biden',
      type: 'politician',
      imageUrl: 'img/entities/main/person-001.jpg',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-001', 'loc-004'],
      relatedEventIds: ['event-001'],
      factionSentiment: {
        'faction-001': -0.82,
        'faction-002': -0.28,
        'faction-003': 0.15
      }
    },
    {
      id: 'person-003',
      name: 'Donald Trump',
      type: 'politician',
      imageUrl: 'img/entities/main/person-003.jpg',
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-001', 'loc-004', 'loc-006'],
      relatedEventIds: ['event-006', 'event-007', 'event-008'],
      documentIds: ['doc-001', 'doc-002', 'doc-004', 'doc-011'],
      factionSentiment: {
        'faction-001': 0.67,
        'faction-002': -0.78,
        'faction-003': -0.69
      }
    },
    {
      id: 'person-004',
      name: 'Emmanuel Macron',
      type: 'politician',
      imageUrl: 'img/entities/main/person-004.jpg',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-005'],
      relatedEventIds: ['event-006', 'event-007'],
      documentIds: ['doc-001', 'doc-002'],
      factionSentiment: {
        'faction-001': -0.45,
        'faction-002': 0.32
      }
    },
    {
      id: 'person-005',
      name: 'Ursula von der Leyen',
      type: 'politician',
      imageUrl: 'img/entities/main/person-005.jpg',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-005'],
      relatedEventIds: ['event-009'],
      documentIds: ['doc-003'],
      factionSentiment: {
        'faction-001': -0.38,
        'faction-002': 0.25
      }
    },
    {
      id: 'person-006',
      name: 'Múte Bourup Egede',
      type: 'politician',
      imageUrl: 'img/entities/main/person-006.jpg',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-006'],
      relatedEventIds: ['event-008'],
      documentIds: ['doc-004'],
      factionSentiment: {
        'faction-001': -0.22,
        'faction-002': 0.41
      }
    },
    {
      id: 'person-007',
      name: 'Keith Ellison',
      type: 'politician',
      imageUrl: 'img/entities/main/person-007.jpg',
      affiliatedFactionIds: ['faction-002'],
      relatedLocationIds: ['loc-002'],
      relatedEventIds: ['event-010'],
      documentIds: ['doc-005', 'doc-016'],
      factionSentiment: {
        'faction-001': -0.72,
        'faction-002': 0.65,
        'faction-003': 0.58
      }
    },
    {
      id: 'person-008',
      name: 'Renee Good',
      type: 'civilian',
      imageUrl: null,
      affiliatedFactionIds: ['faction-003'],
      relatedLocationIds: ['loc-002'],
      relatedEventIds: ['event-013'],
      documentIds: ['doc-007'],
      factionSentiment: {
        'faction-001': -0.45,
        'faction-002': 0.72,
        'faction-003': 0.85
      }
    },
    {
      id: 'person-009',
      name: 'Steven Meyer',
      type: 'judge',
      imageUrl: null,
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-007'],
      relatedEventIds: ['event-015'],
      documentIds: ['doc-013'],
      factionSentiment: {
        'faction-001': 0.15,
        'faction-002': 0.12,
        'faction-004': 0.45
      }
    },
    {
      id: 'person-010',
      name: 'Kimberly Meyer',
      type: 'civilian',
      imageUrl: null,
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-007'],
      relatedEventIds: ['event-015'],
      documentIds: ['doc-013'],
      factionSentiment: {}
    },
    {
      id: 'person-011',
      name: 'Loretta H. Rush',
      type: 'judge',
      imageUrl: 'img/entities/main/person-011.jpg',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-007'],
      relatedEventIds: ['event-016'],
      documentIds: ['doc-014'],
      factionSentiment: {
        'faction-004': 0.52
      }
    },
    {
      id: 'person-012',
      name: 'Harmeet Dhillon',
      type: 'government_official',
      imageUrl: 'img/entities/main/person-012.jpg',
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-001', 'loc-008'],
      relatedEventIds: ['event-017', 'event-019'],
      documentIds: ['doc-009', 'doc-010'],
      factionSentiment: {
        'faction-001': 0.72,
        'faction-002': -0.68,
        'faction-003': -0.75
      }
    },
    {
      id: 'person-013',
      name: 'Pam Bondi',
      type: 'government_official',
      imageUrl: 'img/entities/main/person-013.jpg',
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-001'],
      relatedEventIds: ['event-017'],
      documentIds: ['doc-009'],
      factionSentiment: {
        'faction-001': 0.68,
        'faction-002': -0.72,
        'faction-003': -0.78
      }
    },
    {
      id: 'person-014',
      name: 'David Easterwood',
      type: 'government_official',
      imageUrl: 'img/entities/main/person-014.jpg',
      affiliatedFactionIds: ['faction-004'],
      relatedLocationIds: ['loc-008'],
      relatedEventIds: ['event-017'],
      documentIds: ['doc-008', 'doc-012', 'doc-024'],
      factionSentiment: {
        'faction-001': 0.55,
        'faction-002': -0.82,
        'faction-003': -0.88,
        'faction-004': 0.48
      }
    },
    {
      id: 'person-015',
      name: 'Nekima Levy Armstrong',
      type: 'activist',
      imageUrl: 'img/entities/main/person-015.jpg',
      affiliatedFactionIds: ['faction-003'],
      relatedLocationIds: ['loc-002', 'loc-008'],
      relatedEventIds: ['event-017'],
      documentIds: ['doc-008', 'doc-012'],
      factionSentiment: {
        'faction-001': -0.72,
        'faction-002': 0.58,
        'faction-003': 0.82
      }
    },
    {
      id: 'person-016',
      name: 'Don Lemon',
      type: 'journalist',
      imageUrl: 'img/entities/main/person-016.jpg',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-008'],
      relatedEventIds: ['event-017', 'event-019'],
      documentIds: ['doc-010'],
      factionSentiment: {
        'faction-001': -0.78,
        'faction-002': 0.52,
        'faction-003': 0.48
      }
    },
    {
      id: 'person-017',
      name: 'Katherine Menendez',
      type: 'judge',
      imageUrl: 'img/entities/main/person-017.jpg',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-002'],
      relatedEventIds: ['event-011'],
      documentIds: ['doc-006', 'doc-016'],
      factionSentiment: {
        'faction-001': -0.45,
        'faction-002': 0.38,
        'faction-003': 0.42
      }
    },
    {
      id: 'person-018',
      name: 'Kristi Noem',
      type: 'government_official',
      imageUrl: 'img/entities/main/person-018.jpg',
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-001', 'loc-002'],
      relatedEventIds: [],
      documentIds: ['doc-017'],
      factionSentiment: {
        'faction-001': 0.75,
        'faction-002': -0.72,
        'faction-003': -0.78
      }
    },
    {
      id: 'person-019',
      name: 'Tim Walz',
      type: 'politician',
      imageUrl: 'img/entities/main/person-019.jpg',
      affiliatedFactionIds: ['faction-002'],
      relatedLocationIds: ['loc-002', 'loc-008'],
      relatedEventIds: [],
      factionSentiment: {
        'faction-001': -0.68,
        'faction-002': 0.62,
        'faction-003': 0.55
      }
    },
    {
      id: 'person-020',
      name: 'Jacob Frey',
      type: 'politician',
      imageUrl: 'img/entities/main/person-020.jpg',
      affiliatedFactionIds: ['faction-002'],
      relatedLocationIds: ['loc-002'],
      relatedEventIds: [],
      factionSentiment: {
        'faction-001': -0.58,
        'faction-002': 0.48,
        'faction-003': 0.52
      }
    },
    {
      id: 'person-021',
      name: 'Ilhan Omar',
      type: 'politician',
      imageUrl: 'img/entities/main/person-021.jpg',
      affiliatedFactionIds: ['faction-002', 'faction-003'],
      relatedLocationIds: ['loc-002', 'loc-009'],
      relatedEventIds: ['event-021'],
      documentIds: ['doc-015'],
      factionSentiment: {
        'faction-001': -0.85,
        'faction-002': 0.72,
        'faction-003': 0.78
      }
    },
    {
      id: 'person-022',
      name: 'Angie Craig',
      type: 'politician',
      imageUrl: 'img/entities/main/person-022.jpg',
      affiliatedFactionIds: ['faction-002'],
      relatedLocationIds: ['loc-002', 'loc-009'],
      relatedEventIds: ['event-021'],
      documentIds: ['doc-015'],
      factionSentiment: {
        'faction-001': -0.52,
        'faction-002': 0.58
      }
    },
    {
      id: 'person-023',
      name: 'Kelly Morrison',
      type: 'politician',
      imageUrl: 'img/entities/main/person-023.jpg',
      affiliatedFactionIds: ['faction-002'],
      relatedLocationIds: ['loc-002', 'loc-009'],
      relatedEventIds: ['event-021'],
      documentIds: ['doc-015'],
      factionSentiment: {
        'faction-001': -0.48,
        'faction-002': 0.55
      }
    },
    {
      id: 'person-024',
      name: 'Joe Neguse',
      type: 'politician',
      imageUrl: 'img/entities/main/person-024.jpg',
      affiliatedFactionIds: ['faction-002'],
      relatedLocationIds: ['loc-009'],
      relatedEventIds: ['event-022'],
      documentIds: ['doc-015'],
      factionSentiment: {
        'faction-001': -0.55,
        'faction-002': 0.62
      }
    },
    {
      id: 'person-025',
      name: 'Jia Cobb',
      type: 'judge',
      imageUrl: 'img/entities/main/person-025.jpg',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-009'],
      relatedEventIds: ['event-022'],
      documentIds: ['doc-015'],
      factionSentiment: {
        'faction-001': -0.35,
        'faction-002': 0.28
      }
    },
    {
      id: 'person-026',
      name: 'Robert F. Kennedy Jr.',
      type: 'government_official',
      imageUrl: 'img/entities/main/person-026.jpg',
      affiliatedFactionIds: ['faction-001', 'faction-005'],
      relatedLocationIds: ['loc-001'],
      relatedEventIds: ['event-026'],
      documentIds: ['doc-018', 'doc-020'],
      factionSentiment: {
        'faction-001': 0.58,
        'faction-002': -0.65,
        'faction-005': 0.42,
        'faction-006': -0.72
      }
    }
  ],

  organizations: [
    {
      id: 'org-001',
      name: 'Democratic Party',
      type: 'political',
      imageUrl: 'img/entities/main/org-001.png',
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
      imageUrl: 'img/entities/main/org-002.png',
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
      imageUrl: 'img/entities/main/org-003.png',
      affiliatedFactionIds: [],
      relatedLocationIds: [],
      documentIds: ['doc-021'],
      factionSentiment: {
        'faction-005': -0.67,
        'faction-006': -0.52
      }
    },
    {
      id: 'org-004',
      name: 'TikTok',
      type: 'platform',
      imageUrl: 'img/entities/main/org-004.svg',
      affiliatedFactionIds: [],
      relatedLocationIds: [],
      documentIds: ['doc-023'],
      factionSentiment: {
        'faction-006': 0.58
      }
    },
    {
      id: 'org-005',
      name: 'Republican Party',
      type: 'political',
      imageUrl: 'img/entities/main/org-005.png',
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
      imageUrl: 'img/entities/main/org-006.jpg',
      affiliatedFactionIds: ['faction-002'],
      relatedLocationIds: [],
      factionSentiment: {
        'faction-002': 0.68,
        'faction-001': -0.61
      }
    },
    {
      id: 'org-008',
      name: 'European Commission',
      type: 'government',
      imageUrl: 'img/entities/main/org-008.png',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-005'],
      documentIds: ['doc-003'],
      factionSentiment: {
        'faction-001': -0.35,
        'faction-002': 0.28
      }
    },
    {
      id: 'org-009',
      name: 'World Economic Forum',
      type: 'organization',
      imageUrl: 'img/entities/main/org-009.svg',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-005'],
      documentIds: ['doc-001'],
      factionSentiment: {
        'faction-001': -0.42,
        'faction-002': 0.15
      }
    },
    {
      id: 'org-010',
      name: 'Department of Justice',
      type: 'government',
      imageUrl: 'img/entities/main/org-010.jpg',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-001', 'loc-002'],
      documentIds: ['doc-005', 'doc-006', 'doc-009', 'doc-010', 'doc-016'],
      factionSentiment: {
        'faction-001': 0.58,
        'faction-002': -0.65,
        'faction-003': -0.72
      }
    },
    {
      id: 'org-011',
      name: 'Immigration and Customs Enforcement',
      type: 'government',
      imageUrl: 'img/entities/main/org-011.jpg',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-002'],
      documentIds: ['doc-006', 'doc-007', 'doc-008', 'doc-024', 'doc-025'],
      factionSentiment: {
        'faction-001': 0.68,
        'faction-002': -0.78,
        'faction-003': -0.82
      }
    },
    {
      id: 'org-012',
      name: 'FBI',
      type: 'government',
      imageUrl: 'img/entities/main/org-012.png',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-001', 'loc-002'],
      documentIds: ['doc-007'],
      factionSentiment: {
        'faction-001': 0.25,
        'faction-002': -0.35,
        'faction-003': -0.42
      }
    },
    {
      id: 'org-013',
      name: 'Tippecanoe Superior Court',
      type: 'judicial',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-007'],
      documentIds: ['doc-013'],
      factionSentiment: {
        'faction-004': 0.48
      }
    },
    {
      id: 'org-014',
      name: 'Indiana Supreme Court',
      type: 'judicial',
      imageUrl: 'img/entities/main/org-014.jpg',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-007'],
      documentIds: ['doc-014'],
      factionSentiment: {
        'faction-004': 0.55
      }
    },
    {
      id: 'org-015',
      name: 'Lafayette Police Department',
      type: 'law_enforcement',
      affiliatedFactionIds: ['faction-004'],
      relatedLocationIds: ['loc-007'],
      documentIds: ['doc-013'],
      factionSentiment: {
        'faction-004': 0.62
      }
    },
    {
      id: 'org-016',
      name: 'Cities Church',
      type: 'religious',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-008'],
      documentIds: ['doc-008', 'doc-012', 'doc-024'],
      factionSentiment: {
        'faction-001': 0.45,
        'faction-002': -0.25,
        'faction-003': -0.35
      }
    },
    {
      id: 'org-017',
      name: 'Department of Homeland Security',
      type: 'government',
      imageUrl: 'img/entities/main/org-017.jpg',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-001', 'loc-002', 'loc-008'],
      documentIds: ['doc-015', 'doc-017'],
      factionSentiment: {
        'faction-001': 0.72,
        'faction-002': -0.68,
        'faction-003': -0.75
      }
    },
    {
      id: 'org-018',
      name: 'Minneapolis NAACP',
      type: 'advocacy',
      affiliatedFactionIds: ['faction-003'],
      relatedLocationIds: ['loc-002'],
      documentIds: ['doc-012'],
      factionSentiment: {
        'faction-001': -0.55,
        'faction-002': 0.62,
        'faction-003': 0.78
      }
    },
    {
      id: 'org-019',
      name: 'Minnesota-Wisconsin Baptist Convention',
      type: 'religious',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-002', 'loc-008'],
      factionSentiment: {
        'faction-001': 0.35,
        'faction-004': 0.42
      }
    },
    {
      id: 'org-020',
      name: 'US Congress',
      type: 'government',
      imageUrl: 'img/entities/main/org-020.png',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-009', 'loc-004'],
      documentIds: ['doc-015'],
      factionSentiment: {
        'faction-001': 0.15,
        'faction-002': 0.18
      }
    },
    {
      id: 'org-021',
      name: 'Eighth Circuit Court of Appeals',
      type: 'judicial',
      imageUrl: 'img/entities/main/org-021.png',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-002'],
      factionSentiment: {}
    },
    {
      id: 'org-022',
      name: 'Department of Health and Human Services',
      type: 'government',
      imageUrl: 'img/entities/main/org-022.jpg',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-001'],
      documentIds: ['doc-018', 'doc-020'],
      factionSentiment: {
        'faction-001': 0.52,
        'faction-005': 0.35,
        'faction-006': -0.48
      }
    },
    {
      id: 'org-023',
      name: 'World Resources Institute',
      type: 'research',
      affiliatedFactionIds: ['faction-005'],
      relatedLocationIds: [],
      documentIds: ['doc-019'],
      factionSentiment: {
        'faction-001': -0.42,
        'faction-005': 0.68,
        'faction-006': 0.55
      }
    }
  ],

  documents: [
    // Greenland/Trump narrative documents (narr-005)
    {
      id: 'doc-001',
      documentType: 'news_article',
      classification: 'U',
      title: 'Macron warns of world where "international law is trampled" in Davos speech',
      url: 'https://reuters.com/world/macron-davos-trump-greenland-2026',
      publishedDate: '2026-01-20T10:30:00Z',
      publisherId: 'pub-int-reuters',
      author: 'Jean-Baptiste Vey',
      excerpt: 'French President Emmanuel Macron delivered a thinly veiled critique of President Trump\'s foreign policy at the World Economic Forum, warning of dangerous precedents being set.',
      headerImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'French President Emmanuel Macron addresses the World Economic Forum in Davos, Switzerland. Photo: Reuters/Denis Balibouse'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'French President Emmanuel Macron delivered a thinly veiled critique of President Trump\'s foreign policy at the World Economic Forum on Monday, warning of a world where "international law is trampled under foot" and urging European leaders to resist the pressure.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"We cannot accept a world where the law of the strongest prevails," Macron said during his keynote address in Davos, Switzerland. "When leaders start questioning the territorial integrity of sovereign nations, we are on a dangerous path."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The remarks come amid escalating tensions over President Trump\'s renewed interest in acquiring Greenland, a semi-autonomous Danish territory. Trump has made several public statements suggesting the United States should have control over the strategically located island.', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'A Coordinated European Response', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Macron\'s speech appeared to be part of a coordinated European response to the Greenland situation. European Commission President Ursula von der Leyen, who spoke at the same forum, echoed similar themes about defending "rules-based international order."', portionMark: { classification: 'U', handling: '' } },
        { type: 'quote', content: '"Europe must be prepared to defend its interests and its values, even when—perhaps especially when—they are challenged by our closest allies."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The French president also emphasized the need for European nations to develop greater strategic autonomy, particularly in defense and energy. "We have relied too long on others for our security," Macron said. "The events of recent weeks should be a wake-up call."', portionMark: { classification: 'U', handling: '' } },
        { type: 'image', imageUrl: 'img/placeholders/image-placeholder.svg', caption: 'World leaders gathered at the Congress Centre in Davos for the annual World Economic Forum.' },
        { type: 'heading', content: 'Washington Dismisses Criticism', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The White House did not immediately respond to Macron\'s remarks. However, sources close to the administration told Reuters that President Trump views European criticism as "predictable posturing" that will not affect his policy decisions.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Republican lawmakers largely rallied behind the president. Senator Tom Cotton of Arkansas called Macron\'s speech "the usual European hand-wringing" and said the U.S. has legitimate security interests in the Arctic region.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Democratic leaders, however, expressed concern about the administration\'s approach. Senate Minority Leader Chuck Schumer called the Greenland situation "an unnecessary crisis that damages our relationships with our oldest allies."', portionMark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-005'],
      subNarrativeIds: ['sub-009'],
      personIds: ['person-003', 'person-004'],
      organizationIds: ['org-009'],
      locationIds: ['loc-005'],
      eventIds: ['event-006'],
      highlights: [
        {
          id: 'highlight-001',
          userId: 'user-002',
          blockIndex: 0,
          startOffset: 167,
          endOffset: 223,
          highlightedText: '"international law is trampled under foot"',
          createdAt: '2026-01-20T14:30:00Z'
        },
        {
          id: 'highlight-002',
          userId: 'user-003',
          blockIndex: 4,
          startOffset: 0,
          endOffset: 142,
          highlightedText: 'Macron\'s speech appeared to be part of a coordinated European response to the Greenland situation.',
          createdAt: '2026-01-20T15:45:00Z'
        },
        {
          id: 'highlight-003',
          userId: 'user-004',
          blockIndex: 9,
          startOffset: 56,
          endOffset: 150,
          highlightedText: 'President Trump views European criticism as "predictable posturing"',
          createdAt: '2026-01-20T16:12:00Z'
        }
      ],
      comments: [
        {
          id: 'comment-001',
          userId: 'user-002',
          blockIndex: 4,
          anchorStartOffset: 0,
          anchorEndOffset: 98,
          anchorText: 'Macron\'s speech appeared to be part of a coordinated European response to the Greenland situation.',
          content: 'This matches what we\'re seeing in the SIGINT reports from yesterday. The coordination appears to have started at least 48 hours before Davos.',
          createdAt: '2026-01-20T15:50:00Z',
          replies: [
            {
              id: 'reply-001',
              userId: 'user-001',
              content: 'Good catch. Can you pull those reports for the briefing tomorrow?',
              createdAt: '2026-01-20T16:05:00Z'
            },
            {
              id: 'reply-002',
              userId: 'user-002',
              content: 'Already on it. I\'ll have a summary ready by EOD.',
              createdAt: '2026-01-20T16:12:00Z'
            }
          ]
        },
        {
          id: 'comment-002',
          userId: 'user-006',
          blockIndex: 10,
          anchorStartOffset: 0,
          anchorEndOffset: 87,
          anchorText: 'Republican lawmakers largely rallied behind the president. Senator Tom Cotton of Arkansas',
          content: 'We should track which senators are taking which positions. This could be useful for the congressional liaison team.',
          createdAt: '2026-01-20T17:30:00Z',
          replies: []
        }
      ]
    },
    {
      id: 'doc-002',
      documentType: 'news_article',
      classification: 'U',
      title: 'Trump posts private Macron message on social media: "I do not understand what you are doing"',
      url: 'https://cnn.com/politics/trump-macron-greenland-message',
      publishedDate: '2026-01-20T12:15:00Z',
      publisherId: 'pub-nat-cnn',
      author: 'Kevin Liptak and Betsy Klein',
      excerpt: 'President Trump shared what appeared to be a private diplomatic message from French President Macron questioning his Greenland acquisition strategy.',
      headerImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'President Trump\'s Truth Social post displaying what appears to be a private message from President Macron.'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'President Donald Trump on Monday shared what appeared to be a private diplomatic message from French President Emmanuel Macron, in an extraordinary breach of protocol that has sent shockwaves through diplomatic circles.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The message, posted on Trump\'s Truth Social account, showed Macron writing: "Donald, I do not understand what you are doing with this Greenland business. This is not how allies treat each other. Please call me so we can discuss."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Trump captioned the post: "Can you believe this guy? France is a mess, Paris is burning, and he wants to lecture ME about how to do deals? Maybe focus on your own problems, Emmanuel!"', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Unprecedented Diplomatic Breach', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Former diplomats expressed alarm at the disclosure. "This is simply unprecedented," said Richard Haass, former president of the Council on Foreign Relations. "No world leader will trust private communications with the United States after this."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The Élysée Palace declined to comment on the authenticity of the message but issued a terse statement saying France "remains committed to the transatlantic relationship and will continue to engage through appropriate diplomatic channels."', portionMark: { classification: 'U', handling: '' } },
        { type: 'quote', content: '"What world leader would now send a candid message to the White House knowing it could end up on social media? This fundamentally damages our ability to conduct diplomacy." — Former Ambassador to NATO', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'White House Response', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'White House Press Secretary Karoline Leavitt defended the president\'s action, saying Trump "believes in transparency with the American people" and that Macron\'s message demonstrated European leaders\' "hysterical" reaction to legitimate American interests.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"The president is not going to be lectured by foreign leaders about what\'s best for America," Leavitt said during the daily briefing. "If President Macron wants to have a private conversation, perhaps he should be more respectful."', portionMark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-005'],
      subNarrativeIds: ['sub-010'],
      personIds: ['person-003', 'person-004'],
      organizationIds: [],
      locationIds: ['loc-001'],
      eventIds: ['event-007']
    },
    {
      id: 'doc-003',
      documentType: 'news_article',
      classification: 'U',
      title: 'Von der Leyen calls for "new form of European independence" amid Trump tensions',
      url: 'https://bbc.com/news/world-europe-von-der-leyen-independence',
      publishedDate: '2026-01-20T14:00:00Z',
      publisherId: 'pub-int-bbc',
      author: 'Katya Adler',
      excerpt: 'European Commission President Ursula von der Leyen said the EU must develop greater autonomy in response to "geopolitical shocks" from across the Atlantic.',
      headerImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'European Commission President Ursula von der Leyen delivers her address at the World Economic Forum.'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'European Commission President Ursula von der Leyen called for a "new form of European independence" on Monday, as tensions between the European Union and the United States reach their highest point in decades.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Speaking at the World Economic Forum in Davos just hours after French President Macron\'s pointed remarks, von der Leyen said Europe must reduce its dependence on American security guarantees and develop its own capabilities.', portionMark: { classification: 'U', handling: '' } },
        { type: 'quote', content: '"For too long, we have assumed that the post-war order would remain stable. Recent events have shown us that assumption was naive. Europe must now chart its own course."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The Commission President outlined a series of proposals aimed at strengthening European autonomy, including increased defense spending, accelerated energy transition, and closer coordination on foreign policy.', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Defense and Security', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Von der Leyen announced plans to present a new European Defense Initiative at next month\'s EU summit. The proposal would include a 500 billion euro fund for joint military procurement and the creation of a rapid reaction force independent of NATO structures.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"We are not abandoning NATO," she emphasized. "But we must be prepared for scenarios where we need to act on our own. The Greenland situation has made that abundantly clear."', portionMark: { classification: 'U', handling: '' } },
        { type: 'image', imageUrl: 'img/placeholders/image-placeholder.svg', caption: 'EU and member state flags fly outside the European Commission headquarters in Brussels.' },
        { type: 'heading', content: 'Mixed Reactions', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The proposals received a mixed reception from EU member states. France and Germany expressed strong support, while Poland and the Baltic states warned against undermining the transatlantic alliance.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Polish Foreign Minister Radosław Sikorski cautioned that "Europe cannot defend itself without the United States, and we should not pretend otherwise. Our focus should be on repairing the relationship, not replacing it."', portionMark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-005'],
      subNarrativeIds: ['sub-011'],
      personIds: ['person-005'],
      organizationIds: ['org-008'],
      locationIds: ['loc-005'],
      eventIds: ['event-009']
    },
    {
      id: 'doc-004',
      documentType: 'news_article',
      classification: 'U',
      title: 'Greenland PM: "We demand respect for the world order"',
      url: 'https://guardian.com/world/greenland-pm-trump-response',
      publishedDate: '2026-01-20T13:30:00Z',
      publisherId: 'pub-int-guardian',
      author: 'Jon Henley',
      excerpt: 'Greenland\'s Prime Minister Múte Bourup Egede responded forcefully to Trump\'s acquisition threats, calling for respect of international norms.',
      headerImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'Greenland\'s Prime Minister Múte Bourup Egede addresses reporters in Nuuk. Photo: Ritzau Scanpix'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'Greenland\'s Prime Minister Múte Bourup Egede delivered a defiant response to President Trump\'s renewed push to acquire the autonomous Danish territory, declaring that Greenlanders "are not for sale" and demanding respect for international law.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Speaking at a press conference in Nuuk, Egede said Trump\'s statements were "deeply disrespectful" to Greenland\'s 57,000 residents and represented a dangerous precedent for small nations everywhere.', portionMark: { classification: 'U', handling: '' } },
        { type: 'quote', content: '"We are a people with our own identity, our own culture, our own aspirations. We are not a piece of real estate to be bought and sold. We demand respect for the world order that protects the sovereignty of all nations, large and small."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The prime minister\'s remarks came after Trump posted on social media that the United States "needs Greenland for national security purposes" and that "one way or another, we will get it."', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Independence Movement Gains Momentum', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Ironically, Trump\'s pressure appears to be accelerating Greenland\'s long-term goal of independence from Denmark. Egede, who leads the pro-independence Inuit Ataqatigiit party, said recent events had "strengthened our resolve."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"We will decide our own future," he said. "Not Washington, not Copenhagen. Greenlanders will determine the path of Greenland."', portionMark: { classification: 'U', handling: '' } },
        { type: 'image', imageUrl: 'img/placeholders/image-placeholder.svg', caption: 'Protesters in Nuuk hold signs opposing American acquisition of Greenland.' },
        { type: 'heading', content: 'Danish Support', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Danish Prime Minister Mette Frederiksen reaffirmed Denmark\'s support for Greenland\'s self-determination. "Greenland belongs to the Greenlandic people," she said in a statement. "Denmark will always support their right to decide their own future."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The Danish government has recalled its ambassador to Washington for "consultations" and summoned the U.S. ambassador to Copenhagen to explain the administration\'s position.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Meanwhile, the Arctic Council, of which both the U.S. and Denmark are members, announced an emergency session to discuss "recent statements that threaten regional stability."', portionMark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-005'],
      subNarrativeIds: ['sub-011'],
      personIds: ['person-006', 'person-003'],
      organizationIds: [],
      locationIds: ['loc-006'],
      eventIds: ['event-008']
    },

    // Minnesota immigration documents (narr-006)
    {
      id: 'doc-005',
      documentType: 'news_article',
      classification: 'U',
      title: 'DOJ plans subpoenas for Minnesota AG, governor over ICE protest "obstruction"',
      url: 'https://nytimes.com/2026/01/20/us/politics/doj-minnesota-subpoenas',
      publishedDate: '2026-01-20T11:00:00Z',
      publisherId: 'pub-nat-nyt',
      author: 'Charlie Savage and Miriam Jordan',
      excerpt: 'The Department of Justice announced plans to subpoena Minnesota\'s top officials in an escalating confrontation over immigration enforcement.',
      headerImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'Minnesota Attorney General Keith Ellison speaks at a press conference about federal immigration enforcement. Photo: Star Tribune'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'The Department of Justice announced Monday that it plans to issue subpoenas to Minnesota Attorney General Keith Ellison and Governor Tim Walz, accusing them of obstructing federal immigration enforcement in Minneapolis.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The announcement marks a dramatic escalation in the standoff between the Trump administration and state officials who have resisted aggressive Immigration and Customs Enforcement operations in their jurisdictions.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"State officials who interfere with federal law enforcement will be held accountable," Attorney General Pam Bondi said in a statement. "We will not tolerate sanctuary policies that endanger American communities."', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'State Officials Vow to Fight', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Attorney General Ellison responded defiantly, calling the subpoenas "a politically motivated attack on the people of Minnesota" and vowing to challenge them in court.', portionMark: { classification: 'U', handling: '' } },
        { type: 'quote', content: '"We will not be intimidated by federal overreach. Minnesota will continue to protect the constitutional rights of all our residents, regardless of immigration status."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Governor Walz, speaking at an unrelated event in St. Paul, said the state would "vigorously defend" its policies. "We are a nation of laws, and that includes the Constitution, which protects due process for everyone," he said.', portionMark: { classification: 'U', handling: '' } },
        { type: 'image', imageUrl: 'img/placeholders/image-placeholder.svg', caption: 'Protesters gather outside the federal building in Minneapolis to oppose ICE operations.' },
        { type: 'heading', content: 'Legal Experts Divided', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Constitutional law experts are divided on the legality of the DOJ\'s actions. Some argue that state officials have a legitimate role in setting local law enforcement priorities, while others contend that immigration enforcement is an exclusively federal function.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"This is uncharted territory," said Ilya Shapiro, a constitutional scholar at the Manhattan Institute. "The courts will ultimately have to decide where state sovereignty ends and federal supremacy begins."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The confrontation has drawn comparisons to the civil rights era, when the federal government clashed with state officials over desegregation. However, in this case, the federal government is seeking to compel state cooperation rather than override discriminatory state policies.', portionMark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-006'],
      subNarrativeIds: ['sub-012'],
      personIds: ['person-007'],
      organizationIds: ['org-010'],
      locationIds: ['loc-002'],
      eventIds: ['event-010'],
      highlights: [
        {
          id: 'highlight-004',
          userId: 'user-006',
          blockIndex: 2,
          startOffset: 1,
          endOffset: 115,
          highlightedText: '"State officials who interfere with federal law enforcement will be held accountable," Attorney General Pam Bondi said',
          createdAt: '2026-01-20T13:00:00Z'
        },
        {
          id: 'highlight-005',
          userId: 'user-002',
          blockIndex: 5,
          startOffset: 1,
          endOffset: 155,
          highlightedText: '"We will not be intimidated by federal overreach. Minnesota will continue to protect the constitutional rights of all our residents, regardless of immigration status."',
          createdAt: '2026-01-20T14:22:00Z'
        }
      ],
      comments: [
        {
          id: 'comment-003',
          userId: 'user-004',
          blockIndex: 9,
          anchorStartOffset: 1,
          anchorEndOffset: 50,
          anchorText: '"This is uncharted territory," said Ilya Shapiro',
          content: 'We should add Shapiro to our expert tracker. He\'s been quoted in several pieces on this topic and could be a useful source.',
          createdAt: '2026-01-20T14:45:00Z',
          replies: [
            {
              id: 'reply-003',
              userId: 'user-005',
              content: 'He testified before Congress on federalism issues last year. I can pull that transcript if helpful.',
              createdAt: '2026-01-20T15:00:00Z'
            },
            {
              id: 'reply-004',
              userId: 'user-004',
              content: 'Yes please. Also interested in any prior writings on state-federal conflicts.',
              createdAt: '2026-01-20T15:08:00Z'
            },
            {
              id: 'reply-005',
              userId: 'user-001',
              content: 'I\'ve added him to the entity list with a note about his expertise. @agarcia can you flag relevant prior writings?',
              createdAt: '2026-01-20T15:30:00Z'
            }
          ]
        },
        {
          id: 'comment-004',
          userId: 'user-003',
          blockIndex: 11,
          anchorStartOffset: 0,
          anchorEndOffset: 90,
          anchorText: 'The confrontation has drawn comparisons to the civil rights era, when the federal government',
          content: 'Interesting framing but the analogy is imperfect. Worth noting in our analysis that the federal role is reversed here.',
          createdAt: '2026-01-20T16:20:00Z',
          replies: []
        }
      ]
    },
    {
      id: 'doc-006',
      documentType: 'news_article',
      classification: 'U',
      title: 'Federal judge rules protesters cannot be arrested without cause, DOJ appeals',
      url: 'https://washingtonpost.com/national/minnesota-ice-ruling-appeal',
      publishedDate: '2026-01-20T09:45:00Z',
      publisherId: 'pub-nat-wapo',
      author: 'Devlin Barrett and Maria Sacchetti',
      excerpt: 'A federal judge issued an injunction protecting peaceful protesters from arrest by federal agents, but the DOJ immediately filed an appeal.',
      headerImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'Protesters gather outside the Minneapolis Federal Building following the court ruling. Photo: Washington Post'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'A federal judge in Minnesota issued an emergency injunction Monday barring federal agents from arresting peaceful protesters without probable cause, delivering a sharp rebuke to the Trump administration\'s aggressive immigration enforcement tactics.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'U.S. District Judge Wilhelmina Wright ruled that the government had not demonstrated a compelling interest in detaining individuals engaged in lawful First Amendment activity, even during immigration enforcement operations.', portionMark: { classification: 'U', handling: '' } },
        { type: 'quote', content: '"The Constitution does not cease to apply because the government invokes immigration enforcement. Peaceful protest is protected speech, and agents cannot arrest citizens simply for being present at a demonstration."', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'DOJ Files Immediate Appeal', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The Department of Justice filed an emergency appeal within hours of the ruling, arguing that the injunction would "severely hamper" federal law enforcement operations and create "dangerous precedent" for limiting executive authority.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'In their filing, government lawyers argued that federal agents must have broad discretion to maintain order during enforcement operations, and that distinguishing between "protesters" and potential threats in real-time is impractical.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The Eighth Circuit Court of Appeals has scheduled an expedited hearing for Wednesday, with both sides expecting a ruling by the end of the week.', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Civil Liberties Groups Celebrate', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The ACLU of Minnesota, which brought the lawsuit on behalf of several arrested protesters, called the ruling "a victory for the Constitution and the right of all Americans to peacefully assemble."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"This administration has treated peaceful protesters as enemy combatants," said ACLU attorney Teresa Nelson. "Today\'s ruling reminds them that they cannot suspend the Bill of Rights simply by declaring an immigration emergency."', portionMark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-006', 'narr-009'],
      subNarrativeIds: ['sub-013'],
      personIds: ['person-017'],
      organizationIds: ['org-010', 'org-011'],
      locationIds: ['loc-002'],
      eventIds: ['event-011']
    },
    {
      id: 'doc-007',
      documentType: 'news_article',
      classification: 'U',
      title: 'FBI pivots civil rights probe from ICE agent to slain protester Renee Good',
      url: 'https://msnbc.com/news/fbi-renee-good-investigation-pivot',
      publishedDate: '2026-01-18T16:00:00Z',
      publisherId: 'pub-nat-msnbc',
      author: 'Julia Ainsley',
      excerpt: 'Critics are outraged after learning the FBI\'s investigation into the fatal shooting has shifted focus from the agent to the victim and her widow.',
      headerImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'A memorial for Renee Good at the site where she was killed during a protest in Minneapolis.'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'The FBI has shifted the focus of its civil rights investigation into the fatal shooting of protester Renee Good, pivoting from examining the actions of the ICE agent who killed her to investigating the victim and her widow, according to three people familiar with the matter.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The move has sparked outrage among civil rights advocates and Democratic lawmakers, who say the Justice Department is using the investigation to intimidate protesters rather than ensure accountability for law enforcement.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Good, 34, was shot and killed on January 17 during a protest against ICE operations in Minneapolis. Video footage from multiple angles shows she was unarmed and had her hands raised when the agent opened fire.', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Investigation Takes Unexpected Turn', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Sources familiar with the investigation say FBI agents have been interviewing Good\'s colleagues, friends, and family members—not to gather information about the shooting, but to build a profile of her political activities and associations.', portionMark: { classification: 'U', handling: '' } },
        { type: 'quote', content: '"They asked me about her social media posts, what protests she had attended, whether she had ever advocated violence. They\'re trying to make her the criminal when she was the victim." — Friend of Renee Good', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Good\'s widow, Sarah Good, has also been contacted by FBI agents seeking information about her wife\'s "known associations" with activist groups. Through her attorney, Sarah Good declined to be interviewed.', portionMark: { classification: 'U', handling: '' } },
        { type: 'image', imageUrl: 'img/placeholders/image-placeholder.svg', caption: 'Community members hold a vigil for Renee Good outside the Minneapolis Federal Building.' },
        { type: 'heading', content: 'DOJ Defends Investigation', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'A Justice Department spokesperson defended the investigation\'s scope, saying it would be "inappropriate to comment on specific investigative steps" but that all relevant facts were being examined.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"A thorough investigation requires examining all circumstances surrounding the incident," the spokesperson said. "We will follow the evidence wherever it leads."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The ICE agent who shot Good has been placed on administrative leave pending the outcome of the investigation. His identity has not been publicly released.', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Civil Rights Groups Respond', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The ACLU of Minnesota called the investigation\'s new direction "a perversion of justice" and announced plans to file a lawsuit on behalf of the Good family.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"When the government investigates murder victims instead of killers, we have lost our way as a nation," said ACLU-MN Executive Director John Gordon. "Renee Good was exercising her First Amendment rights when she was killed by a federal agent. That agent should be the focus of any investigation."', portionMark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-006'],
      subNarrativeIds: ['sub-015'],
      personIds: ['person-008'],
      organizationIds: ['org-011', 'org-012'],
      locationIds: ['loc-002'],
      eventIds: ['event-013', 'event-014']
    },

    // Church protest documents (narr-008)
    {
      id: 'doc-008',
      documentType: 'news_article',
      classification: 'U',
      title: 'Protesters disrupt service at church where ICE official serves as pastor',
      url: 'https://cnn.com/us/minnesota-church-ice-protest',
      publishedDate: '2026-01-19T14:30:00Z',
      publisherId: 'pub-nat-cnn',
      author: 'Omar Jimenez and Ashley Killough',
      excerpt: 'Anti-ICE demonstrators interrupted Sunday worship at Cities Church in St. Paul, targeting David Easterwood who serves dual roles as ICE official and pastor.',
      headerImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'Protesters hold signs outside Cities Church in St. Paul during Sunday services. Photo: CNN'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'Anti-ICE protesters disrupted Sunday worship services at Cities Church in St. Paul, Minnesota, confronting congregants and demanding accountability from David Easterwood, a senior ICE official who also serves as an associate pastor at the church.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The demonstration, organized by local immigrant rights groups, saw approximately 50 protesters enter the church sanctuary during the morning service, chanting "No worship for deporters" and displaying photos of families separated at the border.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Video footage from the incident shows Easterwood attempting to continue the service as protesters surrounded the pulpit. The demonstration lasted approximately 15 minutes before church security and local police escorted the protesters outside.', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Easterwood\'s Dual Role Under Scrutiny', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Easterwood has served as an associate pastor at Cities Church for eight years while simultaneously working as a Deputy Director of ICE\'s Enforcement and Removal Operations. His dual roles have drawn criticism from immigrant advocacy groups who question how someone can preach Christian values while overseeing deportation operations.', portionMark: { classification: 'U', handling: '' } },
        { type: 'quote', content: '"How can you stand at that pulpit on Sunday and talk about loving your neighbor, and then on Monday send agents to tear families apart? There is no reconciling those two things." — Protest organizer Maria Santos', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Cities Church released a statement calling the protest "a violation of our sacred space" and defending Easterwood as "a man of deep faith who serves his community and his country with integrity."', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Federal Response Swift', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The Department of Justice announced within hours that it was opening an investigation into whether the protest violated the Freedom of Access to Clinic Entrances (FACE) Act, which also protects houses of worship from obstruction.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Attorney General Pam Bondi condemned the protest in a statement, saying the administration would "use the full force of federal law to protect Christians from intimidation and harassment."', portionMark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-008'],
      subNarrativeIds: ['sub-021'],
      personIds: ['person-014', 'person-015'],
      organizationIds: ['org-016', 'org-011'],
      locationIds: ['loc-008'],
      eventIds: ['event-017']
    },
    {
      id: 'doc-009',
      documentType: 'news_article',
      classification: 'U',
      title: 'AG Bondi announces FACE Act investigation: "Full force of federal law"',
      url: 'https://foxnews.com/politics/bondi-face-act-church-protest',
      publishedDate: '2026-01-19T19:00:00Z',
      publisherId: 'pub-nat-fox',
      author: 'Bill Melugin',
      excerpt: 'Attorney General Pam Bondi declared that attacks against law enforcement and intimidation of Christians will be prosecuted to the fullest extent.',
      headerImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'Attorney General Pam Bondi speaks at a press conference at the Department of Justice. Photo: Fox News'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'Attorney General Pam Bondi announced Sunday evening that the Department of Justice is opening a federal investigation into protesters who disrupted church services in St. Paul, Minnesota, warning that "attacks on Christians and law enforcement will not be tolerated."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Speaking at an impromptu press conference at DOJ headquarters, Bondi said the protest at Cities Church may have violated the Freedom of Access to Clinic Entrances (FACE) Act, which makes it a federal crime to obstruct access to places of religious worship.', portionMark: { classification: 'U', handling: '' } },
        { type: 'quote', content: '"Let me be clear: this administration will use the full force of federal law to protect religious freedom and to defend the men and women who keep our communities safe. These agitators crossed a line today, and they will be held accountable."', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'FACE Act Charges Carry Serious Penalties', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The FACE Act, originally passed in 1994 to protect abortion clinics from violent protesters, was amended in 2021 to include enhanced protections for houses of worship. Violations can carry penalties of up to one year in prison for first offenses, and up to three years for repeat offenders or if bodily injury occurs.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Bondi indicated that federal prosecutors are reviewing video footage from the protest to identify participants who may face charges. She declined to specify how many individuals are being investigated.', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Critics Question Selective Enforcement', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Civil liberties groups accused the administration of selectively applying the FACE Act to target political opponents while ignoring violations against other communities.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"The FACE Act was designed to protect all houses of worship equally," said ACLU National Legal Director David Cole. "But this administration has shown no interest in applying it when mosques or synagogues are targeted. This is political prosecution dressed up as religious freedom."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Bondi dismissed the criticism as "desperate deflection" and said the DOJ would "prosecute all violations of federal law, regardless of the victim\'s faith."', portionMark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-008'],
      subNarrativeIds: ['sub-018'],
      personIds: ['person-013', 'person-012'],
      organizationIds: ['org-010'],
      locationIds: ['loc-001'],
      eventIds: ['event-018']
    },
    {
      id: 'doc-010',
      documentType: 'news_article',
      classification: 'U',
      title: 'DOJ threatens charges against journalist Don Lemon for covering protest',
      url: 'https://guardian.com/media/don-lemon-doj-threat-minnesota',
      publishedDate: '2026-01-20T13:00:00Z',
      publisherId: 'pub-int-guardian',
      author: 'Ed Pilkington',
      excerpt: 'Assistant AG Harmeet Dhillon said Lemon is "on notice" and cannot use journalism as a shield, prompting press freedom concerns.',
      headerImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'CNN anchor Don Lemon reports from outside Cities Church during the protest. Photo: Guardian/Getty'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'The Department of Justice threatened Monday to bring charges against CNN anchor Don Lemon for his presence at a church protest in Minnesota, with Assistant Attorney General Harmeet Dhillon warning that journalists "cannot use press credentials as a shield" from federal prosecution.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Lemon was reporting live from Cities Church in St. Paul on Sunday when protesters disrupted services targeting an ICE official who serves as pastor. Video shows Lemon standing outside the church interviewing protesters, not entering the building.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'In an interview with Fox News, Dhillon said Lemon is "on notice" that his activities are being reviewed by federal prosecutors. "Being a journalist doesn\'t give you immunity to participate in criminal activity," she said. "If you\'re aiding and abetting, you can be charged."', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Press Freedom Organizations Sound Alarm', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The Committee to Protect Journalists called the threat "an alarming escalation in this administration\'s war on the press" and demanded that the DOJ immediately clarify that reporting on protests is protected First Amendment activity.', portionMark: { classification: 'U', handling: '' } },
        { type: 'quote', content: '"Threatening to prosecute a journalist for covering a news event is authoritarianism, plain and simple. This is the kind of thing we see in Russia and China, not the United States." — CPJ Executive Director Jodie Ginsberg', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'CNN issued a strongly worded statement defending Lemon, saying he "was doing his job as a journalist, reporting on a newsworthy event" and that the network would "vigorously defend" him against any charges.', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Lemon Responds', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Lemon addressed the threats during his Monday evening broadcast, saying he would not be intimidated. "I was standing on a public sidewalk doing my job. If that\'s now a crime in America, then we have much bigger problems than anything I reported on yesterday."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'He noted that multiple other journalists were present at the protest without facing similar threats, suggesting the administration was targeting him specifically due to his critical coverage of immigration enforcement.', portionMark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-008'],
      subNarrativeIds: ['sub-019'],
      personIds: ['person-012', 'person-016'],
      organizationIds: ['org-010'],
      locationIds: ['loc-008'],
      eventIds: ['event-019']
    },
    {
      id: 'doc-011',
      documentType: 'social_post',
      url: 'https://truthsocial.com/@realDonaldTrump/posts/123456789',
      publishedDate: '2026-01-21T06:30:00Z',
      publisherId: 'pub-x',
      author: {
        username: '@realDonaldTrump',
        displayName: 'Donald J. Trump',
        avatarUrl: 'img/placeholders/avatar-default.svg'
      },
      content: 'The agitators and insurrectionists who disrupted a Church Service in Minnesota are highly trained, and should be thrown in jail, or thrown out of the Country. They are not "protesters," they are professional troublemakers who are destroying our Country. LAW AND ORDER!',
      engagement: {
        replies: 45821,
        likes: 187432,
        reblogs: 52847
      },
      narrativeIds: ['narr-008'],
      subNarrativeIds: ['sub-020'],
      personIds: ['person-003'],
      organizationIds: [],
      locationIds: ['loc-001'],
      eventIds: ['event-020']
    },
    {
      id: 'doc-012',
      documentType: 'news_article',
      classification: 'U',
      title: 'Former NAACP president: "How can anyone who claims to be Christian condone this?"',
      url: 'https://cnn.com/us/nekima-levy-armstrong-ice-pastor-interview',
      publishedDate: '2026-01-20T10:00:00Z',
      publisherId: 'pub-nat-cnn',
      author: 'Sara Sidner',
      excerpt: 'Nekima Levy Armstrong questioned the moral standing of an ICE official serving as a pastor while overseeing immigration enforcement.',
      headerImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'Nekima Levy Armstrong speaks at a press conference following the church protest. Photo: CNN'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'Nekima Levy Armstrong, former president of the Minneapolis NAACP and one of the organizers of Sunday\'s church protest, defended the demonstration in an exclusive interview with CNN, questioning how David Easterwood reconciles his faith with his work overseeing deportations.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"How can anyone who claims to be Christian condone the separation of families? How can you preach about loving your neighbor while sending agents to drag people from their homes in the middle of the night?" Levy Armstrong asked.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The civil rights attorney and activist said the protest was intended to highlight what she called the "moral contradiction" of Easterwood\'s dual roles as ICE official and pastor at Cities Church.', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'A Question of Moral Authority', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Levy Armstrong, who holds a law degree from the University of Illinois and previously worked as a civil rights attorney, said the protest was peaceful and that demonstrators deliberately chose not to physically disrupt the service beyond their presence.', portionMark: { classification: 'U', handling: '' } },
        { type: 'quote', content: '"We walked in, we stood there, we held our signs, and we asked a simple question: How do you justify this? That\'s not violence. That\'s not intimidation. That\'s accountability."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'She dismissed the DOJ\'s FACE Act investigation as "political theater" designed to intimidate protesters and said she was prepared to face any charges.', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Easterwood\'s Record Under Examination', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'According to documents obtained by immigrant advocacy groups, Easterwood has overseen enforcement operations that resulted in the deportation of more than 15,000 individuals during his tenure, including parents of U.S. citizen children.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"This isn\'t abstract policy," Levy Armstrong said. "These are real families being destroyed by someone who then stands at a pulpit and talks about Christian love. The hypocrisy is staggering."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Cities Church has not responded to requests for comment on Easterwood\'s specific role in deportation operations.', portionMark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-008'],
      subNarrativeIds: ['sub-021'],
      personIds: ['person-015', 'person-014'],
      organizationIds: ['org-018', 'org-016'],
      locationIds: ['loc-008'],
      eventIds: ['event-017']
    },

    // Indiana judge shooting documents (narr-007)
    {
      id: 'doc-013',
      documentType: 'news_article',
      classification: 'U',
      title: 'Indiana judge and wife shot at home; suspect at large',
      url: 'https://cnn.com/us/indiana-judge-steven-meyer-shooting',
      publishedDate: '2026-01-19T18:00:00Z',
      publisherId: 'pub-nat-cnn',
      author: 'Eric Levenson and Ray Sanchez',
      excerpt: 'Tippecanoe Superior Court Judge Steven Meyer and his wife Kimberly were shot Sunday afternoon. Both are in stable condition as agencies search for the suspect.',
      headerImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'Law enforcement vehicles line the street outside Judge Steven Meyer\'s residence in Lafayette, Indiana. Photo: CNN affiliate WLFI'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'Tippecanoe Superior Court Judge Steven Meyer and his wife Kimberly were shot Sunday afternoon at their home in Lafayette, Indiana, in what authorities are calling a targeted attack. Both victims are in stable condition at a local hospital.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The shooter fled the scene and remains at large, prompting a massive manhunt involving multiple law enforcement agencies, including the FBI and U.S. Marshals Service. Authorities have issued a shelter-in-place advisory for nearby residents.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The Tippecanoe County Sheriff\'s Office said the shooting occurred around 2:30 p.m. when a suspect approached the Meyer residence and opened fire. Neighbors reported hearing multiple gunshots before seeing a figure flee on foot.', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Judge\'s Recent Cases Under Review', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Investigators are examining Judge Meyer\'s recent cases for potential motives. Meyer has presided over several high-profile criminal cases in recent months, including drug trafficking and violent crime cases that resulted in significant prison sentences.', portionMark: { classification: 'U', handling: '' } },
        { type: 'quote', content: '"At this time, we are treating this as a targeted attack on a sitting judge. We are reviewing all recent cases and known threats, and we urge anyone with information to contact law enforcement immediately." — Tippecanoe County Sheriff Bob Goldsmith', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Meyer, 58, has served on the Tippecanoe Superior Court for 12 years and is known for his strict sentencing in violent crime cases.', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Increased Security for Indiana Judges', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'In the wake of the shooting, the Indiana State Police announced they would provide additional security for judges across the state. Indiana Supreme Court Chief Justice Loretta Rush is expected to address the incident in a statement Monday.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The attack comes amid growing concerns about violence against judicial officials nationwide. According to the U.S. Marshals Service, threats against federal judges have increased more than 400% over the past five years.', portionMark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-007'],
      subNarrativeIds: ['sub-016'],
      personIds: ['person-009', 'person-010'],
      organizationIds: ['org-013', 'org-015'],
      locationIds: ['loc-007'],
      eventIds: ['event-015']
    },
    {
      id: 'doc-014',
      documentType: 'news_article',
      classification: 'U',
      title: 'Indiana Chief Justice to judges: "Please remain vigilant in your own security"',
      url: 'https://indystar.com/news/indiana-chief-justice-judges-security-warning',
      publishedDate: '2026-01-20T11:30:00Z',
      publisherId: 'pub-nat-nyt',
      author: 'Kaitlin Lange',
      excerpt: 'Chief Justice Loretta H. Rush sent an urgent letter to all state judges expressing concern about violence targeting the judiciary.',
      headerImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'Indiana Supreme Court Chief Justice Loretta H. Rush. Photo: Indianapolis Star file'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'Indiana Supreme Court Chief Justice Loretta H. Rush sent an urgent letter Monday to all state judges warning them to "remain vigilant" about their personal security in the wake of Sunday\'s shooting of Tippecanoe Superior Court Judge Steven Meyer.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The letter, obtained by the Indianapolis Star, expressed "deep concern" about the attack and announced immediate steps to enhance security for Indiana\'s roughly 400 state court judges.', portionMark: { classification: 'U', handling: '' } },
        { type: 'quote', content: '"The attack on Judge Meyer and his wife is a stark reminder that those who serve on the bench face real dangers. I urge all of you to please remain vigilant in your own security, both at work and at home. Do not take any threat lightly."', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'New Security Measures Announced', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Rush announced that the Indiana Office of Court Services would immediately begin conducting security assessments for judges who request them, including evaluations of their homes and vehicles.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The state will also expedite the installation of security cameras and panic buttons in courthouses that lack them, and will provide personal safety training for judges and their families.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"We cannot allow those who would use violence to intimidate the judiciary to succeed," Rush wrote. "Our courts must continue to function, and justice must be served."', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'National Pattern of Threats', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The attack on Meyer follows a troubling pattern of violence and threats against judicial officials across the country. In 2020, a gunman shot and killed the son of New Jersey federal judge Esther Salas at her home in what authorities said was a targeted attack.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Rush noted that Indiana judges have reported a significant increase in threats over the past year, particularly in cases involving custody disputes and criminal sentencing.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"Judges make difficult decisions that affect people\'s lives," Rush wrote. "While most accept these decisions, some respond with anger and, increasingly, with threats. We must be prepared."', portionMark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-007'],
      subNarrativeIds: ['sub-017'],
      personIds: ['person-011'],
      organizationIds: ['org-014'],
      locationIds: ['loc-007'],
      eventIds: ['event-016']
    },

    // Legal battles documents (narr-009)
    {
      id: 'doc-015',
      documentType: 'news_article',
      classification: 'U',
      title: 'Judge allows DHS to require week notice for congressional facility inspections',
      url: 'https://politico.com/news/dhs-congressional-inspection-notice-ruling',
      publishedDate: '2026-01-20T14:30:00Z',
      publisherId: 'pub-nat-nyt',
      author: 'Josh Gerstein',
      excerpt: 'Federal judge Jia Cobb ruled DHS can continue blocking no-notice inspections despite blocking a similar policy last month.',
      headerImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'The U.S. District Court for the District of Columbia. Photo: Politico'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'A federal judge ruled Monday that the Department of Homeland Security can require congressional members to provide one week\'s notice before inspecting immigration detention facilities, a decision that critics say will allow the agency to hide conditions from oversight.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'U.S. District Judge Jia Cobb rejected a lawsuit filed by Democratic members of Congress who argued the notice requirement violated their constitutional authority to conduct oversight of executive branch agencies.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The ruling marks a significant victory for the Trump administration, which has sought to limit congressional access to detention facilities amid reports of overcrowding and inadequate medical care.', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Judge Cites Security Concerns', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'In her ruling, Judge Cobb said DHS had demonstrated legitimate security concerns that justified the notice requirement. "Detention facilities present unique security challenges," she wrote. "Unannounced visits by large delegations could disrupt operations and potentially compromise safety."', portionMark: { classification: 'U', handling: '' } },
        { type: 'quote', content: '"While Congress has broad oversight authority, that authority is not unlimited. The executive branch retains reasonable discretion to manage access to sensitive facilities."', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Democrats Vow Appeal', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Representative Alexandria Ocasio-Cortez, one of the plaintiffs, said the ruling would be appealed and accused the judge of enabling the administration\'s "cover-up" of conditions at detention facilities.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"When they have a week to prepare for our visits, they can clean up the facilities, move detainees, and hide evidence of abuse," Ocasio-Cortez said. "This ruling makes meaningful oversight impossible."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'DHS Secretary Kristi Noem welcomed the ruling, saying it would allow facilities to maintain "appropriate security protocols" while still permitting congressional oversight.', portionMark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-009'],
      subNarrativeIds: ['sub-022'],
      personIds: ['person-025', 'person-021', 'person-022', 'person-023'],
      organizationIds: ['org-017', 'org-020'],
      locationIds: ['loc-009'],
      eventIds: ['event-021', 'event-022']
    },
    {
      id: 'doc-016',
      documentType: 'news_article',
      classification: 'U',
      title: 'DOJ calls Minnesota lawsuit an "absurdity" that undermines federal supremacy',
      url: 'https://reuters.com/legal/doj-minnesota-lawsuit-response',
      publishedDate: '2026-01-20T16:00:00Z',
      publisherId: 'pub-int-reuters',
      author: 'Jonathan Stempel',
      excerpt: 'Federal lawyers argued the state\'s attempt to end ICE activities would be unprecedented judicial overreach.',
      headerImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'The Department of Justice building in Washington, D.C. Photo: Reuters/Andrew Kelly'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'The Department of Justice filed a scathing response Monday to Minnesota\'s lawsuit seeking to halt ICE operations in the state, calling the legal challenge an "absurdity" that would "fundamentally undermine federal supremacy over immigration enforcement."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'In a 47-page brief, federal lawyers argued that states have no authority to dictate how the federal government enforces immigration law, citing a long line of Supreme Court precedents establishing exclusive federal jurisdiction over immigration matters.', portionMark: { classification: 'U', handling: '' } },
        { type: 'quote', content: '"Minnesota\'s lawsuit represents an unprecedented attempt by a state to nullify federal law. If successful, it would create a patchwork of immigration policies across the country and render national enforcement impossible."', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Federal Preemption Arguments', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The DOJ brief extensively cited Arizona v. United States (2012), in which the Supreme Court struck down portions of Arizona\'s immigration law on the grounds that immigration enforcement is an exclusively federal function.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"The irony is not lost on this department that liberal states now seek to use the same states\' rights arguments they once condemned when used by conservative states," the brief noted.', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Minnesota Responds', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Minnesota Attorney General Keith Ellison said the DOJ\'s response "mischaracterizes our lawsuit" and that the state is not challenging federal immigration authority, but rather the administration\'s "unconstitutional tactics" in enforcing that authority.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"We\'re not saying ICE can\'t operate in Minnesota," Ellison said. "We\'re saying they can\'t violate the Fourth Amendment rights of our residents while doing so. There\'s a difference."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'A hearing on Minnesota\'s request for a preliminary injunction is scheduled for next week.', portionMark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-009'],
      subNarrativeIds: ['sub-023'],
      personIds: ['person-007', 'person-017'],
      organizationIds: ['org-010'],
      locationIds: ['loc-002'],
      eventIds: ['event-023']
    },
    {
      id: 'doc-017',
      documentType: 'news_article',
      classification: 'U',
      title: 'DHS Secretary Noem backtracks: Pepper spray was needed for "law and order"',
      url: 'https://cnn.com/politics/noem-pepper-spray-reversal',
      publishedDate: '2026-01-19T19:30:00Z',
      publisherId: 'pub-nat-cnn',
      author: 'Priscilla Alvarez',
      excerpt: 'After initially denying federal agents used chemical agents, Secretary Noem now says pepper spray was necessary to establish order.',
      headerImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'DHS Secretary Kristi Noem speaks at a press briefing. Photo: CNN'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'Department of Homeland Security Secretary Kristi Noem reversed course Sunday evening, acknowledging that federal agents did use pepper spray during immigration enforcement operations in Minneapolis after initially denying any use of chemical agents.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'In an interview with Fox News, Noem said the pepper spray deployment was "necessary and appropriate" to establish "law and order" in a situation she characterized as "increasingly dangerous."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The admission came just hours after DHS spokesperson released a statement categorically denying that agents had used "any chemical agents" during the operations.', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Contradictory Statements', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'When pressed on the contradiction, Noem said the earlier statement was based on "incomplete information" and that she had personally ordered a review of all footage and reports from the operation.', portionMark: { classification: 'U', handling: '' } },
        { type: 'quote', content: '"Look, our agents were facing a hostile crowd. People were throwing things at them. Pepper spray is a standard, non-lethal tool that our agents are trained to use in exactly these situations. I make no apologies for my agents defending themselves."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Video footage from the scene, however, appears to show agents deploying pepper spray against protesters who were standing peacefully behind a barricade.', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Critics Demand Accountability', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Democratic lawmakers seized on the reversal, with House Homeland Security Committee ranking member Bennie Thompson calling for an investigation into both the use of pepper spray and the "apparent attempt to cover it up."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"First they lied, then they admitted it," Thompson said. "This administration has zero credibility when it comes to how they treat people exercising their constitutional rights."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Noem dismissed the criticism as "political theater" and said she stood by her agents "100 percent."', portionMark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-009'],
      subNarrativeIds: ['sub-024'],
      personIds: ['person-018'],
      organizationIds: ['org-017'],
      locationIds: ['loc-001'],
      eventIds: ['event-025']
    },

    // RFK dietary guidelines documents (narr-010)
    {
      id: 'doc-018',
      documentType: 'news_article',
      classification: 'U',
      title: 'RFK Jr unveils meat-heavy dietary guidelines: "We are ending the war on saturated fats"',
      url: 'https://nytimes.com/2026/01/18/health/rfk-dietary-guidelines-meat',
      publishedDate: '2026-01-18T09:00:00Z',
      publisherId: 'pub-nat-nyt',
      author: 'Roni Caryn Rabin',
      excerpt: 'The new guidelines feature an inverted food pyramid emphasizing steak, poultry, and whole milk, urging Americans to nearly double protein consumption.',
      headerImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'HHS Secretary Robert F. Kennedy Jr. unveils the new Dietary Guidelines for Americans. Photo: NYT/Doug Mills'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'Health and Human Services Secretary Robert F. Kennedy Jr. unveiled dramatically revised Dietary Guidelines for Americans on Saturday, featuring an inverted food pyramid that emphasizes red meat, poultry, and whole-fat dairy products while downplaying fruits, vegetables, and grains.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"For 50 years, the government has told Americans to eat less fat and more carbohydrates, and we\'ve only gotten fatter and sicker," Kennedy said at a press conference. "Today, we are ending the war on saturated fats and embracing the foods that made America strong."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The new guidelines recommend that Americans nearly double their protein consumption, with an emphasis on "high-quality animal proteins" including beef, pork, and chicken. They also recommend whole milk, butter, and cheese as preferred dairy options.', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Major Departures from Scientific Consensus', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The guidelines represent a dramatic break from decades of nutrition science and the recommendations of major health organizations, including the American Heart Association and American Cancer Society.', portionMark: { classification: 'U', handling: '' } },
        { type: 'quote', content: '"These guidelines are not based on science. They\'re based on ideology and industry influence. Following them will lead to increased rates of heart disease, diabetes, and cancer." — Dr. Walter Willett, Harvard School of Public Health', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The new pyramid places grains and fruits at the top, recommending they be consumed "sparingly," while placing red meat and animal fats at the base as foods that should be eaten "abundantly."', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Industry Applauds Changes', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The National Cattlemen\'s Beef Association praised the new guidelines as "a return to common sense nutrition" and said they expected beef sales to increase significantly.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"Americans have been told for too long that the foods our grandparents ate were unhealthy," said NCBA president Don Schiefelbein. "These guidelines recognize what ranchers have always known: beef is what\'s for dinner."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Environmental groups expressed alarm at the potential climate impact of significantly increased meat consumption.', portionMark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-010'],
      subNarrativeIds: ['sub-025'],
      personIds: ['person-026'],
      organizationIds: ['org-022'],
      locationIds: ['loc-001'],
      eventIds: ['event-026']
    },
    {
      id: 'doc-019',
      documentType: 'news_article',
      classification: 'U',
      title: 'Scientists warn: New meat guidelines would require 100 million acres of farmland',
      url: 'https://guardian.com/environment/meat-guidelines-environmental-impact',
      publishedDate: '2026-01-19T12:00:00Z',
      publisherId: 'pub-int-guardian',
      author: 'Oliver Milman',
      excerpt: 'World Resources Institute estimates the guidelines would add hundreds of millions of tons of emissions and require an area the size of California.',
      headerImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'Cattle grazing on farmland in Texas. The new dietary guidelines could significantly increase demand for beef. Photo: Guardian/Getty'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'The new federal dietary guidelines released this week would require an additional 100 million acres of farmland to meet increased meat demand—an area roughly the size of California—while adding hundreds of millions of tons of greenhouse gas emissions annually, according to an analysis by the World Resources Institute.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The environmental research organization calculated that if Americans followed the new guidelines, beef production alone would need to increase by approximately 40%, requiring massive expansion of cattle ranching into forests, wetlands, and other natural areas.', portionMark: { classification: 'U', handling: '' } },
        { type: 'quote', content: '"These guidelines would be catastrophic for climate change efforts. We\'d be looking at an additional 300-400 million metric tons of CO2 equivalent emissions per year, just from the dietary changes." — Tim Searchinger, WRI Senior Fellow', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Water and Land Impacts', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Beyond emissions, the analysis found that the increased meat production would require approximately 15 trillion additional gallons of water annually and would accelerate deforestation in the Amazon and other critical ecosystems to create new grazing land.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"The environmental math simply doesn\'t work," said Dr. Sarah Lake, a food systems researcher at Stanford University. "The planet cannot sustain the level of meat consumption these guidelines encourage."', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Administration Dismisses Concerns', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'HHS Secretary Robert F. Kennedy Jr. dismissed the environmental analysis as "climate alarmism" and said American agricultural innovation would meet any increased demand without significant environmental impact.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"American farmers are the most efficient in the world," Kennedy said. "These doomsday predictions assume nothing will change. Technology will solve these problems, just as it always has."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Environmental groups said they would challenge the guidelines in court, arguing they violate federal environmental review requirements.', portionMark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-010'],
      subNarrativeIds: ['sub-026'],
      personIds: [],
      organizationIds: ['org-023'],
      locationIds: [],
      eventIds: []
    },
    {
      id: 'doc-020',
      documentType: 'news_article',
      classification: 'U',
      title: 'RFK Jr in 2004: Factory meat industry is "bigger threat than Osama bin Laden"',
      url: 'https://msnbc.com/opinion/rfk-jr-meat-industry-past-quotes',
      publishedDate: '2026-01-20T08:00:00Z',
      publisherId: 'pub-nat-msnbc',
      author: 'Hayes Brown',
      excerpt: 'Critics highlight Kennedy\'s past environmental activism that sharply contradicts his new pro-meat dietary guidelines.',
      headerImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'Robert F. Kennedy Jr. speaking at an environmental rally in 2004. Photo: MSNBC/File'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'As HHS Secretary Robert F. Kennedy Jr. promotes new federal guidelines encouraging Americans to eat more meat, critics are circulating his past statements condemning the meat industry in the harshest possible terms.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'In a 2004 speech at the Sierra Club, Kennedy called factory farming "a bigger threat to America than Osama bin Laden" and said the meat industry was "destroying our waterways, poisoning our air, and making us sick."', portionMark: { classification: 'U', handling: '' } },
        { type: 'quote', content: '"These factory farms are not farms at all—they are industrial polluters masquerading as agriculture. They are poisoning rural America and producing meat that is making our nation sicker and fatter." — RFK Jr., 2004', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Decades of Anti-Meat Advocacy', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Kennedy spent decades as an environmental lawyer suing meat producers on behalf of communities affected by pollution from hog farms and cattle operations. His organization, Waterkeeper Alliance, won several landmark cases forcing meat companies to pay millions in damages.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'As recently as 2019, Kennedy wrote that Americans should "dramatically reduce" their meat consumption to address climate change and public health concerns.', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Kennedy Defends Shift', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Asked about the apparent contradiction, Kennedy said his views have "evolved" based on new research and that his previous criticisms were directed at "industrialized factory farming," not meat consumption itself.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"I still believe we need to reform how meat is produced," Kennedy said. "But the science is clear that animal protein is essential for human health. My job as HHS Secretary is to give Americans accurate nutrition information, not to advance an environmental agenda."', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Critics called the explanation unconvincing, noting that the new guidelines make no distinction between factory-farmed and sustainably-raised meat.', portionMark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-010'],
      subNarrativeIds: ['sub-027'],
      personIds: ['person-026'],
      organizationIds: ['org-022'],
      locationIds: [],
      eventIds: []
    },

    // Food preservatives documents (narr-003)
    {
      id: 'doc-021',
      documentType: 'news_article',
      classification: 'U',
      title: 'NutriNet-Santé study links sodium nitrite to 32% increased cancer risk',
      url: 'https://bbc.com/news/health-food-preservatives-cancer-study',
      publishedDate: '2026-01-08T10:00:00Z',
      publisherId: 'pub-int-bbc',
      author: 'James Gallagher',
      excerpt: 'A major French study found sodium nitrite—common in deli meats—is associated with significantly higher prostate cancer risk.',
      headerImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'Processed meats containing sodium nitrite on display at a supermarket. Photo: BBC/Getty'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'A major French study has found that consuming sodium nitrite—a common preservative in processed meats—is associated with a 32% increased risk of prostate cancer, adding to growing evidence linking the additive to serious health problems.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The NutriNet-Santé study, published in the International Journal of Epidemiology, followed more than 100,000 adults over a decade, tracking their consumption of foods containing sodium nitrite and subsequent cancer diagnoses.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Researchers found a clear dose-response relationship: participants who consumed the most sodium nitrite had significantly higher cancer rates than those who consumed the least.', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Common in Everyday Foods', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Sodium nitrite is found in many common foods, including bacon, ham, hot dogs, deli meats, and some canned products. It serves both as a preservative and gives processed meats their characteristic pink color.', portionMark: { classification: 'U', handling: '' } },
        { type: 'quote', content: '"Our findings add to the body of evidence suggesting that sodium nitrite consumption should be minimized. The increased cancer risk was significant and consistent across our study population." — Dr. Mathilde Touvier, lead researcher', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The World Health Organization has classified processed meat as a Group 1 carcinogen since 2015, though sodium nitrite\'s specific contribution to cancer risk has been debated.', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Industry Response', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The North American Meat Institute disputed the findings, calling the study "observational" and noting that it cannot prove causation. "Sodium nitrite has been used safely for over a century," a spokesperson said.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Some food companies have begun offering "nitrite-free" versions of popular products, though experts note that these often use celery powder, which naturally contains nitrites in similar concentrations.', portionMark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-003'],
      subNarrativeIds: ['sub-007'],
      personIds: [],
      organizationIds: ['org-003'],
      locationIds: [],
      eventIds: []
    },
    {
      id: 'doc-022',
      documentType: 'news_article',
      classification: 'U',
      title: 'Harvard: Ultra-processed foods linked to 45% higher colorectal cancer risk',
      url: 'https://cnn.com/health/harvard-processed-food-cancer-study',
      publishedDate: '2026-01-10T14:00:00Z',
      publisherId: 'pub-nat-cnn',
      author: 'Sandee LaMotte',
      excerpt: 'Researchers found high consumption of ultra-processed foods correlates with significantly increased risk of precancerous colorectal adenomas.',
      headerImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'Ultra-processed foods including packaged snacks and ready meals. Photo: CNN/Getty'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'A new Harvard study has found that people who regularly consume ultra-processed foods have a 45% higher risk of developing precancerous colorectal adenomas compared to those who eat primarily whole foods.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The research, published in the journal Gastroenterology, analyzed dietary data from more than 45,000 participants in the Health Professionals Follow-Up Study and correlated it with colonoscopy results over a 20-year period.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: '"This is one of the largest and longest studies to examine the relationship between ultra-processed food consumption and colorectal cancer precursors," said lead author Dr. Lu Wang of the Harvard T.H. Chan School of Public Health.', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'What Are Ultra-Processed Foods?', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Ultra-processed foods are defined as industrial formulations made mostly from substances derived from foods, with little or no intact food. Examples include soft drinks, packaged snacks, instant noodles, chicken nuggets, and ready-to-heat meals.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'These products typically contain additives such as emulsifiers, artificial sweeteners, and preservatives that have been linked to inflammation and changes in gut microbiome composition.', portionMark: { classification: 'U', handling: '' } },
        { type: 'quote', content: '"The risk was particularly elevated for certain types of ultra-processed foods, including processed meats and sugar-sweetened beverages. But we saw increased risk across the category." — Dr. Lu Wang', portionMark: { classification: 'U', handling: '' } },
        { type: 'heading', content: 'Implications for Public Health', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The findings are particularly concerning given that ultra-processed foods now make up nearly 60% of calories consumed by American adults, according to previous research.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Colorectal cancer is the third most common cancer in the United States and the second leading cause of cancer death. Rates have been increasing among younger adults, a trend some researchers attribute to dietary changes.', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The American Cancer Society recommends limiting consumption of processed and ultra-processed foods as part of a cancer prevention strategy.', portionMark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-003'],
      subNarrativeIds: [],
      personIds: [],
      organizationIds: [],
      locationIds: [],
      eventIds: []
    },
    {
      id: 'doc-023',
      documentType: 'social_post',
      url: 'https://tiktok.com/@healthnews/video/123456',
      publishedDate: '2026-01-12T18:00:00Z',
      publisherId: 'pub-tiktok',
      author: {
        username: '@healthnews',
        displayName: 'Health News Daily',
        avatarUrl: 'img/placeholders/avatar-default.svg'
      },
      content: 'The cancer study everyone is talking about 🧵 New research links food preservatives to 32% higher cancer risk. Here\'s what you need to know and what foods to AVOID. #health #cancer #foodsafety #wellness #plantbased',
      video: {
        thumbnailUrl: 'img/placeholders/video-thumbnail.svg',
        duration: 87
      },
      transcription: 'So this new study just dropped and it\'s kind of terrifying. Researchers found that sodium nitrite, which is in like ALL processed meats - bacon, hot dogs, deli meat - is linked to a 32% increase in prostate cancer risk. And potassium nitrate? 22% higher breast cancer risk. The good news is there are alternatives. More and more people are switching to plant-based options and honestly? The vegan influencers have been saying this for years. Time to clean up our diets, people.',
      engagement: {
        replies: 8234,
        likes: 245891,
        reblogs: 42156
      },
      narrativeIds: ['narr-003'],
      subNarrativeIds: ['sub-006'],
      personIds: [],
      organizationIds: ['org-004'],
      locationIds: [],
      eventIds: []
    },

    // Social media posts as documents
    {
      id: 'doc-024',
      documentType: 'social_post',
      url: 'https://x.com/user/status/123456789',
      publishedDate: '2026-01-19T16:00:00Z',
      publisherId: 'pub-x',
      author: {
        username: '@ImmigrantRights',
        displayName: 'Immigrant Rights Watch',
        avatarUrl: 'img/placeholders/avatar-default.svg'
      },
      content: 'THREAD: David Easterwood is an ICE official in Minneapolis. On Sundays, he preaches at Cities Church about Christian love and compassion.\n\nDuring the week, he oversees operations that separate families and detain asylum seekers.\n\nHow do you reconcile these two roles? 🧵 (1/12)',
      engagement: {
        replies: 12847,
        likes: 67234,
        reblogs: 28491
      },
      narrativeIds: ['narr-008'],
      subNarrativeIds: ['sub-021'],
      personIds: ['person-014'],
      organizationIds: ['org-011', 'org-016'],
      locationIds: ['loc-008'],
      eventIds: ['event-017']
    },
    {
      id: 'doc-025',
      documentType: 'social_post',
      url: 'https://reddit.com/r/minnesota/comments/abc123',
      publishedDate: '2026-01-17T20:00:00Z',
      publisherId: 'pub-reddit',
      author: {
        username: 'u/mpls_witness_2026',
        displayName: 'mpls_witness_2026',
        avatarUrl: 'img/placeholders/avatar-default.svg'
      },
      content: '**[AMA] I was at the Minneapolis ICE protest when federal agents used pepper spray on peaceful demonstrators. Ask me anything.**\n\nI\'ve been protesting for three days now. What I\'ve seen is terrifying. Federal agents in unmarked vehicles, people being grabbed off the street, pepper spray used on people who were just standing there with signs.\n\nI have video. I have photos. I\'m willing to share what I witnessed.\n\nProof sent to mods.\n\n**Edit:** Wow this blew up. I\'ll try to answer as many questions as I can. To those asking - yes, I\'m safe. For now.\n\n**Edit 2:** For everyone asking about legal resources, check the pinned comment.',
      engagement: {
        replies: 8234,
        likes: 24891,
        reblogs: 1247
      },
      narrativeIds: ['narr-006'],
      subNarrativeIds: ['sub-013'],
      personIds: [],
      organizationIds: ['org-011'],
      locationIds: ['loc-002'],
      eventIds: []
    },

    // ============================================
    // NEW DOCUMENT TYPES - Social Posts, TikTok, Internal
    // ============================================

    // Social Post - X (Twitter)
    {
      id: 'doc-026',
      documentType: 'social_post',
      classification: 'U',
      url: 'https://x.com/EuropaWatch/status/1881234567890',
      publishedDate: '2026-01-20T15:42:00Z',
      publisherId: 'pub-x',
      author: {
        username: '@EuropaWatch',
        displayName: 'Europa Watch',
        avatarUrl: 'img/placeholders/avatar-default.svg'
      },
      content: 'BREAKING: Macron just called out Trump at Davos without naming him directly. "International law is being trampled" he said. The crowd went silent. This is unprecedented.\n\nEU leaders are clearly coordinating their response to the Greenland situation. Thread incoming...',
      media: [
        { type: 'image', url: 'img/placeholders/image-placeholder.svg', altText: 'Macron speaking at Davos' }
      ],
      engagement: {
        replies: 2847,
        likes: 18420,
        reblogs: 7823
      },
      contentPortionMarks: [
        { startIndex: 0, endIndex: 245, mark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-005'],
      subNarrativeIds: ['sub-009'],
      personIds: ['person-004'],
      organizationIds: ['org-009'],
      locationIds: ['loc-005'],
      eventIds: ['event-006'],
      highlights: [
        {
          id: 'highlight-006',
          userId: 'user-004',
          blockIndex: null,
          startOffset: 55,
          endOffset: 121,
          highlightedText: '"International law is being trampled" he said. The crowd went silent.',
          createdAt: '2026-01-20T17:30:00Z'
        }
      ]
    },

    // Social Post - Facebook
    {
      id: 'doc-027',
      documentType: 'social_post',
      classification: 'U',
      url: 'https://facebook.com/MinneapolisCommunity/posts/987654321',
      publishedDate: '2026-01-19T18:30:00Z',
      publisherId: 'pub-facebook',
      author: {
        username: 'MinneapolisCommunity',
        displayName: 'Minneapolis Community Action',
        avatarUrl: 'img/placeholders/avatar-default.svg'
      },
      content: 'We were there today. The federal agents moved in without warning. Peaceful protesters were grabbed off the sidewalk.\n\nThis is what we witnessed:\n- Unmarked vehicles circling the area starting at 6am\n- Agents refusing to show badges when asked\n- At least 12 people detained that we saw\n\nShare this. People need to know what\'s happening in our city.',
      media: [
        { type: 'image', url: 'img/placeholders/image-placeholder.svg', altText: 'Protesters gathering in Minneapolis' },
        { type: 'image', url: 'img/placeholders/image-placeholder.svg', altText: 'Federal vehicles on street' }
      ],
      engagement: {
        replies: 892,
        likes: 4521,
        reblogs: 3102
      },
      contentPortionMarks: [
        { startIndex: 0, endIndex: 400, mark: { classification: 'U', handling: '' } }
      ],
      narrativeIds: ['narr-006'],
      subNarrativeIds: ['sub-013'],
      personIds: [],
      organizationIds: ['org-011'],
      locationIds: ['loc-002'],
      eventIds: ['event-011']
    },

    // TikTok Post
    {
      id: 'doc-028',
      documentType: 'social_post',
      classification: 'U',
      url: 'https://tiktok.com/@protestwatcher/video/7890123456789',
      publishedDate: '2026-01-19T20:15:00Z',
      publisherId: 'pub-tiktok',
      author: {
        username: '@protestwatcher',
        displayName: 'Protest Watcher',
        avatarUrl: 'img/placeholders/avatar-default.svg'
      },
      content: 'I cannot believe what I just filmed outside the church. ICE agents showed up during Sunday service. #Minneapolis #ICE #Immigration',
      video: {
        url: 'img/placeholders/video-thumbnail.svg',
        thumbnailUrl: 'img/placeholders/video-thumbnail.svg',
        duration: 47
      },
      transcription: 'Okay so I\'m here outside Cities Church in St. Paul and you\'re not gonna believe this. ICE agents just pulled up, there\'s like four unmarked cars. People are still inside the service. Someone said the pastor here actually works for ICE? I don\'t know if that\'s true but... yeah they\'re going in now. This is wild. People are coming out, some are yelling. I\'m gonna keep filming.',
      transcriptionPortionMarks: [
        { startIndex: 0, endIndex: 350, mark: { classification: 'U', handling: '' } }
      ],
      engagement: {
        replies: 15234,
        likes: 89421,
        reblogs: 42156
      },
      narrativeIds: ['narr-008'],
      subNarrativeIds: ['sub-021'],
      personIds: ['person-014'],
      organizationIds: ['org-016'],
      locationIds: ['loc-008'],
      eventIds: ['event-017']
    },

    // Internal Document - Secret
    {
      id: 'doc-029',
      documentType: 'internal',
      classification: 'S',
      url: null,
      publishedDate: '2026-01-18T09:00:00Z',
      publisherId: 'pub-dept-intel',
      title: 'Assessment: Foreign Influence Operations Targeting Greenland Narrative',
      author: 'Intelligence Analysis Division',
      department: 'Intelligence Analysis',
      contentBlocks: [
        { type: 'heading', content: 'Executive Summary', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'This assessment examines foreign influence operations detected in connection with the ongoing Greenland acquisition narrative. Open source intelligence indicates coordinated amplification of divisive content across multiple platforms.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Key Findings', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Analysis of network traffic patterns reveals coordinated inauthentic behavior originating from infrastructure previously associated with state-sponsored operations. Approximately 23% of high-engagement posts on the Greenland topic show indicators of artificial amplification.', portionMark: { classification: 'S', handling: 'NOFORN' } },
        { type: 'paragraph', content: 'Specific tactics observed include: rapid cross-platform content seeding, use of previously dormant accounts, and coordinated engagement timing consistent with automated systems.', portionMark: { classification: 'S', handling: 'NOFORN' } },
        { type: 'heading', content: 'Recommendations', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Continued monitoring of identified networks is recommended. Coordination with platform trust and safety teams should be considered for accounts exhibiting clear policy violations.', portionMark: { classification: 'U', handling: 'FOUO' } }
      ],
      excerpt: 'Assessment of foreign influence operations targeting the Greenland acquisition narrative, including network analysis and amplification patterns.',
      narrativeIds: ['narr-005'],
      subNarrativeIds: ['sub-009', 'sub-010'],
      personIds: [],
      organizationIds: [],
      locationIds: ['loc-006'],
      eventIds: [],
      highlights: [
        {
          id: 'highlight-007',
          userId: 'user-003',
          blockIndex: 3,
          startOffset: 0,
          endOffset: 125,
          highlightedText: 'Analysis of network traffic patterns reveals coordinated inauthentic behavior originating from infrastructure previously associated',
          createdAt: '2026-01-18T11:15:00Z'
        },
        {
          id: 'highlight-008',
          userId: 'user-006',
          blockIndex: 3,
          startOffset: 183,
          endOffset: 274,
          highlightedText: 'Approximately 23% of high-engagement posts on the Greenland topic show indicators of artificial amplification',
          createdAt: '2026-01-18T11:45:00Z'
        },
        {
          id: 'highlight-009',
          userId: 'user-001',
          blockIndex: 4,
          startOffset: 0,
          endOffset: 176,
          highlightedText: 'Specific tactics observed include: rapid cross-platform content seeding, use of previously dormant accounts, and coordinated engagement timing consistent with automated systems.',
          createdAt: '2026-01-18T14:00:00Z'
        }
      ],
      comments: [
        {
          id: 'comment-005',
          userId: 'user-003',
          blockIndex: 3,
          anchorStartOffset: 183,
          anchorEndOffset: 274,
          anchorText: 'Approximately 23% of high-engagement posts on the Greenland topic show indicators of artificial amplification',
          content: 'This is higher than what we saw during the 2024 election cycle. Cyber team should prioritize attribution work on this network.',
          createdAt: '2026-01-18T12:00:00Z',
          replies: [
            {
              id: 'reply-006',
              userId: 'user-006',
              content: 'Agreed. I\'m elevating this to the daily brief. Can you prepare a one-pager on the network characteristics?',
              createdAt: '2026-01-18T12:30:00Z'
            },
            {
              id: 'reply-007',
              userId: 'user-003',
              content: 'Will do. Should have it ready by 1500.',
              createdAt: '2026-01-18T12:45:00Z'
            }
          ]
        },
        {
          id: 'comment-006',
          userId: 'user-001',
          blockIndex: 6,
          anchorStartOffset: 0,
          anchorEndOffset: 85,
          anchorText: 'Continued monitoring of identified networks is recommended. Coordination with platform',
          content: 'Have we initiated contact with the platforms yet? Last I heard we were still working through legal.',
          createdAt: '2026-01-18T14:15:00Z',
          replies: [
            {
              id: 'reply-008',
              userId: 'user-005',
              content: 'Legal cleared the request yesterday. I\'m scheduling a call with X\'s trust & safety team for Thursday.',
              createdAt: '2026-01-18T14:30:00Z'
            }
          ]
        }
      ]
    },

    // Internal Document - Top Secret
    {
      id: 'doc-030',
      documentType: 'internal',
      classification: 'TS',
      url: null,
      publishedDate: '2026-01-17T14:30:00Z',
      publisherId: 'pub-dept-cyber',
      title: 'Technical Analysis: Attribution of Coordinated Amplification Network',
      author: 'Cyber Operations Division',
      department: 'Cyber Operations',
      contentBlocks: [
        { type: 'heading', content: 'Classification', portionMark: { classification: 'TS', handling: 'SI' } },
        { type: 'paragraph', content: 'This document contains technical indicators and attribution analysis derived from sensitive collection methods. Handling restrictions apply.', portionMark: { classification: 'TS', handling: 'SI' } },
        { type: 'heading', content: 'Technical Indicators', portionMark: { classification: 'S', handling: '' } },
        { type: 'paragraph', content: 'Network infrastructure analysis identified 47 distinct command and control nodes coordinating the amplification campaign. Geolocation data indicates primary operational base consistent with previous attributed activity.', portionMark: { classification: 'TS', handling: 'SI' } },
        { type: 'paragraph', content: 'Malware signatures recovered from compromised accounts match known tooling associated with state-sponsored cyber operations.', portionMark: { classification: 'TS', handling: 'SI' } },
        { type: 'heading', content: 'Attribution Confidence', portionMark: { classification: 'S', handling: '' } },
        { type: 'paragraph', content: 'Based on the convergence of technical indicators, operational patterns, and historical precedent, we assess with high confidence that this campaign is directed by a foreign intelligence service.', portionMark: { classification: 'S', handling: 'NOFORN' } }
      ],
      excerpt: 'Technical attribution analysis of coordinated amplification network with high-confidence assessment of foreign intelligence service involvement.',
      narrativeIds: ['narr-005'],
      subNarrativeIds: ['sub-009'],
      personIds: [],
      organizationIds: [],
      locationIds: [],
      eventIds: [],
      highlights: [
        {
          id: 'highlight-010',
          userId: 'user-003',
          blockIndex: 3,
          startOffset: 0,
          endOffset: 105,
          highlightedText: 'Network infrastructure analysis identified 47 distinct command and control nodes coordinating the amplification campaign',
          createdAt: '2026-01-17T16:00:00Z'
        },
        {
          id: 'highlight-011',
          userId: 'user-006',
          blockIndex: 4,
          startOffset: 0,
          endOffset: 123,
          highlightedText: 'Malware signatures recovered from compromised accounts match known tooling associated with state-sponsored cyber operations.',
          createdAt: '2026-01-17T16:30:00Z'
        },
        {
          id: 'highlight-012',
          userId: 'user-001',
          blockIndex: 6,
          startOffset: 80,
          endOffset: 193,
          highlightedText: 'we assess with high confidence that this campaign is directed by a foreign intelligence service',
          createdAt: '2026-01-17T17:00:00Z'
        }
      ],
      comments: [
        {
          id: 'comment-007',
          userId: 'user-003',
          blockIndex: 3,
          anchorStartOffset: 0,
          anchorEndOffset: 105,
          anchorText: 'Network infrastructure analysis identified 47 distinct command and control nodes coordinating the amplification campaign',
          content: 'This is a significant escalation from the 12 nodes we identified last month. They\'re clearly scaling up operations.',
          createdAt: '2026-01-17T16:15:00Z',
          replies: [
            {
              id: 'reply-009',
              userId: 'user-006',
              content: 'Agreed. We should brief the NSC on this expansion. Can you prepare a trend analysis?',
              createdAt: '2026-01-17T16:45:00Z'
            }
          ]
        },
        {
          id: 'comment-008',
          userId: 'user-001',
          blockIndex: 6,
          anchorStartOffset: 80,
          anchorEndOffset: 193,
          anchorText: 'we assess with high confidence that this campaign is directed by a foreign intelligence service',
          content: 'This is the key finding. Make sure this language is in the PDB summary.',
          createdAt: '2026-01-17T17:15:00Z',
          replies: [
            {
              id: 'reply-010',
              userId: 'user-003',
              content: 'Already drafted. Should be in tomorrow morning\'s brief.',
              createdAt: '2026-01-17T17:30:00Z'
            }
          ]
        }
      ]
    },

    // Internal Document - Minnesota Immigration Enforcement Situation Report (SECRET)
    {
      id: 'doc-031',
      documentType: 'internal',
      classification: 'S',
      url: null,
      publishedDate: '2026-01-19T08:00:00Z',
      publisherId: 'pub-dept-intel',
      title: 'Situation Report: Minnesota Immigration Enforcement Operations',
      author: 'Domestic Operations Division',
      department: 'Domestic Operations',
      contentBlocks: [
        { type: 'heading', content: 'Operational Overview', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Federal immigration enforcement operations in Minnesota have escalated significantly following the DOJ subpoena announcement targeting state officials. Tensions between federal agents and local authorities continue to intensify.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Use of Force Incident', portionMark: { classification: 'S', handling: '' } },
        { type: 'paragraph', content: 'The fatal shooting of protester Renee Good by ICE agent on January 17 remains under investigation. FBI civil rights probe has pivoted focus from agent to victim\'s background, generating significant backlash from civil liberties organizations. Agent involved placed on administrative leave pending outcome.', portionMark: { classification: 'S', handling: 'NOFORN' } },
        { type: 'heading', content: 'State-Federal Conflict', portionMark: { classification: 'S', handling: '' } },
        { type: 'paragraph', content: 'Minnesota AG Keith Ellison (person-007) pursuing state court injunction against ICE operations. Federal judge ruled protesters cannot be arrested without cause; DOJ has appealed. Governor Tim Walz coordinating with Minneapolis Mayor on non-cooperation policy.', portionMark: { classification: 'S', handling: 'NOFORN' } },
        { type: 'heading', content: 'Protest Activity Assessment', portionMark: { classification: 'S', handling: '' } },
        { type: 'paragraph', content: 'Protest activity expanding beyond Minneapolis to St. Paul. Church protest at Cities Church drew national attention—Pastor David Easterwood\'s dual role as ICE official generating significant controversy. FACE Act investigation announced by AG Bondi.', portionMark: { classification: 'S', handling: 'NOFORN' } },
        { type: 'heading', content: 'Faction Analysis', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'American Left Wing faction (faction-002) shows 92% negative sentiment toward federal actions. Immigration Rights faction (faction-003) actively organizing demonstrations. American Right Wing faction (faction-001) supporting federal enforcement with 85% positive sentiment.', portionMark: { classification: 'U', handling: 'FOUO' } }
      ],
      excerpt: 'Situation report on Minnesota immigration enforcement operations, including use of force incident and state-federal conflict analysis.',
      narrativeIds: ['narr-006', 'narr-008', 'narr-009'],
      subNarrativeIds: ['sub-012', 'sub-013', 'sub-015', 'sub-018', 'sub-021'],
      personIds: ['person-007', 'person-008', 'person-013', 'person-014'],
      organizationIds: ['org-010', 'org-011', 'org-016'],
      locationIds: ['loc-002', 'loc-008'],
      eventIds: ['event-010', 'event-011', 'event-013', 'event-014', 'event-017'],
      factionIds: ['faction-001', 'faction-002', 'faction-003'],
      highlights: [
        {
          id: 'highlight-013',
          userId: 'user-002',
          blockIndex: 3,
          startOffset: 0,
          endOffset: 98,
          highlightedText: 'The fatal shooting of protester Renee Good by ICE agent on January 17 remains under investigation.',
          createdAt: '2026-01-19T09:15:00Z'
        },
        {
          id: 'highlight-014',
          userId: 'user-004',
          blockIndex: 5,
          startOffset: 0,
          endOffset: 118,
          highlightedText: 'Minnesota AG Keith Ellison (person-007) pursuing state court injunction against ICE operations. Federal judge ruled',
          createdAt: '2026-01-19T09:45:00Z'
        },
        {
          id: 'highlight-015',
          userId: 'user-001',
          blockIndex: 9,
          startOffset: 0,
          endOffset: 180,
          highlightedText: 'American Left Wing faction (faction-002) shows 92% negative sentiment toward federal actions. Immigration Rights faction (faction-003) actively organizing demonstrations.',
          createdAt: '2026-01-19T10:30:00Z'
        }
      ],
      comments: [
        {
          id: 'comment-009',
          userId: 'user-002',
          blockIndex: 3,
          anchorStartOffset: 99,
          anchorEndOffset: 228,
          anchorText: 'FBI civil rights probe has pivoted focus from agent to victim\'s background, generating significant backlash from civil liberties organizations.',
          content: 'This pivot is going to dominate the news cycle. Legal team should prepare talking points for the inevitable congressional inquiries.',
          createdAt: '2026-01-19T09:30:00Z',
          replies: [
            {
              id: 'reply-011',
              userId: 'user-005',
              content: 'Already seeing calls for hearings from the Congressional Hispanic Caucus.',
              createdAt: '2026-01-19T09:45:00Z'
            },
            {
              id: 'reply-012',
              userId: 'user-002',
              content: 'Loop in Congressional Affairs. They need to be ahead of this.',
              createdAt: '2026-01-19T10:00:00Z'
            }
          ]
        },
        {
          id: 'comment-010',
          userId: 'user-001',
          blockIndex: 9,
          anchorStartOffset: 0,
          anchorEndOffset: 95,
          anchorText: 'American Left Wing faction (faction-002) shows 92% negative sentiment toward federal actions.',
          content: 'These sentiment numbers are useful for the weekly faction dynamics brief. Include trend data from the past 30 days.',
          createdAt: '2026-01-19T10:45:00Z',
          replies: []
        }
      ]
    },

    // Internal Document - Church Protest FACE Act Assessment
    {
      id: 'doc-032',
      documentType: 'internal',
      classification: 'U',
      url: null,
      publishedDate: '2026-01-20T11:00:00Z',
      publisherId: 'pub-dept-legal',
      title: 'Legal Assessment: FACE Act Applicability to Cities Church Protest',
      author: 'Legal Analysis Division',
      department: 'Legal Affairs',
      contentBlocks: [
        { type: 'heading', content: 'Background', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'On January 19, 2026, protesters disrupted Sunday worship service at Cities Church in St. Paul, Minnesota. The protest targeted Pastor David Easterwood, who serves in a dual capacity as an ICE official. AG Pam Bondi announced a FACE Act investigation.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'FACE Act Elements', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'The Freedom of Access to Clinic Entrances (FACE) Act prohibits force, threat of force, or physical obstruction to intentionally injure, intimidate, or interfere with any person obtaining or providing reproductive health services, or exercising religious freedom. Key question: Does protest activity constitute "physical obstruction"?', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Analysis', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Video evidence shows protesters entered sanctuary during service and chanted slogans. No physical contact with congregants documented. Protesters departed when requested by church staff. Similar conduct in prior cases has not typically resulted in FACE Act prosecution.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'paragraph', content: 'Prosecution faces challenges: (1) Protesters did not prevent congregants from entering/exiting, (2) No evidence of threat or force, (3) First Amendment concerns regarding political speech in semi-public forum. Defense likely to argue protest targeted government official, not religious exercise.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Press Freedom Concerns', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'AAG Harmeet Dhillon\'s statement that journalist Don Lemon is "on notice" raises significant First Amendment issues. Threatening prosecution of journalists for covering protests may face constitutional challenges and generate adverse media coverage.', portionMark: { classification: 'U', handling: 'FOUO' } }
      ],
      excerpt: 'Legal assessment of FACE Act applicability to Cities Church protest and press freedom implications of journalist threats.',
      narrativeIds: ['narr-008'],
      subNarrativeIds: ['sub-018', 'sub-019', 'sub-020', 'sub-021'],
      personIds: ['person-012', 'person-013', 'person-014', 'person-015', 'person-016'],
      organizationIds: ['org-010', 'org-016'],
      locationIds: ['loc-008'],
      eventIds: ['event-017', 'event-018', 'event-019', 'event-020'],
      factionIds: ['faction-001', 'faction-002', 'faction-004'],
      highlights: [
        {
          id: 'highlight-016',
          userId: 'user-005',
          blockIndex: 5,
          startOffset: 0,
          endOffset: 132,
          highlightedText: 'Video evidence shows protesters entered sanctuary during service and chanted slogans. No physical contact with congregants documented.',
          createdAt: '2026-01-20T12:00:00Z'
        },
        {
          id: 'highlight-017',
          userId: 'user-002',
          blockIndex: 6,
          startOffset: 0,
          endOffset: 78,
          highlightedText: 'Prosecution faces challenges: (1) Protesters did not prevent congregants from entering/exiting',
          createdAt: '2026-01-20T12:30:00Z'
        },
        {
          id: 'highlight-018',
          userId: 'user-006',
          blockIndex: 8,
          startOffset: 0,
          endOffset: 122,
          highlightedText: 'AAG Harmeet Dhillon\'s statement that journalist Don Lemon is "on notice" raises significant First Amendment issues.',
          createdAt: '2026-01-20T13:00:00Z'
        }
      ],
      comments: [
        {
          id: 'comment-011',
          userId: 'user-005',
          blockIndex: 6,
          anchorStartOffset: 0,
          anchorEndOffset: 274,
          anchorText: 'Prosecution faces challenges: (1) Protesters did not prevent congregants from entering/exiting, (2) No evidence of threat or force, (3) First Amendment concerns regarding political speech in semi-public forum. Defense likely to argue protest targeted government official, not religious exercise.',
          content: 'These are significant hurdles. If DOJ proceeds despite weak case, it looks political. Recommend flagging this for leadership.',
          createdAt: '2026-01-20T12:45:00Z',
          replies: [
            {
              id: 'reply-013',
              userId: 'user-001',
              content: 'Good analysis. Include this in the daily litigation summary.',
              createdAt: '2026-01-20T13:15:00Z'
            }
          ]
        },
        {
          id: 'comment-012',
          userId: 'user-006',
          blockIndex: 8,
          anchorStartOffset: 122,
          anchorEndOffset: 241,
          anchorText: 'Threatening prosecution of journalists for covering protests may face constitutional challenges and generate adverse media coverage.',
          content: 'This is the bigger story. Press freedom groups are already mobilizing. Expect significant international attention.',
          createdAt: '2026-01-20T13:30:00Z',
          replies: [
            {
              id: 'reply-014',
              userId: 'user-002',
              content: 'CPJ and RSF have already issued statements. Should we prepare a foreign media impact assessment?',
              createdAt: '2026-01-20T13:45:00Z'
            },
            {
              id: 'reply-015',
              userId: 'user-006',
              content: 'Yes, particularly for European allies. They\'re very sensitive to press freedom issues.',
              createdAt: '2026-01-20T14:00:00Z'
            }
          ]
        }
      ]
    },

    // Internal Document - Indiana Judge Shooting Security Assessment
    {
      id: 'doc-033',
      documentType: 'internal',
      classification: 'U',
      url: null,
      publishedDate: '2026-01-20T09:00:00Z',
      publisherId: 'pub-dept-security',
      title: 'Security Assessment: Judicial Targeting Threat Following Indiana Shooting',
      author: 'Protective Intelligence Division',
      department: 'Protective Operations',
      contentBlocks: [
        { type: 'heading', content: 'Incident Summary', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'On January 19, 2026, Tippecanoe Superior Court Judge Steven Meyer and his wife Kimberly were shot at their residence. Both victims sustained non-life-threatening injuries. Suspect remains at large as of this assessment.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Threat Context', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'This incident follows a concerning trend of violence targeting judicial officials. In 2025, there were 47 documented threats against federal judges, up 35% from 2024. State judges face similar escalating threat environment but fewer protective resources.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Investigation Status', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Multi-agency investigation led by Indiana State Police with FBI support. Motive undetermined—working theories include case-related retaliation and personal dispute. Judge Meyer presided over both criminal and civil matters; case review underway for potential connections.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Response Measures', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Indiana Chief Justice Loretta H. Rush issued security advisory to all state judges. US Marshals Service increasing coordination with state judicial security programs. Recommend enhanced threat assessment protocols for judges handling high-profile or controversial cases.', portionMark: { classification: 'U', handling: 'FOUO' } }
      ],
      excerpt: 'Security assessment following shooting of Indiana judge, including threat context and protective recommendations.',
      narrativeIds: ['narr-007'],
      subNarrativeIds: ['sub-016', 'sub-017'],
      personIds: ['person-009', 'person-010', 'person-011'],
      organizationIds: ['org-013', 'org-014', 'org-015'],
      locationIds: ['loc-007'],
      eventIds: ['event-015', 'event-016'],
      factionIds: [],
      highlights: [
        {
          id: 'highlight-019',
          userId: 'user-004',
          blockIndex: 3,
          startOffset: 67,
          endOffset: 187,
          highlightedText: 'In 2025, there were 47 documented threats against federal judges, up 35% from 2024. State judges face similar escalating threat environment',
          createdAt: '2026-01-20T10:00:00Z'
        },
        {
          id: 'highlight-020',
          userId: 'user-001',
          blockIndex: 5,
          startOffset: 0,
          endOffset: 97,
          highlightedText: 'Multi-agency investigation led by Indiana State Police with FBI support. Motive undetermined—working theories',
          createdAt: '2026-01-20T10:30:00Z'
        },
        {
          id: 'highlight-021',
          userId: 'user-003',
          blockIndex: 7,
          startOffset: 0,
          endOffset: 109,
          highlightedText: 'Indiana Chief Justice Loretta H. Rush issued security advisory to all state judges. US Marshals Service increasing',
          createdAt: '2026-01-20T11:00:00Z'
        }
      ],
      comments: [
        {
          id: 'comment-013',
          userId: 'user-004',
          blockIndex: 3,
          anchorStartOffset: 67,
          anchorEndOffset: 187,
          anchorText: 'In 2025, there were 47 documented threats against federal judges, up 35% from 2024. State judges face similar escalating threat environment',
          content: 'This trend is deeply concerning. We should recommend enhanced protective intelligence sharing with state judicial security programs.',
          createdAt: '2026-01-20T10:15:00Z',
          replies: [
            {
              id: 'reply-016',
              userId: 'user-001',
              content: 'Good idea. Set up a call with USMS Judicial Security Division to discuss protocols.',
              createdAt: '2026-01-20T10:45:00Z'
            }
          ]
        },
        {
          id: 'comment-014',
          userId: 'user-003',
          blockIndex: 5,
          anchorStartOffset: 98,
          anchorEndOffset: 200,
          anchorText: 'working theories include case-related retaliation and personal dispute. Judge Meyer presided over both criminal and civil matters',
          content: 'Need to track this investigation closely. If it\'s case-related, there may be implications for other judges handling similar matters.',
          createdAt: '2026-01-20T11:15:00Z',
          replies: []
        }
      ]
    },

    // Internal Document - RFK Dietary Guidelines Impact Assessment
    {
      id: 'doc-034',
      documentType: 'internal',
      classification: 'U',
      url: null,
      publishedDate: '2026-01-19T14:00:00Z',
      publisherId: 'pub-dept-analysis',
      title: 'Impact Assessment: RFK Jr. Dietary Guidelines Revision',
      author: 'Policy Impact Division',
      department: 'Policy Analysis',
      contentBlocks: [
        { type: 'heading', content: 'Policy Overview', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'HHS Secretary Robert F. Kennedy Jr. announced revised dietary guidelines on January 18, 2026, featuring an inverted food pyramid emphasizing animal protein consumption. The guidelines recommend nearly doubling protein intake with focus on steak, poultry, and whole milk while reducing recommended grain consumption.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Scientific Controversy', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Guidelines contradict mainstream nutritional science and WHO recommendations. American Heart Association and American Cancer Society have issued statements opposing the changes. Kennedy\'s past statements calling factory meat "bigger threat than Osama bin Laden" create credibility challenges.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Environmental Impact', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'World Resources Institute analysis indicates full adoption would require approximately 100 million additional acres of farmland and add hundreds of millions of tons of greenhouse gas emissions annually. Agricultural sector expressing mixed reactions—beef producers supportive, plant-based industry opposed.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Faction Response', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Wellness Skeptics faction (faction-005) showing 78% positive sentiment. Climate Concerned faction strongly opposed. Conspiracy Theory faction amplifying anti-establishment messaging. Traditional nutrition advocacy organizations mobilizing opposition campaigns.', portionMark: { classification: 'U', handling: 'FOUO' } }
      ],
      excerpt: 'Impact assessment of RFK Jr.\'s revised dietary guidelines, including scientific controversy and environmental concerns.',
      narrativeIds: ['narr-010'],
      subNarrativeIds: ['sub-025', 'sub-026', 'sub-027'],
      personIds: ['person-026'],
      organizationIds: ['org-022', 'org-023'],
      locationIds: ['loc-001'],
      eventIds: ['event-026'],
      factionIds: ['faction-005'],
      highlights: [
        {
          id: 'highlight-022',
          userId: 'user-002',
          blockIndex: 3,
          startOffset: 0,
          endOffset: 108,
          highlightedText: 'Guidelines contradict mainstream nutritional science and WHO recommendations. American Heart Association and',
          createdAt: '2026-01-19T15:00:00Z'
        },
        {
          id: 'highlight-023',
          userId: 'user-006',
          blockIndex: 5,
          startOffset: 0,
          endOffset: 141,
          highlightedText: 'World Resources Institute analysis indicates full adoption would require approximately 100 million additional acres of farmland and add hundreds',
          createdAt: '2026-01-19T15:30:00Z'
        },
        {
          id: 'highlight-024',
          userId: 'user-001',
          blockIndex: 3,
          startOffset: 160,
          endOffset: 272,
          highlightedText: 'Kennedy\'s past statements calling factory meat "bigger threat than Osama bin Laden" create credibility challenges.',
          createdAt: '2026-01-19T16:00:00Z'
        }
      ],
      comments: [
        {
          id: 'comment-015',
          userId: 'user-002',
          blockIndex: 3,
          anchorStartOffset: 160,
          anchorEndOffset: 272,
          anchorText: 'Kennedy\'s past statements calling factory meat "bigger threat than Osama bin Laden" create credibility challenges.',
          content: 'Media is already running the contradiction angle. Expect this to be a recurring talking point in the news cycle.',
          createdAt: '2026-01-19T15:15:00Z',
          replies: [
            {
              id: 'reply-017',
              userId: 'user-005',
              content: 'Should we prepare a historical analysis of his position shifts for context?',
              createdAt: '2026-01-19T15:45:00Z'
            },
            {
              id: 'reply-018',
              userId: 'user-002',
              content: 'Yes, that would be useful. Also include his funding sources over time.',
              createdAt: '2026-01-19T16:00:00Z'
            }
          ]
        },
        {
          id: 'comment-016',
          userId: 'user-006',
          blockIndex: 7,
          anchorStartOffset: 0,
          anchorEndOffset: 143,
          anchorText: 'Wellness Skeptics faction (faction-005) showing 78% positive sentiment. Climate Concerned faction strongly opposed. Conspiracy Theory faction',
          content: 'Interesting cross-faction dynamics here. The wellness skeptics aligning with meat industry messaging is worth tracking.',
          createdAt: '2026-01-19T16:30:00Z',
          replies: []
        }
      ]
    },

    // Internal Document - Congressional Oversight Legal Analysis (SECRET)
    {
      id: 'doc-035',
      documentType: 'internal',
      classification: 'S',
      url: null,
      publishedDate: '2026-01-20T16:00:00Z',
      publisherId: 'pub-dept-legal',
      title: 'Legal Analysis: DHS Congressional Inspection Notice Requirements',
      author: 'Congressional Affairs Division',
      department: 'Legal Affairs',
      contentBlocks: [
        { type: 'heading', content: 'Issue Summary', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Federal Judge Jia Cobb ruled January 20 that DHS can require one-week advance notice for congressional facility inspections, despite blocking a similar policy last month. This ruling affects oversight of immigration detention facilities.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Congressional Response', portionMark: { classification: 'S', handling: '' } },
        { type: 'paragraph', content: 'Rep. Alexandria Ocasio-Cortez (person-021) and Sen. Ed Markey (person-022) announced plans to introduce legislation codifying no-notice inspection rights. House Oversight Committee Chair Rep. James Comer (person-023) has not indicated opposition, suggesting potential bipartisan path.', portionMark: { classification: 'S', handling: 'NOFORN' } },
        { type: 'heading', content: 'Legal Precedent Analysis', portionMark: { classification: 'S', handling: '' } },
        { type: 'paragraph', content: 'Ruling creates circuit split with previous DC Circuit holdings on congressional oversight authority. Supreme Court review possible if legislation fails. DHS citing security concerns; civil liberties groups arguing notice allows facilities to conceal conditions.', portionMark: { classification: 'S', handling: 'NOFORN' } },
        { type: 'heading', content: 'Operational Implications', portionMark: { classification: 'S', handling: '' } },
        { type: 'paragraph', content: 'Seven-day notice window provides opportunity for facility preparation that may compromise oversight effectiveness. Recommend developing protocols for rapid response to inspection announcements to ensure transparency while maintaining security requirements.', portionMark: { classification: 'S', handling: 'NOFORN' } }
      ],
      excerpt: 'Legal analysis of court ruling on DHS congressional inspection requirements and implications for oversight authority.',
      narrativeIds: ['narr-009'],
      subNarrativeIds: ['sub-022', 'sub-023'],
      personIds: ['person-021', 'person-022', 'person-023', 'person-025'],
      organizationIds: ['org-017', 'org-020'],
      locationIds: ['loc-009'],
      eventIds: ['event-021', 'event-022'],
      factionIds: ['faction-001', 'faction-002'],
      highlights: [
        {
          id: 'highlight-025',
          userId: 'user-005',
          blockIndex: 1,
          startOffset: 0,
          endOffset: 134,
          highlightedText: 'Federal Judge Jia Cobb ruled January 20 that DHS can require one-week advance notice for congressional facility inspections, despite blocking',
          createdAt: '2026-01-20T17:00:00Z'
        },
        {
          id: 'highlight-026',
          userId: 'user-001',
          blockIndex: 3,
          startOffset: 0,
          endOffset: 178,
          highlightedText: 'Rep. Alexandria Ocasio-Cortez (person-021) and Sen. Ed Markey (person-022) announced plans to introduce legislation codifying no-notice inspection rights. House Oversight Committee Chair',
          createdAt: '2026-01-20T17:30:00Z'
        },
        {
          id: 'highlight-027',
          userId: 'user-003',
          blockIndex: 5,
          startOffset: 0,
          endOffset: 88,
          highlightedText: 'Ruling creates circuit split with previous DC Circuit holdings on congressional oversight authority.',
          createdAt: '2026-01-20T18:00:00Z'
        },
        {
          id: 'highlight-028',
          userId: 'user-002',
          blockIndex: 7,
          startOffset: 0,
          endOffset: 104,
          highlightedText: 'Seven-day notice window provides opportunity for facility preparation that may compromise oversight effectiveness.',
          createdAt: '2026-01-20T18:15:00Z'
        }
      ],
      comments: [
        {
          id: 'comment-017',
          userId: 'user-005',
          blockIndex: 3,
          anchorStartOffset: 155,
          anchorEndOffset: 268,
          anchorText: 'House Oversight Committee Chair Rep. James Comer (person-023) has not indicated opposition, suggesting potential bipartisan path.',
          content: 'This is significant. If Comer doesn\'t oppose, the legislation has a real chance. Track his statements closely.',
          createdAt: '2026-01-20T17:45:00Z',
          replies: [
            {
              id: 'reply-019',
              userId: 'user-001',
              content: 'Congressional Affairs should reach out to his staff for a temperature check.',
              createdAt: '2026-01-20T18:00:00Z'
            },
            {
              id: 'reply-020',
              userId: 'user-005',
              content: 'On it. Will report back by end of day tomorrow.',
              createdAt: '2026-01-20T18:15:00Z'
            }
          ]
        },
        {
          id: 'comment-018',
          userId: 'user-003',
          blockIndex: 5,
          anchorStartOffset: 0,
          anchorEndOffset: 88,
          anchorText: 'Ruling creates circuit split with previous DC Circuit holdings on congressional oversight authority.',
          content: 'Circuit split makes SCOTUS review more likely. Should we prepare a Supreme Court contingency analysis?',
          createdAt: '2026-01-20T18:30:00Z',
          replies: [
            {
              id: 'reply-021',
              userId: 'user-006',
              content: 'Yes, especially given the current Court\'s views on executive power. Get legal team started on this.',
              createdAt: '2026-01-20T18:45:00Z'
            }
          ]
        },
        {
          id: 'comment-019',
          userId: 'user-002',
          blockIndex: 7,
          anchorStartOffset: 106,
          anchorEndOffset: 229,
          anchorText: 'Recommend developing protocols for rapid response to inspection announcements to ensure transparency while maintaining security requirements.',
          content: 'Good recommendation. This should go to the operations team for implementation planning.',
          createdAt: '2026-01-20T19:00:00Z',
          replies: []
        }
      ]
    }
  ],

  topics: [
    {
      id: 'topic-001',
      headline: 'European Leaders Push Back on Trump\'s Greenland Ambitions',
      bulletPoints: [
        'Macron warned of a world where "international law is trampled under foot" at Davos',
        'Von der Leyen called for "new form of European independence" in response to US pressure',
        'Greenland PM demanded respect for world order and sovereignty',
        'Trump escalated tensions by sharing private diplomatic messages on social media'
      ],
      documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004'],
      startDate: '2026-01-20',
      endDate: null,
      volumeOverTime: [
        { date: '2026-01-20', volume: 245 },
        { date: '2026-01-21', volume: 312 },
        { date: '2026-01-22', volume: 278 },
        { date: '2026-01-23', volume: 195 },
        { date: '2026-01-24', volume: 156 }
      ],
      createdAt: '2026-01-20T15:00:00Z'
    },
    {
      id: 'topic-002',
      headline: 'DOJ Escalates Federal-State Confrontation Over Immigration Enforcement',
      bulletPoints: [
        'DOJ plans to subpoena Minnesota AG, governor, and Minneapolis mayor',
        'Federal judge ruled protesters cannot be arrested without cause; DOJ appeals',
        'FBI civil rights investigation shifted focus from ICE agent to slain protester',
        'Eyewitness accounts describe "terrifying" federal response to protests'
      ],
      documentIds: ['doc-005', 'doc-006', 'doc-007', 'doc-025'],
      startDate: '2026-01-15',
      endDate: null,
      volumeOverTime: [
        { date: '2026-01-15', volume: 85 },
        { date: '2026-01-16', volume: 124 },
        { date: '2026-01-17', volume: 198 },
        { date: '2026-01-18', volume: 267 },
        { date: '2026-01-19', volume: 312 },
        { date: '2026-01-20', volume: 445 },
        { date: '2026-01-21', volume: 389 },
        { date: '2026-01-22', volume: 324 },
        { date: '2026-01-23', volume: 278 },
        { date: '2026-01-24', volume: 215 }
      ],
      createdAt: '2026-01-15T12:00:00Z'
    },
    {
      id: 'topic-003',
      headline: 'Church Protests Spark Religious Freedom and Press Freedom Debate',
      bulletPoints: [
        'Protesters disrupted service at church where ICE official serves as pastor',
        'AG Bondi announced FACE Act investigation citing "intimidation of Christians"',
        'DOJ threatened charges against journalist Don Lemon for covering protest',
        'Trump characterized protesters as "agitators and insurrectionists"'
      ],
      documentIds: ['doc-008', 'doc-009', 'doc-010', 'doc-011'],
      startDate: '2026-01-19',
      endDate: null,
      volumeOverTime: [
        { date: '2026-01-19', volume: 156 },
        { date: '2026-01-20', volume: 423 },
        { date: '2026-01-21', volume: 512 },
        { date: '2026-01-22', volume: 378 },
        { date: '2026-01-23', volume: 245 },
        { date: '2026-01-24', volume: 189 }
      ],
      createdAt: '2026-01-19T16:00:00Z'
    },
    {
      id: 'topic-004',
      headline: 'Food Preservative Cancer Links Gain Scientific Consensus',
      bulletPoints: [
        'NutriNet-Santé study found sodium nitrite linked to 32% increase in prostate cancer risk',
        'Potassium nitrate associated with 22% higher breast cancer risk',
        'Harvard researchers reported 45% higher risk of precancerous colorectal adenomas from UPF',
        'Health experts calling for stricter regulation of food additives'
      ],
      documentIds: ['doc-021', 'doc-022', 'doc-023'],
      startDate: '2026-01-07',
      endDate: '2026-01-16',
      volumeOverTime: [
        { date: '2026-01-07', volume: 65 },
        { date: '2026-01-08', volume: 93 },
        { date: '2026-01-09', volume: 120 },
        { date: '2026-01-10', volume: 137 },
        { date: '2026-01-11', volume: 110 },
        { date: '2026-01-12', volume: 100 },
        { date: '2026-01-13', volume: 93 },
        { date: '2026-01-14', volume: 120 },
        { date: '2026-01-15', volume: 107 },
        { date: '2026-01-16', volume: 98 }
      ],
      createdAt: '2026-01-07T10:00:00Z'
    },
    {
      id: 'topic-005',
      headline: 'Judicial Safety Concerns After Indiana Judge Shooting',
      bulletPoints: [
        'Tippecanoe Superior Court Judge Steven Meyer and wife shot at their home',
        'Both victims in stable condition with arm and hip injuries',
        'Suspect remains at large as multi-agency investigation continues',
        'Indiana Supreme Court Chief Justice urging all judges to "remain vigilant"'
      ],
      documentIds: ['doc-012', 'doc-013'],
      startDate: '2026-01-19',
      endDate: '2026-01-22',
      volumeOverTime: [
        { date: '2026-01-19', volume: 234 },
        { date: '2026-01-20', volume: 456 },
        { date: '2026-01-21', volume: 312 },
        { date: '2026-01-22', volume: 145 }
      ],
      createdAt: '2026-01-19T18:00:00Z'
    }
  ],

  monitors: [
    {
      id: 'monitor-001',
      name: 'Immigration Enforcement Activity',
      description: 'Track narratives and events related to DOJ, ICE, and DHS immigration enforcement activities',
      scope: {
        organizationIds: ['org-010', 'org-011', 'org-017'], // DOJ, ICE, DHS
        personIds: ['org-018'], // Kristi Noem
        locationIds: ['loc-002', 'loc-008'] // Minneapolis, St. Paul
      },
      options: {
        includeSubEvents: true,
        includeSubNarratives: true,
        includeRelatedEvents: true
      },
      triggers: {
        newNarrative: true,
        newEvent: true,
        volumeSpike: { threshold: 500, timeWindow: '24h' },
        sentimentShift: { threshold: 0.15, direction: 'any' },
        factionEngagement: null
      },
      enabled: true,
      createdAt: '2026-01-10T00:00:00Z',
      lastTriggered: '2026-01-20T14:30:00Z'
    },
    {
      id: 'monitor-002',
      name: 'Trump Administration Actions',
      description: 'Monitor narratives mentioning President Trump and key administration officials',
      scope: {
        personIds: ['person-003', 'person-012', 'person-013', 'person-018', 'person-026'], // Trump, Dhillon, Bondi, Noem, RFK Jr
        factionIds: ['faction-001'] // American Right Wing
      },
      options: {
        includeSubEvents: true,
        includeSubNarratives: true,
        includeRelatedEvents: true
      },
      triggers: {
        newNarrative: true,
        newEvent: false,
        volumeSpike: { threshold: 800, timeWindow: '24h' },
        sentimentShift: { threshold: 0.20, direction: 'any' },
        factionEngagement: { factionIds: ['faction-001', 'faction-002'], threshold: 200 }
      },
      enabled: true,
      createdAt: '2026-01-05T00:00:00Z',
      lastTriggered: '2026-01-20T11:30:00Z'
    },
    {
      id: 'monitor-003',
      name: 'Public Health Policy',
      description: 'Track health-related narratives including dietary guidelines, FDA policy, and food safety',
      scope: {
        organizationIds: ['org-003', 'org-022', 'org-023'], // FDA, HHS, World Resources Institute
        personIds: ['person-026'], // RFK Jr
        narrativeIds: ['narr-003', 'narr-010'] // Food preservatives, dietary guidelines
      },
      options: {
        includeSubEvents: true,
        includeSubNarratives: true,
        includeRelatedEvents: true
      },
      triggers: {
        newNarrative: true,
        newEvent: true,
        volumeSpike: { threshold: 400, timeWindow: '24h' },
        sentimentShift: { threshold: 0.15, direction: 'negative' },
        factionEngagement: { factionIds: ['faction-005', 'faction-006'], threshold: 100 }
      },
      enabled: true,
      createdAt: '2026-01-01T00:00:00Z',
      lastTriggered: '2026-01-18T09:00:00Z'
    },
    {
      id: 'monitor-004',
      name: 'Judicial Safety Watch',
      description: 'Monitor threats and incidents targeting judges and court officials',
      scope: {
        organizationIds: ['org-013', 'org-014', 'org-015'], // Tippecanoe Superior Court, Indiana Supreme Court, Lafayette PD
        personIds: ['person-009', 'person-011'], // Judge Meyer, Chief Justice Rush
        locationIds: ['loc-007'] // Lafayette, Indiana
      },
      options: {
        includeSubEvents: true,
        includeSubNarratives: true,
        includeRelatedEvents: true
      },
      triggers: {
        newNarrative: true,
        newEvent: true,
        volumeSpike: { threshold: 200, timeWindow: '12h' },
        sentimentShift: null,
        factionEngagement: null
      },
      enabled: true,
      createdAt: '2026-01-19T16:00:00Z',
      lastTriggered: '2026-01-20T10:00:00Z'
    },
    {
      id: 'monitor-005',
      name: 'US-European Relations',
      description: 'Track geopolitical tensions between US and European allies, particularly around Greenland',
      scope: {
        personIds: ['person-004', 'person-005', 'person-006'], // Macron, von der Leyen, Greenland PM
        organizationIds: ['org-008', 'org-009'], // European Commission, World Economic Forum
        locationIds: ['loc-005', 'loc-006'] // Davos, Greenland
      },
      options: {
        includeSubEvents: true,
        includeSubNarratives: true,
        includeRelatedEvents: true
      },
      triggers: {
        newNarrative: true,
        newEvent: true,
        volumeSpike: { threshold: 300, timeWindow: '24h' },
        sentimentShift: { threshold: 0.20, direction: 'negative' },
        factionEngagement: null
      },
      enabled: false, // Paused
      createdAt: '2026-01-15T00:00:00Z',
      lastTriggered: '2026-01-20T13:00:00Z'
    }
  ],

  alerts: [
    {
      id: 'alert-001',
      monitorId: 'monitor-001',
      type: 'volume_spike',
      title: 'Volume spike: Immigration Enforcement Activity',
      description: '728 mentions detected in 24 hours, exceeding threshold of 500',
      severity: 'high',
      triggeredAt: '2026-01-20T14:30:00Z',
      acknowledged: false,
      relatedNarrativeIds: ['narr-006', 'narr-008', 'narr-009'],
      relatedSubNarrativeIds: ['sub-012', 'sub-013', 'sub-018'],
      relatedEventIds: ['event-010', 'event-017'],
      relatedSubEventIds: [],
      metadata: {
        actualValue: 728,
        threshold: 500,
        timeWindow: '24h',
        percentOver: 45.6
      }
    },
    {
      id: 'alert-002',
      monitorId: 'monitor-001',
      type: 'new_event',
      title: 'New event: Church protest targeting ICE pastor',
      description: 'Protesters disrupted Sunday service at Cities Church, targeting ICE official David Easterwood',
      severity: 'medium',
      triggeredAt: '2026-01-19T11:00:00Z',
      acknowledged: true,
      relatedNarrativeIds: ['narr-008'],
      relatedSubNarrativeIds: ['sub-018', 'sub-021'],
      relatedEventIds: ['event-017'],
      relatedSubEventIds: ['event-018', 'event-019', 'event-020'],
      metadata: {
        eventId: 'event-017',
        eventText: 'Protesters disrupt Cities Church service targeting ICE official pastor'
      }
    },
    {
      id: 'alert-003',
      monitorId: 'monitor-002',
      type: 'sentiment_shift',
      title: 'Sentiment shift: Trump Administration Actions',
      description: '-23% sentiment change detected following Greenland diplomatic message leak',
      severity: 'medium',
      triggeredAt: '2026-01-20T11:30:00Z',
      acknowledged: false,
      relatedNarrativeIds: ['narr-005'],
      relatedSubNarrativeIds: ['sub-010'],
      relatedEventIds: ['event-007'],
      relatedSubEventIds: [],
      metadata: {
        previousSentiment: -0.29,
        currentSentiment: -0.52,
        delta: -0.23,
        direction: 'negative'
      }
    },
    {
      id: 'alert-004',
      monitorId: 'monitor-003',
      type: 'new_narrative',
      title: 'New narrative: RFK Jr dietary guidelines controversy',
      description: 'New meat-heavy dietary guidelines face backlash over environmental and health impacts',
      severity: 'high',
      triggeredAt: '2026-01-18T09:00:00Z',
      acknowledged: true,
      relatedNarrativeIds: ['narr-010'],
      relatedSubNarrativeIds: ['sub-025', 'sub-026', 'sub-027'],
      relatedEventIds: ['event-026'],
      relatedSubEventIds: [],
      metadata: {
        narrativeId: 'narr-010',
        narrativeText: "RFK Jr's meat-heavy dietary guidelines face backlash over environmental and health impacts"
      }
    },
    {
      id: 'alert-005',
      monitorId: 'monitor-003',
      type: 'faction_engagement',
      title: 'High faction engagement: Health policy narratives',
      description: 'Health Activists and Vegans factions showing elevated engagement (360+ combined volume)',
      severity: 'medium',
      triggeredAt: '2026-01-20T08:00:00Z',
      acknowledged: false,
      relatedNarrativeIds: ['narr-010', 'narr-003'],
      relatedSubNarrativeIds: ['sub-006', 'sub-026'],
      relatedEventIds: [],
      relatedSubEventIds: [],
      metadata: {
        factionEngagement: {
          'faction-005': 195,
          'faction-006': 165
        },
        threshold: 100,
        totalVolume: 360
      }
    },
    {
      id: 'alert-006',
      monitorId: 'monitor-004',
      type: 'new_event',
      title: 'Breaking: Indiana judge shot at home',
      description: 'Tippecanoe Superior Court Judge Steven Meyer and wife shot at their Lafayette home',
      severity: 'critical',
      triggeredAt: '2026-01-19T16:00:00Z',
      acknowledged: true,
      relatedNarrativeIds: ['narr-007'],
      relatedSubNarrativeIds: ['sub-016'],
      relatedEventIds: ['event-015'],
      relatedSubEventIds: ['event-016'],
      metadata: {
        eventId: 'event-015',
        eventText: 'Indiana Judge Steven Meyer and wife shot at home'
      }
    },
    {
      id: 'alert-007',
      monitorId: 'monitor-004',
      type: 'volume_spike',
      title: 'Volume spike: Judicial Safety Watch',
      description: '265 mentions in 12 hours following judge shooting, exceeding threshold of 200',
      severity: 'high',
      triggeredAt: '2026-01-20T10:00:00Z',
      acknowledged: false,
      relatedNarrativeIds: ['narr-007'],
      relatedSubNarrativeIds: ['sub-016', 'sub-017'],
      relatedEventIds: ['event-015', 'event-016'],
      relatedSubEventIds: [],
      metadata: {
        actualValue: 265,
        threshold: 200,
        timeWindow: '12h',
        percentOver: 32.5
      }
    }
  ]
};

/**
 * Initialize the data store with mock data
 */
export function initializeMockData(dataStore) {
  dataStore.data = { ...mockData };
  dataStore.save();
}

export default mockData;

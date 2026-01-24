/**
 * mockData.js
 * Comprehensive mock data with all relationships populated
 * Demonstrates the full data model capabilities
 */

export const datasetId = 'american-politics';
export const datasetName = 'American Politics';

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
    { id: 'social', name: 'Social Media', color: '#B07AA1' },
    { id: 'national_news', name: 'National News', color: '#4E79A7' },
    { id: 'international_news', name: 'International News', color: '#59A14F' }
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
      sourceVolumes: {
        'src-tiktok': { volume: 220, sentiment: -0.52 },
        'src-instagram': { volume: 125, sentiment: -0.45 },
        'src-facebook': { volume: 95, sentiment: -0.38 },
        'src-x': { volume: 85, sentiment: -0.58 },
        'src-reddit': { volume: 45, sentiment: -0.62 },
        'src-nat-cnn': { volume: 25, sentiment: -0.48 },
        'src-nat-nyt': { volume: 18, sentiment: -0.42 }
      },
      factionSources: {
        'faction-005': { 'src-facebook': 75, 'src-x': 65, 'src-tiktok': 140, 'src-instagram': 85, 'src-reddit': 35, 'src-nat-nyt': 18, 'src-nat-cnn': 20, 'src-int-guardian': 12 },
        'faction-006': { 'src-tiktok': 80, 'src-instagram': 40, 'src-facebook': 20, 'src-x': 20, 'src-reddit': 10, 'src-nat-cnn': 5, 'src-int-bbc': 5 }
      },
      personIds: [],
      organizationIds: ['org-003', 'org-004'],
      locationIds: [],
      eventIds: [],
      volumeOverTime: [
        { date: '2026-01-07', factionVolumes: { 'faction-005': 45, 'faction-006': 20 }, sourceVolumes: { 'src-tiktok': 28, 'src-instagram': 16, 'src-facebook': 12, 'src-x': 8, 'src-nat-cnn': 3 } },
        { date: '2026-01-08', factionVolumes: { 'faction-005': 65, 'faction-006': 28 }, sourceVolumes: { 'src-tiktok': 38, 'src-instagram': 22, 'src-facebook': 18, 'src-x': 12, 'src-nat-cnn': 5 } },
        { date: '2026-01-09', factionVolumes: { 'faction-005': 85, 'faction-006': 35 }, sourceVolumes: { 'src-tiktok': 52, 'src-instagram': 28, 'src-facebook': 22, 'src-x': 15, 'src-reddit': 8 } },
        { date: '2026-01-10', factionVolumes: { 'faction-005': 95, 'faction-006': 42 }, sourceVolumes: { 'src-tiktok': 58, 'src-instagram': 32, 'src-facebook': 25, 'src-x': 18, 'src-reddit': 10 } },
        { date: '2026-01-11', factionVolumes: { 'faction-005': 78, 'faction-006': 32 }, sourceVolumes: { 'src-tiktok': 45, 'src-instagram': 26, 'src-facebook': 20, 'src-x': 14, 'src-reddit': 8 } },
        { date: '2026-01-12', factionVolumes: { 'faction-005': 72, 'faction-006': 28 }, sourceVolumes: { 'src-tiktok': 42, 'src-instagram': 24, 'src-facebook': 18, 'src-x': 12, 'src-reddit': 6 } },
        { date: '2026-01-13', factionVolumes: { 'faction-005': 68, 'faction-006': 25 }, sourceVolumes: { 'src-tiktok': 38, 'src-instagram': 22, 'src-facebook': 16, 'src-x': 12, 'src-reddit': 6 } },
        { date: '2026-01-14', factionVolumes: { 'faction-005': 82, 'faction-006': 38 }, sourceVolumes: { 'src-tiktok': 48, 'src-instagram': 28, 'src-facebook': 22, 'src-x': 16, 'src-reddit': 8 } },
        { date: '2026-01-15', factionVolumes: { 'faction-005': 75, 'faction-006': 32 }, sourceVolumes: { 'src-tiktok': 44, 'src-instagram': 25, 'src-facebook': 19, 'src-x': 14, 'src-reddit': 7 } },
        { date: '2026-01-16', factionVolumes: { 'faction-005': 70, 'faction-006': 28 }, sourceVolumes: { 'src-tiktok': 40, 'src-instagram': 22, 'src-facebook': 18, 'src-x': 12, 'src-reddit': 6 } }
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
      sourceVolumes: {
        'src-x': { volume: 145, sentiment: -0.38 },
        'src-facebook': { volume: 85, sentiment: -0.42 },
        'src-tiktok': { volume: 40, sentiment: -0.35 },
        'src-nat-cnn': { volume: 28, sentiment: -0.55 },
        'src-nat-fox': { volume: 32, sentiment: 0.48 },
        'src-int-bbc': { volume: 45, sentiment: -0.28 },
        'src-int-reuters': { volume: 38, sentiment: -0.12 },
        'src-int-guardian': { volume: 22, sentiment: -0.58 }
      },
      factionSources: {
        'faction-001': { 'src-x': 80, 'src-facebook': 45, 'src-tiktok': 20, 'src-nat-fox': 30, 'src-nat-cnn': 5 },
        'faction-002': { 'src-x': 65, 'src-facebook': 40, 'src-tiktok': 20, 'src-nat-cnn': 23, 'src-int-bbc': 30, 'src-int-guardian': 20 }
      },
      personIds: ['person-003', 'person-004', 'person-005', 'person-006'],
      organizationIds: ['org-008', 'org-009'],
      locationIds: ['loc-005', 'loc-006', 'loc-001'],
      eventIds: ['event-006', 'event-007', 'event-008', 'event-009'],
      volumeOverTime: [
        { date: '2026-01-20', factionVolumes: { 'faction-001': 180, 'faction-002': 120 }, sourceVolumes: { 'src-x': 145, 'src-facebook': 85, 'src-tiktok': 40, 'src-nat-cnn': 28, 'src-nat-fox': 32, 'src-int-bbc': 45, 'src-int-reuters': 38, 'src-int-guardian': 22 } }
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
      sourceVolumes: {
        'src-x': { volume: 220, sentiment: -0.55 },
        'src-facebook': { volume: 145, sentiment: -0.48 },
        'src-tiktok': { volume: 95, sentiment: -0.62 },
        'src-instagram': { volume: 65, sentiment: -0.58 },
        'src-reddit': { volume: 55, sentiment: -0.72 },
        'src-nat-cnn': { volume: 42, sentiment: -0.45 },
        'src-nat-fox': { volume: 38, sentiment: 0.68 },
        'src-nat-msnbc': { volume: 35, sentiment: -0.72 },
        'src-int-bbc': { volume: 18, sentiment: -0.22 },
        'src-int-reuters': { volume: 15, sentiment: -0.08 }
      },
      factionSources: {
        'faction-001': { 'src-x': 70, 'src-facebook': 45, 'src-nat-fox': 35, 'src-reddit': 10 },
        'faction-002': { 'src-x': 55, 'src-facebook': 40, 'src-tiktok': 25, 'src-nat-cnn': 15, 'src-nat-msnbc': 20 },
        'faction-003': { 'src-x': 80, 'src-tiktok': 60, 'src-instagram': 50, 'src-facebook': 45, 'src-reddit': 35, 'src-nat-cnn': 20, 'src-nat-msnbc': 15 },
        'faction-004': { 'src-x': 35, 'src-facebook': 25, 'src-nat-fox': 25, 'src-reddit': 10 }
      },
      personIds: ['person-007', 'person-008', 'person-003'],
      organizationIds: ['org-010', 'org-011', 'org-012'],
      locationIds: ['loc-002', 'loc-001'],
      eventIds: ['event-010', 'event-011', 'event-012', 'event-013', 'event-014'],
      volumeOverTime: [
        { date: '2026-01-15', factionVolumes: { 'faction-001': 40, 'faction-002': 35, 'faction-003': 80, 'faction-004': 25 }, sourceVolumes: { 'src-x': 60, 'src-facebook': 35, 'src-tiktok': 40, 'src-instagram': 25, 'src-nat-cnn': 10, 'src-nat-fox': 8 } },
        { date: '2026-01-16', factionVolumes: { 'faction-001': 55, 'faction-002': 50, 'faction-003': 95, 'faction-004': 35 }, sourceVolumes: { 'src-x': 85, 'src-facebook': 50, 'src-tiktok': 55, 'src-instagram': 30, 'src-nat-cnn': 15, 'src-nat-fox': 12, 'src-nat-msnbc': 10 } },
        { date: '2026-01-17', factionVolumes: { 'faction-001': 70, 'faction-002': 65, 'faction-003': 110, 'faction-004': 45 }, sourceVolumes: { 'src-x': 105, 'src-facebook': 65, 'src-tiktok': 60, 'src-instagram': 35, 'src-reddit': 25, 'src-nat-cnn': 20, 'src-nat-fox': 18, 'src-nat-msnbc': 15 } },
        { date: '2026-01-18', factionVolumes: { 'faction-001': 90, 'faction-002': 80, 'faction-003': 130, 'faction-004': 55 }, sourceVolumes: { 'src-x': 130, 'src-facebook': 85, 'src-tiktok': 70, 'src-instagram': 45, 'src-reddit': 35, 'src-nat-cnn': 28, 'src-nat-fox': 25, 'src-nat-msnbc': 22 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 120, 'faction-002': 100, 'faction-003': 150, 'faction-004': 70 }, sourceVolumes: { 'src-x': 165, 'src-facebook': 110, 'src-tiktok': 80, 'src-instagram': 55, 'src-reddit': 45, 'src-nat-cnn': 35, 'src-nat-fox': 32, 'src-nat-msnbc': 28 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 160, 'faction-002': 140, 'faction-003': 185, 'faction-004': 95 }, sourceVolumes: { 'src-x': 220, 'src-facebook': 145, 'src-tiktok': 95, 'src-instagram': 65, 'src-reddit': 55, 'src-nat-cnn': 42, 'src-nat-fox': 38, 'src-nat-msnbc': 35, 'src-int-bbc': 18, 'src-int-reuters': 15 } }
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
      sourceVolumes: {
        'src-x': { volume: 95, sentiment: -0.62 },
        'src-facebook': { volume: 72, sentiment: -0.55 },
        'src-reddit': { volume: 28, sentiment: -0.48 },
        'src-nat-cnn': { volume: 18, sentiment: -0.42 },
        'src-nat-fox': { volume: 22, sentiment: -0.38 },
        'src-nat-nyt': { volume: 12, sentiment: -0.35 },
        'src-int-bbc': { volume: 8, sentiment: -0.28 },
        'src-int-reuters': { volume: 10, sentiment: -0.22 }
      },
      factionSources: {
        'faction-001': { 'src-x': 20, 'src-facebook': 15, 'src-nat-fox': 18, 'src-reddit': 5 },
        'faction-002': { 'src-x': 18, 'src-facebook': 12, 'src-nat-cnn': 10, 'src-reddit': 8 },
        'faction-004': { 'src-x': 45, 'src-facebook': 35, 'src-nat-fox': 15, 'src-nat-cnn': 8, 'src-reddit': 12 }
      },
      personIds: ['person-009', 'person-010', 'person-011'],
      organizationIds: ['org-013', 'org-014', 'org-015'],
      locationIds: ['loc-007'],
      eventIds: ['event-015', 'event-016'],
      volumeOverTime: [
        { date: '2026-01-19', factionVolumes: { 'faction-001': 25, 'faction-002': 20, 'faction-004': 55 }, sourceVolumes: { 'src-x': 55, 'src-facebook': 40, 'src-reddit': 15, 'src-nat-cnn': 10, 'src-nat-fox': 12 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 45, 'faction-002': 38, 'faction-004': 85 }, sourceVolumes: { 'src-x': 95, 'src-facebook': 72, 'src-reddit': 28, 'src-nat-cnn': 18, 'src-nat-fox': 22, 'src-nat-nyt': 12, 'src-int-bbc': 8, 'src-int-reuters': 10 } }
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
      sourceVolumes: {
        'src-x': { volume: 385, sentiment: -0.42 },
        'src-facebook': { volume: 210, sentiment: -0.48 },
        'src-tiktok': { volume: 165, sentiment: -0.55 },
        'src-instagram': { volume: 95, sentiment: -0.52 },
        'src-reddit': { volume: 78, sentiment: -0.62 },
        'src-nat-cnn': { volume: 55, sentiment: -0.38 },
        'src-nat-fox': { volume: 72, sentiment: 0.72 },
        'src-nat-msnbc': { volume: 48, sentiment: -0.68 },
        'src-nat-nyt': { volume: 28, sentiment: -0.32 },
        'src-int-bbc': { volume: 22, sentiment: -0.18 },
        'src-int-reuters': { volume: 18, sentiment: -0.12 }
      },
      factionSources: {
        'faction-001': { 'src-x': 120, 'src-facebook': 75, 'src-nat-fox': 68, 'src-reddit': 15, 'src-tiktok': 25 },
        'faction-002': { 'src-x': 85, 'src-facebook': 55, 'src-tiktok': 45, 'src-nat-cnn': 30, 'src-nat-msnbc': 35, 'src-reddit': 25 },
        'faction-003': { 'src-x': 130, 'src-tiktok': 85, 'src-instagram': 70, 'src-facebook': 60, 'src-reddit': 35, 'src-nat-cnn': 20, 'src-nat-msnbc': 12 },
        'faction-004': { 'src-x': 50, 'src-facebook': 35, 'src-nat-fox': 45, 'src-reddit': 10 }
      },
      personIds: ['person-003', 'person-012', 'person-013', 'person-014', 'person-015', 'person-016', 'person-019', 'person-020'],
      organizationIds: ['org-010', 'org-011', 'org-016', 'org-017', 'org-018', 'org-019'],
      locationIds: ['loc-008', 'loc-002', 'loc-001'],
      eventIds: ['event-017', 'event-018', 'event-019', 'event-020'],
      volumeOverTime: [
        { date: '2026-01-19', factionVolumes: { 'faction-001': 95, 'faction-002': 70, 'faction-003': 110, 'faction-004': 45 }, sourceVolumes: { 'src-x': 145, 'src-facebook': 85, 'src-tiktok': 70, 'src-instagram': 40, 'src-reddit': 30, 'src-nat-cnn': 22, 'src-nat-fox': 28 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 185, 'faction-002': 125, 'faction-003': 165, 'faction-004': 85 }, sourceVolumes: { 'src-x': 280, 'src-facebook': 155, 'src-tiktok': 120, 'src-instagram': 72, 'src-reddit': 58, 'src-nat-cnn': 42, 'src-nat-fox': 55, 'src-nat-msnbc': 35 } },
        { date: '2026-01-21', factionVolumes: { 'faction-001': 280, 'faction-002': 195, 'faction-003': 245, 'faction-004': 125 }, sourceVolumes: { 'src-x': 385, 'src-facebook': 210, 'src-tiktok': 165, 'src-instagram': 95, 'src-reddit': 78, 'src-nat-cnn': 55, 'src-nat-fox': 72, 'src-nat-msnbc': 48, 'src-nat-nyt': 28, 'src-int-bbc': 22, 'src-int-reuters': 18 } }
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
      sourceVolumes: {
        'src-x': { volume: 185, sentiment: -0.38 },
        'src-facebook': { volume: 125, sentiment: -0.42 },
        'src-reddit': { volume: 55, sentiment: -0.58 },
        'src-nat-cnn': { volume: 38, sentiment: -0.45 },
        'src-nat-fox': { volume: 45, sentiment: 0.68 },
        'src-nat-nyt': { volume: 32, sentiment: -0.38 },
        'src-nat-wapo': { volume: 28, sentiment: -0.42 },
        'src-int-guardian': { volume: 22, sentiment: -0.52 },
        'src-int-bbc': { volume: 18, sentiment: -0.28 },
        'src-int-reuters': { volume: 15, sentiment: -0.15 }
      },
      factionSources: {
        'faction-001': { 'src-x': 65, 'src-facebook': 45, 'src-nat-fox': 42, 'src-reddit': 12 },
        'faction-002': { 'src-x': 70, 'src-facebook': 48, 'src-nat-cnn': 25, 'src-nat-nyt': 22, 'src-nat-wapo': 20, 'src-reddit': 28 },
        'faction-003': { 'src-x': 55, 'src-facebook': 38, 'src-reddit': 18, 'src-nat-cnn': 12, 'src-int-guardian': 15 },
        'faction-004': { 'src-x': 35, 'src-facebook': 28, 'src-nat-fox': 25, 'src-reddit': 8 }
      },
      personIds: ['person-007', 'person-017', 'person-018', 'person-021', 'person-022', 'person-023', 'person-024', 'person-025'],
      organizationIds: ['org-010', 'org-011', 'org-017', 'org-020', 'org-021'],
      locationIds: ['loc-002', 'loc-008', 'loc-009'],
      eventIds: ['event-021', 'event-022', 'event-023', 'event-024', 'event-025'],
      volumeOverTime: [
        { date: '2026-01-20', factionVolumes: { 'faction-001': 145, 'faction-002': 165, 'faction-003': 125, 'faction-004': 85 }, sourceVolumes: { 'src-x': 185, 'src-facebook': 125, 'src-reddit': 55, 'src-nat-cnn': 38, 'src-nat-fox': 45, 'src-nat-nyt': 32, 'src-nat-wapo': 28, 'src-int-guardian': 22, 'src-int-bbc': 18, 'src-int-reuters': 15 } }
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
      sourceVolumes: {
        'src-x': { volume: 175, sentiment: -0.48 },
        'src-facebook': { volume: 135, sentiment: -0.42 },
        'src-tiktok': { volume: 145, sentiment: -0.55 },
        'src-instagram': { volume: 95, sentiment: -0.52 },
        'src-reddit': { volume: 68, sentiment: -0.62 },
        'src-nat-cnn': { volume: 28, sentiment: -0.45 },
        'src-nat-fox': { volume: 35, sentiment: 0.55 },
        'src-nat-nyt': { volume: 22, sentiment: -0.52 },
        'src-int-guardian': { volume: 32, sentiment: -0.68 },
        'src-int-bbc': { volume: 18, sentiment: -0.38 }
      },
      factionSources: {
        'faction-001': { 'src-x': 55, 'src-facebook': 42, 'src-nat-fox': 32, 'src-tiktok': 25, 'src-reddit': 12 },
        'faction-005': { 'src-x': 72, 'src-facebook': 55, 'src-tiktok': 65, 'src-instagram': 48, 'src-reddit': 35, 'src-nat-cnn': 18, 'src-int-guardian': 25 },
        'faction-006': { 'src-tiktok': 85, 'src-instagram': 62, 'src-x': 58, 'src-facebook': 45, 'src-reddit': 28, 'src-int-guardian': 22 }
      },
      personIds: ['person-026', 'person-003'],
      organizationIds: ['org-022', 'org-023'],
      locationIds: ['loc-001'],
      eventIds: ['event-026'],
      volumeOverTime: [
        { date: '2026-01-18', factionVolumes: { 'faction-001': 45, 'faction-005': 75, 'faction-006': 65 }, sourceVolumes: { 'src-x': 65, 'src-facebook': 48, 'src-tiktok': 55, 'src-instagram': 35, 'src-reddit': 25 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 85, 'faction-005': 135, 'faction-006': 115 }, sourceVolumes: { 'src-x': 120, 'src-facebook': 92, 'src-tiktok': 105, 'src-instagram': 68, 'src-reddit': 48, 'src-nat-cnn': 18, 'src-nat-fox': 22 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 125, 'faction-005': 195, 'faction-006': 165 }, sourceVolumes: { 'src-x': 175, 'src-facebook': 135, 'src-tiktok': 145, 'src-instagram': 95, 'src-reddit': 68, 'src-nat-cnn': 28, 'src-nat-fox': 35, 'src-nat-nyt': 22, 'src-int-guardian': 32, 'src-int-bbc': 18 } }
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
      imageUrl: null,
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
      imageUrl: null,
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
      imageUrl: null,
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
      imageUrl: null,
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
      imageUrl: null,
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
      imageUrl: null,
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
      imageUrl: null,
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
      imageUrl: null,
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
      imageUrl: null,
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
      imageUrl: null,
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
      imageUrl: null,
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
      imageUrl: null,
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
      imageUrl: null,
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
      imageUrl: null,
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
      imageUrl: null,
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
      imageUrl: null,
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
      imageUrl: null,
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
      imageUrl: null,
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
      imageUrl: null,
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
      imageUrl: null,
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
      imageUrl: null,
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
      imageUrl: null,
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
      id: 'org-008',
      name: 'European Commission',
      type: 'government',
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
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-002'],
      factionSentiment: {}
    },
    {
      id: 'org-022',
      name: 'Department of Health and Human Services',
      type: 'government',
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
      title: 'Macron warns of world where "international law is trampled" in Davos speech',
      url: 'https://reuters.com/world/macron-davos-trump-greenland-2026',
      publishedDate: '2026-01-20T10:30:00Z',
      sourceId: 'src-int-reuters',
      excerpt: 'French President Emmanuel Macron delivered a thinly veiled critique of President Trump\'s foreign policy at the World Economic Forum, warning of dangerous precedents being set.',
      narrativeIds: ['narr-005'],
      subNarrativeIds: ['sub-009'],
      personIds: ['person-003', 'person-004'],
      organizationIds: ['org-009'],
      locationIds: ['loc-005'],
      eventIds: ['event-006']
    },
    {
      id: 'doc-002',
      title: 'Trump posts private Macron message on social media: "I do not understand what you are doing"',
      url: 'https://cnn.com/politics/trump-macron-greenland-message',
      publishedDate: '2026-01-20T12:15:00Z',
      sourceId: 'src-nat-cnn',
      excerpt: 'President Trump shared what appeared to be a private diplomatic message from French President Macron questioning his Greenland acquisition strategy.',
      narrativeIds: ['narr-005'],
      subNarrativeIds: ['sub-010'],
      personIds: ['person-003', 'person-004'],
      organizationIds: [],
      locationIds: ['loc-001'],
      eventIds: ['event-007']
    },
    {
      id: 'doc-003',
      title: 'Von der Leyen calls for "new form of European independence" amid Trump tensions',
      url: 'https://bbc.com/news/world-europe-von-der-leyen-independence',
      publishedDate: '2026-01-20T14:00:00Z',
      sourceId: 'src-int-bbc',
      excerpt: 'European Commission President Ursula von der Leyen said the EU must develop greater autonomy in response to "geopolitical shocks" from across the Atlantic.',
      narrativeIds: ['narr-005'],
      subNarrativeIds: ['sub-011'],
      personIds: ['person-005'],
      organizationIds: ['org-008'],
      locationIds: ['loc-005'],
      eventIds: ['event-009']
    },
    {
      id: 'doc-004',
      title: 'Greenland PM: "We demand respect for the world order"',
      url: 'https://guardian.com/world/greenland-pm-trump-response',
      publishedDate: '2026-01-20T13:30:00Z',
      sourceId: 'src-int-guardian',
      excerpt: 'Greenland\'s Prime Minister Múte Bourup Egede responded forcefully to Trump\'s acquisition threats, calling for respect of international norms.',
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
      title: 'DOJ plans subpoenas for Minnesota AG, governor over ICE protest "obstruction"',
      url: 'https://nytimes.com/2026/01/20/us/politics/doj-minnesota-subpoenas',
      publishedDate: '2026-01-20T11:00:00Z',
      sourceId: 'src-nat-nyt',
      excerpt: 'The Department of Justice announced plans to subpoena Minnesota\'s top officials in an escalating confrontation over immigration enforcement.',
      narrativeIds: ['narr-006'],
      subNarrativeIds: ['sub-012'],
      personIds: ['person-007'],
      organizationIds: ['org-010'],
      locationIds: ['loc-002'],
      eventIds: ['event-010']
    },
    {
      id: 'doc-006',
      title: 'Federal judge rules protesters cannot be arrested without cause, DOJ appeals',
      url: 'https://washingtonpost.com/national/minnesota-ice-ruling-appeal',
      publishedDate: '2026-01-20T09:45:00Z',
      sourceId: 'src-nat-wapo',
      excerpt: 'A federal judge issued an injunction protecting peaceful protesters from arrest by federal agents, but the DOJ immediately filed an appeal.',
      narrativeIds: ['narr-006', 'narr-009'],
      subNarrativeIds: ['sub-013'],
      personIds: ['person-017'],
      organizationIds: ['org-010', 'org-011'],
      locationIds: ['loc-002'],
      eventIds: ['event-011']
    },
    {
      id: 'doc-007',
      title: 'FBI pivots civil rights probe from ICE agent to slain protester Renee Good',
      url: 'https://msnbc.com/news/fbi-renee-good-investigation-pivot',
      publishedDate: '2026-01-18T16:00:00Z',
      sourceId: 'src-nat-msnbc',
      excerpt: 'Critics are outraged after learning the FBI\'s investigation into the fatal shooting has shifted focus from the agent to the victim and her widow.',
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
      title: 'Protesters disrupt service at church where ICE official serves as pastor',
      url: 'https://cnn.com/us/minnesota-church-ice-protest',
      publishedDate: '2026-01-19T14:30:00Z',
      sourceId: 'src-nat-cnn',
      excerpt: 'Anti-ICE demonstrators interrupted Sunday worship at Cities Church in St. Paul, targeting David Easterwood who serves dual roles as ICE official and pastor.',
      narrativeIds: ['narr-008'],
      subNarrativeIds: ['sub-021'],
      personIds: ['person-014', 'person-015'],
      organizationIds: ['org-016', 'org-011'],
      locationIds: ['loc-008'],
      eventIds: ['event-017']
    },
    {
      id: 'doc-009',
      title: 'AG Bondi announces FACE Act investigation: "Full force of federal law"',
      url: 'https://foxnews.com/politics/bondi-face-act-church-protest',
      publishedDate: '2026-01-19T19:00:00Z',
      sourceId: 'src-nat-fox',
      excerpt: 'Attorney General Pam Bondi declared that attacks against law enforcement and intimidation of Christians will be prosecuted to the fullest extent.',
      narrativeIds: ['narr-008'],
      subNarrativeIds: ['sub-018'],
      personIds: ['person-013', 'person-012'],
      organizationIds: ['org-010'],
      locationIds: ['loc-001'],
      eventIds: ['event-018']
    },
    {
      id: 'doc-010',
      title: 'DOJ threatens charges against journalist Don Lemon for covering protest',
      url: 'https://guardian.com/media/don-lemon-doj-threat-minnesota',
      publishedDate: '2026-01-20T13:00:00Z',
      sourceId: 'src-int-guardian',
      excerpt: 'Assistant AG Harmeet Dhillon said Lemon is "on notice" and cannot use journalism as a shield, prompting press freedom concerns.',
      narrativeIds: ['narr-008'],
      subNarrativeIds: ['sub-019'],
      personIds: ['person-012', 'person-016'],
      organizationIds: ['org-010'],
      locationIds: ['loc-008'],
      eventIds: ['event-019']
    },
    {
      id: 'doc-011',
      title: 'Trump: Church protesters are "agitators and insurrectionists" who are "highly trained"',
      url: 'https://truthsocial.com/@realDonaldTrump/posts/123456789',
      publishedDate: '2026-01-21T06:30:00Z',
      sourceId: 'src-x',
      excerpt: 'The President posted that protesters "should be thrown in jail, or thrown out of the Country" calling them professional agitators.',
      narrativeIds: ['narr-008'],
      subNarrativeIds: ['sub-020'],
      personIds: ['person-003'],
      organizationIds: [],
      locationIds: ['loc-001'],
      eventIds: ['event-020']
    },
    {
      id: 'doc-012',
      title: 'Former NAACP president: "How can anyone who claims to be Christian condone this?"',
      url: 'https://cnn.com/us/nekima-levy-armstrong-ice-pastor-interview',
      publishedDate: '2026-01-20T10:00:00Z',
      sourceId: 'src-nat-cnn',
      excerpt: 'Nekima Levy Armstrong questioned the moral standing of an ICE official serving as a pastor while overseeing immigration enforcement.',
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
      title: 'Indiana judge and wife shot at home; suspect at large',
      url: 'https://cnn.com/us/indiana-judge-steven-meyer-shooting',
      publishedDate: '2026-01-19T18:00:00Z',
      sourceId: 'src-nat-cnn',
      excerpt: 'Tippecanoe Superior Court Judge Steven Meyer and his wife Kimberly were shot Sunday afternoon. Both are in stable condition as agencies search for the suspect.',
      narrativeIds: ['narr-007'],
      subNarrativeIds: ['sub-016'],
      personIds: ['person-009', 'person-010'],
      organizationIds: ['org-013', 'org-015'],
      locationIds: ['loc-007'],
      eventIds: ['event-015']
    },
    {
      id: 'doc-014',
      title: 'Indiana Chief Justice to judges: "Please remain vigilant in your own security"',
      url: 'https://indystar.com/news/indiana-chief-justice-judges-security-warning',
      publishedDate: '2026-01-20T11:30:00Z',
      sourceId: 'src-nat-nyt',
      excerpt: 'Chief Justice Loretta H. Rush sent an urgent letter to all state judges expressing concern about violence targeting the judiciary.',
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
      title: 'Judge allows DHS to require week notice for congressional facility inspections',
      url: 'https://politico.com/news/dhs-congressional-inspection-notice-ruling',
      publishedDate: '2026-01-20T14:30:00Z',
      sourceId: 'src-nat-nyt',
      excerpt: 'Federal judge Jia Cobb ruled DHS can continue blocking no-notice inspections despite blocking a similar policy last month.',
      narrativeIds: ['narr-009'],
      subNarrativeIds: ['sub-022'],
      personIds: ['person-025', 'person-021', 'person-022', 'person-023'],
      organizationIds: ['org-017', 'org-020'],
      locationIds: ['loc-009'],
      eventIds: ['event-021', 'event-022']
    },
    {
      id: 'doc-016',
      title: 'DOJ calls Minnesota lawsuit an "absurdity" that undermines federal supremacy',
      url: 'https://reuters.com/legal/doj-minnesota-lawsuit-response',
      publishedDate: '2026-01-20T16:00:00Z',
      sourceId: 'src-int-reuters',
      excerpt: 'Federal lawyers argued the state\'s attempt to end ICE activities would be unprecedented judicial overreach.',
      narrativeIds: ['narr-009'],
      subNarrativeIds: ['sub-023'],
      personIds: ['person-007', 'person-017'],
      organizationIds: ['org-010'],
      locationIds: ['loc-002'],
      eventIds: ['event-023']
    },
    {
      id: 'doc-017',
      title: 'DHS Secretary Noem backtracks: Pepper spray was needed for "law and order"',
      url: 'https://cnn.com/politics/noem-pepper-spray-reversal',
      publishedDate: '2026-01-19T19:30:00Z',
      sourceId: 'src-nat-cnn',
      excerpt: 'After initially denying federal agents used chemical agents, Secretary Noem now says pepper spray was necessary to establish order.',
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
      title: 'RFK Jr unveils meat-heavy dietary guidelines: "We are ending the war on saturated fats"',
      url: 'https://nytimes.com/2026/01/18/health/rfk-dietary-guidelines-meat',
      publishedDate: '2026-01-18T09:00:00Z',
      sourceId: 'src-nat-nyt',
      excerpt: 'The new guidelines feature an inverted food pyramid emphasizing steak, poultry, and whole milk, urging Americans to nearly double protein consumption.',
      narrativeIds: ['narr-010'],
      subNarrativeIds: ['sub-025'],
      personIds: ['person-026'],
      organizationIds: ['org-022'],
      locationIds: ['loc-001'],
      eventIds: ['event-026']
    },
    {
      id: 'doc-019',
      title: 'Scientists warn: New meat guidelines would require 100 million acres of farmland',
      url: 'https://guardian.com/environment/meat-guidelines-environmental-impact',
      publishedDate: '2026-01-19T12:00:00Z',
      sourceId: 'src-int-guardian',
      excerpt: 'World Resources Institute estimates the guidelines would add hundreds of millions of tons of emissions and require an area the size of California.',
      narrativeIds: ['narr-010'],
      subNarrativeIds: ['sub-026'],
      personIds: [],
      organizationIds: ['org-023'],
      locationIds: [],
      eventIds: []
    },
    {
      id: 'doc-020',
      title: 'RFK Jr in 2004: Factory meat industry is "bigger threat than Osama bin Laden"',
      url: 'https://msnbc.com/opinion/rfk-jr-meat-industry-past-quotes',
      publishedDate: '2026-01-20T08:00:00Z',
      sourceId: 'src-nat-msnbc',
      excerpt: 'Critics highlight Kennedy\'s past environmental activism that sharply contradicts his new pro-meat dietary guidelines.',
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
      title: 'NutriNet-Santé study links sodium nitrite to 32% increased cancer risk',
      url: 'https://bbc.com/news/health-food-preservatives-cancer-study',
      publishedDate: '2026-01-08T10:00:00Z',
      sourceId: 'src-int-bbc',
      excerpt: 'A major French study found sodium nitrite—common in deli meats—is associated with significantly higher prostate cancer risk.',
      narrativeIds: ['narr-003'],
      subNarrativeIds: ['sub-007'],
      personIds: [],
      organizationIds: ['org-003'],
      locationIds: [],
      eventIds: []
    },
    {
      id: 'doc-022',
      title: 'Harvard: Ultra-processed foods linked to 45% higher colorectal cancer risk',
      url: 'https://cnn.com/health/harvard-processed-food-cancer-study',
      publishedDate: '2026-01-10T14:00:00Z',
      sourceId: 'src-nat-cnn',
      excerpt: 'Researchers found high consumption of ultra-processed foods correlates with significantly increased risk of precancerous colorectal adenomas.',
      narrativeIds: ['narr-003'],
      subNarrativeIds: [],
      personIds: [],
      organizationIds: [],
      locationIds: [],
      eventIds: []
    },
    {
      id: 'doc-023',
      title: 'TikTok: Vegan influencers see surge as cancer study goes viral',
      url: 'https://tiktok.com/@healthnews/video/123456',
      publishedDate: '2026-01-12T18:00:00Z',
      sourceId: 'src-tiktok',
      excerpt: 'Plant-based diet content has exploded on the platform as younger users seek alternatives to processed foods.',
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
      title: 'Viral thread: ICE agent preaching at church while families are separated',
      url: 'https://x.com/user/status/123456789',
      publishedDate: '2026-01-19T16:00:00Z',
      sourceId: 'src-x',
      excerpt: 'A thread detailing David Easterwood\'s dual role has been shared over 50,000 times, sparking fierce debate.',
      narrativeIds: ['narr-008'],
      subNarrativeIds: ['sub-021'],
      personIds: ['person-014'],
      organizationIds: ['org-011', 'org-016'],
      locationIds: ['loc-008'],
      eventIds: ['event-017']
    },
    {
      id: 'doc-025',
      title: 'Reddit AMA: Minneapolis protester describes "terrifying" federal response',
      url: 'https://reddit.com/r/minnesota/comments/abc123',
      publishedDate: '2026-01-17T20:00:00Z',
      sourceId: 'src-reddit',
      excerpt: 'An eyewitness account of the protests has generated thousands of comments and sparked calls for federal accountability.',
      narrativeIds: ['narr-006'],
      subNarrativeIds: ['sub-013'],
      personIds: [],
      organizationIds: ['org-011'],
      locationIds: ['loc-002'],
      eventIds: []
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

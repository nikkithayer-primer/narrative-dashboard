/**
 * mockDataChinaSemiconductor.js
 * Sample dataset for monitoring Chinese semiconductor industry
 * Demonstrates the full data model capabilities
 */

export const datasetId = 'china-semiconductor';
export const datasetName = 'China Semiconductor';

export const mockData = {
  sources: [
    // Tech News
    { id: 'src-semiengi', name: 'Semiconductor Engineering', type: 'tech_news', color: '#1565C0' },
    { id: 'src-eetimes', name: 'EE Times', type: 'tech_news', color: '#0D47A1' },
    { id: 'src-theregister', name: 'The Register', type: 'tech_news', color: '#B71C1C' },
    { id: 'src-anandtech', name: 'AnandTech', type: 'tech_news', color: '#E65100' },
    { id: 'src-tomshardware', name: 'Tom\'s Hardware', type: 'tech_news', color: '#D32F2F' },
    
    // Chinese News
    { id: 'src-xinhua', name: 'Xinhua', type: 'chinese_news', parent: 'chinese_news', color: '#C62828' },
    { id: 'src-cgtn', name: 'CGTN', type: 'chinese_news', parent: 'chinese_news', color: '#AD1457' },
    { id: 'src-scmp', name: 'South China Morning Post', type: 'chinese_news', parent: 'chinese_news', color: '#FF6F00' },
    { id: 'src-caixin', name: 'Caixin', type: 'chinese_news', parent: 'chinese_news', color: '#00695C' },
    { id: 'src-globaltimes', name: 'Global Times', type: 'chinese_news', parent: 'chinese_news', color: '#C62828' },
    
    // International Business News
    { id: 'src-bloomberg', name: 'Bloomberg', type: 'business_news', parent: 'business_news', color: '#000000' },
    { id: 'src-reuters', name: 'Reuters', type: 'business_news', parent: 'business_news', color: '#FF8000' },
    { id: 'src-wsj', name: 'Wall Street Journal', type: 'business_news', parent: 'business_news', color: '#1A1A1A' },
    { id: 'src-ft', name: 'Financial Times', type: 'business_news', parent: 'business_news', color: '#FFF1E0' },
    { id: 'src-nikkei', name: 'Nikkei Asia', type: 'business_news', parent: 'business_news', color: '#003D7A' },
    
    // Social Media
    { id: 'src-x', name: 'X', type: 'social', color: '#000000' },
    { id: 'src-linkedin', name: 'LinkedIn', type: 'social', color: '#0A66C2' },
    { id: 'src-weibo', name: 'Weibo', type: 'social', color: '#E6162D' },
    { id: 'src-reddit', name: 'Reddit', type: 'social', color: '#FF4500' }
  ],

  sourceCategories: [
    { id: 'tech_news', name: 'Tech News', color: '#4E79A7' },
    { id: 'chinese_news', name: 'Chinese News', color: '#E15759' },
    { id: 'business_news', name: 'Business News', color: '#59A14F' },
    { id: 'social', name: 'Social Media', color: '#B07AA1' }
  ],

  missions: [
    {
      id: 'mission-001',
      name: 'Understand changes in Chinese investment in semiconductor companies',
      description: 'Track government subsidies, venture capital, and corporate investments in Chinese semiconductor firms',
      color: '#4E79A7',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'mission-002',
      name: 'Understand narratives around Chinese semiconductor companies that impact the US',
      description: 'Monitor narratives about export controls, supply chain risks, and competitive threats',
      color: '#E15759',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'mission-003',
      name: 'Understand new releases from Chinese semiconductor companies',
      description: 'Track product announcements, technology breakthroughs, and manufacturing milestones',
      color: '#59A14F',
      createdAt: '2024-01-01T00:00:00Z'
    }
  ],

  narratives: [
    {
      id: 'narr-001',
      text: 'SMIC achieves 5nm chip production using DUV lithography workaround',
      description: 'Semiconductor Manufacturing International Corporation (SMIC) has reportedly achieved 5nm chip production despite lacking access to ASML\'s extreme ultraviolet (EUV) lithography machines. Industry analysts confirm SMIC is using multi-patterning techniques with older deep ultraviolet (DUV) equipment, though at significantly lower yields and higher costs than competitors. The breakthrough raises questions about the effectiveness of export controls and demonstrates Chinese determination to achieve semiconductor self-sufficiency.',
      missionId: 'mission-003',
      status: 'in_progress',
      sentiment: 0.42,
      subNarrativeIds: ['sub-001', 'sub-002', 'sub-003'],
      factionMentions: {
        'faction-001': { volume: 520, sentiment: 0.78 },
        'faction-002': { volume: 380, sentiment: -0.65 },
        'faction-003': { volume: 290, sentiment: 0.15 }
      },
      sourceVolumes: {
        'src-semiengi': { volume: 85, sentiment: 0.12 },
        'src-eetimes': { volume: 72, sentiment: 0.08 },
        'src-scmp': { volume: 145, sentiment: 0.55 },
        'src-xinhua': { volume: 120, sentiment: 0.82 },
        'src-bloomberg': { volume: 95, sentiment: -0.15 },
        'src-reuters': { volume: 88, sentiment: -0.08 },
        'src-x': { volume: 185, sentiment: 0.25 },
        'src-linkedin': { volume: 65, sentiment: 0.18 }
      },
      factionSources: {
        'faction-001': { 'src-xinhua': 110, 'src-scmp': 95, 'src-cgtn': 85, 'src-weibo': 120, 'src-x': 75, 'src-globaltimes': 35 },
        'faction-002': { 'src-wsj': 65, 'src-bloomberg': 80, 'src-x': 95, 'src-reuters': 55, 'src-ft': 45, 'src-linkedin': 40 },
        'faction-003': { 'src-semiengi': 75, 'src-eetimes': 68, 'src-anandtech': 52, 'src-bloomberg': 45, 'src-linkedin': 50 }
      },
      personIds: ['person-001', 'person-002', 'person-003'],
      organizationIds: ['org-001', 'org-002', 'org-003'],
      locationIds: ['loc-001', 'loc-002'],
      eventIds: ['event-001', 'event-002'],
      volumeOverTime: [
        { date: '2026-01-14', factionVolumes: { 'faction-001': 85, 'faction-002': 62, 'faction-003': 48 }, sourceVolumes: { 'src-xinhua': 25, 'src-scmp': 28, 'src-bloomberg': 18, 'src-x': 35, 'src-semiengi': 15 } },
        { date: '2026-01-15', factionVolumes: { 'faction-001': 120, 'faction-002': 95, 'faction-003': 72 }, sourceVolumes: { 'src-xinhua': 35, 'src-scmp': 42, 'src-bloomberg': 28, 'src-x': 55, 'src-semiengi': 22 } },
        { date: '2026-01-16', factionVolumes: { 'faction-001': 185, 'faction-002': 145, 'faction-003': 98 }, sourceVolumes: { 'src-xinhua': 52, 'src-scmp': 58, 'src-bloomberg': 42, 'src-x': 82, 'src-semiengi': 35 } },
        { date: '2026-01-17', factionVolumes: { 'faction-001': 265, 'faction-002': 198, 'faction-003': 135 }, sourceVolumes: { 'src-xinhua': 72, 'src-scmp': 78, 'src-bloomberg': 55, 'src-x': 105, 'src-semiengi': 48 } },
        { date: '2026-01-18', factionVolumes: { 'faction-001': 345, 'faction-002': 265, 'faction-003': 185 }, sourceVolumes: { 'src-xinhua': 88, 'src-scmp': 98, 'src-bloomberg': 68, 'src-x': 135, 'src-semiengi': 62 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 425, 'faction-002': 315, 'faction-003': 235 }, sourceVolumes: { 'src-xinhua': 102, 'src-scmp': 118, 'src-bloomberg': 78, 'src-x': 158, 'src-semiengi': 72 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 520, 'faction-002': 380, 'faction-003': 290 }, sourceVolumes: { 'src-xinhua': 120, 'src-scmp': 145, 'src-bloomberg': 95, 'src-x': 185, 'src-semiengi': 85 } }
      ],
      documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004'],
      createdAt: '2026-01-14T00:00:00Z'
    },
    {
      id: 'narr-002',
      text: 'US tightens ASML export restrictions, blocking all advanced lithography to China',
      description: 'The Biden administration has pressured the Netherlands to expand export controls on ASML, now blocking shipments of not just EUV but also advanced DUV lithography systems to China. ASML reported the restrictions will reduce their China revenue by $2.5 billion annually. The Dutch government acquiesced after months of negotiations, with Chinese officials condemning the move as "technological hegemony." Industry analysts warn the restrictions may accelerate Chinese efforts to develop indigenous lithography equipment.',
      missionId: 'mission-002',
      status: 'in_progress',
      sentiment: -0.48,
      subNarrativeIds: ['sub-004', 'sub-005', 'sub-006'],
      factionMentions: {
        'faction-001': { volume: 385, sentiment: -0.82 },
        'faction-002': { volume: 445, sentiment: 0.72 },
        'faction-004': { volume: 220, sentiment: -0.68 },
        'faction-006': { volume: 165, sentiment: -0.45 }
      },
      sourceVolumes: {
        'src-bloomberg': { volume: 125, sentiment: -0.22 },
        'src-reuters': { volume: 115, sentiment: -0.18 },
        'src-wsj': { volume: 98, sentiment: 0.35 },
        'src-ft': { volume: 88, sentiment: -0.12 },
        'src-xinhua': { volume: 165, sentiment: -0.85 },
        'src-globaltimes': { volume: 142, sentiment: -0.92 },
        'src-x': { volume: 245, sentiment: -0.35 },
        'src-linkedin': { volume: 78, sentiment: -0.25 }
      },
      factionSources: {
        'faction-001': { 'src-xinhua': 145, 'src-globaltimes': 125, 'src-cgtn': 85, 'src-weibo': 95, 'src-x': 65 },
        'faction-002': { 'src-wsj': 85, 'src-bloomberg': 75, 'src-x': 125, 'src-reuters': 65, 'src-ft': 55 },
        'faction-004': { 'src-xinhua': 45, 'src-cgtn': 38, 'src-globaltimes': 52, 'src-scmp': 48, 'src-x': 37 },
        'faction-006': { 'src-bloomberg': 55, 'src-reuters': 48, 'src-nikkei': 35, 'src-ft': 27 }
      },
      personIds: ['person-004', 'person-005', 'person-006', 'person-007'],
      organizationIds: ['org-002', 'org-004', 'org-005', 'org-006'],
      locationIds: ['loc-003', 'loc-004', 'loc-005'],
      eventIds: ['event-003', 'event-004', 'event-005'],
      volumeOverTime: [
        { date: '2026-01-12', factionVolumes: { 'faction-001': 95, 'faction-002': 125, 'faction-004': 55, 'faction-006': 42 }, sourceVolumes: { 'src-bloomberg': 32, 'src-reuters': 28, 'src-xinhua': 42, 'src-x': 62 } },
        { date: '2026-01-13', factionVolumes: { 'faction-001': 145, 'faction-002': 185, 'faction-004': 85, 'faction-006': 68 }, sourceVolumes: { 'src-bloomberg': 48, 'src-reuters': 42, 'src-xinhua': 65, 'src-x': 95 } },
        { date: '2026-01-14', factionVolumes: { 'faction-001': 215, 'faction-002': 265, 'faction-004': 125, 'faction-006': 98 }, sourceVolumes: { 'src-bloomberg': 68, 'src-reuters': 62, 'src-xinhua': 95, 'src-x': 138 } },
        { date: '2026-01-15', factionVolumes: { 'faction-001': 285, 'faction-002': 345, 'faction-004': 165, 'faction-006': 128 }, sourceVolumes: { 'src-bloomberg': 88, 'src-reuters': 82, 'src-xinhua': 125, 'src-x': 178 } },
        { date: '2026-01-16', factionVolumes: { 'faction-001': 345, 'faction-002': 405, 'faction-004': 195, 'faction-006': 148 }, sourceVolumes: { 'src-bloomberg': 108, 'src-reuters': 98, 'src-xinhua': 148, 'src-x': 218 } },
        { date: '2026-01-17', factionVolumes: { 'faction-001': 385, 'faction-002': 445, 'faction-004': 220, 'faction-006': 165 }, sourceVolumes: { 'src-bloomberg': 125, 'src-reuters': 115, 'src-xinhua': 165, 'src-x': 245 } }
      ],
      documentIds: ['doc-005', 'doc-006', 'doc-007', 'doc-008'],
      createdAt: '2026-01-12T00:00:00Z'
    },
    {
      id: 'narr-003',
      text: 'China announces $47 billion semiconductor investment fund, third phase of "Big Fund"',
      description: 'China has launched the third phase of its National Integrated Circuit Industry Investment Fund, commonly known as the "Big Fund," with 340 billion yuan ($47 billion) in new capital. This is the largest tranche yet, exceeding the combined total of the first two phases. The fund will prioritize advanced packaging, chipmaking equipment, and EDA software development. Major state-owned enterprises and regional governments are contributing, signaling intensified commitment to semiconductor self-sufficiency amid US export controls.',
      missionId: 'mission-001',
      status: 'new',
      sentiment: 0.35,
      subNarrativeIds: ['sub-007', 'sub-008', 'sub-009'],
      factionMentions: {
        'faction-001': { volume: 425, sentiment: 0.85 },
        'faction-002': { volume: 285, sentiment: -0.55 },
        'faction-003': { volume: 195, sentiment: 0.22 },
        'faction-005': { volume: 145, sentiment: 0.65 }
      },
      sourceVolumes: {
        'src-xinhua': { volume: 185, sentiment: 0.92 },
        'src-caixin': { volume: 145, sentiment: 0.75 },
        'src-scmp': { volume: 125, sentiment: 0.58 },
        'src-bloomberg': { volume: 115, sentiment: -0.25 },
        'src-reuters': { volume: 98, sentiment: -0.18 },
        'src-ft': { volume: 85, sentiment: -0.22 },
        'src-x': { volume: 165, sentiment: 0.28 },
        'src-weibo': { volume: 142, sentiment: 0.82 }
      },
      factionSources: {
        'faction-001': { 'src-xinhua': 165, 'src-caixin': 125, 'src-cgtn': 95, 'src-weibo': 135, 'src-scmp': 85 },
        'faction-002': { 'src-wsj': 72, 'src-bloomberg': 85, 'src-x': 78, 'src-reuters': 50 },
        'faction-003': { 'src-semiengi': 52, 'src-eetimes': 45, 'src-bloomberg': 48, 'src-ft': 50 },
        'faction-005': { 'src-caixin': 55, 'src-scmp': 48, 'src-bloomberg': 42 }
      },
      personIds: ['person-008', 'person-009', 'person-010'],
      organizationIds: ['org-007', 'org-008', 'org-009'],
      locationIds: ['loc-002', 'loc-006'],
      eventIds: ['event-006', 'event-007'],
      volumeOverTime: [
        { date: '2026-01-17', factionVolumes: { 'faction-001': 145, 'faction-002': 98, 'faction-003': 65, 'faction-005': 48 }, sourceVolumes: { 'src-xinhua': 62, 'src-caixin': 48, 'src-bloomberg': 38, 'src-x': 55 } },
        { date: '2026-01-18', factionVolumes: { 'faction-001': 265, 'faction-002': 175, 'faction-003': 125, 'faction-005': 92 }, sourceVolumes: { 'src-xinhua': 115, 'src-caixin': 92, 'src-bloomberg': 72, 'src-x': 105 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 345, 'faction-002': 235, 'faction-003': 165, 'faction-005': 125 }, sourceVolumes: { 'src-xinhua': 152, 'src-caixin': 125, 'src-bloomberg': 95, 'src-x': 138 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 425, 'faction-002': 285, 'faction-003': 195, 'faction-005': 145 }, sourceVolumes: { 'src-xinhua': 185, 'src-caixin': 145, 'src-bloomberg': 115, 'src-x': 165 } }
      ],
      documentIds: ['doc-009', 'doc-010', 'doc-011'],
      createdAt: '2026-01-17T00:00:00Z'
    },
    {
      id: 'narr-004',
      text: 'Huawei stockpiles semiconductor equipment ahead of expanded US sanctions',
      description: 'Multiple reports indicate Huawei has been aggressively stockpiling semiconductor manufacturing equipment and components in anticipation of expanded US export controls. Sources cite warehouses in Shenzhen containing billions of dollars worth of equipment from ASML, Applied Materials, and Lam Research purchased before restrictions took effect. US officials are investigating whether sanctions were circumvented through third-party intermediaries. Huawei denies any improper conduct.',
      missionId: 'mission-002',
      status: 'under_investigation',
      sentiment: -0.52,
      subNarrativeIds: ['sub-010', 'sub-011'],
      factionMentions: {
        'faction-001': { volume: 285, sentiment: -0.72 },
        'faction-002': { volume: 365, sentiment: 0.68 },
        'faction-003': { volume: 165, sentiment: -0.15 },
        'faction-006': { volume: 125, sentiment: -0.48 }
      },
      sourceVolumes: {
        'src-bloomberg': { volume: 145, sentiment: -0.35 },
        'src-wsj': { volume: 132, sentiment: 0.42 },
        'src-reuters': { volume: 115, sentiment: -0.22 },
        'src-xinhua': { volume: 95, sentiment: -0.78 },
        'src-scmp': { volume: 88, sentiment: -0.45 },
        'src-x': { volume: 178, sentiment: -0.38 },
        'src-linkedin': { volume: 65, sentiment: -0.28 }
      },
      factionSources: {
        'faction-001': { 'src-xinhua': 85, 'src-scmp': 72, 'src-cgtn': 58, 'src-weibo': 70 },
        'faction-002': { 'src-wsj': 115, 'src-bloomberg': 95, 'src-x': 105, 'src-reuters': 50 },
        'faction-003': { 'src-semiengi': 48, 'src-eetimes': 42, 'src-bloomberg': 45, 'src-linkedin': 30 },
        'faction-006': { 'src-bloomberg': 42, 'src-reuters': 38, 'src-nikkei': 28, 'src-ft': 17 }
      },
      personIds: ['person-011', 'person-012', 'person-005'],
      organizationIds: ['org-010', 'org-002', 'org-011', 'org-012'],
      locationIds: ['loc-001', 'loc-004'],
      eventIds: ['event-008', 'event-009'],
      volumeOverTime: [
        { date: '2026-01-15', factionVolumes: { 'faction-001': 95, 'faction-002': 125, 'faction-003': 55, 'faction-006': 42 }, sourceVolumes: { 'src-bloomberg': 48, 'src-wsj': 45, 'src-xinhua': 32, 'src-x': 58 } },
        { date: '2026-01-16', factionVolumes: { 'faction-001': 145, 'faction-002': 195, 'faction-003': 85, 'faction-006': 65 }, sourceVolumes: { 'src-bloomberg': 75, 'src-wsj': 72, 'src-xinhua': 48, 'src-x': 92 } },
        { date: '2026-01-17', factionVolumes: { 'faction-001': 195, 'faction-002': 265, 'faction-003': 115, 'faction-006': 88 }, sourceVolumes: { 'src-bloomberg': 105, 'src-wsj': 98, 'src-xinhua': 68, 'src-x': 128 } },
        { date: '2026-01-18', factionVolumes: { 'faction-001': 245, 'faction-002': 325, 'faction-003': 145, 'faction-006': 108 }, sourceVolumes: { 'src-bloomberg': 128, 'src-wsj': 118, 'src-xinhua': 82, 'src-x': 158 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 285, 'faction-002': 365, 'faction-003': 165, 'faction-006': 125 }, sourceVolumes: { 'src-bloomberg': 145, 'src-wsj': 132, 'src-xinhua': 95, 'src-x': 178 } }
      ],
      documentIds: ['doc-012', 'doc-013', 'doc-014'],
      createdAt: '2026-01-15T00:00:00Z'
    },
    {
      id: 'narr-005',
      text: 'YMTC flash memory chips found in consumer devices despite US blacklist',
      description: 'Researchers have discovered flash memory chips manufactured by Yangtze Memory Technologies Co. (YMTC) in consumer electronics sold globally, despite the company being placed on the US Entity List in late 2022. The chips were found in products from multiple brands through supply chain analysis. YMTC\'s 232-layer NAND technology has proven competitive with Samsung and SK Hynix offerings. The discovery has reignited debates about the enforcement and effectiveness of semiconductor export controls.',
      missionId: 'mission-003',
      status: 'in_progress',
      sentiment: -0.38,
      subNarrativeIds: ['sub-012', 'sub-013'],
      factionMentions: {
        'faction-001': { volume: 195, sentiment: 0.55 },
        'faction-002': { volume: 275, sentiment: -0.72 },
        'faction-003': { volume: 185, sentiment: 0.25 },
        'faction-006': { volume: 145, sentiment: -0.55 }
      },
      sourceVolumes: {
        'src-semiengi': { volume: 95, sentiment: 0.18 },
        'src-eetimes': { volume: 85, sentiment: 0.12 },
        'src-bloomberg': { volume: 115, sentiment: -0.45 },
        'src-wsj': { volume: 98, sentiment: -0.52 },
        'src-scmp': { volume: 78, sentiment: 0.35 },
        'src-x': { volume: 165, sentiment: -0.28 },
        'src-reddit': { volume: 88, sentiment: 0.22 }
      },
      factionSources: {
        'faction-001': { 'src-scmp': 65, 'src-xinhua': 55, 'src-weibo': 75 },
        'faction-002': { 'src-wsj': 85, 'src-bloomberg': 78, 'src-x': 82, 'src-reuters': 30 },
        'faction-003': { 'src-semiengi': 82, 'src-eetimes': 72, 'src-anandtech': 31 },
        'faction-006': { 'src-bloomberg': 52, 'src-nikkei': 45, 'src-reuters': 48 }
      },
      personIds: ['person-013', 'person-014'],
      organizationIds: ['org-013', 'org-014', 'org-015'],
      locationIds: ['loc-007', 'loc-004'],
      eventIds: ['event-010', 'event-011'],
      volumeOverTime: [
        { date: '2026-01-16', factionVolumes: { 'faction-001': 65, 'faction-002': 92, 'faction-003': 62, 'faction-006': 48 }, sourceVolumes: { 'src-semiengi': 32, 'src-bloomberg': 38, 'src-x': 55 } },
        { date: '2026-01-17', factionVolumes: { 'faction-001': 115, 'faction-002': 165, 'faction-003': 115, 'faction-006': 88 }, sourceVolumes: { 'src-semiengi': 58, 'src-bloomberg': 72, 'src-x': 98 } },
        { date: '2026-01-18', factionVolumes: { 'faction-001': 155, 'faction-002': 225, 'faction-003': 152, 'faction-006': 118 }, sourceVolumes: { 'src-semiengi': 78, 'src-bloomberg': 95, 'src-x': 135 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 195, 'faction-002': 275, 'faction-003': 185, 'faction-006': 145 }, sourceVolumes: { 'src-semiengi': 95, 'src-bloomberg': 115, 'src-x': 165 } }
      ],
      documentIds: ['doc-015', 'doc-016', 'doc-017'],
      createdAt: '2026-01-16T00:00:00Z'
    },
    {
      id: 'narr-006',
      text: 'Chinese companies develop alternatives to US EDA software tools',
      description: 'A consortium of Chinese technology companies has announced significant progress in developing indigenous electronic design automation (EDA) software to replace tools from US firms Cadence, Synopsys, and Mentor Graphics. Empyrean Technology and Huada Jiutian are leading the effort with government backing. While current tools lag behind US offerings, the companies claim their software can now handle designs up to 14nm, with 7nm capability expected within two years.',
      missionId: 'mission-003',
      status: 'new',
      sentiment: 0.28,
      subNarrativeIds: ['sub-014', 'sub-015'],
      factionMentions: {
        'faction-001': { volume: 245, sentiment: 0.82 },
        'faction-002': { volume: 165, sentiment: -0.48 },
        'faction-003': { volume: 215, sentiment: 0.35 },
        'faction-005': { volume: 125, sentiment: 0.72 }
      },
      sourceVolumes: {
        'src-semiengi': { volume: 115, sentiment: 0.28 },
        'src-eetimes': { volume: 98, sentiment: 0.22 },
        'src-xinhua': { volume: 135, sentiment: 0.85 },
        'src-caixin': { volume: 95, sentiment: 0.68 },
        'src-scmp': { volume: 78, sentiment: 0.52 },
        'src-x': { volume: 145, sentiment: 0.32 },
        'src-linkedin': { volume: 72, sentiment: 0.42 }
      },
      factionSources: {
        'faction-001': { 'src-xinhua': 115, 'src-caixin': 82, 'src-scmp': 65, 'src-weibo': 85 },
        'faction-002': { 'src-wsj': 55, 'src-bloomberg': 48, 'src-x': 62 },
        'faction-003': { 'src-semiengi': 95, 'src-eetimes': 82, 'src-linkedin': 38 },
        'faction-005': { 'src-caixin': 45, 'src-scmp': 38, 'src-xinhua': 42 }
      },
      personIds: ['person-015', 'person-016'],
      organizationIds: ['org-016', 'org-017', 'org-018', 'org-019'],
      locationIds: ['loc-002', 'loc-008'],
      eventIds: ['event-012'],
      volumeOverTime: [
        { date: '2026-01-18', factionVolumes: { 'faction-001': 85, 'faction-002': 58, 'faction-003': 75, 'faction-005': 42 }, sourceVolumes: { 'src-semiengi': 38, 'src-xinhua': 45, 'src-x': 48 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 165, 'faction-002': 115, 'faction-003': 148, 'faction-005': 85 }, sourceVolumes: { 'src-semiengi': 78, 'src-xinhua': 92, 'src-x': 98 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 245, 'faction-002': 165, 'faction-003': 215, 'faction-005': 125 }, sourceVolumes: { 'src-semiengi': 115, 'src-xinhua': 135, 'src-x': 145 } }
      ],
      documentIds: ['doc-018', 'doc-019'],
      createdAt: '2026-01-18T00:00:00Z'
    },
    {
      id: 'narr-007',
      text: 'TSMC Arizona fab faces delays and cost overruns amid worker disputes',
      description: 'Taiwan Semiconductor Manufacturing Company\'s $40 billion Arizona fabrication facility faces mounting challenges including construction delays, cost overruns, and conflicts between Taiwanese and American workers. Local unions have criticized TSMC\'s management practices, while company officials have expressed frustration with US worker productivity. The plant, initially planned to begin production in 2024, is now targeting late 2025 for 4nm chips. The setbacks raise questions about the feasibility of reshoring advanced semiconductor manufacturing to the US.',
      missionId: 'mission-002',
      status: 'in_progress',
      sentiment: -0.42,
      subNarrativeIds: ['sub-016', 'sub-017'],
      factionMentions: {
        'faction-001': { volume: 145, sentiment: 0.45 },
        'faction-002': { volume: 225, sentiment: -0.35 },
        'faction-005': { volume: 185, sentiment: -0.58 },
        'faction-006': { volume: 165, sentiment: -0.48 }
      },
      sourceVolumes: {
        'src-bloomberg': { volume: 135, sentiment: -0.38 },
        'src-reuters': { volume: 118, sentiment: -0.32 },
        'src-wsj': { volume: 105, sentiment: -0.28 },
        'src-ft': { volume: 88, sentiment: -0.35 },
        'src-nikkei': { volume: 95, sentiment: -0.42 },
        'src-scmp': { volume: 72, sentiment: 0.38 },
        'src-x': { volume: 185, sentiment: -0.45 },
        'src-linkedin': { volume: 78, sentiment: -0.32 }
      },
      factionSources: {
        'faction-001': { 'src-scmp': 65, 'src-globaltimes': 48, 'src-x': 32 },
        'faction-002': { 'src-wsj': 75, 'src-bloomberg': 82, 'src-x': 68 },
        'faction-005': { 'src-bloomberg': 62, 'src-nikkei': 78, 'src-ft': 45 },
        'faction-006': { 'src-bloomberg': 55, 'src-reuters': 62, 'src-nikkei': 48 }
      },
      personIds: ['person-017', 'person-018', 'person-019'],
      organizationIds: ['org-020', 'org-021'],
      locationIds: ['loc-009', 'loc-010'],
      eventIds: ['event-013', 'event-014'],
      volumeOverTime: [
        { date: '2026-01-14', factionVolumes: { 'faction-001': 48, 'faction-002': 75, 'faction-005': 62, 'faction-006': 55 }, sourceVolumes: { 'src-bloomberg': 45, 'src-wsj': 35, 'src-x': 62 } },
        { date: '2026-01-15', factionVolumes: { 'faction-001': 72, 'faction-002': 115, 'faction-005': 95, 'faction-006': 85 }, sourceVolumes: { 'src-bloomberg': 68, 'src-wsj': 55, 'src-x': 95 } },
        { date: '2026-01-16', factionVolumes: { 'faction-001': 98, 'faction-002': 155, 'faction-005': 128, 'faction-006': 115 }, sourceVolumes: { 'src-bloomberg': 92, 'src-wsj': 72, 'src-x': 128 } },
        { date: '2026-01-17', factionVolumes: { 'faction-001': 125, 'faction-002': 192, 'faction-005': 158, 'faction-006': 142 }, sourceVolumes: { 'src-bloomberg': 115, 'src-wsj': 88, 'src-x': 158 } },
        { date: '2026-01-18', factionVolumes: { 'faction-001': 145, 'faction-002': 225, 'faction-005': 185, 'faction-006': 165 }, sourceVolumes: { 'src-bloomberg': 135, 'src-wsj': 105, 'src-x': 185 } }
      ],
      documentIds: ['doc-020', 'doc-021', 'doc-022'],
      createdAt: '2026-01-14T00:00:00Z'
    }
  ],

  subNarratives: [
    {
      id: 'sub-001',
      text: 'SMIC multi-patterning technique enables advanced nodes without EUV',
      description: 'Industry analysts detail SMIC\'s innovative use of multiple DUV exposures to achieve feature sizes previously thought to require EUV lithography, though at significant cost and yield penalties.',
      parentNarrativeId: 'narr-001',
      sentiment: 0.35,
      factionMentions: {
        'faction-001': { volume: 185, sentiment: 0.82 },
        'faction-003': { volume: 145, sentiment: 0.45 }
      },
      personIds: ['person-001'],
      organizationIds: ['org-001'],
      locationIds: ['loc-001'],
      eventIds: ['event-001'],
      volumeOverTime: [
        { date: '2026-01-17', factionVolumes: { 'faction-001': 65, 'faction-003': 52 } },
        { date: '2026-01-18', factionVolumes: { 'faction-001': 125, 'faction-003': 98 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 155, 'faction-003': 125 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 185, 'faction-003': 145 } }
      ]
    },
    {
      id: 'sub-002',
      text: 'Huawei Mate 70 teardown reveals SMIC 5nm chip inside',
      description: 'Tech reviewers conducting teardowns of Huawei\'s latest flagship smartphone have confirmed it contains a 5nm processor manufactured by SMIC, marking a significant milestone for China\'s semiconductor independence.',
      parentNarrativeId: 'narr-001',
      sentiment: 0.58,
      factionMentions: {
        'faction-001': { volume: 245, sentiment: 0.88 },
        'faction-003': { volume: 125, sentiment: 0.32 }
      },
      personIds: ['person-011'],
      organizationIds: ['org-001', 'org-010'],
      locationIds: ['loc-001'],
      eventIds: ['event-002'],
      volumeOverTime: [
        { date: '2026-01-18', factionVolumes: { 'faction-001': 85, 'faction-003': 42 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 165, 'faction-003': 85 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 245, 'faction-003': 125 } }
      ]
    },
    {
      id: 'sub-003',
      text: 'US analysts debate effectiveness of chip export controls',
      description: 'SMIC\'s breakthrough has sparked debate among US policymakers about whether export controls are achieving their intended goals or merely accelerating Chinese self-sufficiency efforts.',
      parentNarrativeId: 'narr-001',
      sentiment: -0.28,
      factionMentions: {
        'faction-002': { volume: 195, sentiment: -0.52 },
        'faction-003': { volume: 85, sentiment: -0.15 }
      },
      personIds: ['person-005', 'person-006'],
      organizationIds: ['org-005', 'org-006'],
      locationIds: ['loc-004'],
      eventIds: [],
      volumeOverTime: [
        { date: '2026-01-18', factionVolumes: { 'faction-002': 68, 'faction-003': 28 } },
        { date: '2026-01-19', factionVolumes: { 'faction-002': 135, 'faction-003': 58 } },
        { date: '2026-01-20', factionVolumes: { 'faction-002': 195, 'faction-003': 85 } }
      ]
    },
    {
      id: 'sub-004',
      text: 'Dutch government expands ASML export restrictions under US pressure',
      description: 'The Netherlands has agreed to block exports of advanced DUV lithography systems to China, expanding previous restrictions that only covered EUV machines, following months of negotiations with US officials.',
      parentNarrativeId: 'narr-002',
      sentiment: -0.42,
      factionMentions: {
        'faction-001': { volume: 165, sentiment: -0.85 },
        'faction-002': { volume: 195, sentiment: 0.72 }
      },
      personIds: ['person-004', 'person-007'],
      organizationIds: ['org-002', 'org-004'],
      locationIds: ['loc-003', 'loc-004'],
      eventIds: ['event-003'],
      volumeOverTime: [
        { date: '2026-01-14', factionVolumes: { 'faction-001': 55, 'faction-002': 68 } },
        { date: '2026-01-15', factionVolumes: { 'faction-001': 98, 'faction-002': 125 } },
        { date: '2026-01-16', factionVolumes: { 'faction-001': 135, 'faction-002': 165 } },
        { date: '2026-01-17', factionVolumes: { 'faction-001': 165, 'faction-002': 195 } }
      ]
    },
    {
      id: 'sub-005',
      text: 'ASML projects $2.5 billion annual revenue loss from China restrictions',
      description: 'ASML disclosed in its quarterly earnings call that expanded China export restrictions will reduce annual revenue by approximately $2.5 billion, prompting investor concerns about growth prospects.',
      parentNarrativeId: 'narr-002',
      sentiment: -0.55,
      factionMentions: {
        'faction-003': { volume: 145, sentiment: -0.42 },
        'faction-006': { volume: 125, sentiment: -0.58 }
      },
      personIds: ['person-004'],
      organizationIds: ['org-002'],
      locationIds: ['loc-003'],
      eventIds: ['event-004'],
      volumeOverTime: [
        { date: '2026-01-15', factionVolumes: { 'faction-003': 48, 'faction-006': 42 } },
        { date: '2026-01-16', factionVolumes: { 'faction-003': 95, 'faction-006': 85 } },
        { date: '2026-01-17', factionVolumes: { 'faction-003': 145, 'faction-006': 125 } }
      ]
    },
    {
      id: 'sub-006',
      text: 'China accelerates indigenous lithography development in response',
      description: 'Chinese officials have announced increased funding for domestic lithography equipment development, with Shanghai Micro Electronics Equipment (SMEE) receiving priority support to accelerate its roadmap.',
      parentNarrativeId: 'narr-002',
      sentiment: 0.45,
      factionMentions: {
        'faction-001': { volume: 185, sentiment: 0.78 },
        'faction-005': { volume: 95, sentiment: 0.62 }
      },
      personIds: ['person-008'],
      organizationIds: ['org-022'],
      locationIds: ['loc-002'],
      eventIds: ['event-005'],
      volumeOverTime: [
        { date: '2026-01-15', factionVolumes: { 'faction-001': 62, 'faction-005': 32 } },
        { date: '2026-01-16', factionVolumes: { 'faction-001': 125, 'faction-005': 65 } },
        { date: '2026-01-17', factionVolumes: { 'faction-001': 185, 'faction-005': 95 } }
      ]
    },
    {
      id: 'sub-007',
      text: 'Big Fund III targets advanced packaging and chipmaking equipment',
      description: 'The third phase of China\'s National IC Fund will prioritize investment in advanced packaging technologies like chiplets and 2.5D/3D stacking, as well as domestic semiconductor manufacturing equipment.',
      parentNarrativeId: 'narr-003',
      sentiment: 0.65,
      factionMentions: {
        'faction-001': { volume: 215, sentiment: 0.88 },
        'faction-005': { volume: 95, sentiment: 0.72 }
      },
      personIds: ['person-008', 'person-009'],
      organizationIds: ['org-007', 'org-008'],
      locationIds: ['loc-002'],
      eventIds: ['event-006'],
      volumeOverTime: [
        { date: '2026-01-18', factionVolumes: { 'faction-001': 75, 'faction-005': 32 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 145, 'faction-005': 65 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 215, 'faction-005': 95 } }
      ]
    },
    {
      id: 'sub-008',
      text: 'State-owned enterprises contribute majority of Big Fund III capital',
      description: 'Analysis reveals that state-owned enterprises and government-linked investment vehicles are providing the majority of Big Fund III\'s 340 billion yuan, reflecting deepening state involvement in the semiconductor sector.',
      parentNarrativeId: 'narr-003',
      sentiment: 0.42,
      factionMentions: {
        'faction-001': { volume: 165, sentiment: 0.75 },
        'faction-002': { volume: 125, sentiment: -0.45 }
      },
      personIds: ['person-010'],
      organizationIds: ['org-009'],
      locationIds: ['loc-006'],
      eventIds: ['event-007'],
      volumeOverTime: [
        { date: '2026-01-18', factionVolumes: { 'faction-001': 55, 'faction-002': 42 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 115, 'faction-002': 85 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 165, 'faction-002': 125 } }
      ]
    },
    {
      id: 'sub-009',
      text: 'Critics question Big Fund\'s track record and corruption concerns',
      description: 'Western analysts point to Big Fund\'s mixed track record and past corruption scandals, questioning whether massive capital injections can overcome technological gaps without access to cutting-edge equipment.',
      parentNarrativeId: 'narr-003',
      sentiment: -0.35,
      factionMentions: {
        'faction-002': { volume: 145, sentiment: -0.58 },
        'faction-003': { volume: 85, sentiment: -0.22 }
      },
      personIds: [],
      organizationIds: ['org-007'],
      locationIds: [],
      eventIds: [],
      volumeOverTime: [
        { date: '2026-01-18', factionVolumes: { 'faction-002': 48, 'faction-003': 28 } },
        { date: '2026-01-19', factionVolumes: { 'faction-002': 98, 'faction-003': 58 } },
        { date: '2026-01-20', factionVolumes: { 'faction-002': 145, 'faction-003': 85 } }
      ]
    },
    {
      id: 'sub-010',
      text: 'Huawei builds strategic equipment reserves worth billions',
      description: 'Sources reveal Huawei has accumulated semiconductor manufacturing equipment worth an estimated $5-8 billion in warehouses across China, purchased before expanded export restrictions took effect.',
      parentNarrativeId: 'narr-004',
      sentiment: -0.45,
      factionMentions: {
        'faction-001': { volume: 145, sentiment: -0.65 },
        'faction-002': { volume: 195, sentiment: 0.72 }
      },
      personIds: ['person-011', 'person-012'],
      organizationIds: ['org-010'],
      locationIds: ['loc-001'],
      eventIds: ['event-008'],
      volumeOverTime: [
        { date: '2026-01-16', factionVolumes: { 'faction-001': 48, 'faction-002': 65 } },
        { date: '2026-01-17', factionVolumes: { 'faction-001': 95, 'faction-002': 135 } },
        { date: '2026-01-18', factionVolumes: { 'faction-001': 125, 'faction-002': 165 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 145, 'faction-002': 195 } }
      ]
    },
    {
      id: 'sub-011',
      text: 'US investigators probe possible sanctions violations by intermediaries',
      description: 'The US Commerce Department has opened investigations into whether Huawei circumvented export controls by using third-party intermediaries to acquire restricted semiconductor equipment.',
      parentNarrativeId: 'narr-004',
      sentiment: -0.58,
      factionMentions: {
        'faction-002': { volume: 175, sentiment: 0.65 },
        'faction-001': { volume: 95, sentiment: -0.78 }
      },
      personIds: ['person-005'],
      organizationIds: ['org-005', 'org-010'],
      locationIds: ['loc-004'],
      eventIds: ['event-009'],
      volumeOverTime: [
        { date: '2026-01-17', factionVolumes: { 'faction-002': 58, 'faction-001': 32 } },
        { date: '2026-01-18', factionVolumes: { 'faction-002': 115, 'faction-001': 65 } },
        { date: '2026-01-19', factionVolumes: { 'faction-002': 175, 'faction-001': 95 } }
      ]
    },
    {
      id: 'sub-012',
      text: 'YMTC 232-layer NAND found competitive with Samsung offerings',
      description: 'Independent testing shows YMTC\'s 232-layer 3D NAND flash memory achieves performance and density metrics comparable to Samsung\'s latest offerings, validating China\'s memory chip capabilities.',
      parentNarrativeId: 'narr-005',
      sentiment: 0.42,
      factionMentions: {
        'faction-001': { volume: 125, sentiment: 0.72 },
        'faction-003': { volume: 145, sentiment: 0.38 }
      },
      personIds: ['person-013'],
      organizationIds: ['org-013', 'org-014'],
      locationIds: ['loc-007'],
      eventIds: ['event-010'],
      volumeOverTime: [
        { date: '2026-01-17', factionVolumes: { 'faction-001': 42, 'faction-003': 48 } },
        { date: '2026-01-18', factionVolumes: { 'faction-001': 85, 'faction-003': 98 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 125, 'faction-003': 145 } }
      ]
    },
    {
      id: 'sub-013',
      text: 'Supply chain researchers trace YMTC chips in global consumer devices',
      description: 'Researchers have identified YMTC memory chips in smartphones, SSDs, and other consumer electronics from multiple brands, raising questions about Entity List enforcement.',
      parentNarrativeId: 'narr-005',
      sentiment: -0.52,
      factionMentions: {
        'faction-002': { volume: 165, sentiment: -0.72 },
        'faction-006': { volume: 115, sentiment: -0.55 }
      },
      personIds: ['person-014'],
      organizationIds: ['org-013', 'org-015'],
      locationIds: ['loc-004'],
      eventIds: ['event-011'],
      volumeOverTime: [
        { date: '2026-01-17', factionVolumes: { 'faction-002': 55, 'faction-006': 38 } },
        { date: '2026-01-18', factionVolumes: { 'faction-002': 115, 'faction-006': 78 } },
        { date: '2026-01-19', factionVolumes: { 'faction-002': 165, 'faction-006': 115 } }
      ]
    },
    {
      id: 'sub-014',
      text: 'Empyrean and Huada Jiutian lead Chinese EDA development',
      description: 'Empyrean Technology and Huada Jiutian have emerged as leaders in China\'s push to develop indigenous EDA software, with combined government and private funding exceeding $2 billion.',
      parentNarrativeId: 'narr-006',
      sentiment: 0.55,
      factionMentions: {
        'faction-001': { volume: 165, sentiment: 0.85 },
        'faction-005': { volume: 95, sentiment: 0.72 }
      },
      personIds: ['person-015', 'person-016'],
      organizationIds: ['org-016', 'org-017'],
      locationIds: ['loc-002', 'loc-008'],
      eventIds: ['event-012'],
      volumeOverTime: [
        { date: '2026-01-19', factionVolumes: { 'faction-001': 55, 'faction-005': 32 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 165, 'faction-005': 95 } }
      ]
    },
    {
      id: 'sub-015',
      text: 'Chinese EDA tools currently limited to mature process nodes',
      description: 'Industry analysts note that while Chinese EDA tools have made progress, they currently only support designs at 14nm and above, several generations behind leading-edge US software.',
      parentNarrativeId: 'narr-006',
      sentiment: -0.18,
      factionMentions: {
        'faction-002': { volume: 95, sentiment: -0.35 },
        'faction-003': { volume: 125, sentiment: 0.12 }
      },
      personIds: [],
      organizationIds: ['org-018', 'org-019'],
      locationIds: [],
      eventIds: [],
      volumeOverTime: [
        { date: '2026-01-19', factionVolumes: { 'faction-002': 32, 'faction-003': 42 } },
        { date: '2026-01-20', factionVolumes: { 'faction-002': 95, 'faction-003': 125 } }
      ]
    },
    {
      id: 'sub-016',
      text: 'TSMC Arizona construction delays push production to late 2025',
      description: 'TSMC has confirmed that production at its Arizona fab will begin in late 2025, a significant delay from the original 2024 target, citing construction challenges and supply chain issues.',
      parentNarrativeId: 'narr-007',
      sentiment: -0.48,
      factionMentions: {
        'faction-002': { volume: 145, sentiment: -0.42 },
        'faction-006': { volume: 125, sentiment: -0.55 }
      },
      personIds: ['person-017', 'person-018'],
      organizationIds: ['org-020'],
      locationIds: ['loc-009'],
      eventIds: ['event-013'],
      volumeOverTime: [
        { date: '2026-01-15', factionVolumes: { 'faction-002': 48, 'faction-006': 42 } },
        { date: '2026-01-16', factionVolumes: { 'faction-002': 95, 'faction-006': 85 } },
        { date: '2026-01-17', factionVolumes: { 'faction-002': 125, 'faction-006': 108 } },
        { date: '2026-01-18', factionVolumes: { 'faction-002': 145, 'faction-006': 125 } }
      ]
    },
    {
      id: 'sub-017',
      text: 'Labor disputes arise between Taiwanese managers and US workers',
      description: 'Reports of cultural clashes between TSMC\'s Taiwanese management and American workers have surfaced, with unions criticizing work practices and company officials lamenting productivity differences.',
      parentNarrativeId: 'narr-007',
      sentiment: -0.52,
      factionMentions: {
        'faction-001': { volume: 95, sentiment: 0.42 },
        'faction-005': { volume: 115, sentiment: -0.62 }
      },
      personIds: ['person-019'],
      organizationIds: ['org-020', 'org-021'],
      locationIds: ['loc-009'],
      eventIds: ['event-014'],
      volumeOverTime: [
        { date: '2026-01-16', factionVolumes: { 'faction-001': 32, 'faction-005': 38 } },
        { date: '2026-01-17', factionVolumes: { 'faction-001': 65, 'faction-005': 78 } },
        { date: '2026-01-18', factionVolumes: { 'faction-001': 95, 'faction-005': 115 } }
      ]
    }
  ],

  factions: [
    {
      id: 'faction-001',
      name: 'Chinese Tech Industry Supporters',
      color: '#E15759',
      relatedFactionIds: ['faction-004', 'faction-005'],
      memberCount: 25000000,
      affiliatedPersonIds: ['person-001', 'person-008', 'person-011'],
      affiliatedOrganizationIds: ['org-001', 'org-010', 'org-007']
    },
    {
      id: 'faction-002',
      name: 'US Policy Hawks',
      color: '#4E79A7',
      relatedFactionIds: [],
      memberCount: 8000000,
      affiliatedPersonIds: ['person-005', 'person-006'],
      affiliatedOrganizationIds: ['org-005', 'org-006']
    },
    {
      id: 'faction-003',
      name: 'Global Semiconductor Analysts',
      color: '#76B7B2',
      relatedFactionIds: ['faction-006'],
      memberCount: 500000,
      affiliatedPersonIds: ['person-003', 'person-014'],
      affiliatedOrganizationIds: ['org-023', 'org-024']
    },
    {
      id: 'faction-004',
      name: 'Chinese State Media',
      color: '#F28E2B',
      relatedFactionIds: ['faction-001'],
      memberCount: 15000000,
      affiliatedPersonIds: [],
      affiliatedOrganizationIds: ['org-025', 'org-026']
    },
    {
      id: 'faction-005',
      name: 'US Tech Industry',
      color: '#B07AA1',
      relatedFactionIds: ['faction-006'],
      memberCount: 12000000,
      affiliatedPersonIds: ['person-017'],
      affiliatedOrganizationIds: ['org-018', 'org-019', 'org-020']
    },
    {
      id: 'faction-006',
      name: 'Supply Chain Watchers',
      color: '#59A14F',
      relatedFactionIds: ['faction-003', 'faction-005'],
      memberCount: 2000000,
      affiliatedPersonIds: ['person-014'],
      affiliatedOrganizationIds: ['org-024']
    }
  ],

  factionOverlaps: [
    {
      factionIds: ['faction-001', 'faction-004'],
      overlapSize: 8000000,
      sharedSentiment: { 'narr-001': 0.72, 'narr-002': -0.78 }
    },
    {
      factionIds: ['faction-003', 'faction-006'],
      overlapSize: 350000,
      sharedSentiment: { 'narr-005': 0.15 }
    },
    {
      factionIds: ['faction-005', 'faction-006'],
      overlapSize: 1500000,
      sharedSentiment: { 'narr-007': -0.52 }
    }
  ],

  locations: [
    {
      id: 'loc-001',
      name: 'Shenzhen, China',
      coordinates: { lat: 22.5431, lng: 114.0579 },
      type: 'city'
    },
    {
      id: 'loc-002',
      name: 'Shanghai, China',
      coordinates: { lat: 31.2304, lng: 121.4737 },
      type: 'city'
    },
    {
      id: 'loc-003',
      name: 'Veldhoven, Netherlands',
      coordinates: { lat: 51.4200, lng: 5.4050 },
      type: 'city'
    },
    {
      id: 'loc-004',
      name: 'Washington, D.C.',
      coordinates: { lat: 38.9072, lng: -77.0369 },
      type: 'city'
    },
    {
      id: 'loc-005',
      name: 'The Hague, Netherlands',
      coordinates: { lat: 52.0705, lng: 4.3007 },
      type: 'city'
    },
    {
      id: 'loc-006',
      name: 'Beijing, China',
      coordinates: { lat: 39.9042, lng: 116.4074 },
      type: 'city'
    },
    {
      id: 'loc-007',
      name: 'Wuhan, China',
      coordinates: { lat: 30.5928, lng: 114.3055 },
      type: 'city'
    },
    {
      id: 'loc-008',
      name: 'Nanjing, China',
      coordinates: { lat: 32.0603, lng: 118.7969 },
      type: 'city'
    },
    {
      id: 'loc-009',
      name: 'Phoenix, Arizona',
      coordinates: { lat: 33.4484, lng: -112.0740 },
      type: 'city'
    },
    {
      id: 'loc-010',
      name: 'Hsinchu, Taiwan',
      coordinates: { lat: 24.8138, lng: 120.9675 },
      type: 'city'
    }
  ],

  events: [
    {
      id: 'event-001',
      text: 'SMIC announces mass production of 5nm chips',
      date: '2026-01-15T08:00:00Z',
      parentEventId: null,
      subEventIds: ['event-002'],
      locationId: 'loc-001',
      personIds: ['person-001', 'person-002'],
      organizationIds: ['org-001']
    },
    {
      id: 'event-002',
      text: 'Huawei Mate 70 launch confirms SMIC 5nm chip',
      date: '2026-01-18T10:00:00Z',
      parentEventId: 'event-001',
      subEventIds: [],
      locationId: 'loc-001',
      personIds: ['person-011'],
      organizationIds: ['org-001', 'org-010']
    },
    {
      id: 'event-003',
      text: 'Netherlands announces expanded ASML export restrictions',
      date: '2026-01-12T14:00:00Z',
      parentEventId: null,
      subEventIds: ['event-004', 'event-005'],
      locationId: 'loc-005',
      personIds: ['person-007'],
      organizationIds: ['org-002', 'org-004']
    },
    {
      id: 'event-004',
      text: 'ASML Q4 earnings call addresses China revenue impact',
      date: '2026-01-15T16:00:00Z',
      parentEventId: 'event-003',
      subEventIds: [],
      locationId: 'loc-003',
      personIds: ['person-004'],
      organizationIds: ['org-002']
    },
    {
      id: 'event-005',
      text: 'China announces increased funding for SMEE lithography development',
      date: '2026-01-16T09:00:00Z',
      parentEventId: 'event-003',
      subEventIds: [],
      locationId: 'loc-002',
      personIds: ['person-008'],
      organizationIds: ['org-022']
    },
    {
      id: 'event-006',
      text: 'China unveils Big Fund III with 340 billion yuan',
      date: '2026-01-17T10:00:00Z',
      parentEventId: null,
      subEventIds: ['event-007'],
      locationId: 'loc-006',
      personIds: ['person-008', 'person-009'],
      organizationIds: ['org-007']
    },
    {
      id: 'event-007',
      text: 'State Council approves Big Fund III investment guidelines',
      date: '2026-01-18T15:00:00Z',
      parentEventId: 'event-006',
      subEventIds: [],
      locationId: 'loc-006',
      personIds: ['person-010'],
      organizationIds: ['org-009']
    },
    {
      id: 'event-008',
      text: 'Bloomberg reports Huawei equipment stockpile',
      date: '2026-01-15T12:00:00Z',
      parentEventId: null,
      subEventIds: ['event-009'],
      locationId: 'loc-001',
      personIds: ['person-011', 'person-012'],
      organizationIds: ['org-010']
    },
    {
      id: 'event-009',
      text: 'US Commerce Department opens investigation into Huawei equipment purchases',
      date: '2026-01-17T14:00:00Z',
      parentEventId: 'event-008',
      subEventIds: [],
      locationId: 'loc-004',
      personIds: ['person-005'],
      organizationIds: ['org-005', 'org-010']
    },
    {
      id: 'event-010',
      text: 'TechInsights publishes YMTC 232-layer NAND analysis',
      date: '2026-01-16T11:00:00Z',
      parentEventId: null,
      subEventIds: ['event-011'],
      locationId: 'loc-007',
      personIds: ['person-013'],
      organizationIds: ['org-013']
    },
    {
      id: 'event-011',
      text: 'Researchers find YMTC chips in consumer devices',
      date: '2026-01-18T09:00:00Z',
      parentEventId: 'event-010',
      subEventIds: [],
      locationId: 'loc-004',
      personIds: ['person-014'],
      organizationIds: ['org-013', 'org-015']
    },
    {
      id: 'event-012',
      text: 'Empyrean announces EDA tool supporting 14nm designs',
      date: '2026-01-19T10:00:00Z',
      parentEventId: null,
      subEventIds: [],
      locationId: 'loc-002',
      personIds: ['person-015'],
      organizationIds: ['org-016']
    },
    {
      id: 'event-013',
      text: 'TSMC announces Arizona fab production delay',
      date: '2026-01-14T08:00:00Z',
      parentEventId: null,
      subEventIds: ['event-014'],
      locationId: 'loc-009',
      personIds: ['person-017', 'person-018'],
      organizationIds: ['org-020']
    },
    {
      id: 'event-014',
      text: 'Arizona union files grievance against TSMC management practices',
      date: '2026-01-16T14:00:00Z',
      parentEventId: 'event-013',
      subEventIds: [],
      locationId: 'loc-009',
      personIds: ['person-019'],
      organizationIds: ['org-020', 'org-021']
    }
  ],

  persons: [
    {
      id: 'person-001',
      name: 'Zhao Haijun',
      type: 'executive',
      imageUrl: null,
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-001', 'loc-002'],
      relatedEventIds: ['event-001'],
      documentIds: ['doc-001', 'doc-002'],
      factionSentiment: {
        'faction-001': 0.82,
        'faction-002': -0.55,
        'faction-003': 0.25
      }
    },
    {
      id: 'person-002',
      name: 'Liang Mong Song',
      type: 'executive',
      imageUrl: null,
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-001'],
      relatedEventIds: ['event-001'],
      documentIds: ['doc-001', 'doc-003'],
      factionSentiment: {
        'faction-001': 0.78,
        'faction-002': -0.62,
        'faction-003': 0.35
      }
    },
    {
      id: 'person-003',
      name: 'Dylan Patel',
      type: 'analyst',
      imageUrl: null,
      affiliatedFactionIds: ['faction-003'],
      relatedLocationIds: ['loc-004'],
      relatedEventIds: [],
      documentIds: ['doc-003', 'doc-004'],
      factionSentiment: {
        'faction-001': 0.15,
        'faction-002': 0.12,
        'faction-003': 0.72
      }
    },
    {
      id: 'person-004',
      name: 'Peter Wennink',
      type: 'executive',
      imageUrl: null,
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-003'],
      relatedEventIds: ['event-003', 'event-004'],
      documentIds: ['doc-005', 'doc-006'],
      factionSentiment: {
        'faction-003': 0.55,
        'faction-006': 0.48
      }
    },
    {
      id: 'person-005',
      name: 'Gina Raimondo',
      type: 'government_official',
      imageUrl: 'img/entities/china/person-005.jpg',
      affiliatedFactionIds: ['faction-002'],
      relatedLocationIds: ['loc-004'],
      relatedEventIds: ['event-009'],
      documentIds: ['doc-007', 'doc-008'],
      factionSentiment: {
        'faction-001': -0.75,
        'faction-002': 0.72,
        'faction-005': 0.35
      }
    },
    {
      id: 'person-006',
      name: 'Jake Sullivan',
      type: 'government_official',
      imageUrl: 'img/entities/china/person-006.png',
      affiliatedFactionIds: ['faction-002'],
      relatedLocationIds: ['loc-004'],
      relatedEventIds: [],
      documentIds: ['doc-007'],
      factionSentiment: {
        'faction-001': -0.78,
        'faction-002': 0.68
      }
    },
    {
      id: 'person-007',
      name: 'Liesje Schreinemacher',
      type: 'government_official',
      imageUrl: 'img/entities/china/person-007.jpg',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-005'],
      relatedEventIds: ['event-003'],
      documentIds: ['doc-005'],
      factionSentiment: {
        'faction-001': -0.42,
        'faction-002': 0.55
      }
    },
    {
      id: 'person-008',
      name: 'Liu He',
      type: 'government_official',
      imageUrl: 'img/entities/china/person-008.jpg',
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-006'],
      relatedEventIds: ['event-005', 'event-006'],
      documentIds: ['doc-009', 'doc-010'],
      factionSentiment: {
        'faction-001': 0.85,
        'faction-002': -0.65
      }
    },
    {
      id: 'person-009',
      name: 'Ding Wenwu',
      type: 'executive',
      imageUrl: null,
      affiliatedFactionIds: ['faction-001', 'faction-005'],
      relatedLocationIds: ['loc-006'],
      relatedEventIds: ['event-006'],
      documentIds: ['doc-009'],
      factionSentiment: {
        'faction-001': 0.78,
        'faction-005': 0.65
      }
    },
    {
      id: 'person-010',
      name: 'He Lifeng',
      type: 'government_official',
      imageUrl: 'img/entities/china/person-010.jpg',
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-006'],
      relatedEventIds: ['event-007'],
      documentIds: ['doc-010'],
      factionSentiment: {
        'faction-001': 0.82
      }
    },
    {
      id: 'person-011',
      name: 'Ren Zhengfei',
      type: 'executive',
      imageUrl: 'img/entities/china/person-011.jpg',
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-001'],
      relatedEventIds: ['event-002', 'event-008'],
      documentIds: ['doc-012', 'doc-013'],
      factionSentiment: {
        'faction-001': 0.88,
        'faction-002': -0.78,
        'faction-004': 0.72
      }
    },
    {
      id: 'person-012',
      name: 'Meng Wanzhou',
      type: 'executive',
      imageUrl: 'img/entities/china/person-012.jpg',
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-001'],
      relatedEventIds: ['event-008'],
      documentIds: ['doc-012'],
      factionSentiment: {
        'faction-001': 0.82,
        'faction-002': -0.72
      }
    },
    {
      id: 'person-013',
      name: 'Chen Nanxiang',
      type: 'executive',
      imageUrl: null,
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-007'],
      relatedEventIds: ['event-010'],
      documentIds: ['doc-015', 'doc-016'],
      factionSentiment: {
        'faction-001': 0.75,
        'faction-003': 0.42
      }
    },
    {
      id: 'person-014',
      name: 'Dan Hutcheson',
      type: 'analyst',
      imageUrl: null,
      affiliatedFactionIds: ['faction-003', 'faction-006'],
      relatedLocationIds: ['loc-004'],
      relatedEventIds: ['event-011'],
      documentIds: ['doc-016', 'doc-017'],
      factionSentiment: {
        'faction-003': 0.68,
        'faction-006': 0.62
      }
    },
    {
      id: 'person-015',
      name: 'Dai Weimin',
      type: 'executive',
      imageUrl: null,
      affiliatedFactionIds: ['faction-001', 'faction-005'],
      relatedLocationIds: ['loc-002'],
      relatedEventIds: ['event-012'],
      documentIds: ['doc-018'],
      factionSentiment: {
        'faction-001': 0.82,
        'faction-005': 0.72
      }
    },
    {
      id: 'person-016',
      name: 'Liu Zhiyong',
      type: 'executive',
      imageUrl: null,
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-008'],
      relatedEventIds: [],
      documentIds: ['doc-019'],
      factionSentiment: {
        'faction-001': 0.78
      }
    },
    {
      id: 'person-017',
      name: 'C.C. Wei',
      type: 'executive',
      imageUrl: null,
      affiliatedFactionIds: ['faction-005'],
      relatedLocationIds: ['loc-010', 'loc-009'],
      relatedEventIds: ['event-013'],
      documentIds: ['doc-020', 'doc-021'],
      factionSentiment: {
        'faction-005': 0.72,
        'faction-006': 0.55
      }
    },
    {
      id: 'person-018',
      name: 'Mark Liu',
      type: 'executive',
      imageUrl: 'img/entities/china/person-018.jpg',
      affiliatedFactionIds: ['faction-005'],
      relatedLocationIds: ['loc-010'],
      relatedEventIds: ['event-013'],
      documentIds: ['doc-020'],
      factionSentiment: {
        'faction-005': 0.68
      }
    },
    {
      id: 'person-019',
      name: 'Rick Bloomingdale',
      type: 'labor_leader',
      imageUrl: null,
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-009'],
      relatedEventIds: ['event-014'],
      documentIds: ['doc-022'],
      factionSentiment: {
        'faction-005': -0.42
      }
    }
  ],

  organizations: [
    {
      id: 'org-001',
      name: 'SMIC',
      type: 'company',
      imageUrl: 'img/entities/china/org-001.png',
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-001', 'loc-002'],
      documentIds: ['doc-001', 'doc-002', 'doc-003'],
      factionSentiment: {
        'faction-001': 0.85,
        'faction-002': -0.68,
        'faction-003': 0.32
      }
    },
    {
      id: 'org-002',
      name: 'ASML',
      type: 'company',
      imageUrl: 'img/entities/china/org-002.png',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-003'],
      documentIds: ['doc-005', 'doc-006'],
      factionSentiment: {
        'faction-001': -0.55,
        'faction-003': 0.58,
        'faction-006': 0.52
      }
    },
    {
      id: 'org-003',
      name: 'Applied Materials',
      type: 'company',
      imageUrl: 'img/entities/china/org-003.png',
      affiliatedFactionIds: ['faction-005'],
      relatedLocationIds: ['loc-004'],
      documentIds: ['doc-013'],
      factionSentiment: {
        'faction-002': 0.45,
        'faction-005': 0.62
      }
    },
    {
      id: 'org-004',
      name: 'Dutch Government',
      type: 'government',
      imageUrl: 'img/entities/china/org-004.png',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-005'],
      documentIds: ['doc-005'],
      factionSentiment: {
        'faction-001': -0.52,
        'faction-002': 0.65
      }
    },
    {
      id: 'org-005',
      name: 'US Commerce Department',
      type: 'government',
      imageUrl: 'img/entities/china/org-005.jpg',
      affiliatedFactionIds: ['faction-002'],
      relatedLocationIds: ['loc-004'],
      documentIds: ['doc-007', 'doc-008', 'doc-014'],
      factionSentiment: {
        'faction-001': -0.78,
        'faction-002': 0.75
      }
    },
    {
      id: 'org-006',
      name: 'Bureau of Industry and Security',
      type: 'government',
      imageUrl: 'img/entities/china/org-006.png',
      affiliatedFactionIds: ['faction-002'],
      relatedLocationIds: ['loc-004'],
      documentIds: ['doc-008'],
      factionSentiment: {
        'faction-001': -0.82,
        'faction-002': 0.72
      }
    },
    {
      id: 'org-007',
      name: 'China National IC Fund',
      type: 'investment',
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-006'],
      documentIds: ['doc-009', 'doc-010', 'doc-011'],
      factionSentiment: {
        'faction-001': 0.88,
        'faction-002': -0.58
      }
    },
    {
      id: 'org-008',
      name: 'China Development Bank',
      type: 'financial',
      imageUrl: 'img/entities/china/org-008.svg',
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-006'],
      documentIds: ['doc-010'],
      factionSentiment: {
        'faction-001': 0.72
      }
    },
    {
      id: 'org-009',
      name: 'State Council of China',
      type: 'government',
      imageUrl: 'img/entities/china/org-009.jpg',
      affiliatedFactionIds: ['faction-001', 'faction-004'],
      relatedLocationIds: ['loc-006'],
      documentIds: ['doc-010'],
      factionSentiment: {
        'faction-001': 0.85,
        'faction-004': 0.82
      }
    },
    {
      id: 'org-010',
      name: 'Huawei',
      type: 'company',
      imageUrl: 'img/entities/china/org-010.png',
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-001'],
      documentIds: ['doc-012', 'doc-013', 'doc-014'],
      factionSentiment: {
        'faction-001': 0.88,
        'faction-002': -0.82,
        'faction-004': 0.78
      }
    },
    {
      id: 'org-011',
      name: 'Lam Research',
      type: 'company',
      imageUrl: 'img/entities/china/org-011.svg',
      affiliatedFactionIds: ['faction-005'],
      relatedLocationIds: ['loc-004'],
      documentIds: ['doc-013'],
      factionSentiment: {
        'faction-002': 0.48,
        'faction-005': 0.58
      }
    },
    {
      id: 'org-012',
      name: 'KLA Corporation',
      type: 'company',
      imageUrl: 'img/entities/china/org-012.png',
      affiliatedFactionIds: ['faction-005'],
      relatedLocationIds: ['loc-004'],
      documentIds: ['doc-014'],
      factionSentiment: {
        'faction-002': 0.45,
        'faction-005': 0.55
      }
    },
    {
      id: 'org-013',
      name: 'YMTC',
      type: 'company',
      imageUrl: 'img/entities/china/org-013.jpg',
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-007'],
      documentIds: ['doc-015', 'doc-016', 'doc-017'],
      factionSentiment: {
        'faction-001': 0.78,
        'faction-002': -0.72,
        'faction-003': 0.35
      }
    },
    {
      id: 'org-014',
      name: 'Samsung Electronics',
      type: 'company',
      imageUrl: 'img/entities/china/org-014.png',
      affiliatedFactionIds: [],
      relatedLocationIds: [],
      documentIds: ['doc-016'],
      factionSentiment: {
        'faction-003': 0.52,
        'faction-006': 0.48
      }
    },
    {
      id: 'org-015',
      name: 'TechInsights',
      type: 'research',
      affiliatedFactionIds: ['faction-003'],
      relatedLocationIds: ['loc-004'],
      documentIds: ['doc-016', 'doc-017'],
      factionSentiment: {
        'faction-003': 0.72,
        'faction-006': 0.68
      }
    },
    {
      id: 'org-016',
      name: 'Empyrean Technology',
      type: 'company',
      imageUrl: 'img/entities/china/org-016.png',
      affiliatedFactionIds: ['faction-001', 'faction-005'],
      relatedLocationIds: ['loc-002'],
      documentIds: ['doc-018'],
      factionSentiment: {
        'faction-001': 0.82,
        'faction-005': 0.72
      }
    },
    {
      id: 'org-017',
      name: 'Huada Jiutian',
      type: 'company',
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-008'],
      documentIds: ['doc-019'],
      factionSentiment: {
        'faction-001': 0.78
      }
    },
    {
      id: 'org-018',
      name: 'Cadence Design Systems',
      type: 'company',
      imageUrl: 'img/entities/china/org-018.svg',
      affiliatedFactionIds: ['faction-005'],
      relatedLocationIds: ['loc-004'],
      documentIds: ['doc-018'],
      factionSentiment: {
        'faction-002': 0.52,
        'faction-005': 0.75
      }
    },
    {
      id: 'org-019',
      name: 'Synopsys',
      type: 'company',
      imageUrl: 'img/entities/china/org-019.png',
      affiliatedFactionIds: ['faction-005'],
      relatedLocationIds: ['loc-004'],
      documentIds: ['doc-018'],
      factionSentiment: {
        'faction-002': 0.48,
        'faction-005': 0.72
      }
    },
    {
      id: 'org-020',
      name: 'TSMC',
      type: 'company',
      imageUrl: 'img/entities/china/org-020.png',
      affiliatedFactionIds: ['faction-005', 'faction-006'],
      relatedLocationIds: ['loc-010', 'loc-009'],
      documentIds: ['doc-020', 'doc-021', 'doc-022'],
      factionSentiment: {
        'faction-005': 0.68,
        'faction-006': 0.62
      }
    },
    {
      id: 'org-021',
      name: 'Arizona Building and Construction Trades Council',
      type: 'labor',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-009'],
      documentIds: ['doc-022'],
      factionSentiment: {
        'faction-005': -0.38
      }
    },
    {
      id: 'org-022',
      name: 'SMEE',
      type: 'company',
      imageUrl: 'img/entities/china/org-022.png',
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-002'],
      documentIds: [],
      factionSentiment: {
        'faction-001': 0.75
      }
    },
    {
      id: 'org-023',
      name: 'SemiAnalysis',
      type: 'research',
      affiliatedFactionIds: ['faction-003'],
      relatedLocationIds: ['loc-004'],
      documentIds: ['doc-003', 'doc-004'],
      factionSentiment: {
        'faction-003': 0.75
      }
    },
    {
      id: 'org-024',
      name: 'VLSI Research',
      type: 'research',
      affiliatedFactionIds: ['faction-003', 'faction-006'],
      relatedLocationIds: ['loc-004'],
      documentIds: ['doc-017'],
      factionSentiment: {
        'faction-003': 0.72,
        'faction-006': 0.68
      }
    },
    {
      id: 'org-025',
      name: 'Xinhua News Agency',
      type: 'media',
      imageUrl: 'img/entities/china/org-025.png',
      affiliatedFactionIds: ['faction-004'],
      relatedLocationIds: ['loc-006'],
      documentIds: [],
      factionSentiment: {
        'faction-001': 0.85,
        'faction-004': 0.92
      }
    },
    {
      id: 'org-026',
      name: 'CGTN',
      type: 'media',
      imageUrl: 'img/entities/china/org-026.png',
      affiliatedFactionIds: ['faction-004'],
      relatedLocationIds: ['loc-006'],
      documentIds: [],
      factionSentiment: {
        'faction-001': 0.82,
        'faction-004': 0.88
      }
    }
  ],

  documents: [
    // News Article - SMIC breakthrough
    {
      id: 'doc-001',
      documentType: 'news_article',
      title: 'SMIC confirms 5nm chip mass production using DUV multi-patterning',
      url: 'https://semiengi.com/smic-5nm-duv-breakthrough-2026',
      publishedDate: '2026-01-15T08:30:00Z',
      sourceId: 'src-semiengi',
      author: 'Mark Liu',
      excerpt: 'SMIC has confirmed it is mass producing 5nm chips using advanced multi-patterning techniques with DUV lithography, marking a significant milestone for Chinese semiconductor manufacturing.',
      heroImage: {
        url: 'img/placeholders/image-placeholder.svg',
        caption: 'SMIC semiconductor fabrication facility'
      },
      contentBlocks: [
        { type: 'paragraph', content: 'Semiconductor Manufacturing International Corporation (SMIC) has confirmed it has achieved mass production of 5nm chips using deep ultraviolet (DUV) lithography, a significant breakthrough that demonstrates China\'s ability to advance despite export restrictions on EUV equipment.' },
        { type: 'paragraph', content: 'Industry sources indicate SMIC is using an innovative multi-patterning approach that compensates for the lack of extreme ultraviolet lithography systems, though at higher cost and lower yield than competitors using ASML\'s EUV machines.' }
      ],
      narrativeIds: ['narr-001'],
      subNarrativeIds: ['sub-001'],
      personIds: ['person-001', 'person-002'],
      organizationIds: ['org-001'],
      locationIds: ['loc-001'],
      eventIds: ['event-001']
    },
    // News Article - SCMP report
    {
      id: 'doc-002',
      documentType: 'news_article',
      title: 'China\'s SMIC achieves advanced chip production without EUV machines',
      url: 'https://scmp.com/tech/smic-5nm-no-euv-2026',
      publishedDate: '2026-01-16T06:00:00Z',
      sourceId: 'src-scmp',
      author: 'Che Pan',
      excerpt: 'In a major breakthrough, SMIC has demonstrated the ability to produce 5nm chips without access to ASML\'s extreme ultraviolet lithography systems, though at lower yields.',
      narrativeIds: ['narr-001'],
      subNarrativeIds: ['sub-001'],
      personIds: ['person-001'],
      organizationIds: ['org-001'],
      locationIds: ['loc-001'],
      eventIds: ['event-001']
    },
    // News Article - SemiAnalysis
    {
      id: 'doc-003',
      documentType: 'news_article',
      title: 'Analysis: SMIC\'s 5nm achievement and what it means for export controls',
      url: 'https://semianalysis.com/smic-5nm-analysis',
      publishedDate: '2026-01-17T10:00:00Z',
      sourceId: 'src-semiengi',
      author: 'Dylan Patel',
      excerpt: 'SemiAnalysis deep-dive into SMIC\'s technical approach reveals innovative multi-patterning but significant cost and yield penalties compared to EUV-based production.',
      narrativeIds: ['narr-001'],
      subNarrativeIds: ['sub-001', 'sub-003'],
      personIds: ['person-003'],
      organizationIds: ['org-001', 'org-023'],
      locationIds: [],
      eventIds: []
    },
    // News Article - Bloomberg
    {
      id: 'doc-004',
      documentType: 'news_article',
      title: 'SMIC breakthrough raises questions about US chip strategy',
      url: 'https://bloomberg.com/smic-breakthrough-us-strategy',
      publishedDate: '2026-01-18T14:00:00Z',
      sourceId: 'src-bloomberg',
      author: 'Ian King',
      excerpt: 'SMIC\'s unexpected advancement has sparked debate in Washington about the efficacy of semiconductor export controls and whether they are achieving their intended goals.',
      narrativeIds: ['narr-001'],
      subNarrativeIds: ['sub-003'],
      personIds: ['person-003', 'person-005'],
      organizationIds: ['org-001', 'org-005'],
      locationIds: ['loc-004'],
      eventIds: []
    },
    // News Article - Reuters ASML
    {
      id: 'doc-005',
      documentType: 'news_article',
      title: 'Netherlands expands ASML export restrictions to advanced DUV systems',
      url: 'https://reuters.com/netherlands-asml-duv-restrictions',
      publishedDate: '2026-01-12T15:00:00Z',
      sourceId: 'src-reuters',
      author: 'Toby Sterling',
      excerpt: 'The Dutch government has announced expanded export controls blocking ASML from shipping advanced deep ultraviolet lithography systems to China.',
      narrativeIds: ['narr-002'],
      subNarrativeIds: ['sub-004'],
      personIds: ['person-007', 'person-004'],
      organizationIds: ['org-002', 'org-004'],
      locationIds: ['loc-005'],
      eventIds: ['event-003']
    },
    // News Article - FT ASML
    {
      id: 'doc-006',
      documentType: 'news_article',
      title: 'ASML warns China restrictions will cut $2.5B from annual revenue',
      url: 'https://ft.com/asml-china-revenue-warning',
      publishedDate: '2026-01-15T17:00:00Z',
      sourceId: 'src-ft',
      author: 'Peggy Hollinger',
      excerpt: 'ASML CEO Peter Wennink told investors that expanded China export restrictions will reduce the company\'s annual revenue by approximately $2.5 billion.',
      narrativeIds: ['narr-002'],
      subNarrativeIds: ['sub-005'],
      personIds: ['person-004'],
      organizationIds: ['org-002'],
      locationIds: ['loc-003'],
      eventIds: ['event-004']
    },
    // News Article - WSJ Raimondo
    {
      id: 'doc-007',
      documentType: 'news_article',
      title: 'Raimondo defends expanded chip controls as necessary for national security',
      url: 'https://wsj.com/raimondo-chip-controls-defense',
      publishedDate: '2026-01-14T12:00:00Z',
      sourceId: 'src-wsj',
      author: 'Yuka Hayashi',
      excerpt: 'Commerce Secretary Gina Raimondo defended the administration\'s expanded semiconductor export controls, calling them essential to maintaining US technological leadership.',
      narrativeIds: ['narr-002'],
      subNarrativeIds: ['sub-004'],
      personIds: ['person-005', 'person-006'],
      organizationIds: ['org-005'],
      locationIds: ['loc-004'],
      eventIds: []
    },
    // News Article - BIS Entity List
    {
      id: 'doc-008',
      documentType: 'news_article',
      title: 'BIS updates Entity List with new Chinese semiconductor firms',
      url: 'https://commerce.gov/bis-entity-list-update-jan-2026',
      publishedDate: '2026-01-13T10:00:00Z',
      sourceId: 'src-reuters',
      author: 'Reuters Staff',
      excerpt: 'The Bureau of Industry and Security has added 15 new Chinese companies to the Entity List, expanding restrictions on semiconductor technology transfers.',
      narrativeIds: ['narr-002'],
      subNarrativeIds: [],
      personIds: ['person-005'],
      organizationIds: ['org-005', 'org-006'],
      locationIds: ['loc-004'],
      eventIds: []
    },
    // News Article - Big Fund III
    {
      id: 'doc-009',
      documentType: 'news_article',
      title: 'China launches $47 billion semiconductor fund in biggest push yet',
      url: 'https://bloomberg.com/china-big-fund-iii-47-billion',
      publishedDate: '2026-01-17T11:00:00Z',
      sourceId: 'src-bloomberg',
      author: 'Debby Wu',
      excerpt: 'China has unveiled the third phase of its National IC Fund with 340 billion yuan ($47 billion), the largest semiconductor investment tranche in its history.',
      narrativeIds: ['narr-003'],
      subNarrativeIds: ['sub-007', 'sub-008'],
      personIds: ['person-008', 'person-009'],
      organizationIds: ['org-007'],
      locationIds: ['loc-006'],
      eventIds: ['event-006']
    },
    // News Article - Caixin State Council
    {
      id: 'doc-010',
      documentType: 'news_article',
      title: 'State Council approves Big Fund III priorities: packaging, equipment, EDA',
      url: 'https://caixin.com/big-fund-iii-state-council-approval',
      publishedDate: '2026-01-18T16:00:00Z',
      sourceId: 'src-caixin',
      author: 'Caixin Tech',
      excerpt: 'China\'s State Council has approved investment guidelines for the Big Fund III, prioritizing advanced packaging, semiconductor equipment, and EDA software development.',
      narrativeIds: ['narr-003'],
      subNarrativeIds: ['sub-007', 'sub-008'],
      personIds: ['person-010', 'person-008'],
      organizationIds: ['org-007', 'org-008', 'org-009'],
      locationIds: ['loc-006'],
      eventIds: ['event-007']
    },
    // News Article - FT Big Fund analysis
    {
      id: 'doc-011',
      documentType: 'news_article',
      title: 'Analysis: Can China\'s Big Fund III overcome export control barriers?',
      url: 'https://ft.com/china-big-fund-analysis',
      publishedDate: '2026-01-19T09:00:00Z',
      sourceId: 'src-ft',
      author: 'Kathrin Hille',
      excerpt: 'Analysts debate whether China\'s massive new semiconductor investment fund can achieve technological breakthroughs without access to cutting-edge foreign equipment.',
      narrativeIds: ['narr-003'],
      subNarrativeIds: ['sub-009'],
      personIds: [],
      organizationIds: ['org-007'],
      locationIds: [],
      eventIds: []
    },
    // News Article - Huawei stockpile
    {
      id: 'doc-012',
      documentType: 'news_article',
      title: 'Huawei stockpiles billions in chip equipment ahead of sanctions',
      url: 'https://bloomberg.com/huawei-equipment-stockpile-sanctions',
      publishedDate: '2026-01-15T12:30:00Z',
      sourceId: 'src-bloomberg',
      author: 'Debby Wu',
      excerpt: 'Huawei has accumulated billions of dollars worth of semiconductor manufacturing equipment in warehouses across China, anticipating expanded US export restrictions.',
      narrativeIds: ['narr-004'],
      subNarrativeIds: ['sub-010'],
      personIds: ['person-011', 'person-012'],
      organizationIds: ['org-010'],
      locationIds: ['loc-001'],
      eventIds: ['event-008']
    },
    // News Article - WSJ Huawei investigation
    {
      id: 'doc-013',
      documentType: 'news_article',
      title: 'US probes whether Huawei used intermediaries to evade chip controls',
      url: 'https://wsj.com/huawei-intermediaries-investigation',
      publishedDate: '2026-01-17T14:30:00Z',
      sourceId: 'src-wsj',
      author: 'Kate O\'Keeffe',
      excerpt: 'US Commerce Department has opened an investigation into whether Huawei circumvented export controls by acquiring equipment through third-party intermediaries.',
      narrativeIds: ['narr-004'],
      subNarrativeIds: ['sub-010', 'sub-011'],
      personIds: ['person-005', 'person-011'],
      organizationIds: ['org-005', 'org-010', 'org-003', 'org-011'],
      locationIds: ['loc-004', 'loc-001'],
      eventIds: ['event-009']
    },
    // News Article - SCMP Huawei response
    {
      id: 'doc-014',
      documentType: 'news_article',
      title: 'Huawei denies sanctions violations, calls reports "speculation"',
      url: 'https://scmp.com/huawei-denies-sanctions-violations',
      publishedDate: '2026-01-18T08:00:00Z',
      sourceId: 'src-scmp',
      author: 'Iris Deng',
      excerpt: 'Huawei has issued a statement denying any violations of US export controls, dismissing reports of stockpiling as "speculation and conjecture."',
      narrativeIds: ['narr-004'],
      subNarrativeIds: ['sub-011'],
      personIds: ['person-011'],
      organizationIds: ['org-010', 'org-005', 'org-012'],
      locationIds: ['loc-001'],
      eventIds: []
    },
    // News Article - YMTC benchmark
    {
      id: 'doc-015',
      documentType: 'news_article',
      title: 'YMTC 232-layer NAND matches Samsung in performance tests',
      url: 'https://anandtech.com/ymtc-232-layer-nand-benchmark',
      publishedDate: '2026-01-16T11:30:00Z',
      sourceId: 'src-anandtech',
      author: 'Ryan Smith',
      excerpt: 'Independent testing reveals YMTC\'s 232-layer 3D NAND flash memory delivers performance comparable to Samsung\'s latest offerings in key metrics.',
      narrativeIds: ['narr-005'],
      subNarrativeIds: ['sub-012'],
      personIds: ['person-013'],
      organizationIds: ['org-013'],
      locationIds: ['loc-007'],
      eventIds: ['event-010']
    },
    // News Article - TechInsights YMTC
    {
      id: 'doc-016',
      documentType: 'news_article',
      title: 'TechInsights finds YMTC chips in consumer devices despite blacklist',
      url: 'https://techinsights.com/ymtc-chips-consumer-devices',
      publishedDate: '2026-01-18T09:30:00Z',
      sourceId: 'src-semiengi',
      author: 'Dan Hutcheson',
      excerpt: 'Research firm TechInsights has identified YMTC memory chips in consumer electronics from multiple brands, raising questions about Entity List enforcement.',
      narrativeIds: ['narr-005'],
      subNarrativeIds: ['sub-012', 'sub-013'],
      personIds: ['person-013', 'person-014'],
      organizationIds: ['org-013', 'org-014', 'org-015'],
      locationIds: ['loc-007', 'loc-004'],
      eventIds: ['event-010', 'event-011']
    },
    // News Article - YMTC supply chain
    {
      id: 'doc-017',
      documentType: 'news_article',
      title: 'How YMTC chips are reaching global markets despite US sanctions',
      url: 'https://bloomberg.com/ymtc-global-supply-chain-analysis',
      publishedDate: '2026-01-19T13:00:00Z',
      sourceId: 'src-bloomberg',
      author: 'Vlad Savov',
      excerpt: 'Analysis reveals YMTC memory chips are entering global supply chains through complex networks that make end-to-end tracking difficult for regulators.',
      narrativeIds: ['narr-005'],
      subNarrativeIds: ['sub-013'],
      personIds: ['person-014'],
      organizationIds: ['org-013', 'org-015', 'org-024'],
      locationIds: ['loc-004'],
      eventIds: ['event-011']
    },
    // News Article - Xinhua Empyrean
    {
      id: 'doc-018',
      documentType: 'news_article',
      title: 'Empyrean announces EDA tools supporting 14nm chip design',
      url: 'https://xinhua.com/empyrean-eda-14nm-announcement',
      publishedDate: '2026-01-19T10:30:00Z',
      sourceId: 'src-xinhua',
      author: 'Xinhua Staff',
      excerpt: 'Empyrean Technology has announced its EDA software suite now fully supports 14nm chip design, marking significant progress in Chinese design tool development.',
      narrativeIds: ['narr-006'],
      subNarrativeIds: ['sub-014'],
      personIds: ['person-015'],
      organizationIds: ['org-016', 'org-018', 'org-019'],
      locationIds: ['loc-002'],
      eventIds: ['event-012']
    },
    // News Article - Huada Jiutian
    {
      id: 'doc-019',
      documentType: 'news_article',
      title: 'Huada Jiutian targets 7nm EDA capability within two years',
      url: 'https://caixin.com/huada-jiutian-7nm-roadmap',
      publishedDate: '2026-01-20T08:00:00Z',
      sourceId: 'src-caixin',
      author: 'Caixin Tech',
      excerpt: 'Huada Jiutian has outlined an aggressive roadmap to develop EDA tools capable of supporting 7nm chip design within the next two years.',
      narrativeIds: ['narr-006'],
      subNarrativeIds: ['sub-014', 'sub-015'],
      personIds: ['person-016'],
      organizationIds: ['org-017'],
      locationIds: ['loc-008'],
      eventIds: []
    },
    // News Article - TSMC delays
    {
      id: 'doc-020',
      documentType: 'news_article',
      title: 'TSMC Arizona fab delays push production start to late 2025',
      url: 'https://reuters.com/tsmc-arizona-delay-2025',
      publishedDate: '2026-01-14T08:30:00Z',
      sourceId: 'src-reuters',
      author: 'Yimou Lee',
      excerpt: 'TSMC has confirmed its Arizona fabrication facility will not begin production until late 2025, a significant delay from the original 2024 target.',
      narrativeIds: ['narr-007'],
      subNarrativeIds: ['sub-016'],
      personIds: ['person-017', 'person-018'],
      organizationIds: ['org-020'],
      locationIds: ['loc-009'],
      eventIds: ['event-013']
    },
    // News Article - Nikkei TSMC culture
    {
      id: 'doc-021',
      documentType: 'news_article',
      title: 'TSMC CEO addresses Arizona challenges: "Different work culture"',
      url: 'https://nikkei.com/tsmc-arizona-work-culture',
      publishedDate: '2026-01-16T07:00:00Z',
      sourceId: 'src-nikkei',
      author: 'Cheng Ting-Fang',
      excerpt: 'TSMC CEO C.C. Wei acknowledged challenges at the Arizona fab, citing differences in work culture and the need to adapt management approaches.',
      narrativeIds: ['narr-007'],
      subNarrativeIds: ['sub-016', 'sub-017'],
      personIds: ['person-017'],
      organizationIds: ['org-020'],
      locationIds: ['loc-009', 'loc-010'],
      eventIds: ['event-013']
    },
    // News Article - Arizona unions
    {
      id: 'doc-022',
      documentType: 'news_article',
      title: 'Arizona unions file grievances against TSMC management practices',
      url: 'https://bloomberg.com/tsmc-arizona-union-grievances',
      publishedDate: '2026-01-17T11:00:00Z',
      sourceId: 'src-bloomberg',
      author: 'Ian King',
      excerpt: 'The Arizona Building and Construction Trades Council has filed formal grievances against TSMC, citing concerns about management practices and worker treatment.',
      narrativeIds: ['narr-007'],
      subNarrativeIds: ['sub-017'],
      personIds: ['person-019'],
      organizationIds: ['org-020', 'org-021'],
      locationIds: ['loc-009'],
      eventIds: ['event-014']
    },
    // X/Twitter - Tech analyst thread on SMIC
    {
      id: 'doc-023',
      documentType: 'social_post',
      url: 'https://x.com/chipcuriosity/status/1881234567890123',
      publishedDate: '2026-01-16T14:22:00Z',
      sourceId: 'src-x',
      author: {
        username: '@chipcuriosity',
        displayName: 'Chip Curiosity',
        avatarUrl: 'img/placeholders/avatar-default.svg'
      },
      content: 'Thread: Let\'s talk about SMIC\'s 5nm "breakthrough" 🧵\n\n1/ Yes, they achieved 5nm using DUV multi-patterning. But context matters.\n\n2/ Cost per wafer is ~3x higher than TSMC\'s EUV process\n\n3/ Yields appear to be 20-30%, vs 80%+ for TSMC\n\n4/ This is impressive engineering, but it\'s not economically competitive for high-volume production\n\n5/ Export controls haven\'t stopped progress - they\'ve just made it expensive. Is that the goal?',
      engagement: {
        replies: 847,
        likes: 5234,
        reblogs: 1892
      },
      narrativeIds: ['narr-001'],
      subNarrativeIds: ['sub-001', 'sub-003'],
      personIds: [],
      organizationIds: ['org-001'],
      locationIds: [],
      eventIds: []
    },
    // LinkedIn - Industry executive post
    {
      id: 'doc-024',
      documentType: 'social_post',
      url: 'https://linkedin.com/posts/semiconductorexec_smic-china-semiconductor-activity',
      publishedDate: '2026-01-17T09:15:00Z',
      sourceId: 'src-linkedin',
      author: {
        username: 'michael-chen-semiconductor',
        displayName: 'Michael Chen',
        avatarUrl: 'img/placeholders/avatar-default.svg'
      },
      content: '📊 Reflections on SMIC\'s 5nm Achievement\n\nAs someone who has spent 25 years in semiconductor manufacturing, I want to share some thoughts on what SMIC\'s announcement really means for our industry.\n\nThe technical achievement is real. Multi-patterning at this scale requires extraordinary process control and engineering discipline. Their teams deserve recognition.\n\nHowever, we should be clear-eyed about the economics:\n• Cost disadvantage: 2-3x vs EUV-based production\n• Yield challenges: Significantly lower than industry leaders\n• Scalability questions: Multi-patterning complexity increases exponentially at smaller nodes\n\nThe bigger question for policymakers: Are export controls achieving their stated goals, or are they accelerating China\'s push for complete self-sufficiency?\n\nI\'d love to hear perspectives from others in the industry. What are you seeing in your supply chains?\n\n#Semiconductors #Manufacturing #China #Technology #ExportControls',
      engagement: {
        replies: 234,
        likes: 1847,
        reblogs: 312
      },
      narrativeIds: ['narr-001'],
      subNarrativeIds: ['sub-003'],
      personIds: [],
      organizationIds: ['org-001'],
      locationIds: [],
      eventIds: []
    },
    // Weibo - Chinese tech celebration post
    {
      id: 'doc-025',
      documentType: 'social_post',
      url: 'https://weibo.com/u/7234567890/post/12345678',
      publishedDate: '2026-01-15T19:45:00Z',
      sourceId: 'src-weibo',
      author: {
        username: '科技前沿观察',
        displayName: 'Tech Frontier Observer',
        avatarUrl: 'img/placeholders/avatar-default.svg'
      },
      content: '🎉 重磅消息！中芯国际5纳米芯片量产成功！\n\n没有EUV光刻机，我们照样能行！这是中国半导体工程师的智慧和毅力的结晶。\n\n西方封锁只会让我们更强大。自主创新才是出路！\n\n华为Mate 70搭载的芯片就是中芯国际生产的。这才是真正的中国力量！💪🇨🇳\n\n#中芯国际 #半导体 #自主创新 #华为 #中国制造',
      engagement: {
        replies: 28947,
        likes: 184521,
        reblogs: 42156
      },
      narrativeIds: ['narr-001'],
      subNarrativeIds: ['sub-002'],
      personIds: [],
      organizationIds: ['org-001', 'org-010'],
      locationIds: ['loc-001'],
      eventIds: ['event-002']
    },
    // Reddit - Export controls discussion
    {
      id: 'doc-026',
      documentType: 'social_post',
      url: 'https://reddit.com/r/hardware/comments/xyz789/export_controls_backfiring',
      publishedDate: '2026-01-18T22:30:00Z',
      sourceId: 'src-reddit',
      author: {
        username: 'u/silicon_skeptic',
        displayName: 'silicon_skeptic',
        avatarUrl: 'img/placeholders/avatar-default.svg'
      },
      content: '**Are US chip export controls backfiring?**\n\nBetween SMIC\'s 5nm, YMTC\'s 232-layer NAND, and China\'s $47B new investment fund, I\'m starting to wonder if the export controls are doing what they\'re supposed to.\n\nBefore the restrictions:\n- China was heavily dependent on US/Western tech\n- Companies like Huawei bought most components from US suppliers\n- Little incentive for massive domestic investment\n\nAfter the restrictions:\n- $100B+ committed to semiconductor self-sufficiency\n- SMIC achieving nodes previously thought impossible without EUV\n- Huawei reportedly stockpiled billions in equipment\n- YMTC chips appearing in devices globally despite Entity List\n\nThe goal was to slow China\'s progress. Did we instead light a fire under them?\n\nCurious what others think. Not trying to make a political statement, just looking at the data.',
      engagement: {
        replies: 1847,
        likes: 4521,
        reblogs: 234
      },
      narrativeIds: ['narr-001', 'narr-002', 'narr-003'],
      subNarrativeIds: ['sub-003'],
      personIds: [],
      organizationIds: ['org-001', 'org-005'],
      locationIds: [],
      eventIds: []
    },
    // X/Twitter - Policy hawk perspective
    {
      id: 'doc-027',
      documentType: 'social_post',
      url: 'https://x.com/nationalsecuritywatch/status/1881345678901234',
      publishedDate: '2026-01-19T11:42:00Z',
      sourceId: 'src-x',
      author: {
        username: '@nationalsecuritywatch',
        displayName: 'National Security Watch',
        avatarUrl: 'img/placeholders/avatar-default.svg'
      },
      content: 'Don\'t be fooled by headlines about SMIC\'s "5nm breakthrough."\n\nYes, they made a chip. But:\n\n❌ Costs 3x more to produce\n❌ Yields far below competitive levels\n❌ Can\'t scale for high-volume manufacturing\n❌ Years behind on next-gen 3nm/2nm\n\nExport controls are working. The goal was never to completely stop progress—it was to maintain our lead.\n\nChina is burning through resources on brute-force engineering that won\'t be economically viable.\n\nStay the course.',
      engagement: {
        replies: 523,
        likes: 2847,
        reblogs: 892
      },
      narrativeIds: ['narr-001', 'narr-002'],
      subNarrativeIds: ['sub-003'],
      personIds: [],
      organizationIds: ['org-005'],
      locationIds: ['loc-004'],
      eventIds: []
    },
    // LinkedIn - ASML impact discussion
    {
      id: 'doc-028',
      documentType: 'social_post',
      url: 'https://linkedin.com/posts/semiconductor-analyst_asml-china-exportcontrols-activity',
      publishedDate: '2026-01-16T08:30:00Z',
      sourceId: 'src-linkedin',
      author: {
        username: 'jennifer-williams-analyst',
        displayName: 'Jennifer Williams, CFA',
        avatarUrl: 'img/placeholders/avatar-default.svg'
      },
      content: '💰 ASML\'s $2.5B China Problem\n\nASML\'s Q4 guidance update is a wake-up call for investors in the semiconductor equipment space.\n\nKey takeaways:\n\n📉 $2.5B annual revenue hit from expanded China restrictions\n📊 That\'s roughly 10% of total revenue\n📈 Stock down 8% on the news\n\nThe bigger picture:\n\nChina was ASML\'s fastest-growing market. Now it\'s effectively closed.\n\nBut here\'s what\'s not in the headlines: ASML\'s backlog remains at record levels. The question is whether demand from other regions can offset the China loss.\n\nMy take: Short-term pain, but ASML\'s monopoly on EUV gives them pricing power. Watching closely.\n\n#ASML #Semiconductors #InvestmentAnalysis #ExportControls',
      engagement: {
        replies: 156,
        likes: 923,
        reblogs: 187
      },
      narrativeIds: ['narr-002'],
      subNarrativeIds: ['sub-005'],
      personIds: ['person-004'],
      organizationIds: ['org-002'],
      locationIds: ['loc-003'],
      eventIds: ['event-004']
    },
    // X/Twitter - Huawei Mate 70 teardown
    {
      id: 'doc-029',
      documentType: 'social_post',
      url: 'https://x.com/techanalyst_cn/status/1881456789012345',
      publishedDate: '2026-01-18T16:20:00Z',
      sourceId: 'src-x',
      author: {
        username: '@techanalyst_cn',
        displayName: 'CN Tech Analysis',
        avatarUrl: 'img/placeholders/avatar-default.svg'
      },
      content: 'Just finished teardown of Huawei Mate 70. Confirmed: Kirin 9100 chip inside.\n\nDie marking shows SMIC 5nm process. This is real.\n\nKey observations:\n• Performance ~15% below A18 Bionic\n• Power efficiency noticeably worse\n• But it WORKS. And it\'s 100% China-made.\n\nPhotos and full analysis thread below 👇\n\n📸 [image]\n📸 [image]\n📸 [image]',
      media: [
        { type: 'image', url: 'img/placeholders/image-placeholder.svg', altText: 'Mate 70 teardown showing chip' }
      ],
      engagement: {
        replies: 1234,
        likes: 8921,
        reblogs: 3456
      },
      narrativeIds: ['narr-001'],
      subNarrativeIds: ['sub-002'],
      personIds: [],
      organizationIds: ['org-001', 'org-010'],
      locationIds: [],
      eventIds: ['event-002']
    },
    // Reddit - TSMC Arizona worker perspective
    {
      id: 'doc-030',
      documentType: 'social_post',
      url: 'https://reddit.com/r/semiconductors/comments/abc123/tsmc_arizona_worker_ama',
      publishedDate: '2026-01-17T19:00:00Z',
      sourceId: 'src-reddit',
      author: {
        username: 'u/az_chipworker',
        displayName: 'az_chipworker',
        avatarUrl: 'img/placeholders/avatar-default.svg'
      },
      content: '**I work at TSMC Arizona. AMA about what\'s really happening**\n\nSeen a lot of misinformation about the Arizona fab. Thought I\'d offer some perspective as someone actually on the ground.\n\nBackground: Been in semiconductor manufacturing for 12 years. Joined TSMC Arizona 18 months ago.\n\nSome quick context:\n\n1. Yes, there are culture clashes. Taiwan teams work differently than American teams. That\'s real.\n\n2. The delays are mostly about equipment installation and qualification, not "lazy American workers" like some reports suggest.\n\n3. Morale is... complicated. Good pay, interesting work, but lots of frustration with management style.\n\n4. We\'re all learning. First fab of this scale ever built in the US. Growing pains are expected.\n\nHappy to answer what I can without violating my NDA.',
      engagement: {
        replies: 2847,
        likes: 5621,
        reblogs: 456
      },
      narrativeIds: ['narr-007'],
      subNarrativeIds: ['sub-016', 'sub-017'],
      personIds: [],
      organizationIds: ['org-020'],
      locationIds: ['loc-009'],
      eventIds: ['event-013']
    },

    // ============================================
    // INTERNAL DOCUMENTS
    // ============================================

    // Internal Document - SMIC Technical Assessment (SECRET)
    {
      id: 'doc-031',
      documentType: 'internal',
      classification: 'S',
      url: null,
      publishedDate: '2026-01-16T08:00:00Z',
      sourceId: null,
      title: 'Technical Assessment: SMIC 5nm DUV Multi-Patterning Capability',
      author: 'Semiconductor Analysis Division',
      department: 'Technical Intelligence',
      contentBlocks: [
        { type: 'heading', content: 'Executive Summary', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'This assessment evaluates SMIC\'s reported achievement of 5nm chip production using DUV lithography with multi-patterning techniques. Analysis confirms the technical feasibility of the approach while identifying significant economic and scalability limitations.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Technical Findings', portionMark: { classification: 'S', handling: '' } },
        { type: 'paragraph', content: 'Imagery analysis of Huawei Mate 70 teardowns confirms SMIC-manufactured Kirin 9100 processors at 5nm node. Die markings and packaging consistent with SMIC Shanghai Fab 18 production. Multi-patterning approach uses quadruple patterning with self-aligned techniques.', portionMark: { classification: 'S', handling: 'NOFORN' } },
        { type: 'paragraph', content: 'Process yields estimated at 20-35%, compared to 80%+ for TSMC\'s EUV-based 5nm. Cost per functional die approximately 2.8-3.2x higher than industry standard. Throughput limited by multi-exposure requirements—estimated 4-6x longer cycle time per wafer.', portionMark: { classification: 'S', handling: 'NOFORN' } },
        { type: 'heading', content: 'Production Capacity Assessment', portionMark: { classification: 'S', handling: '' } },
        { type: 'paragraph', content: 'Current SMIC 5nm capacity estimated at 3,000-5,000 wafers per month. Sufficient for Huawei flagship devices but inadequate for broader market supply. Expansion limited by DUV equipment availability—ASML NXT:2050i systems in short supply globally.', portionMark: { classification: 'S', handling: 'NOFORN' } },
        { type: 'heading', content: 'Export Control Implications', portionMark: { classification: 'S', handling: '' } },
        { type: 'paragraph', content: 'Achievement demonstrates export controls have not prevented advancement but have imposed significant cost and capability penalties. Recommend monitoring for potential acceleration of indigenous lithography development (SMEE roadmap) as China seeks to reduce DUV dependency.', portionMark: { classification: 'S', handling: 'NOFORN' } }
      ],
      excerpt: 'Technical assessment of SMIC\'s 5nm DUV multi-patterning capability, including yield analysis and export control implications.',
      narrativeIds: ['narr-001'],
      subNarrativeIds: ['sub-001', 'sub-002', 'sub-003'],
      personIds: ['person-001', 'person-002', 'person-003'],
      organizationIds: ['org-001', 'org-002', 'org-010'],
      locationIds: ['loc-001', 'loc-002'],
      eventIds: ['event-001', 'event-002'],
      factionIds: ['faction-001', 'faction-002', 'faction-003']
    },

    // Internal Document - Export Controls Effectiveness Review (SECRET)
    {
      id: 'doc-032',
      documentType: 'internal',
      classification: 'S',
      url: null,
      publishedDate: '2026-01-18T14:00:00Z',
      sourceId: null,
      title: 'Export Controls Effectiveness Review: Semiconductor Equipment Restrictions',
      author: 'Policy Analysis Division',
      department: 'Policy Analysis',
      contentBlocks: [
        { type: 'heading', content: 'Assessment Scope', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'This review assesses the effectiveness of US and allied export controls on semiconductor manufacturing equipment to China, focusing on the period following expanded ASML DUV restrictions announced January 12, 2026.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Key Findings', portionMark: { classification: 'S', handling: '' } },
        { type: 'paragraph', content: 'Export controls have successfully prevented Chinese access to EUV lithography, maintaining a 2-3 generation gap in leading-edge production capability. However, controls have not prevented advancement through alternative approaches (DUV multi-patterning) nor deterred massive domestic investment ($47B Big Fund III).', portionMark: { classification: 'S', handling: 'NOFORN' } },
        { type: 'heading', content: 'Stockpiling Concerns', portionMark: { classification: 'S', handling: '' } },
        { type: 'paragraph', content: 'Intelligence indicates Huawei accumulated $5-8 billion in semiconductor equipment prior to expanded restrictions. Commerce Department investigation ongoing into potential sanctions circumvention through third-party intermediaries. Pattern suggests systematic preparation for prolonged restrictions.', portionMark: { classification: 'S', handling: 'NOFORN' } },
        { type: 'heading', content: 'ASML Impact Analysis', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'ASML projects $2.5B annual revenue loss from China restrictions. Company stock declined 8% following announcement. Dutch government concerns about economic impact may affect long-term compliance. Peter Wennink (person-004) expressed frustration in earnings call.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Recommendations', portionMark: { classification: 'S', handling: '' } },
        { type: 'list', content: ['Expand Entity List enforcement monitoring for YMTC chips in consumer devices', 'Coordinate with allies on closing third-party intermediary loopholes', 'Assess viability of extending controls to mature node equipment', 'Monitor SMEE lithography development for potential future restrictions'], portionMark: { classification: 'S', handling: 'NOFORN' } }
      ],
      excerpt: 'Review of semiconductor export controls effectiveness, including stockpiling concerns and recommendations for enhanced enforcement.',
      narrativeIds: ['narr-002', 'narr-004'],
      subNarrativeIds: ['sub-004', 'sub-005', 'sub-006', 'sub-010', 'sub-011'],
      personIds: ['person-004', 'person-005', 'person-006', 'person-007', 'person-011', 'person-012'],
      organizationIds: ['org-002', 'org-004', 'org-005', 'org-006', 'org-010'],
      locationIds: ['loc-003', 'loc-004', 'loc-005'],
      eventIds: ['event-003', 'event-004', 'event-005', 'event-008', 'event-009'],
      factionIds: ['faction-001', 'faction-002', 'faction-004', 'faction-006']
    },

    // Internal Document - Big Fund III Investment Analysis
    {
      id: 'doc-033',
      documentType: 'internal',
      classification: 'U',
      url: null,
      publishedDate: '2026-01-19T10:00:00Z',
      sourceId: null,
      title: 'Investment Analysis: China National IC Fund Phase III',
      author: 'Economic Analysis Division',
      department: 'Economic Intelligence',
      contentBlocks: [
        { type: 'heading', content: 'Fund Overview', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'China has launched the third phase of its National Integrated Circuit Industry Investment Fund ("Big Fund III") with 340 billion yuan ($47 billion). This exceeds the combined total of Phase I ($21B) and Phase II ($29B), representing a significant escalation of state-directed semiconductor investment.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Investment Priorities', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'State Council guidelines prioritize: (1) Advanced packaging technologies including chiplets and 2.5D/3D stacking, (2) Semiconductor manufacturing equipment with focus on lithography, (3) EDA software development to reduce Cadence/Synopsys dependency. Notably absent: direct investment in leading-edge logic fabs.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Key Recipients', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Expected major beneficiaries include: SMEE (lithography equipment), Empyrean Technology (EDA), Huada Jiutian (EDA), AMEC (etch equipment), Naura (deposition equipment). State-owned enterprises providing majority of capital, signaling deepening government control over sector.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Historical Context', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Big Fund has mixed track record. Phase I investments in YMTC and CXMT showed technology progress but corruption scandals led to arrests of senior officials. Western analysts question whether capital injection can overcome equipment access barriers.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Market Implications', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Fund announcement drove Chinese semiconductor stocks up 8-12%. Global equipment makers (ASML, Applied Materials, Lam Research) showed mixed reaction—Chinese domestic equipment push represents both lost opportunity and potential long-term competitive threat.', portionMark: { classification: 'U', handling: 'FOUO' } }
      ],
      excerpt: 'Analysis of China\'s $47 billion Big Fund III semiconductor investment, including priorities, recipients, and market implications.',
      narrativeIds: ['narr-003'],
      subNarrativeIds: ['sub-007', 'sub-008', 'sub-009'],
      personIds: ['person-008', 'person-009', 'person-010'],
      organizationIds: ['org-007', 'org-008', 'org-009', 'org-016', 'org-017', 'org-022'],
      locationIds: ['loc-002', 'loc-006'],
      eventIds: ['event-006', 'event-007'],
      factionIds: ['faction-001', 'faction-002', 'faction-003', 'faction-005']
    },

    // Internal Document - YMTC Supply Chain Analysis (SECRET)
    {
      id: 'doc-034',
      documentType: 'internal',
      classification: 'S',
      url: null,
      publishedDate: '2026-01-19T16:00:00Z',
      sourceId: null,
      title: 'Supply Chain Analysis: YMTC Memory Chips in Global Consumer Electronics',
      author: 'Supply Chain Intelligence Division',
      department: 'Supply Chain Analysis',
      contentBlocks: [
        { type: 'heading', content: 'Investigation Summary', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'This analysis examines the presence of YMTC-manufactured NAND flash memory in consumer electronics despite the company\'s placement on the US Entity List in December 2022.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Product Identification', portionMark: { classification: 'S', handling: '' } },
        { type: 'paragraph', content: 'TechInsights teardown analysis has confirmed YMTC 232-layer 3D NAND chips in: smartphones from 3 Chinese brands, SSDs from 2 Taiwanese ODMs, and USB drives from multiple white-label manufacturers. Chip markings indicate YMTC Fab 1 and Fab 2 production in Wuhan.', portionMark: { classification: 'S', handling: 'NOFORN' } },
        { type: 'heading', content: 'Supply Chain Pathways', portionMark: { classification: 'S', handling: '' } },
        { type: 'paragraph', content: 'Analysis indicates chips are reaching global markets through: (1) Direct integration by Chinese OEMs not subject to US jurisdiction, (2) Module assembly in Southeast Asia obscuring chip origin, (3) Relabeling through intermediary distributors. End-to-end tracking proves difficult without physical teardowns.', portionMark: { classification: 'S', handling: 'NOFORN' } },
        { type: 'heading', content: 'Technology Assessment', portionMark: { classification: 'S', handling: '' } },
        { type: 'paragraph', content: 'YMTC 232-layer NAND demonstrates competitive performance with Samsung and SK Hynix offerings in sequential read/write and random IOPS. Power efficiency approximately 8% lower. Technology gap has narrowed significantly from 2022 baseline despite export restrictions.', portionMark: { classification: 'S', handling: 'NOFORN' } },
        { type: 'heading', content: 'Enforcement Recommendations', portionMark: { classification: 'S', handling: '' } },
        { type: 'list', content: ['Expand Entity List to include known intermediary distributors', 'Require country-of-origin disclosure for memory components in US-bound electronics', 'Coordinate with Taiwanese authorities on ODM compliance', 'Consider secondary sanctions for companies knowingly sourcing YMTC chips'], portionMark: { classification: 'S', handling: 'NOFORN' } }
      ],
      excerpt: 'Analysis of YMTC memory chip presence in global supply chains despite Entity List restrictions, including pathways and enforcement recommendations.',
      narrativeIds: ['narr-005'],
      subNarrativeIds: ['sub-012', 'sub-013'],
      personIds: ['person-013', 'person-014'],
      organizationIds: ['org-013', 'org-014', 'org-015', 'org-005'],
      locationIds: ['loc-007', 'loc-004'],
      eventIds: ['event-010', 'event-011'],
      factionIds: ['faction-001', 'faction-002', 'faction-003', 'faction-006']
    },

    // Internal Document - TSMC Arizona Operations Assessment
    {
      id: 'doc-035',
      documentType: 'internal',
      classification: 'U',
      url: null,
      publishedDate: '2026-01-17T15:00:00Z',
      sourceId: null,
      title: 'Operations Assessment: TSMC Arizona Fab Construction and Workforce Challenges',
      author: 'Industrial Analysis Division',
      department: 'Industrial Intelligence',
      contentBlocks: [
        { type: 'heading', content: 'Project Status', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'TSMC\'s $40 billion Arizona fabrication facility faces significant delays. Original 2024 production target has slipped to late 2025 for 4nm chips. Cost overruns estimated at 15-20% above initial projections. Second fab (3nm) timeline uncertain.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Workforce Dynamics', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Cultural tensions between Taiwanese management and American workforce well-documented. Arizona Building and Construction Trades Council (org-021) filed formal grievances citing management practices. TSMC CEO C.C. Wei acknowledged "different work culture" in public remarks.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'paragraph', content: 'Key friction points include: expectations around overtime and weekend work, communication styles, decision-making hierarchy, and training approaches. TSMC has brought approximately 500 Taiwanese engineers to Arizona, creating perception of two-tier workforce.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Strategic Implications', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Delays undermine CHIPS Act goal of domestic semiconductor manufacturing. Intel and Samsung facing similar challenges at US facilities. Questions emerging about viability of reshoring advanced chip production without fundamental changes to work culture expectations.', portionMark: { classification: 'U', handling: 'FOUO' } },
        { type: 'heading', content: 'Chinese Media Response', portionMark: { classification: 'U', handling: '' } },
        { type: 'paragraph', content: 'Chinese Tech Industry Supporters faction (faction-001) amplifying TSMC Arizona difficulties. Narrative framing: US manufacturing decline vs. Chinese industrial capability. Global Times and CGTN coverage emphasizes "American workers can\'t match Asian discipline."', portionMark: { classification: 'U', handling: 'FOUO' } }
      ],
      excerpt: 'Assessment of TSMC Arizona fab challenges including workforce dynamics, delays, and strategic implications for US semiconductor manufacturing.',
      narrativeIds: ['narr-007'],
      subNarrativeIds: ['sub-016', 'sub-017'],
      personIds: ['person-017', 'person-018', 'person-019'],
      organizationIds: ['org-020', 'org-021'],
      locationIds: ['loc-009', 'loc-010'],
      eventIds: ['event-013', 'event-014'],
      factionIds: ['faction-001', 'faction-005', 'faction-006']
    }
  ],

  monitors: [
    {
      id: 'monitor-001',
      name: 'SMIC Technology Progress',
      description: 'Track breakthroughs and developments at SMIC, China\'s leading chip manufacturer',
      scope: {
        organizationIds: ['org-001'], // SMIC
        personIds: ['person-001', 'person-002', 'person-003'], // SMIC leadership
        narrativeIds: ['narr-001'] // SMIC 5nm breakthrough
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
        sentimentShift: { threshold: 0.20, direction: 'any' },
        factionEngagement: { factionIds: ['faction-001', 'faction-002'], threshold: 200 }
      },
      enabled: true,
      createdAt: '2026-01-01T00:00:00Z',
      lastTriggered: '2026-01-20T09:30:00Z'
    },
    {
      id: 'monitor-002',
      name: 'Export Controls Impact',
      description: 'Monitor narratives around US/Dutch export controls and their effects on Chinese chip industry',
      scope: {
        organizationIds: ['org-002', 'org-004', 'org-005'], // ASML, US Commerce Dept, Dutch Govt
        personIds: ['person-004', 'person-005', 'person-006'], // Policy figures
        narrativeIds: ['narr-002'] // ASML restrictions narrative
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
        sentimentShift: { threshold: 0.15, direction: 'negative' },
        factionEngagement: null
      },
      enabled: true,
      createdAt: '2026-01-01T00:00:00Z',
      lastTriggered: '2026-01-17T14:00:00Z'
    },
    {
      id: 'monitor-003',
      name: 'Chinese Investment Watch',
      description: 'Track government funding, Big Fund allocations, and investment trends in Chinese semiconductors',
      scope: {
        organizationIds: ['org-007', 'org-008', 'org-009'], // Big Fund, Ministry of Finance, MIIT
        personIds: ['person-008', 'person-009', 'person-010'], // Investment figures
        narrativeIds: ['narr-003'] // Big Fund narrative
      },
      options: {
        includeSubEvents: true,
        includeSubNarratives: true,
        includeRelatedEvents: true
      },
      triggers: {
        newNarrative: true,
        newEvent: false,
        volumeSpike: { threshold: 300, timeWindow: '24h' },
        sentimentShift: null,
        factionEngagement: { factionIds: ['faction-001', 'faction-005'], threshold: 150 }
      },
      enabled: true,
      createdAt: '2026-01-15T00:00:00Z',
      lastTriggered: '2026-01-20T11:00:00Z'
    },
    {
      id: 'monitor-004',
      name: 'Huawei Sanctions Monitoring',
      description: 'Track Huawei\'s efforts to circumvent sanctions and develop indigenous chip capabilities',
      scope: {
        organizationIds: ['org-010'], // Huawei
        personIds: ['person-011', 'person-012'], // Huawei leadership
        narrativeIds: ['narr-004'] // Huawei stockpiling narrative
      },
      options: {
        includeSubEvents: true,
        includeSubNarratives: true,
        includeRelatedEvents: true
      },
      triggers: {
        newNarrative: true,
        newEvent: true,
        volumeSpike: { threshold: 350, timeWindow: '24h' },
        sentimentShift: { threshold: 0.20, direction: 'any' },
        factionEngagement: null
      },
      enabled: true,
      createdAt: '2026-01-01T00:00:00Z',
      lastTriggered: '2026-01-19T16:30:00Z'
    },
    {
      id: 'monitor-005',
      name: 'Supply Chain & Manufacturing',
      description: 'Monitor TSMC Arizona, YMTC, and global semiconductor supply chain developments',
      scope: {
        organizationIds: ['org-013', 'org-020'], // YMTC, TSMC
        locationIds: ['loc-009', 'loc-010'], // Arizona locations
        narrativeIds: ['narr-005', 'narr-007'] // YMTC and TSMC Arizona narratives
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
        factionEngagement: null
      },
      enabled: false, // Paused
      createdAt: '2026-01-10T00:00:00Z',
      lastTriggered: '2026-01-18T10:00:00Z'
    }
  ],

  alerts: [
    {
      id: 'alert-001',
      monitorId: 'monitor-001',
      type: 'volume_spike',
      title: 'Volume spike: SMIC 5nm breakthrough coverage',
      description: '520 mentions from Chinese state media in 24 hours, exceeding threshold of 400',
      severity: 'high',
      triggeredAt: '2026-01-20T09:30:00Z',
      acknowledged: false,
      relatedNarrativeIds: ['narr-001'],
      relatedSubNarrativeIds: ['sub-001', 'sub-002'],
      relatedEventIds: ['event-001', 'event-002'],
      relatedSubEventIds: [],
      metadata: {
        actualValue: 520,
        threshold: 400,
        timeWindow: '24h',
        percentOver: 30
      }
    },
    {
      id: 'alert-002',
      monitorId: 'monitor-001',
      type: 'faction_engagement',
      title: 'High faction engagement: SMIC narrative',
      description: 'Chinese Nationalists (520) and US Hawks (380) showing significant engagement',
      severity: 'medium',
      triggeredAt: '2026-01-19T14:00:00Z',
      acknowledged: true,
      relatedNarrativeIds: ['narr-001'],
      relatedSubNarrativeIds: ['sub-001', 'sub-003'],
      relatedEventIds: ['event-001'],
      relatedSubEventIds: [],
      metadata: {
        factionEngagement: {
          'faction-001': 520,
          'faction-002': 380
        },
        threshold: 200,
        totalVolume: 900
      }
    },
    {
      id: 'alert-003',
      monitorId: 'monitor-002',
      type: 'sentiment_shift',
      title: 'Sentiment shift: Export controls narrative',
      description: '-18% sentiment change following expanded ASML restrictions announcement',
      severity: 'high',
      triggeredAt: '2026-01-17T14:00:00Z',
      acknowledged: false,
      relatedNarrativeIds: ['narr-002'],
      relatedSubNarrativeIds: ['sub-004', 'sub-005'],
      relatedEventIds: ['event-003', 'event-004'],
      relatedSubEventIds: [],
      metadata: {
        previousSentiment: -0.30,
        currentSentiment: -0.48,
        delta: -0.18,
        direction: 'negative'
      }
    },
    {
      id: 'alert-004',
      monitorId: 'monitor-002',
      type: 'new_event',
      title: 'New event: Netherlands expands ASML export ban',
      description: 'Dutch government announces expanded restrictions on DUV lithography exports to China',
      severity: 'high',
      triggeredAt: '2026-01-14T10:00:00Z',
      acknowledged: true,
      relatedNarrativeIds: ['narr-002'],
      relatedSubNarrativeIds: ['sub-004'],
      relatedEventIds: ['event-003'],
      relatedSubEventIds: ['event-004', 'event-005'],
      metadata: {
        eventId: 'event-003',
        eventText: 'Netherlands expands ASML export restrictions to China'
      }
    },
    {
      id: 'alert-005',
      monitorId: 'monitor-003',
      type: 'new_narrative',
      title: 'New narrative: Big Fund Phase III announced',
      description: 'China launches $47 billion semiconductor investment fund, largest tranche yet',
      severity: 'high',
      triggeredAt: '2026-01-17T08:00:00Z',
      acknowledged: true,
      relatedNarrativeIds: ['narr-003'],
      relatedSubNarrativeIds: ['sub-007', 'sub-008', 'sub-009'],
      relatedEventIds: ['event-006', 'event-007'],
      relatedSubEventIds: [],
      metadata: {
        narrativeId: 'narr-003',
        narrativeText: 'China announces $47 billion semiconductor investment fund, third phase of "Big Fund"'
      }
    },
    {
      id: 'alert-006',
      monitorId: 'monitor-003',
      type: 'volume_spike',
      title: 'Volume spike: Big Fund coverage',
      description: '425 mentions in 24 hours as markets react to funding announcement',
      severity: 'medium',
      triggeredAt: '2026-01-20T11:00:00Z',
      acknowledged: false,
      relatedNarrativeIds: ['narr-003'],
      relatedSubNarrativeIds: ['sub-007', 'sub-009'],
      relatedEventIds: ['event-006'],
      relatedSubEventIds: [],
      metadata: {
        actualValue: 425,
        threshold: 300,
        timeWindow: '24h',
        percentOver: 41.7
      }
    },
    {
      id: 'alert-007',
      monitorId: 'monitor-004',
      type: 'new_narrative',
      title: 'New narrative: Huawei equipment stockpiling investigation',
      description: 'Reports emerge of Huawei stockpiling semiconductor equipment ahead of sanctions',
      severity: 'high',
      triggeredAt: '2026-01-15T12:00:00Z',
      acknowledged: true,
      relatedNarrativeIds: ['narr-004'],
      relatedSubNarrativeIds: ['sub-010', 'sub-011'],
      relatedEventIds: ['event-008', 'event-009'],
      relatedSubEventIds: [],
      metadata: {
        narrativeId: 'narr-004',
        narrativeText: 'Huawei stockpiles semiconductor equipment ahead of expanded US sanctions'
      }
    },
    {
      id: 'alert-008',
      monitorId: 'monitor-004',
      type: 'volume_spike',
      title: 'Volume spike: Huawei sanctions coverage',
      description: '365 mentions from US national security voices in 24 hours',
      severity: 'medium',
      triggeredAt: '2026-01-19T16:30:00Z',
      acknowledged: false,
      relatedNarrativeIds: ['narr-004'],
      relatedSubNarrativeIds: ['sub-010'],
      relatedEventIds: ['event-009'],
      relatedSubEventIds: [],
      metadata: {
        actualValue: 365,
        threshold: 350,
        timeWindow: '24h',
        percentOver: 4.3
      }
    }
  ]
};

/**
 * Initialize the data store with Chinese semiconductor mock data
 */
export function initializeMockData(dataStore) {
  dataStore.data = { ...mockData };
  dataStore.save();
}

export default mockData;

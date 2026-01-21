/**
 * mockDataWalmartBrand.js
 * Sample dataset for Walmart brand analyst monitoring consumer trust narratives
 * Demonstrates the full data model capabilities
 */

export const datasetId = 'walmart-brand';
export const datasetName = 'Walmart Brand';

export const mockData = {
  sources: [
    // Consumer Review Platforms
    { id: 'src-trustpilot', name: 'Trustpilot', type: 'consumer_review', color: '#00B67A' },
    { id: 'src-bbb', name: 'Better Business Bureau', type: 'consumer_review', color: '#005A8C' },
    { id: 'src-yelp', name: 'Yelp', type: 'consumer_review', color: '#D32323' },
    { id: 'src-consumeraffairs', name: 'ConsumerAffairs', type: 'consumer_review', color: '#1E88E5' },
    { id: 'src-googlereviews', name: 'Google Reviews', type: 'consumer_review', color: '#4285F4' },
    
    // News Outlets
    { id: 'src-reuters', name: 'Reuters', type: 'news', parent: 'news', color: '#FF8000' },
    { id: 'src-ap', name: 'Associated Press', type: 'news', parent: 'news', color: '#E32636' },
    { id: 'src-usatoday', name: 'USA Today', type: 'news', parent: 'news', color: '#009BFF' },
    { id: 'src-localnews', name: 'Local News Affiliates', type: 'news', parent: 'news', color: '#6B7280' },
    
    // Business News
    { id: 'src-wsj', name: 'Wall Street Journal', type: 'business_news', parent: 'business_news', color: '#1A1A1A' },
    { id: 'src-bloomberg', name: 'Bloomberg', type: 'business_news', parent: 'business_news', color: '#000000' },
    { id: 'src-retaildive', name: 'Retail Dive', type: 'business_news', parent: 'business_news', color: '#0066CC' },
    { id: 'src-modernretail', name: 'Modern Retail', type: 'business_news', parent: 'business_news', color: '#FF6B35' },
    
    // Social Media
    { id: 'src-x', name: 'X', type: 'social', color: '#000000' },
    { id: 'src-tiktok', name: 'TikTok', type: 'social', color: '#00F2EA' },
    { id: 'src-reddit', name: 'Reddit', type: 'social', color: '#FF4500' },
    { id: 'src-facebook', name: 'Facebook', type: 'social', color: '#1877F2' },
    { id: 'src-instagram', name: 'Instagram', type: 'social', color: '#E4405F' }
  ],

  sourceCategories: [
    { id: 'consumer_review', name: 'Consumer Reviews', color: '#59A14F' },
    { id: 'news', name: 'News', color: '#E15759' },
    { id: 'business_news', name: 'Business News', color: '#76B7B2' },
    { id: 'social', name: 'Social Media', color: '#B07AA1' }
  ],

  missions: [
    {
      id: 'mission-001',
      name: 'Understand narratives and complaints about Walmart\'s in-store experience',
      description: 'Track customer complaints about checkout, cleanliness, staff interactions, and store conditions',
      color: '#4E79A7',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'mission-002',
      name: 'Understand risks to Walmart\'s brand promise of a massive range of products available at low prices',
      description: 'Monitor narratives about pricing, product availability, and value perception',
      color: '#EDC948',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'mission-003',
      name: 'Monitor product safety narratives about Walmart',
      description: 'Track product recalls, food safety incidents, and quality concerns',
      color: '#E15759',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'mission-004',
      name: 'Track competitor activity that may impact Walmart\'s reputation',
      description: 'Monitor competitor announcements, market share shifts, and comparative narratives',
      color: '#59A14F',
      createdAt: '2024-01-01T00:00:00Z'
    }
  ],

  narratives: [
    {
      id: 'narr-001',
      text: 'Self-checkout frustrations spark viral complaints about theft accusations and customer treatment',
      description: 'A wave of customer complaints has gone viral on social media after multiple incidents where Walmart customers were stopped, searched, or accused of theft at self-checkout stations. Videos show confrontations between customers and loss prevention staff, with many customers claiming they were humiliated despite having receipts. The controversy intensified after a class-action lawsuit was filed in Texas alleging systematic false detention of customers. Walmart has defended its loss prevention practices while announcing plans to add more staffed checkout lanes in select stores.',
      missionId: 'mission-001',
      status: 'in_progress',
      sentiment: -0.68,
      subNarrativeIds: ['sub-001', 'sub-002', 'sub-003'],
      factionMentions: {
        'faction-001': { volume: 685, sentiment: -0.82 },
        'faction-002': { volume: 245, sentiment: -0.72 },
        'faction-005': { volume: 165, sentiment: -0.35 }
      },
      sourceVolumes: {
        'src-tiktok': { volume: 385, sentiment: -0.75 },
        'src-x': { volume: 295, sentiment: -0.68 },
        'src-reddit': { volume: 185, sentiment: -0.72 },
        'src-facebook': { volume: 145, sentiment: -0.65 },
        'src-trustpilot': { volume: 95, sentiment: -0.78 },
        'src-localnews': { volume: 65, sentiment: -0.45 },
        'src-usatoday': { volume: 42, sentiment: -0.38 }
      },
      factionSources: {
        'faction-001': { 'src-tiktok': 285, 'src-x': 175, 'src-reddit': 125, 'src-facebook': 100 },
        'faction-002': { 'src-reddit': 95, 'src-x': 85, 'src-tiktok': 65 },
        'faction-005': { 'src-wsj': 45, 'src-bloomberg': 38, 'src-retaildive': 52, 'src-x': 30 }
      },
      personIds: ['person-001', 'person-002', 'person-008'],
      organizationIds: ['org-001', 'org-002'],
      locationIds: ['loc-002', 'loc-003'],
      eventIds: ['event-001', 'event-002', 'event-003'],
      volumeOverTime: [
        { date: '2026-01-14', factionVolumes: { 'faction-001': 125, 'faction-002': 45, 'faction-005': 28 }, sourceVolumes: { 'src-tiktok': 72, 'src-x': 55, 'src-reddit': 35, 'src-facebook': 28 } },
        { date: '2026-01-15', factionVolumes: { 'faction-001': 195, 'faction-002': 72, 'faction-005': 42 }, sourceVolumes: { 'src-tiktok': 115, 'src-x': 85, 'src-reddit': 55, 'src-facebook': 42 } },
        { date: '2026-01-16', factionVolumes: { 'faction-001': 285, 'faction-002': 105, 'faction-005': 65 }, sourceVolumes: { 'src-tiktok': 165, 'src-x': 125, 'src-reddit': 78, 'src-facebook': 62 } },
        { date: '2026-01-17', factionVolumes: { 'faction-001': 425, 'faction-002': 155, 'faction-005': 95 }, sourceVolumes: { 'src-tiktok': 245, 'src-x': 185, 'src-reddit': 115, 'src-facebook': 92 } },
        { date: '2026-01-18', factionVolumes: { 'faction-001': 545, 'faction-002': 195, 'faction-005': 125 }, sourceVolumes: { 'src-tiktok': 315, 'src-x': 235, 'src-reddit': 148, 'src-facebook': 118 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 625, 'faction-002': 225, 'faction-005': 148 }, sourceVolumes: { 'src-tiktok': 358, 'src-x': 272, 'src-reddit': 168, 'src-facebook': 135 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 685, 'faction-002': 245, 'faction-005': 165 }, sourceVolumes: { 'src-tiktok': 385, 'src-x': 295, 'src-reddit': 185, 'src-facebook': 145 } }
      ],
      documentIds: ['doc-001', 'doc-002', 'doc-003', 'doc-004'],
      createdAt: '2026-01-14T00:00:00Z'
    },
    {
      id: 'narr-002',
      text: 'Widespread reports of empty shelves and out-of-stock items frustrate Walmart shoppers',
      description: 'Customers across multiple states are reporting persistent empty shelves and out-of-stock items at Walmart stores, particularly in grocery and household essentials. Social media posts show bare aisles, with some customers driving to multiple locations without finding needed products. Walmart has attributed the issues to supply chain disruptions and regional distribution challenges, but retail analysts note the company\'s inventory management system may need significant upgrades. The complaints come as competitors like Target report improved in-stock rates.',
      missionId: 'mission-002',
      status: 'in_progress',
      sentiment: -0.55,
      subNarrativeIds: ['sub-004', 'sub-005'],
      factionMentions: {
        'faction-001': { volume: 425, sentiment: -0.72 },
        'faction-005': { volume: 185, sentiment: -0.42 },
        'faction-006': { volume: 145, sentiment: 0.35 }
      },
      sourceVolumes: {
        'src-x': { volume: 225, sentiment: -0.62 },
        'src-facebook': { volume: 185, sentiment: -0.68 },
        'src-reddit': { volume: 145, sentiment: -0.58 },
        'src-trustpilot': { volume: 85, sentiment: -0.75 },
        'src-yelp': { volume: 72, sentiment: -0.72 },
        'src-retaildive': { volume: 45, sentiment: -0.28 },
        'src-wsj': { volume: 38, sentiment: -0.22 }
      },
      factionSources: {
        'faction-001': { 'src-x': 165, 'src-facebook': 145, 'src-reddit': 95, 'src-trustpilot': 65 },
        'faction-005': { 'src-retaildive': 42, 'src-wsj': 35, 'src-bloomberg': 48, 'src-x': 60 },
        'faction-006': { 'src-x': 55, 'src-reddit': 48, 'src-tiktok': 42 }
      },
      personIds: ['person-001', 'person-009', 'person-010'],
      organizationIds: ['org-001', 'org-003', 'org-004'],
      locationIds: ['loc-001', 'loc-004', 'loc-005'],
      eventIds: ['event-004', 'event-005'],
      volumeOverTime: [
        { date: '2026-01-15', factionVolumes: { 'faction-001': 145, 'faction-005': 62, 'faction-006': 48 }, sourceVolumes: { 'src-x': 78, 'src-facebook': 62, 'src-reddit': 48 } },
        { date: '2026-01-16', factionVolumes: { 'faction-001': 225, 'faction-005': 95, 'faction-006': 72 }, sourceVolumes: { 'src-x': 118, 'src-facebook': 95, 'src-reddit': 75 } },
        { date: '2026-01-17', factionVolumes: { 'faction-001': 305, 'faction-005': 128, 'faction-006': 98 }, sourceVolumes: { 'src-x': 158, 'src-facebook': 128, 'src-reddit': 102 } },
        { date: '2026-01-18', factionVolumes: { 'faction-001': 365, 'faction-005': 155, 'faction-006': 122 }, sourceVolumes: { 'src-x': 192, 'src-facebook': 155, 'src-reddit': 125 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 425, 'faction-005': 185, 'faction-006': 145 }, sourceVolumes: { 'src-x': 225, 'src-facebook': 185, 'src-reddit': 145 } }
      ],
      documentIds: ['doc-005', 'doc-006', 'doc-007'],
      createdAt: '2026-01-15T00:00:00Z'
    },
    {
      id: 'narr-003',
      text: 'Walmart workers share stories of understaffing and poor working conditions on social media',
      description: 'Current and former Walmart employees are sharing videos and posts detailing challenging working conditions, including understaffing, mandatory overtime, and inconsistent scheduling. The hashtag #WalmartWorkers has gained traction on TikTok with over 50 million views. Workers describe being responsible for multiple departments simultaneously while customers complain about lack of assistance. Labor advocates are amplifying these stories, calling for improved wages and working conditions. Walmart has responded by highlighting its $14 minimum wage and associate benefits.',
      missionId: 'mission-001',
      status: 'under_investigation',
      sentiment: -0.62,
      subNarrativeIds: ['sub-006', 'sub-007', 'sub-008'],
      factionMentions: {
        'faction-002': { volume: 485, sentiment: -0.78 },
        'faction-003': { volume: 345, sentiment: -0.82 },
        'faction-001': { volume: 225, sentiment: -0.55 },
        'faction-005': { volume: 145, sentiment: -0.38 }
      },
      sourceVolumes: {
        'src-tiktok': { volume: 345, sentiment: -0.72 },
        'src-reddit': { volume: 285, sentiment: -0.75 },
        'src-x': { volume: 195, sentiment: -0.65 },
        'src-facebook': { volume: 125, sentiment: -0.58 },
        'src-bloomberg': { volume: 55, sentiment: -0.35 },
        'src-wsj': { volume: 48, sentiment: -0.28 },
        'src-reuters': { volume: 42, sentiment: -0.22 }
      },
      factionSources: {
        'faction-002': { 'src-tiktok': 225, 'src-reddit': 185, 'src-x': 75 },
        'faction-003': { 'src-reddit': 145, 'src-x': 95, 'src-tiktok': 105 },
        'faction-001': { 'src-facebook': 95, 'src-x': 75, 'src-reddit': 55 },
        'faction-005': { 'src-bloomberg': 48, 'src-wsj': 42, 'src-reuters': 35, 'src-x': 20 }
      },
      personIds: ['person-003', 'person-004', 'person-005'],
      organizationIds: ['org-001', 'org-005', 'org-006'],
      locationIds: ['loc-001', 'loc-006'],
      eventIds: ['event-006', 'event-007'],
      volumeOverTime: [
        { date: '2026-01-13', factionVolumes: { 'faction-002': 125, 'faction-003': 92, 'faction-001': 58, 'faction-005': 38 }, sourceVolumes: { 'src-tiktok': 92, 'src-reddit': 75, 'src-x': 52 } },
        { date: '2026-01-14', factionVolumes: { 'faction-002': 195, 'faction-003': 145, 'faction-001': 92, 'faction-005': 58 }, sourceVolumes: { 'src-tiktok': 145, 'src-reddit': 118, 'src-x': 82 } },
        { date: '2026-01-15', factionVolumes: { 'faction-002': 275, 'faction-003': 205, 'faction-001': 128, 'faction-005': 82 }, sourceVolumes: { 'src-tiktok': 198, 'src-reddit': 165, 'src-x': 115 } },
        { date: '2026-01-16', factionVolumes: { 'faction-002': 345, 'faction-003': 258, 'faction-001': 165, 'faction-005': 105 }, sourceVolumes: { 'src-tiktok': 252, 'src-reddit': 208, 'src-x': 145 } },
        { date: '2026-01-17', factionVolumes: { 'faction-002': 415, 'faction-003': 305, 'faction-001': 195, 'faction-005': 125 }, sourceVolumes: { 'src-tiktok': 302, 'src-reddit': 248, 'src-x': 172 } },
        { date: '2026-01-18', factionVolumes: { 'faction-002': 485, 'faction-003': 345, 'faction-001': 225, 'faction-005': 145 }, sourceVolumes: { 'src-tiktok': 345, 'src-reddit': 285, 'src-x': 195 } }
      ],
      documentIds: ['doc-008', 'doc-009', 'doc-010', 'doc-011'],
      createdAt: '2026-01-13T00:00:00Z'
    },
    {
      id: 'narr-004',
      text: 'Great Value brand recall expands after contamination found in multiple products',
      description: 'The FDA has expanded a recall of Walmart\'s Great Value brand products after discovering potential Listeria contamination in frozen vegetables and salad mixes. The recall now covers 15 product SKUs sold across all 50 states. Three hospitalizations have been linked to the contamination, though no deaths have been reported. Consumer advocacy groups are calling for stricter quality controls on private-label products. Walmart has issued refunds and launched an internal investigation into its supplier network.',
      missionId: 'mission-003',
      status: 'in_progress',
      sentiment: -0.72,
      subNarrativeIds: ['sub-009', 'sub-010'],
      factionMentions: {
        'faction-004': { volume: 385, sentiment: -0.85 },
        'faction-001': { volume: 295, sentiment: -0.78 },
        'faction-005': { volume: 165, sentiment: -0.55 }
      },
      sourceVolumes: {
        'src-localnews': { volume: 185, sentiment: -0.68 },
        'src-usatoday': { volume: 125, sentiment: -0.62 },
        'src-reuters': { volume: 98, sentiment: -0.55 },
        'src-ap': { volume: 88, sentiment: -0.52 },
        'src-x': { volume: 165, sentiment: -0.72 },
        'src-facebook': { volume: 145, sentiment: -0.75 },
        'src-consumeraffairs': { volume: 95, sentiment: -0.82 }
      },
      factionSources: {
        'faction-004': { 'src-consumeraffairs': 85, 'src-x': 95, 'src-facebook': 85, 'src-localnews': 75, 'src-usatoday': 45 },
        'faction-001': { 'src-x': 105, 'src-facebook': 95, 'src-localnews': 65, 'src-reddit': 30 },
        'faction-005': { 'src-reuters': 55, 'src-wsj': 42, 'src-bloomberg': 38, 'src-ap': 30 }
      },
      personIds: ['person-006', 'person-007', 'person-011'],
      organizationIds: ['org-001', 'org-007', 'org-008', 'org-009'],
      locationIds: ['loc-001', 'loc-007'],
      eventIds: ['event-008', 'event-009', 'event-010'],
      volumeOverTime: [
        { date: '2026-01-16', factionVolumes: { 'faction-004': 95, 'faction-001': 72, 'faction-005': 42 }, sourceVolumes: { 'src-localnews': 45, 'src-usatoday': 32, 'src-x': 42 } },
        { date: '2026-01-17', factionVolumes: { 'faction-004': 185, 'faction-001': 145, 'faction-005': 85 }, sourceVolumes: { 'src-localnews': 92, 'src-usatoday': 65, 'src-x': 85, 'src-reuters': 48 } },
        { date: '2026-01-18', factionVolumes: { 'faction-004': 285, 'faction-001': 225, 'faction-005': 125 }, sourceVolumes: { 'src-localnews': 142, 'src-usatoday': 98, 'src-x': 128, 'src-reuters': 75 } },
        { date: '2026-01-19', factionVolumes: { 'faction-004': 345, 'faction-001': 265, 'faction-005': 148 }, sourceVolumes: { 'src-localnews': 168, 'src-usatoday': 115, 'src-x': 152, 'src-reuters': 88 } },
        { date: '2026-01-20', factionVolumes: { 'faction-004': 385, 'faction-001': 295, 'faction-005': 165 }, sourceVolumes: { 'src-localnews': 185, 'src-usatoday': 125, 'src-x': 165, 'src-reuters': 98 } }
      ],
      documentIds: ['doc-012', 'doc-013', 'doc-014'],
      createdAt: '2026-01-16T00:00:00Z'
    },
    {
      id: 'narr-005',
      text: 'Customers complain Walmart prices no longer competitive as inflation pricing sticks',
      description: 'Social media discussions and consumer surveys indicate growing perception that Walmart\'s prices are no longer significantly lower than competitors. Analysis shows Walmart retained pandemic-era price increases on many items even as wholesale costs declined. The narrative has intensified after viral TikTok videos showed price comparisons between Walmart, Aldi, and Amazon showing Walmart losing on several staple items. Retail analysts note this threatens Walmart\'s core brand promise of "Everyday Low Prices."',
      missionId: 'mission-002',
      status: 'new',
      sentiment: -0.58,
      subNarrativeIds: ['sub-011', 'sub-012'],
      factionMentions: {
        'faction-001': { volume: 365, sentiment: -0.72 },
        'faction-005': { volume: 195, sentiment: -0.45 },
        'faction-006': { volume: 175, sentiment: 0.42 }
      },
      sourceVolumes: {
        'src-tiktok': { volume: 225, sentiment: -0.65 },
        'src-x': { volume: 185, sentiment: -0.58 },
        'src-reddit': { volume: 145, sentiment: -0.62 },
        'src-facebook': { volume: 95, sentiment: -0.55 },
        'src-wsj': { volume: 52, sentiment: -0.35 },
        'src-bloomberg': { volume: 45, sentiment: -0.32 },
        'src-retaildive': { volume: 38, sentiment: -0.28 }
      },
      factionSources: {
        'faction-001': { 'src-tiktok': 165, 'src-x': 125, 'src-reddit': 95, 'src-facebook': 72 },
        'faction-005': { 'src-wsj': 48, 'src-bloomberg': 42, 'src-retaildive': 35, 'src-x': 70 },
        'faction-006': { 'src-tiktok': 72, 'src-x': 55, 'src-reddit': 48 }
      },
      personIds: ['person-001', 'person-010', 'person-012'],
      organizationIds: ['org-001', 'org-010', 'org-011'],
      locationIds: ['loc-001'],
      eventIds: ['event-011'],
      volumeOverTime: [
        { date: '2026-01-17', factionVolumes: { 'faction-001': 125, 'faction-005': 65, 'faction-006': 58 }, sourceVolumes: { 'src-tiktok': 75, 'src-x': 62, 'src-reddit': 48 } },
        { date: '2026-01-18', factionVolumes: { 'faction-001': 225, 'faction-005': 125, 'faction-006': 108 }, sourceVolumes: { 'src-tiktok': 138, 'src-x': 115, 'src-reddit': 92 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 305, 'faction-005': 165, 'faction-006': 145 }, sourceVolumes: { 'src-tiktok': 185, 'src-x': 155, 'src-reddit': 122 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 365, 'faction-005': 195, 'faction-006': 175 }, sourceVolumes: { 'src-tiktok': 225, 'src-x': 185, 'src-reddit': 145 } }
      ],
      documentIds: ['doc-015', 'doc-016', 'doc-017'],
      createdAt: '2026-01-17T00:00:00Z'
    },
    {
      id: 'narr-006',
      text: 'Target and Amazon gain ground with faster delivery, putting pressure on Walmart',
      description: 'Retail analysts report Target\'s same-day delivery service has achieved 98% on-time delivery rates, while Amazon continues expanding its sub-24-hour delivery coverage. Walmart\'s delivery service has faced criticism for delays, substitutions, and quality issues with grocery items. Consumer sentiment surveys show a 12-point swing toward competitors for online grocery orders. Walmart has announced a $1.5 billion investment in delivery infrastructure, but analysts question if it\'s enough to close the gap.',
      missionId: 'mission-004',
      status: 'in_progress',
      sentiment: -0.42,
      subNarrativeIds: ['sub-013', 'sub-014'],
      factionMentions: {
        'faction-006': { volume: 425, sentiment: 0.65 },
        'faction-005': { volume: 285, sentiment: -0.35 },
        'faction-001': { volume: 185, sentiment: -0.52 }
      },
      sourceVolumes: {
        'src-retaildive': { volume: 125, sentiment: -0.28 },
        'src-modernretail': { volume: 98, sentiment: -0.32 },
        'src-wsj': { volume: 85, sentiment: -0.25 },
        'src-bloomberg': { volume: 78, sentiment: -0.22 },
        'src-x': { volume: 165, sentiment: -0.45 },
        'src-reddit': { volume: 125, sentiment: 0.38 },
        'src-tiktok': { volume: 95, sentiment: 0.42 }
      },
      factionSources: {
        'faction-006': { 'src-reddit': 115, 'src-x': 95, 'src-tiktok': 85, 'src-retaildive': 65, 'src-modernretail': 55 },
        'faction-005': { 'src-retaildive': 85, 'src-wsj': 72, 'src-bloomberg': 68, 'src-modernretail': 60 },
        'faction-001': { 'src-x': 85, 'src-facebook': 55, 'src-reddit': 45 }
      },
      personIds: ['person-001', 'person-013', 'person-014', 'person-015'],
      organizationIds: ['org-001', 'org-003', 'org-004', 'org-012'],
      locationIds: ['loc-001', 'loc-008'],
      eventIds: ['event-012', 'event-013'],
      volumeOverTime: [
        { date: '2026-01-14', factionVolumes: { 'faction-006': 145, 'faction-005': 95, 'faction-001': 62 }, sourceVolumes: { 'src-retaildive': 42, 'src-x': 55, 'src-reddit': 42 } },
        { date: '2026-01-15', factionVolumes: { 'faction-006': 225, 'faction-005': 148, 'faction-001': 95 }, sourceVolumes: { 'src-retaildive': 68, 'src-x': 85, 'src-reddit': 65 } },
        { date: '2026-01-16', factionVolumes: { 'faction-006': 305, 'faction-005': 198, 'faction-001': 128 }, sourceVolumes: { 'src-retaildive': 92, 'src-x': 115, 'src-reddit': 88 } },
        { date: '2026-01-17', factionVolumes: { 'faction-006': 365, 'faction-005': 242, 'faction-001': 155 }, sourceVolumes: { 'src-retaildive': 112, 'src-x': 142, 'src-reddit': 108 } },
        { date: '2026-01-18', factionVolumes: { 'faction-006': 425, 'faction-005': 285, 'faction-001': 185 }, sourceVolumes: { 'src-retaildive': 125, 'src-x': 165, 'src-reddit': 125 } }
      ],
      documentIds: ['doc-018', 'doc-019', 'doc-020'],
      createdAt: '2026-01-14T00:00:00Z'
    },
    {
      id: 'narr-007',
      text: 'Rural community protests Walmart store closure, citing economic devastation',
      description: 'Residents of several small towns across the Midwest and South are protesting Walmart\'s decision to close underperforming stores, arguing the closures will devastate local economies. In many of these communities, Walmart had previously driven out local retailers, leaving residents with no nearby shopping options. Local politicians are calling for Walmart to maintain stores as community obligations. The narrative intersects with broader discussions about corporate responsibility to rural America.',
      missionId: 'mission-001',
      status: 'new',
      sentiment: -0.65,
      subNarrativeIds: ['sub-015', 'sub-016'],
      factionMentions: {
        'faction-001': { volume: 285, sentiment: -0.75 },
        'faction-003': { volume: 165, sentiment: -0.68 },
        'faction-005': { volume: 125, sentiment: -0.35 }
      },
      sourceVolumes: {
        'src-localnews': { volume: 225, sentiment: -0.65 },
        'src-facebook': { volume: 185, sentiment: -0.72 },
        'src-x': { volume: 125, sentiment: -0.58 },
        'src-usatoday': { volume: 65, sentiment: -0.45 },
        'src-wsj': { volume: 42, sentiment: -0.28 },
        'src-ap': { volume: 38, sentiment: -0.32 }
      },
      factionSources: {
        'faction-001': { 'src-facebook': 145, 'src-localnews': 85, 'src-x': 55 },
        'faction-003': { 'src-localnews': 75, 'src-x': 55, 'src-facebook': 35 },
        'faction-005': { 'src-wsj': 38, 'src-usatoday': 35, 'src-ap': 28, 'src-bloomberg': 24 }
      },
      personIds: ['person-001', 'person-016', 'person-017'],
      organizationIds: ['org-001', 'org-013'],
      locationIds: ['loc-009', 'loc-010'],
      eventIds: ['event-014'],
      volumeOverTime: [
        { date: '2026-01-18', factionVolumes: { 'faction-001': 95, 'faction-003': 55, 'faction-005': 42 }, sourceVolumes: { 'src-localnews': 75, 'src-facebook': 62, 'src-x': 42 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 185, 'faction-003': 108, 'faction-005': 82 }, sourceVolumes: { 'src-localnews': 148, 'src-facebook': 122, 'src-x': 82 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 285, 'faction-003': 165, 'faction-005': 125 }, sourceVolumes: { 'src-localnews': 225, 'src-facebook': 185, 'src-x': 125 } }
      ],
      documentIds: ['doc-021', 'doc-022', 'doc-023'],
      createdAt: '2026-01-18T00:00:00Z'
    }
  ],

  subNarratives: [
    {
      id: 'sub-001',
      text: 'Viral TikTok videos show customers being stopped and searched at self-checkout',
      description: 'Multiple viral videos with millions of views show Walmart customers being stopped by loss prevention staff at self-checkout, asked to show receipts, and having bags searched. Many videos show customers being accused of theft for items they legitimately purchased.',
      parentNarrativeId: 'narr-001',
      sentiment: -0.78,
      factionMentions: {
        'faction-001': { volume: 385, sentiment: -0.85 }
      },
      personIds: [],
      organizationIds: ['org-001'],
      locationIds: ['loc-002', 'loc-003'],
      eventIds: ['event-001'],
      volumeOverTime: [
        { date: '2026-01-16', factionVolumes: { 'faction-001': 125 } },
        { date: '2026-01-17', factionVolumes: { 'faction-001': 225 } },
        { date: '2026-01-18', factionVolumes: { 'faction-001': 315 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 385 } }
      ]
    },
    {
      id: 'sub-002',
      text: 'Class-action lawsuit filed against Walmart for false detention of customers',
      description: 'A Texas law firm has filed a class-action lawsuit alleging Walmart systematically detains customers based on receipt checks without probable cause, seeking damages for thousands of affected shoppers.',
      parentNarrativeId: 'narr-001',
      sentiment: -0.65,
      factionMentions: {
        'faction-001': { volume: 185, sentiment: -0.72 },
        'faction-005': { volume: 95, sentiment: -0.45 }
      },
      personIds: ['person-008'],
      organizationIds: ['org-001', 'org-002'],
      locationIds: ['loc-002'],
      eventIds: ['event-002'],
      volumeOverTime: [
        { date: '2026-01-18', factionVolumes: { 'faction-001': 65, 'faction-005': 32 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 125, 'faction-005': 65 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 185, 'faction-005': 95 } }
      ]
    },
    {
      id: 'sub-003',
      text: 'Walmart announces plans to add more staffed checkout lanes',
      description: 'In response to customer backlash, Walmart has announced plans to increase staffed checkout options in 500 stores, though critics note this still represents less than 15% of locations.',
      parentNarrativeId: 'narr-001',
      sentiment: 0.15,
      factionMentions: {
        'faction-001': { volume: 145, sentiment: 0.25 },
        'faction-005': { volume: 85, sentiment: 0.35 }
      },
      personIds: ['person-001', 'person-002'],
      organizationIds: ['org-001'],
      locationIds: ['loc-001'],
      eventIds: ['event-003'],
      volumeOverTime: [
        { date: '2026-01-19', factionVolumes: { 'faction-001': 48, 'faction-005': 28 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 145, 'faction-005': 85 } }
      ]
    },
    {
      id: 'sub-004',
      text: 'Photos of bare shelves shared widely on social media',
      description: 'Customers are posting photos of empty aisles and shelves, particularly in grocery, cleaning supplies, and pet food sections, with the hashtag #WalmartShelves gaining traction.',
      parentNarrativeId: 'narr-002',
      sentiment: -0.72,
      factionMentions: {
        'faction-001': { volume: 285, sentiment: -0.78 }
      },
      personIds: [],
      organizationIds: ['org-001'],
      locationIds: ['loc-004', 'loc-005'],
      eventIds: ['event-004'],
      volumeOverTime: [
        { date: '2026-01-16', factionVolumes: { 'faction-001': 95 } },
        { date: '2026-01-17', factionVolumes: { 'faction-001': 165 } },
        { date: '2026-01-18', factionVolumes: { 'faction-001': 225 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 285 } }
      ]
    },
    {
      id: 'sub-005',
      text: 'Retail analysts question Walmart\'s inventory management systems',
      description: 'Industry analysts are publishing reports suggesting Walmart\'s inventory management technology has fallen behind competitors, contributing to stock-out issues.',
      parentNarrativeId: 'narr-002',
      sentiment: -0.42,
      factionMentions: {
        'faction-005': { volume: 125, sentiment: -0.48 }
      },
      personIds: ['person-010'],
      organizationIds: ['org-001', 'org-003'],
      locationIds: [],
      eventIds: ['event-005'],
      volumeOverTime: [
        { date: '2026-01-17', factionVolumes: { 'faction-005': 42 } },
        { date: '2026-01-18', factionVolumes: { 'faction-005': 85 } },
        { date: '2026-01-19', factionVolumes: { 'faction-005': 125 } }
      ]
    },
    {
      id: 'sub-006',
      text: 'TikTok videos from workers show understaffed stores and overwhelming workloads',
      description: 'Current Walmart employees are posting videos showing empty departments, long customer lines, and workers trying to manage multiple areas simultaneously.',
      parentNarrativeId: 'narr-003',
      sentiment: -0.75,
      factionMentions: {
        'faction-002': { volume: 285, sentiment: -0.82 }
      },
      personIds: [],
      organizationIds: ['org-001'],
      locationIds: [],
      eventIds: ['event-006'],
      volumeOverTime: [
        { date: '2026-01-14', factionVolumes: { 'faction-002': 92 } },
        { date: '2026-01-15', factionVolumes: { 'faction-002': 155 } },
        { date: '2026-01-16', factionVolumes: { 'faction-002': 215 } },
        { date: '2026-01-17', factionVolumes: { 'faction-002': 255 } },
        { date: '2026-01-18', factionVolumes: { 'faction-002': 285 } }
      ]
    },
    {
      id: 'sub-007',
      text: 'UFCW calls for improved wages and working conditions at Walmart',
      description: 'The United Food and Commercial Workers union has launched a campaign highlighting worker conditions at Walmart, calling for $18 minimum wage and predictable scheduling.',
      parentNarrativeId: 'narr-003',
      sentiment: -0.68,
      factionMentions: {
        'faction-003': { volume: 225, sentiment: -0.78 }
      },
      personIds: ['person-003', 'person-004'],
      organizationIds: ['org-005'],
      locationIds: ['loc-001'],
      eventIds: ['event-007'],
      volumeOverTime: [
        { date: '2026-01-15', factionVolumes: { 'faction-003': 75 } },
        { date: '2026-01-16', factionVolumes: { 'faction-003': 135 } },
        { date: '2026-01-17', factionVolumes: { 'faction-003': 185 } },
        { date: '2026-01-18', factionVolumes: { 'faction-003': 225 } }
      ]
    },
    {
      id: 'sub-008',
      text: 'Walmart defends associate benefits and $14 minimum wage',
      description: 'Walmart has issued statements highlighting its benefits package including healthcare, 401k matching, and tuition assistance, defending its starting wage as competitive.',
      parentNarrativeId: 'narr-003',
      sentiment: 0.25,
      factionMentions: {
        'faction-005': { volume: 85, sentiment: 0.35 }
      },
      personIds: ['person-001', 'person-005'],
      organizationIds: ['org-001'],
      locationIds: ['loc-001'],
      eventIds: [],
      volumeOverTime: [
        { date: '2026-01-17', factionVolumes: { 'faction-005': 28 } },
        { date: '2026-01-18', factionVolumes: { 'faction-005': 85 } }
      ]
    },
    {
      id: 'sub-009',
      text: 'FDA expands Great Value recall to 15 product SKUs',
      description: 'The FDA has expanded its recall of Great Value brand frozen vegetables and salad mixes, now covering 15 different products sold nationwide.',
      parentNarrativeId: 'narr-004',
      sentiment: -0.78,
      factionMentions: {
        'faction-004': { volume: 245, sentiment: -0.85 },
        'faction-001': { volume: 165, sentiment: -0.75 }
      },
      personIds: ['person-006'],
      organizationIds: ['org-001', 'org-007'],
      locationIds: ['loc-007'],
      eventIds: ['event-008', 'event-009'],
      volumeOverTime: [
        { date: '2026-01-17', factionVolumes: { 'faction-004': 85, 'faction-001': 55 } },
        { date: '2026-01-18', factionVolumes: { 'faction-004': 165, 'faction-001': 115 } },
        { date: '2026-01-19', factionVolumes: { 'faction-004': 215, 'faction-001': 145 } },
        { date: '2026-01-20', factionVolumes: { 'faction-004': 245, 'faction-001': 165 } }
      ]
    },
    {
      id: 'sub-010',
      text: 'Consumer advocacy groups call for stricter private-label quality controls',
      description: 'Consumer Reports and other advocacy organizations are calling for enhanced quality control requirements for store-brand products following the contamination incident.',
      parentNarrativeId: 'narr-004',
      sentiment: -0.62,
      factionMentions: {
        'faction-004': { volume: 165, sentiment: -0.72 }
      },
      personIds: ['person-007', 'person-011'],
      organizationIds: ['org-008', 'org-009'],
      locationIds: [],
      eventIds: ['event-010'],
      volumeOverTime: [
        { date: '2026-01-18', factionVolumes: { 'faction-004': 55 } },
        { date: '2026-01-19', factionVolumes: { 'faction-004': 115 } },
        { date: '2026-01-20', factionVolumes: { 'faction-004': 165 } }
      ]
    },
    {
      id: 'sub-011',
      text: 'Viral price comparison videos show Walmart losing to Aldi on staple items',
      description: 'TikTok creators posting side-by-side price comparisons are showing Aldi beating Walmart prices on milk, eggs, bread, and other staples by 15-25%.',
      parentNarrativeId: 'narr-005',
      sentiment: -0.68,
      factionMentions: {
        'faction-001': { volume: 225, sentiment: -0.75 },
        'faction-006': { volume: 125, sentiment: 0.55 }
      },
      personIds: [],
      organizationIds: ['org-001', 'org-010'],
      locationIds: [],
      eventIds: [],
      volumeOverTime: [
        { date: '2026-01-18', factionVolumes: { 'faction-001': 75, 'faction-006': 42 } },
        { date: '2026-01-19', factionVolumes: { 'faction-001': 155, 'faction-006': 85 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 225, 'faction-006': 125 } }
      ]
    },
    {
      id: 'sub-012',
      text: 'Analysis shows Walmart retained pandemic price increases despite lower costs',
      description: 'Retail analysts have published data showing Walmart maintained elevated prices on many products even after wholesale costs normalized, contradicting the "Everyday Low Prices" promise.',
      parentNarrativeId: 'narr-005',
      sentiment: -0.55,
      factionMentions: {
        'faction-005': { volume: 145, sentiment: -0.52 },
        'faction-001': { volume: 95, sentiment: -0.65 }
      },
      personIds: ['person-010', 'person-012'],
      organizationIds: ['org-001'],
      locationIds: [],
      eventIds: ['event-011'],
      volumeOverTime: [
        { date: '2026-01-18', factionVolumes: { 'faction-005': 48, 'faction-001': 32 } },
        { date: '2026-01-19', factionVolumes: { 'faction-005': 98, 'faction-001': 65 } },
        { date: '2026-01-20', factionVolumes: { 'faction-005': 145, 'faction-001': 95 } }
      ]
    },
    {
      id: 'sub-013',
      text: 'Target achieves 98% on-time delivery rate, outpacing Walmart',
      description: 'Target reported its Shipt same-day delivery service achieved 98% on-time delivery rates in Q4, significantly ahead of Walmart\'s reported 89% rate.',
      parentNarrativeId: 'narr-006',
      sentiment: 0.55,
      factionMentions: {
        'faction-006': { volume: 265, sentiment: 0.72 },
        'faction-005': { volume: 145, sentiment: -0.28 }
      },
      personIds: ['person-013'],
      organizationIds: ['org-003', 'org-001'],
      locationIds: [],
      eventIds: ['event-012'],
      volumeOverTime: [
        { date: '2026-01-15', factionVolumes: { 'faction-006': 88, 'faction-005': 48 } },
        { date: '2026-01-16', factionVolumes: { 'faction-006': 155, 'faction-005': 85 } },
        { date: '2026-01-17', factionVolumes: { 'faction-006': 215, 'faction-005': 118 } },
        { date: '2026-01-18', factionVolumes: { 'faction-006': 265, 'faction-005': 145 } }
      ]
    },
    {
      id: 'sub-014',
      text: 'Amazon expands sub-24-hour delivery to 85% of US population',
      description: 'Amazon announced its Prime delivery network now covers 85% of the US population with under-24-hour delivery, up from 72% last year.',
      parentNarrativeId: 'narr-006',
      sentiment: 0.48,
      factionMentions: {
        'faction-006': { volume: 185, sentiment: 0.65 }
      },
      personIds: ['person-014'],
      organizationIds: ['org-004'],
      locationIds: ['loc-008'],
      eventIds: ['event-013'],
      volumeOverTime: [
        { date: '2026-01-16', factionVolumes: { 'faction-006': 62 } },
        { date: '2026-01-17', factionVolumes: { 'faction-006': 118 } },
        { date: '2026-01-18', factionVolumes: { 'faction-006': 185 } }
      ]
    },
    {
      id: 'sub-015',
      text: 'Small town residents protest Walmart closure as only local retailer',
      description: 'Residents in rural communities are organizing protests against Walmart store closures, arguing Walmart drove out local businesses and now abandoning the community.',
      parentNarrativeId: 'narr-007',
      sentiment: -0.72,
      factionMentions: {
        'faction-001': { volume: 185, sentiment: -0.78 },
        'faction-003': { volume: 115, sentiment: -0.72 }
      },
      personIds: ['person-016', 'person-017'],
      organizationIds: ['org-001', 'org-013'],
      locationIds: ['loc-009', 'loc-010'],
      eventIds: ['event-014'],
      volumeOverTime: [
        { date: '2026-01-19', factionVolumes: { 'faction-001': 62, 'faction-003': 38 } },
        { date: '2026-01-20', factionVolumes: { 'faction-001': 185, 'faction-003': 115 } }
      ]
    },
    {
      id: 'sub-016',
      text: 'Local politicians call for corporate responsibility to rural communities',
      description: 'State legislators and mayors are calling for Walmart to maintain stores in rural areas as a form of corporate responsibility, with some proposing legislation requiring notice periods.',
      parentNarrativeId: 'narr-007',
      sentiment: -0.58,
      factionMentions: {
        'faction-003': { volume: 85, sentiment: -0.65 },
        'faction-005': { volume: 65, sentiment: -0.42 }
      },
      personIds: ['person-017'],
      organizationIds: ['org-001', 'org-013'],
      locationIds: ['loc-009'],
      eventIds: [],
      volumeOverTime: [
        { date: '2026-01-19', factionVolumes: { 'faction-003': 28, 'faction-005': 22 } },
        { date: '2026-01-20', factionVolumes: { 'faction-003': 85, 'faction-005': 65 } }
      ]
    }
  ],

  factions: [
    {
      id: 'faction-001',
      name: 'Disgruntled Customers',
      color: '#E15759',
      relatedFactionIds: ['faction-004'],
      memberCount: 15000000,
      affiliatedPersonIds: [],
      affiliatedOrganizationIds: []
    },
    {
      id: 'faction-002',
      name: 'Walmart Employees',
      color: '#4E79A7',
      relatedFactionIds: ['faction-003'],
      memberCount: 2300000,
      affiliatedPersonIds: [],
      affiliatedOrganizationIds: ['org-005']
    },
    {
      id: 'faction-003',
      name: 'Labor Rights Advocates',
      color: '#B07AA1',
      relatedFactionIds: ['faction-002'],
      memberCount: 5000000,
      affiliatedPersonIds: ['person-003', 'person-004'],
      affiliatedOrganizationIds: ['org-005', 'org-006']
    },
    {
      id: 'faction-004',
      name: 'Consumer Safety Advocates',
      color: '#F28E2B',
      relatedFactionIds: ['faction-001'],
      memberCount: 3000000,
      affiliatedPersonIds: ['person-007', 'person-011'],
      affiliatedOrganizationIds: ['org-008', 'org-009']
    },
    {
      id: 'faction-005',
      name: 'Retail Industry Analysts',
      color: '#76B7B2',
      relatedFactionIds: [],
      memberCount: 50000,
      affiliatedPersonIds: ['person-010', 'person-012'],
      affiliatedOrganizationIds: ['org-014', 'org-015']
    },
    {
      id: 'faction-006',
      name: 'Competitor Supporters',
      color: '#59A14F',
      relatedFactionIds: [],
      memberCount: 25000000,
      affiliatedPersonIds: [],
      affiliatedOrganizationIds: ['org-003', 'org-004']
    }
  ],

  factionOverlaps: [
    {
      factionIds: ['faction-001', 'faction-004'],
      overlapSize: 2500000,
      sharedSentiment: { 'narr-004': -0.78 }
    },
    {
      factionIds: ['faction-002', 'faction-003'],
      overlapSize: 500000,
      sharedSentiment: { 'narr-003': -0.75 }
    },
    {
      factionIds: ['faction-001', 'faction-006'],
      overlapSize: 8000000,
      sharedSentiment: { 'narr-005': -0.55 }
    }
  ],

  locations: [
    {
      id: 'loc-001',
      name: 'Bentonville, Arkansas',
      coordinates: { lat: 36.3729, lng: -94.2088 },
      type: 'headquarters'
    },
    {
      id: 'loc-002',
      name: 'Houston, Texas',
      coordinates: { lat: 29.7604, lng: -95.3698 },
      type: 'city'
    },
    {
      id: 'loc-003',
      name: 'Atlanta, Georgia',
      coordinates: { lat: 33.7490, lng: -84.3880 },
      type: 'city'
    },
    {
      id: 'loc-004',
      name: 'Chicago, Illinois',
      coordinates: { lat: 41.8781, lng: -87.6298 },
      type: 'city'
    },
    {
      id: 'loc-005',
      name: 'Los Angeles, California',
      coordinates: { lat: 34.0522, lng: -118.2437 },
      type: 'city'
    },
    {
      id: 'loc-006',
      name: 'Washington, D.C.',
      coordinates: { lat: 38.9072, lng: -77.0369 },
      type: 'city'
    },
    {
      id: 'loc-007',
      name: 'Silver Spring, Maryland',
      coordinates: { lat: 38.9907, lng: -77.0261 },
      type: 'city'
    },
    {
      id: 'loc-008',
      name: 'Seattle, Washington',
      coordinates: { lat: 47.6062, lng: -122.3321 },
      type: 'city'
    },
    {
      id: 'loc-009',
      name: 'Rural Missouri',
      coordinates: { lat: 38.5767, lng: -92.1735 },
      type: 'region'
    },
    {
      id: 'loc-010',
      name: 'Rural Oklahoma',
      coordinates: { lat: 35.4676, lng: -97.5164 },
      type: 'region'
    }
  ],

  events: [
    {
      id: 'event-001',
      text: 'Viral TikTok shows customer detained at self-checkout over misunderstanding',
      date: '2026-01-14T15:30:00Z',
      parentEventId: null,
      subEventIds: ['event-002'],
      locationId: 'loc-002',
      personIds: [],
      organizationIds: ['org-001']
    },
    {
      id: 'event-002',
      text: 'Class-action lawsuit filed against Walmart in Texas federal court',
      date: '2026-01-18T10:00:00Z',
      parentEventId: 'event-001',
      subEventIds: [],
      locationId: 'loc-002',
      personIds: ['person-008'],
      organizationIds: ['org-001', 'org-002']
    },
    {
      id: 'event-003',
      text: 'Walmart announces plan to add staffed checkout lanes in 500 stores',
      date: '2026-01-19T14:00:00Z',
      parentEventId: null,
      subEventIds: [],
      locationId: 'loc-001',
      personIds: ['person-001', 'person-002'],
      organizationIds: ['org-001']
    },
    {
      id: 'event-004',
      text: 'Customer posts photos of empty grocery aisles, goes viral',
      date: '2026-01-15T12:00:00Z',
      parentEventId: null,
      subEventIds: [],
      locationId: 'loc-004',
      personIds: [],
      organizationIds: ['org-001']
    },
    {
      id: 'event-005',
      text: 'Retail Dive publishes analysis of Walmart inventory management issues',
      date: '2026-01-17T09:00:00Z',
      parentEventId: null,
      subEventIds: [],
      locationId: null,
      personIds: ['person-010'],
      organizationIds: ['org-001', 'org-015']
    },
    {
      id: 'event-006',
      text: 'Employee TikTok video showing understaffed store gets 5M views',
      date: '2026-01-13T18:00:00Z',
      parentEventId: null,
      subEventIds: ['event-007'],
      locationId: null,
      personIds: [],
      organizationIds: ['org-001']
    },
    {
      id: 'event-007',
      text: 'UFCW launches #RespectWalmartWorkers campaign',
      date: '2026-01-15T11:00:00Z',
      parentEventId: 'event-006',
      subEventIds: [],
      locationId: 'loc-006',
      personIds: ['person-003', 'person-004'],
      organizationIds: ['org-005']
    },
    {
      id: 'event-008',
      text: 'FDA announces initial recall of Great Value frozen vegetables',
      date: '2026-01-16T10:00:00Z',
      parentEventId: null,
      subEventIds: ['event-009', 'event-010'],
      locationId: 'loc-007',
      personIds: ['person-006'],
      organizationIds: ['org-001', 'org-007']
    },
    {
      id: 'event-009',
      text: 'FDA expands Great Value recall to 15 products',
      date: '2026-01-18T14:00:00Z',
      parentEventId: 'event-008',
      subEventIds: [],
      locationId: 'loc-007',
      personIds: ['person-006'],
      organizationIds: ['org-001', 'org-007']
    },
    {
      id: 'event-010',
      text: 'Consumer Reports calls for stricter private-label quality controls',
      date: '2026-01-19T09:00:00Z',
      parentEventId: 'event-008',
      subEventIds: [],
      locationId: null,
      personIds: ['person-007', 'person-011'],
      organizationIds: ['org-008']
    },
    {
      id: 'event-011',
      text: 'WSJ publishes analysis of Walmart price retention after pandemic',
      date: '2026-01-17T06:00:00Z',
      parentEventId: null,
      subEventIds: [],
      locationId: null,
      personIds: ['person-012'],
      organizationIds: ['org-001']
    },
    {
      id: 'event-012',
      text: 'Target announces 98% on-time delivery achievement',
      date: '2026-01-14T08:00:00Z',
      parentEventId: null,
      subEventIds: [],
      locationId: null,
      personIds: ['person-013'],
      organizationIds: ['org-003']
    },
    {
      id: 'event-013',
      text: 'Amazon expands sub-24-hour delivery coverage to 85% of US',
      date: '2026-01-16T10:00:00Z',
      parentEventId: null,
      subEventIds: [],
      locationId: 'loc-008',
      personIds: ['person-014'],
      organizationIds: ['org-004']
    },
    {
      id: 'event-014',
      text: 'Rural Missouri town holds protest against Walmart store closure',
      date: '2026-01-19T14:00:00Z',
      parentEventId: null,
      subEventIds: [],
      locationId: 'loc-009',
      personIds: ['person-016', 'person-017'],
      organizationIds: ['org-001', 'org-013']
    }
  ],

  persons: [
    {
      id: 'person-001',
      name: 'Doug McMillon',
      type: 'executive',
      imageUrl: null,
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-001'],
      relatedEventIds: ['event-003'],
      documentIds: ['doc-003', 'doc-006'],
      factionSentiment: {
        'faction-001': -0.45,
        'faction-002': -0.38,
        'faction-005': 0.55
      }
    },
    {
      id: 'person-002',
      name: 'John Furner',
      type: 'executive',
      imageUrl: null,
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-001'],
      relatedEventIds: ['event-003'],
      documentIds: ['doc-003'],
      factionSentiment: {
        'faction-001': -0.42,
        'faction-005': 0.48
      }
    },
    {
      id: 'person-003',
      name: 'Marc Perrone',
      type: 'labor_leader',
      imageUrl: null,
      affiliatedFactionIds: ['faction-003'],
      relatedLocationIds: ['loc-006'],
      relatedEventIds: ['event-007'],
      documentIds: ['doc-009', 'doc-010'],
      factionSentiment: {
        'faction-002': 0.75,
        'faction-003': 0.82,
        'faction-001': 0.45
      }
    },
    {
      id: 'person-004',
      name: 'Kim Cordova',
      type: 'labor_leader',
      imageUrl: null,
      affiliatedFactionIds: ['faction-003'],
      relatedLocationIds: ['loc-006'],
      relatedEventIds: ['event-007'],
      documentIds: ['doc-010'],
      factionSentiment: {
        'faction-002': 0.72,
        'faction-003': 0.78
      }
    },
    {
      id: 'person-005',
      name: 'Donna Morris',
      type: 'executive',
      imageUrl: null,
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-001'],
      relatedEventIds: [],
      documentIds: ['doc-011'],
      factionSentiment: {
        'faction-002': -0.35,
        'faction-005': 0.42
      }
    },
    {
      id: 'person-006',
      name: 'Robert Califf',
      type: 'government_official',
      imageUrl: null,
      affiliatedFactionIds: ['faction-004'],
      relatedLocationIds: ['loc-007'],
      relatedEventIds: ['event-008', 'event-009'],
      documentIds: ['doc-012', 'doc-013'],
      factionSentiment: {
        'faction-004': 0.65
      }
    },
    {
      id: 'person-007',
      name: 'Marta Tellado',
      type: 'advocate',
      imageUrl: null,
      affiliatedFactionIds: ['faction-004'],
      relatedLocationIds: [],
      relatedEventIds: ['event-010'],
      documentIds: ['doc-014'],
      factionSentiment: {
        'faction-001': 0.52,
        'faction-004': 0.78
      }
    },
    {
      id: 'person-008',
      name: 'Thomas J. Henry',
      type: 'attorney',
      imageUrl: null,
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-002'],
      relatedEventIds: ['event-002'],
      documentIds: ['doc-002'],
      factionSentiment: {
        'faction-001': 0.65
      }
    },
    {
      id: 'person-009',
      name: 'Judith McKenna',
      type: 'executive',
      imageUrl: null,
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-001'],
      relatedEventIds: [],
      documentIds: ['doc-007'],
      factionSentiment: {
        'faction-005': 0.45
      }
    },
    {
      id: 'person-010',
      name: 'Neil Saunders',
      type: 'analyst',
      imageUrl: null,
      affiliatedFactionIds: ['faction-005'],
      relatedLocationIds: [],
      relatedEventIds: ['event-005'],
      documentIds: ['doc-006', 'doc-016'],
      factionSentiment: {
        'faction-005': 0.72
      }
    },
    {
      id: 'person-011',
      name: 'William Wallace',
      type: 'advocate',
      imageUrl: null,
      affiliatedFactionIds: ['faction-004'],
      relatedLocationIds: [],
      relatedEventIds: ['event-010'],
      documentIds: ['doc-014'],
      factionSentiment: {
        'faction-004': 0.68
      }
    },
    {
      id: 'person-012',
      name: 'Simeon Gutman',
      type: 'analyst',
      imageUrl: null,
      affiliatedFactionIds: ['faction-005'],
      relatedLocationIds: [],
      relatedEventIds: ['event-011'],
      documentIds: ['doc-015', 'doc-017'],
      factionSentiment: {
        'faction-005': 0.68
      }
    },
    {
      id: 'person-013',
      name: 'Brian Cornell',
      type: 'executive',
      imageUrl: null,
      affiliatedFactionIds: ['faction-006'],
      relatedLocationIds: [],
      relatedEventIds: ['event-012'],
      documentIds: ['doc-018'],
      factionSentiment: {
        'faction-006': 0.75
      }
    },
    {
      id: 'person-014',
      name: 'Andy Jassy',
      type: 'executive',
      imageUrl: null,
      affiliatedFactionIds: ['faction-006'],
      relatedLocationIds: ['loc-008'],
      relatedEventIds: ['event-013'],
      documentIds: ['doc-020'],
      factionSentiment: {
        'faction-006': 0.72
      }
    },
    {
      id: 'person-015',
      name: 'Doug Herrington',
      type: 'executive',
      imageUrl: null,
      affiliatedFactionIds: ['faction-006'],
      relatedLocationIds: ['loc-008'],
      relatedEventIds: [],
      documentIds: ['doc-019'],
      factionSentiment: {
        'faction-006': 0.68
      }
    },
    {
      id: 'person-016',
      name: 'Mary Johnson',
      type: 'community_leader',
      imageUrl: null,
      affiliatedFactionIds: ['faction-001'],
      relatedLocationIds: ['loc-009'],
      relatedEventIds: ['event-014'],
      documentIds: ['doc-021'],
      factionSentiment: {
        'faction-001': 0.82,
        'faction-003': 0.65
      }
    },
    {
      id: 'person-017',
      name: 'State Rep. James Williams',
      type: 'politician',
      imageUrl: null,
      affiliatedFactionIds: ['faction-003'],
      relatedLocationIds: ['loc-009'],
      relatedEventIds: ['event-014'],
      documentIds: ['doc-022', 'doc-023'],
      factionSentiment: {
        'faction-001': 0.58,
        'faction-003': 0.72
      }
    }
  ],

  organizations: [
    {
      id: 'org-001',
      name: 'Walmart',
      type: 'retailer',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-001'],
      documentIds: ['doc-001', 'doc-003', 'doc-006', 'doc-011'],
      factionSentiment: {
        'faction-001': -0.65,
        'faction-002': -0.55,
        'faction-003': -0.72,
        'faction-004': -0.58,
        'faction-005': 0.35,
        'faction-006': -0.42
      }
    },
    {
      id: 'org-002',
      name: 'Thomas J. Henry Law Firm',
      type: 'legal',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-002'],
      documentIds: ['doc-002'],
      factionSentiment: {
        'faction-001': 0.55
      }
    },
    {
      id: 'org-003',
      name: 'Target',
      type: 'retailer',
      affiliatedFactionIds: ['faction-006'],
      relatedLocationIds: [],
      documentIds: ['doc-018'],
      factionSentiment: {
        'faction-006': 0.75,
        'faction-005': 0.45
      }
    },
    {
      id: 'org-004',
      name: 'Amazon',
      type: 'retailer',
      affiliatedFactionIds: ['faction-006'],
      relatedLocationIds: ['loc-008'],
      documentIds: ['doc-019', 'doc-020'],
      factionSentiment: {
        'faction-006': 0.72,
        'faction-005': 0.42
      }
    },
    {
      id: 'org-005',
      name: 'United Food and Commercial Workers (UFCW)',
      type: 'labor_union',
      affiliatedFactionIds: ['faction-002', 'faction-003'],
      relatedLocationIds: ['loc-006'],
      documentIds: ['doc-009', 'doc-010'],
      factionSentiment: {
        'faction-002': 0.82,
        'faction-003': 0.85
      }
    },
    {
      id: 'org-006',
      name: 'Economic Policy Institute',
      type: 'think_tank',
      affiliatedFactionIds: ['faction-003'],
      relatedLocationIds: ['loc-006'],
      documentIds: ['doc-010'],
      factionSentiment: {
        'faction-003': 0.72
      }
    },
    {
      id: 'org-007',
      name: 'FDA',
      type: 'government',
      affiliatedFactionIds: ['faction-004'],
      relatedLocationIds: ['loc-007'],
      documentIds: ['doc-012', 'doc-013'],
      factionSentiment: {
        'faction-004': 0.62
      }
    },
    {
      id: 'org-008',
      name: 'Consumer Reports',
      type: 'advocacy',
      affiliatedFactionIds: ['faction-004'],
      relatedLocationIds: [],
      documentIds: ['doc-014'],
      factionSentiment: {
        'faction-001': 0.55,
        'faction-004': 0.78
      }
    },
    {
      id: 'org-009',
      name: 'Center for Science in the Public Interest',
      type: 'advocacy',
      affiliatedFactionIds: ['faction-004'],
      relatedLocationIds: ['loc-006'],
      documentIds: [],
      factionSentiment: {
        'faction-004': 0.75
      }
    },
    {
      id: 'org-010',
      name: 'Aldi',
      type: 'retailer',
      affiliatedFactionIds: ['faction-006'],
      relatedLocationIds: [],
      documentIds: ['doc-015'],
      factionSentiment: {
        'faction-006': 0.68
      }
    },
    {
      id: 'org-011',
      name: 'Costco',
      type: 'retailer',
      affiliatedFactionIds: ['faction-006'],
      relatedLocationIds: [],
      documentIds: [],
      factionSentiment: {
        'faction-006': 0.72
      }
    },
    {
      id: 'org-012',
      name: 'Sam\'s Club',
      type: 'retailer',
      affiliatedFactionIds: [],
      relatedLocationIds: ['loc-001'],
      documentIds: [],
      factionSentiment: {
        'faction-001': -0.42
      }
    },
    {
      id: 'org-013',
      name: 'Rural Community Alliance',
      type: 'advocacy',
      affiliatedFactionIds: ['faction-003'],
      relatedLocationIds: ['loc-009', 'loc-010'],
      documentIds: ['doc-021', 'doc-022'],
      factionSentiment: {
        'faction-001': 0.65,
        'faction-003': 0.72
      }
    },
    {
      id: 'org-014',
      name: 'GlobalData Retail',
      type: 'research',
      affiliatedFactionIds: ['faction-005'],
      relatedLocationIds: [],
      documentIds: ['doc-006'],
      factionSentiment: {
        'faction-005': 0.75
      }
    },
    {
      id: 'org-015',
      name: 'Retail Dive',
      type: 'media',
      affiliatedFactionIds: ['faction-005'],
      relatedLocationIds: [],
      documentIds: ['doc-007'],
      factionSentiment: {
        'faction-005': 0.68
      }
    }
  ],

  documents: [
    {
      id: 'doc-001',
      title: 'Viral TikTok shows Walmart customer detained for items she purchased',
      url: 'https://tiktok.com/@customer/video/selfcheckout',
      publishedDate: '2026-01-14T16:00:00Z',
      sourceId: 'src-tiktok',
      excerpt: 'A TikTok video with over 8 million views shows a Walmart customer being stopped at self-checkout, accused of not scanning items she claims were in her cart the whole time.',
      narrativeIds: ['narr-001'],
      subNarrativeIds: ['sub-001'],
      personIds: [],
      organizationIds: ['org-001'],
      locationIds: ['loc-002'],
      eventIds: ['event-001']
    },
    {
      id: 'doc-002',
      title: 'Class-action lawsuit accuses Walmart of systematic false detention of customers',
      url: 'https://reuters.com/legal/walmart-class-action-false-detention',
      publishedDate: '2026-01-18T10:30:00Z',
      sourceId: 'src-reuters',
      excerpt: 'A Texas law firm has filed a class-action lawsuit against Walmart, alleging the retailer systematically detains customers at self-checkout without probable cause.',
      narrativeIds: ['narr-001'],
      subNarrativeIds: ['sub-002'],
      personIds: ['person-008'],
      organizationIds: ['org-001', 'org-002'],
      locationIds: ['loc-002'],
      eventIds: ['event-002']
    },
    {
      id: 'doc-003',
      title: 'Walmart to add staffed checkout lanes in 500 stores amid customer backlash',
      url: 'https://wsj.com/retail/walmart-staffed-checkout-expansion',
      publishedDate: '2026-01-19T14:30:00Z',
      sourceId: 'src-wsj',
      excerpt: 'Walmart CEO Doug McMillon announced plans to increase staffed checkout options in response to customer complaints about self-checkout experiences.',
      narrativeIds: ['narr-001'],
      subNarrativeIds: ['sub-003'],
      personIds: ['person-001', 'person-002'],
      organizationIds: ['org-001'],
      locationIds: ['loc-001'],
      eventIds: ['event-003']
    },
    {
      id: 'doc-004',
      title: 'The self-checkout wars: Why Walmart customers are fed up',
      url: 'https://usatoday.com/story/money/retail/walmart-self-checkout-backlash',
      publishedDate: '2026-01-17T08:00:00Z',
      sourceId: 'src-usatoday',
      excerpt: 'Customer frustration with Walmart\'s self-checkout policies has reached a boiling point, with social media filled with complaints about theft accusations.',
      narrativeIds: ['narr-001'],
      subNarrativeIds: ['sub-001', 'sub-002'],
      personIds: [],
      organizationIds: ['org-001'],
      locationIds: [],
      eventIds: []
    },
    {
      id: 'doc-005',
      title: 'Walmart customers share photos of empty shelves across the country',
      url: 'https://reddit.com/r/walmart/empty-shelves-thread',
      publishedDate: '2026-01-15T12:30:00Z',
      sourceId: 'src-reddit',
      excerpt: 'A Reddit thread documenting empty shelves at Walmart stores has garnered thousands of comments, with customers sharing photos from multiple states.',
      narrativeIds: ['narr-002'],
      subNarrativeIds: ['sub-004'],
      personIds: [],
      organizationIds: ['org-001'],
      locationIds: ['loc-004', 'loc-005'],
      eventIds: ['event-004']
    },
    {
      id: 'doc-006',
      title: 'Analysis: Walmart\'s inventory problems signal deeper operational issues',
      url: 'https://retaildive.com/walmart-inventory-analysis',
      publishedDate: '2026-01-17T09:30:00Z',
      sourceId: 'src-retaildive',
      excerpt: 'Retail analyst Neil Saunders argues Walmart\'s persistent stock-out issues suggest the company\'s inventory management systems need significant upgrades.',
      narrativeIds: ['narr-002'],
      subNarrativeIds: ['sub-005'],
      personIds: ['person-010'],
      organizationIds: ['org-001', 'org-014'],
      locationIds: [],
      eventIds: ['event-005']
    },
    {
      id: 'doc-007',
      title: 'Walmart supply chain struggles as competitors improve in-stock rates',
      url: 'https://bloomberg.com/walmart-supply-chain-challenges',
      publishedDate: '2026-01-18T06:00:00Z',
      sourceId: 'src-bloomberg',
      excerpt: 'Walmart faces mounting pressure as Target and Amazon report improved inventory availability while customer complaints about empty shelves continue.',
      narrativeIds: ['narr-002'],
      subNarrativeIds: ['sub-004', 'sub-005'],
      personIds: ['person-009'],
      organizationIds: ['org-001', 'org-003', 'org-004'],
      locationIds: [],
      eventIds: []
    },
    {
      id: 'doc-008',
      title: 'Walmart workers go viral sharing understaffing horror stories on TikTok',
      url: 'https://tiktok.com/tag/walmartworkers',
      publishedDate: '2026-01-13T18:30:00Z',
      sourceId: 'src-tiktok',
      excerpt: 'The hashtag #WalmartWorkers has over 50 million views as employees share videos showing understaffed stores and overwhelming workloads.',
      narrativeIds: ['narr-003'],
      subNarrativeIds: ['sub-006'],
      personIds: [],
      organizationIds: ['org-001'],
      locationIds: [],
      eventIds: ['event-006']
    },
    {
      id: 'doc-009',
      title: 'UFCW launches campaign calling for higher Walmart wages',
      url: 'https://ap.com/ufcw-walmart-wage-campaign',
      publishedDate: '2026-01-15T11:30:00Z',
      sourceId: 'src-ap',
      excerpt: 'The United Food and Commercial Workers union has launched the #RespectWalmartWorkers campaign, calling for an $18 minimum wage and predictable scheduling.',
      narrativeIds: ['narr-003'],
      subNarrativeIds: ['sub-007'],
      personIds: ['person-003'],
      organizationIds: ['org-005'],
      locationIds: ['loc-006'],
      eventIds: ['event-007']
    },
    {
      id: 'doc-010',
      title: 'Labor advocates amplify Walmart worker complaints on social media',
      url: 'https://reuters.com/walmart-labor-social-media',
      publishedDate: '2026-01-16T14:00:00Z',
      sourceId: 'src-reuters',
      excerpt: 'Labor rights organizations are amplifying viral videos from Walmart workers, calling for improved working conditions at the nation\'s largest private employer.',
      narrativeIds: ['narr-003'],
      subNarrativeIds: ['sub-006', 'sub-007'],
      personIds: ['person-003', 'person-004'],
      organizationIds: ['org-005', 'org-006'],
      locationIds: [],
      eventIds: []
    },
    {
      id: 'doc-011',
      title: 'Walmart defends associate benefits package amid wage criticism',
      url: 'https://walmart.com/newsroom/associate-benefits-response',
      publishedDate: '2026-01-17T16:00:00Z',
      sourceId: 'src-wsj',
      excerpt: 'Walmart issued a statement highlighting its benefits package, including healthcare and tuition assistance, defending its $14 starting wage as competitive.',
      narrativeIds: ['narr-003'],
      subNarrativeIds: ['sub-008'],
      personIds: ['person-001', 'person-005'],
      organizationIds: ['org-001'],
      locationIds: ['loc-001'],
      eventIds: []
    },
    {
      id: 'doc-012',
      title: 'FDA recalls Great Value frozen vegetables over Listeria concerns',
      url: 'https://fda.gov/safety/recalls/great-value-frozen-vegetables',
      publishedDate: '2026-01-16T10:30:00Z',
      sourceId: 'src-ap',
      excerpt: 'The FDA has issued a recall for Great Value brand frozen vegetables sold at Walmart stores nationwide due to potential Listeria contamination.',
      narrativeIds: ['narr-004'],
      subNarrativeIds: ['sub-009'],
      personIds: ['person-006'],
      organizationIds: ['org-001', 'org-007'],
      locationIds: ['loc-007'],
      eventIds: ['event-008']
    },
    {
      id: 'doc-013',
      title: 'Great Value recall expands to 15 products after three hospitalizations',
      url: 'https://usatoday.com/story/money/recall/great-value-expansion',
      publishedDate: '2026-01-18T14:30:00Z',
      sourceId: 'src-usatoday',
      excerpt: 'The FDA has expanded the Great Value product recall to 15 SKUs after linking three hospitalizations to Listeria-contaminated frozen vegetables.',
      narrativeIds: ['narr-004'],
      subNarrativeIds: ['sub-009'],
      personIds: ['person-006'],
      organizationIds: ['org-001', 'org-007'],
      locationIds: [],
      eventIds: ['event-009']
    },
    {
      id: 'doc-014',
      title: 'Consumer Reports calls for stricter store-brand quality controls',
      url: 'https://consumerreports.org/food-safety/private-label-quality-controls',
      publishedDate: '2026-01-19T09:30:00Z',
      sourceId: 'src-consumeraffairs',
      excerpt: 'Consumer advocacy group calls for enhanced quality control requirements for private-label products following Walmart\'s Great Value recall.',
      narrativeIds: ['narr-004'],
      subNarrativeIds: ['sub-010'],
      personIds: ['person-007', 'person-011'],
      organizationIds: ['org-008'],
      locationIds: [],
      eventIds: ['event-010']
    },
    {
      id: 'doc-015',
      title: 'TikTok price comparison shows Aldi beating Walmart on staple items',
      url: 'https://tiktok.com/@grocerycompare/walmart-vs-aldi',
      publishedDate: '2026-01-18T12:00:00Z',
      sourceId: 'src-tiktok',
      excerpt: 'A viral TikTok comparing grocery prices shows Aldi beating Walmart by 15-25% on milk, eggs, bread, and other staple items.',
      narrativeIds: ['narr-005'],
      subNarrativeIds: ['sub-011'],
      personIds: [],
      organizationIds: ['org-001', 'org-010'],
      locationIds: [],
      eventIds: []
    },
    {
      id: 'doc-016',
      title: 'Is Walmart still the low-price leader? Analysis says no',
      url: 'https://wsj.com/retail/walmart-pricing-analysis',
      publishedDate: '2026-01-17T06:30:00Z',
      sourceId: 'src-wsj',
      excerpt: 'Wall Street Journal analysis finds Walmart retained pandemic-era price increases on many items even after wholesale costs declined.',
      narrativeIds: ['narr-005'],
      subNarrativeIds: ['sub-012'],
      personIds: ['person-010', 'person-012'],
      organizationIds: ['org-001'],
      locationIds: [],
      eventIds: ['event-011']
    },
    {
      id: 'doc-017',
      title: 'Walmart\'s "Everyday Low Prices" promise under scrutiny',
      url: 'https://bloomberg.com/walmart-pricing-brand-promise',
      publishedDate: '2026-01-19T08:00:00Z',
      sourceId: 'src-bloomberg',
      excerpt: 'Retail analysts question whether Walmart can maintain its core brand identity as price comparisons increasingly favor discount competitors.',
      narrativeIds: ['narr-005'],
      subNarrativeIds: ['sub-011', 'sub-012'],
      personIds: ['person-012'],
      organizationIds: ['org-001'],
      locationIds: [],
      eventIds: []
    },
    {
      id: 'doc-018',
      title: 'Target achieves 98% on-time delivery rate, leads industry',
      url: 'https://retaildive.com/target-delivery-achievement',
      publishedDate: '2026-01-14T08:30:00Z',
      sourceId: 'src-retaildive',
      excerpt: 'Target announced its Shipt same-day delivery service achieved 98% on-time delivery in Q4, significantly outpacing competitors.',
      narrativeIds: ['narr-006'],
      subNarrativeIds: ['sub-013'],
      personIds: ['person-013'],
      organizationIds: ['org-003'],
      locationIds: [],
      eventIds: ['event-012']
    },
    {
      id: 'doc-019',
      title: 'Amazon delivery now covers 85% of US with sub-24-hour shipping',
      url: 'https://modernretail.com/amazon-delivery-expansion',
      publishedDate: '2026-01-16T10:30:00Z',
      sourceId: 'src-modernretail',
      excerpt: 'Amazon has expanded its rapid delivery network to cover 85% of the US population with under-24-hour delivery times.',
      narrativeIds: ['narr-006'],
      subNarrativeIds: ['sub-014'],
      personIds: ['person-015'],
      organizationIds: ['org-004'],
      locationIds: ['loc-008'],
      eventIds: ['event-013']
    },
    {
      id: 'doc-020',
      title: 'Walmart delivery struggles as Target, Amazon pull ahead',
      url: 'https://wsj.com/retail/walmart-delivery-competition',
      publishedDate: '2026-01-17T07:00:00Z',
      sourceId: 'src-wsj',
      excerpt: 'Consumer sentiment surveys show a 12-point swing toward Target and Amazon for online grocery orders as Walmart faces delivery challenges.',
      narrativeIds: ['narr-006'],
      subNarrativeIds: ['sub-013', 'sub-014'],
      personIds: ['person-014'],
      organizationIds: ['org-001', 'org-003', 'org-004'],
      locationIds: [],
      eventIds: []
    },
    {
      id: 'doc-021',
      title: 'Rural Missouri town protests Walmart store closure',
      url: 'https://localnews.com/missouri-walmart-closure-protest',
      publishedDate: '2026-01-19T15:00:00Z',
      sourceId: 'src-localnews',
      excerpt: 'Residents gathered outside a closing Walmart store in rural Missouri, arguing the company drove out local retailers and is now abandoning the community.',
      narrativeIds: ['narr-007'],
      subNarrativeIds: ['sub-015'],
      personIds: ['person-016'],
      organizationIds: ['org-001', 'org-013'],
      locationIds: ['loc-009'],
      eventIds: ['event-014']
    },
    {
      id: 'doc-022',
      title: 'State lawmaker calls for corporate responsibility legislation after Walmart closures',
      url: 'https://ap.com/walmart-closure-legislation-proposal',
      publishedDate: '2026-01-20T09:00:00Z',
      sourceId: 'src-ap',
      excerpt: 'State Representative James Williams has proposed legislation requiring large retailers to provide 180-day notice before closing stores in rural communities.',
      narrativeIds: ['narr-007'],
      subNarrativeIds: ['sub-015', 'sub-016'],
      personIds: ['person-017'],
      organizationIds: ['org-001', 'org-013'],
      locationIds: ['loc-009'],
      eventIds: []
    },
    {
      id: 'doc-023',
      title: 'The Walmart paradox: How the retail giant became rural America\'s only option',
      url: 'https://usatoday.com/story/money/retail/walmart-rural-america',
      publishedDate: '2026-01-20T11:00:00Z',
      sourceId: 'src-usatoday',
      excerpt: 'An investigation into how Walmart\'s expansion drove out local retailers in small towns, leaving communities dependent on stores the company now deems unprofitable.',
      narrativeIds: ['narr-007'],
      subNarrativeIds: ['sub-015', 'sub-016'],
      personIds: ['person-016', 'person-017'],
      organizationIds: ['org-001'],
      locationIds: ['loc-009', 'loc-010'],
      eventIds: ['event-014']
    }
  ]
};

/**
 * Initialize the data store with Walmart brand mock data
 */
export function initializeMockData(dataStore) {
  dataStore.data = { ...mockData };
  dataStore.save();
}

export default mockData;

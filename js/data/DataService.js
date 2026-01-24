/**
 * DataService.js
 * Query layer over DataStore
 * Provides bidirectional relationship queries
 * Supports time range filtering for temporal data
 */

import { dataStore } from './DataStore.js';

// ============================================
// Helper Functions
// ============================================

/**
 * Generic helper to find an entity by ID in a collection
 * @param {string} collection - Name of the collection in dataStore.data
 * @param {string} id - Entity ID to find
 * @returns {Object|undefined} The found entity or undefined
 */
const findById = (collection, id) => {
  const data = dataStore.data[collection];
  return data ? data.find(item => item.id === id) : undefined;
};

/**
 * Generic helper to resolve related entities from an ID array
 * @param {string} sourceCollection - Name of the source collection
 * @param {string} sourceId - ID of the source entity
 * @param {string} relationField - Field name containing the array of related IDs
 * @param {string} targetCollection - Name of the target collection to resolve IDs from
 * @returns {Array} Array of resolved entities (nulls filtered out)
 */
const resolveRelatedEntities = (sourceCollection, sourceId, relationField, targetCollection) => {
  const source = findById(sourceCollection, sourceId);
  if (!source) return [];
  const ids = source[relationField] || [];
  return ids
    .map(id => findById(targetCollection, id))
    .filter(Boolean);
};

/**
 * Generic helper to find entities that reference a given ID in a specific field
 * @param {string} collection - Name of the collection to search
 * @param {string} field - Field name to check (can be array field or direct field)
 * @param {string} targetId - ID to search for
 * @param {boolean} isArrayField - Whether the field is an array (default: true)
 * @returns {Array} Array of matching entities
 */
const findEntitiesReferencing = (collection, field, targetId, isArrayField = true) => {
  const data = dataStore.data[collection] || [];
  if (isArrayField) {
    return data.filter(item => (item[field] || []).includes(targetId));
  }
  return data.filter(item => item[field] === targetId);
};

export const DataService = {
  // ============================================
  // Dataset Information
  // ============================================

  /**
   * Get the current dataset name
   * @returns {string} Display name of the current dataset
   */
  getCurrentDatasetName: () => dataStore.getCurrentDatasetName(),

  /**
   * Get the current dataset ID
   * @returns {string} ID of the current dataset
   */
  getCurrentDatasetId: () => dataStore.getCurrentDataset(),

  // ============================================
  // Time Range Filtering Utilities
  // ============================================

  /**
   * Check if a date falls within a time range
   * @param {string|Date} date - The date to check
   * @param {Object|null} timeRange - { start: Date, end: Date } or null for no filter
   * @returns {boolean}
   */
  isDateInRange: (date, timeRange) => {
    if (!timeRange || !timeRange.start || !timeRange.end) return true;
    const d = new Date(date);
    return d >= timeRange.start && d <= timeRange.end;
  },

  /**
   * Filter volumeOverTime array by time range
   * @param {Array} volumeOverTime - Array of { date, factionVolumes, sourceVolumes }
   * @param {Object|null} timeRange - { start: Date, end: Date } or null
   * @returns {Array} Filtered array
   */
  filterVolumeByTimeRange: (volumeOverTime, timeRange) => {
    if (!volumeOverTime || !timeRange) return volumeOverTime || [];
    return volumeOverTime.filter(entry => DataService.isDateInRange(entry.date, timeRange));
  },

  /**
   * Check if a narrative has activity within a time range
   * @param {Object} narrative - Narrative object with volumeOverTime
   * @param {Object|null} timeRange - { start: Date, end: Date } or null
   * @returns {boolean}
   */
  narrativeHasActivityInRange: (narrative, timeRange) => {
    if (!timeRange) return true;
    if (!narrative.volumeOverTime || !narrative.volumeOverTime.length) {
      // Check createdAt as fallback
      return DataService.isDateInRange(narrative.createdAt, timeRange);
    }
    return narrative.volumeOverTime.some(entry => DataService.isDateInRange(entry.date, timeRange));
  },

  // ============================================
  // Direct Getters
  // ============================================

  // Missions
  getMissions: () => dataStore.data.missions,
  getMission: (id) => findById('missions', id),

  // Narratives - now supports time range filtering
  getNarratives: (missionId = null, timeRange = null) => {
    let narratives = dataStore.data.narratives;
    
    // Filter by mission
    if (missionId && missionId !== 'all') {
      narratives = narratives.filter(n => n.missionId === missionId);
    }
    
    // Filter by time range
    if (timeRange) {
      narratives = narratives.filter(n => DataService.narrativeHasActivityInRange(n, timeRange));
    }
    
    return narratives;
  },
  getNarrative: (id) => findById('narratives', id),
  getNarrativeById: (id) => findById('narratives', id),
  
  // Get narratives by status (with optional time range)
  getNarrativesByStatus: (status, timeRange = null) => {
    let narratives = dataStore.data.narratives.filter(n => (n.status || 'new') === status);
    if (timeRange) {
      narratives = narratives.filter(n => DataService.narrativeHasActivityInRange(n, timeRange));
    }
    return narratives;
  },
  
  // Get status counts (with optional time range)
  getNarrativeStatusCounts: (timeRange = null) => {
    const counts = { new: 0, in_progress: 0, under_investigation: 0, resolved: 0 };
    let narratives = dataStore.data.narratives;
    
    if (timeRange) {
      narratives = narratives.filter(n => DataService.narrativeHasActivityInRange(n, timeRange));
    }
    
    narratives.forEach(n => {
      const status = n.status || 'new';
      counts[status] = (counts[status] || 0) + 1;
    });
    return counts;
  },

  // Themes
  getSubNarratives: () => dataStore.data.subNarratives,
  getSubNarrative: (id) => findById('subNarratives', id),
  getSubNarrativeById: (id) => findById('subNarratives', id),

  // Factions
  getFactions: () => dataStore.data.factions,
  getFaction: (id) => findById('factions', id),
  getFactionById: (id) => findById('factions', id),
  getFactionOverlaps: () => dataStore.data.factionOverlaps,

  // Locations
  getLocations: () => dataStore.data.locations,
  getLocation: (id) => findById('locations', id),
  getLocationById: (id) => findById('locations', id),

  // Events
  getEvents: () => dataStore.data.events,
  getEvent: (id) => findById('events', id),
  getEventById: (id) => findById('events', id),

  // Persons
  getPersons: () => dataStore.data.persons,
  getPerson: (id) => findById('persons', id),
  getPersonById: (id) => findById('persons', id),

  // Organizations
  getOrganizations: () => dataStore.data.organizations,
  getOrganization: (id) => findById('organizations', id),
  getOrganizationById: (id) => findById('organizations', id),

  // Documents
  getDocuments: () => dataStore.data.documents || [],
  getDocument: (id) => findById('documents', id),
  getDocumentById: (id) => findById('documents', id),

  // Monitors
  getMonitors: () => dataStore.data.monitors || [],
  getMonitor: (id) => findById('monitors', id),
  getMonitorById: (id) => findById('monitors', id),
  getActiveMonitors: () => (dataStore.data.monitors || []).filter(m => m.enabled),
  
  // Alerts
  getAlerts: () => dataStore.data.alerts || [],
  getAlert: (id) => findById('alerts', id),
  getAlertById: (id) => findById('alerts', id),
  getAlertsForMonitor: (monitorId) => (dataStore.data.alerts || []).filter(a => a.monitorId === monitorId),
  getUnacknowledgedAlerts: () => (dataStore.data.alerts || []).filter(a => !a.acknowledged),
  getRecentAlerts: (limit = 10) => {
    return [...(dataStore.data.alerts || [])]
      .sort((a, b) => new Date(b.triggeredAt) - new Date(a.triggeredAt))
      .slice(0, limit);
  },

  // Sources
  getSources: () => dataStore.data.sources || [],
  getSource: (id) => findById('sources', id),
  getSourceCategories: () => dataStore.data.sourceCategories || [],
  
  getSourcesByType: (type) => {
    return (dataStore.data.sources || []).filter(s => s.type === type);
  },
  
  getSocialSources: () => {
    return (dataStore.data.sources || []).filter(s => s.type === 'social');
  },
  
  getNewsSources: () => {
    return (dataStore.data.sources || []).filter(s => 
      s.type === 'national_news' || s.type === 'international_news'
    );
  },
  
  getNationalNewsSources: () => {
    return (dataStore.data.sources || []).filter(s => s.type === 'national_news');
  },
  
  getInternationalNewsSources: () => {
    return (dataStore.data.sources || []).filter(s => s.type === 'international_news');
  },

  // ============================================
  // Narrative Relationships
  // ============================================

  getSubNarrativesForNarrative: (narrativeId) =>
    dataStore.data.subNarratives.filter(s => s.parentNarrativeId === narrativeId),

  getFactionsForNarrative: (narrativeId) => {
    const narrative = dataStore.data.narratives.find(n => n.id === narrativeId);
    if (!narrative || !narrative.factionMentions) return [];
    return Object.entries(narrative.factionMentions).map(([factionId, data]) => ({
      faction: dataStore.data.factions.find(f => f.id === factionId),
      ...data
    })).filter(f => f.faction);
  },

  getPersonsForNarrative: (narrativeId) => 
    resolveRelatedEntities('narratives', narrativeId, 'personIds', 'persons'),

  getOrganizationsForNarrative: (narrativeId) => 
    resolveRelatedEntities('narratives', narrativeId, 'organizationIds', 'organizations'),

  getLocationsForNarrative: (narrativeId) => 
    resolveRelatedEntities('narratives', narrativeId, 'locationIds', 'locations'),

  getEventsForNarrative: (narrativeId) => 
    resolveRelatedEntities('narratives', narrativeId, 'eventIds', 'events'),

  // ============================================
  // SubNarrative Relationships (same as Narrative)
  // ============================================

  getFactionsForSubNarrative: (subNarrativeId) => {
    const sub = dataStore.data.subNarratives.find(s => s.id === subNarrativeId);
    if (!sub || !sub.factionMentions) return [];
    return Object.entries(sub.factionMentions).map(([factionId, data]) => ({
      faction: dataStore.data.factions.find(f => f.id === factionId),
      ...data
    })).filter(f => f.faction);
  },

  getParentNarrative: (subNarrativeId) => {
    const sub = findById('subNarratives', subNarrativeId);
    if (!sub) return null;
    return findById('narratives', sub.parentNarrativeId);
  },

  // ============================================
  // Faction Relationships
  // ============================================

  getNarrativesForFaction: (factionId) => {
    return dataStore.data.narratives.filter(n =>
      n.factionMentions && n.factionMentions[factionId]
    );
  },

  getSubNarrativesForFaction: (factionId) => {
    return dataStore.data.subNarratives.filter(s =>
      s.factionMentions && s.factionMentions[factionId]
    );
  },

  getRelatedFactions: (factionId) => 
    resolveRelatedEntities('factions', factionId, 'relatedFactionIds', 'factions'),

  getFactionOverlapsFor: (factionId) => {
    return dataStore.data.factionOverlaps.filter(o =>
      o.factionIds.includes(factionId)
    );
  },

  getAffiliatedPersonsForFaction: (factionId) => 
    resolveRelatedEntities('factions', factionId, 'affiliatedPersonIds', 'persons'),

  getAffiliatedOrganizationsForFaction: (factionId) => 
    resolveRelatedEntities('factions', factionId, 'affiliatedOrganizationIds', 'organizations'),

  // ============================================
  // Location Relationships
  // ============================================

  getNarrativesForLocation: (locationId) => 
    findEntitiesReferencing('narratives', 'locationIds', locationId),

  getSubNarrativesForLocation: (locationId) => 
    findEntitiesReferencing('subNarratives', 'locationIds', locationId),

  getEventsForLocation: (locationId) => 
    findEntitiesReferencing('events', 'locationId', locationId, false),

  getPersonsForLocation: (locationId) => 
    findEntitiesReferencing('persons', 'relatedLocationIds', locationId),

  getOrganizationsForLocation: (locationId) => 
    findEntitiesReferencing('organizations', 'relatedLocationIds', locationId),

  // ============================================
  // Event Relationships
  // ============================================

  getSubEventsForEvent: (eventId) => 
    resolveRelatedEntities('events', eventId, 'subEventIds', 'events'),

  getParentEvent: (eventId) => {
    const event = findById('events', eventId);
    if (!event || !event.parentEventId) return null;
    return findById('events', event.parentEventId);
  },

  getLocationForEvent: (eventId) => {
    const event = findById('events', eventId);
    if (!event || !event.locationId) return null;
    return findById('locations', event.locationId);
  },

  getPersonsForEvent: (eventId) => 
    resolveRelatedEntities('events', eventId, 'personIds', 'persons'),

  getOrganizationsForEvent: (eventId) => 
    resolveRelatedEntities('events', eventId, 'organizationIds', 'organizations'),

  getNarrativesForEvent: (eventId) => 
    findEntitiesReferencing('narratives', 'eventIds', eventId),

  getSubNarrativesForEvent: (eventId) => 
    findEntitiesReferencing('subNarratives', 'eventIds', eventId),

  // ============================================
  // Person Relationships
  // ============================================

  getNarrativesForPerson: (personId) => 
    findEntitiesReferencing('narratives', 'personIds', personId),

  getSubNarrativesForPerson: (personId) => 
    findEntitiesReferencing('subNarratives', 'personIds', personId),

  /**
   * Get related persons by finding other people who appear in the same narratives.
   * Two people are related if they are mentioned together in at least one narrative.
   */
  getRelatedPersons: (personId) => {
    const narratives = dataStore.data.narratives.filter(n =>
      (n.personIds || []).includes(personId)
    );
    
    // Collect all other person IDs from these narratives
    const relatedIds = new Set();
    narratives.forEach(n => {
      (n.personIds || []).forEach(pId => {
        if (pId !== personId) relatedIds.add(pId);
      });
    });
    
    return [...relatedIds]
      .map(pid => dataStore.data.persons.find(p => p.id === pid))
      .filter(Boolean);
  },

  /**
   * Get related organizations by finding orgs that appear in the same narratives as this person.
   */
  getRelatedOrganizationsForPerson: (personId) => {
    const narratives = dataStore.data.narratives.filter(n =>
      (n.personIds || []).includes(personId)
    );
    
    // Collect all organization IDs from these narratives
    const relatedIds = new Set();
    narratives.forEach(n => {
      (n.organizationIds || []).forEach(oId => relatedIds.add(oId));
    });
    
    return [...relatedIds]
      .map(oid => dataStore.data.organizations.find(o => o.id === oid))
      .filter(Boolean);
  },

  getAffiliatedFactionsForPerson: (personId) => 
    resolveRelatedEntities('persons', personId, 'affiliatedFactionIds', 'factions'),

  getLocationsForPerson: (personId) => 
    resolveRelatedEntities('persons', personId, 'relatedLocationIds', 'locations'),

  getEventsForPerson: (personId) => 
    resolveRelatedEntities('persons', personId, 'relatedEventIds', 'events'),

  // ============================================
  // Organization Relationships
  // ============================================

  getNarrativesForOrganization: (orgId) => 
    findEntitiesReferencing('narratives', 'organizationIds', orgId),

  getSubNarrativesForOrganization: (orgId) => 
    findEntitiesReferencing('subNarratives', 'organizationIds', orgId),

  /**
   * Get related persons by finding people who appear in the same narratives as this org.
   */
  getRelatedPersonsForOrganization: (orgId) => {
    const narratives = dataStore.data.narratives.filter(n =>
      (n.organizationIds || []).includes(orgId)
    );
    
    // Collect all person IDs from these narratives
    const relatedIds = new Set();
    narratives.forEach(n => {
      (n.personIds || []).forEach(pId => relatedIds.add(pId));
    });
    
    return [...relatedIds]
      .map(pid => dataStore.data.persons.find(p => p.id === pid))
      .filter(Boolean);
  },

  /**
   * Get related organizations by finding other orgs that appear in the same narratives.
   */
  getRelatedOrganizations: (orgId) => {
    const narratives = dataStore.data.narratives.filter(n =>
      (n.organizationIds || []).includes(orgId)
    );
    
    // Collect all other organization IDs from these narratives
    const relatedIds = new Set();
    narratives.forEach(n => {
      (n.organizationIds || []).forEach(oId => {
        if (oId !== orgId) relatedIds.add(oId);
      });
    });
    
    return [...relatedIds]
      .map(oid => dataStore.data.organizations.find(o => o.id === oid))
      .filter(Boolean);
  },

  getAffiliatedFactionsForOrganization: (orgId) => 
    resolveRelatedEntities('organizations', orgId, 'affiliatedFactionIds', 'factions'),

  getLocationsForOrganization: (orgId) => 
    resolveRelatedEntities('organizations', orgId, 'relatedLocationIds', 'locations'),

  // ============================================
  // Document Relationships
  // ============================================

  /**
   * Get documents for a narrative
   */
  getDocumentsForNarrative: (narrativeId) => {
    const narrative = dataStore.data.narratives.find(n => n.id === narrativeId);
    if (!narrative) return [];
    return (narrative.documentIds || [])
      .map(did => (dataStore.data.documents || []).find(d => d.id === did))
      .filter(Boolean)
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  },

  /**
   * Get documents for a theme
   */
  getDocumentsForSubNarrative: (subNarrativeId) => {
    const subNarrative = dataStore.data.subNarratives.find(s => s.id === subNarrativeId);
    if (!subNarrative) return [];
    return (subNarrative.documentIds || [])
      .map(did => (dataStore.data.documents || []).find(d => d.id === did))
      .filter(Boolean)
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  },

  /**
   * Get documents for a person
   */
  getDocumentsForPerson: (personId) => {
    const person = dataStore.data.persons.find(p => p.id === personId);
    if (!person) return [];
    return (person.documentIds || [])
      .map(did => (dataStore.data.documents || []).find(d => d.id === did))
      .filter(Boolean)
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  },

  /**
   * Get documents for an organization
   */
  getDocumentsForOrganization: (orgId) => {
    const org = dataStore.data.organizations.find(o => o.id === orgId);
    if (!org) return [];
    return (org.documentIds || [])
      .map(did => (dataStore.data.documents || []).find(d => d.id === did))
      .filter(Boolean)
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  },

  /**
   * Get documents for an event
   */
  getDocumentsForEvent: (eventId) => {
    const documents = dataStore.data.documents || [];
    return documents
      .filter(d => (d.eventIds || []).includes(eventId))
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  },

  /**
   * Get documents for a location
   */
  getDocumentsForLocation: (locationId) => {
    const documents = dataStore.data.documents || [];
    return documents
      .filter(d => (d.locationIds || []).includes(locationId))
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  },

  /**
   * Get documents for a faction (via narratives the faction is engaged with)
   */
  getDocumentsForFaction: (factionId) => {
    const documents = dataStore.data.documents || [];
    const narratives = dataStore.data.narratives || [];
    
    // Find narratives this faction is engaged with
    const factionNarrativeIds = new Set(
      narratives
        .filter(n => n.factionMentions && n.factionMentions[factionId])
        .map(n => n.id)
    );
    
    // Return documents that belong to those narratives
    return documents
      .filter(d => (d.narrativeIds || []).some(nId => factionNarrativeIds.has(nId)))
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  },

  // Reverse lookups - get entities for a document

  /**
   * Get narratives mentioned in a document
   */
  getNarrativesForDocument: (documentId) => {
    const doc = (dataStore.data.documents || []).find(d => d.id === documentId);
    if (!doc) return [];
    return (doc.narrativeIds || [])
      .map(nid => dataStore.data.narratives.find(n => n.id === nid))
      .filter(Boolean);
  },

  /**
   * Get themes mentioned in a document
   */
  getSubNarrativesForDocument: (documentId) => {
    const doc = (dataStore.data.documents || []).find(d => d.id === documentId);
    if (!doc) return [];
    return (doc.subNarrativeIds || [])
      .map(sid => dataStore.data.subNarratives.find(s => s.id === sid))
      .filter(Boolean);
  },

  /**
   * Get persons mentioned in a document
   */
  getPersonsForDocument: (documentId) => {
    const doc = (dataStore.data.documents || []).find(d => d.id === documentId);
    if (!doc) return [];
    return (doc.personIds || [])
      .map(pid => dataStore.data.persons.find(p => p.id === pid))
      .filter(Boolean);
  },

  /**
   * Get organizations mentioned in a document
   */
  getOrganizationsForDocument: (documentId) => {
    const doc = (dataStore.data.documents || []).find(d => d.id === documentId);
    if (!doc) return [];
    return (doc.organizationIds || [])
      .map(oid => dataStore.data.organizations.find(o => o.id === oid))
      .filter(Boolean);
  },

  /**
   * Get locations mentioned in a document
   */
  getLocationsForDocument: (documentId) => {
    const doc = (dataStore.data.documents || []).find(d => d.id === documentId);
    if (!doc) return [];
    return (doc.locationIds || [])
      .map(lid => dataStore.data.locations.find(l => l.id === lid))
      .filter(Boolean);
  },

  /**
   * Get events mentioned in a document
   */
  getEventsForDocument: (documentId) => {
    const doc = (dataStore.data.documents || []).find(d => d.id === documentId);
    if (!doc) return [];
    return (doc.eventIds || [])
      .map(eid => dataStore.data.events.find(e => e.id === eid))
      .filter(Boolean);
  },

  /**
   * Get the source for a document
   */
  getSourceForDocument: (documentId) => {
    const doc = (dataStore.data.documents || []).find(d => d.id === documentId);
    if (!doc || !doc.sourceId) return null;
    return (dataStore.data.sources || []).find(s => s.id === doc.sourceId);
  },

  // ============================================
  // Network Graph Builder
  // ============================================

  /**
   * Build network graph by deriving relationships from shared narratives.
   * Two entities are connected if they appear together in at least one narrative.
   * Each link includes the narratives that connect the entities.
   */
  buildNetworkGraph: (personIds, orgIds) => {
    const nodes = [];
    const links = [];
    const narratives = dataStore.data.narratives;

    // Build index: entityId -> Set of narrative IDs
    const entityToNarratives = new Map();
    narratives.forEach(n => {
      (n.personIds || []).forEach(pId => {
        if (!entityToNarratives.has(pId)) entityToNarratives.set(pId, new Set());
        entityToNarratives.get(pId).add(n.id);
      });
      (n.organizationIds || []).forEach(oId => {
        if (!entityToNarratives.has(oId)) entityToNarratives.set(oId, new Set());
        entityToNarratives.get(oId).add(n.id);
      });
    });

    // Helper to find shared narratives between two entities
    const getSharedNarratives = (id1, id2) => {
      const set1 = entityToNarratives.get(id1) || new Set();
      const set2 = entityToNarratives.get(id2) || new Set();
      const sharedIds = [...set1].filter(nId => set2.has(nId));
      return sharedIds.map(nId => narratives.find(n => n.id === nId)).filter(Boolean);
    };

    // Add person nodes
    personIds.forEach(pId => {
      const person = dataStore.data.persons.find(p => p.id === pId);
      if (person) {
        nodes.push({ id: pId, label: person.name, type: 'person', data: person });
      }
    });

    // Add organization nodes
    orgIds.forEach(oId => {
      const org = dataStore.data.organizations.find(o => o.id === oId);
      if (org) {
        nodes.push({ id: oId, label: org.name, type: 'organization', data: org });
      }
    });

    const nodeIds = new Set(nodes.map(n => n.id));
    const addedLinks = new Set(); // Track links to avoid duplicates

    // Compute person-person links from shared narratives
    for (let i = 0; i < personIds.length; i++) {
      for (let j = i + 1; j < personIds.length; j++) {
        const p1 = personIds[i];
        const p2 = personIds[j];
        const sharedNarratives = getSharedNarratives(p1, p2);
        
        if (sharedNarratives.length > 0) {
          const linkKey = [p1, p2].sort().join('-');
          if (!addedLinks.has(linkKey)) {
            links.push({
              source: p1,
              target: p2,
              type: 'person-person',
              narratives: sharedNarratives,
              strength: sharedNarratives.length
            });
            addedLinks.add(linkKey);
          }
        }
      }
    }

    // Compute org-org links from shared narratives
    for (let i = 0; i < orgIds.length; i++) {
      for (let j = i + 1; j < orgIds.length; j++) {
        const o1 = orgIds[i];
        const o2 = orgIds[j];
        const sharedNarratives = getSharedNarratives(o1, o2);
        
        if (sharedNarratives.length > 0) {
          const linkKey = [o1, o2].sort().join('-');
          if (!addedLinks.has(linkKey)) {
            links.push({
              source: o1,
              target: o2,
              type: 'org-org',
              narratives: sharedNarratives,
              strength: sharedNarratives.length
            });
            addedLinks.add(linkKey);
          }
        }
      }
    }

    // Compute person-org links from shared narratives
    personIds.forEach(pId => {
      orgIds.forEach(oId => {
        const sharedNarratives = getSharedNarratives(pId, oId);
        
        if (sharedNarratives.length > 0) {
          const linkKey = [pId, oId].sort().join('-');
          if (!addedLinks.has(linkKey)) {
            links.push({
              source: pId,
              target: oId,
              type: 'person-org',
              narratives: sharedNarratives,
              strength: sharedNarratives.length
            });
            addedLinks.add(linkKey);
          }
        }
      });
    });

    return { nodes, links };
  },

  // ============================================
  // Dashboard Aggregations (with time range support)
  // ============================================

  getDashboardStats: (missionId = null, timeRange = null, statusFilter = null) => {
    let narratives = DataService.getNarratives(missionId, timeRange);
    
    // Apply status filter if provided (statusFilter is an array of statuses)
    if (statusFilter && statusFilter.length > 0) {
      narratives = narratives.filter(n => statusFilter.includes(n.status || 'new'));
    }
    
    const subNarratives = dataStore.data.subNarratives.filter(s =>
      narratives.some(n => n.id === s.parentNarrativeId)
    );

    // Calculate total volume for each narrative (filtered by time range)
    const narrativesWithVolume = narratives.map(n => {
      const filteredVolume = DataService.filterVolumeByTimeRange(n.volumeOverTime, timeRange);
      const totalVolume = timeRange && filteredVolume.length > 0
        ? filteredVolume.reduce((sum, entry) => {
            return sum + Object.values(entry.factionVolumes || {}).reduce((s, v) => s + v, 0);
          }, 0)
        : Object.values(n.factionMentions || {}).reduce((sum, f) => sum + (f.volume || 0), 0);
      
      return { ...n, totalVolume };
    });

    // Sort by volume
    narrativesWithVolume.sort((a, b) => b.totalVolume - a.totalVolume);

    // Filter events by time range and by narratives (if status filter is active)
    let events = dataStore.data.events;
    if (timeRange) {
      events = events.filter(e => DataService.isDateInRange(e.date, timeRange));
    }
    if (statusFilter) {
      // Only show events linked to filtered narratives
      const narrativeIds = new Set(narratives.map(n => n.id));
      events = events.filter(e => {
        // Check if event is linked to any filtered narrative
        return narratives.some(n => (n.eventIds || []).includes(e.id));
      });
    }

    return {
      totalNarratives: narratives.length,
      totalSubNarratives: subNarratives.length,
      totalFactions: dataStore.data.factions.length,
      totalLocations: dataStore.data.locations.length,
      totalEvents: events.length,
      totalPersons: dataStore.data.persons.length,
      totalOrganizations: dataStore.data.organizations.length,
      topNarratives: narrativesWithVolume.slice(0, 10),
      recentNarratives: [...narratives]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
    };
  },

  // Aggregate volume over time across multiple narratives (with time range and status support)
  getAggregateVolumeOverTime: (missionId = null, timeRange = null, statusFilter = null) => {
    let narratives = DataService.getNarratives(missionId);
    
    // Apply status filter if provided (statusFilter is an array of statuses)
    if (statusFilter && statusFilter.length > 0) {
      narratives = narratives.filter(n => statusFilter.includes(n.status || 'new'));
    }
    
    const factions = dataStore.data.factions;
    const dateMap = new Map();

    narratives.forEach(n => {
      const volumeData = DataService.filterVolumeByTimeRange(n.volumeOverTime, timeRange);
      volumeData.forEach(entry => {
        if (!dateMap.has(entry.date)) {
          dateMap.set(entry.date, {});
        }
        const dayData = dateMap.get(entry.date);
        Object.entries(entry.factionVolumes || {}).forEach(([fId, vol]) => {
          dayData[fId] = (dayData[fId] || 0) + vol;
        });
      });
    });

    const dates = [...dateMap.keys()].sort();
    const series = factions.map(f =>
      dates.map(date => (dateMap.get(date) || {})[f.id] || 0)
    );

    return { dates, series, factions };
  },

  // Aggregate faction sentiments across all narratives (weighted by volume)
  getAggregateFactionSentiments: (missionId = null, timeRange = null, statusFilter = null) => {
    let narratives = DataService.getNarratives(missionId);
    
    // Apply status filter if provided
    if (statusFilter && statusFilter.length > 0) {
      narratives = narratives.filter(n => statusFilter.includes(n.status || 'new'));
    }
    
    // Filter by time range if provided
    if (timeRange) {
      narratives = narratives.filter(n => DataService.narrativeHasActivityInRange(n, timeRange));
    }
    
    const factions = dataStore.data.factions;
    const factionStats = new Map();
    
    // Initialize stats for each faction
    factions.forEach(f => {
      factionStats.set(f.id, { totalVolume: 0, weightedSentiment: 0 });
    });
    
    // Aggregate volume and sentiment across narratives
    narratives.forEach(n => {
      Object.entries(n.factionMentions || {}).forEach(([factionId, data]) => {
        const stats = factionStats.get(factionId);
        if (stats && data.volume && typeof data.sentiment === 'number') {
          stats.totalVolume += data.volume;
          stats.weightedSentiment += data.sentiment * data.volume;
        }
      });
    });
    
    // Calculate weighted average sentiment and return factions with data
    return factions
      .map(f => {
        const stats = factionStats.get(f.id);
        if (stats.totalVolume === 0) return null;
        return {
          ...f,
          sentiment: stats.weightedSentiment / stats.totalVolume,
          volume: stats.totalVolume
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.volume - a.volume); // Sort by volume descending
  },

  // Get all locations with related narratives and events (with time range and status support)
  getAllLocationsWithCounts: (timeRange = null, statusFilter = null) => {
    let narratives = timeRange 
      ? dataStore.data.narratives.filter(n => DataService.narrativeHasActivityInRange(n, timeRange))
      : dataStore.data.narratives;
    
    // Apply status filter if provided (statusFilter is an array of statuses)
    if (statusFilter && statusFilter.length > 0) {
      narratives = narratives.filter(n => statusFilter.includes(n.status || 'new'));
    }
    
    let events = timeRange
      ? dataStore.data.events.filter(e => DataService.isDateInRange(e.date, timeRange))
      : dataStore.data.events;
    
    // If status filter is active, only include events linked to filtered narratives
    if (statusFilter) {
      events = events.filter(e => {
        return narratives.some(n => (n.eventIds || []).includes(e.id));
      });
    }

    return dataStore.data.locations.map(loc => {
      const relatedNarratives = narratives.filter(n =>
        (n.locationIds || []).includes(loc.id)
      );
      const relatedEvents = events.filter(e =>
        e.locationId === loc.id
      );
      return {
        ...loc,
        narrativeCount: relatedNarratives.length,
        eventCount: relatedEvents.length,
        narratives: relatedNarratives,
        events: relatedEvents
      };
    });
  },

  // Get recent events (with time range and status support)
  getRecentEvents: (limit = 10, timeRange = null, statusFilter = null) => {
    let events = [...dataStore.data.events];
    
    if (timeRange) {
      events = events.filter(e => DataService.isDateInRange(e.date, timeRange));
    }
    
    // If status filter is active, only include events linked to narratives with that status
    if (statusFilter && statusFilter.length > 0) {
      const narratives = dataStore.data.narratives.filter(n => statusFilter.includes(n.status || 'new'));
      events = events.filter(e => {
        return narratives.some(n => (n.eventIds || []).includes(e.id));
      });
    }
    
    return events
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  },

  // Calculate total volume for a narrative
  getNarrativeTotalVolume: (narrative) => {
    return Object.values(narrative.factionMentions || {})
      .reduce((sum, f) => sum + (f.volume || 0), 0);
  },

  // ============================================
  // Source Relationships
  // ============================================

  getSourcesForNarrative: (narrativeId) => {
    const narrative = dataStore.data.narratives.find(n => n.id === narrativeId);
    if (!narrative || !narrative.sourceVolumes) return [];
    
    const sources = dataStore.data.sources || [];
    return Object.entries(narrative.sourceVolumes).map(([sourceId, data]) => {
      const source = sources.find(s => s.id === sourceId);
      return source ? { source, ...data } : null;
    }).filter(Boolean);
  },

  getFactionSourcesForNarrative: (narrativeId) => {
    const narrative = dataStore.data.narratives.find(n => n.id === narrativeId);
    if (!narrative || !narrative.factionSources) return [];
    
    const factions = dataStore.data.factions;
    const sources = dataStore.data.sources || [];
    
    return Object.entries(narrative.factionSources).map(([factionId, sourceCounts]) => {
      const faction = factions.find(f => f.id === factionId);
      if (!faction) return null;
      
      const sourceData = Object.entries(sourceCounts).map(([sourceId, volume]) => {
        const source = sources.find(s => s.id === sourceId);
        return source ? { source, volume } : null;
      }).filter(Boolean);
      
      return { faction, sources: sourceData };
    }).filter(Boolean);
  },

  getSourceVolumeOverTime: (narrativeId) => {
    const narrative = dataStore.data.narratives.find(n => n.id === narrativeId);
    if (!narrative || !narrative.volumeOverTime) return { dates: [], series: [], sources: [] };
    
    const sources = dataStore.data.sources || [];
    const allSourceIds = new Set();
    
    // Collect all source IDs present in the time series
    narrative.volumeOverTime.forEach(entry => {
      Object.keys(entry.sourceVolumes || {}).forEach(id => allSourceIds.add(id));
    });
    
    const sourceIds = [...allSourceIds];
    const relevantSources = sourceIds.map(id => sources.find(s => s.id === id)).filter(Boolean);
    
    const dates = narrative.volumeOverTime.map(e => e.date);
    const series = relevantSources.map(source => 
      narrative.volumeOverTime.map(entry => (entry.sourceVolumes || {})[source.id] || 0)
    );
    
    return { dates, series, sources: relevantSources };
  },

  // Aggregate source volumes across multiple narratives (with time range support)
  getAggregateSourceVolumes: (missionId = null, timeRange = null) => {
    const narratives = DataService.getNarratives(missionId, timeRange);
    const sources = dataStore.data.sources || [];
    const sourceTotals = {};
    
    narratives.forEach(n => {
      // If time range specified, calculate from volumeOverTime
      if (timeRange && n.volumeOverTime) {
        const filteredVolume = DataService.filterVolumeByTimeRange(n.volumeOverTime, timeRange);
        filteredVolume.forEach(entry => {
          Object.entries(entry.sourceVolumes || {}).forEach(([sourceId, vol]) => {
            if (!sourceTotals[sourceId]) {
              sourceTotals[sourceId] = { volume: 0, sentimentCounts: { positive: 0, neutral: 0, negative: 0 } };
            }
            sourceTotals[sourceId].volume += vol;
          });
        });
      } else {
        // Use aggregate sourceVolumes
        Object.entries(n.sourceVolumes || {}).forEach(([sourceId, data]) => {
          if (!sourceTotals[sourceId]) {
            sourceTotals[sourceId] = { volume: 0, sentimentCounts: { positive: 0, neutral: 0, negative: 0 } };
          }
          sourceTotals[sourceId].volume += data.volume || 0;
          if (data.sentiment) {
            sourceTotals[sourceId].sentimentCounts[data.sentiment]++;
          }
        });
      }
    });
    
    return Object.entries(sourceTotals).map(([sourceId, totals]) => {
      const source = sources.find(s => s.id === sourceId);
      return source ? { source, ...totals } : null;
    }).filter(Boolean).sort((a, b) => b.volume - a.volume);
  },

  // Aggregate source volumes over time (with time range and status support)
  getAggregateSourceVolumeOverTime: (missionId = null, timeRange = null, statusFilter = null) => {
    let narratives = DataService.getNarratives(missionId);
    
    // Apply status filter if provided (statusFilter is an array of statuses)
    if (statusFilter && statusFilter.length > 0) {
      narratives = narratives.filter(n => statusFilter.includes(n.status || 'new'));
    }
    
    const sources = dataStore.data.sources || [];
    const dateMap = new Map();

    narratives.forEach(n => {
      const volumeData = DataService.filterVolumeByTimeRange(n.volumeOverTime, timeRange);
      volumeData.forEach(entry => {
        if (!dateMap.has(entry.date)) {
          dateMap.set(entry.date, {});
        }
        const dayData = dateMap.get(entry.date);
        Object.entries(entry.sourceVolumes || {}).forEach(([sId, vol]) => {
          dayData[sId] = (dayData[sId] || 0) + vol;
        });
      });
    });

    const dates = [...dateMap.keys()].sort();
    const allSourceIds = new Set();
    dateMap.forEach(dayData => {
      Object.keys(dayData).forEach(id => allSourceIds.add(id));
    });
    
    const relevantSources = [...allSourceIds].map(id => sources.find(s => s.id === id)).filter(Boolean);
    const series = relevantSources.map(source =>
      dates.map(date => (dateMap.get(date) || {})[source.id] || 0)
    );

    return { dates, series, sources: relevantSources };
  },

  // Get top sources by total volume (with time range support)
  getTopSources: (missionId = null, limit = 5, timeRange = null) => {
    const aggregated = DataService.getAggregateSourceVolumes(missionId, timeRange);
    return aggregated.slice(0, limit);
  },

  // Get source category totals (with time range support)
  getSourceCategoryTotals: (missionId = null, timeRange = null) => {
    const aggregated = DataService.getAggregateSourceVolumes(missionId, timeRange);
    const categories = dataStore.data.sourceCategories || [];
    const categoryTotals = {};
    
    categories.forEach(cat => {
      categoryTotals[cat.id] = { category: cat, volume: 0, sources: [] };
    });
    
    aggregated.forEach(item => {
      const type = item.source.type;
      if (categoryTotals[type]) {
        categoryTotals[type].volume += item.volume;
        categoryTotals[type].sources.push(item);
      }
    });
    
    return Object.values(categoryTotals).sort((a, b) => b.volume - a.volume);
  },

  // ============================================
  // Monitor Relationships
  // ============================================

  /**
   * Get narratives that match a monitor's scope criteria.
   * A narrative matches if it references any entity in the monitor's scope.
   */
  getNarrativesForMonitor: (monitorId) => {
    const monitor = findById('monitors', monitorId);
    if (!monitor) return [];
    
    const scope = monitor.scope || {};
    const narratives = dataStore.data.narratives || [];
    
    return narratives.filter(narrative => {
      // Check if narrative directly in scope
      if (scope.narrativeIds?.includes(narrative.id)) return true;
      
      // Check person overlap
      if (scope.personIds?.some(pId => (narrative.personIds || []).includes(pId))) return true;
      
      // Check organization overlap
      if (scope.organizationIds?.some(oId => (narrative.organizationIds || []).includes(oId))) return true;
      
      // Check faction overlap (factionMentions is an object with faction IDs as keys)
      if (scope.factionIds?.some(fId => narrative.factionMentions && narrative.factionMentions[fId])) return true;
      
      // Check location overlap
      if (scope.locationIds?.some(lId => (narrative.locationIds || []).includes(lId))) return true;
      
      // Check event overlap
      if (scope.eventIds?.some(eId => (narrative.eventIds || []).includes(eId))) return true;
      
      return false;
    });
  },

  /**
   * Get themes (sub-narratives) that match a monitor's scope criteria.
   */
  getSubNarrativesForMonitor: (monitorId) => {
    const monitor = findById('monitors', monitorId);
    if (!monitor || monitor.options?.includeSubNarratives === false) return [];
    
    // Get matched narratives first
    const matchedNarratives = DataService.getNarrativesForMonitor(monitorId);
    const matchedNarrativeIds = new Set(matchedNarratives.map(n => n.id));
    
    // Get sub-narratives that belong to matched narratives
    return (dataStore.data.subNarratives || []).filter(sub => 
      matchedNarrativeIds.has(sub.parentNarrativeId)
    );
  },

  /**
   * Get events that match a monitor's scope criteria.
   * Events match if they are in scope or related to scoped entities.
   */
  getEventsForMonitor: (monitorId) => {
    const monitor = findById('monitors', monitorId);
    if (!monitor) return [];
    
    const scope = monitor.scope || {};
    const events = dataStore.data.events || [];
    const includeRelated = monitor.options?.includeRelatedEvents !== false;
    
    return events.filter(event => {
      // Check if event directly in scope
      if (scope.eventIds?.includes(event.id)) return true;
      
      if (includeRelated) {
        // Check person overlap
        if (scope.personIds?.some(pId => (event.personIds || []).includes(pId))) return true;
        
        // Check organization overlap
        if (scope.organizationIds?.some(oId => (event.organizationIds || []).includes(oId))) return true;
        
        // Check location overlap
        if (scope.locationIds?.includes(event.locationId)) return true;
      }
      
      return false;
    });
  },

  /**
   * Get sub-events for matched events in a monitor.
   */
  getSubEventsForMonitor: (monitorId) => {
    const monitor = findById('monitors', monitorId);
    if (!monitor || monitor.options?.includeSubEvents === false) return [];
    
    const matchedEvents = DataService.getEventsForMonitor(monitorId);
    const subEventIds = new Set();
    
    matchedEvents.forEach(event => {
      (event.subEventIds || []).forEach(seId => subEventIds.add(seId));
    });
    
    return (dataStore.data.events || []).filter(e => subEventIds.has(e.id));
  },

  /**
   * Get all matched content for a monitor (narratives, themes, events, sub-events).
   */
  getMonitorMatchedContent: (monitorId) => {
    return {
      narratives: DataService.getNarrativesForMonitor(monitorId),
      subNarratives: DataService.getSubNarrativesForMonitor(monitorId),
      events: DataService.getEventsForMonitor(monitorId),
      subEvents: DataService.getSubEventsForMonitor(monitorId),
      alerts: DataService.getAlertsForMonitor(monitorId)
    };
  },

  /**
   * Get a formatted trigger description for display.
   */
  getMonitorTriggerLabels: (monitorId) => {
    const monitor = findById('monitors', monitorId);
    if (!monitor) return [];
    
    const triggers = monitor.triggers || {};
    const labels = [];
    
    if (triggers.newNarrative) labels.push('New Narratives');
    if (triggers.newEvent) labels.push('New Events');
    if (triggers.volumeSpike) {
      labels.push(`Volume >${triggers.volumeSpike.threshold}/${triggers.volumeSpike.timeWindow}`);
    }
    if (triggers.sentimentShift) {
      const dir = triggers.sentimentShift.direction === 'any' ? '±' : 
                  triggers.sentimentShift.direction === 'negative' ? '-' : '+';
      labels.push(`Sentiment ${dir}${Math.round(triggers.sentimentShift.threshold * 100)}%`);
    }
    if (triggers.factionEngagement) {
      labels.push('Faction Engagement');
    }
    
    return labels;
  },

  /**
   * Get scope label for a monitor (primary entity being watched).
   */
  getMonitorScopeLabel: (monitorId) => {
    const monitor = findById('monitors', monitorId);
    if (!monitor) return '';
    
    const scope = monitor.scope || {};
    
    // Return the most specific scope first
    if (scope.personIds?.length === 1) {
      const person = findById('persons', scope.personIds[0]);
      return person?.name || 'Person';
    }
    if (scope.personIds?.length > 1) {
      return `${scope.personIds.length} people`;
    }
    if (scope.organizationIds?.length === 1) {
      const org = findById('organizations', scope.organizationIds[0]);
      return org?.name || 'Organization';
    }
    if (scope.organizationIds?.length > 1) {
      return `${scope.organizationIds.length} organizations`;
    }
    if (scope.factionIds?.length) {
      return `${scope.factionIds.length} faction${scope.factionIds.length > 1 ? 's' : ''}`;
    }
    if (scope.narrativeIds?.length) {
      return `${scope.narrativeIds.length} narrative${scope.narrativeIds.length > 1 ? 's' : ''}`;
    }
    if (scope.locationIds?.length) {
      return `${scope.locationIds.length} location${scope.locationIds.length > 1 ? 's' : ''}`;
    }
    
    return 'Custom scope';
  },

  /**
   * Get scope type for a monitor (for icon selection).
   * Returns the first matching scope type in priority order.
   */
  getMonitorScopeType: (monitorId) => {
    const monitor = findById('monitors', monitorId);
    if (!monitor) return 'custom';
    
    const scope = monitor.scope || {};
    
    // Check in order of priority for display
    if (scope.narrativeIds?.length) return 'narrative';
    if (scope.themeIds?.length) return 'theme';
    if (scope.factionIds?.length) return 'faction';
    if (scope.personIds?.length) return 'person';
    if (scope.organizationIds?.length) return 'organization';
    if (scope.locationIds?.length) return 'location';
    if (scope.eventIds?.length) return 'event';
    
    return 'custom';
  },

  // Search across all entities
  search: (query) => {
    const lowerQuery = query.toLowerCase();
    const results = {
      narratives: [],
      subNarratives: [],
      factions: [],
      locations: [],
      events: [],
      persons: [],
      organizations: []
    };

    results.narratives = dataStore.data.narratives.filter(n =>
      n.text.toLowerCase().includes(lowerQuery)
    );
    results.subNarratives = dataStore.data.subNarratives.filter(s =>
      s.text.toLowerCase().includes(lowerQuery)
    );
    results.factions = dataStore.data.factions.filter(f =>
      f.name.toLowerCase().includes(lowerQuery)
    );
    results.locations = dataStore.data.locations.filter(l =>
      l.name.toLowerCase().includes(lowerQuery)
    );
    results.events = dataStore.data.events.filter(e =>
      e.text.toLowerCase().includes(lowerQuery)
    );
    results.persons = dataStore.data.persons.filter(p =>
      p.name.toLowerCase().includes(lowerQuery)
    );
    results.organizations = dataStore.data.organizations.filter(o =>
      o.name.toLowerCase().includes(lowerQuery)
    );

    return results;
  }
};

export default DataService;

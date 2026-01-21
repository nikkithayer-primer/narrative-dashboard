/**
 * DataStore.js
 * Persistent data management with localStorage
 * Provides CRUD operations for all entity types
 */

class DataStore {
  constructor() {
    this.storageKey = 'narrativeOS_data';
    this.listeners = new Set();
    this.data = this.load();
  }

  // ============================================
  // Core Data Operations
  // ============================================

  load() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored data:', e);
      }
    }
    return this.getDefaultData();
  }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    this.notifyListeners();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners() {
    this.listeners.forEach(cb => cb(this.data));
  }

  generateId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // ============================================
  // Generic CRUD Operations
  // ============================================

  /**
   * Generic create operation for any entity type
   * @param {string} collection - Name of the collection (e.g., 'missions', 'narratives')
   * @param {string} prefix - ID prefix (e.g., 'mission', 'narr')
   * @param {Object} data - Entity data
   * @param {Object} defaults - Default values to merge
   * @returns {string} The generated ID
   */
  createEntity(collection, prefix, data, defaults = {}) {
    const id = this.generateId(prefix);
    this.data[collection].push({
      id,
      ...defaults,
      ...data,
      createdAt: new Date().toISOString()
    });
    this.save();
    return id;
  }

  /**
   * Generic update operation for any entity type
   * @param {string} collection - Name of the collection
   * @param {string} id - Entity ID to update
   * @param {Object} updates - Fields to update
   * @returns {boolean} Whether the update was successful
   */
  updateEntity(collection, id, updates) {
    const idx = this.data[collection].findIndex(item => item.id === id);
    if (idx !== -1) {
      this.data[collection][idx] = {
        ...this.data[collection][idx],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.save();
      return true;
    }
    return false;
  }

  /**
   * Generic delete operation for any entity type
   * @param {string} collection - Name of the collection
   * @param {string} id - Entity ID to delete
   * @param {Function} cleanupFn - Optional cleanup function for related data
   * @returns {boolean} Whether the delete was successful
   */
  deleteEntity(collection, id, cleanupFn = null) {
    const initialLength = this.data[collection].length;
    this.data[collection] = this.data[collection].filter(item => item.id !== id);
    
    if (this.data[collection].length < initialLength) {
      if (cleanupFn) {
        cleanupFn(id);
      }
      this.save();
      return true;
    }
    return false;
  }

  /**
   * Generic find operation
   * @param {string} collection - Name of the collection
   * @param {string} id - Entity ID to find
   * @returns {Object|undefined} The found entity or undefined
   */
  findEntity(collection, id) {
    return this.data[collection]?.find(item => item.id === id);
  }

  /**
   * Remove an ID from an array field across all items in a collection
   * @param {string} collection - Name of the collection
   * @param {string} field - Array field name
   * @param {string} idToRemove - ID to remove from the arrays
   */
  removeIdFromArrayField(collection, field, idToRemove) {
    this.data[collection].forEach(item => {
      if (item[field]) {
        item[field] = item[field].filter(id => id !== idToRemove);
      }
    });
  }

  /**
   * Remove a key from an object field across all items in a collection
   * @param {string} collection - Name of the collection
   * @param {string} field - Object field name
   * @param {string} keyToRemove - Key to remove from the objects
   */
  removeKeyFromObjectField(collection, field, keyToRemove) {
    this.data[collection].forEach(item => {
      if (item[field]) {
        delete item[field][keyToRemove];
      }
    });
  }

  // ============================================
  // Mission CRUD
  // ============================================

  createMission(mission) {
    return this.createEntity('missions', 'mission', {
      name: mission.name,
      description: mission.description || '',
      color: mission.color || this.generateColor()
    });
  }

  updateMission(id, updates) {
    this.updateEntity('missions', id, updates);
  }

  deleteMission(id) {
    this.deleteEntity('missions', id, () => {
      // Remove mission reference from narratives
      this.data.narratives.forEach(n => {
        if (n.missionId === id) n.missionId = null;
      });
    });
  }

  // ============================================
  // Narrative CRUD
  // ============================================

  createNarrative(narrative) {
    const id = this.generateId('narr');
    this.data.narratives.push({
      id,
      text: narrative.text,
      missionId: narrative.missionId || null,
      sentiment: narrative.sentiment || 'neutral',
      subNarrativeIds: [],
      factionMentions: narrative.factionMentions || {},
      personIds: narrative.personIds || [],
      organizationIds: narrative.organizationIds || [],
      locationIds: narrative.locationIds || [],
      eventIds: narrative.eventIds || [],
      volumeOverTime: narrative.volumeOverTime || this.generateInitialVolume(),
      createdAt: new Date().toISOString()
    });
    this.save();
    return id;
  }

  updateNarrative(id, updates) {
    const idx = this.data.narratives.findIndex(n => n.id === id);
    if (idx !== -1) {
      this.data.narratives[idx] = {
        ...this.data.narratives[idx],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.save();
    }
  }

  deleteNarrative(id) {
    // Remove associated sub-narratives
    this.data.subNarratives = this.data.subNarratives.filter(s => s.parentNarrativeId !== id);
    this.data.narratives = this.data.narratives.filter(n => n.id !== id);
    this.save();
  }

  // ============================================
  // SubNarrative CRUD
  // ============================================

  createSubNarrative(subNarrative) {
    const id = this.generateId('sub');
    this.data.subNarratives.push({
      id,
      text: subNarrative.text,
      parentNarrativeId: subNarrative.parentNarrativeId,
      sentiment: subNarrative.sentiment || 'neutral',
      factionMentions: subNarrative.factionMentions || {},
      personIds: subNarrative.personIds || [],
      organizationIds: subNarrative.organizationIds || [],
      locationIds: subNarrative.locationIds || [],
      eventIds: subNarrative.eventIds || [],
      volumeOverTime: subNarrative.volumeOverTime || this.generateInitialVolume(),
      createdAt: new Date().toISOString()
    });

    // Link to parent narrative
    const parentIdx = this.data.narratives.findIndex(n => n.id === subNarrative.parentNarrativeId);
    if (parentIdx !== -1) {
      this.data.narratives[parentIdx].subNarrativeIds.push(id);
    }

    this.save();
    return id;
  }

  updateSubNarrative(id, updates) {
    const idx = this.data.subNarratives.findIndex(s => s.id === id);
    if (idx !== -1) {
      this.data.subNarratives[idx] = {
        ...this.data.subNarratives[idx],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.save();
    }
  }

  deleteSubNarrative(id) {
    const sub = this.data.subNarratives.find(s => s.id === id);
    if (sub) {
      // Remove from parent's list
      const parentIdx = this.data.narratives.findIndex(n => n.id === sub.parentNarrativeId);
      if (parentIdx !== -1) {
        this.data.narratives[parentIdx].subNarrativeIds =
          this.data.narratives[parentIdx].subNarrativeIds.filter(sid => sid !== id);
      }
    }
    this.data.subNarratives = this.data.subNarratives.filter(s => s.id !== id);
    this.save();
  }

  // ============================================
  // Faction CRUD
  // ============================================

  createFaction(faction) {
    return this.createEntity('factions', 'faction', {
      name: faction.name,
      color: faction.color || this.generateColor(),
      relatedFactionIds: faction.relatedFactionIds || [],
      memberCount: faction.memberCount || 0,
      affiliatedPersonIds: faction.affiliatedPersonIds || [],
      affiliatedOrganizationIds: faction.affiliatedOrganizationIds || []
    });
  }

  updateFaction(id, updates) {
    this.updateEntity('factions', id, updates);
  }

  deleteFaction(id) {
    this.deleteEntity('factions', id, () => {
      // Clean up references
      this.removeKeyFromObjectField('narratives', 'factionMentions', id);
      this.removeKeyFromObjectField('subNarratives', 'factionMentions', id);
      this.data.factionOverlaps = this.data.factionOverlaps.filter(
        o => !o.factionIds.includes(id)
      );
      this.removeIdFromArrayField('persons', 'affiliatedFactionIds', id);
      this.removeKeyFromObjectField('persons', 'factionSentiment', id);
      this.removeIdFromArrayField('organizations', 'affiliatedFactionIds', id);
      this.removeKeyFromObjectField('organizations', 'factionSentiment', id);
    });
  }

  // ============================================
  // Location CRUD
  // ============================================

  createLocation(location) {
    return this.createEntity('locations', 'loc', {
      name: location.name,
      coordinates: location.coordinates || { lat: 0, lng: 0 },
      type: location.type || 'general'
    });
  }

  updateLocation(id, updates) {
    this.updateEntity('locations', id, updates);
  }

  deleteLocation(id) {
    this.deleteEntity('locations', id, () => {
      // Clean up references
      this.removeIdFromArrayField('narratives', 'locationIds', id);
      this.removeIdFromArrayField('subNarratives', 'locationIds', id);
      this.data.events.forEach(e => {
        if (e.locationId === id) e.locationId = null;
      });
      this.removeIdFromArrayField('persons', 'relatedLocationIds', id);
      this.removeIdFromArrayField('organizations', 'relatedLocationIds', id);
    });
  }

  // ============================================
  // Event CRUD
  // ============================================

  createEvent(event) {
    const id = this.generateId('event');
    this.data.events.push({
      id,
      text: event.text,
      date: event.date || new Date().toISOString(),
      parentEventId: event.parentEventId || null,
      subEventIds: [],
      locationId: event.locationId || null,
      personIds: event.personIds || [],
      organizationIds: event.organizationIds || [],
      createdAt: new Date().toISOString()
    });

    // If this is a sub-event, link to parent
    if (event.parentEventId) {
      const parentIdx = this.data.events.findIndex(e => e.id === event.parentEventId);
      if (parentIdx !== -1) {
        this.data.events[parentIdx].subEventIds.push(id);
      }
    }

    this.save();
    return id;
  }

  updateEvent(id, updates) {
    const idx = this.data.events.findIndex(e => e.id === id);
    if (idx !== -1) {
      this.data.events[idx] = {
        ...this.data.events[idx],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.save();
    }
  }

  deleteEvent(id) {
    const event = this.data.events.find(e => e.id === id);
    if (event) {
      // Remove from parent if sub-event
      if (event.parentEventId) {
        const parentIdx = this.data.events.findIndex(e => e.id === event.parentEventId);
        if (parentIdx !== -1) {
          this.data.events[parentIdx].subEventIds =
            this.data.events[parentIdx].subEventIds.filter(eid => eid !== id);
        }
      }
      // Also delete sub-events
      const subEventIds = event.subEventIds || [];
      this.data.events = this.data.events.filter(e => e.id !== id && !subEventIds.includes(e.id));
    }
    // Clean up references
    this.data.narratives.forEach(n => {
      n.eventIds = n.eventIds.filter(eid => eid !== id);
    });
    this.data.subNarratives.forEach(s => {
      s.eventIds = s.eventIds.filter(eid => eid !== id);
    });
    this.data.persons.forEach(p => {
      p.relatedEventIds = (p.relatedEventIds || []).filter(eid => eid !== id);
    });
    this.save();
  }

  // ============================================
  // Person CRUD
  // ============================================

  createPerson(person) {
    return this.createEntity('persons', 'person', {
      name: person.name,
      type: person.type || 'general',
      imageUrl: person.imageUrl || null,
      affiliatedFactionIds: person.affiliatedFactionIds || [],
      relatedLocationIds: person.relatedLocationIds || [],
      relatedEventIds: person.relatedEventIds || [],
      factionSentiment: person.factionSentiment || {}
    });
  }

  updatePerson(id, updates) {
    this.updateEntity('persons', id, updates);
  }

  deletePerson(id) {
    this.deleteEntity('persons', id, () => {
      // Clean up references in narratives, sub-narratives, events, and factions
      this.removeIdFromArrayField('narratives', 'personIds', id);
      this.removeIdFromArrayField('subNarratives', 'personIds', id);
      this.removeIdFromArrayField('events', 'personIds', id);
      this.removeIdFromArrayField('factions', 'affiliatedPersonIds', id);
    });
  }

  // ============================================
  // Organization CRUD
  // ============================================

  createOrganization(org) {
    return this.createEntity('organizations', 'org', {
      name: org.name,
      type: org.type || 'general',
      affiliatedFactionIds: org.affiliatedFactionIds || [],
      relatedLocationIds: org.relatedLocationIds || [],
      factionSentiment: org.factionSentiment || {}
    });
  }

  updateOrganization(id, updates) {
    this.updateEntity('organizations', id, updates);
  }

  deleteOrganization(id) {
    this.deleteEntity('organizations', id, () => {
      // Clean up references in narratives, sub-narratives, events, and factions
      this.removeIdFromArrayField('narratives', 'organizationIds', id);
      this.removeIdFromArrayField('subNarratives', 'organizationIds', id);
      this.removeIdFromArrayField('events', 'organizationIds', id);
      this.removeIdFromArrayField('factions', 'affiliatedOrganizationIds', id);
    });
  }

  // ============================================
  // Faction Overlaps
  // ============================================

  createFactionOverlap(overlap) {
    this.data.factionOverlaps.push({
      factionIds: overlap.factionIds,
      overlapSize: overlap.overlapSize || 0,
      sharedSentiment: overlap.sharedSentiment || {}
    });
    this.save();
  }

  updateFactionOverlap(factionIds, updates) {
    const idx = this.data.factionOverlaps.findIndex(o =>
      o.factionIds.length === factionIds.length &&
      o.factionIds.every(id => factionIds.includes(id))
    );
    if (idx !== -1) {
      this.data.factionOverlaps[idx] = {
        ...this.data.factionOverlaps[idx],
        ...updates
      };
      this.save();
    }
  }

  deleteFactionOverlap(factionIds) {
    this.data.factionOverlaps = this.data.factionOverlaps.filter(o =>
      !(o.factionIds.length === factionIds.length &&
        o.factionIds.every(id => factionIds.includes(id)))
    );
    this.save();
  }

  // ============================================
  // Document CRUD
  // ============================================

  createDocument(doc) {
    const id = this.generateId('doc');
    this.data.documents = this.data.documents || [];
    this.data.documents.push({
      id,
      type: doc.type || 'social_media',
      source: doc.source || '',
      content: doc.content || '',
      sentiment: doc.sentiment || 'neutral',
      narrativeIds: doc.narrativeIds || [],
      factionId: doc.factionId || null,
      date: doc.date || new Date().toISOString(),
      createdAt: new Date().toISOString()
    });
    this.save();
    return id;
  }

  // ============================================
  // Helpers
  // ============================================

  generateInitialVolume() {
    const days = 14;
    const data = [];
    const now = new Date();
    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        factionVolumes: {}
      });
    }
    return data;
  }

  generateColor() {
    const colors = [
      '#E53935', '#D81B60', '#8E24AA', '#5E35B1', '#3949AB',
      '#1E88E5', '#039BE5', '#00ACC1', '#00897B', '#43A047',
      '#7CB342', '#C0CA33', '#FDD835', '#FFB300', '#FB8C00',
      '#F4511E', '#6D4C41', '#757575', '#546E7A'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Reset to default data
  reset() {
    this.data = this.getDefaultData();
    this.save();
  }

  // Export data as JSON
  export() {
    return JSON.stringify(this.data, null, 2);
  }

  // Import data from JSON
  import(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      this.data = data;
      this.save();
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  }

  // ============================================
  // Default Data
  // ============================================

  getDefaultData() {
    return {
      missions: [],
      narratives: [],
      subNarratives: [],
      factions: [],
      factionOverlaps: [],
      locations: [],
      events: [],
      persons: [],
      organizations: [],
      documents: [],
      sources: [],
      sourceCategories: []
    };
  }
}

// Export singleton instance
export const dataStore = new DataStore();
export default DataStore;

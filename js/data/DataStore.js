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
  // Mission CRUD
  // ============================================

  createMission(mission) {
    const id = this.generateId('mission');
    this.data.missions.push({
      id,
      name: mission.name,
      description: mission.description || '',
      color: mission.color || this.generateColor(),
      createdAt: new Date().toISOString()
    });
    this.save();
    return id;
  }

  updateMission(id, updates) {
    const idx = this.data.missions.findIndex(m => m.id === id);
    if (idx !== -1) {
      this.data.missions[idx] = {
        ...this.data.missions[idx],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.save();
    }
  }

  deleteMission(id) {
    this.data.missions = this.data.missions.filter(m => m.id !== id);
    // Remove mission reference from narratives
    this.data.narratives.forEach(n => {
      if (n.missionId === id) n.missionId = null;
    });
    this.save();
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
    const id = this.generateId('faction');
    this.data.factions.push({
      id,
      name: faction.name,
      color: faction.color || this.generateColor(),
      relatedFactionIds: faction.relatedFactionIds || [],
      memberCount: faction.memberCount || 0,
      affiliatedPersonIds: faction.affiliatedPersonIds || [],
      affiliatedOrganizationIds: faction.affiliatedOrganizationIds || [],
      createdAt: new Date().toISOString()
    });
    this.save();
    return id;
  }

  updateFaction(id, updates) {
    const idx = this.data.factions.findIndex(f => f.id === id);
    if (idx !== -1) {
      this.data.factions[idx] = {
        ...this.data.factions[idx],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.save();
    }
  }

  deleteFaction(id) {
    this.data.factions = this.data.factions.filter(f => f.id !== id);
    // Clean up references
    this.data.narratives.forEach(n => delete n.factionMentions[id]);
    this.data.subNarratives.forEach(s => delete s.factionMentions[id]);
    this.data.factionOverlaps = this.data.factionOverlaps.filter(
      o => !o.factionIds.includes(id)
    );
    this.data.persons.forEach(p => {
      p.affiliatedFactionIds = (p.affiliatedFactionIds || []).filter(fid => fid !== id);
      delete p.factionSentiment[id];
    });
    this.data.organizations.forEach(o => {
      o.affiliatedFactionIds = (o.affiliatedFactionIds || []).filter(fid => fid !== id);
      delete o.factionSentiment[id];
    });
    this.save();
  }

  // ============================================
  // Location CRUD
  // ============================================

  createLocation(location) {
    const id = this.generateId('loc');
    this.data.locations.push({
      id,
      name: location.name,
      coordinates: location.coordinates || { lat: 0, lng: 0 },
      type: location.type || 'general',
      createdAt: new Date().toISOString()
    });
    this.save();
    return id;
  }

  updateLocation(id, updates) {
    const idx = this.data.locations.findIndex(l => l.id === id);
    if (idx !== -1) {
      this.data.locations[idx] = {
        ...this.data.locations[idx],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.save();
    }
  }

  deleteLocation(id) {
    this.data.locations = this.data.locations.filter(l => l.id !== id);
    // Clean up references
    this.data.narratives.forEach(n => {
      n.locationIds = n.locationIds.filter(lid => lid !== id);
    });
    this.data.subNarratives.forEach(s => {
      s.locationIds = s.locationIds.filter(lid => lid !== id);
    });
    this.data.events.forEach(e => {
      if (e.locationId === id) e.locationId = null;
    });
    this.data.persons.forEach(p => {
      p.relatedLocationIds = (p.relatedLocationIds || []).filter(lid => lid !== id);
    });
    this.data.organizations.forEach(o => {
      o.relatedLocationIds = (o.relatedLocationIds || []).filter(lid => lid !== id);
    });
    this.save();
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
    const id = this.generateId('person');
    this.data.persons.push({
      id,
      name: person.name,
      type: person.type || 'general',
      imageUrl: person.imageUrl || null,
      affiliatedFactionIds: person.affiliatedFactionIds || [],
      relatedLocationIds: person.relatedLocationIds || [],
      relatedEventIds: person.relatedEventIds || [],
      factionSentiment: person.factionSentiment || {},
      createdAt: new Date().toISOString()
    });
    this.save();
    return id;
  }

  updatePerson(id, updates) {
    const idx = this.data.persons.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.data.persons[idx] = {
        ...this.data.persons[idx],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.save();
    }
  }

  deletePerson(id) {
    this.data.persons = this.data.persons.filter(p => p.id !== id);
    // Clean up references in narratives, sub-narratives, events, and factions
    this.data.narratives.forEach(n => {
      n.personIds = n.personIds.filter(pid => pid !== id);
    });
    this.data.subNarratives.forEach(s => {
      s.personIds = s.personIds.filter(pid => pid !== id);
    });
    this.data.events.forEach(e => {
      e.personIds = e.personIds.filter(pid => pid !== id);
    });
    this.data.factions.forEach(f => {
      f.affiliatedPersonIds = (f.affiliatedPersonIds || []).filter(pid => pid !== id);
    });
    this.save();
  }

  // ============================================
  // Organization CRUD
  // ============================================

  createOrganization(org) {
    const id = this.generateId('org');
    this.data.organizations.push({
      id,
      name: org.name,
      type: org.type || 'general',
      affiliatedFactionIds: org.affiliatedFactionIds || [],
      relatedLocationIds: org.relatedLocationIds || [],
      factionSentiment: org.factionSentiment || {},
      createdAt: new Date().toISOString()
    });
    this.save();
    return id;
  }

  updateOrganization(id, updates) {
    const idx = this.data.organizations.findIndex(o => o.id === id);
    if (idx !== -1) {
      this.data.organizations[idx] = {
        ...this.data.organizations[idx],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.save();
    }
  }

  deleteOrganization(id) {
    this.data.organizations = this.data.organizations.filter(o => o.id !== id);
    // Clean up references in narratives, sub-narratives, events, and factions
    this.data.narratives.forEach(n => {
      n.organizationIds = n.organizationIds.filter(oid => oid !== id);
    });
    this.data.subNarratives.forEach(s => {
      s.organizationIds = s.organizationIds.filter(oid => oid !== id);
    });
    this.data.events.forEach(e => {
      e.organizationIds = e.organizationIds.filter(oid => oid !== id);
    });
    this.data.factions.forEach(f => {
      f.affiliatedOrganizationIds = (f.affiliatedOrganizationIds || []).filter(oid => oid !== id);
    });
    this.save();
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

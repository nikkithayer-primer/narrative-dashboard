/**
 * MapView.js
 * Leaflet map component for location visualization
 */

import { BaseComponent } from './BaseComponent.js';

export class MapView extends BaseComponent {
  constructor(containerId, options = {}) {
    super(containerId, {
      height: 400,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      defaultCenter: [39.8283, -98.5795], // US center
      defaultZoom: 4,
      ...options
    });
    this.map = null;
    this.markers = [];
    this.markerLayer = null;
  }

  render() {
    if (!this.data || !this.data.locations || !this.data.locations.length) {
      this.showEmptyState('No locations to display');
      return;
    }

    // Clean up existing map
    if (this.map) {
      this.map.remove();
      this.map = null;
    }

    this.clear();
    this.markers = [];

    // Set container dimensions
    this.container.style.height = `${this.options.height}px`;
    this.container.classList.add('map-container');

    // Initialize map without default zoom control
    this.map = L.map(this.container, {
      zoomControl: false,
      attributionControl: false
    }).setView(this.options.defaultCenter, this.options.defaultZoom);

    // Dark tile layer (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(this.map);

    // Add custom zoom controls
    this.addCustomZoomControls();

    // Marker layer group
    this.markerLayer = L.layerGroup().addTo(this.map);

    // Add markers
    const bounds = [];

    this.data.locations.forEach(loc => {
      if (!loc.coordinates || 
          typeof loc.coordinates.lat !== 'number' || 
          typeof loc.coordinates.lng !== 'number') {
        return;
      }

      const coords = [loc.coordinates.lat, loc.coordinates.lng];
      bounds.push(coords);

      // Determine marker color
      const markerColor = loc.isEvent ? '#F44336' : '#2196F3';

      // Create custom marker
      const markerIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div class="marker-wrapper">
            <div class="marker-pin" style="background: ${markerColor}"></div>
            <div class="marker-pulse" style="background: ${markerColor}"></div>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
      });

      const marker = L.marker(coords, { icon: markerIcon });

      // Popup content with view link
      const popupContent = `
        <div class="map-popup">
          <h4>${loc.name}</h4>
          ${loc.type ? `<p class="location-type">${loc.type}</p>` : ''}
          ${loc.eventText ? `<p class="event-text">${loc.eventText}</p>` : ''}
          ${loc.narrativeCount ? `<p class="meta">${loc.narrativeCount} related narratives</p>` : ''}
          ${loc.eventCount ? `<p class="meta">${loc.eventCount} events</p>` : ''}
          <a href="#/location/${loc.id}" class="map-popup-link">View Location →</a>
        </div>
      `;
      marker.bindPopup(popupContent, {
        closeButton: true,
        autoClose: false,
        closeOnClick: false
      });

      // Track hover state for this marker
      let isHoveringMarker = false;
      let isHoveringPopup = false;
      let isClickLocked = false;

      const closePopupIfNotHovered = () => {
        setTimeout(() => {
          if (!isHoveringMarker && !isHoveringPopup && !isClickLocked) {
            marker.closePopup();
          }
        }, 150);
      };

      // Hover handlers - show/hide popup on hover
      marker.on('mouseover', () => {
        isHoveringMarker = true;
        marker.openPopup();
      });

      marker.on('mouseout', () => {
        isHoveringMarker = false;
        closePopupIfNotHovered();
      });

      // Add popup event listeners when it opens
      marker.on('popupopen', () => {
        const popupEl = marker.getPopup().getElement();
        if (popupEl) {
          popupEl.addEventListener('mouseenter', () => {
            isHoveringPopup = true;
          });
          popupEl.addEventListener('mouseleave', () => {
            isHoveringPopup = false;
            closePopupIfNotHovered();
          });
        }
      });

      marker.on('popupclose', () => {
        isHoveringPopup = false;
        isClickLocked = false;
      });

      // Click handler - fly to location and show popup
      marker.on('click', () => {
        // Lock the popup open after click
        isClickLocked = true;
        
        // Fly to the location with animation
        this.map.flyTo(coords, 12, { animate: true, duration: 1 });
        
        // Keep the popup open
        marker.openPopup();
        
        // Call optional callback (but don't navigate)
        if (this.options.onMarkerClick) {
          this.options.onMarkerClick(loc, marker);
        }
      });

      marker.addTo(this.markerLayer);
      this.markers.push({ marker, location: loc });
    });

    // Store bounds for reset functionality
    this.initialBounds = bounds.length > 0 ? bounds : null;

    // Fit bounds
    if (bounds.length > 1) {
      this.map.fitBounds(bounds, { padding: [50, 50] });
    } else if (bounds.length === 1) {
      this.map.setView(bounds[0], 10);
    }

    // Force map resize after render
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 100);
  }

  /**
   * Add custom zoom controls styled like timeline controls
   */
  addCustomZoomControls() {
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'map-zoom-controls';
    controlsDiv.innerHTML = `
      <button class="map-zoom-btn" data-action="in" title="Zoom In">+</button>
      <button class="map-zoom-btn" data-action="out" title="Zoom Out">−</button>
      <button class="map-zoom-btn" data-action="reset" title="Reset View">⟲</button>
    `;
    this.container.appendChild(controlsDiv);

    // Add click handlers
    controlsDiv.querySelectorAll('.map-zoom-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        this.handleZoomControl(action);
      });
    });
  }

  /**
   * Handle zoom control button clicks
   */
  handleZoomControl(action) {
    if (!this.map) return;

    switch (action) {
      case 'in':
        this.map.zoomIn();
        break;
      case 'out':
        this.map.zoomOut();
        break;
      case 'reset':
        this.resetView();
        break;
    }
  }

  /**
   * Reset map to initial view showing all markers
   */
  resetView() {
    if (!this.map) return;

    if (this.initialBounds && this.initialBounds.length > 1) {
      this.map.fitBounds(this.initialBounds, { padding: [50, 50], animate: true });
    } else if (this.initialBounds && this.initialBounds.length === 1) {
      this.map.setView(this.initialBounds[0], 10, { animate: true });
    } else {
      this.map.setView(this.options.defaultCenter, this.options.defaultZoom, { animate: true });
    }
  }

  /**
   * Center map on specific location
   */
  centerOn(lat, lng, zoom = 12) {
    if (this.map) {
      this.map.setView([lat, lng], zoom);
    }
  }

  /**
   * Add a single marker
   */
  addMarker(location) {
    if (!this.map || !location.coordinates) return;

    const coords = [location.coordinates.lat, location.coordinates.lng];
    const markerColor = location.isEvent ? '#F44336' : '#2196F3';

    const markerIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div class="marker-wrapper">
          <div class="marker-pin" style="background: ${markerColor}"></div>
          <div class="marker-pulse" style="background: ${markerColor}"></div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });

    const marker = L.marker(coords, { icon: markerIcon });
    marker.addTo(this.markerLayer);
    this.markers.push(marker);

    return marker;
  }

  /**
   * Clear all markers
   */
  clearMarkers() {
    if (this.markerLayer) {
      this.markerLayer.clearLayers();
    }
    this.markers = [];
  }

  /**
   * Zoom to a specific location by ID
   */
  zoomToLocation(locationId) {
    const markerData = this.markers.find(m => m.location && m.location.id === locationId);
    if (markerData) {
      const coords = [markerData.location.coordinates.lat, markerData.location.coordinates.lng];
      this.map.setView(coords, 12, { animate: true });
      markerData.marker.openPopup();
    }
  }

  destroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
    this.markers = [];
    this.markerLayer = null;
    super.destroy();
  }
}

export default MapView;

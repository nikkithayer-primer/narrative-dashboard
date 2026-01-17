/**
 * NetworkGraph.js
 * Force-directed network visualization for people and organizations
 * Links are derived from shared narratives and are clickable to view connecting narratives
 */

import { BaseComponent } from './BaseComponent.js';

export class NetworkGraph extends BaseComponent {
  constructor(containerId, options = {}) {
    super(containerId, {
      height: 400,
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
      nodeRadius: 20,
      linkDistance: 120,
      chargeStrength: -400,
      ...options
    });
    this.simulation = null;
    this.tooltip = null;
    this._previousDimensions = null;
  }

  /**
   * Override resize to recenter nodes within new dimensions
   */
  resize() {
    if (this.container && this.data) {
      const oldWidth = this.options.width;
      const oldHeight = this.options.height;
      
      // Update dimensions
      this.options.width = this.container.clientWidth;
      const newHeight = this.container.clientHeight;
      if (newHeight > 0) {
        this.options.height = newHeight;
      }
      
      // Recenter existing node positions proportionally
      if (this.data.nodes && oldWidth > 0 && oldHeight > 0) {
        const widthRatio = this.options.width / oldWidth;
        const heightRatio = this.options.height / oldHeight;
        const oldCenterX = oldWidth / 2;
        const oldCenterY = oldHeight / 2;
        const newCenterX = this.options.width / 2;
        const newCenterY = this.options.height / 2;
        
        this.data.nodes.forEach(node => {
          if (node.x !== undefined && node.y !== undefined) {
            // Translate node position relative to new center
            node.x = newCenterX + (node.x - oldCenterX) * widthRatio;
            node.y = newCenterY + (node.y - oldCenterY) * heightRatio;
          }
        });
      }
      
      this.render();
    }
    return this;
  }

  render() {
    if (!this.data || !this.data.nodes || !this.data.nodes.length) {
      this.showEmptyState('No connections to display');
      return;
    }

    const { width, height, nodeRadius, linkDistance, chargeStrength } = this.options;
    const { nodes, links } = this.data;

    // Deep clone to avoid mutation, preserving narratives data
    const nodesCopy = nodes.map(n => ({ ...n }));
    const linksCopy = links.map(l => ({
      source: l.source,
      target: l.target,
      type: l.type,
      narratives: l.narratives || [],
      strength: l.strength || 1
    }));

    // Create tooltip if it doesn't exist
    this.createTooltip();

    const svg = this.createSvg();

    // Defs for markers and filters
    const defs = svg.append('defs');

    // Arrow marker
    defs.append('marker')
      .attr('id', `arrowhead-${this.containerId}`)
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 28)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .append('path')
      .attr('d', 'M 0,-5 L 10,0 L 0,5')
      .attr('fill', 'var(--border-color)');

    // Glow filter
    const filter = defs.append('filter')
      .attr('id', `glow-${this.containerId}`)
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '3')
      .attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Stop existing simulation
    if (this.simulation) {
      this.simulation.stop();
    }

    // Create simulation
    this.simulation = d3.forceSimulation(nodesCopy)
      .force('link', d3.forceLink(linksCopy)
        .id(d => d.id)
        .distance(linkDistance))
      .force('charge', d3.forceManyBody().strength(chargeStrength))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(nodeRadius + 10));

    // Draw links - now with variable width based on strength
    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(linksCopy)
      .join('line')
      .attr('class', d => `link link-${d.type} ${d.narratives.length > 0 ? 'link-clickable' : ''}`)
      .attr('stroke', d => {
        if (d.type === 'person-person') return 'var(--accent-success)';
        if (d.type === 'org-org') return 'var(--accent-purple)';
        return 'var(--accent-primary)';
      })
      .attr('stroke-opacity', 0.5)
      .attr('stroke-width', d => Math.min(2 + d.strength, 6))
      .style('cursor', d => d.narratives.length > 0 ? 'pointer' : 'default');

    // Link hover effects
    link.on('mouseover', (event, d) => {
      if (d.narratives.length > 0) {
        d3.select(event.target)
          .attr('stroke-opacity', 0.9)
          .attr('stroke-width', d => Math.min(3 + d.strength, 8));
        
        this.showTooltip(event, d);
      }
    })
    .on('mouseout', (event, d) => {
      d3.select(event.target)
        .attr('stroke-opacity', 0.5)
        .attr('stroke-width', d => Math.min(2 + d.strength, 6));
      
      this.hideTooltip();
    })
    .on('click', (event, d) => {
      if (d.narratives.length > 0 && this.options.onLinkClick) {
        this.options.onLinkClick(d);
      }
    });

    // Draw nodes
    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodesCopy)
      .join('g')
      .attr('class', d => `node node-${d.type}`)
      .call(this.drag(this.simulation));

    // Node glow circle
    node.append('circle')
      .attr('r', nodeRadius + 3)
      .attr('fill', 'none')
      .attr('stroke', d => d.type === 'person' ? 'var(--accent-success)' : 'var(--accent-primary)')
      .attr('stroke-width', 0)
      .attr('class', 'node-glow');

    // Node main circle
    node.append('circle')
      .attr('r', nodeRadius)
      .attr('fill', d => d.type === 'person' ? 'var(--accent-success)' : 'var(--accent-primary)')
      .attr('stroke', 'var(--bg-primary)')
      .attr('stroke-width', 3);

    // Node icon
    node.append('text')
      .text(d => d.type === 'person' ? '👤' : '🏢')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('font-size', '14px')
      .style('pointer-events', 'none');

    // Node label
    node.append('text')
      .text(d => d.label.length > 18 ? d.label.slice(0, 16) + '...' : d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', nodeRadius + 16)
      .attr('class', 'node-label')
      .attr('fill', 'var(--text-secondary)')
      .attr('font-size', '11px')
      .style('pointer-events', 'none');

    // Hover effects
    node.on('mouseover', function() {
      d3.select(this).select('.node-glow')
        .attr('stroke-width', 4)
        .attr('filter', `url(#glow-${this.containerId})`);
    }.bind(this))
    .on('mouseout', function() {
      d3.select(this).select('.node-glow')
        .attr('stroke-width', 0)
        .attr('filter', null);
    });

    // Click handler
    node.on('click', (event, d) => {
      if (this.options.onNodeClick) {
        this.options.onNodeClick(d);
      }
    });

    // Simulation tick
    this.simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('transform', d => {
        // Keep within bounds
        d.x = Math.max(nodeRadius, Math.min(width - nodeRadius, d.x));
        d.y = Math.max(nodeRadius, Math.min(height - nodeRadius, d.y));
        return `translate(${d.x},${d.y})`;
      });
    });
  }

  createTooltip() {
    // Remove existing tooltip
    if (this.tooltip) {
      this.tooltip.remove();
    }
    
    // Create tooltip element
    this.tooltip = d3.select('body')
      .append('div')
      .attr('class', 'network-graph-tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background', 'var(--bg-secondary)')
      .style('border', '1px solid var(--border-color)')
      .style('border-radius', '8px')
      .style('padding', '12px')
      .style('font-size', '12px')
      .style('color', 'var(--text-primary)')
      .style('box-shadow', '0 4px 12px rgba(0,0,0,0.3)')
      .style('max-width', '300px')
      .style('z-index', '1000')
      .style('pointer-events', 'none');
  }

  showTooltip(event, d) {
    const narrativeCount = d.narratives.length;
    const narrativeList = d.narratives.slice(0, 3).map(n => 
      `<div style="margin: 4px 0; padding: 4px 8px; background: var(--bg-tertiary); border-radius: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
        ${n.text.length > 50 ? n.text.slice(0, 47) + '...' : n.text}
      </div>`
    ).join('');
    
    const moreText = narrativeCount > 3 
      ? `<div style="color: var(--text-muted); font-size: 11px; margin-top: 4px;">+${narrativeCount - 3} more narratives</div>` 
      : '';

    this.tooltip
      .html(`
        <div style="font-weight: 600; margin-bottom: 8px; color: var(--text-secondary);">
          Connected by ${narrativeCount} narrative${narrativeCount !== 1 ? 's' : ''}
        </div>
        ${narrativeList}
        ${moreText}
        <div style="color: var(--accent-primary); font-size: 11px; margin-top: 8px;">Click to view details</div>
      `)
      .style('visibility', 'visible')
      .style('left', (event.pageX + 10) + 'px')
      .style('top', (event.pageY - 10) + 'px');
  }

  hideTooltip() {
    if (this.tooltip) {
      this.tooltip.style('visibility', 'hidden');
    }
  }

  drag(simulation) {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  }

  destroy() {
    if (this.simulation) {
      this.simulation.stop();
      this.simulation = null;
    }
    if (this.tooltip) {
      this.tooltip.remove();
      this.tooltip = null;
    }
    super.destroy();
  }
}

export default NetworkGraph;

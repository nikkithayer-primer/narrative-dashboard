/**
 * FactionSourceHeatmap.js
 * Matrix visualization showing which platforms each faction uses most
 */

import { BaseComponent } from './BaseComponent.js';

export class FactionSourceHeatmap extends BaseComponent {
  constructor(containerId, options = {}) {
    super(containerId, {
      height: options.height || 280,
      cellSize: options.cellSize || 36,
      showValues: options.showValues !== false,
      showLegend: options.showLegend !== false,
      colorScheme: options.colorScheme || 'blues',
      ...options
    });
  }

  render() {
    if (!this.container || !this.data) {
      return this.showEmptyState('No faction source data available');
    }

    const { factionSources, sources, factions } = this.data;
    
    if (!factionSources || factionSources.length === 0) {
      return this.showEmptyState('No faction source data available');
    }

    this.clear();

    // Collect all unique source IDs and get max value
    const allSourceIds = new Set();
    let maxValue = 0;

    factionSources.forEach(fs => {
      fs.sources.forEach(s => {
        allSourceIds.add(s.source.id);
        if (s.volume > maxValue) maxValue = s.volume;
      });
    });

    // Get unique sources in order (social first, then news)
    const sourceOrder = sources
      .filter(s => allSourceIds.has(s.id))
      .sort((a, b) => {
        // Social media first
        if (a.type === 'social' && b.type !== 'social') return -1;
        if (a.type !== 'social' && b.type === 'social') return 1;
        // Then national news
        if (a.type === 'national_news' && b.type === 'international_news') return -1;
        if (a.type === 'international_news' && b.type === 'national_news') return 1;
        return 0;
      });

    if (sourceOrder.length === 0) {
      return this.showEmptyState('No source data available');
    }

    const cellSize = this.options.cellSize;
    const labelWidth = 120;
    const topLabelHeight = 80;
    const width = labelWidth + (sourceOrder.length * cellSize) + 20;
    const height = topLabelHeight + (factionSources.length * cellSize) + 40;

    // Create SVG
    const svg = d3.select(this.container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${labelWidth}, ${topLabelHeight})`);

    // Color scale
    const colorScale = d3.scaleSequential()
      .domain([0, maxValue])
      .interpolator(this.getColorInterpolator());

    // Create tooltip
    const tooltip = d3.select(this.container)
      .append('div')
      .attr('class', 'heatmap-tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('pointer-events', 'none')
      .style('background', 'var(--bg-secondary)')
      .style('border', '1px solid var(--border-color)')
      .style('border-radius', 'var(--border-radius)')
      .style('padding', '8px 12px')
      .style('font-size', '12px')
      .style('z-index', '100');

    const self = this;

    // Draw cells
    factionSources.forEach((fs, rowIdx) => {
      const row = g.append('g')
        .attr('class', 'heatmap-row')
        .attr('transform', `translate(0, ${rowIdx * cellSize})`);

      sourceOrder.forEach((source, colIdx) => {
        const sourceData = fs.sources.find(s => s.source.id === source.id);
        const value = sourceData ? sourceData.volume : 0;

        const cell = row.append('g')
          .attr('class', 'heatmap-cell')
          .attr('transform', `translate(${colIdx * cellSize}, 0)`);

        cell.append('rect')
          .attr('width', cellSize - 2)
          .attr('height', cellSize - 2)
          .attr('rx', 3)
          .attr('fill', value > 0 ? colorScale(value) : 'var(--bg-tertiary)')
          .attr('stroke', 'var(--border-subtle)')
          .attr('stroke-width', 1)
          .style('cursor', 'pointer')
          .on('mouseover', function(event) {
            d3.select(this)
              .attr('stroke', 'var(--accent-primary)')
              .attr('stroke-width', 2);

            tooltip
              .html(`
                <div style="font-weight: 600; margin-bottom: 4px;">
                  ${fs.faction.name}
                </div>
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                  <span style="width: 8px; height: 8px; border-radius: 2px; background: ${source.color};"></span>
                  ${source.name}
                </div>
                <div style="color: var(--text-muted);">
                  Volume: ${self.formatNumber(value)}
                </div>
              `)
              .style('opacity', 1);
          })
          .on('mousemove', function(event) {
            const rect = self.container.getBoundingClientRect();
            tooltip
              .style('left', (event.clientX - rect.left + 10) + 'px')
              .style('top', (event.clientY - rect.top - 10) + 'px');
          })
          .on('mouseout', function() {
            d3.select(this)
              .attr('stroke', 'var(--border-subtle)')
              .attr('stroke-width', 1);
            tooltip.style('opacity', 0);
          });

        // Add value text if enabled and value > 0
        if (this.options.showValues && value > 0) {
          cell.append('text')
            .attr('x', (cellSize - 2) / 2)
            .attr('y', (cellSize - 2) / 2)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('fill', value > maxValue * 0.6 ? 'white' : 'var(--text-primary)')
            .attr('font-size', '10px')
            .attr('font-weight', '500')
            .attr('pointer-events', 'none')
            .text(this.formatCompact(value));
        }
      });
    });

    // Draw column labels (sources)
    const columnLabels = g.append('g')
      .attr('class', 'column-labels')
      .attr('transform', `translate(0, -8)`);

    sourceOrder.forEach((source, idx) => {
      const labelGroup = columnLabels.append('g')
        .attr('transform', `translate(${idx * cellSize + (cellSize - 2) / 2}, 0)`);

      // Source icon/color indicator
      labelGroup.append('rect')
        .attr('x', -4)
        .attr('y', -topLabelHeight + 10)
        .attr('width', 8)
        .attr('height', 8)
        .attr('rx', 2)
        .attr('fill', source.color);

      // Source name (rotated)
      labelGroup.append('text')
        .attr('transform', 'rotate(-45)')
        .attr('text-anchor', 'start')
        .attr('x', 5)
        .attr('y', 0)
        .attr('font-size', '11px')
        .attr('fill', 'var(--text-secondary)')
        .text(source.name);
    });

    // Draw row labels (factions)
    const rowLabels = svg.append('g')
      .attr('class', 'row-labels')
      .attr('transform', `translate(0, ${topLabelHeight})`);

    factionSources.forEach((fs, idx) => {
      const labelGroup = rowLabels.append('g')
        .attr('transform', `translate(${labelWidth - 8}, ${idx * cellSize + cellSize / 2})`);

      // Faction color indicator
      labelGroup.append('rect')
        .attr('x', -labelWidth + 8)
        .attr('y', -5)
        .attr('width', 10)
        .attr('height', 10)
        .attr('rx', 2)
        .attr('fill', fs.faction.color);

      // Faction name
      labelGroup.append('text')
        .attr('x', -labelWidth + 24)
        .attr('y', 0)
        .attr('dominant-baseline', 'middle')
        .attr('text-anchor', 'start')
        .attr('font-size', '11px')
        .attr('fill', 'var(--text-primary)')
        .text(this.truncateText(fs.faction.name, 14));
    });

    // Add legend if enabled
    if (this.options.showLegend) {
      this.renderLegend(svg, width, height, colorScale, maxValue);
    }
  }

  getColorInterpolator() {
    const schemes = {
      blues: d3.interpolateBlues,
      greens: d3.interpolateGreens,
      purples: d3.interpolatePurples,
      oranges: d3.interpolateOranges,
      viridis: d3.interpolateViridis
    };
    return schemes[this.options.colorScheme] || schemes.blues;
  }

  renderLegend(svg, width, height, colorScale, maxValue) {
    const legendWidth = 100;
    const legendHeight = 10;
    const legendX = width - legendWidth - 20;
    const legendY = height - 25;

    const legend = svg.append('g')
      .attr('class', 'heatmap-legend')
      .attr('transform', `translate(${legendX}, ${legendY})`);

    // Create gradient
    const gradientId = `heatmap-gradient-${Date.now()}`;
    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', gradientId)
      .attr('x1', '0%')
      .attr('x2', '100%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', colorScale(0));

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', colorScale(maxValue));

    legend.append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('rx', 2)
      .attr('fill', `url(#${gradientId})`);

    legend.append('text')
      .attr('x', 0)
      .attr('y', -4)
      .attr('font-size', '9px')
      .attr('fill', 'var(--text-muted)')
      .text('0');

    legend.append('text')
      .attr('x', legendWidth)
      .attr('y', -4)
      .attr('text-anchor', 'end')
      .attr('font-size', '9px')
      .attr('fill', 'var(--text-muted)')
      .text(this.formatCompact(maxValue));
  }

  formatCompact(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'k';
    }
    return num.toString();
  }

  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 1) + '…';
  }
}

export default FactionSourceHeatmap;

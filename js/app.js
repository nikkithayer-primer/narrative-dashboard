/**
 * app.js
 * Main application entry point
 */

import { dataStore } from './data/DataStore.js';
import { DataService } from './data/DataService.js';
import { initializeMockData } from './data/mockData.js';
import { Router } from './router.js';

class App {
  constructor() {
    this.router = null;
    this.dataStore = dataStore;
    this.chatOpen = false;
  }

  /**
   * Initialize the application
   */
  async init() {
    console.log('Initializing Primer...');

    // Initialize with mock data if empty
    initializeMockData(this.dataStore);

    // Populate mission filter
    this.populateMissionFilter();

    // Initialize router
    this.router = new Router('app');
    this.router.init();

    // Initialize chat
    this.initChat();

    // Subscribe to data changes
    this.dataStore.subscribe(() => {
      this.populateMissionFilter();
      // Also refresh time filter when data changes
      if (this.router) {
        this.router.refreshTimeFilter();
      }
    });

    console.log('Primer initialized');
  }

  /**
   * Populate mission filter dropdown
   */
  populateMissionFilter() {
    const select = document.getElementById('mission-filter');
    if (!select) return;

    const missions = DataService.getMissions();
    const currentValue = select.value;

    select.innerHTML = `
      <option value="all">All Missions</option>
      ${missions.map(m => `
        <option value="${m.id}" ${currentValue === m.id ? 'selected' : ''}>
          ${m.name}
        </option>
      `).join('')}
    `;
  }

  /**
   * Show toast notification
   */
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /**
   * Show modal dialog
   */
  showModal(content, options = {}) {
    const container = document.getElementById('modal-container');
    const modalContent = container.querySelector('.modal-content');
    
    modalContent.innerHTML = content;
    container.classList.remove('hidden');

    // Close on backdrop click
    container.querySelector('.modal-backdrop').onclick = () => {
      if (!options.preventClose) {
        this.closeModal();
      }
    };

    // Close on escape key
    const escHandler = (e) => {
      if (e.key === 'Escape' && !options.preventClose) {
        this.closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }

  /**
   * Close modal dialog
   */
  closeModal() {
    const container = document.getElementById('modal-container');
    container.classList.add('hidden');
  }

  /**
   * Confirm dialog
   */
  confirm(message, title = 'Confirm') {
    return new Promise((resolve) => {
      this.showModal(`
        <div class="confirm-dialog">
          <div class="confirm-dialog-icon">⚠</div>
          <h3 class="confirm-dialog-title">${title}</h3>
          <p class="confirm-dialog-message">${message}</p>
          <div class="confirm-dialog-actions">
            <button class="btn btn-secondary" id="confirm-cancel">Cancel</button>
            <button class="btn btn-danger" id="confirm-ok">Confirm</button>
          </div>
        </div>
      `);

      document.getElementById('confirm-cancel').onclick = () => {
        this.closeModal();
        resolve(false);
      };

      document.getElementById('confirm-ok').onclick = () => {
        this.closeModal();
        resolve(true);
      };
    });
  }

  /**
   * Initialize chat functionality
   */
  initChat() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');

    if (chatToggle) {
      chatToggle.addEventListener('click', () => this.toggleChat());
    }

    if (chatClose) {
      chatClose.addEventListener('click', () => this.toggleChat(false));
    }

    if (chatInput) {
      // Auto-resize textarea
      chatInput.addEventListener('input', () => {
        chatInput.style.height = 'auto';
        chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
      });

      // Send on Enter (without Shift)
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendChatMessage();
        }
      });
    }

    if (chatSend) {
      chatSend.addEventListener('click', () => this.sendChatMessage());
    }

    // Add tooltips to nav links for collapsed state
    document.querySelectorAll('.nav-link').forEach(link => {
      const text = link.textContent.trim();
      link.setAttribute('data-tooltip', text);
    });
  }

  /**
   * Toggle chat panel open/closed
   */
  toggleChat(forceState) {
    const chatPanel = document.getElementById('chat-panel');
    const chatToggle = document.getElementById('chat-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    this.chatOpen = forceState !== undefined ? forceState : !this.chatOpen;

    if (this.chatOpen) {
      chatPanel?.classList.add('open');
      chatToggle?.classList.add('active');
      sidebar?.classList.add('collapsed');
      document.body.classList.add('chat-open');
      
      // Focus input when opening
      setTimeout(() => {
        document.getElementById('chat-input')?.focus();
      }, 250);
    } else {
      chatPanel?.classList.remove('open');
      chatToggle?.classList.remove('active');
      sidebar?.classList.remove('collapsed');
      document.body.classList.remove('chat-open');
    }
  }

  /**
   * Send a chat message
   */
  sendChatMessage() {
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    if (!chatInput || !chatMessages) return;

    const message = chatInput.value.trim();
    if (!message) return;

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.innerHTML = `<div class="chat-message-content">${this.escapeHtml(message)}</div>`;
    chatMessages.appendChild(userMsg);

    // Clear input
    chatInput.value = '';
    chatInput.style.height = 'auto';

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-message assistant';
    typingIndicator.innerHTML = `
      <div class="chat-typing">
        <span class="chat-typing-dot"></span>
        <span class="chat-typing-dot"></span>
        <span class="chat-typing-dot"></span>
      </div>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate response delay
    setTimeout(() => {
      typingIndicator.remove();
      this.addAssistantMessage(this.getPlaceholderResponse(message));
    }, 1000 + Math.random() * 1000);
  }

  /**
   * Add an assistant message to the chat
   */
  addAssistantMessage(text) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

    const assistantMsg = document.createElement('div');
    assistantMsg.className = 'chat-message assistant';
    assistantMsg.innerHTML = `<div class="chat-message-content">${text}</div>`;
    chatMessages.appendChild(assistantMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  /**
   * Get a placeholder response based on the user's message
   */
  getPlaceholderResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Context-aware placeholder responses
    if (lowerMessage.includes('narrative') || lowerMessage.includes('story')) {
      return "I found several narratives related to your query. In a full implementation, I would analyze the narrative database and provide insights on themes, sentiment trends, and faction involvement. For now, you can explore narratives using the sidebar navigation.";
    }
    
    if (lowerMessage.includes('faction') || lowerMessage.includes('group')) {
      return "Faction analysis is a key feature of Primer. I would typically provide breakdowns of faction activities, their associated narratives, and sentiment patterns. Check the Factions view for detailed faction information.";
    }
    
    if (lowerMessage.includes('event') || lowerMessage.includes('timeline')) {
      return "Events are tracked chronologically in the system. I could help you identify patterns, correlations between events and narrative spikes, or flag significant developments. The Events view shows the full timeline.";
    }
    
    if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('map')) {
      return "Geographic analysis helps identify regional narrative patterns. I would analyze location-based data to show hotspots and regional trends. Explore the Locations view for map-based insights.";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you')) {
      return "I'm designed to help you analyze disinformation narratives, track faction activities, identify trends, and explore connections in the data. You can ask me about specific narratives, factions, events, or locations. Note: This is a mockup with placeholder responses.";
    }
    
    if (lowerMessage.includes('trend') || lowerMessage.includes('pattern')) {
      return "Trend analysis would show you how narratives evolve over time, identify emerging themes, and detect coordinated amplification patterns. The dashboard charts provide visual trend information.";
    }

    // Default responses
    const defaultResponses = [
      "I understand you're asking about \"" + message.substring(0, 50) + (message.length > 50 ? "..." : "") + "\". In a production environment, I would query the narrative database and provide detailed analysis. For now, explore the dashboard to find relevant information.",
      "That's an interesting question. While I'm currently showing placeholder responses, a full implementation would provide AI-powered insights based on the narrative data. Try browsing the available views for more information.",
      "I've noted your query. In the complete system, I would analyze patterns across narratives, factions, and events to provide actionable intelligence. The sidebar navigation can help you explore different data categories.",
      "Thanks for your question. This mockup demonstrates the chat interface. A production version would integrate with AI models to provide real-time analysis of disinformation narratives and faction activities."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Create and initialize app
const app = new App();

// Make app globally accessible
window.app = app;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});

export default app;

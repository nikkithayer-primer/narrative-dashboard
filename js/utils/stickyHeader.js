/**
 * stickyHeader.js
 * Utility to manage sticky header behavior with scroll-based description hiding
 */

let scrollContainer = null;
let lastScrollTop = 0;
let scrollThreshold = 50; // Pixels to scroll before triggering
let isInitialized = false;

/**
 * Get the actual scroll container
 */
function getScrollContainer() {
  // Try .main-content first (when inside content-wrapper)
  const mainContent = document.querySelector('.main-content');
  if (mainContent && mainContent.scrollHeight > mainContent.clientHeight) {
    return mainContent;
  }
  // Fall back to window
  return null;
}

/**
 * Get current scroll position
 */
function getScrollTop() {
  if (scrollContainer) {
    return scrollContainer.scrollTop;
  }
  return window.scrollY;
}

/**
 * Initialize sticky header scroll behavior
 * Call this after rendering a view with a page-header
 */
export function initStickyHeader() {
  // Determine the scroll container
  scrollContainer = getScrollContainer();
  
  // Remove any existing listeners
  window.removeEventListener('scroll', handleScroll);
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', handleScroll);
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
  } else {
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
  
  // Reset scroll state
  lastScrollTop = getScrollTop();
  isInitialized = true;
  
  // Initial check
  updateHeaderState();
}

/**
 * Handle scroll events
 */
function handleScroll() {
  if (!isInitialized) return;
  
  requestAnimationFrame(updateHeaderState);
}

/**
 * Update header state based on scroll position
 */
function updateHeaderState() {
  const currentScrollTop = getScrollTop();
  const pageHeader = document.querySelector('.page-header');
  
  if (!pageHeader) return;
  
  // Add scrolled class when scrolled past threshold
  if (currentScrollTop > scrollThreshold) {
    pageHeader.classList.add('scrolled');
  } else {
    pageHeader.classList.remove('scrolled');
  }
  
  lastScrollTop = currentScrollTop;
}

/**
 * Clean up scroll listener
 */
export function destroyStickyHeader() {
  window.removeEventListener('scroll', handleScroll);
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', handleScroll);
  }
  scrollContainer = null;
  isInitialized = false;
}

/**
 * Reset header to expanded state
 */
export function resetStickyHeader() {
  const pageHeader = document.querySelector('.page-header');
  if (pageHeader) {
    pageHeader.classList.remove('scrolled');
  }
  lastScrollTop = getScrollTop();
}

export default {
  initStickyHeader,
  destroyStickyHeader,
  resetStickyHeader
};

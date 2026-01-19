// Analytics utility for tracking user interactions

class Analytics {
  constructor() {
    this.isEnabled = false;
    this.queue = [];
    this.init();
  }

  init() {
    // Check if analytics should be enabled (production environment)
    this.isEnabled = import.meta.env.PROD && !import.meta.env.VITE_DISABLE_ANALYTICS;
    
    if (this.isEnabled) {
      this.initGoogleAnalytics();
    }
  }

  initGoogleAnalytics() {
    const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
    
    if (!GA_MEASUREMENT_ID) {
      console.warn('Google Analytics Measurement ID not found');
      return;
    }

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });

    // Process queued events
    this.queue.forEach(event => this.sendEvent(event));
    this.queue = [];
  }

  // Track page views
  trackPageView(page_title, page_location) {
    const event = {
      event_name: 'page_view',
      page_title,
      page_location: page_location || window.location.href,
      timestamp: new Date().toISOString()
    };

    if (this.isEnabled && window.gtag) {
      window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
        page_title,
        page_location
      });
    } else {
      this.queue.push(event);
    }

    // Also log to console in development
    if (import.meta.env.DEV) {
      console.log('📊 Analytics - Page View:', event);
    }
  }

  // Track custom events
  trackEvent(event_name, parameters = {}) {
    const event = {
      event_name,
      ...parameters,
      timestamp: new Date().toISOString()
    };

    if (this.isEnabled && window.gtag) {
      window.gtag('event', event_name, parameters);
    } else {
      this.queue.push(event);
    }

    // Also log to console in development
    if (import.meta.env.DEV) {
      console.log('📊 Analytics - Event:', event);
    }
  }

  // Track user interactions
  trackClick(element_name, element_type = 'button', additional_data = {}) {
    this.trackEvent('click', {
      element_name,
      element_type,
      ...additional_data
    });
  }

  trackDownload(file_name, file_type, file_size = null) {
    this.trackEvent('file_download', {
      file_name,
      file_type,
      file_size,
      download_time: new Date().toISOString()
    });
  }

  trackProjectView(project_name, project_id) {
    this.trackEvent('project_view', {
      project_name,
      project_id,
      content_type: 'project'
    });
  }

  trackCertificateView(certificate_name, certificate_id) {
    this.trackEvent('certificate_view', {
      certificate_name,
      certificate_id,
      content_type: 'certificate'
    });
  }

  trackSearch(search_term, search_type = 'project', results_count = 0) {
    this.trackEvent('search', {
      search_term,
      search_type,
      results_count
    });
  }

  trackFilter(filter_type, filter_value, results_count = 0) {
    this.trackEvent('filter_applied', {
      filter_type,
      filter_value,
      results_count
    });
  }

  trackContactForm(form_type = 'contact', success = true) {
    this.trackEvent('form_submit', {
      form_type,
      success,
      submission_time: new Date().toISOString()
    });
  }

  trackChatInteraction(action, message_count = null) {
    this.trackEvent('chat_interaction', {
      action, // 'open', 'send_message', 'close'
      message_count
    });
  }

  trackError(error_type, error_message, component_name = null) {
    this.trackEvent('error', {
      error_type,
      error_message,
      component_name,
      user_agent: navigator.userAgent,
      url: window.location.href
    });
  }

  trackPerformance(metric_name, value, unit = 'ms') {
    this.trackEvent('performance', {
      metric_name,
      value,
      unit,
      timestamp: new Date().toISOString()
    });
  }

  // Track scroll depth
  trackScrollDepth(depth_percentage) {
    // Only track at certain milestones
    const milestones = [25, 50, 75, 100];
    if (milestones.includes(depth_percentage)) {
      this.trackEvent('scroll_depth', {
        depth_percentage,
        page_url: window.location.href
      });
    }
  }

  // Track time spent on page
  trackTimeOnPage(seconds) {
    this.trackEvent('time_on_page', {
      seconds,
      page_url: window.location.href
    });
  }

  // Track social media clicks
  trackSocialClick(platform, action = 'click') {
    this.trackEvent('social_interaction', {
      platform,
      action
    });
  }

  // Track language changes
  trackLanguageChange(from_language, to_language) {
    this.trackEvent('language_change', {
      from_language,
      to_language
    });
  }
}

// Create singleton instance
const analytics = new Analytics();

// Export convenience functions
export const trackPageView = (title, location) => analytics.trackPageView(title, location);
export const trackEvent = (name, params) => analytics.trackEvent(name, params);
export const trackClick = (element, type, data) => analytics.trackClick(element, type, data);
export const trackDownload = (name, type, size) => analytics.trackDownload(name, type, size);
export const trackProjectView = (name, id) => analytics.trackProjectView(name, id);
export const trackCertificateView = (name, id) => analytics.trackCertificateView(name, id);
export const trackSearch = (term, type, count) => analytics.trackSearch(term, type, count);
export const trackFilter = (type, value, count) => analytics.trackFilter(type, value, count);
export const trackContactForm = (type, success) => analytics.trackContactForm(type, success);
export const trackChatInteraction = (action, count) => analytics.trackChatInteraction(action, count);
export const trackError = (type, message, component) => analytics.trackError(type, message, component);
export const trackPerformance = (metric, value, unit) => analytics.trackPerformance(metric, value, unit);
export const trackScrollDepth = (depth) => analytics.trackScrollDepth(depth);
export const trackTimeOnPage = (seconds) => analytics.trackTimeOnPage(seconds);
export const trackSocialClick = (platform, action) => analytics.trackSocialClick(platform, action);
export const trackLanguageChange = (from, to) => analytics.trackLanguageChange(from, to);

export default analytics;
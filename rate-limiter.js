// Rate limiting utility for form submissions
class RateLimiter {
  constructor() {
    this.submissions = new Map();
    this.config = window.ENV_CONFIG || {
      RATE_LIMIT_ENABLED: true,
      RATE_LIMIT_WINDOW: 60000, // 1 minute
      RATE_LIMIT_MAX_REQUESTS: 3
    };
  }

  // Get client identifier (IP + User Agent hash)
  getClientId() {
    // For static sites, we'll use a combination of factors
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Create a simple hash of these values
    const combined = `${userAgent}-${language}-${timezone}`;
    return this.simpleHash(combined);
  }

  // Simple hash function
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  // Check if submission is allowed
  canSubmit(formType = 'general') {
    if (!this.config.RATE_LIMIT_ENABLED) {
      return { allowed: true };
    }

    const clientId = this.getClientId();
    const key = `${clientId}-${formType}`;
    const now = Date.now();
    const windowMs = this.config.RATE_LIMIT_WINDOW;
    const maxRequests = this.config.RATE_LIMIT_MAX_REQUESTS;

    // Get existing submissions for this client
    const submissions = this.submissions.get(key) || [];
    
    // Remove old submissions outside the window
    const recentSubmissions = submissions.filter(
      timestamp => now - timestamp < windowMs
    );

    // Check if limit exceeded
    if (recentSubmissions.length >= maxRequests) {
      const oldestSubmission = Math.min(...recentSubmissions);
      const resetTime = oldestSubmission + windowMs;
      const waitTime = Math.ceil((resetTime - now) / 1000);
      
      return {
        allowed: false,
        waitTime: waitTime,
        message: `Too many submissions. Please wait ${waitTime} seconds before trying again.`
      };
    }

    // Add current submission
    recentSubmissions.push(now);
    this.submissions.set(key, recentSubmissions);

    return { allowed: true };
  }

  // Clear old entries periodically
  cleanup() {
    const now = Date.now();
    const windowMs = this.config.RATE_LIMIT_WINDOW;
    
    for (const [key, submissions] of this.submissions.entries()) {
      const recentSubmissions = submissions.filter(
        timestamp => now - timestamp < windowMs
      );
      
      if (recentSubmissions.length === 0) {
        this.submissions.delete(key);
      } else {
        this.submissions.set(key, recentSubmissions);
      }
    }
  }
}

// Initialize rate limiter
const rateLimiter = new RateLimiter();

// Cleanup every 5 minutes
setInterval(() => {
  rateLimiter.cleanup();
}, 5 * 60 * 1000);

// Export for use
if (typeof window !== 'undefined') {
  window.rateLimiter = rateLimiter;
}


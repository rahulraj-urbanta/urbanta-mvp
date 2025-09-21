// Environment configuration for GitHub Pages (Static Hosting)
// For static sites, we use a different approach to manage credentials

const ENV_CONFIG = {
  // Supabase configuration
  SUPABASE_URL: 'https://ehrwdtzyisrfheamigrr.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVocndkdHp5aXNyZmhlYW1pZ3JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NDcyMTMsImV4cCI6MjA3MzMyMzIxM30.TWWD8baDpisClSvKaTZrCCor8hsIwA4DJccQm76aQcI',
  
  // Rate limiting configuration
  RATE_LIMIT_ENABLED: true,
  RATE_LIMIT_WINDOW: 60000, // 1 minute
  RATE_LIMIT_MAX_REQUESTS: 3, // Max 3 submissions per minute per client
  
  // Security features
  CSP_ENABLED: true,
  
  // GitHub Pages specific settings
  HOSTING_PLATFORM: 'github-pages',
  STATIC_HOSTING: true
};

// For GitHub Pages: Anonymous keys are designed for client-side use
// The main security comes from RLS policies in Supabase
console.log('🔒 Security Note: Using Supabase RLS policies for data protection');

// Export for use in other files
if (typeof window !== 'undefined') {
  window.ENV_CONFIG = ENV_CONFIG;
}

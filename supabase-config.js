// Supabase Configuration for Urbanta
const SUPABASE_CONFIG = {
  // Replace these with your actual Supabase project credentials
  url: 'https://ehrwdtzyisrfheamigrr.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVocndkdHp5aXNyZmhlYW1pZ3JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NDcyMTMsImV4cCI6MjA3MzMyMzIxM30.TWWD8baDpisClSvKaTZrCCor8hsIwA4DJccQm76aQcI',
  
  // Database table names
  tables: {
    customers: 'customers',
    contractors: 'contractors', 
    suppliers: 'suppliers',
    callbacks: 'callbacks'
  },
  
  // Demo mode - set to false when Supabase is configured
  demoMode: false
};

// Supabase client initialization
let supabaseClient = null;

// Initialize Supabase client
function initSupabase() {
  console.log('Initializing Supabase...');
  console.log('supabase object available:', typeof supabase !== 'undefined');
  console.log('Config URL:', SUPABASE_CONFIG.url);
  console.log('Config anonKey:', SUPABASE_CONFIG.anonKey ? 'Present' : 'Missing');
  
  if (typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log('Supabase client created successfully');
    return true;
  }
  console.log('Supabase library not loaded - will retry');
  return false;
}

// Wait for Supabase to load
async function waitForSupabase() {
  let attempts = 0;
  const maxAttempts = 5; // Reduced since we're using local file
  
  while (attempts < maxAttempts) {
    if (typeof supabase !== 'undefined') {
      console.log('Supabase library loaded after', attempts + 1, 'attempts');
      return true;
    }
    console.log('Waiting for Supabase library... attempt', attempts + 1);
    await new Promise(resolve => setTimeout(resolve, 100));
    attempts++;
  }
  
  console.error('Supabase library failed to load after', maxAttempts, 'attempts');
  return false;
}

// Manual loading removed - using local file

// Submit customer form data to Supabase
async function submitCustomerToSupabase(formData) {
  console.log('submitCustomerToSupabase called with:', formData);
  console.log('Demo mode:', SUPABASE_CONFIG.demoMode);
  
  // Demo mode - simulate successful submission
  if (SUPABASE_CONFIG.demoMode) {
    console.log('Demo mode: Customer data would be submitted:', formData);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    console.log('Demo mode: Returning success');
    return true;
  }

  if (!supabaseClient) {
    console.log('Supabase client not initialized, waiting for library...');
    const loaded = await waitForSupabase();
    
    if (!loaded) {
      throw new Error('Supabase library failed to load. Please refresh the page.');
    }
    
    if (!initSupabase()) {
      throw new Error('Supabase not initialized. Please include Supabase client library.');
    }
  }

  const customerData = {
    name: formData.cust_name,
    phone: formData.cust_phone,
    email: formData.cust_email || null,
    city: formData.cust_city === "Other" ? 
      formData.cust_city_other || "Not specified" : 
      formData.cust_city,
    service_type: formData.cust_service,
    specific_service: formData.cust_specific_service || null,
    specific_service_other: formData.cust_specific_other || null,
    budget: formData.cust_budget || null,
    timeline: formData.cust_timeline,
    visit_date: formData.cust_visit || null,
    description: formData.cust_description || null,
    created_at: new Date().toISOString(),
    status: 'new'
  };

  console.log('Prepared customer data:', customerData);

  const { data, error } = await supabaseClient
    .from(SUPABASE_CONFIG.tables.customers)
    .insert([customerData]);

  console.log('Supabase response - data:', data, 'error:', error);

  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }

  console.log('Customer data inserted successfully');
  return data;
}

// Submit contractor form data to Supabase
async function submitContractorToSupabase(formData) {
  // Demo mode - simulate successful submission
  if (SUPABASE_CONFIG.demoMode) {
    console.log('Demo mode: Contractor data would be submitted:', formData);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    return true;
  }

  if (!supabaseClient) {
    if (!initSupabase()) {
      throw new Error('Supabase not initialized. Please include Supabase client library.');
    }
  }

  const contractorData = {
    full_name: formData.fullName,
    phone: formData.phone,
    whatsapp: formData.whatsapp,
    city: formData.city,
    skills: formData.skills,
    job_sizes: formData.jobSizes,
    experience_years: formData.expYears,
    availability: formData.availability,
    areas: formData.areas,
    team_size: formData.teamSize || null,
    business_type: formData.businessType || null,
    email: formData.email || null,
    aadhaar_last_4: formData.aadhaarLast4,
    pan: formData.pan || null,
    discovery: formData.discovery || null,
    referral_code: formData.referralCode || null,
    referred_by: formData.referredBy || null,
    notes: formData.notes || null,
    created_at: new Date().toISOString(),
    status: 'new'
  };

  const { data, error } = await supabaseClient
    .from(SUPABASE_CONFIG.tables.contractors)
    .insert([contractorData]);

  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }

  return data;
}

// Submit supplier form data to Supabase
async function submitSupplierToSupabase(formData) {
  // Demo mode - simulate successful submission
  if (SUPABASE_CONFIG.demoMode) {
    console.log('Demo mode: Supplier data would be submitted:', formData);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    return true;
  }

  if (!supabaseClient) {
    if (!initSupabase()) {
      throw new Error('Supabase not initialized. Please include Supabase client library.');
    }
  }

  const supplierData = {
    company_name: formData.companyName,
    contact_name: formData.contactName,
    phone: formData.phone,
    whatsapp: formData.whatsapp,
    city: formData.city,
    email: formData.email || null,
    address: formData.address,
    categories: formData.categories,
    delivery_radius_km: formData.deliveryRadiusKm || null,
    gst: formData.gst || null,
    pricelist_url: formData.pricelistUrl || null,
    logistics: formData.logistics || null,
    credit_terms: formData.creditTerms || null,
    min_order_value: formData.minOrderValue || null,
    referred_by: formData.referredBy || null,
    referral_code: formData.referralCode || null,
    notes: formData.notes || null,
    created_at: new Date().toISOString(),
    status: 'new'
  };

  const { data, error } = await supabaseClient
    .from(SUPABASE_CONFIG.tables.suppliers)
    .insert([supplierData]);

  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }

  return data;
}

// Submit callback request to Supabase
async function submitCallbackToSupabase(formData) {
  // Demo mode - simulate successful submission
  if (SUPABASE_CONFIG.demoMode) {
    console.log('Demo mode: Callback data would be submitted:', formData);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    return true;
  }

  if (!supabaseClient) {
    if (!initSupabase()) {
      throw new Error('Supabase not initialized. Please include Supabase client library.');
    }
  }

  const callbackData = {
    name: formData.callback_name,
    phone: formData.callback_phone,
    service: formData.callback_service || null,
    message: formData.callback_message || null,
    urgent: formData.callback_urgent || false,
    callback_type: formData.callback_type || 'customer',
    created_at: new Date().toISOString(),
    status: 'new'
  };

  const { data, error } = await supabaseClient
    .from(SUPABASE_CONFIG.tables.callbacks)
    .insert([callbackData]);

  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }

  return data;
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SUPABASE_CONFIG,
    initSupabase,
    submitCustomerToSupabase,
    submitContractorToSupabase,
    submitSupplierToSupabase,
    submitCallbackToSupabase
  };
}

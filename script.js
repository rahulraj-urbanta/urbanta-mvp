// Urbanta – Onboarding (Dark) logic

// Supabase configuration is now handled in supabase-config.js
// This file now focuses on UI logic and form handling

const CONTRACTOR_SKILLS = [
  "Plumbing", "Electrical", "Painting", "Flooring/Tile", "Carpentry", "Masonry", 
  "Waterproofing", "False Ceiling", "Modular Kitchen", "Civil Contractor", 
  "Interior Works", "HVAC", "Landscaping", "Renovation", "Smart Home", 
  "Solar Installation", "Security Systems", "Flooring Specialist", "Wallpaper", 
  "Glass Work", "Metal Work", "Concrete Work", "Roofing", "Fencing", "Others"
];

const JOB_SIZES = [
  "Small Jobs (₹1k–₹25k)", 
  "Medium (₹25k–₹2L)", 
  "Big Projects (₹2L+)", 
  "Mega Projects (₹10L+)"
];

const SUPPLIER_CATEGORIES = [
  "Cement", "Steel", "Bricks/Blocks", "Tiles/Granite/Marble", "Electricals", 
  "Plumbing", "Paints/Putties", "Wood/Boards", "Hardware/Fittings", "Sanitaryware",
  "Glass & Mirrors", "Doors & Windows", "Flooring Materials", "Ceiling Materials",
  "Lighting", "Kitchen Appliances", "Bathroom Fixtures", "Garden Supplies",
  "Tools & Equipment", "Safety Equipment", "Adhesives & Sealants", "Insulation",
  "Sand & Aggregates", "Roofing Materials", "HVAC Equipment", "Waterproofing",
  "Fire Safety", "Security Systems", "Automation & Smart Home", "Landscaping",
  "Renovation Materials", "Others"
];

// Benefits copy with pilot vs launch indicators - Reorganized with pilot first, money benefits at top
const BENEFITS = {
  contractor: [
    // PILOT BENEFITS (Money-related first)
    { icon: "🆓", title: "Zero listing fee", text: "First 6 months — no platform listing fee. Save thousands while building your reputation.", pilot: true },
    { icon: "💯", title: "0% commission (launch offer)", text: "No platform commission on your first 3 completed jobs. Keep 100% of your earnings.", pilot: true },
    { icon: "💸", title: "₹300 referral reward", text: "Earn ₹300 for each referral once they finish onboarding. Build your network and earn rewards.", pilot: true },
    { icon: "💰", title: "₹1000 completion bonus", text: "Earn ₹1000 bonus when you complete a job worth ₹10,000 or more. Rewards for quality work.", pilot: true },
    { icon: "🏗️", title: "Material discounts", text: "Up to 20% off materials from verified suppliers. Save on every project.", pilot: true },
    { icon: "💳", title: "Project financing", text: "Get advance payments for material purchases. No upfront costs.", pilot: true },
    { icon: "📦", title: "One-stop sourcing", text: "Find all materials in one place. No more running around suppliers.", pilot: true },
    { icon: "⚡", title: "Quick payments", text: "Get paid within 24 hours of project completion. No waiting periods.", pilot: true },
    { icon: "💳", title: "Payment assurance", text: "Urbanta helps ensure timely payouts. No more chasing payments.", pilot: true },
    
    // PILOT BENEFITS (Core features)
    { icon: "🚀", title: "Priority access", text: "Top‑rated pros get priority access to bigger projects and premium clients.", pilot: true },
    { icon: "🏆", title: "Verified badge", text: "Build trust with homeowners and builders through our verification process.", pilot: true },
    { icon: "🛟", title: "Dedicated support", text: "24/7 help for quotes, disputes, and payouts. We've got your back.", pilot: true },
    { icon: "🌆", title: "Citywide visibility", text: "Get discovered by homeowners & builders in your city. Expand your reach.", pilot: true },
    
    // LAUNCH BENEFITS
    { icon: "📈", title: "Growth tools", text: "Advanced analytics to track leads, payments, and ratings. Data-driven growth.", pilot: false },
    { icon: "🎓", title: "Training (launch)", text: "Free workshops & how‑tos during launch phase. Level up your skills.", pilot: false },
    { icon: "🏆", title: "Exclusive partnerships", text: "Access to premium suppliers and bulk material discounts.", pilot: false },
    { icon: "📱", title: "Mobile app", text: "Manage projects on-the-go with our contractor mobile app.", pilot: false },
    { icon: "🔒", title: "Insurance coverage", text: "Platform-provided insurance for projects up to ₹10L during pilot phase.", pilot: false },
    { icon: "🎯", title: "Smart matching", text: "AI-powered matching with projects that fit your skills and availability.", pilot: false },
    { icon: "📊", title: "Performance insights", text: "Detailed reports on your business growth, customer satisfaction, and earnings.", pilot: false },
    { icon: "🤝", title: "Networking events", text: "Exclusive contractor meetups and industry networking opportunities.", pilot: false },
    { icon: "🛠️", title: "Tool discounts", text: "Up to 30% off on tools and equipment from partner suppliers.", pilot: false }
  ],
  supplier: [
    // PILOT BENEFITS (Money-related first)
    { icon: "🆓", title: "Free supplier listing", text: "No charges for the first 6 months. Start selling immediately.", pilot: true },
    { icon: "📈", title: "Sales boost", text: "Get 3x more orders through our contractor network. Scale your business fast.", pilot: true },
    { icon: "💰", title: "Advance payments", text: "Get paid upfront for bulk orders. No waiting for contractor payments.", pilot: true },
    { icon: "🏆", title: "Volume incentives", text: "Earn ₹1000 bonus for every ₹50,000 in sales. Rewards for top performers.", pilot: true },
    
    // PILOT BENEFITS (Core features)
    { icon: "📦", title: "Bulk order access", text: "Get direct orders from contractors and homeowners. Scale your business.", pilot: true },
    { icon: "🏷️", title: "Showcase monthly deals", text: "Highlight price lists & promotions to verified contractors.", pilot: true },
    { icon: "🏆", title: "Preferred supplier badge", text: "Build trust with verified signals and quality certifications.", pilot: true },
    { icon: "🌆", title: "Citywide exposure", text: "Connect with active contractors & builders across your city.", pilot: true },
    { icon: "💳", title: "Payment & reconciliation", text: "Automated support for tracking orders & payments.", pilot: true },
    { icon: "🛍️", title: "Digital store page", text: "Professional showcase for your products & offers.", pilot: true },
    { icon: "🚚", title: "Delivery support", text: "Platform handles delivery coordination. Focus on sales, not logistics.", pilot: true },
    { icon: "💎", title: "Quality guarantee", text: "Platform-backed quality assurance. Build trust with contractors.", pilot: true },
    
    // LAUNCH BENEFITS
    { icon: "📊", title: "Insights & leads", text: "Advanced analytics to track demand and connect with projects.", pilot: false },
    { icon: "🚚", title: "Logistics tie‑ups", text: "Access Urbanta partners for deliveries and supply chain.", pilot: false },
    { icon: "🤝", title: "Networking invites", text: "Supplier–contractor meetups & industry events.", pilot: false },
    { icon: "📈", title: "Growth analytics", text: "Detailed insights on sales trends and customer behavior.", pilot: false },
    { icon: "🎯", title: "Targeted marketing", text: "Reach the right contractors with our smart matching system.", pilot: false },
    { icon: "💰", title: "Credit facilities", text: "Access to working capital loans for inventory and expansion.", pilot: false },
    { icon: "📱", title: "Inventory management", text: "Free inventory tracking and stock management tools.", pilot: false },
    { icon: "🔔", title: "Demand alerts", text: "Get notified about high-demand products in your area.", pilot: false },
    { icon: "🏪", title: "Showroom support", text: "Help setting up digital showrooms and product catalogs.", pilot: false },
    { icon: "📞", title: "Dedicated account manager", text: "Personal support for growing your business on Urbanta.", pilot: false }
  ]
};


const qs = (sel) => document.querySelector(sel);
const qsa = (sel) => Array.from(document.querySelectorAll(sel));

function setMode(mode){
  const landing = qs("#landing");
  const contractor = qs("#contractor");
  const supplier = qs("#supplier");
  const backBtn = qs("#backBtn");
  if(mode === "landing"){
    landing.classList.remove("hidden");
    contractor.classList.add("hidden");
    supplier.classList.add("hidden");
    backBtn.classList.add("hidden");
  } else if(mode === "contractor"){
    landing.classList.add("hidden");
    contractor.classList.remove("hidden");
    supplier.classList.add("hidden");
    backBtn.classList.remove("hidden");
  } else if(mode === "supplier"){
    landing.classList.add("hidden");
    contractor.classList.add("hidden");
    supplier.classList.remove("hidden");
    backBtn.classList.remove("hidden");
  }
  window.scrollTo({top:0, behavior:"smooth"});
}

// Skills "Others" functionality
function setupSkillsOther(skillsContainer, otherDiv, otherInput) {
  // Use a more reliable approach - check after chip selection
  const checkOthersSelection = () => {
    const othersChip = skillsContainer.querySelector('.chip[data-value="Others"]');
    if (othersChip && othersChip.classList.contains("selected")) {
      otherDiv.classList.remove("hidden");
      otherInput.required = true;
    } else {
      otherDiv.classList.add("hidden");
      otherInput.required = false;
      otherInput.value = "";
    }
  };

  // Check on click
  skillsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("chip")) {
      setTimeout(checkOthersSelection, 10); // Small delay to ensure chip state is updated
    }
  });

  // Also check on initial load
  setTimeout(checkOthersSelection, 100);
}

// City "Other" functionality
function setupCityOther(citySelect, otherDiv, otherInput) {
  citySelect.addEventListener("change", () => {
    if (citySelect.value === "Other (Launching soon in your city)") {
      otherDiv.classList.remove("hidden");
      otherInput.required = true;
    } else {
      otherDiv.classList.add("hidden");
      otherInput.required = false;
      otherInput.value = "";
    }
  });
}

// Chips
function buildChips(container, items){
  container.innerHTML = "";
  items.forEach((name) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip";
    btn.textContent = name;
    btn.setAttribute("data-value", name);
    btn.addEventListener("click", () => {
      btn.classList.toggle("selected");
    });
    container.appendChild(btn);
  });
}
function selectedChips(container){
  return Array.from(container.querySelectorAll(".chip.selected")).map(el => el.textContent);
}

// Old Google Forms functions removed - now using Supabase

function redirectToThankYou(role){
  setTimeout(() => {
    window.location.href = `thank-you.html?role=${encodeURIComponent(role)}`;
  }, 300);
}


// THEME SWITCH (default dark)
function applyThemeFromStorage(){
  const saved = localStorage.getItem("urbanta_theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  const sw = document.getElementById("themeSwitch");
  if(sw){ sw.checked = (saved === "light"); }
}
function setTheme(mode){
  document.documentElement.setAttribute("data-theme", mode);
  localStorage.setItem("urbanta_theme", mode);
  const sw = document.getElementById("themeSwitch");
  if(sw){ sw.checked = (mode === "light"); }
}


// Modal logic

function updateBenefitsBanner(role){
  const banner = qs("#benefitsBanner");
  if(!banner) return;
  if(role === "supplier"){
    banner.textContent = "🏬 Here are all the benefits you unlock as a Supplier on Urbanta.";
  } else {
    banner.textContent = "👷 Here are all the benefits you unlock as a Contractor on Urbanta.";
  }
}

function openBenefits(role){
  const modal = qs("#benefitsModal");
  const body = qs("#benefitsBody");
  const title = qs("#benefitsTitle");
  const header = qs("header");
  
  if(!modal || !body || !title) return;

  // Hide header when modal opens
  if(header) {
    header.style.display = 'none';
  }

  const items = BENEFITS[role] || [];
  title.textContent = role === "supplier" ? "Benefits for Suppliers" : "Benefits for Contractors";

  body.innerHTML = "";
  const banner = document.createElement("div");
  banner.className = "benefits-banner";
  banner.textContent = "🎉 Here are all the benefits you unlock with Urbanta";
  body.prepend(banner);

  const kicker = document.createElement("div");
  kicker.className = "benefits-kicker";
  kicker.textContent = role === "supplier"
    ? "Why suppliers choose Urbanta"
    : "Why contractors choose Urbanta";
  body.appendChild(kicker);

  // Create modern card grid
  const grid = document.createElement("div");
  grid.className = "benefits-grid";
  
  items.forEach(item => {
    const card = document.createElement("div");
    card.className = `benefit-card ${item.pilot ? 'pilot-benefit' : 'launch-benefit'}`;
    
    const icon = document.createElement("span");
    icon.className = "icon";
    icon.textContent = item.icon;
    
    const copy = document.createElement("div");
    copy.className = "benefit-copy";
    
    const titleRow = document.createElement("div");
    titleRow.className = "benefit-title-row";
    
    const title = document.createElement("div");
    title.className = "benefit-title";
    title.textContent = item.title;
    
    const badge = document.createElement("span");
    badge.className = `benefit-badge ${item.pilot ? 'pilot-badge' : 'launch-badge'}`;
    badge.textContent = item.pilot ? 'PILOT' : 'LAUNCH';
    
    titleRow.appendChild(title);
    titleRow.appendChild(badge);
    
    const text = document.createElement("div");
    text.className = "benefit-text";
    text.textContent = item.text;
    
    copy.appendChild(titleRow);
    copy.appendChild(text);
    
    card.appendChild(icon);
    card.appendChild(copy);
    grid.appendChild(card);
  });
  
  body.appendChild(grid);

  updateBenefitsBanner(role);
  modal.classList.remove("hidden");
  // focus trap start is out of scope; focus the dialog
  qs(".modal-card").focus();
}
function closeModal(){
  const modal = qs("#benefitsModal");
  const header = qs("header");
  
  if(modal){ 
    modal.classList.add("hidden"); 
  }
  
  // Show header when modal closes
  if(header) {
    header.style.display = 'block';
  }
}



// Equalize incentive tile heights across both cards
function equalizeTiles(){
  try {
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    const tiles = Array.from(document.querySelectorAll(".incentive"));
    if(!tiles.length) return;
    // Reset
    tiles.forEach(t => { t.style.height = "auto"; });
    if(mobile){ return; } // don't force equal heights on small screens

    // Measure
    let maxH = 0;
    tiles.forEach(t => { maxH = Math.max(maxH, t.offsetHeight); });
    // Apply
    tiles.forEach(t => { t.style.height = maxH + "px"; });
  } catch(e){ /* noop */ }
}



document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  qsa(".role-btn").forEach(card => {
    card.addEventListener("click", () => setMode(card.dataset.mode));
  });
  qs("#backBtn").addEventListener("click", () => setMode("landing"));

  // Theme switch init + events (works on all pages)
  applyThemeFromStorage();
  const themeSwitch = document.getElementById("themeSwitch");
  if(themeSwitch){ 
    themeSwitch.addEventListener("change", (e)=> setTheme(e.target.checked ? "light" : "dark"));
    themeSwitch.setAttribute('role', 'switch');
    themeSwitch.setAttribute('aria-checked', themeSwitch.checked ? 'true' : 'false');
    themeSwitch.addEventListener('change', () => themeSwitch.setAttribute('aria-checked', themeSwitch.checked ? 'true' : 'false'));
  }
  

  buildChips(qs("#c_skills"), CONTRACTOR_SKILLS);
  buildChips(qs("#c_jobSizes"), JOB_SIZES);
  buildChips(qs("#s_categories"), SUPPLIER_CATEGORIES);

  // Setup city "Other" functionality
  setupCityOther(qs("#c_city"), qs("#c_cityOther"), qs("#c_cityOtherInput"));
  setupCityOther(qs("#s_city"), qs("#s_cityOther"), qs("#s_cityOtherInput"));

  // Setup skills "Others" functionality
  setupSkillsOther(qs("#c_skills"), qs("#c_skillsOther"), qs("#c_skillsOtherInput"));

  // Setup supplier categories "Others" functionality
  setupSkillsOther(qs("#s_categories"), qs("#s_categoriesOther"), qs("#s_categoriesOtherInput"));

  // Normalize incentive tile heights across both cards
  equalizeTiles();
  window.addEventListener("resize", () => { equalizeTiles(); });

  // Benefits modal triggers
  qsa("[data-open=\"benefits-contractor\"]").forEach(btn => btn.addEventListener("click", ()=> openBenefits("contractor")));
  qsa("[data-open=\"benefits-supplier\"]").forEach(btn => btn.addEventListener("click", ()=> openBenefits("supplier")));
  qsa("[data-close=\"modal\"]").forEach(btn => btn.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closeModal(); });

  // Accessible Mobile Menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  if (hamburger && mobileMenu) {
    hamburger.setAttribute('aria-controls', 'mobileMenu');
    hamburger.setAttribute('aria-expanded', 'false');
    const openMenu = () => {
      mobileMenu.classList.add('active');
      document.body.classList.add('menu-open');
      hamburger.setAttribute('aria-expanded', 'true');
    };
    const closeMenu = () => {
      mobileMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
    };
    hamburger.addEventListener('click', openMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
    mobileMenu.addEventListener('click', (e) => { if (e.target === mobileMenu) closeMenu(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('scroll', () => { if (mobileMenu.classList.contains('active')) closeMenu(); });
  }

  // Contractor submit
  qs("#contractorForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const err = qs("#c_error");
    err.textContent = "";

    const data = {
      fullName: qs("#c_fullName").value.trim(),
      phone: qs("#c_phone").value.trim(),
      whatsapp: qs("#c_whatsapp").value.trim() || qs("#c_phone").value.trim(),
      city: qs("#c_city").value === "Other (Launching soon in your city)" ? qs("#c_cityOtherInput").value.trim() : qs("#c_city").value,
      skills: selectedChips(qs("#c_skills")).join(", ") + (qs("#c_skillsOtherInput").value.trim() ? ", " + qs("#c_skillsOtherInput").value.trim() : ""),
      jobSizes: selectedChips(qs("#c_jobSizes")).join(", "),
      expYears: qs("#c_expYears").value,
      availability: qs("#c_availability").value,
      areas: qs("#c_areas").value.trim(),
      teamSize: qs("#c_teamSize").value,
      businessType: qs("#c_businessType").value,
      email: qs("#c_email").value.trim(),
      aadhaarLast4: qs("#c_aadhaar4").value.trim(),
      pan: qs("#c_pan").value.trim(),
      discovery: qs("#c_discovery").value.trim(),
      referralCode: qs("#c_referralCode").value.trim(),
      referredBy: qs("#c_referredBy").value.trim(),
      notes: qs("#c_notes").value.trim(),
    };

    if(!data.fullName || !data.phone || !data.city || !data.skills || !/^\d{4}$/.test(data.aadhaarLast4)){
      err.textContent = "Please fill required fields and add Aadhaar last 4 digits.";
      return;
    }

    // Validate phone number (10 digits)
    if(!/^\d{10}$/.test(data.phone.replace(/\D/g, ''))){
      err.textContent = "Please enter a valid 10-digit phone number.";
      return;
    }

    const ok = await submitContractorToSupabase(data);
    if(ok){ redirectToThankYou('contractor'); return; }
    err.textContent = "Submission failed. Please try again or contact support.";
  });

  // Supplier submit
  qs("#supplierForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const err = qs("#s_error");
    err.textContent = "";

    const data = {
      companyName: qs("#s_companyName").value.trim(),
      contactName: qs("#s_contactName").value.trim(),
      phone: qs("#s_phone").value.trim(),
      whatsapp: qs("#s_whatsapp").value.trim(),
      city: qs("#s_city").value === "Other (Launching soon in your city)" ? qs("#s_cityOtherInput").value.trim() : qs("#s_city").value,
      email: qs("#s_email").value.trim(),
      address: qs("#s_address").value.trim(),
      categories: selectedChips(qs("#s_categories")).join(", ") + (qs("#s_categoriesOtherInput").value.trim() ? ", " + qs("#s_categoriesOtherInput").value.trim() : ""),
      deliveryRadiusKm: qs("#s_deliveryRadiusKm").value,
      gst: qs("#s_gst").value.trim(),
      pricelistUrl: qs("#s_pricelistUrl").value.trim(),
      logistics: qs("#s_logistics").value.trim(),
      creditTerms: qs("#s_creditTerms").value,
      minOrderValue: qs("#s_minOrderValue").value,
      referredBy: qs("#s_referredBy").value.trim(),
      referralCode: qs("#s_referralCode").value.trim(),
      notes: qs("#s_notes").value.trim(),
    };

    if(!data.companyName || !data.contactName || !data.phone || !data.city || !data.address || !data.categories){
      err.textContent = "Please fill required fields and select at least one category.";
      return;
    }

    // Validate phone number (10 digits)
    if(!/^\d{10}$/.test(data.phone.replace(/\D/g, ''))){
      err.textContent = "Please enter a valid 10-digit phone number.";
      return;
    }

    const ok = await submitSupplierToSupabase(data);
    if(ok){ redirectToThankYou('supplier'); return; }
    err.textContent = "Submission failed. Please try again or contact support.";
  });
});

// Back to Top functionality
document.addEventListener('DOMContentLoaded', function() {
  const backToTopBtn = document.getElementById('backToTop');
  
  if (!backToTopBtn) return;

  // Show/hide button based on scroll position
  function toggleBackToTop() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  // Scroll to top when clicked
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Listen for scroll events
  window.addEventListener('scroll', toggleBackToTop);
  
  // Initial call
  toggleBackToTop();
});

// Callback functionality
// Simple focus trap for modals
function trapFocus(modalEl){
  const selectors = [
    'a[href]','button:not([disabled])','textarea','input','select','[tabindex]:not([tabindex="-1"])'
  ];
  const focusables = Array.from(modalEl.querySelectorAll(selectors.join(','))).filter(el => el.offsetParent !== null);
  if (!focusables.length) return () => {};
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  function onKeydown(e){
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  modalEl.addEventListener('keydown', onKeydown);
  setTimeout(() => { (modalEl.querySelector('[autofocus]') || first).focus(); }, 0);
  return () => modalEl.removeEventListener('keydown', onKeydown);
}

document.addEventListener('DOMContentLoaded', function() {
  const callbackBtn = document.getElementById('callbackBtn');
  const callbackModal = document.getElementById('callbackModal');
  const callbackClose = document.getElementById('callbackClose');
  const callbackForm = document.getElementById('callbackForm');
  const header = document.querySelector('header');
  let releaseTrap = null;

  if (!callbackBtn || !callbackModal) return;

  // Open callback modal
  callbackBtn.addEventListener('click', function() {
    callbackModal.classList.remove('hidden');
    if (header) header.style.display = 'none'; // Hide header to prevent obstruction
    releaseTrap = trapFocus(callbackModal);
  });

  // Close callback modal
  function closeCallbackModal() {
    callbackModal.classList.add('hidden');
    if (header) header.style.display = 'block'; // Show header again
    if (releaseTrap) { releaseTrap(); releaseTrap = null; }
  }

  callbackClose.addEventListener('click', closeCallbackModal);
  
  // Close on outside click
  callbackModal.addEventListener('click', function(e) {
    if (e.target === callbackModal) {
      closeCallbackModal();
    }
  });

  // Handle form submission (only on registration page)
  if (callbackForm && window.location.pathname.includes('registration')) {
    callbackForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData(callbackForm);
      const data = Object.fromEntries(formData);
      
      // Validate phone number
      const phoneDigits = data.callback_phone.replace(/\D/g, '');
      if (!/^\d{10}$/.test(phoneDigits)) {
        alert('Please enter a valid 10-digit phone number');
        return;
      }
      
      // Data is already prepared in the correct format for Supabase
      const callbackData = {
        ...data,
        callback_type: 'professional'
      };

      try {
        // Submit to Supabase
        await submitCallbackToSupabase(callbackData);
        
        // Redirect to thank you page
        window.location.replace('thank-you.html?type=callback');
        
      } catch (error) {
        console.error('Callback submission error:', error);
        // Still redirect to thank you page even if there's an error
        window.location.replace('thank-you.html?type=callback');
      }
    });
  }
});

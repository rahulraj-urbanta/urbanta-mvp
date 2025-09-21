# Urbanta v0.4.10 - Home Services Platform

A modern web platform connecting customers with contractors and suppliers for home improvement services.

## 🚀 Quick Start

1. **Deploy files** to your web server (all files in root directory)
2. **Set up Supabase database** using `supabase-schema.sql`
3. **Configure Supabase** in `supabase-config.js`
4. **Update database** with `update-callback-schema.sql` and `update-contractor-schema.sql`

## 🌐 Hosting Ready

This project is structured for **universal hosting compatibility**:

- ✅ **All files in root directory** - No subdirectories or complex paths
- ✅ **Standard file references** - All CSS, JS, and assets use root paths
- ✅ **No server configuration** - Works with any web hosting provider
- ✅ **CDN friendly** - Easy to cache and distribute
- ✅ **GitHub Pages ready** - Just enable Pages in repository settings
- ✅ **Netlify/Vercel ready** - Connect repository for automatic deployment

## 📁 File Structure

### Core Pages (Root Directory)
- `index.html` - Landing page with service categories
- `services/` - Customer quote request form
- `professionals/` - Contractor/Supplier registration
- `thank-you.html` - Success page (handles multiple types)

### Legal & Support Pages (Root Directory)
- `privacy.html` - Privacy policy
- `terms.html` - Terms of service
- `support.html` - Support/contact page
- `faq.html` - Frequently asked questions

### Styling & Scripts (Root Directory)
- `styles.css` - Main stylesheet (responsive design)
- `script.js` - Core JavaScript functionality
- `supabase-config.js` - Database configuration & API calls
- `supabase.min.js` - Minified Supabase client library

### Database Files (Root Directory)
- `supabase-schema.sql` - Main database schema
- `update-callback-schema.sql` - Add callback_type column
- `update-contractor-schema.sql` - Add contractor fields

### Configuration Files (Root Directory)
- `robots.txt` - SEO configuration
- `.htaccess` - Apache server configuration
- `README.md` - This documentation file

## 🔄 User Flow

### Customer Journey
1. **Landing Page** (`index.html`)
   - Browse service categories
   - Click "Get Quote" → `services/`

2. **Quote Request** (`services/`)
   - Fill out project details
   - Submit → `thank-you.html?type=customer`
   - Optional: Request callback → `thank-you.html?type=callback`

3. **Success Page** (`thank-you.html`)
   - Confirmation message
   - Next steps information

### Professional Journey
1. **Registration Page** (`professionals/`)
   - Choose: Contractor or Supplier
   - Fill out profile details
   - Submit → `thank-you.html?role=contractor/supplier`
   - Optional: Request callback → `thank-you.html?type=callback`

## 🗄️ Database Schema

### Tables
- **customers** - Customer quote requests
- **contractors** - Contractor profiles
- **suppliers** - Supplier profiles
- **callbacks** - Callback requests (customer/professional)

### Key Fields
- **callback_type**: 'customer' or 'professional'
- **city**: Supports custom city input
- **team_size**: Contractor team size
- **business_type**: Contractor business type

## ⚙️ Configuration

### Supabase Setup
1. Create Supabase project
2. Run `supabase-schema.sql`
3. Update `supabase-config.js`:
   ```javascript
   SUPABASE_CONFIG = {
     url: 'your-supabase-url',
     anonKey: 'your-anon-key',
     tables: {
       customers: 'customers',
       contractors: 'contractors',
       suppliers: 'suppliers',
       callbacks: 'callbacks'
     }
   };
   ```

### Theme Settings
- **Default**: Light mode
- **Toggle**: Available on all pages
- **Storage**: User preference saved in localStorage

## 🎨 Features

### Responsive Design
- Mobile-first approach
- Dark/Light theme toggle
- Modern UI with smooth animations

### Form Validation
- Real-time validation
- Phone number format checking
- Required field validation

### Database Integration
- Real-time form submissions
- Error handling
- Demo mode support

## 🔧 Recent Updates (v0.4.10)

- ✅ Fixed callback form duplicate submissions
- ✅ Added callback type distinction (customer/professional)
- ✅ Set light mode as default theme
- ✅ Updated thank you page (removed incorrect offers)
- ✅ Fixed customer city field handling
- ✅ Added contractor form fields (team size, business type)
- ✅ Improved form validation and error handling

## 🚀 Deployment

### Production Files
Use the production backup: `urbanta_v0.4.10_production_*.zip`

### Required Steps
1. Upload files to web server
2. Configure Supabase database
3. Update Supabase credentials
4. Test all forms and functionality

## 📞 Support

For technical support or questions:
- Email: info@urbanta.in
- WhatsApp: +91 82359 41139

## 📄 License

All rights reserved. See `terms.html` for full terms of service.

---

**Version**: 0.4.10  
**Last Updated**: September 2025  
**Platform**: Web (HTML/CSS/JavaScript + Supabase)
# Deployment triggered on Mon Sep 15 23:54:27 PDT 2025
# Manual deployment trigger - Tue Sep 16 00:01:30 PDT 2025

# Urbanta - Home Services Platform

A modern web platform connecting customers with verified contractors and suppliers for home improvement services.

## About Urbanta

Urbanta is a home services marketplace that connects homeowners with trusted professionals for all types of home improvement projects. We provide transparent pricing, milestone payments, quality assurance, and dedicated support to ensure successful project completion.

**Contact:**
- Email: info@urbanta.in
- WhatsApp: +91 82359 41139
- Website: www.urbanta.in

## Quick Setup

1. Deploy all files to your web server
2. Set up Supabase database using `supabase-schema.sql`
3. Configure Supabase credentials in `supabase-config.js`
4. Run database updates: `update-callback-schema.sql` and `update-contractor-schema.sql`

## File Structure

- `index.html` - Landing page
- `services/` - Customer quote requests
- `professionals/` - Contractor/Supplier registration
- `support/`, `privacy/`, `terms/`, `faq/` - Legal & support pages
- `styles.css`, `script.js` - Styling and functionality
- `supabase-config.js`, `supabase.min.js` - Database integration
- `supabase-schema.sql` - Database schema

## Features

- Responsive design with dark/light themes
- Real-time form validation
- Supabase database integration
- Clean URL structure
- Mobile-optimized interface

## License

All rights reserved. See `terms/` for full terms of service.
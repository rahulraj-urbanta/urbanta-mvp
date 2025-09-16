# Urbanta Supabase Integration Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `urbanta`
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be ready (2-3 minutes)

## Step 2: Get Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## Step 3: Update Configuration

1. Open `supabase-config.js` in your project
2. Replace the placeholder values:

```javascript
const SUPABASE_CONFIG = {
  url: 'https://your-project-id.supabase.co',  // Replace with your Project URL
  anonKey: 'your-anon-key-here',               // Replace with your anon key
  
  tables: {
    customers: 'customers',
    contractors: 'contractors', 
    suppliers: 'suppliers',
    callbacks: 'callbacks'
  }
};
```

## Step 4: Create Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase-schema.sql`
3. Paste and run the SQL script
4. This will create all necessary tables with proper indexes and security policies

## Step 5: Test the Integration

1. Start your local server: `python3 -m http.server 8001`
2. Open `http://localhost:8001`
3. Test each form:
   - Customer registration form
   - Contractor registration form  
   - Supplier registration form
   - Callback request form

## Step 6: View Data in Supabase

1. Go to **Table Editor** in your Supabase dashboard
2. You should see the following tables:
   - `customers` - Customer quote requests
   - `contractors` - Contractor registrations
   - `suppliers` - Supplier registrations
   - `callbacks` - Callback requests

## Database Schema Overview

### Customers Table
- Stores customer quote requests
- Fields: name, phone, email, city, service_type, etc.
- Status tracking: 'new', 'contacted', 'quoted', 'completed'

### Contractors Table  
- Stores contractor registrations
- Fields: full_name, phone, skills, experience, etc.
- Status tracking: 'new', 'verified', 'active', 'suspended'

### Suppliers Table
- Stores supplier registrations  
- Fields: company_name, contact_name, categories, etc.
- Status tracking: 'new', 'verified', 'active', 'suspended'

### Callbacks Table
- Stores callback requests
- Fields: name, phone, service, message, urgent flag
- Status tracking: 'new', 'called', 'completed'

## Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Public insert** allowed for form submissions
- **Authenticated read** only for viewing data
- **Automatic timestamps** for created_at and updated_at
- **Data validation** at application level

## Benefits of Supabase vs Google Forms

✅ **Real-time data** - Instant access to submissions  
✅ **Better data structure** - Proper database with relationships  
✅ **Advanced queries** - Filter, search, and analyze data  
✅ **User management** - Built-in authentication system  
✅ **API access** - REST and GraphQL APIs  
✅ **Real-time subscriptions** - Get notified of new submissions  
✅ **Data export** - Easy CSV/JSON export  
✅ **Backup & recovery** - Automatic database backups  

## Next Steps

1. **Set up authentication** for admin access
2. **Create admin dashboard** to view submissions
3. **Add email notifications** for new submissions
4. **Implement data analytics** and reporting
5. **Set up automated workflows** for lead management

## Troubleshooting

### Common Issues:

1. **CORS errors**: Make sure your Supabase project allows your domain
2. **Permission denied**: Check RLS policies are correctly set up
3. **Missing tables**: Run the SQL schema script again
4. **API key issues**: Verify the anon key is correct

### Support:
- Supabase Documentation: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- GitHub Issues: Create issue in your project repo

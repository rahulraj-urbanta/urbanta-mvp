-- Enhanced RLS Policies for Urbanta
-- Run these SQL commands in your Supabase SQL editor

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public to insert customers" ON customers;
DROP POLICY IF EXISTS "Allow authenticated users to read customers" ON customers;
DROP POLICY IF EXISTS "Allow public to insert contractors" ON contractors;
DROP POLICY IF EXISTS "Allow authenticated users to read contractors" ON contractors;
DROP POLICY IF EXISTS "Allow public to insert suppliers" ON suppliers;
DROP POLICY IF EXISTS "Allow authenticated users to read suppliers" ON suppliers;
DROP POLICY IF EXISTS "Allow public to insert callbacks" ON callbacks;
DROP POLICY IF EXISTS "Allow authenticated users to read callbacks" ON callbacks;

-- Create admin role for internal access
CREATE ROLE IF NOT EXISTS admin_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO admin_role;

-- Enhanced Customers table policies
CREATE POLICY "Allow public to insert customers" ON customers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin to read all customers" ON customers
  FOR SELECT USING (auth.role() = 'admin_role');

CREATE POLICY "Allow admin to update customers" ON customers
  FOR UPDATE USING (auth.role() = 'admin_role');

CREATE POLICY "Allow admin to delete customers" ON customers
  FOR DELETE USING (auth.role() = 'admin_role');

-- Enhanced Contractors table policies
CREATE POLICY "Allow public to insert contractors" ON contractors
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin to read all contractors" ON contractors
  FOR SELECT USING (auth.role() = 'admin_role');

CREATE POLICY "Allow admin to update contractors" ON contractors
  FOR UPDATE USING (auth.role() = 'admin_role');

CREATE POLICY "Allow admin to delete contractors" ON contractors
  FOR DELETE USING (auth.role() = 'admin_role');

-- Enhanced Suppliers table policies
CREATE POLICY "Allow public to insert suppliers" ON suppliers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin to read all suppliers" ON suppliers
  FOR SELECT USING (auth.role() = 'admin_role');

CREATE POLICY "Allow admin to update suppliers" ON suppliers
  FOR UPDATE USING (auth.role() = 'admin_role');

CREATE POLICY "Allow admin to delete suppliers" ON suppliers
  FOR DELETE USING (auth.role() = 'admin_role');

-- Enhanced Callbacks table policies
CREATE POLICY "Allow public to insert callbacks" ON callbacks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin to read all callbacks" ON callbacks
  FOR SELECT USING (auth.role() = 'admin_role');

CREATE POLICY "Allow admin to update callbacks" ON callbacks
  FOR UPDATE USING (auth.role() = 'admin_role');

CREATE POLICY "Allow admin to delete callbacks" ON callbacks
  FOR DELETE USING (auth.role() = 'admin_role');

-- Create function to check admin role
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if current user has admin role
  -- You can customize this based on your admin identification method
  RETURN auth.role() = 'admin_role' OR 
         auth.jwt() ->> 'email' IN (
           'admin@urbanta.in',
           'info@urbanta.in'
         );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update policies to use the function
DROP POLICY IF EXISTS "Allow admin to read all customers" ON customers;
DROP POLICY IF EXISTS "Allow admin to read all contractors" ON contractors;
DROP POLICY IF EXISTS "Allow admin to read all suppliers" ON suppliers;
DROP POLICY IF EXISTS "Allow admin to read all callbacks" ON callbacks;

CREATE POLICY "Allow admin to read all customers" ON customers
  FOR SELECT USING (is_admin());

CREATE POLICY "Allow admin to read all contractors" ON contractors
  FOR SELECT USING (is_admin());

CREATE POLICY "Allow admin to read all suppliers" ON suppliers
  FOR SELECT USING (is_admin());

CREATE POLICY "Allow admin to read all callbacks" ON callbacks
  FOR SELECT USING (is_admin());

-- Add audit logging function
CREATE OR REPLACE FUNCTION log_data_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Log access attempts (you can create an audit_log table)
  INSERT INTO audit_log (table_name, operation, user_email, timestamp)
  VALUES (TG_TABLE_NAME, TG_OP, auth.jwt() ->> 'email', NOW());
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create audit log table
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL,
  user_email TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);

-- Enable RLS on audit log
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can read audit logs
CREATE POLICY "Allow admin to read audit logs" ON audit_log
  FOR SELECT USING (is_admin());


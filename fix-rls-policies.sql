-- Fix RLS policies for Urbanta Supabase
-- Run this in your Supabase SQL Editor

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public to insert customers" ON customers;
DROP POLICY IF EXISTS "Allow authenticated users to read customers" ON customers;

DROP POLICY IF EXISTS "Allow public to insert contractors" ON contractors;
DROP POLICY IF EXISTS "Allow authenticated users to read contractors" ON contractors;

DROP POLICY IF EXISTS "Allow public to insert suppliers" ON suppliers;
DROP POLICY IF EXISTS "Allow authenticated users to read suppliers" ON suppliers;

DROP POLICY IF EXISTS "Allow public to insert callbacks" ON callbacks;
DROP POLICY IF EXISTS "Allow authenticated users to read callbacks" ON callbacks;

-- Create new policies that allow public access for demo purposes
-- You can tighten these later for production

-- Customers table policies
CREATE POLICY "Allow public to insert customers" ON customers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to read customers" ON customers
  FOR SELECT USING (true);

-- Contractors table policies  
CREATE POLICY "Allow public to insert contractors" ON contractors
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to read contractors" ON contractors
  FOR SELECT USING (true);

-- Suppliers table policies
CREATE POLICY "Allow public to insert suppliers" ON suppliers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to read suppliers" ON suppliers
  FOR SELECT USING (true);

-- Callbacks table policies
CREATE POLICY "Allow public to insert callbacks" ON callbacks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to read callbacks" ON callbacks
  FOR SELECT USING (true);

-- Test the policies by inserting a test record
INSERT INTO customers (name, phone, email, city, service_type, timeline, status) 
VALUES ('Test User', '9876543210', 'test@example.com', 'Mumbai', 'Plumbing', 'Within a week', 'new');

-- Verify the data is visible
SELECT * FROM customers WHERE name = 'Test User';

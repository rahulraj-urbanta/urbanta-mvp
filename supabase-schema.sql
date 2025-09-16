-- Urbanta Database Schema for Supabase
-- Run these SQL commands in your Supabase SQL editor

-- Enable Row Level Security
ALTER TABLE IF EXISTS customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS contractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS callbacks ENABLE ROW LEVEL SECURITY;

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  service_type VARCHAR(100) NOT NULL,
  specific_service VARCHAR(255),
  specific_service_other TEXT,
  budget VARCHAR(50),
  timeline VARCHAR(50) NOT NULL,
  visit_date DATE,
  description TEXT,
  status VARCHAR(20) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contractors table
CREATE TABLE IF NOT EXISTS contractors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  whatsapp VARCHAR(15),
  city VARCHAR(100) NOT NULL,
  skills TEXT NOT NULL,
  job_sizes TEXT NOT NULL,
  experience_years VARCHAR(50),
  availability VARCHAR(50),
  areas TEXT,
  email VARCHAR(255),
  aadhaar_last_4 VARCHAR(4),
  pan VARCHAR(10),
  discovery TEXT,
  referral_code VARCHAR(50),
  referred_by VARCHAR(255),
  notes TEXT,
  status VARCHAR(20) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  whatsapp VARCHAR(15),
  city VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  address TEXT NOT NULL,
  categories TEXT NOT NULL,
  delivery_radius_km INTEGER,
  gst VARCHAR(15),
  pricelist_url TEXT,
  logistics TEXT,
  credit_terms VARCHAR(50),
  min_order_value VARCHAR(50),
  referred_by VARCHAR(255),
  referral_code VARCHAR(50),
  notes TEXT,
  status VARCHAR(20) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create callbacks table
CREATE TABLE IF NOT EXISTS callbacks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  service VARCHAR(100),
  message TEXT,
  urgent BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_customers_city ON customers(city);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);
CREATE INDEX IF NOT EXISTS idx_customers_created_at ON customers(created_at);

CREATE INDEX IF NOT EXISTS idx_contractors_phone ON contractors(phone);
CREATE INDEX IF NOT EXISTS idx_contractors_city ON contractors(city);
CREATE INDEX IF NOT EXISTS idx_contractors_status ON contractors(status);
CREATE INDEX IF NOT EXISTS idx_contractors_created_at ON contractors(created_at);

CREATE INDEX IF NOT EXISTS idx_suppliers_phone ON suppliers(phone);
CREATE INDEX IF NOT EXISTS idx_suppliers_city ON suppliers(city);
CREATE INDEX IF NOT EXISTS idx_suppliers_status ON suppliers(status);
CREATE INDEX IF NOT EXISTS idx_suppliers_created_at ON suppliers(created_at);

CREATE INDEX IF NOT EXISTS idx_callbacks_phone ON callbacks(phone);
CREATE INDEX IF NOT EXISTS idx_callbacks_status ON callbacks(status);
CREATE INDEX IF NOT EXISTS idx_callbacks_created_at ON callbacks(created_at);

-- Create RLS policies (allow public to insert, but restrict read access)
-- You can modify these policies based on your security requirements

-- Customers table policies
CREATE POLICY "Allow public to insert customers" ON customers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read customers" ON customers
  FOR SELECT USING (auth.role() = 'authenticated');

-- Contractors table policies
CREATE POLICY "Allow public to insert contractors" ON contractors
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read contractors" ON contractors
  FOR SELECT USING (auth.role() = 'authenticated');

-- Suppliers table policies
CREATE POLICY "Allow public to insert suppliers" ON suppliers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read suppliers" ON suppliers
  FOR SELECT USING (auth.role() = 'authenticated');

-- Callbacks table policies
CREATE POLICY "Allow public to insert callbacks" ON callbacks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read callbacks" ON callbacks
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contractors_updated_at BEFORE UPDATE ON contractors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE ON suppliers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_callbacks_updated_at BEFORE UPDATE ON callbacks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

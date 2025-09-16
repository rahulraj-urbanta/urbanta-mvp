-- Add missing fields to contractors table
-- Run this SQL in your Supabase SQL editor

ALTER TABLE contractors 
ADD COLUMN IF NOT EXISTS team_size VARCHAR(50),
ADD COLUMN IF NOT EXISTS business_type VARCHAR(50);

-- Update the schema file comment
-- The contractors table now includes:
-- - team_size: VARCHAR(50) - Team size selection
-- - business_type: VARCHAR(50) - Business type selection

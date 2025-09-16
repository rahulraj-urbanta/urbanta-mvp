-- Add callback_type column to callbacks table
-- Run this SQL in your Supabase SQL editor

ALTER TABLE callbacks 
ADD COLUMN IF NOT EXISTS callback_type VARCHAR(20) DEFAULT 'customer';

-- Update the schema file comment
-- The callbacks table now includes:
-- - callback_type: VARCHAR(20) - 'customer' or 'professional' to distinguish the source

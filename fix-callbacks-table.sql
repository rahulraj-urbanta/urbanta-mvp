-- Fix callbacks table schema
-- Run this in your Supabase SQL editor

-- First, check if the table exists and what columns it has
-- If the table has old column names, we need to update them

-- Drop the old index if it exists
DROP INDEX IF EXISTS idx_callbacks_phone;

-- Check if we need to rename columns (if they exist with old names)
-- This is a safe operation that won't break if columns don't exist

-- If the table has 'name' column instead of 'callback_name'
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'callbacks' AND column_name = 'name') THEN
        ALTER TABLE callbacks RENAME COLUMN name TO callback_name;
    END IF;
END $$;

-- If the table has 'phone' column instead of 'callback_phone'
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'callbacks' AND column_name = 'phone') THEN
        ALTER TABLE callbacks RENAME COLUMN phone TO callback_phone;
    END IF;
END $$;

-- If the table has 'service' column instead of 'callback_service'
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'callbacks' AND column_name = 'service') THEN
        ALTER TABLE callbacks RENAME COLUMN service TO callback_service;
    END IF;
END $$;

-- If the table has 'message' column instead of 'callback_message'
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'callbacks' AND column_name = 'message') THEN
        ALTER TABLE callbacks RENAME COLUMN message TO callback_message;
    END IF;
END $$;

-- If the table has 'urgent' column instead of 'callback_urgent'
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'callbacks' AND column_name = 'urgent') THEN
        ALTER TABLE callbacks RENAME COLUMN urgent TO callback_urgent;
    END IF;
END $$;

-- Add callback_type column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'callbacks' AND column_name = 'callback_type') THEN
        ALTER TABLE callbacks ADD COLUMN callback_type VARCHAR(20) DEFAULT 'customer';
    END IF;
END $$;

-- Recreate the index with correct column name
CREATE INDEX IF NOT EXISTS idx_callbacks_phone ON callbacks(callback_phone);

-- Verify the table structure
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'callbacks' 
ORDER BY ordinal_position;


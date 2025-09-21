-- Add reference columns to contractors table
-- Run this in your Supabase SQL editor

-- Add reference columns for contractor verification
ALTER TABLE contractors ADD COLUMN IF NOT EXISTS ref1_name VARCHAR(255);
ALTER TABLE contractors ADD COLUMN IF NOT EXISTS ref1_phone VARCHAR(15);
ALTER TABLE contractors ADD COLUMN IF NOT EXISTS ref1_work TEXT;
ALTER TABLE contractors ADD COLUMN IF NOT EXISTS ref2_name VARCHAR(255);
ALTER TABLE contractors ADD COLUMN IF NOT EXISTS ref2_phone VARCHAR(15);
ALTER TABLE contractors ADD COLUMN IF NOT EXISTS ref2_work TEXT;

-- Verify the columns were added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'contractors' 
AND column_name LIKE 'ref%'
ORDER BY ordinal_position;


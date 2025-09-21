-- Create email_signups table for coming soon page
CREATE TABLE IF NOT EXISTS email_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  source VARCHAR(50) DEFAULT 'coming-soon',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'pending',
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_email_signups_email ON email_signups(email);
CREATE INDEX IF NOT EXISTS idx_email_signups_created_at ON email_signups(created_at);
CREATE INDEX IF NOT EXISTS idx_email_signups_status ON email_signups(status);
CREATE INDEX IF NOT EXISTS idx_email_signups_source ON email_signups(source);

-- Enable RLS (Row Level Security)
ALTER TABLE email_signups ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for email signups)
CREATE POLICY "Allow public inserts on email_signups" 
ON email_signups FOR INSERT 
TO anon 
WITH CHECK (true);

-- Create policy to allow authenticated users to read all signups (for admin access)
CREATE POLICY "Allow authenticated users to read email_signups" 
ON email_signups FOR SELECT 
TO authenticated 
USING (true);


-- Create influencer_applications table
CREATE TABLE public.influencer_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  instagram TEXT NOT NULL,
  category TEXT NOT NULL,
  followers TEXT DEFAULT '',
  engagement TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  photo TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.influencer_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public application form)
CREATE POLICY "Anyone can submit an application"
  ON public.influencer_applications
  FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read applications
CREATE POLICY "Anyone can read applications"
  ON public.influencer_applications
  FOR SELECT
  USING (true);

-- Allow updates for approve/reject
CREATE POLICY "Anyone can update applications"
  ON public.influencer_applications
  FOR UPDATE
  USING (true);

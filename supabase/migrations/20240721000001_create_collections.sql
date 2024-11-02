-- Create collections table
CREATE TABLE IF NOT EXISTS collections (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    content TEXT,
    image_url TEXT NOT NULL,
    type TEXT NOT NULL,
    status TEXT NOT NULL,
    order INTEGER NOT NULL DEFAULT 0,
    featured BOOLEAN NOT NULL DEFAULT false,
    author TEXT,
    publish_date TIMESTAMP WITH TIME ZONE,
    external_url TEXT,
    research_abstract TEXT,
    research_methodology TEXT,
    research_findings TEXT,
    research_conclusion TEXT,
    experiment_config JSONB,
    user_id UUID DEFAULT auth.uid() NOT NULL
);

-- Add RLS policies
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" 
    ON collections FOR SELECT 
    TO public 
    USING (true);

CREATE POLICY "Enable insert for authenticated users only" 
    ON collections FOR INSERT 
    TO authenticated 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for users based on user_id" 
    ON collections FOR UPDATE 
    TO authenticated 
    USING (auth.uid() = user_id);

CREATE POLICY "Enable delete for users based on user_id" 
    ON collections FOR DELETE 
    TO authenticated 
    USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON TABLE collections TO authenticated;
GRANT SELECT ON TABLE collections TO anon;
GRANT ALL ON SEQUENCE collections_id_seq TO authenticated;
GRANT SELECT ON SEQUENCE collections_id_seq TO anon;
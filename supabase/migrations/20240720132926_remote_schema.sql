-- Create collections table with all required columns
CREATE TABLE IF NOT EXISTS "public"."collections" (
    "id" SERIAL PRIMARY KEY,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "title" text NOT NULL,
    "slug" text NOT NULL UNIQUE,
    "description" text,
    "content" text,
    "image_url" text NOT NULL,
    "type" text NOT NULL,
    "status" text NOT NULL,
    "order" integer NOT NULL DEFAULT 0,
    "featured" boolean NOT NULL DEFAULT false,
    "author" text,
    "publish_date" timestamp with time zone,
    "external_url" text,
    "research_abstract" text,
    "research_methodology" text,
    "research_findings" text,
    "research_conclusion" text,
    "experiment_config" jsonb,
    "user_id" uuid DEFAULT auth.uid() NOT NULL
);

-- Add RLS policies
ALTER TABLE "public"."collections" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" 
ON "public"."collections" FOR SELECT 
TO public 
USING (true);

CREATE POLICY "Enable insert for authenticated users only" 
ON "public"."collections" FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for users based on user_id" 
ON "public"."collections" FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Enable delete for users based on user_id" 
ON "public"."collections" FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON TABLE "public"."collections" TO authenticated;
GRANT SELECT ON TABLE "public"."collections" TO anon;
GRANT ALL ON SEQUENCE "public"."collections_id_seq" TO authenticated;
GRANT SELECT ON SEQUENCE "public"."collections_id_seq" TO anon;
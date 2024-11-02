-- Add experiment_config column to collections table
ALTER TABLE collections 
ADD COLUMN experiment_config jsonb,
ADD COLUMN custom_layout text CHECK (custom_layout IN ('default', 'split', 'fullscreen', 'dashboard'));

-- Insert Claude AI research experiment
INSERT INTO collections (
  title,
  type,
  slug,
  description,
  image_url,
  status,
  featured,
  "order",
  author,
  publish_date,
  research_abstract,
  research_methodology,
  research_findings,
  research_conclusion,
  experiment_config,
  user_id
) VALUES (
  'Claude AI Research',
  'research',
  'claude-ai-research',
  'Exploring next-generation AI interactions with a Claude-like assistant',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
  'published',
  true,
  1,
  'AI Research Team',
  NOW(),
  'This research explores human-AI interaction patterns through a Claude-like interface',
  'We implemented a simulated Claude AI interface to study user interaction patterns',
  'Initial testing shows promising results in natural conversation flows',
  'The experiment demonstrates the potential of Claude-like AI assistants in research contexts',
  '{"type": "claude-ai", "settings": {}, "components": ["ClaudeAI"]}',
  auth.uid()
);
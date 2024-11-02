-- Clear existing data
TRUNCATE TABLE "public"."collections" RESTART IDENTITY CASCADE;

-- Seed initial data for collections
INSERT INTO "public"."collections" (
    title,
    slug,
    description,
    image_url,
    type,
    status,
    order,
    featured,
    author,
    publish_date,
    research_abstract,
    research_methodology,
    research_findings,
    research_conclusion,
    experiment_config,
    custom_layout
) VALUES (
    'Claude AI Assistant Experiment',
    'claude-ai-assistant',
    'Experience an AI assistant inspired by Claude, featuring natural language understanding and contextual responses.',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    'research',
    'published',
    1,
    true,
    'Research Team',
    NOW(),
    'This experiment explores the implementation of a Claude-inspired AI assistant interface, focusing on natural language interaction and response generation.',
    'The experiment utilizes React for the frontend interface, with simulated AI responses to demonstrate the potential of AI assistant interactions.',
    'Initial testing shows promising results in terms of user engagement and interface usability.',
    'The experiment successfully demonstrates the potential for AI assistant interfaces while highlighting areas for future enhancement.',
    '{
        "type": "custom",
        "settings": {
            "title": "Claude AI Assistant",
            "description": "An experimental AI assistant interface"
        },
        "components": ["ClaudeAI"]
    }'::jsonb,
    'default'
);
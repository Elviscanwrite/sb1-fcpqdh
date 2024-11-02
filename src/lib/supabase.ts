import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export type ContentType = 'featured' | 'overview' | 'news' | 'research';
export type ContentStatus = 'draft' | 'published' | 'archived';
export type ExperimentType = 'stock-advisor' | 'adaptive-ui' | 'custom' | 'claude-ai';

export interface ExperimentConfig {
  type: ExperimentType;
  settings: Record<string, any>;
  components: string[];
  styles: Record<string, string>;
  deploymentUrl?: string;
}

export interface Collection {
  id: number;
  created_at: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  image_url: string;
  type: ContentType;
  status: ContentStatus;
  order: number;
  featured: boolean;
  author?: string;
  publish_date?: string;
  external_url?: string;
  research_abstract?: string;
  research_methodology?: string;
  research_findings?: string;
  research_conclusion?: string;
  experiment_config?: ExperimentConfig;
  custom_styles?: string;
  custom_layout?: 'default' | 'split' | 'fullscreen' | 'dashboard';
}

export const CONTENT_TYPE_FIELDS: Record<ContentType, (keyof Collection)[]> = {
  featured: ['description', 'content', 'image_url', 'order', 'status', 'featured'],
  overview: ['description', 'content', 'image_url', 'order', 'status'],
  news: ['description', 'content', 'image_url', 'author', 'publish_date', 'external_url', 'status'],
  research: [
    'research_abstract',
    'research_methodology',
    'research_findings',
    'research_conclusion',
    'author',
    'publish_date',
    'image_url',
    'status',
    'experiment_config',
    'custom_styles',
    'custom_layout'
  ]
};

export async function fetchCollectionBySlug(slug: string): Promise<Collection | null> {
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching collection:', error);
    return null;
  }

  return data;
}

export async function fetchCollections(type?: ContentType): Promise<Collection[]> {
  let query = supabase.from('collections').select('*');
  
  if (type) {
    query = query.eq('type', type);
  }
  
  const { data, error } = await query.order('order', { ascending: true });

  if (error) {
    console.error('Error fetching collections:', error);
    return [];
  }

  return data || [];
}
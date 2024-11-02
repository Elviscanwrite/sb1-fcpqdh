import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader } from 'lucide-react';
import { supabase, type Collection, type ContentType, CONTENT_TYPE_FIELDS } from '../lib/supabase';

interface FormField {
  id: string; // Added unique id for each field
  name: keyof Collection;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'url' | 'date' | 'checkbox';
  options?: string[];
  rows?: number;
}

type CollectionFormProps = {
  mode: 'create' | 'edit';
};

export function CollectionForm({ mode }: CollectionFormProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Collection>>({
    title: '',
    type: 'overview',
    slug: '',
    description: '',
    content: '',
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
    status: 'draft',
    order: 0,
    featured: false
  });

  useEffect(() => {
    if (mode === 'edit' && id) {
      loadCollection(parseInt(id));
    }
  }, [mode, id]);

  async function loadCollection(collectionId: number) {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .eq('id', collectionId)
        .single();

      if (error) throw error;
      if (data) setFormData(data);
    } catch (err) {
      console.error('Error loading collection:', err);
      setError('Failed to load collection');
    } finally {
      setLoading(false);
    }
  }

  const getFieldsForType = (type: ContentType): FormField[] => {
    // Add common fields first with unique IDs
    const commonFields: FormField[] = [
      { id: 'common-title', name: 'title', label: 'Title', type: 'text' },
      { id: 'common-type', name: 'type', label: 'Type', type: 'select', options: ['featured', 'overview', 'news', 'research'] },
      { id: 'common-slug', name: 'slug', label: 'Slug', type: 'text' }
    ];

    // Add type-specific fields with unique IDs
    const typeFields = CONTENT_TYPE_FIELDS[type].map((field): FormField => {
      const baseField: FormField = {
        id: `type-${type}-${field}`,
        name: field,
        label: field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        type: 'text'
      };

      switch (field) {
        case 'content':
        case 'description':
        case 'research_abstract':
        case 'research_methodology':
        case 'research_findings':
        case 'research_conclusion':
          return { ...baseField, type: 'textarea', rows: 4 };
        case 'image_url':
        case 'thumbnail_url':
        case 'external_url':
          return { ...baseField, type: 'url' };
        case 'order':
          return { ...baseField, type: 'number' };
        case 'status':
          return { ...baseField, type: 'select', options: ['draft', 'published', 'archived'] };
        case 'featured':
          return { ...baseField, type: 'checkbox' };
        case 'publish_date':
        case 'news_date':
          return { ...baseField, type: 'date' };
        default:
          return baseField;
      }
    });

    return [...commonFields, ...typeFields];
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const slug = formData.slug || formData.title?.toLowerCase().replace(/\s+/g, '-');
      
      if (mode === 'create') {
        const { error } = await supabase
          .from('collections')
          .insert([{ ...formData, slug }]);
        if (error) throw error;
      } else if (id) {
        const { error } = await supabase
          .from('collections')
          .update({ ...formData, slug })
          .eq('id', id);
        if (error) throw error;
      }
      
      navigate('/admin');
    } catch (err) {
      console.error('Error saving collection:', err);
      setError('Failed to save collection');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  const fields = getFieldsForType(formData.type as ContentType);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Admin
        </button>

        <h1 className="text-3xl font-bold mb-8">
          {mode === 'create' ? 'Create New Content' : 'Edit Content'}
        </h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            {fields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium mb-2">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    rows={field.rows}
                    className="w-full bg-white/5 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full bg-white/5 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {field.options?.map(option => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'checkbox' ? (
                  <input
                    type="checkbox"
                    name={field.name}
                    checked={!!formData[field.name]}
                    onChange={e => setFormData(prev => ({ ...prev, [field.name]: e.target.checked }))}
                    className="rounded bg-white/5 border-gray-600 text-purple-500 focus:ring-purple-500"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className="w-full bg-white/5 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={saving}
              className="flex-1 bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Content'}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => navigate('/admin')}
              className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { fetchCollectionBySlug } from '../lib/supabase';
import type { Collection } from '../lib/supabase';
import { Button } from '@/components/ui/button';

export function Collection() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCollection() {
      if (!slug) {
        setError('Collection not found');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchCollectionBySlug(slug);
        if (!data) {
          setError('Collection not found');
          return;
        }
        setCollection(data);
      } catch (err) {
        console.error('Error loading collection:', err);
        setError('Failed to load collection');
      } finally {
        setLoading(false);
      }
    }

    loadCollection();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-red-500 mb-4">
              {error || 'Collection not found'}
            </h1>
            <p className="text-gray-400">
              The content you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="h-[40vh] relative">
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${collection.image_url})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-black/20" />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              {collection.title}
            </motion.h1>
            {collection.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-200"
              >
                {collection.description}
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 flex items-center gap-2 text-gray-400 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Research Content */}
        <div className="space-y-8 mb-12">
          {collection.research_abstract && (
            <Section title="Abstract">
              {collection.research_abstract}
            </Section>
          )}
          {collection.research_methodology && (
            <Section title="Methodology">
              {collection.research_methodology}
            </Section>
          )}
          {collection.research_findings && (
            <Section title="Findings">
              {collection.research_findings}
            </Section>
          )}
          {collection.research_conclusion && (
            <Section title="Conclusion">
              {collection.research_conclusion}
            </Section>
          )}
        </div>

        {/* Experiment Link */}
        {collection.experiment_config && (
          <div className="mt-8">
            <Button
              onClick={() => navigate(`/experiments/${collection.experiment_config?.type}`)}
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
            >
              Try the Experiment
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3 text-white">{title}</h2>
      <div className="prose prose-invert max-w-none">
        {children}
      </div>
    </div>
  );
}
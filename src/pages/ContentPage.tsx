import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { fetchCollectionBySlug } from '../lib/supabase';
import type { Collection } from '../lib/supabase';

export function ContentPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      if (!slug) return;
      try {
        const data = await fetchCollectionBySlug(slug);
        setContent(data);
      } catch (error) {
        console.error('Error loading content:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <div 
        className="h-[50vh] relative bg-cover bg-center"
        style={{ backgroundImage: `url(${content.image_url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-center"
          >
            {content.title}
          </motion.h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-invert max-w-none"
        >
          <p className="text-xl text-gray-300">
            {content.description || 'More details coming soon...'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
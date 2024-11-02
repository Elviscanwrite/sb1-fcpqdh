import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Collection, fetchCollectionBySlug } from '../lib/supabase';
import { motion } from 'framer-motion';

export function CollectionPage() {
  const { slug } = useParams();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCollection() {
      if (!slug) return;
      try {
        const data = await fetchCollectionBySlug(slug);
        setCollection(data);
      } catch (error) {
        console.error('Error loading collection:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCollection();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Collection not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 py-24"
      >
        <div className="relative h-96 rounded-xl overflow-hidden mb-12">
          <img
            src={collection.image_url}
            alt={collection.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl font-bold mb-4">{collection.title}</h1>
            <p className="text-lg text-gray-200">{collection.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
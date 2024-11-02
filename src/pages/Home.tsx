import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Section } from '../components/Section';
import { Card } from '../components/Card';
import { supabase } from '../lib/supabase';
import type { Collection } from '../lib/supabase';
import { Loader } from 'lucide-react';
import { initializeCollections } from '../lib/db';

export function Home() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCollections();
  }, []);

  async function fetchCollections() {
    try {
      // Initialize collections if needed
      await initializeCollections(supabase);

      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;
      setCollections(data || []);
    } catch (error) {
      console.error('Error:', error);
      setError('Unable to load content. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader className="w-6 h-6 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-400 mb-8">{error}</p>
            <button
              onClick={() => {
                setError(null);
                setLoading(true);
                fetchCollections();
              }}
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Filter collections by type
  const overviewItems = collections.filter(item => item.type === 'overview');
  const newsItems = collections.filter(item => item.type === 'news');
  const researchItems = collections.filter(item => item.type === 'research');

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 pt-24">
        {collections.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <p className="text-gray-400">No content available at the moment.</p>
          </motion.div>
        ) : (
          <>
            {overviewItems.length > 0 && (
              <Section title="Overview">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {overviewItems.map((item) => (
                    <Card
                      key={item.id}
                      title={item.title}
                      image={item.image_url}
                      slug={item.slug}
                      size="large"
                    />
                  ))}
                </div>
              </Section>
            )}

            {researchItems.length > 0 && (
              <Section title="Research">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {researchItems.map((item) => (
                    <Card
                      key={item.id}
                      title={item.title}
                      image={item.image_url}
                      slug={item.slug}
                      size="medium"
                    />
                  ))}
                </div>
              </Section>
            )}

            {newsItems.length > 0 && (
              <Section title="Latest news">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {newsItems.map((item) => (
                    <Card
                      key={item.id}
                      title={item.title}
                      image={item.image_url}
                      slug={item.slug}
                    />
                  ))}
                </div>
              </Section>
            )}
          </>
        )}
      </main>

      <footer className="mt-24 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Company', 'Product', 'Research', 'Legal'].map((section) => (
              <div key={section}>
                <h3 className="font-semibold mb-4">{section}</h3>
                <ul className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <li key={i} className="text-gray-400 hover:text-white cursor-pointer">
                      {`${section} link ${i + 1}`}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
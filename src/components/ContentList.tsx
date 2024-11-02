import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2, Eye, Archive } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Collection } from '../lib/supabase';

interface ContentListProps {
  items: Collection[];
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
}

export function ContentList({ items, onDelete, onArchive }: ContentListProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/10 text-green-500';
      case 'draft':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'archived':
        return 'bg-gray-500/10 text-gray-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <motion.div
          key={item.id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
        >
          <div 
            className="p-6 cursor-pointer"
            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium text-lg">{item.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="capitalize">{item.type}</span>
                    <span>•</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/collection/${item.slug}`}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Eye className="w-5 h-5" />
                </Link>
                <Link
                  to={`/admin/edit/${item.id}`}
                  className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Edit2 className="w-5 h-5" />
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onArchive(item.id);
                  }}
                  className="p-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  <Archive className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                  }}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {expandedId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Description:</span>
                      <p className="mt-1">{item.description || 'No description'}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Slug:</span>
                      <p className="mt-1">{item.slug}</p>
                    </div>
                    {item.author && (
                      <div>
                        <span className="text-gray-400">Author:</span>
                        <p className="mt-1">{item.author}</p>
                      </div>
                    )}
                    {item.publish_date && (
                      <div>
                        <span className="text-gray-400">Publish Date:</span>
                        <p className="mt-1">{new Date(item.publish_date).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
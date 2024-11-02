import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Moon, Sun, Layout } from 'lucide-react';

interface AdaptiveUIProps {
  initialTheme?: 'light' | 'dark';
  initialLayout?: 'compact' | 'comfortable';
}

export default function AdaptiveUI({ 
  initialTheme = 'dark',
  initialLayout = 'comfortable' 
}: AdaptiveUIProps) {
  const [theme, setTheme] = useState(initialTheme);
  const [layout, setLayout] = useState(initialLayout);
  const [userPreferences, setUserPreferences] = useState<string[]>([]);

  useEffect(() => {
    // Simulate AI learning from user interactions
    const interval = setInterval(() => {
      const newPreference = Math.random() > 0.5 ? 'Prefers visual content' : 'Prefers textual content';
      setUserPreferences(prev => [...prev.slice(-4), newPreference]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`rounded-xl p-8 ${
      theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'
    }`}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Settings className="w-8 h-8 text-purple-500" />
          <h2 className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Adaptive UI Demo
          </h2>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            className={`p-2 rounded-lg ${
              theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'
            }`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          
          <button
            onClick={() => setLayout(l => l === 'compact' ? 'comfortable' : 'compact')}
            className={`p-2 rounded-lg ${
              theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'
            }`}
          >
            <Layout className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className={`grid gap-6 ${
        layout === 'compact' ? 'grid-cols-2' : 'grid-cols-1'
      }`}>
        <motion.div
          layout
          className={`rounded-lg p-6 ${
            theme === 'dark' ? 'bg-white/10' : 'bg-white'
          }`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Learned Preferences
          </h3>
          <div className="space-y-2">
            {userPreferences.map((pref, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-2 rounded ${
                  theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'
                }`}
              >
                {pref}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          layout
          className={`rounded-lg p-6 ${
            theme === 'dark' ? 'bg-white/10' : 'bg-white'
          }`}
        >
          <h3 className={`text-lg font-semibold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Current Settings
          </h3>
          <div className="space-y-4">
            <div>
              <span className="text-sm text-gray-500">Theme:</span>
              <span className="ml-2 capitalize">{theme}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">Layout:</span>
              <span className="ml-2 capitalize">{layout}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
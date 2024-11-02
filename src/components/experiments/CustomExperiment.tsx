import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CustomExperimentProps {
  title?: string;
  description?: string;
  components?: string[];
  customStyles?: Record<string, string>;
}

export default function CustomExperiment({
  title = 'Custom Experiment',
  description = 'A flexible container for custom AI experiments',
  components = [],
  customStyles = {}
}: CustomExperimentProps) {
  const [activeComponent, setActiveComponent] = useState(0);

  useEffect(() => {
    // Auto-rotate components if multiple are present
    if (components.length > 1) {
      const interval = setInterval(() => {
        setActiveComponent(current => (current + 1) % components.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [components.length]);

  return (
    <div className="bg-white/5 rounded-xl p-8" style={customStyles}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-400">{description}</p>
      </motion.div>

      <div className="relative min-h-[300px] bg-white/5 rounded-lg p-6">
        {components.length > 0 ? (
          <motion.div
            key={activeComponent}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute inset-0 p-6"
          >
            {components[activeComponent]}
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No components configured
          </div>
        )}
      </div>

      {components.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {components.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveComponent(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeComponent ? 'bg-purple-500' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
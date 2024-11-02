import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import type { ExperimentConfig } from '../../lib/supabase';

const experimentComponents = {
  'claude-ai': lazy(() => import('./ClaudeAI')),
  'stock-advisor': lazy(() => import('./StockAdvisor')),
  'adaptive-ui': lazy(() => import('./AdaptiveUI')),
  'custom': lazy(() => import('./CustomExperiment'))
};

interface ExperimentRendererProps {
  config: ExperimentConfig;
  className?: string;
}

export function ExperimentRenderer({ config, className }: ExperimentRendererProps) {
  const ExperimentComponent = experimentComponents[config.type];

  if (!ExperimentComponent) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-red-500">
        Experiment type not found: {config.type}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Suspense fallback={
        <div className="w-full h-64 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
        </div>
      }>
        <ExperimentComponent {...config.settings} />
      </Suspense>
    </motion.div>
  );
}
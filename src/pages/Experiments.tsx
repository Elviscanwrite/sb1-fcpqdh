import { useParams } from 'react-router-dom';
import { ClaudeAI } from '../components/experiments/ClaudeAI/index';

export function Experiments() {
  const { type } = useParams();

  // Render the appropriate experiment based on type
  switch (type) {
    case 'claude-ai':
      return <ClaudeAI />;
    default:
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Experiment Not Found</h1>
            <p className="text-gray-400">The requested experiment does not exist.</p>
          </div>
        </div>
      );
  }
}
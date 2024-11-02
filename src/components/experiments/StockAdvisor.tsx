import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface StockAdvisorProps {
  apiKey?: string;
  defaultSymbols?: string[];
}

export default function StockAdvisor({ defaultSymbols = ['AAPL', 'GOOGL', 'MSFT'] }: StockAdvisorProps) {
  const [symbol, setSymbol] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleAnalyze = async () => {
    // Simulate AI analysis
    setAnalysis('Based on current market trends and AI analysis, this stock shows strong potential for growth...');
  };

  return (
    <div className="bg-white/5 rounded-xl p-8">
      <div className="flex items-center gap-4 mb-8">
        <DollarSign className="w-8 h-8 text-purple-500" />
        <h2 className="text-2xl font-bold">AI Stock Advisor</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {defaultSymbols.map((sym) => (
          <motion.div
            key={sym}
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">{sym}</span>
              {Math.random() > 0.5 ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
            </div>
            <div className="mt-2 text-2xl font-bold">
              ${(Math.random() * 1000).toFixed(2)}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Enter Stock Symbol
          </label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            className="w-full bg-white/5 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="e.g., AAPL"
          />
        </div>

        <button
          onClick={handleAnalyze}
          className="w-full bg-purple-500 text-white rounded-lg px-4 py-2 hover:bg-purple-600 transition-colors"
        >
          Analyze Stock
        </button>

        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-lg p-4 mt-4"
          >
            <h3 className="font-semibold mb-2">AI Analysis</h3>
            <p className="text-gray-300">{analysis}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
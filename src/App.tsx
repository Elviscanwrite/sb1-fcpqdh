import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { Card } from './components/Card';
import { Beaker, Bot } from 'lucide-react';

function App() {
  const cards = [
    {
      title: "Innovative Solutions",
      description: "Harness cutting-edge technology to transform your ideas into powerful digital experiences.",
      image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=1600"
    },
    {
      title: "Intuitive Design",
      description: "Create seamless user experiences through beautiful, thoughtful interface design.",
      image: "https://images.unsplash.com/photo-1636953056323-9c09fdd74fa6?auto=format&fit=crop&q=80&w=1600"
    },
    {
      title: "Advanced Technology",
      description: "Leverage state-of-the-art tools and frameworks to build scalable, modern applications.",
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1600"
    }
  ];

  const labCards = [
    {
      title: "Open Artifacts",
      description: "Experience AI-powered artifact generation with Claude and GPT models. Create, edit, and manage artifacts through an intuitive interface.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600",
      icon: <Bot className="w-6 h-6 text-purple-500" />,
      link: "/chat"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 pt-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transform Your Digital Vision
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the perfect blend of innovation, design, and technology to bring your ideas to life.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16"
        >
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              image={card.image}
            />
          ))}
        </motion.div>

        {/* Labs Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-16 pb-24"
        >
          <div className="flex items-center gap-3 justify-center mb-8">
            <Beaker className="w-8 h-8 text-purple-500" />
            <h2 className="text-3xl font-bold">Labs</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {labCards.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="relative group rounded-xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-50"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                <div className="relative z-20 p-6 flex flex-col h-full min-h-[320px]">
                  <div className="flex items-center gap-3 mb-4">
                    {card.icon}
                    <h3 className="text-2xl font-bold">{card.title}</h3>
                  </div>
                  <p className="text-gray-300 flex-grow mb-6">{card.description}</p>
                  <motion.a
                    href={card.link}
                    className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Try it now
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default App;
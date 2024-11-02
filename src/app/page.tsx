import { Header } from '@/components/Header';
import { Card } from '@/components/Card';

export default function Home() {
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

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 pt-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transform Your Digital Vision
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the perfect blend of innovation, design, and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              image={card.image}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
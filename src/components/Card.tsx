import { motion } from 'framer-motion';
import Link from 'next/link';

interface CardProps {
  title: string;
  description: string;
  image: string;
  icon?: React.ReactNode;
  link?: string;
}

export function Card({ title, description, image, icon, link }: CardProps) {
  const CardWrapper = link ? Link : motion.div;
  const wrapperProps = link ? { href: link } : {};

  return (
    <CardWrapper
      {...wrapperProps}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative rounded-xl overflow-hidden group cursor-pointer h-[400px]"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center transform"
        style={{ backgroundImage: `url(${image})` }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-8">
        <div className="flex items-center gap-3 mb-3">
          {icon}
          <h3 className="text-3xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-gray-200 text-base opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          {description}
        </p>
      </div>
    </CardWrapper>
  );
}
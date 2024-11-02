import { motion } from 'framer-motion';
import { Menu, Search } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <nav className="flex items-center gap-6">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white font-semibold"
            >
              Home
            </motion.div>
          </Link>
          <Link href="/about">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-white"
            >
              About
            </motion.div>
          </Link>
          <Link href="/contact">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-white"
            >
              Contact
            </motion.div>
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Search className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <Menu className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
        </div>
      </div>
    </motion.header>
  );
}
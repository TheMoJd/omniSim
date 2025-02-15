import React, { useState } from 'react';
import { Brain, BarChart3, Users, MessageSquare, Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Basculer le Dark Mode
  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm fixed w-full z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">OpinionSim AI</span>
            </Link>
          </motion.div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-8 items-center">
            <motion.div className="flex space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/dashboard"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/subscription"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Abonnement
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/profile"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Profil
                </Link>
              </motion.div>
            </motion.div>
            <motion.button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <motion.button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </motion.button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 transition-colors"
          >
            <div className="px-4 py-4 space-y-4">
              <a
                href="#features"
                className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Fonctionnalités
              </a>
              <a
                href="#about"
                className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </a>
              <Link
                to="/dashboard"
                className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/simulation"
                className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Simulation
              </Link>
              <Link
                to="/subscription"
                className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Abonnement
              </Link>
              <Link
                to="/profile"
                className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Profil
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;

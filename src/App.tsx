import React, { useState, useEffect } from 'react';
import { Brain, BarChart3, Users, MessageSquare, ArrowRight, Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [topic, setTopic] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleSimulation = () => {
    if (!topic) return;
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 2000);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm fixed w-full z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Brain className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">OpinionSim AI</span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <motion.a 
                href="#features" 
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Fonctionnalités
              </motion.a>
              <motion.a 
                href="#about" 
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                À propos
              </motion.a>
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Simulez l'Opinion Publique avec l'IA
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez ce que pense vraiment le public sur n'importe quel sujet grâce à notre simulation alimentée par l'intelligence artificielle.
          </p>
        </motion.div>

        {/* Simulation Input */}
        <motion.div 
          className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-16 transition-colors"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <div className="space-y-4">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Sujet à analyser
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
              placeholder="Ex: La transition écologique en France"
            />
            <motion.button
              onClick={handleSimulation}
              disabled={!topic || isSimulating}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                (!topic || isSimulating) && 'opacity-50 cursor-not-allowed'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSimulating ? (
                <motion.div 
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  <span>Lancer la simulation</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Features */}
        <div id="features" className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <BarChart3 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
              title: "Analyse Détaillée",
              description: "Obtenez des analyses approfondies basées sur des millions de points de données."
            },
            {
              icon: <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
              title: "Segments Démographiques",
              description: "Comprenez les opinions par groupe d'âge, région et catégorie socio-professionnelle."
            },
            {
              icon: <MessageSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
              title: "Tendances en Temps Réel",
              description: "Suivez l'évolution des opinions et identifiez les tendances émergentes."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                {feature.icon}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* About Section */}
        <motion.div 
          id="about" 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">À propos d'OpinionSim AI</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Notre plateforme utilise des algorithmes d'intelligence artificielle de pointe pour simuler et analyser l'opinion publique sur divers sujets. En combinant l'apprentissage automatique avec des données démographiques détaillées, nous fournissons des insights précis et pertinents.
          </p>
          <motion.div
            className="rounded-xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
              alt="Team collaboration"
              className="w-full h-64 object-cover"
            />
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 mt-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <span className="text-gray-900 dark:text-white font-semibold">OpinionSim AI</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400">&copy; 2024 OpinionSim AI. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
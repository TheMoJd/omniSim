import React from 'react';
import { motion } from 'framer-motion';

const Subscription = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Choisissez votre plan</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Des solutions adaptées à vos besoins, sans engagement.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card Basique */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Basique</h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-center">
              Accès limité aux simulations et fonctionnalités de base.
            </p>
            <div className="mt-6 text-center">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">10€</span>
              <span className="text-gray-600 dark:text-gray-300">/mois</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-full shadow-md transition-colors"
            >
              Choisir
            </motion.button>
          </motion.div>

          {/* Card Pro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 flex flex-col border-2 border-indigo-600"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Pro</h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-center">
              Accès complet aux simulations, fonctionnalités avancées et support prioritaire.
            </p>
            <div className="mt-6 text-center">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">100€</span>
              <span className="text-gray-600 dark:text-gray-300">/mois</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-full shadow-md transition-colors"
            >
              Choisir
            </motion.button>
          </motion.div>

          {/* Card Entreprise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Entreprise</h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-center">
              Solutions sur mesure et intégration complète pour votre entreprise.
            </p>
            <div className="mt-6 text-center">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">Sur devis</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-full shadow-md transition-colors"
            >
              Contactez-nous
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;

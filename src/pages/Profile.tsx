import React from 'react';
import { motion } from 'framer-motion';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
        >
          <div className="flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-4 border-indigo-600 dark:border-indigo-400 shadow-lg"
            />
            <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">John Doe</h2>
            <p className="mt-1 text-gray-600 dark:text-gray-300">john.doe@example.com</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-full shadow-md transition-colors"
            >
              Modifier le profil
            </motion.button>
          </div>
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Détails personnels</h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 dark:text-gray-300">Nom complet</p>
                <p className="mt-1 text-gray-900 dark:text-white">John Doe</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">Email</p>
                <p className="mt-1 text-gray-900 dark:text-white">john.doe@example.com</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">Téléphone</p>
                <p className="mt-1 text-gray-900 dark:text-white">+1 (555) 123-4567</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300">Localisation</p>
                <p className="mt-1 text-gray-900 dark:text-white">Paris, France</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

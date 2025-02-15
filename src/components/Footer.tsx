import React from 'react';
import { Brain } from 'lucide-react';

const Footer = () => {
  return (
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
  );
};

export default Footer;

import React from 'react';

type DarkModeToggleProps = {
  isDark: boolean;
  toggleDarkMode: () => void;
};

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDark, toggleDarkMode }) => (
  <div className="flex justify-center mt-8">
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
    >
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  </div>
);

export default DarkModeToggle;

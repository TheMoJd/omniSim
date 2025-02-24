import React from 'react';

type TopicFormProps = {
  topic: string;
  onTopicChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
};

const TopicForm: React.FC<TopicFormProps> = ({ topic, onTopicChange, onSubmit, isLoading }) => (
  <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
    <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 pb-2">
      Sujet à analyser
    </label>
    <input
      type="text"
      id="topic"
      value={topic}
      onChange={(e) => onTopicChange(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      placeholder="Ex: Impact de l'IA sur la société"
      aria-label="Sujet à analyser"
    />
    <button
      onClick={onSubmit}
      disabled={!topic || isLoading}
      className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg disabled:opacity-50"
    >
      {isLoading ? 'Génération...' : 'Générer les personas'}
    </button>
  </div>
);

export default TopicForm;

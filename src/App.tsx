import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import TopicForm from './components/TopicForm';
import PersonaList from './components/PersonaList';
import OpinionList from './components/OpinionList';
import DarkModeToggle from './components/DarkModeToggle';
import { Persona } from './types/Persona';
import { Opinion } from './types/Opinion';

const API_URL = 'http://localhost:5000/api';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const handleGeneratePersonas = useCallback(async () => {
    if (!topic) return;
    setIsLoading(true);
    setError(null);
    setPersonas([]);
    setOpinions([]);
    try {
      const response = await fetch(`${API_URL}/generate-personas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      if (!response.ok) throw new Error('Erreur lors de la génération des personas');
      const data = await response.json();
      setPersonas(data.personas);
    } catch (err) {
      setError('Impossible de générer les personas.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  const handleConfirmAndSimulate = useCallback(async () => {
    if (!topic || personas.length === 0) return;
    setIsLoading(true);
    setError(null);
    setOpinions([]);
    try {
      const response = await fetch(`${API_URL}/update-personas-and-simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, personas }),
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour et simulation');
      const data = await response.json();
      setOpinions(data.opinions);
    } catch (err) {
      setError('Impossible de simuler les opinions.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [topic, personas]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <motion.div className="text-center mb-16" initial="initial" animate="animate" variants={fadeIn}>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Simulez l'Opinion Publique avec l'IA
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez ce que pense le public sur n'importe quel sujet grâce à notre IA.
          </p>
        </motion.div>

        {error && (
          <div className="max-w-2xl mx-auto bg-red-100 text-red-700 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        <TopicForm
          topic={topic}
          onTopicChange={setTopic}
          onSubmit={handleGeneratePersonas}
          isLoading={isLoading}
        />

        {personas.length > 0 && (
          <PersonaList
            personas={personas}
            onConfirm={handleConfirmAndSimulate}
            isLoading={isLoading}
          />
        )}

        {opinions.length > 0 && <OpinionList opinions={opinions} />}

        <DarkModeToggle isDark={isDark} toggleDarkMode={() => setIsDark(!isDark)} />
      </main>
    </div>
  );
};

export default App;

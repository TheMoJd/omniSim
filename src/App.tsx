import React, { useEffect, useState } from 'react';
import {
  Brain,
  BarChart3,
  Users,
  MessageSquare,
  ArrowRight,
  User,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Persona = {
  name: string;
  age: number;
  gender: string;
  location: string;
  education: string;
  maritalStatus: string;
  occupation: string;
  incomeLevel: number;
};

const personas: { [key: string]: Persona } = {
  persona1: {
    name: 'Alice',
    age: 35,
    gender: 'Femme',
    location: 'Californie',
    education: 'Master en éducation',
    maritalStatus: 'Mariée',
    occupation: 'Enseignante',
    incomeLevel: 6,
  },
  persona2: {
    name: 'John',
    age: 45,
    gender: 'Homme',
    location: 'Texas',
    education: 'Licence',
    maritalStatus: 'Célibataire',
    occupation: 'Ingénieur logiciel',
    incomeLevel: 8,
  },
  persona3: {
    name: 'Alex',
    age: 28,
    gender: 'Non-binaire',
    location: 'New York',
    education: 'Doctorat en sociologie',
    maritalStatus: 'Vivant en couple',
    occupation: 'Chercheur',
    incomeLevel: 7,
  },
};

function App() {
  const [topic, setTopic] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  // simulationResults contiendra un tableau de chaînes de caractères correspondant aux résultats
  const [simulationResults, setSimulationResults] = useState<string[]>([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Appel à votre backend pour lancer la simulation OpenAI
  const handleSimulation = async () => {
    if (!topic) return;
    setIsSimulating(true);
    setSimulationResults([]);
    try {
      const response = await fetch('http://localhost:5000/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la simulation');
      }
      const data = await response.json();
      // On suppose que data.result est une chaîne avec plusieurs personas séparés par "\n\n"
      const rawResult = data.result || '';
      const resultsArray = rawResult.split('\n\n').filter(
        (line: string) => line.trim() !== ''
      );
      setSimulationResults(resultsArray);
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsSimulating(false);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
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
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
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
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
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

        {/* Résultat de la simulation */}
        {simulationResults.length > 0 && (
          <motion.div
            className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-16 transition-colors"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
              Résultat de la simulation
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {Object.keys(personas).map((key, index) => {
                const persona: Persona = personas[key];
                return (
                  <motion.div
                    key={key}
                    className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-colors"
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                    variants={{
                      rest: {},
                      hover: {}
                    }}
                  >
                    <h3 className="flex justify-center text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {persona.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-line">
                      {simulationResults[index]}
                    </p>
                    {/* Overlay des détails, apparaît au survol */}
                    <motion.div
                      className="absolute inset-0 bg-black bg-opacity-70 rounded-xl flex flex-col items-center justify-center p-4"
                      variants={{
                        rest: { opacity: 0 },
                        hover: { opacity: 1 }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <User className="w-6 h-6 text-white mb-2" />
                      <p className="text-sm text-white">Âge: {persona.age} ans</p>
                      <p className="text-sm text-white">Genre: {persona.gender}</p>
                      <p className="text-sm text-white">Localisation: {persona.location}</p>
                      <p className="text-sm text-white">Formation: {persona.education}</p>
                      <p className="text-sm text-white">Statut: {persona.maritalStatus}</p>
                      <p className="text-sm text-white">Profession: {persona.occupation}</p>
                      <p className="text-sm text-white">Revenu: {persona.incomeLevel}</p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Features Section */}
        <div id="features" className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: (
                <BarChart3 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              ),
              title: 'Analyse Détaillée',
              description:
                'Obtenez des analyses approfondies basées sur des millions de points de données.'
            },
            {
              icon: <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
              title: 'Segments Démographiques',
              description:
                "Comprenez les opinions par groupe d'âge, région et catégorie socio-professionnelle."
            },
            {
              icon: (
                <MessageSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              ),
              title: 'Tendances en Temps Réel',
              description:
                "Suivez l'évolution des opinions et identifiez les tendances émergentes."
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            À propos d'OpinionSim AI
          </h2>
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
    </div>
  );
}

export default App;

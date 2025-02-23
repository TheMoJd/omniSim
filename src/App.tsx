import React, { useEffect, useState } from 'react';
import { ArrowRight, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Persona } from './types/Persona';
import { Opinion } from './types/Opinion';


// -----------------------------------------------------------------------------
// 2) Composant principal
// -----------------------------------------------------------------------------
function App() {
  const [topic, setTopic] = useState('');
  
  // Étape 1 : Personas générés
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Étape 2 : Confirmation
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Étape 3 : Simulation
  const [isSimulating, setIsSimulating] = useState(false);
  const [opinions, setOpinions] = useState<Opinion[]>([]);

  // Pour la gestion du dark mode (optionnel)
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // ---------------------------------------------------------------------------
  // 2.1) GÉNÉRER LES PERSONAS
  // ---------------------------------------------------------------------------
  const handleGeneratePersonas = async () => {
    if (!topic) return;
    setIsGenerating(true);
    setIsConfirmed(false); // On réinitialise au cas où on refait un nouveau sujet
    setOpinions([]);
    
    try {
      const response = await fetch('http://localhost:5000/api/generate-personas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la génération des personas');
      }
      const data = await response.json();
      console.log('Personas générés :', data.personas);
      // data.personas devrait être un tableau de 3 personas
      setPersonas(data.personas);
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite lors de la génération des personas.");
    } finally {
      setIsGenerating(false);
    }
  };

  // ---------------------------------------------------------------------------
  // 2.2) CONFIRMER LES PERSONAS
  //     (On suppose qu’on laisse l’utilisateur modifier manuellement s’il veut)
  // ---------------------------------------------------------------------------
  const handleConfirmPersonas = async () => {
    if (!topic || personas.length === 0) return;
    setIsConfirming(true);

    try {
      const response = await fetch('http://localhost:5000/api/confirm-personas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          personas, // On envoie le tableau complet
        }),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la confirmation des personas');
      }
      const data = await response.json();
      console.log('Personas confirmés :', data.personas);
      setIsConfirmed(true);
      alert('Personas confirmés avec succès !');
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite lors de la confirmation.");
    } finally {
      setIsConfirming(false);
    }
  };

  // ---------------------------------------------------------------------------
  // 2.3) SIMULER LES OPINIONS
  // ---------------------------------------------------------------------------
  const handleSimulate = async () => {
    if (!topic || !personas) return;
    setIsSimulating(true);
    setOpinions([]);

    try {
      const response = await fetch('http://localhost:5000/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          personas,
        }),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la simulation');
      }
      const data = await response.json();
      console.log('Opinions simulées :', data.parsedOpinions);
      setOpinions(data.parsedOpinions);
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsSimulating(false);
    }
  };
  useEffect(() => {
    console.log("State opinions mis à jour :", opinions);
  }, [opinions]);

  // ---------------------------------------------------------------------------
  // 2.4) RENDU DE LA PAGE
  // ---------------------------------------------------------------------------
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* SECTION: Titre + Description */}
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

        {/* SECTION: Formulaire pour saisir le sujet & générer les personas */}
        <motion.div
          className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 transition-colors"
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
              onClick={handleGeneratePersonas}
              disabled={!topic || isGenerating}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                (!topic || isGenerating) && 'opacity-50 cursor-not-allowed'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isGenerating ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              ) : (
                <>
                  <span>Générer les personas</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* SECTION: Affichage des personas générés + bouton de confirmation */}
        {personas.length > 0 && (
          <motion.div
            className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-8 transition-colors"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
              Personas générés
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {personas.map((persona, index) => (
                <div
                  key={index}
                  className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-colors"
                >
                  <h3 className="flex justify-center text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {persona.name}
                  </h3>

                  {/* Affichage ou édition des champs (exemple simplifié) */}
                  <p className="text-gray-600 dark:text-gray-300 mb-1">
                    Âge : {persona.age}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">
                    Genre : {persona.gender}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">
                    Localisation : {persona.location}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">
                    Éducation : {persona.education}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">
                    Statut marital : {persona.maritalStatus}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">
                    Profession : {persona.occupation}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">
                    Revenu (niveau) : {persona.incomeLevel}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">
                    Origine : {persona.ethnicGroup}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">
                    Religion : {persona.religion}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Description : {persona.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bouton de confirmation */}
            <div className="mt-8 flex justify-center">
              <motion.button
                onClick={handleConfirmPersonas}
                disabled={isConfirming || isConfirmed}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${
                  (isConfirming || isConfirmed) && 'opacity-50 cursor-not-allowed'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isConfirming ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                ) : (
                  <span>{isConfirmed ? 'Personas confirmés' : 'Confirmer personas'}</span>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* SECTION: Lancer la simulation & affichage du résultat */}
        {isConfirmed && personas.length > 0 && (
          <motion.div
            className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 transition-colors"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
              Lancer la simulation
            </h2>
            <motion.button
              onClick={handleSimulate}
              disabled={isSimulating}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                isSimulating && 'opacity-50 cursor-not-allowed'
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
                  <span>Démarrer la simulation</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* SECTION: Résultats de la simulation (opinions) */}
        {Array.isArray(opinions) && opinions.length > 0 && (
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
              {opinions.map((opinion, index) => (
                <motion.div
                  key={index}
                  className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-colors"
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                >
                  <h3 className="flex justify-center text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {opinion.nameOfPersona}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-line">
                    {opinion.opinion}
                  </p>

                  {/* Exemple : petit overlay au survol, si on veut */}
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-70 rounded-xl flex flex-col items-center justify-center p-4"
                    variants={{
                      rest: { opacity: 0 },
                      hover: { opacity: 1 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <User className="w-6 h-6 text-white mb-2" />
                    <p className="text-sm text-white">Opinion simulée</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* BONUS: un switch pour le dark mode (optionnel) */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setIsDark(!isDark)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
          >
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;

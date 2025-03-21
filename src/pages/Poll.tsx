import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users } from 'lucide-react';

interface Persona {
  id: number;
  name: string;
  age: string;
  occupation: string;
  region: string;
}

interface VoteResult {
  persona: Persona;
  choice: string;
  confidence: number;
  reasonOfChoice?: string;
}

const personas: Persona[] = [
  { id: 1, name: "Emma M.", age: "25-34", occupation: "Développeuse", region: "Île-de-France", },
  { id: 2, name: "Thomas D.", age: "45-54", occupation: "Enseignant", region: "Nouvelle-Aquitaine" },
  { id: 3, name: "Sophie L.", age: "35-44", occupation: "Commerçante", region: "Auvergne-Rhône-Alpes" },
  { id: 4, name: "Pierre M.", age: "55-64", occupation: "Médecin", region: "Bretagne" },
  { id: 5, name: "Julie P.", age: "18-24", occupation: "Étudiante", region: "Occitanie" }
];

function Poll() {
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [results, setResults] = useState<VoteResult[]>([]);

  const simulateVotes = () => {
    if (!optionA || !optionB) return;
    
    setIsSimulating(true);
    
    setTimeout(() => {
      const simulatedResults = personas.map(persona => {
        const random = Math.random();
        return {
          persona,
          choice: random > 0.5 ? optionA : optionB,
          confidence: Math.round(Math.random() * 40 + 60)
        };
      });
      
      setResults(simulatedResults);
      setIsSimulating(false);
    }, 2000);
  };

  const getAggregatedData = () => {
    const counts = {
      [optionA]: 0,
      [optionB]: 0
    };
    
    results.forEach(result => {
      counts[result.choice]++;
    });
    
    return [
      { name: optionA, value: counts[optionA] },
      { name: optionB, value: counts[optionB] }
    ];
  };

  const COLORS = ['#4F46E5', '#EC4899'];

  const renderCustomizedPieLabel = ({ name, percent }: { name: string; percent: number }) => {
    // Tronquer le texte si trop long
    const truncatedName = name.length > 15 ? name.substring(0, 12) + '...' : name;
    return `${truncatedName} (${(percent * 100).toFixed(0)}%)`;
  };

  return (
    <div className="max-w-6xl mx-auto py-12 pt-24 px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Simulation Comparative
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Comparez deux options et découvrez comment différents profils de personnes réagiraient à votre choix.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Option A
            </label>
            <input
              type="text"
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
              placeholder="Ex: Kamalla HArris"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Option B
            </label>
            <input
              type="text"
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
              placeholder="Ex: Donald Trump"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
            />
          </div>
        </div>

        <motion.button
          onClick={simulateVotes}
          disabled={!optionA || !optionB || isSimulating}
          className={`mt-6 w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
            (!optionA || !optionB || isSimulating) && 'opacity-50 cursor-not-allowed'
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
              <Users className="h-5 w-5" />
              <span>Simuler les votes</span>
            </>
          )}
        </motion.button>
      </div>

      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Répartition des votes
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getAggregatedData()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedPieLabel}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {getAggregatedData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Niveau de confiance par persona
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={results}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 70
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="persona.name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={70}
                      interval={0}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      domain={[0, 100]}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip />
                    <Bar 
                      dataKey="confidence" 
                      fill="#4F46E5" 
                      name="Confiance (%)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Détails des votes par persona
            </h3>
            <div className="space-y-4">
              {results.map((result) => (
                <motion.div
                  key={result.persona.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {result.persona.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {result.persona.age} • {result.persona.occupation} • {result.persona.region}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {result.choice}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Confiance: {result.confidence}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
    </div>
  );
}

export default Poll;
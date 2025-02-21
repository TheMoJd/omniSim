import React from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Users, BarChart, Clock, RefreshCcw } from "lucide-react";

// Données factices pour les statistiques
const stats = [
  { label: "Simulations effectuées", value: 128, icon: <BarChart className="w-6 h-6 text-indigo-600" /> },
  { label: "Utilisateurs actifs", value: 42, icon: <Users className="w-6 h-6 text-green-600" /> },
  { label: "Temps moyen de simulation", value: "3 min 45 sec", icon: <Clock className="w-6 h-6 text-yellow-600" /> },
];

// Données pour le graphique
const data = [
  { name: "Lundi", simulations: 24 },
  { name: "Mardi", simulations: 30 },
  { name: "Mercredi", simulations: 18 },
  { name: "Jeudi", simulations: 27 },
  { name: "Vendredi", simulations: 35 },
  { name: "Samedi", simulations: 20 },
  { name: "Dimanche", simulations: 15 },
];

// Données des dernières simulations
const simulations = [
  { id: 1, topic: "Transition écologique en France", status: "Complété", time: "Il y a 2h" },
  { id: 2, topic: "Impact de l'IA sur l'emploi", status: "En cours", time: "Il y a 30min" },
  { id: 3, topic: "Préférences des consommateurs 2024", status: "Annulé", time: "Il y a 1 jour" },
];

export default function Dashboard() {
  return (
    <div className="flex items-center py-28 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Titre et sous-titre */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Gérez vos simulations d'opinion publique.</p>
        </motion.div>

        {/* Cartes de Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{stat.label}</h3>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stat.value}</p>
              </div>
              {stat.icon}
            </motion.div>
          ))}
        </div>

        {/* Graphique */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-10"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Activité des Simulations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="simulations" stroke="#4F46E5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Liste des dernières simulations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-10"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Dernières simulations</h3>
          <div className="divide-y divide-gray-300 dark:divide-gray-700">
            {simulations.map((sim) => (
              <div key={sim.id} className="flex justify-between items-center py-3">
                <div>
                  <h4 className="text-gray-800 dark:text-white font-semibold">{sim.topic}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{sim.time}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    sim.status === "Complété"
                      ? "bg-green-100 text-green-600"
                      : sim.status === "En cours"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {sim.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bouton d'actualisation */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 px-6 py-3 flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-md transition-colors"
        >
          <RefreshCcw className="w-5 h-5" />
          <span>Actualiser les données</span>
        </motion.button>
      </div>
    </div>
  );
}

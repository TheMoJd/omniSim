import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Star, Briefcase } from "lucide-react";

const Subscription = () => {
  const plans = [
    {
      name: "Basique",
      description: "Accès limité aux simulations et fonctionnalités de base.",
      price: "10€",
      duration: "/mois",
      icon: <CheckCircle className="w-8 h-8 text-indigo-600" />,
      buttonLabel: "Choisir",
      delay: 0.2,
    },
    {
      name: "Pro",
      description: "Accès complet aux simulations et fonctionnalités avancées.",
      price: "100€",
      duration: "/mois",
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      buttonLabel: "Choisir",
      popular: true,
      delay: 0.4,
    },
    {
      name: "Entreprise",
      description: "Solutions sur mesure et intégration complète pour votre entreprise.",
      price: "Sur devis",
      icon: <Briefcase className="w-8 h-8 text-indigo-600" />,
      buttonLabel: "Contactez-nous",
      delay: 0.6,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6">
        {/* Titre de la page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
            Choisissez votre plan
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Des solutions adaptées à vos besoins, sans engagement.
          </p>
        </motion.div>

        {/* Cartes des abonnements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: plan.delay }}
              whileHover={{ scale: 1.05 }}
              className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 gap-y-2 flex flex-col items-center text-center transition-transform ${
                plan.popular ? "border-2 border-indigo-600 shadow-xl" : ""
              }`}
            >
              {/* Badge pour le plan Pro */}
              {plan.popular && (
                <span className="absolute top-0 right-0 bg-yellow-500 text-white text-xs uppercase px-3 py-1 rounded-bl-lg">
                  Populaire
                </span>
              )}

              {/* Icône */}
              <div className="mb-4">{plan.icon}</div>

              {/* Nom du plan */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {plan.name}
              </h3>

              {/* Description */}
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {plan.description}
              </p>

              {/* Prix */}
              <div className="mt-6 text-center">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {plan.price}
                </span>
                {plan.duration && (
                  <span className="text-gray-600 dark:text-gray-300">
                    {plan.duration}
                  </span>
                )}
              </div>

              {/* Bouton d'action */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-full shadow-md transition-colors"
              >
                {plan.buttonLabel}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;

import React from 'react';
import { Persona } from '../types/Persona';

type PersonaListProps = {
  personas: Persona[];
  onConfirm: () => void;
  isLoading: boolean;
};

const PersonaList: React.FC<PersonaListProps> = ({ personas, onConfirm, isLoading }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
      Personae générés
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      {personas.map((persona, index) => (
        <div key={index} className="p-4 border rounded-lg dark:border-gray-700">
          <h3 className="text-lg font-semibold">{persona.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Âge :</strong> {persona.age}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Genre :</strong> {persona.gender}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Localisation :</strong> {persona.location}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Éducation :</strong> {persona.education}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Statut marital :</strong> {persona.maritalStatus}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Profession :</strong> {persona.occupation}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Revenu :</strong> {persona.incomeLevel}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Origine :</strong> {persona.ethnicGroup}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Religion :</strong> {persona.religion}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Description :</strong> {persona.description}</p>
        </div>
      ))}
    </div>
    <button
      onClick={onConfirm}
      disabled={isLoading}
      className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg disabled:opacity-50"
    >
      {isLoading ? 'Simulation en cours...' : 'Confirmer et Simuler'}
    </button>
  </div>
);

export default PersonaList;

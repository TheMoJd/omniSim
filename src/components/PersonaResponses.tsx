import React from 'react';
import { Persona } from '../types/Persona';
import { Opinion } from '../types/Opinion';
import ChatBox from './Chatbox';

interface PersonaResponsesProps {
  personas: Persona[];
  opinions: Opinion[];
}

const PersonaResponses: React.FC<PersonaResponsesProps> = ({ personas, opinions }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {personas.map((persona) => {
        const opinionData = opinions.find((op) => op.nameOfPersona === persona.name);
        return (
          <div key={persona.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{persona.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{opinionData?.opinion || 'Pas d’opinion disponible'}</p>
            <ChatBox personaId={persona.id} personaName={persona.name} />
          </div>
        );
      })}
    </div>
  );
};

export default PersonaResponses;
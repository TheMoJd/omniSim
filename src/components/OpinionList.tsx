import React from 'react';
import { Opinion } from '../types/Opinion';

type OpinionListProps = {
  opinions: Opinion[];
};

const OpinionList: React.FC<OpinionListProps> = ({ opinions }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-8">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
      Résultats de la simulation
    </h2>
    {opinions.map((opinion, index) => (
      <div key={index} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg mb-2">
        <h3 className="text-lg font-semibold">{opinion.nameOfPersona}</h3>
        <p>{opinion.opinion}</p>
      </div>
    ))}
  </div>
);

export default OpinionList;

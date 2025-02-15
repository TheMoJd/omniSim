import { useState } from "react";

export default function Simulation() {
  const [topic, setTopic] = useState("");

  const handleSimulation = () => {
    if (!topic) return;
    alert(`Simulation lancée pour : ${topic}`);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Créer une Simulation</h2>
      <div className="space-y-4">
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
          Sujet à analyser
        </label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Ex: L'impact des véhicules électriques"
        />
        <button
          onClick={handleSimulation}
          className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Lancer la Simulation
        </button>
      </div>
    </div>
  );
}

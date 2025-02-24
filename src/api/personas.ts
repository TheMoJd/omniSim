const API_URL = 'http://localhost:5000/api';

// 🔹 Générer des personas en fonction du sujet
export const fetchPersonas = async (topic: string) => {
  const response = await fetch(`${API_URL}/generate-personas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic }),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la génération des personas');
  }

  return response.json();
};

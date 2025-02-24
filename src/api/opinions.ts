const API_URL = 'http://localhost:5000/api';

//  Confirmer les personas et générer des simulations
export const fetchSimulatedOpinions = async (topic: string, personas: any[]) => {
    const response = await fetch(`${API_URL}/update-personas-and-simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, personas }),
    });
  
    if (!response.ok) {
      throw new Error('Erreur lors de la simulation des opinions');
    }
  
    return response.json();
  };
  
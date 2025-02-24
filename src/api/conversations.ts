const API_URL = 'http://localhost:5000/api';

// Envoyer un message à un persona et récupérer la réponse
export const sendMessageToPersona = async (personaId: string, personaName: string, userMessage: string) => {
    const response = await fetch(`${API_URL}/persona-chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ personaId, personaName, userMessage }),
    });
  
    if (!response.ok) {
      throw new Error('Erreur lors de l’envoi du message.');
    }
  
    return response.json();
  };
  
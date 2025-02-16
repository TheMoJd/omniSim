import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialisation de l'API OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Assurez-vous que cette clé est définie dans votre fichier .env
});

// Route pour la simulation
app.post('/api/simulate', async (req, res) => {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ error: 'Le paramètre "topic" est requis.' });
    }
    try {
        const personas = {
          persona1: {
            name: 'Alice',
            age: 35,
            gender: 'Femme',
            location: 'Californie',
            education: 'Master en éducation',
            maritalStatus: 'Mariée',
            occupation: 'Enseignante',
            incomeLevel: 6,
          },
          persona2: {
            name: 'John',
            age: 45,
            gender: 'Homme',
            location: 'Texas',
            education: 'Licence',
            maritalStatus: 'Célibataire',
            occupation: 'Ingénieur logiciel',
            incomeLevel: 8,
          },
          persona3: {
            name: 'Alex',
            age: 28,
            gender: 'Non-binaire',
            location: 'New York',
            education: 'Doctorat en sociologie',
            maritalStatus: 'Vivant en couple',
            occupation: 'Chercheur',
            incomeLevel: 7,
          }
        };

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
              {
            role: 'system',
            content: 'Vous êtes un simulateur de réponses pour trois personas différents.',
              },
              {
            role: 'user',
            content: `
            Ne fournissez aucun autre texte à part la réponse des persona sur le ${topic}. Exemple : Marie Duboit : Son avis...  
            Voilà les personnages
              ${personas.persona1.name}: 
              - Âge : ${personas.persona1.age} ans, ${personas.persona1.gender}, ${personas.persona1.location}, ${personas.persona1.education}, ${personas.persona1.maritalStatus}, ${personas.persona1.occupation}, Revenu niveau ${personas.persona1.incomeLevel}.
              
              ${personas.persona2.name}: 
              - Âge : ${personas.persona2.age} ans, ${personas.persona2.gender}, ${personas.persona2.location}, ${personas.persona2.education}, ${personas.persona2.maritalStatus}, ${personas.persona2.occupation}, Revenu niveau ${personas.persona2.incomeLevel}.
              
              ${personas.persona3.name}: 
              - Âge : ${personas.persona3.age} ans, ${personas.persona3.gender}, ${personas.persona3.location}, ${personas.persona3.education}, ${personas.persona3.maritalStatus}, ${personas.persona3.occupation}, Revenu niveau ${personas.persona3.incomeLevel}.
            `,
              },
            ],
            max_tokens: 450, // Augmentez le nombre de tokens pour gérer plusieurs réponses
            temperature: 0.7,
          });
  
      // Extraction correcte du contenu
      const result = response.choices[0]?.message?.content?.trim();
      console.log('Réponse OpenAI:', result);
  
      // Envoi de la réponse au frontend
      res.json({ result, prompt: topic });
    } catch (error) {
      console.error('Erreur OpenAI:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Erreur lors de la simulation.' });
    }
  });

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
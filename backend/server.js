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
                  Persona 1 : 
                  - Âge : 35 ans, Femme, Californie, Master en éducation, Mariée, Enseignante, Revenu niveau 6.
                  - Question : Analysez l'opinion publique sur [SUJET].
          
                  Persona 2 :
                  - Âge : 45 ans, Homme, Texas, Licence, Célibataire, Ingénieur logiciel, Revenu niveau 8.
                  - Question : Analysez l'opinion publique sur [SUJET].
          
                  Persona 3 :
                  - Âge : 28 ans, Non-binaire, New York, Doctorat en sociologie, Vivant en couple, Chercheur, Revenu niveau 7.
                  - Question : Analysez l'opinion publique sur [SUJET].
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
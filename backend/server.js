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
            role: 'user',
            content: `Analyse l'opinion publique sur le sujet suivant : ${topic}`,
          },
        ],
        max_tokens: 150,
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
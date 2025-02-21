import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import z from 'zod';
import helmet from 'helmet';
import sanitize from 'sanitize-html';
import rateLimit from 'express-rate-limit';
import NodeCache from 'node-cache';
import winston from 'winston';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
const limiter = rateLimit({ windowMs: 60 * 1000, max: 10 });
app.use(limiter);

// Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'error.log', level: 'error' })],
});

// Cache
const cache = new NodeCache({ stdTTL: 3600 });

// Validation
const simulationSchema = z.object({
  topic: z.string().min(1, "Le sujet ne peut pas être vide."),
});

// Initialisation OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Route pour la simulation
app.post('/api/simulate', async (req, res) => {
  const { topic } = req.body;

  try {

    // Validation et sanitisation
    const validatedData = simulationSchema.parse({ topic });
    const sanitizedTopic = sanitize(validatedData.topic, { allowedTags: [], allowedAttributes: {} });

    // Vérification du cache
    const cachedResult = cache.get(sanitizedTopic);
    if (cachedResult) {
      return res.json(cachedResult);
    }

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

    // Appel à OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Vous êtes un simulateur de réponses pour trois personas différents.' },
        {
          role: 'user',
          content: `
          Ne fournissez aucun autre texte à part la réponse des persona sur le ${validatedData.topic}. Exemple : Marie Duboit : Son avis...  
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
      max_tokens: 450,
      temperature: 0.7,
    });

    const result = response.choices[0]?.message?.content?.trim();
    cache.set(sanitizedTopic, { result, prompt: sanitizedTopic });
    res.json({ result, prompt: sanitizedTopic });
  } catch (error) {
    logger.error('Erreur lors de la simulation:', error);
    res.status(500).json({ error: "Une erreur interne est survenue." });
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
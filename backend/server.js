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

// Route pour générer des personas dynamiques
app.post('/api/generate-personas', async (req, res) => {
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

    // Appel à OpenAI pour générer des personas
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Vous êtes un assistant spécialisé dans la génération de personas pour simuler leurs avis sur des sujets spécifiques.',
        },
        {
          role: 'user',
          content: `
            Générez 3 personas (au format JSON **sans** utiliser de backticks ou de bloc de code) de profil complétement différents pour que par la suite je  simule leur avis  sujet suivant : "${sanitizedTopic}".  
            Ils doivent pas forcément être proche du milieu du sujet. 1 personne proche du milieur, 1 autre moins proche, et 1 dernière complétement éxterieure au sujet :

            Chaque persona doit inclure : 
            - Nom 
            - Âge 
            - Sexe 
            - Localisation 
            - Éducation 
            - Statut marital 
            - Profession 
            - Revenu (niveau 1 à 10)  : The income level variable has 22 categories, ranging from “under $9,999” to “$250,000 or more” with intervals of approximately $5,000 to $25,000.
            - Origine 
            - Religion 
            - Description du persona


             
            Format attendu : JSON avec un tableau de 3 objets représentant les personas.

            Voilà l'objet dans lequelle je vais stocker les données
                
            export type Persona = {
                name: string;
                age: number;
                gender: string;
                location: string;
                education: string;
                maritalStatus: string;
                occupation: string;
                incomeLevel: number;
                ethnicGroup: string;
                religion: string;
                description: string; 
              };
          `,
        },
      ],
      temperature: 0.7,
    });

      // Extraction du contenu brut
    let result = response.choices[0]?.message?.content?.trim() || '';
    const personas = JSON.parse(result);
    console.log(personas);

    // Stockage dans le cache
    cache.set(sanitizedTopic, { personas, prompt: sanitizedTopic });
    res.json({ personas, prompt: sanitizedTopic });
  } catch (error) {
    logger.error('Erreur lors de la génération des personas:', error);
    res.status(500).json({ error: "Une erreur interne est survenue." });
  }
});

// Route pour ajuster/confirmer les personas
app.post('/api/confirm-personas', async (req, res) => {
  const { topic, personas } = req.body;

  try {
    // Validation et sanitisation
    const validatedData = z.object({
      topic: z.string().min(1, "Le sujet ne peut pas être vide."),
      personas: z.array(
        z.object({
          name: z.string(),
          age: z.number(),
          gender: z.string(),
          location: z.string(),
          education: z.string(),
          maritalStatus: z.string(),
          occupation: z.string(),
          incomeLevel: z.number(),
          description: z.string(),
        })
      ),
    }).parse(req.body);

    const sanitizedTopic = sanitize(validatedData.topic, { allowedTags: [], allowedAttributes: {} });

    // Stockage des personas confirmés dans le cache
    cache.set(`${sanitizedTopic}-confirmed`, { personas, prompt: sanitizedTopic });
    res.json({ message: "Personas confirmés avec succès.", personas });
  } catch (error) {
    logger.error('Erreur lors de la confirmation des personas:', error);
    res.status(500).json({ error: "Une erreur interne est survenue." });
  }
});



// Route pour la simulation
app.post('/api/simulate', async (req, res) => {
  const { topic, personas } = req.body;
  console.log("ON est dans simulate :");
  try {
    // Validation et sanitisation
    const validatedData = simulationSchema.parse({ topic });
    const sanitizedTopic = sanitize(validatedData.topic, { allowedTags: [], allowedAttributes: {} });

    // Vérification du cache
    const cachedResult = cache.get(sanitizedTopic);
    if (cachedResult) {
      return res.json(cachedResult);
    }

    // Appel à OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
      { role: 'system', content: 'Vous êtes un simulateur de réponses pour trois personas différents.' },
      {
        role: 'user',
        content: `
        Vous avez 3 personas : 
        - ${personas[0].name}, ${personas[0].age} ans, ${personas[0].gender}, ${personas[0].location}, ${personas[0].education}, ${personas[0].maritalStatus}, ${personas[0].occupation}, ${personas[0].incomeLevel}, ${personas[0].ethnicGroup}, ${personas[0].religion}, ${personas[0].description}
        - ${personas[1].name}, ${personas[1].age} ans, ${personas[1].gender}, ${personas[1].location}, ${personas[1].education}, ${personas[1].maritalStatus}, ${personas[1].occupation}, ${personas[1].incomeLevel}, ${personas[1].ethnicGroup}, ${personas[1].religion}, ${personas[1].description}
        - ${personas[2].name}, ${personas[2].age} ans, ${personas[2].gender}, ${personas[2].location}, ${personas[2].education}, ${personas[2].maritalStatus}, ${personas[2].occupation}, ${personas[2].incomeLevel}, ${personas[2].ethnicGroup}, ${personas[2].religion}, ${personas[2].description}
        Fournissez l'avis des personas suivantes sur le sujet suivant : "${validatedData.topic}":
        Réponds uniquement avec un JSON valide, sans texte additionnel.
        Format de réponse attendu (strict) :
        J'attends un tableau d' "Opinion". Voilà l'objet Opinion : 
        export type Opinion = {
          nameOfPersona: string;
          opinion: string;
        };
        `,
      },
      ],
      temperature: 0.7,
    });
    let result = response.choices[0]?.message?.content?.trim();


    // Nettoyage pour retirer d'éventuels blocs de code
    result = result.replace(/```json/gi, '').replace(/```/g, '').trim();
    console.log(result);

    const parsedOpinions = JSON.parse(result);  
    cache.set(sanitizedTopic, { parsedOpinions });
    console.log(parsedOpinions);
    res.json({ parsedOpinions });
  } catch (error) {
    logger.error('Erreur lors de la simulation:', error);
    res.status(500).json({ error: "Une erreur interne est survenue." });
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

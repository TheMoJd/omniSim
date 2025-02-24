import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import z from 'zod';
import helmet from 'helmet';
import sanitize from 'sanitize-html';
import rateLimit from 'express-rate-limit';
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
            - Revenu (niveau 1 à 10)  : The income level variable has 22 categories, ranging from “under $9,999” to “$250,000 or more” with intervals de approximately $5,000 to $25,000.
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

    res.json({ message: "Personas confirmés avec succès.", personas });
  } catch (error) {
    logger.error('Erreur lors de la confirmation des personas:', error);
    res.status(500).json({ error: "Une erreur interne est survenue." });
  }
});


app.post('/api/update-personas-and-simulate', async (req, res) => {
  console.log("ON est dans update-personas-and-simulate");

  try {
    // 🔹 Validation et sanitisation des données reçues
    const validatedData = z.object({
      topic: z.string().min(1, "Le sujet ne peut pas être vide."),
      personas: z.array(
        z.object({
          name: z.string().min(1),
          age: z.number().min(0).max(120), // Ajout d'une limite d'âge raisonnable
          gender: z.string().min(1),
          location: z.string().min(1),
          education: z.string().min(1),
          maritalStatus: z.string().min(1),
          occupation: z.string().min(1),
          incomeLevel: z.number().min(1).max(10), // Niveau de revenu entre 1 et 10
          ethnicGroup: z.string().min(1), // Ajout manquant
          religion: z.string().min(1), // Ajout manquant
          description: z.string().min(1),
        })
      ),
    }).parse(req.body);

    // 🔹 Nettoyage du sujet et des personas
    const sanitizedTopic = sanitize(validatedData.topic, { allowedTags: [], allowedAttributes: {} });

    const sanitizedPersonas = validatedData.personas.map(persona => ({
      name: sanitize(persona.name, { allowedTags: [], allowedAttributes: {} }),
      age: persona.age, // Pas besoin de sanitizer un nombre
      gender: sanitize(persona.gender, { allowedTags: [], allowedAttributes: {} }),
      location: sanitize(persona.location, { allowedTags: [], allowedAttributes: {} }),
      education: sanitize(persona.education, { allowedTags: [], allowedAttributes: {} }),
      maritalStatus: sanitize(persona.maritalStatus, { allowedTags: [], allowedAttributes: {} }),
      occupation: sanitize(persona.occupation, { allowedTags: [], allowedAttributes: {} }),
      incomeLevel: persona.incomeLevel, // Pas besoin de sanitizer un nombre
      ethnicGroup: sanitize(persona.ethnicGroup, { allowedTags: [], allowedAttributes: {} }),
      religion: sanitize(persona.religion, { allowedTags: [], allowedAttributes: {} }),
      description: sanitize(persona.description, { allowedTags: [], allowedAttributes: {} }),
    }));

    // 🔹 Appel à OpenAI pour générer les opinions
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Vous êtes un simulateur de réponses pour trois personas différents.' },
        {
          role: 'user',
          content: `
          Vous avez 3 personas :
          - ${sanitizedPersonas[0].name}, ${sanitizedPersonas[0].age} ans, ${sanitizedPersonas[0].gender}, ${sanitizedPersonas[0].location}, ${sanitizedPersonas[0].education}, ${sanitizedPersonas[0].maritalStatus}, ${sanitizedPersonas[0].occupation}, ${sanitizedPersonas[0].incomeLevel}, ${sanitizedPersonas[0].ethnicGroup}, ${sanitizedPersonas[0].religion}, ${sanitizedPersonas[0].description}
          - ${sanitizedPersonas[1].name}, ${sanitizedPersonas[1].age} ans, ${sanitizedPersonas[1].gender}, ${sanitizedPersonas[1].location}, ${sanitizedPersonas[1].education}, ${sanitizedPersonas[1].maritalStatus}, ${sanitizedPersonas[1].occupation}, ${sanitizedPersonas[1].incomeLevel}, ${sanitizedPersonas[1].ethnicGroup}, ${sanitizedPersonas[1].religion}, ${sanitizedPersonas[1].description}
          - ${sanitizedPersonas[2].name}, ${sanitizedPersonas[2].age} ans, ${sanitizedPersonas[2].gender}, ${sanitizedPersonas[2].location}, ${sanitizedPersonas[2].education}, ${sanitizedPersonas[2].maritalStatus}, ${sanitizedPersonas[2].occupation}, ${sanitizedPersonas[2].incomeLevel}, ${sanitizedPersonas[2].ethnicGroup}, ${sanitizedPersonas[2].religion}, ${sanitizedPersonas[2].description}
          
          Fournissez l'avis de ces personas sur le sujet : "${sanitizedTopic}".

          ⚠ Réponds uniquement avec un JSON valide, sans texte additionnel.  
          J'attends un tableau d'"Opinion". Voilà l'objet Opinion : 
          export type Opinion = {
            nameOfPersona: string;
            opinion: string;
          };
          `
        }
      ],
      temperature: 0.7,
    });

    let result = response.choices[0]?.message?.content?.trim();
    console.log("Réponse brute OpenAI :", result);

    // 🔹 Nettoyage pour retirer d'éventuels blocs de code ```json
    result = result.replace(/```json/gi, '').replace(/```/g, '').trim();

    const parsedOpinions = JSON.parse(result);
    console.log("Opinions simulées :", parsedOpinions);

    // 🔹 Réponse uniquement avec les opinions
    res.json({ opinions: parsedOpinions });

  } catch (error) {
    logger.error('Erreur lors de la mise à jour et de la simulation:', error);
    res.status(500).json({ error: "Une erreur interne est survenue." });
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
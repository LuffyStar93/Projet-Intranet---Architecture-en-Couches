/**
 * Point d'entrée de l'application
 * Initialise le serveur Express et les différentes couches
 */
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectToDatabase } from './infrastructure/database/index.js';
import { setupRoutes } from "./presentation/routes/index.js";

// Chargement des variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

// Middlewares de base
app.use(cors()); // url du front à mettre
app.use(express.json());

// TODO: Configurer la base de données
const startServer = async () => {
  const db = await connectToDatabase();

  try {

  } catch (error) {
    console.log("erreur " + error)
  }
};

// Configuration des routes
setupRoutes(app);

// Route de base pour vérifier que l'API est en ligne
// app.get('/api', (req, res) => {
//   res.json({ message: 'API Intranet - Bienvenue!' });
// });

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

startServer();

export default app;
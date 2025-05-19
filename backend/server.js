/**
 * Point d'entrée de l'application
 * Initialise le serveur Express et les différentes couches
 */
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

// Chargement des variables d'environnement
dotenv.config();


const app = express();
const PORT = process.env.PORT || 9000;

// Middlewares de base
app.use(cors());
app.use(express.json());

// TODO: Configurer la base de données
// TODO: Configurer les routes

// Route de base pour vérifier que l'API est en ligne
app.get('/api', (req, res) => {
  res.json({ message: 'API Intranet - Bienvenue!' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

export default app;
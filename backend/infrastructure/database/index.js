/**
 * Configuration de la base de données
 * 
 * TODO: Implémentez la connexion à la base de données
 */
import mongoose from 'mongoose';

/**
 * Connecte l'application à la base de données MongoDB
 */
export const setupDatabase = async () => {
  try {
    // TODO: Connectez-vous à MongoDB
    // await mongoose.connect(process.env.MONGO_URI);
    console.log('TODO: Se connecter à la base de données MongoDB');
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    process.exit(1); // Quitte l'application en cas d'échec
  }
}; 
import { AuthService } from '../../infrastructure/auth/authService.js';
import CollaboratorRepository from '../../infrastructure/repositories/CollaboratorRepository.js';

// Instance du service d'authentification
let authService = null;
let collaboratorRepository = null;

/**
 * Vérifie si l'utilisateur est authentifié
 */
export const isAuthenticated = async (req, res, next) => {
  try {
    // Récupération du token depuis les headers
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentification requise' });
    }

    // Extraction du token
    const token = authHeader.split(' ')[1];

    // Vérification du token
    const decoded = authService.verifyToken(token);

    // Récupération de l'utilisateur complet à partir de son ID
    const user = await collaboratorRepository.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    // Ajout de l'utilisateur à la requête
    req.user = user;

    next();
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    return res.status(401).json({ message: 'Token invalide' });
  }
};

/**
 * Vérifie si l'utilisateur est administrateur
 * Ce middleware doit être utilisé APRÈS isAuthenticated
 */
export const isAdmin = (req, res, next) => {
  // L'utilisateur est déjà disponible grâce au middleware isAuthenticated
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Accès refusé - Droits administrateur requis' });
  }
  next();
};

/**
 * Configure le service d'authentification
 */
export const setupAuthMiddleware = (service) => {
  authService = service;
  collaboratorRepository = new CollaboratorRepository();
};
/**
 * Routes des collaborateurs - Couche Présentation
 * Définit les endpoints API pour les collaborateurs
 * 
 * TODO: Implémentez les routes manquantes
 */
import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Injection des dépendances via le conteneur DI
export default (collaboratorController) => {
  /**
   * @route GET /api/collaborators
   * @desc Récupère tous les collaborateurs
   * @access Privé
   */
  router.get('/', isAuthenticated, (req, res) => {
    collaboratorController.getAllCollaborators(req, res);
  });

  /**
   * @route GET /api/collaborators/random
   * @desc Récupère un collaborateur aléatoire
   * @access Privé
   */
  router.get('/random', isAuthenticated, (req, res) => {
    collaboratorController.getRandomCollaborator(req, res);
  });

  // TODO: Implémentez les autres routes
  // - GET /api/collaborators/:id (getCollaboratorById)
  // - POST /api/collaborators (createCollaborator)
  // - PUT /api/collaborators/:id (updateCollaborator)
  // - DELETE /api/collaborators/:id (deleteCollaborator)
  // - GET /api/collaborators/filter (filterCollaborators)

  return router;
}; 
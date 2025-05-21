/**
 * Routes des collaborateurs - Couche Présentation
 * Définit les endpoints API pour les collaborateurs
 * 
 * TODO: Implémentez les routes manquantes
 */
import express from 'express';
import { isAuthenticated, isAdmin } from '../middlewares/authMiddleware.js';

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

  router.post('/', isAuthenticated, isAdmin, (req, res) => {
    collaboratorController.createCollaborator(req, res);
  });

  /**
   * @route GET /api/collaborators/random
   * @desc Récupère un collaborateur aléatoire
   * @access Privé
   */
  router.get('/random', isAuthenticated, (req, res) => {
    collaboratorController.getRandomCollaborator(req, res);
  });

  /**
   * @route GET /api/collaborators/filter
   * @desc Récupère les collaborateurs par catégorie
   * @access Privé
   */
    router.get('/filter', isAuthenticated, (req, res) => {
      collaboratorController.filterCollaborators(req, res);
  });
  

  /**
   * @route GET /api/collaborators/:id
   * @desc Récupère un collaborateur par son ID
   * @access Privé
   */
  router.get('/:id', isAuthenticated, (req, res) => {
    collaboratorController.getCollaboratorById(req, res);
  });

  router.put('/:id', isAuthenticated, isAdmin, (req, res) => {
    collaboratorController.updateCollaborator(req, res);
  });

  router.delete('/:id', isAuthenticated, isAdmin, (req, res) => {
    collaboratorController.deleteCollaborator(req, res);
  });



  return router;
}; 
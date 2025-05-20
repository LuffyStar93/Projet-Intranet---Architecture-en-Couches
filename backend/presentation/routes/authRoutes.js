import express from 'express';
import { isAuthenticated, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

export default (authController) => {
  /**
   * @route POST /api/auth/login
   * @desc Authentifie un utilisateur
   * @access Public
   */
  router.post('/login', (req, res) => {
    authController.login(req, res);
  });

  /**
   * @route GET /api/auth/me
   * @desc Récupère les informations de l'utilisateur connecté
   * @access Privé
   */
  router.get('/me', isAuthenticated, (req, res) => {
    authController.getCurrentUser(req, res);
  });

  return router;
};
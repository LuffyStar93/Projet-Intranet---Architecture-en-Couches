import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';


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

  router.patch('/me', isAuthenticated, (req, res) => {
    authController.editCurrentUser(req, res);
  });

    /**
   * @route POST /api/auth/verify
   * @desc Verifie le jwt token
   * @access Privé
   */
    router.post('/verify', (req, res) => {
      authController.verifyToken(req, res);
    });

  return router;
};
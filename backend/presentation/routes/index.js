import collaboratorRoutesFactory from './collaboratorRoutes.js';
import authRoutesFactory from './authRoutes.js';
import AuthController from '../../infrastructure/auth/authController.js'
import { AuthService } from '../../infrastructure/auth/authService.js';
import { setupAuthMiddleware } from '../middlewares/authMiddleware.js';
import CollaboratorRepository from "../../infrastructure/repositories/CollaboratorRepository.js"
import CollaboratorController from '../controllers/CollaboratorController.js';

export const setupRoutes = (app) => {
  // Configuration des services et contrôleurs
  // Dans un projet réel, utilisez un conteneur d'injection de dépendances

  // Services
  const collaboratorRepository = new CollaboratorRepository(); // À remplacer par l'implémentation réelle
  const authService = new AuthService(collaboratorRepository);

  // Configuration du middleware d'authentification
  setupAuthMiddleware(authService);

  // Contrôleurs
  const authController = new AuthController(authService);
  const collaboratorController = new CollaboratorController(); // À remplacer par l'implémentation réelle

  // Routes
  app.use('/api/auth', authRoutesFactory(authController));
  app.use('/api/collaborators', collaboratorRoutesFactory(collaboratorController));

  // Route de base
  app.get('/api', (req, res) => {
    res.json({ message: 'API Intranet - Bienvenue!' });
  });
};
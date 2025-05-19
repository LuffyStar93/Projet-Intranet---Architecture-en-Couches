/**
 * Configuration des routes de l'application
 * 
 * TODO: Implémentez la configuration des routes
 */
import collaboratorRoutesFactory from './collaboratorRoutes.js';
// TODO: Importez les autres routes (auth, etc.)

/**
 * Configure les routes de l'application
 * @param {Express} app - Application Express
 */
export const setupRoutes = (app) => {
  // TODO: Configurez les contrôleurs et les routes
  
  // Exemple de configuration des routes
  // const collaboratorController = new CollaboratorController(collaboratorService);
  // app.use('/api/collaborators', collaboratorRoutesFactory(collaboratorController));

  // Route de base pour vérifier que l'API est en ligne
  app.get('/api', (req, res) => {
    res.json({ message: 'API Intranet - Bienvenue!' });
  });
}; 
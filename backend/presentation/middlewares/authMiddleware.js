/**
 * Middleware d'authentification
 * 
 * TODO: Implémentez la vérification du JWT et la récupération de l'utilisateur
 */

/**
 * Vérifie si l'utilisateur est authentifié
 * @param {Request} req - Requête Express
 * @param {Response} res - Réponse Express
 * @param {Function} next - Fonction next d'Express
 */
export const isAuthenticated = (req, res, next) => {
  // TODO: Implémentez la vérification du token JWT
  // 1. Récupérer le token depuis les headers
  // 2. Vérifier et décoder le token
  // 3. Récupérer l'utilisateur correspondant
  // 4. Ajouter l'utilisateur à la requête
  // 5. Si tout est OK, appeler next()
  
  res.status(401).json({ message: 'Non authentifié' });
};

/**
 * Vérifie si l'utilisateur est administrateur
 * @param {Request} req - Requête Express
 * @param {Response} res - Réponse Express
 * @param {Function} next - Fonction next d'Express
 */
export const isAdmin = (req, res, next) => {
  // TODO: Vérifier si l'utilisateur est administrateur
  // Cette fonction doit être utilisée après isAuthenticated
  
  res.status(403).json({ message: 'Accès refusé' });
}; 
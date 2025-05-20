/**
 * Contrôleur d'authentification
 */
class AuthController {
    constructor(authService) {
      this.authService = authService;
    }
  
    /**
     * Authentifie un utilisateur
     */
    async login(req, res) {
      try {
        const { email, password } = req.body;
  
        // Validation des données
        if (!email || !password) {
          return res.status(400).json({ message: 'Email et mot de passe requis' });
        }
  
        // Appel au service d'authentification
        const result = await this.authService.login(email, password);
        console.log(result);
  
        res.status(200).json(result);
      } catch (error) {
        // Pour la sécurité, ne pas révéler la nature de l'erreur
        res.status(401).json({ message: 'Identifiants invalides'});
      }
    }
  
    /**
     * Récupère les informations de l'utilisateur connecté
     */
    async getCurrentUser(req, res) {
      try {
        // L'utilisateur est déjà disponible grâce au middleware
        const user = req.user;
  
        // Ne pas renvoyer le mot de passe
        const { password, ...userWithoutPassword } = user;
  
        res.status(200).json(userWithoutPassword);
      } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
      }
    }
  }
  
  export default AuthController;
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import CollaboratorService from "../../application/services/CollaboratorService.js";
import UpdateCollaboratorDTO from "../../application/dto/UpdateCollaboratorDTO.js";
dotenv.config();
/**
 * Contrôleur d'authentification
 */
class AuthController {
    constructor(authService) {
      this.authService = authService;
      this.collaboratorService = new CollaboratorService();
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

    async editCurrentUser(req, res) {
      try {
        // L'utilisateur est déjà disponible grâce au middleware
        const user = req.user;
        const id = user.id;
  
        const updateDTO = new UpdateCollaboratorDTO({ id, ...req.body });
        const validation = updateDTO.validate();

        if (!validation.isValid) {
          return res.status(400).json({
            success: false,
            message: validation.errors.join(', ')
          });
        }

        const updatedCollaborator = await this.collaboratorService.update(id, updateDTO);
      res.status(200).json({
        success: true,
        data: { collaborator: updatedCollaborator }
      });
  
      } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
      }
    }


    /**
     * Verifie le jwt token
     */
    async verifyToken(req, res) {
      try {
        const token = req.body.token;
    
        if (!token) {
          return res.status(400).json({ valid: false, error: 'Token manquant' });
        }
    
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
    
        console.log('Token valide');
        console.log('Données du token :', decoded);
    
        return res.status(200).json({
          valid: true,
          user: {
            id: decoded.id,
            email: decoded.email,
            isAdmin: decoded.isAdmin,
          },
        });
      } catch (err) {
        console.error('Token invalide ou expiré :', err.message);
        return res.status(401).json({
          valid: false,
          error: err.name === 'TokenExpiredError' ? 'Token expiré' : 'Token invalide',
        });
      }
    }
    
  }
  
  export default AuthController;
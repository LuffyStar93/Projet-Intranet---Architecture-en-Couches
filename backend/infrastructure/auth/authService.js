import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class AuthService {
    constructor(collaboratorRepository) {
        this.collaboratorRepository = collaboratorRepository;
    }
    /**
     * Génère un token JWT pour un user
     * @param {Object} user - user authentifié
     * @returns {string} Token JWT
     */
    generateToken(user) {
        const payload = {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin
        };
    
        return jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN }
        );
      }
    
    /**
     * Vérifie un token JWT
     * @param {string} token - Token JWT à vérifier
     * @returns {Object} Payload décodé
     */
      verifyToken(token) {
        try {
          return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
          throw new Error('Token invalide');
        }
      }

    /**
     * Se connecter avec son email et mdp
     * @param {string} email - email du user
     * @param {string} password - mot de passe du user
     * @returns {Promise<Object>} user trouvé ou null
     */
    async login(email, password) {
        const user = await this.collaboratorRepository.findByEmail(email);
        
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            throw new Error('Mot de passe incorrect');
        }

        const token = this.generateToken(user);

        return { 
            user: {
                id: user.id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                isAdmin: user.isAdmin
            },
            token
        };
    }
    
      async hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
      }
}
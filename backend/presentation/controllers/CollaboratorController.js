import CollaboratorService from "../../application/services/CollaboratorService.js";

/**
 * CollaboratorController - Couche Présentation
 * Gère les requêtes HTTP relatives aux collaborateurs
 * 
 * TODO: Implémentez les méthodes du contrôleur
 */
class CollaboratorController {
  /**
   * Constructeur du contrôleur
   */
  constructor() {
    this.collaboratorService = new CollaboratorService();
  }

  /**
   * Récupère tous les collaborateurs
   * @param {Request} req - Requête Express
   * @param {Response} res - Réponse Express
   */
  async getAllCollaborators(req, res) {
    try {
      const collaborators = await this.collaboratorService.getAll();
      res.status(200).json({ 
        success: true,
        data: { collaborators } 
      });
    } catch (error) {
      console.error('Erreur:', error);
      res.status(500).json({ 
        success: false,
        message: "Erreur lors de la récupération des collaborateurs" 
      });
    }
  }

  /**
   * Récupère un collaborateur aléatoire
   * @param {Request} req - Requête Express
   * @param {Response} res - Réponse Express
   */
  async getRandomCollaborator(req, res) {
    try {
      // TODO: Implémentez cette méthode
      res.status(200).json({ 
        success: true,
        message: 'Méthode à implémenter' 
      });
    } catch (error) {
      console.error('Erreur:', error);
      res.status(500).json({ 
        success: false,
        message: "Erreur lors de la récupération du collaborateur aléatoire" 
      });
    }
  }

  // TODO: Implémentez les autres méthodes du contrôleur
  // - getCollaboratorById(req, res)
  // - createCollaborator(req, res)
  // - updateCollaborator(req, res)
  // - deleteCollaborator(req, res)
  // - filterCollaborators(req, res)
}

export default CollaboratorController; 
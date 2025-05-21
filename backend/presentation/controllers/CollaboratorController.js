import CollaboratorService from "../../application/services/CollaboratorService.js";
import CreateCollaboratorDTO from "../../application/dto/CreateCollaboratorDTO.js";
import UpdateCollaboratorDTO from "../../application/dto/UpdateCollaboratorDTO.js";
import FilterCollaboratorDTO from "../../application/dto/FilterCollaboratorDTO.js";

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
      const collaborator = await this.collaboratorService.getRandom();
      res.status(200).json({ 
        success: true,
        data: { collaborator }
      });
    } catch (error) {
      console.error('Erreur:', error);
      res.status(500).json({ 
        success: false,
        message: "Erreur lors de la récupération du collaborateur aléatoire" 
      });
    }
  }

  /**
   * Récupère un collaborateur par ID
   * @param {Request} req - Requête Express
   * @param {Response} res - Réponse Express
   */
  async getCollaboratorById(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ 
          success: false,
          message: 'ID Requis' 
        });
      }
      const collaborator = await this.collaboratorService.getById(id);
      res.status(200).json({ 
        success: true,
        data: { collaborator }
      });
    } catch (error) {
      console.error('Erreur:', error);
      res.status(500).json({ 
        success: false,
        message: "Erreur lors de la récupération du collaborateur" 
      });
    }
  }

  /**
   * Crée un nouveau collaborateur
   * @param {Request} req - Requête Express
   * @param {Response} res - Réponse Express
   */
  async createCollaborator(req, res) {
    try {
      const createDTO = new CreateCollaboratorDTO(req.body);
      const validation = createDTO.validate();

      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: validation.errors.join(', ')
        });
      }

      const newCollaborator = await this.collaboratorService.create(createDTO);
      res.status(201).json({
        success: true,
        data: { collaborator: newCollaborator }
      });
    } catch (error) {
      console.error('Erreur:', error);
      res.status(500).json({
        success: false,
        message: error.message || "Erreur lors de la création du collaborateur"
      });
    }
  }

  /**
   * Met à jour un collaborateur
   * @param {Request} req - Requête Express
   * @param {Response} res - Réponse Express
   */
  async updateCollaborator(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'ID Requis'
        });
      }

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
      console.error('Erreur:', error);
      res.status(500).json({
        success: false,
        message: error.message || "Erreur lors de la mise à jour du collaborateur"
      });
    }
  }

  /**
   * Supprime un collaborateur
   * @param {Request} req - Requête Express
   * @param {Response} res - Réponse Express
   */
  async deleteCollaborator(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'ID Requis'
        });
      }

      await this.collaboratorService.delete(id);
      res.status(200).json({
        success: true,
        message: "Collaborateur supprimé avec succès"
      });
    } catch (error) {
      console.error('Erreur:', error);
      res.status(500).json({
        success: false,
        message: error.message || "Erreur lors de la suppression du collaborateur"
      });
    }
  }

  /**
   * Filtre les collaborateurs
   * @param {Request} req - Requête Express
   * @param {Response} res - Réponse Express
   */
  async filterCollaborators(req, res) {
    try {
      const filterDTO = new FilterCollaboratorDTO(req.body);
      const validation = filterDTO.validate();

      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          message: validation.errors.join(', ')
        });
      }

      const collaborators = await this.collaboratorService.getByFilters(filterDTO.toQueryParams());
      res.status(200).json({
        success: true,
        data: { collaborators }
      });
    } catch (error) {
      console.error('Erreur:', error);
      res.status(500).json({
        success: false,
        message: error.message || "Erreur lors du filtrage des collaborateurs"
      });
    }
  }

}

export default CollaboratorController; 
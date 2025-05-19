/**
 * Interface CollaboratorRepository - Couche Domaine
 * Définit le contrat pour l'accès aux données des collaborateurs
 * 
 * TODO: Complétez cette interface avec toutes les méthodes nécessaires
 */
class CollaboratorRepository {
  /**
   * Récupère tous les collaborateurs
   * @returns {Promise<Array>} Liste des collaborateurs
   */
  findAll() {
    throw new Error('Method not implemented');
  }

  /**
   * Récupère un collaborateur par son ID
   * @param {string|number} id - ID du collaborateur
   * @returns {Promise<Object>} Collaborateur trouvé ou null
   */
  findById(id) {
    throw new Error('Method not implemented');
  }

  // TODO: Ajoutez les autres méthodes nécessaires
  // - findByEmail(email)
  // - save(collaborator)
  // - update(id, collaborator)
  // - delete(id)
  // - findRandom()
  // - findByFilters(filters)
}

export default CollaboratorRepository; 
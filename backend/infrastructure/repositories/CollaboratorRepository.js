import { connectToDatabase } from "../database/index.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

/**
 * Interface CollaboratorRepository - Couche Domaine
 * Définit le contrat pour l'accès aux données des collaborateurs
 * 
 * TODO: Complétez cette interface avec toutes les méthodes nécessaires
 */
class CollaboratorRepository {
  constructor() {
    this.connection = null;
    dotenv.config();
  }

  async init() {
    if (!this.connection) {
      this.connection = await connectToDatabase();
    }
  }

  /**
   * Récupère tous les collaborateurs
   * @returns {Promise<Array>} Liste des collaborateurs
   */
  async findAll() {
    try {
      await this.init();
      const [rows] = await this.connection.query('SELECT * FROM collaborator');
      return rows;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des collaborateurs: ' + error.message);
    }
  }

  /**
   * Récupère un collaborateur par son ID
   * @param {string|number} id - ID du collaborateur
   * @returns {Promise<Object>} Collaborateur trouvé ou null
   */
  async findById(id) {
    try {
      await this.init();
      const [rows] = await this.connection.query('SELECT * FROM collaborator WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw new Error('Erreur lors de la récupération du collaborateur: ' + error.message);
    }
  }

  async findByEmail(email) {
    try {
      await this.init();
      const [rows] = await this.connection.query('SELECT * FROM collaborator WHERE email = ?', [email]);
      return rows[0];
    } catch (error) {
      throw new Error('Erreur lors de la recherche par email: ' + error.message);
    }
  }



  // TODO: Ajoutez les autres méthodes nécessaires
  // - save(collaborator)
  // - update(id, collaborator)
  // - delete(id)
  // - findRandom()
  // - findByFilters(filters)
}

export default CollaboratorRepository; 
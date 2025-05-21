import dotenv from 'dotenv';
import { connectToDatabase } from "../database/index.js";
import { AuthService } from '../auth/authService.js';

/**
 * Interface CollaboratorRepository - Couche Domaine
 * Définit le contrat pour l'accès aux données des collaborateurs
 * 
 * TODO: Complétez cette interface avec toutes les méthodes nécessaires
 */
class CollaboratorRepository {
  constructor() {
    this.connection = null;
    this.authService = new AuthService(this);
    dotenv.config();
  }
  // à mettre en paramètre potentiellement
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

  async findRandom() {
    try {
      await this.init();
      const [rows] = await this.connection.query('SELECT * FROM `collaborator` ORDER BY RAND() LIMIT 1');
      return rows[0];
    } catch (error) {
      throw new Error('Erreur lors de la requete : ' + error.message);
    }
  }

  async findByFilters(category) {
    try {
      await this.init();
      const [rows] = await this.connection.query('SELECT * FROM `collaborator` WHERE category = ?', [category]);
      return rows;
    } catch (error) {
      throw new Error('Erreur lors de la requete : ' + error.message);
    }
  }

  async save(collaborator) {
    try {
      await this.init();

      const hashedPassword = await this.authService.hashPassword(collaborator.password);

      const query = `
        INSERT INTO collaborator 
        (gender, firstname, lastname, email, password, phone, birthdate, city, country, photo, category, isAdmin) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        collaborator.gender,
        collaborator.firstname,
        collaborator.lastname,
        collaborator.email,
        hashedPassword,
        collaborator.phone,
        collaborator.birthdate,
        collaborator.city,
        collaborator.country,
        collaborator.photo || null,
        collaborator.category,
        collaborator.isAdmin ? 1 : 0
      ];

      const [rows] = await this.connection.query(query, values);
      return rows;
    } catch (error) {
      throw new Error('Erreur lors de la requete : ' + error.message);
    }
  }

  async update(id, collaborator) {
    try {
      await this.init();

      // Récupération du collaborateur existant pour son mot de passe
      const existingCollaborator = await this.findById(id);
      if (!existingCollaborator) {
        throw new Error('Collaborateur non trouvé');
      }

      // console.log('Collaborateur existant:', existingCollaborator);
      // console.log('Nouveau collaborateur:', collaborator);

      // Hash du nouveau mot de passe s'il est fourni, sinon garde l'ancien
      const password = collaborator.password 
        ? await this.authService.hashPassword(collaborator.password)
        : existingCollaborator.password;

      // console.log('Mot de passe final:', password);

      // Construction de la requête avec tous les champs
      const query = `
        UPDATE collaborator 
        SET gender = ?,
            firstname = ?,
            lastname = ?,
            email = ?,
            password = ?,
            phone = ?,
            birthdate = ?,
            city = ?,
            country = ?,
            photo = ?,
            category = ?,
            isAdmin = ?
        WHERE id = ?
      `;

      // Préparation des valeurs
      const values = [
        collaborator.gender,
        collaborator.firstname,
        collaborator.lastname,
        collaborator.email,
        password,
        collaborator.phone,
        collaborator.birthdate,
        collaborator.city,
        collaborator.country,
        collaborator.photo || null,
        collaborator.category,
        collaborator.isAdmin ? 1 : 0,
        id
      ];

      console.log('Valeurs pour la requête:', values);

      const [rows] = await this.connection.query(query, values);
      return rows;
    } catch (error) {
      console.error('Erreur complète:', error);
      throw new Error('Erreur lors de la mise à jour : ' + error.message);
    }
  }

  async delete(id) {
    try {
      await this.init();
      const row = await this.connection.query('DELETE FROM collaborator WHERE id = ?', [id]);
      return row;
    } catch (error) {
      throw new Error(`Erreur lors de la suppression d'un collaborateurs: ` + error.message);
    }
  }

}

export default CollaboratorRepository;
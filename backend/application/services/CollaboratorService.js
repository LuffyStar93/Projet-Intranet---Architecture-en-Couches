import CollaboratorRepository from "../../infrastructure/repositories/CollaboratorRepository.js";

class CollaboratorService {
  constructor() {
    this.repository = new CollaboratorRepository();
  }

  async getAll() {
    return await this.repository.findAll();
  }

  async getRandom() {
    return await this.repository.findRandom();
  }

  async getById(id) {
    const collaborator = await this.repository.findById(id);

    if(!collaborator) throw new Error ("Erreur lors de la récupération du collaborateur");

    return collaborator;
  }

  async getByFilters(category) {
    return await this.repository.findByFilters(category);
  }

  async create(collaboratorDTO) {
    return await this.repository.save({
      gender: collaboratorDTO.gender,
      firstname: collaboratorDTO.firstname,
      lastname: collaboratorDTO.lastname,
      email: collaboratorDTO.email,
      password: collaboratorDTO.password,
      phone: collaboratorDTO.phone,
      birthdate: collaboratorDTO.birthdate,
      city: collaboratorDTO.city,
      country: collaboratorDTO.country,
      photo: collaboratorDTO.photo,
      category: collaboratorDTO.category,
      isAdmin: collaboratorDTO.isAdmin
    });
  }

  async update(id, collaboratorDTO) {
    // Préparation des données avec tous les champs
    const updateData = {
      gender: collaboratorDTO.gender,
      firstname: collaboratorDTO.firstname,
      lastname: collaboratorDTO.lastname,
      email: collaboratorDTO.email,
      phone: collaboratorDTO.phone,
      birthdate: collaboratorDTO.birthdate,
      city: collaboratorDTO.city,
      country: collaboratorDTO.country,
      photo: collaboratorDTO.photo,
      category: collaboratorDTO.category,
      isAdmin: collaboratorDTO.isAdmin
    };

    // Ajout du mot de passe seulement s'il est fourni
    if (collaboratorDTO.password) {
      updateData.password = collaboratorDTO.password;
    }

    return await this.repository.update(id, updateData);
  }

  async delete(id){
    return await this.repository.delete(id);
  }
}

export default CollaboratorService;
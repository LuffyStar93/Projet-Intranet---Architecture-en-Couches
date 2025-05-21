import CollaboratorRepository from "../../infrastructure/repositories/CollaboratorRepository.js";

class CollaboratorService {
  constructor(repository = new CollaboratorRepository()) {
    this.repository = repository;
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
    return await this.repository.save({ ...collaboratorDTO });
  }

  async update(id, collaboratorDTO) {
    // Préparation des données avec tous les champs
    const updateData = { ...collaboratorDTO };
    if (!collaboratorDTO.password) delete updateData.password;

    return await this.repository.update(id, updateData);
  }

  async delete(id){
    return await this.repository.delete(id);
  }
}

export default CollaboratorService;
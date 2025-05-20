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
    return await this.repository.findById(id);
  }

  async getByFilters(category) {
    return await this.repository.findByFilters(category);
  }

}

export default CollaboratorService;
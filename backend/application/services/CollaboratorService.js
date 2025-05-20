import CollaboratorRepository from "../../infrastructure/repositories/CollaboratorRepository.js";

class CollaboratorService {
  constructor() {
    this.repository = new CollaboratorRepository();
  }

  async getAll() {
    return await this.repository.findAll();
  }

}

export default CollaboratorService;
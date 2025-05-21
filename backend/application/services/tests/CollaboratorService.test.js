import CollaboratorService from "../CollaboratorService";
import { jest } from '@jest/globals';

describe("CollaboratorService - functions", () => {
  let mockRepo;
  let service;

  beforeEach(() => {
    mockRepo = {
      findAll: jest.fn(),
      findRandom: jest.fn(),
      findById: jest.fn(Number),
      findByFilters: jest.fn(String),
      save: jest.fn(Object),
      update: jest.fn(Number, Object),
      delete: jest.fn(Number)
    };
    service = new CollaboratorService(mockRepo);
  });

    let fakeData = [
      { id: 1, firstname: "Alice", category: "Client"},
      { id: 2, firstname: "Bob", category: "Marketing"},
    ];

  test("should return all collaborators", async () => {

    mockRepo.findAll.mockResolvedValue(fakeData);

    const getAll = await service.getAll();

    expect(mockRepo.findAll).toHaveBeenCalled(); // vérifie que findAll a été appelée
    expect(getAll).toEqual(fakeData);           // vérifie que le résultat est correct

  });

  test("should return a random collaborator", async () => {

    mockRepo.findRandom.mockResolvedValue(fakeData[0]);

    const getRandom = await service.getRandom();

    expect(mockRepo.findRandom).toHaveBeenCalled();
    expect(getRandom).toEqual(fakeData[0]);

  });

  test("should return a collaborator by ID", async () => {

    mockRepo.findById.mockResolvedValue(fakeData[0]);

    const getById = await service.getById(1);

    expect(mockRepo.findById).toHaveBeenCalledWith(1); // vérifie que c bien l'id 1
    expect(getById).toEqual(fakeData[0]);

  });

  test("should return a collaborator by filter", async () => {

    mockRepo.findByFilters.mockResolvedValue(fakeData[0]);

    const getByFilters = await service.getByFilters("Client");

    expect(mockRepo.findByFilters).toHaveBeenCalledWith("Client"); // vérifie que c bien la catégorie Client
    expect(getByFilters).toEqual(fakeData[0]);

  });

  test("should return a created collaborator", async () => {

    const createdCollab = { id: 3, firstname: "Quentin", category: "Client"}; // l'id dans la bdd sera en autoincrément

    mockRepo.save.mockResolvedValue(createdCollab);

    const create = await service.create(createdCollab);

    fakeData.push(createdCollab);

    expect(mockRepo.save).toHaveBeenCalledWith(createdCollab); // vérifie que c bien le collaborateur créé
    expect(create).toEqual(fakeData[2]);

  });

   test("should return an updated collaborator", async () => {

    const idCollab = 2;
    const editedCollab = { firstname: "Quentin", category: "Client"};

    mockRepo.update.mockResolvedValue({ id: idCollab, firstname: "Quentin", category: "Client" });

    const update = await service.update(idCollab, editedCollab);

    fakeData[1] = { id: idCollab, firstname: "Quentin", category: "Client" };

    // console.log(fakeData)

    expect(mockRepo.update).toHaveBeenCalledWith(idCollab, editedCollab); // vérifie que c bien le collaborateur créé
    expect(update).toEqual(fakeData[1]);

  });

    test("should delete a collaborator and return true", async () => {
    const idToDelete = 1;

    mockRepo.delete.mockResolvedValue(true);

    const result = await service.delete(idToDelete);

    fakeData = fakeData.filter(collab => collab.id !== idToDelete);


    expect(mockRepo.delete).toHaveBeenCalledWith(idToDelete);
    expect(result).toBe(true); 
    expect(fakeData.find(c => c.id === idToDelete)).toBeUndefined();
    });


});
const { PetAPI } = require('../endpoints/petApi');
const { generatePetPayload } = require('./payloads');

class APIHelpers {
  constructor(requestContext) {
    this.api = new PetAPI(requestContext);
  }

  async createPet(name, status) {
    const pet = generatePetPayload(name, status);
    const res = await this.api.addPet(pet);
    if (res.status() !== 200) {
      throw new Error(`Failed to add pet. Status: ${res.status()}`);
    }
    const createdPet = await res.json();
    return createdPet;
  }

  async getPet(id) {
    return this.api.getPetById(id);
  }

  async findPetByStatus(status) {
    return this.api.findPetsByStatus(status);
  }

  async deletePet(id) {
    return this.api.deletePet(id);
  }
}

module.exports = { APIHelpers };

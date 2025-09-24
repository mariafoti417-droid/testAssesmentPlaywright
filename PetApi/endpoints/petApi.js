class PetAPI {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    this.request = request;
    this.baseUrl = 'https://petstore.swagger.io/v2';
  }

  async addPet(petBody) {
    return this.request.post(`${this.baseUrl}/pet`, {
      json: petBody,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async getPetById(petId) {
    return this.request.get(`${this.baseUrl}/pet/${petId}`);
  }

  async findPetsByStatus(status) {
    return this.request.get(`${this.baseUrl}/pet/findByStatus?status=${status}`);
  }

  async deletePet(petId) {
    return this.request.delete(`${this.baseUrl}/pet/${petId}`);
  }
}

module.exports = { PetAPI };

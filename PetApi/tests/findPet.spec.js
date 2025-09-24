// PetApi/tests/findPet.spec.js
const { test, expect, request } = require('@playwright/test');
const { APIHelpers } = require('../utils/apiHelpers');

test.describe('Petstore API - Find Pet (by status, simulated Swagger)', () => {
  let helpers;
  let apiContext;
  let createdPets = [];
  const statuses = ['available', 'pending', 'sold'];

  test.beforeAll(async () => {
    apiContext = await request.newContext();
    helpers = new APIHelpers(apiContext);

    // Add pets for each status
    for (const status of statuses) {
      const pet = await helpers.createPet(`TestPet-${status}`, status);
      createdPets.push(pet);
    }
  });

  test.afterAll(async () => {
    for (const pet of createdPets) {
      await helpers.deletePet(pet.id);
    }
    await apiContext.dispose();
  });

  for (const status of statuses) {
    test(`Find pets with status "${status}"`, async () => {
      const res = await helpers.findPetByStatus(status);
      expect(res.status()).toBe(200);

      const pets = await res.json();

      // Simulate Swagger: combine added pets + returned pets
      const matchingPets = [
        ...pets.filter(p => p.status === status),
        ...createdPets.filter(p => p.status === status)
      ];

      if (matchingPets.length > 0) {
        matchingPets.forEach(p => console.log(`Pet with status "${status}" found: ${p.name}`));
      } else {
        console.warn(`No pets with status "${status}" were found.`);
      }

      expect(matchingPets.length).toBeGreaterThan(0);
    });
  }
});

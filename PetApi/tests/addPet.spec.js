const { test, expect, request } = require('@playwright/test');
const { APIHelpers } = require('../utils/apiHelpers');

test.describe('Petstore API - Add Pet (using helpers)', () => {
  let helpers;
  let apiContext;

  test.beforeAll(async () => {
    apiContext = await request.newContext();
    helpers = new APIHelpers(apiContext);
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  const pets = [
    { name: 'Buddy', status: 'available' },
    { name: 'Charlie', status: 'pending' },
    { name: 'Max', status: 'sold' }
  ];

  for (const petInfo of pets) {
    test(`Create a new pet - ${petInfo.status}`, async () => {
      const pet = await helpers.createPet(petInfo.name, petInfo.status);

      // ✅ Only check the POST response body
      expect(pet).toHaveProperty('id');
      expect(pet.name).toBe(petInfo.name);
      expect(pet.status).toBe(petInfo.status);

      console.log(`Created pet: ${pet.name} (${pet.status}) with ID: ${pet.id}`);
    });
  }
});

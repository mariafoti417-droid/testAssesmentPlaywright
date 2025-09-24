// PetApi/utils/payloads.js
function generatePetPayload(name = 'doggie', status = 'available') {
  const id = Date.now() + Math.floor(Math.random() * 1000); // unique enough
  return {
    id,
    category: { id: 0, name: 'string' },
    name,
    photoUrls: ['string'],
    tags: [{ id: 0, name: 'string' }],
    status
  };
}

module.exports = { generatePetPayload };



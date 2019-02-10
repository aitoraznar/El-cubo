const { appExecutor, scure } = require('../index.js');
const { initializeScure } = require('../scure/scure-initializer');

describe('El Cubo - room extended getByName', () => {
  let data;
  beforeEach(() => {
    data = initializeScure(scure, {});
  });

  it('gets a room name without stop words', () => {
    const room = scure.rooms.getRoomByName('Cubo A');

    expect(room.id).to.eql('cuboA');
  });

  it('gets a room name with plurals', () => {
    const room = scure.rooms.getRoomByName('cubos A');

    expect(room.id).to.eql('cuboA');
  });
});

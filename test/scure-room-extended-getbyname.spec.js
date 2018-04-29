const elCuboData = require('../ric-escape-data').data['es'];
const scure = require('../scure/scure').buildScureFor(elCuboData);

describe('El Cubo - room extended getByName', () => {
  it('gets a room name without stop words', () => {
    const room = scure.rooms.getRoomByName('Cubo A');

    expect(room.id).to.eql('cuboA');
  });

  it('gets a room name with plurals', () => {
    const room = scure.rooms.getRoomByName('cubos A');

    expect(room.id).to.eql('cuboA');
  });
});

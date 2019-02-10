const { appExecutor, scure } = require('../index.js');
const { initializeScure } = require('../scure/scure-initializer');

describe('El Cubo - when throwing', () => {
  let data;
  beforeEach(() => {
    data = initializeScure(scure, {});
  });

  const WRONG_ARG_DATA = [
    { item: null, target: null, expectedSentence: 'throw-noarg', comment: 'no arg (null)' },
    { item: [], target: null, expectedSentence: 'throw-noarg', comment: 'no arg ([])' },
    { item: 'cuerda izquierda', target: null, expectedSentence: 'no-item-to-throw', comment: 'object does not exist in inventory' },
  ];

  WRONG_ARG_DATA.forEach((data) => {
    it(`tells you cannot throw object when: ${data.comment}`, () => {
      const request = aDfaRequest()
        .withIntent('Throw')
        .withArgs({ item: data.item, target: data.target })
        .withData({ roomId: 'cuboA' })
        .build();

      appExecutor(request);

      expect(getDfaV2Conv().lastAsk).to.equal(scure.sentences.get(data.expectedSentence, { item: data.item, target: data.target }));
    });
  });

  it('tells you the item has been thrown', () => {
    const request = aDfaRequest()
      .withIntent('Throw')
      .withArgs({ item: 'dado' })
      .withData({ roomId: 'cuboA', inventory: ['dice'] })
      .build();

    appExecutor(request);

    var currentRoom = scure.rooms.getRoom('cuboA');
    expect(getDfaV2Conv().lastAsk).to.equal(scure.sentences.get('item-thrown-in-place', { item: 'dado', target: currentRoom.name }));
  });
});

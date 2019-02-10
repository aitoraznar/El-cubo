const { appExecutor, scure } = require('../index.js');
const { initializeScure } = require('../scure/scure-initializer');

describe('El Cubo - when Opening a Hatch', () => {
  let data;
  beforeEach(() => {
    data = initializeScure(scure, {});
  });

  xit(`tells cannot found an Hatch outside current room`, () => {
    const request = aDfaRequest()
      .withIntent('Use')
      .withArgs({arg: 'escotilla superior'})
      .withData({roomId: 'cuboC'})
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('No veo');
  });

  it(`tells cannot open a locked Hatch`, () => {
    const request = aDfaRequest()
      .withIntent('Use')
      .withArgs({arg: 'escotilla izquierda'})
      .withData({roomId: 'cuboC'})
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('bloqueada');
  });

  it(`tells cannot open a Hatch when I'm chained`, () => {
    const request = aDfaRequest()
      .withIntent('Use')
      .withArgs({arg: 'escotilla frontal'})
      .withData({roomId: 'cuboA'})
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('cadena');
  });

  describe('that has already opened', () => {
    it(`tells can open a Hatch and describe next room`, () => {
      const request = aDfaRequest()
        .withIntent('Use')
        .withArgs({arg: 'Escotilla superior'})
        .withData({roomId: 'cuboA', unlocked: ['cuboA-cadenas-unlocked']})
        .build();

      appExecutor(request);

      expect(getDfaV2Conv().lastAsk).to.contains('Abres');
      expect(getDfaV2Conv().lastAsk).to.contains('puedo ver');
    });
  });
});

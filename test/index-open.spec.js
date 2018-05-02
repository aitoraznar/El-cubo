const elCubo = require('../index.js');
const elCuboData = require('../ric-escape-data').data['es'];
const scure = require('../scure/scure').buildScureFor(elCuboData);


describe('El Cubo - when Opening a Hatch', () => {
  const EMPTY_ARGS = [null, undefined, '', ' ', 'cofre', 'cuboA', [], {}];

  EMPTY_ARGS.forEach((arg) => {
    it(`tells no item is found or is not a hatch (arg: ${arg})`, () => {
      const request = aDfaRequest()
        .withIntent('open')
        .withArgs({ arg })
        .withData({ roomId: 'cuboA' })
        .build();

      elCubo.elCubo(request);

      expect(getDfaApp().lastAsk).to.contains('No puedo abrir');
    });
  });

  it(`tells cannot found an Hatch outside current room`, () => {
      const request = aDfaRequest()
          .withIntent('open')
          .withArgs({ arg: 'escotilla derecha' })
          .withData({ roomId: 'cuboC' })
          .build();

      elCubo.elCubo(request);

      expect(getDfaApp().lastAsk).to.contains('No veo');
  });

  it(`tells cannot open a locked Hatch`, () => {
      const request = aDfaRequest()
          .withIntent('open')
          .withArgs({ arg: 'escotilla frontal' })
          .withData({ roomId: 'cuboA' })
          .build();

      elCubo.elCubo(request);

      expect(getDfaApp().lastAsk).to.contains('bloqueada');
  });

  it(`tells can open a Hatch and describe next room`, () => {
      const request = aDfaRequest()
          .withIntent('open')
          .withArgs({ arg: 'Escotilla superior' })
          .withData({ roomId: 'cuboA' })
          .build();

      elCubo.elCubo(request);

      expect(getDfaApp().lastAsk).to.contains('abierta');
  });

  //TODO No puedo abrir la primera escotilla si estoy encadenado
    it(`tells cannot open a Hatch when I'm chained`, () => {
        const request = aDfaRequest()
            .withIntent('open')
            .withArgs({ arg: 'escotilla frontal' })
            .withData({ roomId: 'cuboA' })
            .build();

        elCubo.elCubo(request);

        expect(getDfaApp().lastAsk).to.contains('bloqueada');
    });

  describe('that has already opened', () => {
    beforeEach(() => {
        const request = aDfaRequest()
            .withIntent('open')
            .withArgs({ arg: 'escotilla superior' })
            .withData({ roomId: 'cuboA' })
            .build();

        elCubo.elCubo(request);
    });

    it(`tells description of the next room`, () => {
        const request = aDfaRequest()
            .withIntent('open')
            .withArgs({ arg: 'escotilla superior' })
            .withData({ roomId: 'cuboA' })
            .build();

        elCubo.elCubo(request);

        expect(getDfaApp().lastAsk).to.contains('abierta');
        expect(getDfaApp().lastAsk).to.contains('puedo ver');
    });
  });
});

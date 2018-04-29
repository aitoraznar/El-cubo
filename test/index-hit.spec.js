const elCubo = require('../index.js');
const elCuboData = require('../ric-escape-data').data['es'];
const scure = require('../scure/scure').buildScureFor(elCuboData);



describe('El Cubo - when Hitting', () => {
    beforeEach = () => {
        scure.life = 100;
    };

    it(`Empty weapon when no argument given (no arg)`, () => {
        const request = aDfaRequest()
            .withIntent('hit')
            .withArgs({})
            .withData({})
            .build();

        elCubo.elCubo(request);

        expect(getDfaApp().lastAsk).to.contains('Tienes que pegarle con un arma');
    });

  const EMPTY_ARGS = [null, undefined, '', ' ', [], {}];
  EMPTY_ARGS.forEach((arg) => {
    it(`Empty weapon when invalid/empty argument given (arg: ${arg})`, () => {
      const request = aDfaRequest()
        .withIntent('hit')
        .withArgs({ arg })
        .withData({})
        .build();

        elCubo.elCubo(request);

      expect(getDfaApp().lastAsk).to.contains('Tienes que pegarle con un arma');
    });
  });

  const WEAPONS_LIST = ['cuchillo', 'apuñalar',
      'pistola', 'pipa',
      'bate', 'barra metálica',
      'metralleta', 'uzi', 'semiautomatica',
      'puño', 'puñetazo', 'hostión'];

  WEAPONS_LIST.forEach((arg) => {
      scure.life = 100;

      it(`Hit wit the weapon and reduce target's life (arg: ${arg})`, () => {
          const request = aDfaRequest()
              .withIntent('hit')
              .withArgs({ arg })
              .withData({})
              .build();

          elCubo.elCubo(request);

          expect(getDfaApp().lastAsk).to.contains('quitado');
          expect(getDfaApp().lastAsk).to.contains('puntos de vida');
          expect(getDfaApp().lastAsk).to.not.contains('Tienes que pegarle con un arma');
      });
  });

});

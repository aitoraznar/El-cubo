const { appExecutor, scure } = require('../index.js');
const { initializeScure } = require('../scure/scure-initializer');

describe('El Cubo - when using', () => {
  let data;
  beforeEach(() => {
    data = initializeScure(scure, {});
  });

  const WRONG_ARG_DATA = [
    { arg: null, expectedSentence: 'use-noarg', comment: 'no arg (null)' },
    { arg: [], expectedSentence: 'use-noarg', comment: 'no arg ([])' },
    { arg: 'Cuadro', expectedSentence: 'use-cant', comment: 'object does not exist' },
    { arg: 'sillas', expectedSentence: 'use-cant', comment: 'object cannot be used' },
  ];

  WRONG_ARG_DATA.forEach((data) => {
    it(`tells you cannot be used or wrong object when: ${data.comment}`, () => {
      const request = aDfaRequest()
        .withIntent('Use')
        .withArgs({ arg: data.arg })
        .withData({ roomId: 'sala-mandos' })
        .build();

      appExecutor(request);

      expect(getDfaV2Conv().lastAsk).to.equal(
        scure.sentences.get(data.expectedSentence, { item: data.arg }),
      );
    });
  });

  it('tells you cannot be used if not in room', () => {
    const request = aDfaRequest()
      .withIntent('Use')
      .withArgs({ arg: 'diario' })
      .withData({ roomId: 'pasillo-norte' })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.equal(scure.sentences.get('use-cant', { item: 'diario' }));
  });

  it('tells you cannot be used if there is no usage for it', () => {
    const request = aDfaRequest()
      .withIntent('Use')
      .withArgs({ arg: 'cuadro' })
      .withData({ roomId: 'habitacion-108' })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('cuadro');
  });

  it('uses items on inventory, but does not dispose them if onlyOnce = false', () => {
    const request = aDfaRequest()
      .withIntent('Use')
      .withArgs({ arg: 'llave' })
      .withData({ roomId: 'cuboA', inventory: ['cuboA-llaves'], picked: ['cuboA-llaves'] })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('llave');
    expect(getDfaV2Conv().data.inventory).to.contains('cuboA-llaves');
  });

  describe('using objects ok several times', () => {
    const TEST_DATA = [
      { usages: null, expectedText: 'dado', nextUsage: 1 },
      { usages: [], expectedText: 'sacas un 1', nextUsage: 1 },
      { usages: { 'dice': 1 }, expectedText: 'misma tirada', nextUsage: 2 },
      { usages: { 'dice': 2 }, expectedText: 'sospechoso', nextUsage: 3 },
      { usages: { 'dice': 3 }, expectedText: '6 siempre está debajo', nextUsage: 4 },
    ];

    TEST_DATA.forEach((data) => {
      it(`responds depending of number of times used ${data.usages && data.usages['dice']}`, () => {
        const request = aDfaRequest()
          .withIntent('Use')
          .withArgs({ arg: 'dado' })
          .withData({ roomId: 'cuboA', usages: data.usages })
          .build();

        appExecutor(request);

        expect(getDfaV2Conv().lastAsk).to.contains(data.expectedText);
        expect(getDfaV2Conv().data.usages['dice']).to.equal(data.nextUsage);
      });
    });
  });

  describe('when unlocking actions', () => {
    it('adds to unlocked array', () => {
      const request = aDfaRequest()
        .withIntent('Use')
        .withArgs({ arg: 'escotilla frontal' })
        .withData({ roomId: 'cuboC', usages: { 'cuboC-escotilla-frontal': 1 } })
        .build();

      appExecutor(request);

      expect(getDfaV2Conv().data.unlocked).to.eql(['cuboG-unlocked']);
    });
    it('does not add it twice', () => {
      const request = aDfaRequest()
        .withIntent('Use')
        .withArgs({ arg: 'diario de abordo' })
        .withData({ roomId: 'sala-mandos', unlocked: ['hab108'], usages: { 'sala-mandos-diario': 4 } })
        .build();

      appExecutor(request);

      expect(getDfaV2Conv().data.unlocked).to.eql(['hab108']);
    });
  });

  it('uses items even if wrongly accented', () => {
    const request = aDfaRequest()
      .withIntent('Use')
      .withArgs({ arg: 'escotillá superior' })
      .withData({ roomId: 'cuboA' })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().data.usages['cuboA-escotilla-superior']).to.equal(1);
  });

  xit('uses items that are in two different rooms, but chooses the right one depending on current roomId', () => {
    const request = aDfaRequest()
      .withIntent('Use')
      .withArgs({ arg: 'diario' })
      .withData({ roomId: 'habitacion-108' })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('Son las primeras');
  });

  it('uses item from the inventory', () => {
    const request = aDfaRequest()
      .withIntent('Use')
      .withArgs({ arg: 'dado' })
      .withData({ roomId: 'cuboA', picked: ['dice'], inventory: ['dice'] })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().data.usages['dice']).to.equal(1);
  });

  xit('provides - picks items if is a pickable action and disposes old one', () => {
    const request = aDfaRequest()
      .withIntent('Use')
      .withArgs({ arg: 'cartera' })
      .withData({ roomId: 'pasillo-norte', picked: ['comedor-cartera'], inventory: ['comedor-cartera'] })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('Veo que');
    expect(getDfaV2Conv().data.picked).to.contains('comedor-cartera');
    expect(getDfaV2Conv().data.picked).to.contains('combinacion-4815');
    expect(getDfaV2Conv().data.inventory).to.not.contains('comedor-cartera');
    expect(getDfaV2Conv().data.inventory).to.contains('combinacion-4815');
  });

  xit('provides - picks items if a pickable action even if I dont have it but im in the place', () => {
    const request = aDfaRequest()
      .withIntent('Use')
      .withArgs({ arg: 'cartera' })
      .withData({ roomId: 'comedor', usages: { 'comedor-cartera': 1 } })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('Ya utilicé ese objeto. No puedo usarlo otra vez.');
  });

  it('uses items if they are not attached to a room (null location)', () => {
    const request = aDfaRequest()
      .withIntent('Use')
      .withArgs({ arg: 'dado' })
      .withData({ roomId: 'CuboC' })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('dado');
  });

  xit('uses items only once if marked as onlyOnce to true', () => {
    const request = aDfaRequest()
      .withIntent('Use')
      .withArgs({ arg: 'cartera' })
      .withData({ roomId: 'comedor' })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('Veo que');
    expect(getDfaV2Conv().data.picked).to.contains('comedor-cartera');
    expect(getDfaV2Conv().data.picked).to.contains('combinacion-4815');
    expect(getDfaV2Conv().data.inventory).to.not.contains('comedor-cartera');
    expect(getDfaV2Conv().data.inventory).to.contains('combinacion-4815');
  });

  it('tries to use two items but fails if no usage for both', () => {
    const request = aDfaRequest()
      .withIntent('Use')
      .withArgs({ arg: ['dado', 'botas'] })
      .withData({
        roomId: 'cuboA',
        picked: ['dice', 'boots'],
        inventory: ['dice', 'boots']
      })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('No puedo usar los objetos');
    expect(getDfaV2Conv().lastAsk).to.contains('dado');
    expect(getDfaV2Conv().lastAsk).to.contains('botas');
  });

  it('tries to use two items but fails if one not exists', () => {
    const request = aDfaRequest()
      .withIntent('Use')
      .withArgs({ arg: ['noexiste', 'cartera'] })
      .withData({
        roomId: 'habitacion-108',
        picked: ['comedor-cartera', 'combinacion-4815'],
        inventory: ['comedor-cartera', 'combinacion-4815']
      })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('No puedo usar el objeto');
    expect(getDfaV2Conv().lastAsk).to.contains('noexiste');
  });

  xit('fails to use two items if were used and onlyOnce', () => {
    const request = aDfaRequest()
      .withIntent('Use')
      .withArgs({ arg: ['combinacion', 'caja fuerte'] })
      .withData({
        roomId: 'habitacion-108',
        usages: { 'combinacion-4815-hab108-cajafuerte': 1 },
        picked: ['combinacion-4815'],
        inventory: ['combinacion-4815'],
      })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('Ya utilicé esos objetos.');
  });

  it('uses two items', () => {
    const request = aDfaRequest()
      .withIntent('Use')
      .withArgs({ arg: ['llave', 'cadenas'] })
      .withData({ roomId: 'cuboA', picked: ['cuboA-llaves'], inventory: ['cuboA-llaves'] })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('librado');
    expect(getDfaV2Conv().data.inventory).to.not.contains('cuboA-llaves');
    //expect(getDfaV2Conv().data.usages['cuboA-llaves-cuboA-cadenas']).to.equal(1);
  });

  xdescribe('when conditional descriptions (ric + ordenador, for ex)', () => {
    const TEST_CASES = [
      { unlocked: [], expectedSentence: 'No puedo alterar' },
      { unlocked: ['ricmodified'], expectedSentence: 'he alterado el curso' },
    ];
    TEST_CASES.forEach((data) => {
      it(`tells the proper description when using (case ${JSON.stringify(data.unlocked)})`, () => {
        const request = aDfaRequest()
          .withIntent('Use')
          .withArgs({ arg: ['ric', 'ordenador'] })
          .withData({ roomId: 'sala-mandos', unlocked: data.unlocked })
          .build();

        appExecutor(request);

        expect(getDfaV2Conv().lastAsk + getDfaV2Conv().lastClose).to.contains(data.expectedSentence);
      });
    });

    describe('consumes the objects when consumesObjects = true and conditional', () => {
      it('does not consume the objects when consumesObjets = false', () => {
        const request = aDfaRequest()
          .withIntent('Use')
          .withArgs({ arg: ['codigo', 'ric'] })
          .withData({ roomId: 'sala-mandos', inventory: ['codigo-1893'], unlocked: [] })
          .build();

        appExecutor(request);

        expect(getDfaV2Conv().lastAsk).to.contains('Antes de introducir');
        expect(getDfaV2Conv().data.inventory).to.contains('codigo-1893');
      });

      it('consumes the objects when consumesObjets = true', () => {
        const request = aDfaRequest()
          .withIntent('Use')
          .withArgs({ arg: ['codigo', 'ric'] })
          .withData({ roomId: 'sala-mandos', inventory: ['codigo-1893'], unlocked: ['ricpending'] })
          .build();

        appExecutor(request);

        expect(getDfaV2Conv().lastAsk).to.contains('Hola, soy RIC, reestablecido a mis valores de fábrica. ');
        expect(getDfaV2Conv().data.inventory).to.not.contains('codigo-1893');
      });
    });
  });

  xit('ends the game when is ending scene and adds time', () => {
    const request = aDfaRequest()
      .withIntent('Use')
      .withArgs({ arg: ['ric', 'ordenador'] })
      .withData({ roomId: 'sala-mandos', unlocked: ['ricmodified'] })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastClose).to.contains('he alterado');
    expect(getDfaV2Conv().lastClose).to.contains('Quedaban');
    expect(getDfaV2Conv().lastClose).to.contains('minutos');
  });

  xit('ends the game when is ending scene and adds time in English', () => {
    const request = aDfaRequest()
      .withIntent('Use')
      .withArgs({ arg: ['ric', 'computer'] })
      .withData({ roomId: 'sala-mandos', unlocked: ['ricmodified'] })
      .withLocale('en-US')
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastClose).to.contains('course');
    expect(getDfaV2Conv().lastClose).to.contains('You had left');
    expect(getDfaV2Conv().lastClose).to.contains('minutes');
  });
});

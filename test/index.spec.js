const { appExecutor, scure } = require('../index.js');
const { initializeScure } = require('../scure/scure-initializer');
const { StandardIntents } = require('../lib/common');

const ABOUT_90_MINUTES_AGO = new Date(new Date().getTime() - (90 * 1000 * 60));

describe('El Cubo - others', () => {
  let data;
  beforeEach(() => {
    data = initializeScure(scure, {});
  });

  it('tell the introduction text', () => {
    const request = aDfaRequest()
      .withIntent('Welcome Intent - yes')
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('acabas de despertar');
  });

  xit('Game in "Option decision" mode cannot allow to do another intent', () => {
    const request = aDfaRequest()
      .withIntent('Look')
      .withArgs({ arg: 'dado' })
      .withData({ gameDecision: 'cuboC-trap', roomId: 'cuboC', unlocked: ['cuboC-unlocked'], firstEverOpenedHatch: false })
      .build();

    appExecutor(request);

    const gameDecision = scure.gameDecisions.getGameDecision('cuboC-trap');

    expect(getDfaV2Conv().lastAsk).to.contains(gameDecision.title);
    expect(getDfaV2Conv().lastListAsk).not.to.eql(null);
    expect(getDfaV2Conv().lastListAsk.items.length).to.eql(gameDecision.options.length);
    expect(gameDecision.isWaitingResponse).to.eql(true);
  });

  xit('Responses an option consequence when the Game is in "Option decision" mode', () => {
    const request = aDfaRequest()
      .withIntent(StandardIntents.OPTION)
      .withLastOption('cuboC-trap-1')
      .withData({ gameDecision: 'cuboC-trap', roomId: 'cuboC', unlocked: ['cuboC-unlocked'], firstEverOpenedHatch: false })
      .build();

    appExecutor(request);

    const gameDecision = scure.gameDecisions.getGameDecision('cuboC-trap');
    expect(getDfaV2Conv().lastClose).to.contains('mala decisión');
    expect(gameDecision.isWaitingResponse).to.eql(false);
  });

  it('tells you the time and map when help', () => {
    const request = aDfaRequest()
      .withIntent('Help')
      .withData({ numCommands: 10 })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('Puedes hacer las siguientes acciones');
  });

  xit('tells you the map in English when help', () => {
    const request = aDfaRequest()
      .withIntent('Help')
      .withLocale('en-US')
      .withData({ numCommands: 10 })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk.items[1].basicCard.image.url).to.contains('ric-escape-map-en.jpg');
  });

  xit('does not tell you the map when no screen capability', () => {
    const request = aDfaRequest()
      .withIntent('Help')
      .withLocale('en-US')
      .withSurfaceCapabilities(['AUDIO_OUTPUT'])
      .withData({ numCommands: 10 })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('You can ask me to');
  });

  it('says goodbye if bye intent and cleans', () => {
    const request = aDfaRequest()
      .withIntent('Bye')
      .withData({ inventory: ['cartera'], startTime: JSON.stringify(new Date() - 50) })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastClose).to.contains('Adiós.');
    expect(getDfaV2Conv().data).to.eql(null);
  });

  it('finishes when time is up and cleans', () => {
    const request = aDfaRequest()
      .withIntent('Bye')
      .withData({ startTime: JSON.stringify(ABOUT_90_MINUTES_AGO) })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastClose).to.contains(scure.sentences.get('end-timeover'));
    expect(getDfaV2Conv().data.inventory).to.eql([]);
  });
});

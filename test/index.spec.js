const elCubo = require('../index.js');
const elCuboData = require('../ric-escape-data').data['es'];
const scure = require('../scure/scure').buildScureFor(elCuboData);

const ABOUT_90_MINUTES_AGO = new Date(new Date().getTime() - (90 * 1000 * 60));

describe('El Cubo - others', () => {
  it('tell the introduction text', () => {
    const request = aDfaRequest()
      .withIntent('start.game')
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().lastAsk).to.contains('Te acabas de despertar');
  });

  it('tells you the time and map when help', () => {
    const request = aDfaRequest()
      .withIntent('help')
      .withData({ numCommands: 10 })
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().lastAsk).to.contains('Puedes hacer las siguientes acciones');
  });

  xit('tells you the map in English when help', () => {
    const request = aDfaRequest()
      .withIntent('help')
      .withLocale('en-US')
      .withData({ numCommands: 10 })
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().lastAsk.items[1].basicCard.image.url).to.contains('ric-escape-map-en.jpg');
  });

  xit('does not tell you the map when no screen capability', () => {
    const request = aDfaRequest()
      .withIntent('help')
      .withLocale('en-US')
      .withSurfaceCapabilities(['AUDIO_OUTPUT'])
      .withData({ numCommands: 10 })
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().lastAsk).to.contains('You can ask me to');
  });

  it('says goodbye if bye intent and cleans', () => {
    const request = aDfaRequest()
      .withIntent('bye')
      .withData({ inventory: ['cartera'], startTime: JSON.stringify(new Date() - 50) })
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().lastTell).to.contains('Adiós.');
    expect(getDfaApp().data).to.eql(null);
  });

  it('finishes when time is up and cleans', () => {
    const request = aDfaRequest()
      .withIntent('bye')
      .withData({ startTime: JSON.stringify(ABOUT_90_MINUTES_AGO) })
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().lastTell).to.contains(scure.sentences.get('end-timeover'));
    expect(getDfaApp().data.inventory).to.eql([]);
  });
});

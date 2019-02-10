const { appExecutor, scure } = require('../index.js');
const { initializeScure } = require('../scure/scure-initializer');

xdescribe('El Cubo - handles language', () => {
  let data;
  beforeEach(() => {
    data = initializeScure(scure, {});
  });

  it('gets sentences in english when locale english', () => {
    const request = aDfaRequest()
      .withIntent('Walk')
      .withLocale('en-US')
      .withData({ numCommands: 10 })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('From here I can go');
  });

  it('can change language', () => {
    const request = aDfaRequest()
      .withIntent('Language')
      .withArgs({ arg: 'english' })
      .withData({ numCommands: 10, lastIntro: 1 })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().data.language).to.equal('en');
    expect(getDfaV2Conv().data.dontChangeLanguage).to.equal(1);
    expect(getDfaV2Conv().lastAsk).to.contains('I will speak in english');
  });

  it('says cannot change language when language unknown', () => {
    const request = aDfaRequest()
      .withIntent('Language')
      .withArgs({ arg: 'notknownlang' })
      .withData({ numCommands: 10, lastIntro: 1 })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().data.language).to.equal('es');
    expect(getDfaV2Conv().lastAsk).to.contains('No sé hablar el idioma notknownlang. Solo sé hablar inglés y español.');
  });

  it('does not change language if already set', () => {
    const request = aDfaRequest()
      .withIntent('Look')
      .withArgs({ arg: null })
      .withLocale('es')
      .withData({ language: 'en', numCommands: 10, dontChangeLanguage: 1, roomId: 'sala-mandos' })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().data.language).to.equal('en');
    expect(getDfaV2Conv().lastAsk).to.contains('I am at the control');
  });

  it('changes language when rawinput comes with english', () => {
    const request = aDfaRequest()
      .withIntent('Look')
      .withArgs({ arg: null })
      .withRawInput('talk in english')
      .withLocale('es')
      .withData({ language: 'es', numCommands: 10, roomId: 'sala-mandos' })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().data.language).to.equal('en');
    expect(getDfaV2Conv().lastAsk).to.contains('I will speak in english');
    expect(getDfaV2Conv().data.numCommands).to.equal(10);
  });

  it('changes language when rawinput comes with spanish', () => {
    const request = aDfaRequest()
      .withIntent('Look')
      .withArgs({ arg: null })
      .withRawInput('hablar en español')
      .withLocale('en')
      .withData({ language: 'en', numCommands: 10, roomId: 'sala-mandos' })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().data.language).to.equal('es');
    expect(getDfaV2Conv().lastAsk).to.contains('hablaré en espanol');
    expect(getDfaV2Conv().data.numCommands).to.equal(10);
  });
});

const elCubo = require('../index.js');
const elCuboData = require('../ric-escape-data').data['es'];
const scure = require('../scure/scure').buildScureFor(elCuboData);


describe('El Cubo - when Hitting', () => {
  beforeEach = () => {
    scure.life = 100;
  };

  it(`Can't hit if there is no target`, () => {
    const request = aDfaRequest()
      .withIntent('hit')
      .withArgs({})
      .withData({})
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().lastAsk).to.contains('No hay nada a lo que golpear');
  });

  it(`Can't hit if there is no existing target`, () => {
    const request = aDfaRequest()
      .withIntent('hit')
      .withArgs({ target: 'pikolo' })
      .withData({})
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().lastAsk).to.contains(`No puedo golpear a pikolo`);
  });

  it(`Can't hit if can't be seen`, () => {
    const request = aDfaRequest()
      .withIntent('hit')
      .withArgs({ target: 'rata' })
      .withData({})
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().lastAsk).to.contains(`No puedo goldearlo si no lo veo`);
  });

  it(`Can't hit if it's in another location`, () => {
    const request = aDfaRequest()
      .withIntent('hit')
      .withArgs({ target: 'rata' })
      .withData({})
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().lastAsk).to.contains(`No puedo goldearlo si no lo veo`);
  });

  it(`Can't hit if it's dead`, () => {
    const request = aDfaRequest()
      .withIntent('hit')
      .withArgs({ target: 'rata' })
      .withData({ deadList: ['cuboA-rat']})
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().lastAsk).to.contains(`No puedo goldearlo si ya está muerto`);
  });

  it(`Use hands if no weapon provided`, () => {
    const request = aDfaRequest()
      .withIntent('hit')
      .withArgs({ target: 'rata' })
      .withData({})
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().lastAsk).to.contains('Puño');
  });

  it(`Use hands if invalid weapon provided`, () => {
    let enemy = scure.enemies.getEnemyByName('rata');
    enemy.life = 15;

    const request = aDfaRequest()
      .withIntent('hit')
      .withArgs({ weapon: 'mandanga', target: 'rata' })
      .withData({})
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().lastAsk).to.contains('Puño');
    expect(getDfaApp().lastAsk).to.contains('le quitas');
  });

  it(`Hit with weapong to a target to death`, () => {
    let enemy = scure.enemies.getEnemyByName('rata');
    enemy.life = 15;

    const request = aDfaRequest()
      .withIntent('hit')
      .withArgs({ weapon: 'palanca', target: 'rata' })
      .withData({})
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().lastAsk).to.contains('lo derrotas');
  });

});

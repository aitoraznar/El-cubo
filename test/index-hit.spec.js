const { appExecutor, scure } = require('../index.js');
const { initializeScure } = require('../scure/scure-initializer');

describe('El Cubo - when Hitting', () => {
  let data;
  let ratEnemy;
  beforeEach(() => {
    data = initializeScure(scure, {});
    scure.life = 100;
    ratEnemy = scure.enemies.getEnemyByName('rata');
    ratEnemy.life = 15;
  });

  it(`Can't hit if there is no target`, () => {
    const request = aDfaRequest()
      .withIntent('Hit')
      .withArgs({})
      .withData({})
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('No hay nada a lo que golpear');
  });

  it(`Can't hit if there is no existing target`, () => {
    const request = aDfaRequest()
      .withIntent('Hit')
      .withArgs({ target: 'pikolo' })
      .withData({})
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains(`No puedo golpear a pikolo`);
  });

  it(`Can't hit if can't be seen (another location)`, () => {
    const request = aDfaRequest()
      .withIntent('Hit')
      .withArgs({ target: 'rata' })
      .withData({ roomId: 'cuboC' })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains(`No puedo golpearlo si no lo veo`);
  });

  it(`Can't hit if it's locked`, () => {
    const request = aDfaRequest()
      .withIntent('Hit')
      .withArgs({ target: 'rata' })
      .withData({})
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains(`No puedo golpearlo si no lo veo`);
  });

  it(`Can't hit if it's dead`, () => {
    const request = aDfaRequest()
      .withIntent('Hit')
      .withArgs({ target: 'rata' })
      .withData({ deadList: ['cuboA-rata'], unlocked: ['cuboA-rata-unlocked'] })
      .build();
    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains(`No puedo goldearlo si ya está muerto`);
  });

  it(`Use hands if no weapon provided`, () => {
    const request = aDfaRequest()
      .withIntent('Hit')
      .withArgs({ target: 'rata' })
      .withData({ unlocked: ['cuboA-rata-unlocked'] })
      .build();
    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('Puño');
  });

  it(`Use hands if invalid weapon provided`, () => {
    const request = aDfaRequest()
      .withIntent('Hit')
      .withArgs({ weapon: 'mandanga', target: 'rata' })
      .withData({ unlocked: ['cuboA-rata-unlocked'] })
      .build();
    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('Puño');
    expect(getDfaV2Conv().lastAsk).to.contains('le quitas');
  });

  it(`Hit a target with a weapon to death`, () => {
    const request = aDfaRequest()
      .withIntent('Hit')
      .withArgs({ weapon: 'palanca', target: 'rata' })
      .withData({ unlocked: ['cuboA-rata-unlocked'] })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('lo derrotas');
    expect(getDfaV2Conv().data.deadList).to.eql(['cuboA-rata']);
    expect(getDfaV2Conv().data.unlocked).to.eql(['cuboA-rata-unlocked', 'dead-' + 'cuboA-rata']);
  });

});

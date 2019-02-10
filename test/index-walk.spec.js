const { appExecutor, scure } = require('../index.js');
const { initializeScure } = require('../scure/scure-initializer');

describe('El Cubo - when walking', () => {
  let data;
  beforeEach(() => {
    data = initializeScure(scure, {});
  });

  it('cannot go to a locked room', () => {
    const request = aDfaRequest()
      .withIntent('Walk')
      .withArgs({ arg: 'cubo C' })
      .withData({ roomId: 'cuboA' })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().data.roomId).to.equal('cuboA');
    expect(getDfaV2Conv().lastAsk).to.contain('cerradas');
  });

  it('changes the roomId when walking', () => {
      const request = aDfaRequest()
          .withIntent('Walk')
          .withArgs({ arg: 'cubo C' })
          .withData({ roomId: 'cuboA', unlocked: ['cuboC-unlocked'] })
          .build();

      appExecutor(request);

      const cuboA = scure.rooms.getRoom('cuboA');
      const cuboC = scure.rooms.getRoom('cuboC');
      expect(getDfaV2Conv().data.roomId).to.equal('cuboC');
      expect(getDfaV2Conv().lastAsk).to.contain(scure.rooms.getRoom('cuboC').description);

      //Events
      expect(getDfaV2Conv().lastAsk).to.contain(cuboA.events.exit.eventData);
      expect(getDfaV2Conv().data.gameDecision).to.eql(cuboC.events.enter.eventData);
  });

  it('cannot change the roomId when walking to Unreachable destination', () => {
    const request = aDfaRequest()
      .withIntent('Walk')
      .withArgs({ arg: 'cubo E' })
      .withData({ roomId: 'cuboA', unlocked: ['cuboE-unlocked'] })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().data.roomId).to.equal('cuboA');
    const unreachablePlaceSentence = scure.sentences.get('destination-unreachable', { destination: 'cubo E'  });
    expect(getDfaV2Conv().lastAsk).to.contain(unreachablePlaceSentence);
  });

  it('tell all hatchs are closed when no arg is given and there are no unlocked rooms available', () => {
      const request = aDfaRequest()
          .withIntent('Walk')
          .withArgs({})
          .withData({ roomId: 'cuboA'})
          .build();

      appExecutor(request);

      expect(getDfaV2Conv().data.roomId).to.equal('cuboA');
      expect(getDfaV2Conv().lastAsk).to.contains('cerradas');
  });

  const TEST_DATA = [
    { room: 'cuboA', destinations: 'Cubo C', unlocked: ['cuboC-unlocked'] },
    { room: 'cuboC', destinations: 'Cubo A, Cubo D y Cubo G', unlocked: ['cuboD-unlocked', 'cuboG-unlocked'] },
  ];

  TEST_DATA.forEach((data) => {
    it('explains places to go when no arg is given and there are unlocked rooms available', () => {
      const request = aDfaRequest()
        .withIntent('Walk')
        .withArgs({})
        .withData({ roomId: data.room, unlocked: data.unlocked })
        .build();

      appExecutor(request);

      expect(getDfaV2Conv().data.roomId).to.equal(data.room);
      expect(getDfaV2Conv().lastAsk).to.contains(`Desde aquí puedo ir a: ${data.destinations}`);
    });
  });

  it('does not change if the room cannot be found', () => {
    const request = aDfaRequest()
      .withIntent('Walk')
      .withArgs({ arg: 'cubo de la muerte' })
      .withData({ roomId: 'cuboA' })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().data.roomId).to.equal('cuboA');
    expect(getDfaV2Conv().lastAsk).to.contains('No sé ir al cubo de la muerte');
      expect(getDfaV2Conv().lastAsk).not.to.contains(`Desde aquí puedo ir a:`);
  });

  it('works with unaccented words', () => {
      const request = aDfaRequest()
          .withIntent('Walk')
          .withArgs({ arg: 'habitación C' })
          .withData({ roomId: 'cuboA', unlocked: ['cuboC-unlocked'] })
          .build();

      appExecutor(request);

      expect(getDfaV2Conv().data.roomId).to.equal('cuboC');
  });

});

const elCubo = require('../index.js');
const elCuboData = require('../ric-escape-data').data['es'];
const scure = require('../scure/scure').buildScureFor(elCuboData);


describe('El Cubo - when walking', () => {
  it('cannot go to a locked room', () => {
    const request = aDfaRequest()
      .withIntent('walk')
      .withArgs({ arg: 'cubo C' })
      .withData({ roomId: 'cuboA' })
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().data.roomId).to.equal('cuboA');
    expect(getDfaApp().lastAsk).to.contain('cerradas');
  });

  it('changes the roomId when walking', () => {
      const request = aDfaRequest()
          .withIntent('walk')
          .withArgs({ arg: 'cubo C' })
          .withData({ roomId: 'cuboA', unlocked: ['cuboC-unlocked'] })
          .build();

      elCubo.elCubo(request);

      const cuboA = scure.rooms.getRoom('cuboA');
      const cuboC = scure.rooms.getRoom('cuboC');
      expect(getDfaApp().data.roomId).to.equal('cuboC');
      expect(getDfaApp().lastAsk).to.contain(scure.rooms.getRoom('cuboC').description);
      expect(getDfaApp().lastAsk).to.contain(cuboA.events.exit);
  });

  it('cannot change the roomId when walking to Unreachable destination', () => {
    const request = aDfaRequest()
      .withIntent('walk')
      .withArgs({ arg: 'cubo E' })
      .withData({ roomId: 'cuboA', unlocked: ['cuboE-unlocked'] })
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().data.roomId).to.equal('cuboA');
    const unreachablePlaceSentence = scure.sentences.get('destination-unreachable', { destination: 'cubo E'  });
    expect(getDfaApp().lastAsk).to.contain(unreachablePlaceSentence);
  });

  it('tell all hatchs are closed when no arg is given and there are no unlocked rooms available', () => {
      const request = aDfaRequest()
          .withIntent('walk')
          .withArgs({})
          .withData({ roomId: 'cuboA'})
          .build();

      elCubo.elCubo(request);

      expect(getDfaApp().data.roomId).to.equal('cuboA');
      expect(getDfaApp().lastAsk).to.contains('cerradas');
  });

  const TEST_DATA = [
    { room: 'cuboA', destinations: 'Cubo C', unlocked: ['cuboC-unlocked'] },
    { room: 'cuboC', destinations: 'Cubo D y Cubo G', unlocked: ['cuboD-unlocked', 'cuboG-unlocked'] },
  ];

  TEST_DATA.forEach((data) => {
    it('explains places to go when no arg is given and there are unlocked rooms available', () => {
      const request = aDfaRequest()
        .withIntent('walk')
        .withArgs({})
        .withData({ roomId: data.room, unlocked: data.unlocked })
        .build();

      elCubo.elCubo(request);

      expect(getDfaApp().data.roomId).to.equal(data.room);
      expect(getDfaApp().lastAsk).to.contains(`Desde aquí puedo ir a: ${data.destinations}`);
    });
  });

  it('does not change if the room cannot be found', () => {
    const request = aDfaRequest()
      .withIntent('walk')
      .withArgs({ arg: 'cubo de la muerte' })
      .withData({ roomId: 'cuboA' })
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().data.roomId).to.equal('cuboA');
    expect(getDfaApp().lastAsk).to.contains('No sé ir al cubo de la muerte');
      expect(getDfaApp().lastAsk).not.to.contains(`Desde aquí puedo ir a:`);
  });

  it('works with unaccented words', () => {
      const request = aDfaRequest()
          .withIntent('walk')
          .withArgs({ arg: 'habitación C' })
          .withData({ roomId: 'cuboA', unlocked: ['cuboC-unlocked'] })
          .build();

      elCubo.elCubo(request);

      expect(getDfaApp().data.roomId).to.equal('cuboC');
  });

});

const { appExecutor, scure } = require('../index.js');
const { initializeScure } = require('../scure/scure-initializer');

describe('El Cubo - when picking up', () => {
  let data;
  beforeEach(() => {
    data = initializeScure(scure, {});
  });

  it('tells you item unknown when no arg', () => {
    const request = aDfaRequest()
      .withIntent('Pickup')
      .withData({ numCommands: 23 })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.equal(scure.sentences.get('item-unknown'));
  });

  it('tells you item unknown when invalid arg', () => {
    const request = aDfaRequest()
      .withIntent('Pickup')
      .withArgs({ arg: 'not a valid object' })
      .withData({ roomId: 'cuboA' })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('No veo el objeto not a valid object por aquí');
  });

  it('tells you item unknown when arg, but in different room', () => {
    const request = aDfaRequest()
      .withIntent('Pickup')
      .withArgs({ arg: 'palanca' })
      .withData({ roomId: 'cuboA' })
      .build();

    appExecutor(request);

    const itemName = scure.items.getItem('cuboB-crowbar').name.toLowerCase();
    expect(getDfaV2Conv().lastAsk).to.contains(`No veo el objeto ${itemName} por aquí`);
  });

  it('tells you it cannot be picked when item not pickable', () => {
    const request = aDfaRequest()
      .withIntent('Pickup')
      .withArgs({ arg: 'Cadenas' })
      .withData({ roomId: 'cuboA' })
      .build();

    appExecutor(request);

    const itemName = scure.items.getItem('cuboA-cadenas').name.toLowerCase();
    expect(getDfaV2Conv().lastAsk).to.contains(`No puedo llevarme el objeto ${itemName}`);
  });

  it('tells you it cannot be picked when item already picked up', () => {
    const request = aDfaRequest()
      .withIntent('Pickup')
      .withArgs({ arg: 'palanca' })
      .withData({ roomId: 'cuboB', picked: ['cuboB-crowbar'] })
      .build();

    appExecutor(request);

    const itemName = scure.items.getItem('cuboB-crowbar').name.toLowerCase();
    expect(getDfaV2Conv().lastAsk).to.contains(`Ya me llevé el objeto ${itemName}.`);
  });

  describe('when valid objects', () => {
    beforeEach(() => {
      const request = aDfaRequest()
        .withIntent('Pickup')
        .withArgs({ arg: 'palanca' })
        .withData({ roomId: 'cuboB' })
        .build();

      appExecutor(request);
    });

    it('tells you it picked it up when valid arg', () => {
      const itemName = scure.items.getItem('cuboB-crowbar').name.toLowerCase();
      expect(getDfaV2Conv().lastAsk).to.contains(`Me llevo el objeto ${itemName} conmigo`);
    });

    it('adds the object to inventory', () => {
      expect(getDfaV2Conv().data.inventory).to.eql(['cuboB-crowbar']);
    });

    it('marks it as picked up', () => {
      expect(getDfaV2Conv().data.picked).to.eql(['cuboB-crowbar']);
    });
  });

  xit('tells an aditional response if the item has an aditional picking response', () => {
    const request = aDfaRequest()
      .withIntent('Pickup')
      .withArgs({ arg: 'cuadro' })
      .withData({ roomId: 'habitacion-108' })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('Me llevo el objeto cuadro conmigo');
    expect(getDfaV2Conv().lastAsk).to.contains('Veo que al llevarme el cuadro');
  });

  it('tells you first that it has it, if item already in inventory', () => {
    const request = aDfaRequest()
      .withIntent('Pickup')
      .withArgs({ arg: 'palanca' })
      .withData({ roomId: 'cuboB', inventory: ['cuboB-crowbar'] })
      .build();

    appExecutor(request);

    const itemName = scure.items.getItem('cuboB-crowbar').name.toLowerCase();
    expect(getDfaV2Conv().lastAsk).to.contains('Ya llevo conmigo');
    expect(getDfaV2Conv().lastAsk).to.contains(itemName);
  });
});

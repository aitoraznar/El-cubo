const elCubo = require('../index.js');

describe('El Cubo - inventory', () => {
  it('tells you your inventory', () => {
    const request = aDfaRequest()
      .withIntent('inventory')
      .withData({ inventory: ['dice'] })
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().lastAsk).to.contains('Llevo los siguientes objetos');
    expect(getDfaApp().lastAsk).to.contains('Dado');
  });

  it('tells you your inventory with multiple items', () => {
    const request = aDfaRequest()
      .withIntent('inventory')
      .withData({ inventory: ['cuboA-llaves', 'dice'] })
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().lastAsk).to.contains('Llevo los siguientes objetos');
    expect(getDfaApp().lastAsk).to.contains('Llave');
    expect(getDfaApp().lastAsk).to.contains('Dado');
  });

  xit('tells you your inventory with multiple items in English', () => {
    const request = aDfaRequest()
      .withIntent('inventory')
      .withData({ inventory: ['comedor-cartera', 'hab108-cuadro'] })
      .withLocale('en-US')
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().lastAsk).to.contains('carrying these items');
    expect(getDfaApp().lastAsk).to.contains('Wallet and Picture');
  });


  it('tells you that has nothing', () => {
    const request = aDfaRequest()
      .withIntent('inventory')
      .withData({ })
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().lastAsk).to.contains('No llevo nada encima.');
  });
});

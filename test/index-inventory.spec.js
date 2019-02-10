const { appExecutor, scure } = require('../index.js');
const { initializeScure } = require('../scure/scure-initializer');

describe('El Cubo - inventory', () => {
  let data;
  beforeEach(() => {
    data = initializeScure(scure, {});
  });

  it('tells you your inventory', () => {
    const request = aDfaRequest()
      .withIntent('Inventory')
      .withData({ inventory: ['dice'] })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('Llevo los siguientes objetos');
    expect(getDfaV2Conv().lastAsk).to.contains('Dado');
  });

  it('tells you your inventory with multiple items', () => {
    const request = aDfaRequest()
      .withIntent('Inventory')
      .withData({ inventory: ['cuboA-llaves', 'dice'] })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('Llevo los siguientes objetos');
    expect(getDfaV2Conv().lastAsk).to.contains('Llave');
    expect(getDfaV2Conv().lastAsk).to.contains('Dado');
  });

  xit('tells you your inventory with multiple items in English', () => {
    const request = aDfaRequest()
      .withIntent('Inventory')
      .withData({ inventory: ['comedor-cartera', 'hab108-cuadro'] })
      .withLocale('en-US')
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('carrying these items');
    expect(getDfaV2Conv().lastAsk).to.contains('Wallet and Picture');
  });


  it('tells you that has nothing', () => {
    const request = aDfaRequest()
      .withIntent('Inventory')
      .withData({ })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('No llevo nada encima.');
  });
});

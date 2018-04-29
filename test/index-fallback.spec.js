const elCubo = require('../index.js');

describe('when fallback', () => {


  it('tells yo no matching intent', () => {
    const request = aDfaRequest()
      .withIntent('input.unknown')
      .withData({ numCommands: 2 })
      .build();

    elCubo.elCubo(request);

    expect(getDfaApp().lastAsk).to.contains('No te entiendo');
  });
});

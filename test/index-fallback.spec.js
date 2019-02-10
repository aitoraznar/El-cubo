const { appExecutor, scure } = require('../index.js');
const { initializeScure } = require('../scure/scure-initializer');
const { StandardIntents } = require('../lib/common');

describe('when fallback', () => {
  let data;
  beforeEach(() => {
    data = initializeScure(scure, {});
  });

  it('tells you no matching intent', () => {
    const request = aDfaRequest()
      .withIntent(StandardIntents.NO_INPUT)
      .withData({ numCommands: 2 })
      .build();

    appExecutor(request);

    expect(getDfaV2Conv().lastAsk).to.contains('No te entiendo');
  });
});

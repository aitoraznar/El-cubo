const { appExecutor, scure } = require('../index.js');
const { initializeScure } = require('../scure/scure-initializer');

xdescribe('El Cubo - adds platform for analytics', () => {
  let data;
  beforeEach(() => {
    data = initializeScure(scure, {});
  });

  const TEST_CASES = [
    { source: 'google', expectedPlatform: 'google' }
  ];

  TEST_CASES.forEach((test) => {
    it('adds google assistant when welcome', () => {
      const request = aDfaRequest()
        .withIntent('Look')
        .withData({ platform: 'PREVIOUS_SETTED_PLATFORM' })
        .build();
      request.body.originalRequest = { source: test.source };

      appExecutor(request);

      expect(getDfaV2Conv().data.platform).to.equal(test.expectedPlatform);
    });
  });
});

const elCubo = require('../index.js');

describe('El Cubo - adds platform for analytics', () => {
  const TEST_CASES = [
    { source: 'google', expectedPlatform: 'google' }
  ];

  TEST_CASES.forEach((test) => {
    it('adds google assistant when welcome', () => {
      const request = aDfaRequest()
        .withIntent('look')
        .withData({ platform: 'PREVIOUS_SETTED_PLATFORM' })
        .build();
      request.body.originalRequest = { source: test.source };

      elCubo.elCubo(request);

      expect(getDfaApp().data.platform).to.equal(test.expectedPlatform);
    });
  });
});

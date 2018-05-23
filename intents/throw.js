const getArgument = require('../lib/common').getArgument;
const overwriteDataFrom = require('../lib/common').overwriteDataFrom;
const scureThrow = require('../scure/scure-throw').scureThrow;

const throwItem = scure => (app) => {
  const item = getArgument(app, 'item');
  const target = getArgument(app, 'target');

  const scureResponse = scureThrow(item, target, app.data, scure);

  overwriteDataFrom(scureResponse, app);
  app.ask(scureResponse.sentence);
};

exports.throw = throwItem;

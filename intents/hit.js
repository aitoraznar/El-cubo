const getArgument = require('../lib/common').getArgument;
const overwriteDataFrom = require('../lib/common').overwriteDataFrom;
const scureHit = require('../scure/scure-hit').scureHit;

const hit = scure => (app) => {
  const itemName = getArgument(app, 'arg');

  const scureResponse = scureHit(itemName, app.data, scure);

  overwriteDataFrom(scureResponse, app);
  app.ask(scureResponse.sentence);
};

exports.hit = hit;

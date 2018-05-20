const getArgument = require('../lib/common').getArgument;
const overwriteDataFrom = require('../lib/common').overwriteDataFrom;
const scureHit = require('../scure/scure-hit').scureHit;

const hit = scure => (app) => {
  const weapon = getArgument(app, 'weapon');
  const target = getArgument(app, 'target');

  const scureResponse = scureHit(weapon, target, app.data, scure);

  overwriteDataFrom(scureResponse, app);
  app.ask(scureResponse.sentence);
};

exports.hit = hit;

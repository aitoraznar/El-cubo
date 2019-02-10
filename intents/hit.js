const getArgument = require('../lib/common').getArgument;
const overwriteDataFrom = require('../lib/common').overwriteDataFrom;
const scureHit = require('../scure/scure-hit').scureHit;

const hit = scure => (conv, args) => {
  const weapon = getArgument(args, 'weapon');
  const target = getArgument(args, 'target');

  const scureResponse = scureHit(weapon, target, conv.data, scure);

  overwriteDataFrom(scureResponse, conv);
  conv.ask(scureResponse.sentence);
};

exports.hit = hit;

const getArgument = require('../lib/common').getArgument;
const overwriteDataFrom = require('../lib/common').overwriteDataFrom;
const scureWalk = require('../scure/scure-walk').scureWalk;

const walk = scure => (conv, args) => {
  const arg = getArgument(args, 'arg');

  const scureResponse = scureWalk(arg, conv.data, scure);

  overwriteDataFrom(scureResponse, conv);
  conv.ask(scureResponse.sentence);
};

exports.walk = walk;

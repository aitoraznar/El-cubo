const getArgument = require('../lib/common').getArgument;
const overwriteDataFrom = require('../lib/common').overwriteDataFrom;
const scureThrow = require('../scure/scure-throw').scureThrow;

const throwItem = scure => (conv, args) => {
  const item = getArgument(args, 'item');
  const target = getArgument(args, 'target');

  const scureResponse = scureThrow(item, target, conv.data, scure);

  overwriteDataFrom(scureResponse, conv);
  conv.ask(scureResponse.sentence);
};

exports.throw = throwItem;

const getArgument = require('../lib/common').getArgument;
const overwriteDataFrom = require('../lib/common').overwriteDataFrom;

const scurePickup = require('../scure/scure-pickup').scurePickup;

const pickup = scure => (conv, args) => {
  const itemName = getArgument(args, 'arg');

  const scureResponse = scurePickup(itemName, conv.data, scure);

  overwriteDataFrom(scureResponse, conv);
  conv.ask(scureResponse.sentence);
};

exports.pickup = pickup;

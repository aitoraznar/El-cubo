const getArgument = require('../lib/common').getArgument;
const overwriteDataFrom = require('../lib/common').overwriteDataFrom;
const scureLook = require('../scure/scure-look').scureLook;

const look = scure => (conv, args) => {
  const itemName = getArgument(args, 'arg');

  const scureResponse = scureLook(itemName, conv.data, scure);

  overwriteDataFrom(scureResponse, conv);
  conv.ask(scureResponse.sentence);
};

exports.look = look;

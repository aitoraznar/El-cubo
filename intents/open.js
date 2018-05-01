const getArgument = require('../lib/common').getArgument;
const overwriteDataFrom = require('../lib/common').overwriteDataFrom;
const scureOpen = require('../scure/scure-open').scureOpen;

const open = scure => (app) => {
  const hatchName = getArgument(app, 'arg');

  const scureResponse = scureOpen(hatchName, app.data, scure);

  overwriteDataFrom(scureResponse, app);
  app.ask(scureResponse.sentence);
};

exports.open = open;

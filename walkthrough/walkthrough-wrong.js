/* eslint-disable no-console */
require('./common.js');
const elCubo = require('../index.js');

const c = (intent, arg) => ({ intent, arg });

const commands = [
    c('input.unknown', ''),
    c('look', ''),
    c('look', 'cuerdas'),
    c('use', 'cuerda derecha'),
];

commands.forEach((command) => {
  console.log('\x1b[33mcommand', command, '\x1b[0m');
  const request = aDfaRequest()
    .withIntent(command.intent)
    .withArgs({ arg: command.arg })
    .withData(getDfaApp() ? getDfaApp().data : null)
    .build();

  elCubo.elCubo(request);

  if (getDfaApp().lastAsk) {
    console.log('RIC says: \x1b[31m', getDfaApp().lastAsk, '\x1b[0m');
    console.log('RICs data', getDfaApp().data);
  } else {
    console.log('\x1b[41m **** ENDING SCENE ***** \x1b[0m');
    console.log('RIC says: \x1b[31m', getDfaApp().lastTell, '\x1b[0m');
    console.log('RICs data', getDfaApp().data);
    console.log('\x1b[41m **** ENDING SCENE ***** \x1b[0m');
  }

});


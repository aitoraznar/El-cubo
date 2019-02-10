/* eslint-disable strict,no-console */

'use strict';

process.env.DEBUG = 'actions-on-google:*';
const { dialogflow } = require('actions-on-google');

const functions = require('firebase-functions');
const { Scure } = require('./scure/scure');
const { initializeScure } = require('./scure/scure-initializer');
const { isTimeOver, decodeLanguage, cleanData, StandardIntents } = require('./lib/common');

const welcome = require('./intents/others').welcome;
const startGame = require('./intents/startGame').startGame;
const walk = require('./intents/walk').walk;
const look = require('./intents/look').look;
const pickup = require('./intents/pickup').pickup;
const use = require('./intents/use').use;
const inventory = require('./intents/inventory').inventory;
const help = require('./intents/others').help;
const fallback = require('./intents/others').fallback;

const checkAndChangeLanguage = require('./intents/language').checkAndChangeLanguage;
const bye = require('./intents/others').bye;
const hit = require('./intents/hit').hit;
const throwIntent = require('./intents/throw').throw;
const gameDecision = require('./intents/gameDecision').gameDecision;
const manageGameDecision = require('./intents/gameDecision').manageGameDecision;

let scure = new Scure('es');
const isBeginning = (scure, conv) => conv.data.numCommands < scure.getInit().welcome.length;

const handleIntent = (intentFunction) => (conv, args) => {
  if (!mainGameThread(conv, args)) {
    return () => {};
  }

  return intentFunction(scure)(conv, args);
};

const mainGameThread = (conv, args) => {
  // console.log(`Body: ${JSON.stringify(conv.body)}`);
  // console.log(`Headers: ${JSON.stringify(conv.headers)}`);
  conv.data.language = decodeLanguage(conv.user && conv.user.locale === 'en' ? 'en' : 'es');
  console.log(`NumCommands: ${conv.data.numCommands} / Intent: ${conv.intent} / Action: ${conv.action} / Lang: ${conv.data.language} / Platform: ${conv.data.platform} / `);

  conv.data = initializeScure(scure, conv.data);

  // const languageChanged = checkAndChangeLanguage(scure, conv, args);
  // if (languageChanged) {
  //   conv.data.numCommands -= 1;
  //   return false;
  // }

  if (isTimeOver(conv, scure)) {
    cleanData(conv, args);
    conv.close(scure.sentences.get('end-timeover'));
    return false;
  }

  if (!conv.intent) {
    fallback(scure)(conv, args);
    return false;
  }

  //conv.data.gameDecision = 'cuboC-trap';

  if (conv.data.gameDecision && conv.intent !== StandardIntents.OPTION) {
    gameDecision(scure)(conv, args);
    return false;
  }

  return true;
};

const intentSet = (executor) => {
  executor.intent('Welcome Intent', handleIntent(welcome));
  executor.intent('Welcome Intent - yes', handleIntent(startGame));
  executor.intent('Help', handleIntent(help));
  executor.intent('Look', handleIntent(look));
  executor.intent('Walk', handleIntent(walk));
  executor.intent('Pickup', handleIntent(pickup));
  executor.intent('Use', handleIntent(use));
  executor.intent('Inventory', handleIntent(inventory));
  executor.intent('Hit', handleIntent(hit));
  executor.intent('Throw', handleIntent(throwIntent));
  executor.intent('Close', handleIntent(bye));
  executor.intent('Bye', handleIntent(bye));
  executor.intent(StandardIntents.NO_INPUT, handleIntent(fallback));
  executor.intent('GameDecisionOption', handleIntent(manageGameDecision));
  executor.intent('Exit - confirmation', handleIntent(bye));
  return executor;
};


const app = dialogflow({ debug: true })
  .use(intentSet);

exports.appExecutor = request => { intentSet(app)(request); };
exports.scure = scure;
exports.elCubo = functions.https.onRequest(app);
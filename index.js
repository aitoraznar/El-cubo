/* eslint-disable strict,no-console */

'use strict';

process.env.DEBUG = 'actions-on-google:*';
const DialogflowApp = require('actions-on-google').DialogflowApp;

const functions = require('firebase-functions');
const elCuboData = require('./ric-escape-data.js').data;
const buildScureFor = require('./scure/scure').buildScureFor;
const initialize = require('./intents/initializer').initialize;
const isTimeOver = require('./lib/common').isTimeOver;
const getLanguage = require('./lib/common').getLanguage;
const cleanData = require('./lib/common').cleanData;

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

const elCubo = (request, response) => {
  const appInit = new DialogflowApp({ request, response });
  const scure = buildScureFor(elCuboData[getLanguage(appInit, request)]);
  const app = initialize(scure, appInit, request);

  // console.log(`Body: ${JSON.stringify(request.body)}`);
  // console.log(`Headers: ${JSON.stringify(request.headers)}`);
  console.log(`Intent: ${app.data.numCommands} / ${app.getIntent()} / ${getLanguage(app, request) === 'en' ? 'en' : 'es'} / Platform: ${app.data.platform} / `);

  const languageChanged = checkAndChangeLanguage(scure, app);
  if (languageChanged) {
      app.data.numCommands -= 1;
      return;
  }

  if (isTimeOver(app.data)) {
      cleanData(app);
      app.tell(scure.sentences.get('end-timeover'));
      return;
  }

  if (!app.getIntent()) {
    fallback(scure)(app);
    return;
  }

  const actionMap = new Map();
  //actionMap.set('input.welcome', welcome(scure));
  actionMap.set('start.game', startGame(scure));
  actionMap.set('help', help(scure));
  actionMap.set('look', look(scure));
  actionMap.set('walk', walk(scure));
  actionMap.set('pickup', pickup(scure));
  actionMap.set('use', use(scure));
  actionMap.set('inventory', inventory(scure));
  actionMap.set('hit', hit(scure));
  actionMap.set('bye', bye(scure));
  actionMap.set('input.unknown', fallback(scure));
  //actionMap.set('_exit._exit-yes', bye(scure));

  app.handleRequest(actionMap);
};

exports.elCubo = functions.https.onRequest(elCubo);

const forceItemsToBeArray = (items) => {
  if (items && typeof items === 'object' && typeof items.length === 'number') return items;
  return [items];
};

const substitute = (sentence, args) => {
  const replacer = (s1, s2) => s1.replace(`{${s2}}`, args[s2]);
  return Object.keys(args).reduce(replacer, sentence);
};

exports.getArgument = (args, argName) => {
  console.log('=======>', 'getArgument', args, argName);
  if (!args) return null;
  const value = args[argName];
  if (!value) return null;
  if (typeof value === 'object' && typeof value.length === 'number') return value[0];
  return value;
};

exports.getArgumentList = (args, argName) => forceItemsToBeArray(args[argName]);

exports.isEmptyArg = (arg) => {
  if (!arg) return true;
  if (typeof arg.length !== 'undefined' && arg.length === 0) return true;
  if (JSON.stringify(arg).trim() === '[]') return true;
  if (JSON.stringify(arg).trim() === '{}') return true;
  if (arg.trim && (arg.trim() === '')) return true;
  return false;
};

exports.overwriteDataFrom = (scureResponse, conv) => {
  if (scureResponse.data) {
    conv.data = scureResponse.data;
  }
};

exports.getRawInput = (app, arg) => {
  // console.log('0>>>>>>>>>', 'getRawInput', app.request.inputs
  //   && app.request.inputs.length
  //   && app.request.inputs[0].rawInputs
  //   && app.request.inputs[0].rawInputs.length
  //   && app.request.inputs[0].rawInputs[0].query);
  return app.request.inputs
    && app.request.inputs.length
    && app.request.inputs[0].rawInputs
    && app.request.inputs[0].rawInputs.length
    && app.request.inputs[0].rawInputs[0].query;
};

exports.isEmptyArg = (arg) => {
  if (!arg) return true;
  if (typeof arg.length !== 'undefined' && arg.length === 0) return true;
  if (JSON.stringify(arg).trim() === '[]') return true;
  if (JSON.stringify(arg).trim() === '{}') return true;
  if (arg.trim && (arg.trim() === '')) return true;
  return false;
};

exports.overwriteDataFrom = (scureResponse, app) => {
  if (scureResponse.data) {
    app.data = scureResponse.data;
  }
};

exports.getLeftTimeFrom = (scure, app) => {
  const startTime = new Date(JSON.parse(app.data.startTime));
  const remainingTime = (scure.data.init.totalMinutes * 60) - ((new Date().getTime() - startTime.getTime()) / 1000);
  const minutes = Math.floor(remainingTime / 60);
  const seconds = Math.floor(remainingTime % 60);
  return scure.sentences.get('remaining-time', { minutes, seconds });
};

const decodeLanguage = (locale) => {
  if (locale.substr(0, 2) === 'en') return 'en';
  return 'es';
};

exports.decodeLanguage = decodeLanguage;

exports.isTimeOver = (app, scure) => {
  const startTime = new Date(JSON.parse(app.data.startTime || JSON.stringify(new Date())));
  const currentTime = new Date();

  return (currentTime.getTime() - startTime.getTime()) > (scure.data.init.totalMinutes * 60 * 1000);
};

exports.cleanData = (app) => {
  app.data.numCommands = 0;
  app.data.roomId = null;
  app.data.startTime = null;
  app.data.inventory = [];
  app.data.picked = [];
  app.data.opened = [];
  return app;
};

exports.baseChars = str => str.toLowerCase().replace(/[áäàÀÁÂÃÄÅ]/g, 'a')
  .replace(/[èéèÈÉÊË]/g, 'e')
  .replace(/[íìIÎ]/g, 'i')
  .replace(/[óòÓÔ]/g, 'o')
  .replace(/[úùüÙ]/g, 'u')
  .replace(/[çÇ]/g, 'c')
  .replace(/[ñÑ]/g, 'n')
  .replace(/[-\\?]/g, '');

exports.processContext = (conv) => {
  if (conv.data.lastContext) {
    conv.contexts.set(conv.data.lastContext, 1);
    conv.contexts.set('use-followup', 1);
    conv.data.lastContext = undefined;
  }
};

const shouldNotIncludeQuestion = sentence =>
(sentence.indexOf('?') >= sentence.length - 10) || (sentence.indexOf('<speak>') >= 0);

const getFinalSentence = (scure, conv, finalSentence) => {
  const timeLeft = scure.getLeftTimeFrom(conv.data.startTime);
  const remainingTime =
    scure.sentences.get('ending-remaining-time', { timeLeft });
  return substitute(finalSentence.description, { remainingTime });
};

exports.sendResponse = (conv, scure, scureResponse) => {
  const finalSentence = scureResponse.sentence;
  if (finalSentence.isEndingScene) {
    const finalWords = getFinalSentence(scure, conv, finalSentence);
    conv.close(finalWords);
  } else if (shouldNotIncludeQuestion(finalSentence)) {
    conv.ask(finalSentence);
  } else {
    const finalQuestion = scure.sentences.get('final-question');
    conv.ask(`${finalSentence} ${finalQuestion}`);
  }
};

const StandardIntents = {
  MAIN: 'actions.intent.MAIN',
  TEXT: 'actions.intent.TEXT',
  PERMISSION: 'actions.intent.PERMISSION',
  OPTION: 'actions.intent.OPTION',
  TRANSACTION_REQUIREMENTS_CHECK: 'actions.intent.TRANSACTION_REQUIREMENTS_CHECK',
  DELIVERY_ADDRESS: 'actions.intent.DELIVERY_ADDRESS',
  TRANSACTION_DECISION: 'actions.intent.TRANSACTION_DECISION',
  CONFIRMATION: 'actions.intent.CONFIRMATION',
  DATETIME: 'actions.intent.DATETIME',
  SIGN_IN: 'actions.intent.SIGN_IN',
  NO_INPUT: 'actions.intent.NO_INPUT',
  CANCEL: 'actions.intent.CANCEL',
  // 'actions.intent.NEW_SURFACE',
  // 'actions.intent.REGISTER_UPDATE',
  // 'actions.intent.CONFIGURE_UPDATES',
  // 'actions.intent.PLACE',
  // 'actions.intent.LINK',
  // 'actions.intent.MEDIA_STATUS',
  // 'actions.intent.COMPLETE_PURCHASE'
};
exports.StandardIntents = StandardIntents;
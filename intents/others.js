const getLeftTimeFrom = require('../lib/common').getLeftTimeFrom;
const { BasicCard } = require('actions-on-google');
const cleanData = require('../lib/common').cleanData;

const MAP_URL_SPANISH = 'https://ric-escape.firebaseconv.com/ric-escape-map.jpg';
const MAP_URL_ENGLISH = 'https://ric-escape.firebaseconv.com/ric-escape-map-en.jpg';

const welcome = scure => (conv, args) => {
  conv.ask(scure.getInit().welcome[0]);
};

const helpWithMap = scure => (conv, args) => {
  const time = getLeftTimeFrom(scure, conv);
  const helpText = scure.sentences.get('help', { time });
  const mapUrl = conv.data.language === 'en' ? MAP_URL_ENGLISH : MAP_URL_SPANISH;

  const mapCard = new BasicCard({
    text: helpText,
    image: new Image({
      url: mapUrl,
      alt: scure.sentences.get('map-alt')
    })
  });
  conv.ask(mapCard);
};

const helpWithoutMap = scure => (conv, args) => {
  const time = getLeftTimeFrom(scure, conv);
  const helpText = scure.sentences.get('help-no-screen', { time });
  conv.ask(helpText);
};

// eslint-disable-next-line no-confusing-arrow
const help = scure => (conv, args) => {
    helpWithoutMap(scure)(conv, args)
  //const capability = 'actions.capability.SCREEN_OUTPUT';
  //conv.surface.capabilities.has(capability)
    /*conv.hasSurfaceCapability(conv.SurfaceCapabilities.SCREEN_OUTPUT) ?
        helpWithMap(scure)(conv, args) :
        helpWithoutMap(scure)(conv, args);*/
};

const fallback = scure => (conv, args) => {
  if (conv.data.numCommands <= 1) {
    const noIntentMatch = scure.sentences.get('fallback');
    conv.ask(noIntentMatch);
    return;
  }
  const time = getLeftTimeFrom(scure, conv);
  conv.ask(scure.sentences.get('fallback', { time }));
};

const bye = scure => (conv, args) => {
  conv = cleanData(conv, args);
  conv.data = null;
  conv.close(scure.sentences.get('bye'));
};

exports.help = help;
exports.fallback = fallback;
exports.welcome = welcome;
exports.bye = bye;

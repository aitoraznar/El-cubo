const getArgumentList = require('../lib/common').getArgumentList;
const getLeftTimeFrom = require('../lib/common').getLeftTimeFrom;
const scureUse = require('../scure/scure-use').scureUse;
const overwriteDataFrom = require('../lib/common').overwriteDataFrom;

const use = scure => (conv, args) => {
  const items = getArgumentList(args, 'arg');

  const scureResponse = scureUse(items, conv.data, scure);

  overwriteDataFrom(scureResponse, conv);

  const finalSentence = scureResponse.sentence;
  if (finalSentence.isEndingScene) {
    const endingRemainingTime = scure.sentences.get('ending-remaining-time',
      { timeLeft: getLeftTimeFrom(scure, conv) });
    const finalWords = `${finalSentence.description} ${endingRemainingTime}`;
    conv.close(finalWords);
  } else {
    conv.ask(finalSentence);
  }
};

exports.use = use;

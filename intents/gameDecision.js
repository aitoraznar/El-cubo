const overwriteDataFrom = require('../lib/common').overwriteDataFrom;
const scureGameDecision = require('../scure/scure-game-decision').scureGameDecision;

const gameDecision = scure => (conv, args) => {
  if (!conv.data.gameDecision) {
    return;
  }

  const gameDecision = scureGameDecision(conv.data, scure);
  overwriteDataFrom(gameDecision, conv);

  console.log('gameDecision', 'isWaitingResponse', gameDecision.isWaitingResponse);
  if (!gameDecision.isWaitingResponse) {
    gameDecision.isWaitingResponse = true;

    console.log('gameDecision', 'buildList');
    /*let options = [];
    gameDecision.options.forEach(option => {
      options.push({
        title: option.text,
        synonyms: option.synonyms
      });
    });
    let optionList = conv.buildList({
      title: gameDecision.question,
      items: options
    });*/

    console.log('gameDecision', 'askWithList', gameDecision.title);
    conv.ask(gameDecision.title);
    conv.ask(gameDecision.question, gameDecision.options);
  }
};

const manageGameDecision = scure => (conv, args) => {
  if (!conv.data.gameDecision) {
    return;
  }

  const gameDecision = scureGameDecision(conv.data, scure);
  overwriteDataFrom(gameDecision, conv);

  console.log('manageGameDecision>>>>>>>>>', 'isWaitingResponse', gameDecision.isWaitingResponse);
  if (gameDecision.isWaitingResponse) {
    const selectedOptionId = conv.getSelectedOption();
    console.log('manageGameDecision22222>>>>>>>>>', 'getSelectedOption', conv.getSelectedOption());
    const selectedOption = scure.gameDecisions.getGameDecisionOptions(selectedOptionId, gameDecision);

    if (selectedOption) {
      //Make 'gameDecision' as resolved
      gameDecision.isWaitingResponse = false;
      conv.data.gameDecision = null;

      conv.close(selectedOption.postDescription);
    }

  }
};

exports.gameDecision = gameDecision;
exports.manageGameDecision = manageGameDecision;

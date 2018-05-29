const overwriteDataFrom = require('../lib/common').overwriteDataFrom;
const scureGameDecision = require('../scure/scure-game-decision').scureGameDecision;

const gameDecision = scure => (app) => {
  if (!app.data.gameDecision) {
    return;
  }

  const gameDecision = scureGameDecision(app.data, scure);
  overwriteDataFrom(gameDecision, app);

  console.log('gameDecision00000>>>>>>>>>', gameDecision.isWaitingResponse);
  if (!gameDecision.isWaitingResponse) {
    gameDecision.isWaitingResponse = true;

    let optionList = app.buildList(gameDecision.question);
    let options = [];
    gameDecision.options.forEach(option => {
      options.push(app.buildOptionItem(option.id, option.synonyms)
        .setTitle(option.text));
    });
    optionList.addItems(options);

    app.askWithList(gameDecision.title, optionList);
  }
};

const manageGameDecision = scure => (app) => {
  if (!app.data.gameDecision) {
    return;
  }

  const gameDecision = scureGameDecision(app.data, scure);
  overwriteDataFrom(gameDecision, app);

  console.log('manageGameDecision>>>>>>>>>', gameDecision.isWaitingResponse);
  if (gameDecision.isWaitingResponse) {
    const selectedOptionId = app.getSelectedOption();
    console.log('manageGameDecision22222>>>>>>>>>', app.getSelectedOption());
    const selectedOption = scure.gameDecisions.getGameDecisionOptions(selectedOptionId, gameDecision);

    if (selectedOption) {
      //Make 'gameDecision' as resolved
      gameDecision.isWaitingResponse = false;
      app.data.gameDecision = null;

      app.tell(selectedOption.postDescription);
    }

  }
};

exports.gameDecision = gameDecision;
exports.manageGameDecision = manageGameDecision;

const aResponse = require('./scure-response').aResponse;

const scureGameDecision = (data, scure) => {
  console.log('[scureGameDecision]', `gameDecision=${data.gameDecision})`);

  if (!data.gameDecision) {
    return aResponse('ERROR, Empty Game Decision');
  }

  const gameDecision = scure.gameDecisions.getGameDecision(data.gameDecision);

  return gameDecision;
};

exports.scureGameDecision = scureGameDecision;

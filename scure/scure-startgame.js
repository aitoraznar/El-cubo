const aResponse = require('./scure-response').aResponse;

const scureStartGame = (data, scure) => {
  const response = scure.sentences.get('game-intro');

  return aResponse(response);
};

exports.scureStartGame = scureStartGame;

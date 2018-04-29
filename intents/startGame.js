const scureStartGame = require('../scure/scure-startgame').scureStartGame;

const startGame = scure => (app) => {
  const scureResponse = scureStartGame(app.data, scure);

  app.ask(scureResponse.sentence);
};

exports.startGame = startGame;

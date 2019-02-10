const scureStartGame = require('../scure/scure-startgame').scureStartGame;

const startGame = scure => (conv, args) => {
  const scureResponse = scureStartGame(conv.data, scure);

  conv.ask(scureResponse.sentence);
};

exports.startGame = startGame;

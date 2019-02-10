const scureInventory = require('../scure/scure-inventory').scureInventory;

const inventory = scure => (conv, args) => {
  const scureResponse = scureInventory(conv.data, scure);

  conv.ask(scureResponse.sentence);
};

exports.inventory = inventory;

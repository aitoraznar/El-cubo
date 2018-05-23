const isEmptyArg = require('../lib/common').isEmptyArg;
const aResponse = require('./scure-response').aResponse;

const scureThrow = (itemName, targetName, data, scure) => {
  return aResponse(`No quiero tirar ${itemName} a ${targetName}, ${itemName} es muy preciado para mi`, data);


  if (isEmptyArg(targetName)) {
    return aResponse(scure.sentences.get('no-target-to-throw'), data);
  }

  return aResponse(scure.sentences.get('cant-attack-not-seen', {enemy: targetName}), data);
};

exports.scureThrow = scureThrow;

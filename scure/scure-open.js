const isEmptyArg = require('../lib/common').isEmptyArg;
const aResponse = require('./scure-response').aResponse;

const scureOpen = (hatchName, data, scure) => {
  const roomId = data.roomId;
  const hatch = scure.hatchs.getHatchByName(hatchName);

  if (isEmptyArg(hatchName)) {
      return aResponse(scure.sentences.get('item-notopeneable', { name: hatchName }));
  }

  if (!hatch) {
      return aResponse(scure.sentences.get('item-notopeneable', { name: hatchName }));
  }

  const isInLocation = (hatch.location === null) || (roomId === hatch.location && hatch.location !== null);
  if (!isInLocation) {
      return aResponse(scure.sentences.get('hatch-notseen'));
  }

  //Check if the Hatch is locked (Cannot be opened)
  if (hatch.isLocked) {
      return aResponse(scure.sentences.get('hatch-locked'));
  }

  //Open Hatch
  const isFirstTimeOpened = scure.hatchs.isOpened(hatch.id);
  scure.hatchs.openHatch(hatch.id);

  let response = scure.sentences.get('hatch-opened', { name: hatch.name });

  const openedCondition = hatch.description.find(desc => desc.condition.startsWith('opened'));
  //Add the description of the next cube
  if (isFirstTimeOpened) {
      response += ` ${openedCondition.description} `;
  }

  return aResponse(response, data);
};

exports.scureOpen = scureOpen;

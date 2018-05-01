const isEmptyArg = require('../lib/common').isEmptyArg;
const aResponse = require('./scure-response').aResponse;
const getPossibleDestinationsSentence = require('./scure-commons').getPossibleDestinationsSentence;
const getDescription = require('./scure-commons').getDescription;

const ROOM_SYNS = ['habitación', 'habitacion', 'lugar', 'lugares'];

const scureLook = (itemName, data, scure) => {
  const roomId = data.roomId;
  const item = scure.items.getBestItem(itemName, roomId, scure);
  const hatch = scure.hatchs.getBestHatch(itemName, roomId, scure);

  if (isEmptyArg(itemName) || (ROOM_SYNS.indexOf(itemName) >= 0)) {
    const room = scure.rooms.getRoom(roomId);

    //Devuelve la descripción con todos los destinos diponibles
    /*return aResponse(
      `${getDescription(room.description, data, scure)} ${getPossibleDestinationsSentence(scure, data)}`
    );*/
    return aResponse(`${getDescription(room.description, data, scure)}`);
  }

  if (!(item || hatch)) {
    return aResponse(scure.sentences.get('item-not-in-location'));
  }

  if (item) {
      return aResponse(getDescription(item.description, data, scure));

      const isInInventory = scure.items.isInInventory(item.id, data.inventory);
      const isInLocation = (item.location === null) || (roomId === item.location && item.location !== null);
      if (!isInInventory && !isInLocation) {
          return aResponse(scure.sentences.get('item-not-in-location'));
      }

  } else if (hatch) {
      return aResponse(getDescription(hatch.description, data, scure));
  }

  return aResponse(scure.sentences.get('item-not-in-location'));
};

exports.scureLook = scureLook;

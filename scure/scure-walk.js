const isEmptyArg = require('../lib/common').isEmptyArg;
const getLeftTimeFrom = require('../lib/common').getLeftTimeFrom;
const aResponse = require('./scure-response').aResponse;
const getPossibleDestinationsSentence = require('./scure-commons').getPossibleDestinationsSentence;
const getDescription = require('./scure-commons').getDescription;

const scureWalk = (arg, data, scure) => {
  const availableRoomIds = scure.rooms.getAllDestinationsIds(data.roomId);
  const unlockedRoomIds = scure.rooms.getUnlockedDestinationsIds(data.roomId, data.unlocked);

  if (isEmptyArg(arg) && !unlockedRoomIds.length) {
    const noUnlockedPlaceSentence = scure.sentences.get('destination-no-one');
    return aResponse(noUnlockedPlaceSentence);

  } else if (isEmptyArg(arg) && availableRoomIds.length) {
    return aResponse(getPossibleDestinationsSentence(scure, data));

  } else if (isEmptyArg(arg)) {
      return aResponse(getPossibleDestinationsSentence(scure, data));
  }

  const newRoom = scure.rooms.getRoomByName(arg);
  if (newRoom) {
      const isAvailableRoom = availableRoomIds.indexOf(newRoom.id) > -1;
      if (!isAvailableRoom) {
          const unreachablePlaceSentence = scure.sentences.get('destination-unreachable', { destination: arg  });
          return aResponse(`${unreachablePlaceSentence}`);
      }
  }

  //const unlockedRoomIds = scure.rooms.getUnlockedDestinationsIds(data.roomId, data.unlocked);
  if (newRoom && !unlockedRoomIds.length) {
    const noUnlockedPlaceSentence = scure.sentences.get('destination-no-one');
    return aResponse(noUnlockedPlaceSentence);
  }

  //const newRoom = scure.rooms.getRoomByName(arg);
  const isAllowed = scure.rooms.isAllowedDestination(arg, data.roomId, data.unlocked);
  if (!newRoom || !isAllowed) {
    const unknownPlaceSentence = scure.sentences.get('destination-unknown', { destination: arg  });
    let response = `${unknownPlaceSentence}`;
    if (newRoom && !isAllowed) {
      const destinationsSentence = getPossibleDestinationsSentence(scure, data);
      response += ` ${destinationsSentence}`
    }
    return aResponse(response);
  }

  const currentRoom = scure.rooms.getRoom(data.roomId);

  //Handle new Room change
  data.roomId = newRoom.id;

  let response = ``;
  if (currentRoom.events && currentRoom.events.exit) {
      response += ` ${currentRoom.events.exit} `;
  }
  response += getDescription(newRoom.description, data, scure);
  if (newRoom.events && newRoom.events.enter) {
      response += ` ${newRoom.events.enter}`;

      //Se ha abierto la primera Escotilla
      if (!scure.data.firstEverOpenedHatch) {
          scure.data.firstEverOpenedHatch = true;
          response += ` ${getLeftTimeFrom(scure, data)}`;
      }
  }

  return aResponse(response, data);
};

exports.scureWalk = scureWalk;

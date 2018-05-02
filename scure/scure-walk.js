const isEmptyArg = require('../lib/common').isEmptyArg;
const getLeftTimeFrom = require('../lib/common').getLeftTimeFrom;
const aResponse = require('./scure-response').aResponse;
const getPossibleDestinationsSentence = require('./scure-commons').getPossibleDestinationsSentence;
const getDescription = require('./scure-commons').getDescription;

const scureWalk = (arg, data, scure) => {
  if (isEmptyArg(arg)) {
    return aResponse(getPossibleDestinationsSentence(scure, data));
  }
  const newRoom = scure.rooms.getRoomByName(arg);
  const isAllowed = scure.rooms.isAllowedDestination(arg, data.roomId, data.unlocked);
  if (!newRoom || !isAllowed) {
    const destinationsSentence = getPossibleDestinationsSentence(scure, data);
    const unknownPlaceSentence = scure.sentences.get('destination-unknown', { destination: arg  });
    return aResponse(`${unknownPlaceSentence} ${destinationsSentence}`);
  }
  data.roomId = newRoom.id;

  //Se ejecuan los Eventos de texto al entrar y salir
  /*let response = '';
  if (hatch.events && hatch.events.before) {
      response += ` ${hatch.events.before} `;
  }
  response += getDescription(hatch.description, data, scure);
  if (hatch.events && hatch.events.after) {
      response += ` ${hatch.events.after} `;

      //Se ha abierto la primera Escotilla
      if (!scure.data.firstEverOpenedHatch) {
          scure.data.firstEverOpenedHatch = true;
          response += ` ${getLeftTimeFrom(scure, data)} `;
      }
  }*/

  return aResponse(getDescription(newRoom.description, data, scure), data);
};

exports.scureWalk = scureWalk;

const isEmptyArg = require('../lib/common').isEmptyArg;
const aResponse = require('./scure-response').aResponse;

const scureThrow = (itemName, targetName, data, scure) => {
  //return aResponse(`No quiero tirar ${itemName} a ${targetName}, ${itemName} es muy preciado para mi`, data);
  //console.log(`>>>>>>>>>>>>>>>> itemName: ${itemName} | targetName: ${targetName}`);

  if (isEmptyArg(itemName)) {
    return aResponse(scure.sentences.get('throw-noarg'), data);
  }

  const item = scure.items.getItemByName(itemName);
  if (!item) {
    return aResponse(scure.sentences.get('no-item-to-throw', { item: itemName }), data);
  }

  let target = scure.items.getItemByName(targetName);
  if (!target) {
    //Default current room's floor
    const currentRoom = scure.rooms.getRoom(data.roomId);
    target = currentRoom;
  }

  const isInInventory = scure.items.isInInventory(item.id, data.inventory);
  if (!isInInventory) {
    return aResponse(scure.sentences.get('no-item-to-throw', { item: itemName }), data);
  }

  //TODO Error if target not seen
  if (false) {
    //return aResponse(scure.sentences.get('no-item-to-throw', { item: itemName }), data);
  }

  scure.items.throw(item, target, data);

  return aResponse(scure.sentences.get('item-thrown-in-place', { item: itemName, target: target.name }), data);
  //return aResponse(scure.sentences.get('cant-throw-not-seen', { enemy: targetName }), data);
};

exports.scureThrow = scureThrow;

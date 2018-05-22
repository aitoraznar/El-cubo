const isEmptyArg = require('../lib/common').isEmptyArg;
const aResponse = require('./scure-response').aResponse;

const unlockIfDeadEnemy = (enemy, data) => {
  if (enemy.life <= 0) {
    data.unlocked = data.unlocked || [];
    if (data.unlocked.indexOf(enemy.id) === -1) {
      data.unlocked.push('dead-' + enemy.id);
    }
  }
  return data;
};

let lastAttack;
const scureHit = (weaponName, targetName, data, scure) => {
  console.log('[scureHit]', `weaponName: ${weaponName} - targetName: ${targetName}`);
  if (isEmptyArg(targetName)) {
    return aResponse(scure.sentences.get('no-target-to-attack'), data);
  }

  let enemy = scure.enemies.getEnemyByName(targetName);
  let enemyInRoom = scure.enemies.getEnemyByNameAndRoom(targetName, data.roomId, data.unlocked);
  //Enemy is in another Room
  if (enemy && !enemyInRoom) {
    return aResponse(scure.sentences.get('cant-attack-not-seen', {enemy: targetName}), data);
  }

  if (!enemy) {
    return aResponse(scure.sentences.get('cant-attack-to-target', {enemy: targetName}), data);
  }

  //Enemy is Dead
  if (scure.enemies.isDead(enemy.id, data.deadList)) {
    return aResponse(scure.sentences.get('cant-attack-dead-target'), data);
  }

  //Use hands if no weapon provided
  let weapon;
  if (isEmptyArg(weaponName)) {
    //Use default weapon
    weapon = scure.items.getItem('fist');
  }

  //Use hands if invalid weapon provided
  weapon = scure.items.getItemByName(weaponName);
  if (!(weapon && weapon.isWeapon)) {
    weapon = scure.items.getItem('fist');
  }

  //Hit
  scure.enemies.hit(enemy, weapon, data);

  unlockIfDeadEnemy(enemy, data);

  const isDead = scure.enemies.isDead(enemy.id, data.deadList);
  if (isDead) {
    let response = scure.sentences.get('hit-target-dead', {target: enemy.name, weapon: weapon.name, points: weapon.damage});
    return aResponse(response);
  }

  if (!isDead) {
    let response = scure.sentences.get('hit-target', {target: enemy.name, weapon: weapon.name, points: weapon.damage});
    return aResponse(response);
  }
};

exports.scureHit = scureHit;

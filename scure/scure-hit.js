const isEmptyArg = require('../lib/common').isEmptyArg;
const aResponse = require('./scure-response').aResponse;


let weapons = {
  'cuchillo': 15, 'apuñalar': 15,
    'pistola': 25, 'pipa': 25,
    'bate': 10, 'barra metálica': 10, 'palo': 10, 'palanca': 10,
    'metralleta': 50, 'uzi': 50, 'semiautomatica': 50,
    'puño': 5, 'puñetazo': 5, 'hostión': 5
};

const scureHit = (arg, data, scure) => {
  let weaponSelected = weapons[arg];

  if (isEmptyArg(arg) || !weaponSelected) {
    return aResponse('Tienes que pegarle con un arma...', data);
  }

  if (data.life > 0 && data.life > weaponSelected) {
      data.life -= weaponSelected;
  } else {
      let result = `Muerto`;
      return aResponse(result, data);
  }

  let result = `Le has quitado ${weaponSelected} de vida con el ${arg}, le queda ${data.life} puntos de vida`;
  return aResponse(result, data);
};

exports.scureHit = scureHit;

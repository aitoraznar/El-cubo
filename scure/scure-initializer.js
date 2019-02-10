const initializeStartingData = (scure, data) => {
  data.startTime = data.startTime || JSON.stringify(new Date());
  data.life = data.life || scure.getInit().life;
  data.roomId = data.roomId || scure.getInit().roomId;

  return data;
};

const increaseNumCommand = (data) => {
  const getNextNumCommand = num => (!num ? 1 : (num + 1));
  data.numCommands = getNextNumCommand(data.numCommands);
  return data;
};

const hasSource = request => request && request.body && request.body.originalRequest && request.body.originalRequest.source;

const updatePlatform = (data) => {
  //TODO Add current platform: google, faceebok, telegram, etc
  // if (hasSource(request)) {
  //   app.data.platform = request.body.originalRequest.source;
  // }
  return data;
};

const initializeScure = (scure, data) => {
  data = data || {};
  data.language = data.language;
  data = initializeStartingData(scure, data);
  data = increaseNumCommand(data);
  data = updatePlatform(data);
  return data;
};

exports.initializeScure = initializeScure;

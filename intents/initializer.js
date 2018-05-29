const getLanguage = require('../lib/common').getLanguage;

const initializeStartingData = (scure, newApp) => {
  newApp.StandardIntents = { OPTION: 'OPTION' };
  newApp.data.startTime = newApp.data.startTime || JSON.stringify(new Date());
  newApp.data.life = newApp.data.life || scure.getInit().life;
  newApp.data.roomId = newApp.data.roomId || scure.getInit().roomId;

  return newApp;
};

const increaseNumCommand = (app) => {
  const getNextNumCommand = num => (!num ? 1 : (num + 1));
  const newApp = app;
  newApp.data.numCommands = getNextNumCommand(newApp.data.numCommands);
  return newApp;
};

const updateLanguage = (app, request) => {
  app.data.language = getLanguage(app, request);
  return app;
};

const hasSource = request => request && request.body && request.body.originalRequest && request.body.originalRequest.source;

const updatePlatform = (app, request) => {
  if (hasSource(request)) {
    app.data.platform = request.body.originalRequest.source;
  }
  return app;
};

const initialize = (scure, app, request) => {
  let newApp = app;
  newApp.data = app.data || {};
  newApp = initializeStartingData(scure, newApp);
  newApp = increaseNumCommand(newApp);
  newApp = updateLanguage(newApp, request);
  newApp = updatePlatform(newApp, request);
  return newApp;
};

exports.initialize = initialize;

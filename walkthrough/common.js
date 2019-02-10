const actionsOnGoogle = require('actions-on-google');
const { DialogflowV2Mock, aDfaV2Request, getDfaV2App } = require('../mock/dialogflowapp-mock');


actionsOnGoogle.dialogflow = DialogflowV2Mock;

global.aDfaRequest = aDfaV2Request;
global.getDfaApp = getDfaV2App;
global.getDfaV2Conv = () => getDfaV2App().conv;

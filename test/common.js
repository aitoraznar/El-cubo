require('babel-register');
const actionsOnGoogle = require('actions-on-google');
const { DialogflowV2Mock, aDfaV2Request, getDfaV2App } = require('../mock/dialogflowapp-mock');
const { Scure } = require('../scure/scure');

global.chai = require('chai');
global.sinon = require('sinon');


global.chai.should();

global.expect = global.chai.expect;


actionsOnGoogle.dialogflow = DialogflowV2Mock;

global.aDfaRequest = aDfaV2Request;
global.getDfaApp = getDfaV2App;
global.getDfaV2Conv = () => getDfaV2App().conv;

global.buildTestScure = () => new Scure('es');

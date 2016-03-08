/** Main app **/

'use strict';

var ng = require('angular');
var config = require('./config');
var constants = require('./constants');
var services = require('./angularservices');
var controllers = require('./angularcontrollers');
var directives = require('./angulardirectives');

var animateModule = require('angular-animate');
var translateModule = require('angular-translate');
var sanitizeModule = require('angular-sanitize');
var blockUIModule = require('angular-block-ui');
var uiRouterModule = require('angular-ui-router');

require('angular-block-ui/dist/angular-block-ui.min.css');

var moduleName = config.configBlock.namespace;

// Declare app level module which depends on services, controllers and directives
ng.module(moduleName, [animateModule, translateModule, sanitizeModule, blockUIModule, uiRouterModule,
    services.servicesModule.name, controllers.controllersModule.name, directives.directivesModule.name,
    'inform', 'inform-exception'/*, 'inform-http-exception'*/
]);

ng.module(moduleName)
  .config(config.configBlock.settings)
  .config(config.configBlock.states)
  .config(config.configBlock.blockUI)
  .config(config.configBlock.inform)
  .config(config.configBlock.hrefSanitize);

ng.module(moduleName)
  .constant('CONSTANTS', constants.constants);

var runBlock = function() {

    // Add code that needs a run block to execute here.
};

ng.module(moduleName)
  .run(runBlock);
  // .run(config.configBlock.modal);

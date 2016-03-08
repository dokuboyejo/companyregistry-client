var ng = require('angular');
var MainViewController = require('./components/common/MainViewController');
var SideNavViewController = require('./components/nav/SideNavViewController');
var BeneficiaryViewController = require('./components/beneficiary/BeneficiaryViewController');
var CompanyViewController = require('./components/company/CompanyViewController');
var config = require('./config');

var moduleName = config.configBlock.namespace + '.controllers';
var controllersModule = ng.module(moduleName, [])
    .controller('MainViewController', MainViewController.controller)
    .controller('SideNavViewController', SideNavViewController.controller)
    .controller('BeneficiaryViewController', BeneficiaryViewController.controller)
    .controller('CompanyViewController', CompanyViewController.controller);

exports.controllersModule = controllersModule;

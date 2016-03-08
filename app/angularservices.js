var ng = require('angular');
var BeneficiaryService = require('./components/beneficiary/BeneficiaryService');
var CompanyService = require('./components/company/CompanyService');
var UtilService = require('./components/common/UtilService');
var config = require('./config');

var moduleName = config.configBlock.namespace + '.services';
var servicesModule = ng.module(moduleName, [])
    .factory('beneficiaryService', BeneficiaryService.service)
    .factory('companyService', CompanyService.service)
    .factory('utilService', UtilService.service);

exports.servicesModule = servicesModule;

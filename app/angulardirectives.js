var ng = require('angular');
var MainViewDirective = require('./components/common/MainViewDirective');
var SideNavViewDirective = require('./components/nav/SideNavViewDirective');
var BeneficiaryViewDirective = require('./components/beneficiary/BeneficiaryViewDirective');
var BeneficiaryCreateViewDirective = require('./components/beneficiary/BeneficiaryCreateViewDirective');
var BeneficiaryUpdateViewDirective = require('./components/beneficiary/BeneficiaryUpdateViewDirective');
var BeneficiaryDeleteViewDirective = require('./components/beneficiary/BeneficiaryDeleteViewDirective');
var BeneficiaryListViewDirective = require('./components/beneficiary/BeneficiaryListViewDirective');
var BeneficiaryListFragmentViewDirective = require('./components/beneficiary/BeneficiaryListFragmentViewDirective');
var BeneficiaryDetailViewDirective = require('./components/beneficiary/BeneficiaryDetailViewDirective');
var BeneficiarySearchViewDirective = require('./components/beneficiary/BeneficiarySearchViewDirective');
var CompanyViewDirective = require('./components/company/CompanyViewDirective');
var CompanyCreateViewDirective = require('./components/company/CompanyCreateViewDirective');
var CompanyUpdateViewDirective = require('./components/company/CompanyUpdateViewDirective');
var CompanyDeleteViewDirective = require('./components/company/CompanyDeleteViewDirective');
var CompanyListViewDirective = require('./components/company/CompanyListViewDirective');
var CompanyListFragmentViewDirective = require('./components/company/CompanyListFragmentViewDirective');
var CompanySearchViewDirective = require('./components/company/CompanySearchViewDirective');
var config = require('./config');

var moduleName = config.configBlock.namespace + '.directives';

var directivesModule = ng.module(moduleName, [])
    .directive('mainView', MainViewDirective.directive)
    .directive('sideNavView', SideNavViewDirective.directive)
    .directive('beneficiaryView', BeneficiaryViewDirective.directive)
    .directive('beneficiaryCreateView', BeneficiaryCreateViewDirective.directive)
    .directive('beneficiaryUpdateView', BeneficiaryUpdateViewDirective.directive)
    .directive('beneficiaryDeleteView', BeneficiaryDeleteViewDirective.directive)
    .directive('beneficiaryDetailView', BeneficiaryDetailViewDirective.directive)
    .directive('beneficiarySearchView', BeneficiarySearchViewDirective.directive)
    .directive('beneficiaryListView', BeneficiaryListViewDirective.directive)
    .directive('beneficiaryListDetailView', BeneficiaryListViewDirective.directive)
    .directive('beneficiaryListFragmentView', BeneficiaryListFragmentViewDirective.directive)
    .directive('companyView', CompanyViewDirective.directive)
    .directive('companyCreateView', CompanyCreateViewDirective.directive)
    .directive('companyUpdateView', CompanyUpdateViewDirective.directive)
    .directive('companyDeleteView', CompanyDeleteViewDirective.directive)
    .directive('companySearchView', CompanySearchViewDirective.directive)
    .directive('companyListView', CompanyListViewDirective.directive)
    .directive('companyListFragmentView', CompanyListFragmentViewDirective.directive)

exports.directivesModule = directivesModule;

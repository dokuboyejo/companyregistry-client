/**
 * Company Search Component Directive
 *
 * @ngInject
 */
var directive = function () {
    'use strict';
    return {
        templateUrl: 'app/components/company/CompanySearchView.html',
        restrict: 'AE',
        scope: false,
        controllerAs: 'ctrl',
        controller: 'CompanyViewController'
    };
};

exports.directive = directive;

/**
 * Company Create Component Directive
 *
 * @ngInject
 */
var directive = function () {
    'use strict';
    return {
        templateUrl: 'app/components/company/CompanyCreateView.html',
        restrict: 'AE',
        scope: false,
        controllerAs: 'ctrl',
        controller: 'CompanyViewController'
    };
};

exports.directive = directive;

/**
 * Main Company Directive
 *
 * @ngInject
 */
var directive = function () {
    'use strict';
    return {
        templateUrl: 'app/components/company/CompanyView.html',
        restrict: 'AE',
        scope: false
    };
};

exports.directive = directive;

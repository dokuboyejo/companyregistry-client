/**
 * Main Beneficiary Directive
 *
 * @ngInject
 */
var directive = function () {
    'use strict';
    return {
        templateUrl: 'app/components/beneficiary/BeneficiaryView.html',
        restrict: 'AE',
        scope: false,
        controllerAs: 'ctrl',
        controller: 'BeneficiaryViewController'
    };
};

exports.directive = directive;

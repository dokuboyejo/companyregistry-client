/**
 * Beneficiary Form Component Directive
 *
 * @ngInject
 */
var directive = function () {
    'use strict';
    return {
        templateUrl: 'app/components/beneficiary/BeneficiaryUpdateView.html',
        restrict: 'AE',
        scope: {
            beneficiary: '=beneficiaryDetails'
        },
        controllerAs: 'ctrl',
        controller: 'BeneficiaryViewController'
    };
};

exports.directive = directive;

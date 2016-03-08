/**
 * Company Delete Component Directive
 *
 * @ngInject
 */
var directive = function () {
    'use strict';
    return {
        templateUrl: 'app/components/beneficiary/BeneficiaryDeleteView.html',
        restrict: 'AE',
        scope: false,
        controllerAs: 'ctrl',
        controller: 'BeneficiaryViewController'
    };
};

exports.directive = directive;

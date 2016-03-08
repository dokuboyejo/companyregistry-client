/**
 * Company Table List Component Directive
 *
 * @ngInject
 */
var directive = function () {
    'use strict';
    return {
        templateUrl: 'app/components/beneficiary/BeneficiaryListFragmentView.html',
        restrict: 'AE',
        scope: {
            beneficiaries: '=',
            delref: '='
        },
        controllerAs: 'ctrl',
        controller: 'BeneficiaryViewController'
    };
};

exports.directive = directive;

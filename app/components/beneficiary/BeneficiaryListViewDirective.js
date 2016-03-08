/**
 * Company Table List Component Directive
 *
 * @ngInject
 */
var directive = function () {
    'use strict';
    return {
        templateUrl: 'app/components/beneficiary/BeneficiaryListView.html',
        restrict: 'AE',
        scope: false,
        controllerAs: 'ctrl',
        controller: 'BeneficiaryViewController'
    };
};

exports.directive = directive;

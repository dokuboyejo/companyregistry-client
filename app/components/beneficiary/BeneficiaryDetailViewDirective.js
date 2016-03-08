/**
 * Beneficiary Detail View Component Directive
 *
 * @param {$parse} Angular parser service
 * @param {$rootScope} Angular rootScope service
 *
 * @ngInject
 */
var directive = function($parse, $compile, $rootScope, $timeout) {
    'use strict';
    return {
        templateUrl: 'app/components/beneficiary/BeneficiaryDetailView.html',
        restrict: 'AE',
        //replace: true,
        //transclude: true,
        scope: {
            beneficiary: '=beneficiaryDetails'
        },
        link: function(scope, el, attrs) {
            $rootScope.$on('disableBeneficiary', function(ev, data) {
                for (var i = 0; i < data.beneficiaries.length; i++) {
                    if (data.beneficiaries[i].id === data.beneficiaryId) {
                        var inputEls = angular.element(el.find('input[type=text]'));
                        for (var j = 0; j < inputEls.length; j++) {
                            angular.element(inputEls[j]).attr('disabled', '');
                            $timeout(function() {
                                $compile(inputEls[j])(scope);
                            });
                        }
                        break;
                    }
                }
                //$compile(el)(scope);
            });
        }
    };
};

exports.directive = directive;

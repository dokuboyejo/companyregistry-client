/**
 * Company Table List Component Directive
 *
 * @ngInject
 */
var directive = function() {
    'use strict';
    return {
        templateUrl: 'app/components/company/CompanyListFragmentView.html',
        restrict: 'AE',
        scope: {
            companies: '=',
            delref: '=',
            searchRequestSumbitted: '='
        },
        controllerAs: 'ctrl',
        controller: 'CompanyViewController'
    };
};

exports.directive = directive;

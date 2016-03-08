/**
 * Side Nav Component Directive
 *
 * @ngInject
 */
var directive = function () {
    'use strict';
    return {
        templateUrl: 'app/components/nav/SideNavView.html',
        restrict: 'AE',
        scope: false,
        controllerAs: 'ctrl',
        controller: 'SideNavViewController'
    };
};

exports.directive = directive;

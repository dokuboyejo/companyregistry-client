/**
 * Main Directive
 *
 */
var directive = function () {
    'use strict';
    return {
        templateUrl: 'app/components/common/MainView.html',
        restrict: 'AE',
        scope: false,
        controllerAs: 'ctrl',
        controller: 'MainViewController'
    };
};

exports.directive = directive;

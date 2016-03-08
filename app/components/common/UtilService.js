/**
 * This service provide custom word lookup for case normalization if one is not provided by the service client
 *
 * @param {$window} The angular window service
 * @ngInject
 */
var service = function($window) {
    'use strict';
    var serviceInstance = {};

    serviceInstance.isFormValid = function(formId) {
        var isValid = true;
        var formEl = $window.document.getElementById(formId);
        console.log(formEl);
        if (!formEl || (formEl && formEl.className && formEl.className.indexOf('ng-invalid') > -1)) return false;
        // otherwise, perform sanity check
        var elements = $window.document.getElementById(formId).elements;
        for (var i = 0, element = elements[i++]; i < elements.length; i++) {
            if ((element.type === 'text' || element.type === 'checkbox' || element.type === 'radio' || element.type === 'date' || element.type === 'datetime-local' || element.type === 'email' || element.type === 'month' || element.type === 'number' || element.type === 'time' || element.type === 'url' || element.type === 'week' || element.type === 'textarea' || element.type === 'select') && (element.className.indexOf('ng-invalid') > -1)) {
                isValid = false;
                return isValid;
            }
        }

        return isValid;
    };

    serviceInstance.isBlank = function(value) {
        return angular.isUndefined(value) || value === null || value.length === 0;
    };

    serviceInstance.isValidId = function(id) {
        return parseInt(id) >= 1;
    }

    return serviceInstance;
};

exports.service = service;

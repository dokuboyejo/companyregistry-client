/**
 * This service helps to perform http requests (GET, POST, PUT, DELETE) for beneficiary tasks
 *
 * @param {$http} The AngularJS http service
 * @param {$timeout} The AngularJS timeout service
 *
 * @ngInject
 */
var service = function($http, $timeout) {
    'use strict';

    var serviceInstance = {};
    serviceInstance.selectedBeneficiaryId = null;
    serviceInstance.popOnDelete = null;
    serviceInstance.beneficiary = null;
    serviceInstance.beneficiaries = [];

    serviceInstance.getBeneficiary = function(url, callback) {
        $http({
            url: url,
            method: 'GET',
            dataType: 'jsonp'
        }).then(function(results) {
            callback(results);
        }, function(error) {
            var errorData = {
                status: error.status ? error.status : 500,
                message: error.data ? error.data : 'Error occured while retrieving beneficiary details'
            };
            callback(errorData);
        });
    };

    serviceInstance.createBeneficiary = function(url, data, callback) {
        $http({
            url: url,
            data: data,
            method: 'POST',
            dataType: 'jsonp'
        }).then(function(results) {
            callback(results);
        }, function(error) {
            var errorData = {
                status: error.status ? error.status : 500,
                message: error.data ? error.data : 'Error occured while retrieving beneficiary details'
            };
            callback(errorData);
        });
    };
    serviceInstance.updateBeneficiary = function(url, data, callback) {
        $http({
            url: url,
            method: 'PUT',
            data: data,
            dataType: 'jsonp'
        }).then(function(results) {
            callback(results);
        }, function(error) {
            var errorData = {
                status: error.status ? error.status : 500,
                message: error.data ? error.data : 'Error occured while retrieving beneficiary details'
            };
            callback(errorData);
        });
    };

    serviceInstance.deleteBeneficiary = function(url, callback) {
        $http({
            url: url,
            method: 'DELETE',
            dataType: 'jsonp'
        }).then(function(results) {
            callback(results);
        }, function(error) {
            var errorData = {
                status: error.status ? error.status : 500,
                message: error.data ? error.data : 'Error occured while retrieving beneficiary details'
            };
            callback(errorData);
        });
    };

    return serviceInstance;
};

exports.service = service;

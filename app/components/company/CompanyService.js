/**
 * This service helps to perform http requests (GET, POST, PUT, DELETE) for company tasks
 *
 * @param {$http} The AngularJS http service
 * @param {$timeout} The AngularJS timeout service
 *
 * @ngInject
 */
var service = function($http, $timeout) {
    'use strict';

    var serviceInstance = {};
    serviceInstance.selectedCompanyId = null;
    serviceInstance.popOnDelete = null;
    serviceInstance.company = null;
    serviceInstance.companies = [];
    serviceInstance.searchRequestSumbitted = false;

    serviceInstance.getCompany = function(url, callback) {
        $http({
            url: url,
            method: 'GET',
            dataType: 'jsonp'
        }).then(function(results) {
            callback(results);
        }, function(error) {
            var errorData = {
                status: error.status ? error.status : 500,
                message: error.data ? error.data : 'Error occured while retrieving company details'
            };
            callback(errorData);
        });
    };

    serviceInstance.createCompany = function(url, data, callback) {
        console.log('here: ' + url);
        //return;
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
                message: error.data ? error.data : 'Error occured while retrieving company details'
            };
            callback(errorData);
        });
    };
    serviceInstance.updateCompany = function(url, data, callback) {
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
                message: error.data ? error.data : 'Error occured while retrieving company details'
            };
            callback(errorData);
        });
    };

    serviceInstance.deleteCompany = function(url, callback) {
        $http({
            url: url,
            method: 'DELETE',
            dataType: 'jsonp'
        }).then(function(results) {
            callback(results);
        }, function(error) {
            var errorData = {
                status: error.status ? error.status : 500,
                message: error.data ? error.data : 'Error occured while retrieving company details'
            };
            callback(errorData);
        });
    };


    return serviceInstance;
};

exports.service = service;

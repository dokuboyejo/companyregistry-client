/**
 * Company View controller
 *
 * This controller is responsible for handing company form module related logic
 *
 * @param {$rootScope} Angular root scope service
 * @param {$scope} Angular scope service
 * @param {$q} Angular promise service
 * @param {$timeout} Angular timeout service
 * @param {$window} Angular window service
 * @param {$document} Angular document service
 * @param {$log} Angular logger service
 * @param {$modal} Angular modal service
 * @param {beneficiaryService} Beneficiary service
 * @param {companyService} Company service
 * @param {utilService} Utility service
 * @param {blockUI} Block UI service
 * @param {inform} Inform provider service
 * @param {CONSTANTS} Project constants values
 *
 * @ngInject
 *
 */
var controller = function($rootScope, $scope, $q, $timeout, $window, $document, $log, $state, $modal, beneficiaryService, companyService, utilService, blockUI, inform, CONSTANTS) {
    'use strict';
    var ctrl = this;

    $scope.useExistingBeneficiary = false;
    $scope.minimumValidBeneficiary = false;
    $scope.beneficiaryId = null;
    $scope.beneficiarySearched = false;
    $scope.beneficiaryFound = false;
    $scope.companyFound = false;
    $scope.searchRequestSumbitted = false;
    $scope.addRequestSubmitted = false;
    $scope.updateRequestSubmitted = false;
    $scope.deleteRequestSubmitted = false;
    $scope.deleteSuccessful = false;
    $scope.serviceUrl = CONSTANTS.url.path;
    $scope.initCompany = {
        "name": null,
        "address": null,
        "city": null,
        "country": null,
        "email": null,
        "phoneNumber": null,
        "beneficiaries": [{
            "id": -1,
            "firstName": null,
            "lastName": null
        }]
    };

    $scope.companies = companyService.companies.length > 0 ? companyService.companies : [];
    $scope.company = companyService.company &&
                    ($state.current.name === 'start.company.update' || $state.current.name === 'start.company.list.delete' || $state.current.name === 'start.company.search.delete') ?
                    companyService.company : $scope.initCompany;

    $scope.verifyMinimumValidBeneficiary = function() {
        for (var i = 0; i < $scope.company.beneficiaries.length; i++) {
            $scope.minimumValidBeneficiary = $scope.company.beneficiaries[i].id !== -1 ||
                                            (!utilService.isBlank($scope.company.beneficiaries[i].firstName) && !utilService.isBlank($scope.company.beneficiaries[i].lastName));
            if ($scope.minimumValidBeneficiary) {
                break;
            }
        }
    };

    $scope.resetCompany = function() {
        $timeout(function() {
            $scope.company = $scope.initCompany;
            $scope.companies = [];
        });
    };

    $scope.addCompany = function($event) {
        $event.stopPropagation();
        $scope.addRequestSubmitted = false;
        companyService.company = $scope.company;
        if (utilService.isFormValid('companyDetailsForm')) {
            $scope.verifyMinimumValidBeneficiary();
            if (!$scope.minimumValidBeneficiary) {
                $scope.registerPopoverShow('#addCompany');
                return;
            }
            $log.info('valid');
        } else {
            $log.warn('form invalid');
            return;
        }

        var companyCreateBlock = blockUI.instances.get('companyCreateBlock');
        // companyCreateBlock.start();
        var url = $scope.serviceUrl + '/' + CONSTANTS.url.companyContextPath;
        companyService.createCompany(url, $scope.company, function(result) {
            $timeout(function() {
                $scope.addRequestSubmitted = true;
                if (result && result.data) {
                    if (result.data.id > 0) {
                        inform.add('Company created successfully.', {
                            ttl: 2500
                        });
                        $timeout(function() {
                            $state.go('start.company', {}, {reload:true});
                        }, 2500);
                    } else {
                        inform.add('Request completed, however company couldn\'t be created.', {
                            ttl: 5000,
                            type: 'warning'
                        });
                    }
                } else {
                    inform.add(result && result.message && result.message.errorMessage ? result.message.errorMessage : 'Error creating company.', {
                        ttl: 5000,
                        type: 'danger'
                    });
                    $timeout(function() {
                        $scope.addRequestSubmitted = false;
                    }, 5000);
                }
                // companyCreateBlock.stop();
            });
        });
    };

    $scope.cancelAddCompany = function() {
        $state.go('start.company');
    };

    $scope.updateCompany = function($event) {
        $event.stopPropagation();
        $scope.updateRequestSubmitted = false;
        companyService.company = $scope.company;
        if (utilService.isFormValid('companyUpdateForm')) {
            $scope.verifyMinimumValidBeneficiary();
            if (!$scope.minimumValidBeneficiary) {
                $scope.registerPopoverShow('#updateCompany');
                return;
            }
        } else {
            $log.warn('form invalid');
            return;
        }

        // var companyUpdateBlock = blockUI.instances.get('companyUpdateBlock');
        // companyUpdateBlock.start();
        var url = $scope.serviceUrl + '/' + CONSTANTS.url.companyContextPath;
        companyService.updateCompany(url, $scope.company, function(result) {
            $timeout(function() {
                $scope.updateRequestSubmitted = true;
                if (result && result.data) {
                    if (result.data.status === true) {
                        inform.add('Company updated successfully.', {
                            ttl: 4000
                        });
                        $timeout(function() {
                            $state.go('start.company.list', {}, {reload: true});
                        }, 4500);
                    } else {
                        inform.add('Request completed successfully, but no update performed on company.', {
                            ttl: 5000,
                            type: 'warning'
                        });
                    }
                } else {
                    inform.add(result && result.message && result.message.errorMessage ? result.message.errorMessage : 'Company couldn\'t be updated.', {
                        ttl: 5000,
                        type: 'danger'
                    });
                    $timeout(function() {
                        $scope.updateRequestSubmitted = false;
                    }, 5000);
                }
                // companyUpdateBlock.stop();
            });
        });
    };

    $scope.cancelOrCloseCompanyUpdate = function() {
        $state.go('start.company.list', {}, {reload: true});
    };

    $scope.deleteCompany = function($event) {
        $event.stopPropagation();
        $scope.company = companyService.company;
        // var companyUpdateBlock = blockUI.instances.get('companyUpdateBlock');
        // companyUpdateBlock.start();
        var url = $scope.serviceUrl + '/' + CONSTANTS.url.companyContextPath + '/' + $scope.company.id;
        companyService.deleteCompany(url, function(result) {
            $timeout(function() {
                $scope.deleteRequestSubmitted = true;
                if (result && result.data && result.data.status === true) {
                    $scope.deleteSuccessful = true;
                }
                // companyUpdateBlock.stop();
            });
        });
    };

    $scope.cancelOrCloseCompanyDelete = function() {
        $scope.$dismiss();
        $state.go('start.company.list', {}, {reload: true});
    };

    $scope.fetchCompany = function(id) {
        $scope.companies.splice(0, $scope.companies.length);

        var idSearch = !utilService.isBlank(id);
        var baseUrl = $scope.serviceUrl + '/' + CONSTANTS.url.companyContextPath;
        var url = idSearch ? baseUrl + '/' + id : baseUrl;
        //var companyListBlock = blockUI.instances.get('companyListBlock');
        //companyListBlock.start();
        companyService.getCompany(url, function(result) {
            $timeout(function() {
                $scope.searchRequestSumbitted = true;
                companyService.searchRequestSumbitted = $scope.searchRequestSumbitted;
                if (result && result.data) {
                    if (idSearch) {
                        $scope.companies.push(result.data);
                    } else {
                        $scope.companies = result.data;
                    }
                    companyService.companies = $scope.companies;
                    $scope.companyFound = true;
                }
                //companyListBlock.stop();
            });
        });
    };

    $scope.searchCompany = function(id, $event) {
        $event.stopPropagation();
        $timeout(function() {
            if (!utilService.isValidId(id)) {
                $scope.registerPopoverShow('#searchExistingCompanyId');
                return;
            }
            $scope.fetchCompany(id);
        });
    };

    $scope.searchBeneficiary = function(id, $event) {
        $event.stopPropagation();

        if (!utilService.isValidId(id)) {
            $scope.registerPopoverShow('#searchExistingBeneficiaryId');
            return;
        }
        var url = $scope.serviceUrl + '/' + CONSTANTS.url.beneficiaryContextPath + '/' + id;

        var companySearchBlock = blockUI.instances.get('companySearchBlock');
        companySearchBlock.start();
        beneficiaryService.findBeneficiary(url, function(result) {
            $timeout(function() {
                $scope.beneficiarySearched = true;
                if (result && result.data) {
                    $scope.verifyMinimumValidBeneficiary();
                    // remove all empty forms
                    if (!$scope.minimumValidBeneficiary) {
                        $scope.company.beneficiaries.splice(0, $scope.company.beneficiaries.length);
                    }
                    $scope.company.beneficiaries.push(result.data);
                    $scope.disableBeneficiary(result.data.id);
                    $scope.minimumValidBeneficiary = true;
                    $scope.beneficiaryFound = true;
                    $scope.beneficiaryId = null;
                }
                companySearchBlock.stop();
            });
        });
    };

    $scope.mutateCompanyOptions = function(company, $index, $event) {
        $event.stopPropagation();
        companyService.selectedCompanyId = '#company' + $index;
        companyService.company = company;
        $scope.registerPopoverPrep(companyService.selectedCompanyId);
        $scope.registerPopoverShow(companyService.selectedCompanyId);
    };

    $scope.addBeneficiary = function() {
        $scope.company.beneficiaries.push({
            "firstName": "",
            "lastName": ""
        });
    };

    $scope.removeBeneficiary = function($event, beneficiary) {
        $event.stopPropagation();
        if ($scope.company.beneficiaries.indexOf(beneficiary) != -1) {
            $timeout(function() {
                if ($scope.company.beneficiaries.length === 1) {
                    $scope.registerPopoverShow('#removeBeneficiary');
                    return;
                }
                $scope.company.beneficiaries.splice($scope.company.beneficiaries.indexOf(beneficiary), 1);
            });
        }
    };

    $scope.disableBeneficiary = function(beneficiaryId) {
        $rootScope.$emit('disableBeneficiary', {
            beneficiaries: $scope.company.beneficiaries,
            beneficiaryId: beneficiaryId
        });
    }

    /* initialize popover */

    $scope.discardMessage = function($event) {
        $event ? $event.stopPropagation() : '';
        companyService.popOnDelete = "delete";
        $scope.registerPopoverHide('[id*=popover]');
    };

    companyService.popOnDelete = "delete";

    $scope.registerPopoverPrep = function(id) {
        angular.element($document.find(id)).popover({
            trigger: 'manual'
        });
    };

    $scope.registerPopoverShow = function(id) {
        if (companyService.popOnDelete !== "popover") {
            companyService.popOnDelete = "popover";
            angular.element($document.find(id)).popover('show');
        }
    };

    $scope.registerPopoverHide = function(id) {
        var el = angular.element($document.find(id));
        el ? el.popover('hide') : '';
    };

    $scope.registerPopoverPrep('#removeBeneficiary');
    $scope.registerPopoverPrep('#addCompany');
    $scope.registerPopoverPrep('#updateCompany');
    $scope.registerPopoverPrep('#searchExistingBeneficiaryId');
    $scope.registerPopoverPrep('#searchExistingCompanyId');
    $scope.registerPopoverHide('[id*=popover]');

    // clear all informs
    inform.clear();
};

exports.controller = controller;

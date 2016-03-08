/**
 * Beneficiary View controller
 *
 * This controller is responsible for handing beneficiary form module related logic
 *
 * @param {$rootScope} Angular root scope service
 * @param {$scope} Angular scope service
 * @param {$timeout} Angular timeout service
 * @param {$window} Angular window service
 * @param {$document} Angular document service
 * @param {$log} Angular logger service
 * @param {$modal} Angular modal service
 * @param {beneficiaryService} Beneficiary service
 * @param {utilService} Utility service
 * @param {blockUI} Block UI service
 * @param {inform} Inform provider service
 * @param {CONSTANTS} Project constants values
 *
 * @ngInject
 *
 */
var controller = function($rootScope, $scope, $timeout, $window, $document, $log, $state, $modal, beneficiaryService, utilService, blockUI, inform, CONSTANTS) {
    'use strict';
    var ctrl = this;

    $scope.useExistingBeneficiary = false;
    $scope.minimumValidBeneficiary = false;
    $scope.beneficiaryId = null;
    $scope.beneficiarySearched = false;
    $scope.beneficiaryFound = false;
    $scope.searchRequestSumbitted = false;
    $scope.addRequestSubmitted = false;
    $scope.addRequestAttempted = false;
    $scope.updateRequestSubmitted = false;
    $scope.updateRequestAttempted = false;
    $scope.deleteRequestSubmitted = false;
    $scope.deleteSuccessful = false;
    $scope.serviceUrl = CONSTANTS.url.path;

    $scope.initBeneficiary = {
        "firstName": null,
        "lastName": null
    };

    $scope.beneficiaries = beneficiaryService.beneficiaries.length > 0 ? beneficiaryService.beneficiaries : [];
    $scope.beneficiary = beneficiaryService.beneficiary &&
                         ($state.current.name === 'start.beneficiary.update' || $state.current.name === 'start.beneficiary.list.delete' || $state.current.name === 'start.beneficiary.search.delete') ?
                         beneficiaryService.beneficiary : $scope.initBeneficiary;

    $scope.resetBeneficiary = function() {
        $timeout(function() {
            $scope.beneficiary = $scope.initBeneficiary;
            $scope.beneficiaries = [];
        });
    };

    $scope.addBeneficiary = function($event) {
        $event.stopPropagation();
        $scope.addRequestSubmitted = false;
        beneficiaryService.beneficiary = $scope.beneficiary;
        if (!utilService.isFormValid('beneficiaryDetailsForm')) {
            $scope.addRequestAttempted = true;
            $log.warn('form invalid');
            inform.add('Invalid form. First name and Last name are required to create beneficiary', {
                ttl: 3500,
                type: 'danger'
            });
            // $scope.registerPopoverShow('#addBeneficiary');
            return;
        }

        var beneficiaryCreateBlock = blockUI.instances.get('beneficiaryCreateBlock');
        // beneficiaryCreateBlock.start();
        var url = $scope.serviceUrl + '/' + CONSTANTS.url.beneficiaryContextPath;
        beneficiaryService.createBeneficiary(url, $scope.beneficiary, function(result) {
            $timeout(function() {
                $scope.addRequestSubmitted = true;
                if (result && result.data) {
                    if (result.data.id > 0) {
                        inform.add('beneficiary created successfully.', {
                            ttl: 2500
                        });
                        $timeout(function() {
                            $state.go('start.beneficiary', {}, {reload:true});
                        }, 2500);
                    } else {
                        inform.add('Request completed, however beneficiary couldn\'t be created.', {
                            ttl: 5000,
                            type: 'warning'
                        });
                    }
                } else {
                    inform.add(result && result.message && result.message.errorMessage ? result.message.errorMessage : 'Error creating beneficiary.', {
                        ttl: 5000,
                        type: 'danger'
                    });
                    $timeout(function() {
                        $scope.addRequestSubmitted = false;
                    }, 5000);
                }
                // beneficiaryCreateBlock.stop();
            });
        });
    };

    $scope.cancelAddBeneficiary = function() {
        $state.go('start.beneficiary');
    };

    $scope.updateBeneficiary = function($event) {
        $event.stopPropagation();
        $scope.updateRequestSubmitted = false;
        beneficiaryService.beneficiary = $scope.beneficiary;
        if (!utilService.isFormValid('beneficiaryDetailsForm')) {
            $scope.updateRequestAttempted = true;
            $log.warn('ccform invalid');
            inform.add('Invalid form. First name and Last name are required to create beneficiary', {
                ttl: 3500,
                type: 'danger'
            });
            return;
        }

        // var beneficiaryUpdateBlock = blockUI.instances.get('beneficiaryUpdateBlock');
        // beneficiaryUpdateBlock.start();
        var url = $scope.serviceUrl + '/' + CONSTANTS.url.beneficiaryContextPath;
        beneficiaryService.updateBeneficiary(url, $scope.beneficiary, function(result) {
            $timeout(function() {
                $scope.updateRequestSubmitted = true;
                if (result && result.data) {
                    if (result.data.status === true) {
                        inform.add('beneficiary updated successfully.', {
                            ttl: 4000
                        });
                        $timeout(function() {
                            $state.go('start.beneficiary.list', {}, {reload: true});
                        }, 4500);
                    } else {
                        inform.add('Request completed successfully, but no update performed on beneficiary.', {
                            ttl: 5000,
                            type: 'warning'
                        });
                    }
                } else {
                    inform.add(result && result.message && result.message.errorMessage ? result.message.errorMessage : 'beneficiary couldn\'t be updated.', {
                        ttl: 5000,
                        type: 'danger'
                    });
                    $timeout(function() {
                        $scope.updateRequestSubmitted = false;
                    }, 5000);
                }
                // beneficiaryUpdateBlock.stop();
            });
        });
    };

    $scope.cancelOrCloseBeneficiaryUpdate = function() {
        $state.go('start.beneficiary.list', {}, {reload: true});
    };

    $scope.deleteBeneficiary = function($event) {
        $event.stopPropagation();
        $scope.beneficiary = beneficiaryService.beneficiary;
        // var beneficiaryUpdateBlock = blockUI.instances.get('beneficiaryUpdateBlock');
        // beneficiaryUpdateBlock.start();
        var url = $scope.serviceUrl + '/' + CONSTANTS.url.beneficiaryContextPath + '/' + $scope.beneficiary.id;
        beneficiaryService.deleteBeneficiary(url, function(result) {
            $timeout(function() {
                $scope.deleteRequestSubmitted = true;
                if (result && result.data && result.data.status === true) {
                    $scope.deleteSuccessful = true;
                } else {
                  $log.info(result);
                }
                // beneficiaryUpdateBlock.stop();
            });
        });
    };

    $scope.cancelOrCloseBeneficiaryDelete = function() {
        $scope.$dismiss();
        $state.go('start.beneficiary.list', {}, {reload: true});
    };

    $scope.fetchBeneficiary = function(id) {
        $scope.beneficiaries.splice(0, $scope.beneficiaries.length);

        var idSearch = !utilService.isBlank(id);
        var baseUrl = $scope.serviceUrl + '/' + CONSTANTS.url.beneficiaryContextPath;
        var url = idSearch ? baseUrl + '/' + id : baseUrl;
        //var beneficiaryListBlock = blockUI.instances.get('beneficiaryListBlock');
        //beneficiaryListBlock.start();
        beneficiaryService.getBeneficiary(url, function(result) {
            $timeout(function() {
                $scope.searchRequestSumbitted = true;
                if (result && result.data) {
                    if (idSearch) {
                        $scope.beneficiaries.push(result.data);
                    } else {
                        $scope.beneficiaries = result.data;
                    }
                    beneficiaryService.beneficiaries = $scope.beneficiaries;
                    $scope.beneficiaryFound = true;
                }
                //beneficiaryListBlock.stop();
            });
        });
    };

    $scope.searchBeneficiary = function(id, $event) {
        $event.stopPropagation();
        $timeout(function() {
            if (!utilService.isValidId(id)) {
                $scope.registerPopoverShow('#searchExistingBeneficiaryId');
                return;
            }
            $scope.fetchBeneficiary(id);
        });
    };

    $scope.mutateBeneficiaryOptions = function(beneficiary, $index, $event) {
        $event.stopPropagation();
        beneficiaryService.selectedBeneficiaryId = '#beneficiary' + $index;
        beneficiaryService.beneficiary = beneficiary;
        $scope.registerPopoverPrep(beneficiaryService.selectedBeneficiaryId);
        $scope.registerPopoverShow(beneficiaryService.selectedBeneficiaryId);
    };

    /* initialize popover */

    $scope.discardMessage = function($event) {
        $event ? $event.stopPropagation() : '';
        beneficiaryService.popOnDelete = "delete";
        $scope.registerPopoverHide('[id*=popover]');
    };

    beneficiaryService.popOnDelete = "delete";

    $scope.registerPopoverPrep = function(id) {
        angular.element($document.find(id)).popover({
            trigger: 'manual'
        });
    };

    $scope.registerPopoverShow = function(id) {
        if (beneficiaryService.popOnDelete !== "popover") {
            beneficiaryService.popOnDelete = "popover";
            angular.element($document.find(id)).popover('show');
        }
    };

    $scope.registerPopoverHide = function(id) {
        var el = angular.element($document.find(id));
        el ? el.popover('hide') : '';
    };

    $scope.registerPopoverPrep('#removeBeneficiary');
    $scope.registerPopoverPrep('#addBeneficiary');
    $scope.registerPopoverPrep('#updateBeneficiary');
    $scope.registerPopoverPrep('#searchExistingBeneficiaryId');
    $scope.registerPopoverHide('[id*=popover]');

    // clear all informs
    inform.clear();
};

exports.controller = controller;

var stateConfig = {
    /**
     * Default to <company-create-view />
     */
    main: {
        url: '/',
        views: {
            'main': {
                template: '<main-view></main-view>'
            },
            'mainItem@start': {
                template: '<company-create-view></company-create-view>'
            }
        }
    },
    company: {
        initial: {
            url: 'company',
            views: {
                'mainItem@start': {
                    template: '<company-view></company-view>'
                }
            }
        },
        list: {
            url: '/list',
            views: {
                'mainItem@start': {
                    template: '<company-list-view></company-list-view>'
                }
            }
        },
        search: {
            url: '/search',
            views: {
                'mainItem@start': {
                    template: '<company-search-view></company-search-view>'
                }
            }
        },
        update: {
            url: '/update',
            views: {
                'mainItem@start': {
                    template: '<company-update-view></company-update-view>'
                }
            }
        },
        delete: {
            // would be used under start.company.list state, hence url resolves to: #/company/list/delete
            url: '/delete',
            /**
             * On state enter event listener
             * @param  {$modal} Modal service
             * @ngInject
             */
            onEnter: function($modal) {
                $modal.open({
                    template: '<company-delete-view></company-delete-view>',
                    backdrop: 'static',
                    keyboard: false,
                    windowClass: 'modal',
                    controller: 'CompanyViewController'
                });
            }
        }
    },
    beneficiary: {
        initial: {
            url: 'beneficiary',
            views: {
                'mainItem@start': {
                    template: '<beneficiary-view></beneficiary-view>'
                }
            }
        },
        list: {
            url: '/list',
            views: {
                'mainItem@start': {
                    template: '<beneficiary-list-view></beneficiary-list-view>'
                }
            }
        },
        search: {
            url: '/search',
            views: {
                'mainItem@start': {
                    template: '<beneficiary-search-view></beneficiary-seach-view>'
                }
            }
        },
        update: {
            url: '/update',
            views: {
                'mainItem@start': {
                    template: '<beneficiary-update-view></beneficiary-update-view>'
                }
            }
        },
        delete: {
            /** would be used under start.beneficiary.list or start.beneficiary.search state,
             *  hence url resolves to: #/beneficiary/list/delete or  #/beneficiary/search/delete
             */
            url: '/delete',
            /**
             * On state enter event listener
             * @param  {$modal} Modal service
             * @ngInject
             */
            onEnter: function($modal) {
                $modal.open({
                    template: '<beneficiary-delete-view></beneficiary-delete-view>',
                    backdrop: 'static',
                    keyboard: false,
                    windowClass: 'modal',
                    controller: 'BeneficiaryViewController'
                });
            }
        }
    }
};

exports.stateConfig = stateConfig;

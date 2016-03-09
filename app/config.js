'use strict';

var states = require('./components/common/States');
var configBlock = {
    /**
     * @param {$logProvider} The log provider service
     * @param {$translateProvider} The angular translate service
     * @ngInject
     */
    settings: function($logProvider, $translateProvider) {
        $logProvider.debugEnabled(true); // Turns global logging with $log.debug on

        var i18n_en = require('./components/nls/i18n-en');
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
        $translateProvider.translations('en', i18n_en.translationsEN).useStaticFilesLoader({
                files: [{
                    prefix: './components/nls/i18n-',
                    suffix: '.json'
                }]
            })
            .preferredLanguage('en')
            .fallbackLanguage('en');
    },
    /**
     * @param {$stateProvider} $stateProvider The UI router stateProvider service
     * @param {$urlRouterProvider} The UI router urlRouterProvider service
     * @param {$modalStateProvider} The custom modal state provider service
     * @ngInject
     */
    states: function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('start', states.stateConfig.main)
            .state('start.company', states.stateConfig.company.initial)
            .state('start.company.list', states.stateConfig.company.list)
            .state('start.company.list.delete',  angular.copy(states.stateConfig.company.delete))
            .state('start.company.search', states.stateConfig.company.search)
            .state('start.company.search.delete', angular.copy(states.stateConfig.company.delete))
            .state('start.company.update', states.stateConfig.company.update)
            .state('start.beneficiary', states.stateConfig.beneficiary.initial)
            .state('start.beneficiary.list', states.stateConfig.beneficiary.list)
            .state('start.beneficiary.list.delete', angular.copy(states.stateConfig.beneficiary.delete))
            .state('start.beneficiary.search', states.stateConfig.beneficiary.search)
            .state('start.beneficiary.search.delete', angular.copy(states.stateConfig.beneficiary.delete))
            .state('start.beneficiary.update', states.stateConfig.beneficiary.update)
    },

    /**
     * @param  {blockUIConfig} The block UI config service
     * @ngInject
     */
    blockUI: function(blockUIConfig) {
        blockUIConfig.delay = 100;
        // blockUIConfig.autoBlock = false;
        blockUIConfig.autoInjectBodyBlock = false;
        blockUIConfig.template = '<div id="ui-overlay"><img src="dist/images/ajax-loader.gif" /></h1>';
    },

    /**
     * @param  {informProvider} The inform provider service
     * @ngInject
     */
    inform: function(informProvider) {
        informProvider.defaults({
            /**
             * The time to live for the message in milliseconds.
             * Default value is 5000. Specify <0 to make the message sticky.
             */
            ttl: -1,

            /**
             * The type of message to enable styling.
             * Values can be 'default', 'primary', 'success', 'info', 'warning', 'danger' or any other custom required type.
             * Default value is 'info'. If 'default' is specified as value, then 'info' is used
             */
            type: 'success',
            /**
             * Allow html formatting
             * Default value is false
             */
            html: true
        });
    },

    /**
     * Modal block
     * @param  {$rootScope}  Angular root scope service
     * @param  {$modalStack} Angular UI modal stack
     * @ngInject
     */
    modal: function($rootScope, $modalStack) {
        $rootScope.$on('$stateChangeStart', function() {
            var top = $modalStack.getTop();
            if (top) {
                $modalStack.dismiss(top.key);
            }
        });
    },

    /**
     * Href sanitization whitelist
     * @param  {$compileProvide} Angular compile provider service
     * @ngInject
     */
    hrefSanitize: function($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome‌​-extension|blob:chrome-extension):/);
    },

    namespace: 'com.companyregistry'
};

exports.configBlock = configBlock;

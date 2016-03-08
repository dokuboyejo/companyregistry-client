var istanbul = require('browserify-istanbul');

module.exports = function (config) {
    config.set({
        basePath: '',
        browsers: ['PhantomJS'],
        frameworks: ['browserify', 'jasmine'],
        plugins : [ 'karma-browserify', 'karma-chrome-launcher', 'karma-ie-launcher', 'karma-phantomjs-launcher', 'karma-jasmine', 'karma-spec-reporter', 'karma-coverage', 'karma-junit-reporter', 'karma-htmlfile-reporter', 'karma-ng-html2js-preprocessor' ],
        files: [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            'vendor/jQuery/2.1.3/jquery-2.1.3.min.js',
            'vendor/angular/1.4.7/angular.min.js',
            'vendor/angular/1.4.7/angular-mocks.js',
            'app/**/*.spec.js',
            'app/**/*.html'
        ],
        exclude: [],
        preprocessors: {
            'app/**/!(*Test*)*.js': ['browserify', 'coverage'],
            '**/*.html': ['ng-html2js']
        },
        ngHtml2JsPreprocessor: {
            moduleName: 'templates'
        },
        reporters: ['spec', 'coverage', 'junit', 'html'],
        singleRun: true,
        logLevel: config.LOG_INFO,
        coverageReporter: {
            dir: './build/coverage/',
            reporters: [{
                type: 'cobertura',
                subdir: '.',
                file: 'cobertura-coverage.xml'
            }, {
                type: 'lcovonly',
                subdir: '.',
                file: 'lcov.info'
            }, {
                type: 'text-summary'
            }]
        },
        junitReporter: {
            outputDir: './build/junit',
            suite: ''
        },
        htmlReporter : {
            outputFile : './build/html/junit-test-results.html'
        },
        browserify: {
            debug: true,
            transform: ['browserify-ngannotate', istanbul({
                ignore: ['**/*.spec.js']
            }), ['browserify-css', {global: true}], 'brfs']
        }
    });
};

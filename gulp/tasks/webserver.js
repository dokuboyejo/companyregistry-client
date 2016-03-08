var gulp = require('gulp');
var config = require('../../gulp-config.js');
var connect = require('gulp-connect');

// Runs a local webserver to test application
gulp.task('webserver', ['watch'], function () {
    connect.server({
        root: process.cwd(),
        livereload: true,
        port: config.webserver.port
    });
});

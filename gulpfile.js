'use strict';

var gulp = require('gulp');
var dir = require('require-dir');

dir('./gulp/tasks', {
    recurse: true
});

// Default task
gulp.task('default', ['css', 'js'], function () {
    //   console.log("Config = ");
    //   console.log(config);
});

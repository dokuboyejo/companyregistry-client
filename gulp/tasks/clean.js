var gulp = require('gulp');
var config = require('../../gulp-config.js');
var rimraf = require('rimraf');

// Cleans the output and build folders
gulp.task('clean', function (cb) {
    rimraf(config.outputDir.root + '/*', errCallback);
    rimraf(config.outputDir.buildRoot + '/*', errCallback);
});

function errCallback(err) {
    if (err) {
        console.log(err);
    }
}

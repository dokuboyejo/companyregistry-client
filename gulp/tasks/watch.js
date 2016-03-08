var gulp = require('gulp');
var config = require('../../gulp-config.js');
var js = require('./js');

// Compiles css, html + js and then watches for changes and recompiles if required
// Runs css task on startup as watch will only run when it changes
gulp.task('watch', ['css', 'html'], function () {
    gulp.watch([config.inputDir.less + '/**/*.less'], ['css']);
    gulp.watch([config.inputDir.app + '/**/*.html'], ['html']);
    js.bundle(true);
});

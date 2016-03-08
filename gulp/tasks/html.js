var gulp = require('gulp');
var config = require('../../gulp-config.js');
var minifyHtml = require('gulp-minify-html');
var templateCache = require('gulp-angular-templatecache');
var connect = require('gulp-connect');

// Creates a template chache of all the html in directives
gulp.task('html', function (cb) {
    return gulp.src("./app/**/*.html")
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(templateCache({
            standalone: true,
            root: 'app/',
            moduleSystem: 'Browserify',
            module: config.outputFile.vewtemplates_module,
            filename: config.outputFile.vewtemplates
        }))
        .pipe(gulp.dest(config.outputDir.buildRoot))
        .pipe(connect.reload());
});

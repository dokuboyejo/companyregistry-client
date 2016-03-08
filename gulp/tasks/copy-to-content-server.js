var gulp = require('gulp');
var config = require('../../gulp-config.js');
var getPackageJson = require('../package-json');

// Copies files to DEV content server
gulp.task('copy-to-content-server-dev', function (cb) {
    var targetdir = config.outputDir.contentServerDev + '/' + getPackageJson().name + '/' + getPackageJson().version;
    console.log('Copying to ' + targetdir);
    return gulp.src(config.outputDir.root + '/**/*.*')
        .pipe(gulp.dest(targetdir));
});

// Copies files to PREPRD content server
gulp.task('copy-to-content-server-prd', function (cb) {
    var targetdir = config.outputDir.contentServerPrePrd + '/' + getPackageJson().name + '/' + getPackageJson().version;
    console.log('Copying to ' + targetdir);
    return gulp.src([config.outputDir.root + '/**/*.*', '!' + config.outputDir.root + '/**/*.map', '!' + config.outputDir.root + '/**/app.css', '!' + config.outputDir.root + '/**/app.js'])
        .pipe(gulp.dest(targetdir));
});

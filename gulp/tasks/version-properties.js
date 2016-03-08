var gulp = require('gulp');
var string_src = require('../string-src.js');
var getPackageJson = require('../package-json');

// Update version.properties file
gulp.task('version-properties', function () {
    var s = "ui.appname=" + getPackageJson().name + "\n" +
        "ui.version=" + getPackageJson().version + "\n";
    return string_src("version.properties", s)
        .pipe(gulp.dest('./'))
});

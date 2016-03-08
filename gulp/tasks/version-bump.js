var gulp = require('gulp');
var config = require('../../gulp-config.js');
var getPackageJson = require('../package-json');
var string_src = require('../string-src.js');
var bump = require('gulp-bump');
var propertiesparser = require('properties-parser');
var cwd = process.cwd();

// Internal use - updates package.json with minor version increment
gulp.task('version-bump-packagejson', function (cb) {
    return gulp.src([cwd + '/package.json'])
        .pipe(bump())
        .pipe(gulp.dest('./'));
});

// Increments the minor version number in package.json + sonar-project.properties
gulp.task('version-bump', ['version-bump-packagejson'], function (cb) {
    var editor = propertiesparser.createEditor(cwd + '/sonar-project.properties');
    editor.set('sonar.projectVersion', getPackageJson().version);
    editor.save();
    var s = "Updated to v" + getPackageJson().version;
    string_src("commit.message", s)
        .pipe(gulp.dest('./'))
});

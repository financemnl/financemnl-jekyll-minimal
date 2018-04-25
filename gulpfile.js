var gulp = require('gulp');
var log = require('fancy-log');
var critical = require('critical').stream;
var runSequence  = require('run-sequence');
var del          = require('del');
var run          = require('gulp-run');
var gutil        = require('gulp-util');

// Generate & Inline Critical-path CSS
gulp.task('critical', function () {
    return gulp.src('_site/*.html')
        .pipe(critical({base: '_site/', inline: true, css: ['_site/assets/css/algolia.min.css','_site/assets/css/main.css']}))
        .on('error', function(err) { log.error(err.message); })
        .pipe(gulp.dest('_site'));
});

// Runs jekyll build command.
gulp.task('build:jekyll', function() {
    var shellCommand = 'bundle exec jekyll build --config _config.yml';

    return gulp.src('')
        .pipe(run(shellCommand))
        .on('error', gutil.log);
});

// Builds site anew.
gulp.task('build', function(callback) {
    runSequence(
        'critical',
        'build:jekyll',
        callback);
});

// Default Task: builds site.
gulp.task('default', ['build']);
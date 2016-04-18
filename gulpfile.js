// Gulpfile. Assignment: CSV with AJAX

var gulp = require('gulp');
var watch = require('gulp-watch'); // Watch to have background tasks executing when some event is triggered
var htmlmin = require('gulp-minify-html');
var cssmin = require('gulp-minify-css');
var clean = require('gulp-clean');	 // To clean the public directory
var uglify = require('gulp-uglify');     // To uglify the codes
var sass = require('gulp-sass');	// This is used to automatize the Sass tasks
var karma = require('gulp-karma');  // Include Karma
var shell = require('gulp-shell');


gulp.task('default', ['minify-js', 'minify-css', 'minify-html'], function() {
  gulp.src([])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});

gulp.task('sass', function () {
  return gulp.src(input.sass)
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(output.sass));
});

gulp.task('test', function() {
  return gulp.src([])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      throw err;
    });
});

gulp.task('minify-js', function() {
  gulp.src(['public/*.js', '*.js', 'public/*.js'])
    .pipe(uglify({
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('minified'))
});

gulp.task('minify-css', function() {
  return gulp.src(['public/*.css','public/*.css'])
    .pipe(cssmin({compatibility: 'ie8'}))
    .pipe(gulp.dest('minified'));
})

gulp.task('minify-html', function() {
  return gulp.src('public/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('minified'))
});

gulp.task('clean', function () {
	return gulp.src('minified/*', {read: false})
		.pipe(clean());
});

gulp.task('server', function () {
  return gulp.src('').pipe(shell([ 'node-supervisor app.js' ]));
});

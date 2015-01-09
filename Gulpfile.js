var gulp           = require('gulp'),
    watch          = require('gulp-watch'),
    rename         = require('gulp-rename'),
    copy           = require('gulp-copy'),
    jshint         = require('gulp-jshint'),
    uglify         = require('gulp-uglify'),
    sourcemaps     = require('gulp-sourcemaps');

var paths = {
  js        : './src/*.js',
  publicJs  : './'
};

//
// Check quality of Javascript
// warn if errors or style problems are found
//
gulp.task('lint', function() {
  return gulp.src(paths.js)
  .pipe(jshint({
    "predef" : [
    "define",
    "document",
    "location",
    "navigator",
    "window",
    "history"
    ],
    "expr" : true
  }))
  .pipe(jshint.reporter('jshint-stylish'));
});

//
// Minify JS and move it to the
// public directory
//
gulp.task('copyjs', function() {

  gulp.src(paths.js)
  .pipe(copy("./public"))

});

gulp.task('uglify', function() {

  gulp.src(paths.js)
  .pipe(sourcemaps.init())
  .pipe(uglify({
    mangle: true,
    output: {
      beautify: false
    }
  }))
  .pipe(rename({extname: ".min.js"}))
  .pipe(sourcemaps.write("./")) //Write a sourcemap for browser debugging
  .pipe(gulp.dest(paths.publicJs))
});

//
// Run all default tasks
//
gulp.task('default',function(){
  gulp.start('lint');
  gulp.start('copyjs');
  gulp.start('uglify');
});

//
// Watch directories For Changes
//
gulp.task('watch', function() {
  gulp.watch(paths.js, ['lint','copyjs','uglify']);
  console.log('watching directory:' + paths.js);
});

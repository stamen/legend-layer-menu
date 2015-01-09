var gulp       = require('gulp'),
    watch      = require('gulp-watch'),
    rename     = require('gulp-rename'),
    copy       = require('gulp-copy'),
    jshint     = require('gulp-jshint'),
    uglify     = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    wrap       = require('gulp-wrap-amd');

var paths = {
  js        : './src/*.js',
  publicJs  : './',
  dist      : './dist'
};

//
// Check quality of Javascript
// warn if errors or style problems are found
//
gulp.task('lint', function() {
  return gulp.src(paths.js)
  .pipe(jshint({
    "predef"       : ["module"],
    "expr"         : true,
    "globalstrict" : true
  }))
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('uglify', function() {

  gulp.src(paths.js)
  .pipe(sourcemaps.init())
  .pipe(wrap({
    deps: ['require','module','exports'],
    params: ['require','module','exports']
  }))
  .pipe(uglify({
    mangle: true,
    output: {
      beautify: false
    }
  }))
  .pipe(rename({extname: ".min.js"}))
  .pipe(sourcemaps.write("./")) //Write a sourcemap for browser debugging
  .pipe(gulp.dest(paths.dist))
});

//
// Run all default tasks
//
gulp.task('default',function(){
  gulp.start('lint');
  gulp.start('uglify');
});

//
// Watch directories For Changes
//
gulp.task('watch', function() {
  gulp.watch(paths.js, ['lint','uglify']);
  console.log('watching directory:' + paths.js);
});

var gulp       = require('gulp'),
    watch      = require('gulp-watch'),
    rename     = require('gulp-rename'),
    copy       = require('gulp-copy'),
    jshint     = require('gulp-jshint'),
    uglify     = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    wrap       = require('gulp-wrap'),
    run        = require("gulp-run"),
    fs         = require('fs');

var paths = {
  js        : './src/*.js',
  dist      : './dist'
};

//
// Check quality of Javascript
// warn if errors or style problems are found
//
gulp.task('lint', function() {
  return gulp.src(paths.js)
  .pipe(jshint({
    "predef"       : ["module", "define"],
    "expr"         : true,
    "globalstrict" : true
  }))
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('uglify', function() {

  gulp.src(paths.js)
  .pipe(sourcemaps.init())
  .pipe(uglify().on("error", function(e) {
    console.log("Uglify error:\x07",e.message, " on line: ", e.lineNumber);
    return this.end();
  }))
  .pipe(rename({extname: ".min.js"}))
  .pipe(sourcemaps.write("./")) //Write a sourcemap for browser debugging
  .pipe(gulp.dest(paths.dist))
});

//
// Generate CSS from Sass and move it
// to the public directory
//
//
gulp.task("sass", function () {
  fs.readdirSync("./src").forEach(function() {
    run("sass --update src/:./src", {}).exec();
  });
});

//
// Run all default tasks
//
gulp.task('default',function(){
  gulp.start('lint');
  gulp.start('uglify');
  gulp.start('sass');
});

//
// Watch directories For Changes
//
gulp.task('watch', function() {
  gulp.watch('src/*.*', ['lint','uglify','sass']);
  console.log('watching directory:' + 'src/*.*');
});

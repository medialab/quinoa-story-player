var gulp = require('gulp');
var strip = require('gulp-strip-comments');
var babel = require('gulp-babel');

/**
 * This build tasks does the following operations:
 * code transpilation to plain js, 
 * code transpilation of scss code to css code,
 * comments stripping.
 */
gulp.task('build', function(){
  gulp.src([
      'src/*.js',
      'src/**/*.js'
    ])
    .pipe(babel({
    "plugins": [
      "transform-decorators-legacy",
      "transform-decorators",
      "transform-object-rest-spread",
      "transform-class-properties"
    ],
    "presets": [
      "es2015",
      "react"
    ]
  }))
    .pipe(strip())
    .pipe(gulp.dest('build'));

  gulp.src([
      'src/**/*.json',
      'src/**/*.xml',
      'src/**/*.csl'
    ])
    .pipe(strip())
    .pipe(gulp.dest('build'));

  gulp.src([
      'src/**/*.scss'
    ])
    .pipe(gulp.dest('build'));
});
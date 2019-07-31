var gulp = require('gulp');
var serve = require('gulp-serve');
 
gulp.task('serve', serve({
    root: ['dist'],
    port: 3000
  }));
var gulp   = require('gulp'),
  jade     = require('jade'),
  stylus   = require('gulp-stylus'),
  gulpJade = require('gulp-jade'),
  coffee   = require('gulp-coffee'),
  connect  = require('gulp-connect');
 
gulp.task('connect', function() {
  connect.server({
    root: './public',
    livereload: true
  });
});

gulp.task('stylus', function () {
  gulp.src('./app/stylus/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./app/css'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src('./public/*.html')
    .pipe(connect.reload());
});

gulp.task('jade', function () {
  return gulp.src('app/**/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('public/'))
})

gulp.task('coffee', function() {
  gulp.src('./src/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./public/'))
});

gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./app/stylus/*.styl'], ['stylus']);
  gulp.watch(['./app/src/*.coffee'], ['coffee']);
  gulp.watch(['./app/**/*.jade'], ['jade']);

});
 
gulp.task('default', ['connect', 'watch']);
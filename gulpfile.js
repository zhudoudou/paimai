var gulp = require('gulp'),
    cleancss = require('gulp-clean-css'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function() {
  return sass('src/css/*.scss')
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(gulp.dest('dist/css'))
      .pipe(cleancss())
      .pipe(gulp.dest('dist/css'))
      .pipe(notify({ message: 'styles task complete' }));
});
gulp.task('scripts', function() {
  return gulp.src(['src/js/*.js'])
      .pipe(gulp.dest('dist/js'))
      .pipe(notify({ message: 'Scripts task complete' }));
});
gulp.task('html', function() {
  return gulp.src('src/*.html')
      .pipe(gulp.dest('dist/'))
      .pipe(notify({ message: 'html task complete' }));
});
//Watching Sass files for changes
gulp.task('watch', function(){
  gulp.watch('src/css/*.scss', ['sass']); 
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/*.html', ['html']) ;
  // Other watchers
})

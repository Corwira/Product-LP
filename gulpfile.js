var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename');


gulp.task('jade', function() {
    return gulp.src('app/jade/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('app'))
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('assets', function() {
    return gulp.src('app/img/**/*.*', {since: gulp.lastRun('assets')})
    .pipe(gulp.dest('dist/img'))
});

gulp.task('browser-sync', function() { 
    browserSync({ 
        server: { 
             baseDir: 'app' 
            },
            notify: false 
    });
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/*.css') 
        .pipe(cssnano()) 
        .pipe(rename({suffix: '.min'})) 
        .pipe(gulp.dest('app/css')); 
});

gulp.task('watch',['browser-sync', 'jade', 'sass'], function() {
    gulp.watch('app/jade/**/*.jade', ['jade']),
    gulp.watch('app/sass/**/*.sass', ['sass']);
});


gulp.task('build', ['jade', 'sass'], function(){
   var buildCss = gulp.src([
       'app/css/*.css',
   ]) 
   .pipe(gulp.dest('dist/css'))
   
   var buildHtml = gulp.src('app/*.html')
   .pipe(gulp.dest('dist'));
    
   var buildImg = gulp.src('app/img/*.png')
   .pipe(gulp.dest('dist/img'));
    
   var buildJS = gulp.src('app/js/*.js')
   .pipe(gulp.dest('dist/js'));
});
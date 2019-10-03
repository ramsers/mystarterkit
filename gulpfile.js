var gulp = require('gulp')
var sass = require("gulp-sass")
var autoprefixer = require('gulp-autoprefixer')
var browserSync = require('browser-sync')
var reload = browserSync.reload
var cleanCSS = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps')
var shell = require('gulp-shell')

gulp.task('webpack', function(){
    return gulp.src('*.js', {read: false})
    .pipe(shell([
        'webpack'
    ]))
    .pipe(browserSync.stream())
})

gulp.task('sass', function() {
    return gulp.src("./src/scss/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions']
    }))
    .pipe(gulp.dest("./public/css"))
    .pipe(browserSync.stream())
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: './public',
        notify: false,
        open: false
    })
})

gulp.task('default', ['sass', 'webpack', 'browser-sync'], function(){
    gulp.watch('./src/scss/**/*', ['sass'])
    gulp.watch('./src/js/**/*', ['webpack'])
})

gulp.task('sass:minify', function() {
    return gulp.src("./public/css/*.css")
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public/css"))
});

gulp.task('production', ['sass:minify'])

// gulp.task('printName', function(){
//     console.log('My name is Raheim')
// })
// gulp.task('printAge', function(){
//     console.log('I am 25 years old')
// })
// gulp.task('default', ['printName', 'printAge'])



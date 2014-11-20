/**
 install all the dependencies:
 $ npm install gulp-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyHTML = require('gulp-minify-html'),
    del = require('del');

/**
 * Tasks for style files
 * ----------------------------------------------------------------
 * 1 . convert sass to css
 * 2 . auto prefix all browser specific properties
 * 3 . move to assets/css
 * 4 . minify, rename and save in same folder
 */
gulp.task('styles', function () {
    return gulp.src('src/sass/main.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass({sourcemap: true}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/assets/stylesheets'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/assets/stylesheets'))
        .pipe(notify({message: 'Styles task complete', sound: false}));

});

/**
 * Tasks for Html compression
 * ----------------------------------------------------------------
 * 1 . minify and save in root folder
 */
gulp.task('minify-html', function() {
    var opts = {comments:false,spare:true};
    gulp.src('src/documents/**/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./dist/'))
        .pipe(notify({message: 'Html task complete', sound: false}));

});

/**
 * Tasks for javascript files
 * ----------------------------------------------------------------
 * 1 . jshint the javascript
 * 2 . concat all js files in order of filesystem
 * 3 . move to assets/js
 * 4 . minify, rename and save in same folder
 */
gulp.task('scripts', function () {
    return gulp.src([
        'src/javascript/vendors/**/*.js',
        'src/javascript/partials/**/*.js',
        'src/javascript/main.js'
    ])
        .pipe(plumber())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/assets/javascript'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/assets/javascript'))
        .pipe(notify({ message: 'Scripts task complete' , sound: false}));
});

/**
 * Optimize images
 * ----------------------------------------------------------------
 * 1 . Optimize images
 * 2 . move to assets/img
 */
gulp.task('images', function () {
    return gulp.src('src/images/**/*')
        .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
        .pipe(gulp.dest('dist/assets/images'))
        .pipe(notify({message: 'Images task complete', sound: false}));
});

/**
 * Clean up generated files
 * ----------------------------------------------------------------
 * 1 . remove all generated files
 */
gulp.task('clean', function (cb) {
    del(['dist/assets/stylesheets', 'dist/assets/javascript', 'dist/assets/images'], cb)
});

/**
 * Watch for file changes
 * ----------------------------------------------------------------
 * 1 . when scss file changes, do task 'styles'
 * 2 . when js file changes, do task 'scripts'
 * 3 . when image changes, do task 'images'
 * 4 . On new generated file, do live reload of browser
 */
gulp.task('watch', function () {
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/documents/**/*.html', ['minify-html']);
    gulp.watch('src/images/**/*', ['images']);
    //livereload.listen();
    //gulp.watch(['dist/**']).on('change', livereload.changed);
    //gulp.watch(['dist/app/views/**']).on('change', livereload.changed);
});

/**
 * Set default task to generated all dist files
 * ----------------------------------------------------------------
 */
gulp.task('default',  function () {
    gulp.start('styles', 'scripts', 'minify-html', 'images');
});
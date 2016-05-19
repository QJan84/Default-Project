// =============================================
// BASIC GULPFILE
// - - - - - - - - - - - - - - - - - - - - - - -
// This file processes all of the assets in the "src" folder
// and outputs the finished files in the "dist" folder.
// You can also optimize images.
// Delpoy your Website via Sublime Text SFTP!
// =============================================

// =============================================
// 1. LIBRARIES
// =============================================

    var gulp = require('gulp'),
        browserSync = require('browser-sync').create(),
        sass = require('gulp-sass'),
        autoprefixer = require('gulp-autoprefixer'),    
        tinypng = require('gulp-tinypng-compress'),
        uglify = require('gulp-uglify'),
        concat  = require('gulp-concat'),
        plumber = require('gulp-plumber'),
        jshint = require('gulp-jshint'),
        del = require('del'),
        notify = require('gulp-notify');

// =============================================
// 2. SETTINGS VARIABLES & OPTIONS
// =============================================

    // Path for JS concat & minify
    var config = {
      scripts: [
        // jQuery
        'bower_components/jquery/dist/jquery.min.js',
        // Bootstrap
        'bower_components/bootstrap/js/dist/dropdown.js',
        'bower_components/bootstrap/js/dist/collapse.js',
        // Swiper
        'bower_components/Swiper/dist/swiper.min.js',
        // Lightgallery
        'bower_components/lightgallery/dist/js/lightgallery.min.js',
        // Default scripts
        'src/js/**/*.js'
      ]
    };

// =============================================
// 3. TASKS
// =============================================

    // Cleans the dist directory & removes useless files
    gulp.task('clean', function() {
      del('dist/');
    });

    // SASS / CSS
    gulp.task('sass', function() {
      gulp.src('src/scss/master.scss') // file to handle
        .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') })) // error notification to desktop
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // error text in terminal
        .pipe(autoprefixer({browsers: ['last 3 versions'], cascade: false }))
        .pipe(gulp.dest('dist/css')) // output folder
        .pipe(browserSync.stream()); // reload browse
    });

    // JS
    gulp.task('js', function () {
      gulp.src(config.scripts)
        .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
        // Info: jshint deaktiviert, da error
        // Info: jshint deaktiviert, da error
        // Info: jshint deaktiviert, da error
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('jshint-stylish'))
        .pipe(uglify())
        .pipe(concat('master.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
    });

    // Images optimizing
    gulp.task('tinypng', function () {
      gulp.src('src/img/**/*.{png,jpg,jpeg}')
        .pipe(tinypng({
          key: 'WZc_k-S27nIN0pus-IW3jxFqSaQXENjR',
          sigFile: 'src/img/.tinypng-sigs',
          log: true
        }))
        .pipe(gulp.dest('dist/img'));
    });

    // Livereload
    gulp.task('livereload', function() {
      browserSync.init({
          server: {
            baseDir: './',
            directory: true
          }
      });
    });

// =============================================
// 4. SET THE DEV & PROD TASKS
// =============================================

    // Run "gulp" for default Task
    // Run "gulp img" for image optimizing

    // Default
    gulp.task('default', ['livereload', 'sass', 'js'], function () {
      gulp.watch('src/scss/**/*.scss', ['sass']);
      gulp.watch('src/js/**/*.js', ['js']);
      gulp.watch('**/*.html').on('change', browserSync.reload);
    });

    // Optimizing Images
    // tinypng.com - max 500 images per month for free
    gulp.task('img', ['tinypng']);

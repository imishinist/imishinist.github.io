var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var webpack = require('gulp-webpack');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var connect = require('gulp-connect');

var sass_options = {
    errLogToConsole: true
};

gulp.task('sass', function() {
    gulp.src('./src/sass/app.scss')
        .pipe(sass(sass_options))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./css'));
});

var webpack_options = {
    output: {
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /.html$/,
                loader: "html-loader?minimize"
            }
        ]
    }
};
gulp.task('webpack', function() {
    gulp.src(['./src/js/app.js', './src/js/**/*.html'])
        .pipe(webpack(webpack_options))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

var SASS_FILES = './src/sass/**/*.scss';
var JS_FILES = './src/js/**/*.js';

gulp.task('watch', function() {
    watch(JS_FILES, function() {
        gulp.start('webpack');
    });
    watch(SASS_FILES, function() {
        gulp.start('sass');
    });
});

gulp.task('connect', function() {
    connect.server({
        root: __dirname,
        livereload: true
    });
});

gulp.task('default', ['connect', 'watch']);

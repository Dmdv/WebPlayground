var gulp = require('gulp');
var browserify = require('browserify');
var tslint = require('gulp-tslint');
//var watchify = require("watchify");
var gutil = require("gulp-util");
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var paths = {
    pages: ['src/*.html'],
    css: ['css/*.css'],
    libs: ['js/*.js']
};

gulp.task('lint-ts', function() {
    return gulp
        .src('./src/*.ts')
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task('Copy_Css', ['lint-ts'], function() {
    return gulp
        .src(paths.css)
        .pipe(gulp.dest('dist/css'));
});

gulp.task('Copy_Js', ['Copy_Css'], function() {
    return gulp
        .src(paths.libs)
        .pipe(gulp.dest('dist/js'));
});

gulp.task('Copy_Html', ['Copy_Js'], function() {
    return gulp
        .src(paths.pages)
        .pipe(gulp.dest('dist'));
});

var watchedBrowserify = /*watchify(*/ browserify({
    basedir: '.',
    debug: true,
    entries: ['src/script.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify) /*)*/ ;

function bundle() {
    return watchedBrowserify
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.ts']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("dist/js"));
}

gulp.task('default', ['Copy_Html'], bundle);

watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
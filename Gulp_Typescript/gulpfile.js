var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require("watchify");
var gutil = require("gulp-util");
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var paths = {
    pages: ['src/*.html']
};

gulp.task('copyHtml', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
});

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

function bundle() {
    return watchedBrowserify
	    .transform('babelify', {
	        presets: ['es2015'],
	        extensions: ['.ts']
	    })    
        .bundle()
        .pipe(source('bundle.js'))
	    .pipe(buffer())
	    .pipe(sourcemaps.init({loadMaps: true}))
	    .pipe(uglify())
	    .pipe(sourcemaps.write('./'))        
        .pipe(gulp.dest("dist"));
}

gulp.task('default', ['copyHtml'], bundle);

watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
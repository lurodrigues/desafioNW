var gulp   = require('gulp');
var sass   = require('gulp-sass');
var rename = require('gulp-rename');
//var watch  = require('gulp-watch');


/*  -- Variables --  */
// Sass Source
var scssFiles = './style/src/main.scss';

// CSS destination
var cssDest = './style/css';

// Options for development
var sassDevOptions = {
  outputStyle: 'expanded'
}

// Options for production
var sassProdOptions = {
  outputStyle: 'compressed'
}


// Task 'sassdev' - Run with command 'gulp sassdev'
gulp.task('sassdev', function() {
    return  gulp.src  ( scssFiles )
                .pipe ( sass(sassDevOptions).on('error', sass.logError) )
                .pipe ( gulp.dest(cssDest) );
});

gulp.task('sassprod', function() {
    return  gulp.src  ( scssFiles )
                .pipe ( sass(sassProdOptions).on('error', sass.logError) )
                .pipe ( rename('style.min.css') )
                .pipe ( gulp.dest(cssDest) );
});

gulp.task('watch', function() {
    gulp.watch( scssFiles,  gulp.parallel('sassdev', 'sassprod') );
});


gulp.task('default',  gulp.series('sassdev', 'sassprod', 'watch') );




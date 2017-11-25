const browserSync = require('browser-sync');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const header = require('gulp-header');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const webpack = require('gulp-webpack');


const namespace = '7110';

const paths = {
  'html': '**/*.html',
  'src': {
    'es6': 'src/es6/**/*.es6',
    'scss': 'src/scss/**/*.scss',
  },
  'dst': {
    'js': 'dst/js/',
    'css': 'dst/css/',
  }
};


/* ====================
  task modules
==================== */

// compile scss
gulp.task('sass', () => {
  gulp.src(paths.src.scss)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(autoprefixer({
    browsers: ['last 2 versions']
  }))
  .pipe(sass({
    outputStyle: 'expanded'
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.dst.css))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(cleanCSS({
    'compatibility': {
      'properties': {
        'colors': false
      }
    }
  }))
  .pipe(header('/* Copyright 2017 '+namespace+' All Rights Reserved. */\n'))
  .pipe(gulp.dest(paths.dst.css));
});


// compile es6
gulp.task('es6', () => {
  gulp.src(paths.src.es6)
  .pipe(plumber())
  .pipe(webpack(
    require('./webpack.config.js')
  ))
  .pipe(gulp.dest(paths.dst.js))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(uglify())
  .pipe(gulp.dest(paths.dst.js));
});


// browser sync init
gulp.task('bs-init', () => {
  browserSync.init({
    'server': './'
  });
});


// browser sync reload
gulp.task('bs-reload', () => {
  browserSync.reload();
});


/* ====================
  tasks
==================== */

// gulp tasks of starting bs-init and compiling sass and es6 + live reload
gulp.task('default', ['bs-init', 'sass', 'es6'], () => {
  gulp.watch(paths.html, ['bs-reload']);
  gulp.watch(paths.src.scss, ['sass', 'bs-reload']);
  gulp.watch(paths.src.es6, ['es6', 'bs-reload']);
});


// gulp tasks of starting bs-init and compiling sass and es6
gulp.task('compile', ['bs-init', 'sass', 'es6'], () => {
  gulp.watch(paths.src.scss, ['sass']);
  gulp.watch(paths.src.es6, ['es6']);
});

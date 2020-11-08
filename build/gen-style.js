const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css'); //压缩css文件，减小文件大小，并给引用url添加版本号避免缓存
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer'); //设置浏览器版本自动处理浏览器前缀
const components = require('./components.json')

function buildCss(cb) {
  gulp.src('../src/styles/index.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename('lime-ui.css'))
    .pipe(gulp.dest('../lib/styles'));
  cb()
}

function buildSeperateCss(cb) {
  Object.keys(components).forEach(compName => {
    gulp.src(`../src/styles/${compName}.scss`)
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cleanCSS())
      .pipe(rename(`${compName}.css`))
      .pipe(gulp.dest('../lib/styles'));
  })

  cb()
}

exports.default = gulp.series(buildCss, buildSeperateCss)
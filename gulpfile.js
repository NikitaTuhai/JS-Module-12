const gulp = require("gulp");
const rigger = require("gulp-rigger");
const runSequence = require("run-sequence");
const cssnano = require("gulp-cssnano");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");

gulp.task("html", function() {
  gulp
    .src("src/index.html")
    .pipe(rigger())
    .pipe(gulp.dest("build/"))
    .pipe(browserSync.stream());
});

gulp.task("css", function() {
  gulp
    .src("src/CSS/style.css")
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(cssnano())
    .pipe(gulp.dest("build/css/"))
    .pipe(browserSync.stream());
});

gulp.task("js", function() {
  gulp.src("src/*.js")
  .pipe(browserSync.stream());
});

gulp.task("babel-JS", () =>
  gulp
    .src("src/JS/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(gulp.dest("build/js/"))
    .pipe(browserSync.stream())
);

gulp.task("watch", function() {
  gulp.watch("src/HTML/*.html", ["html"]);
  gulp.watch("src/CSS/*.css", ["css"]);
  gulp.watch("src/JS/*.js", ["babel-JS"]);
});

gulp.task("browser-sync", function() {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });
});

gulp.task("build", function(callback) {
  runSequence(
    "html",
    "css",
    "js",
    "babel-JS",
    "watch",
    "browser-sync",
    callback
  );
});

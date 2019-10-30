var gulp        = require('gulp');
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var watch       = require('gulp-watch');
var plumber     = require('gulp-plumber');
var minify_css  = require('gulp-minify-css');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var notify      = require('gulp-notify');
var prefix      = require('gulp-autoprefixer');
var imagemin    = require('gulp-imagemin');
var jshint      = require('gulp-jshint');
// var pngquant    = require('imagemin-pngquant');
var browserSync = require('browser-sync');


var src = {
  sass: "src/sass/**/*.scss",
  js: "src/js/**/*.js",
  img: "src/img/*"
};

var build = {
  js: "build/js",
  css: "build/css",
  img: "build/img/",
  html: "build/*.html",
  min_css: 'main.min.css',
  min_js: 'app.min.js'
};

var onError = function(err){
  console.log(err);
  this.emit('end');
};

gulp.task('sass', function(){
  return gulp.src(src.sass)
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass())
    .pipe(prefix('last 2 versions'))
    .pipe(concat(build.min_css))
    .pipe(gulp.dest(build.css))
    .pipe(minify_css())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(build.css))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function(){
   return gulp.src(src.js)
   .pipe(plumber({
     errorHandler: notify.onError("Error: <%= error.message %>")
   }))
   .pipe(jshint())
   .pipe(jshint.reporter('default'))
   .pipe(uglify())
   .pipe(concat(build.min_js))
   .pipe(sourcemaps.init())
   .pipe(sourcemaps.write())
   .pipe(gulp.dest(build.js))
   .pipe(browserSync.reload({stream: true}));
});

gulp.task('img', function(){
  return gulp.src(src.img)
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest(build.img));
});

gulp.task('watch', function(){
  browserSync.init({
    server: './build'
  });
  gulp.watch(src.sass, ['sass']);
  gulp.watch(src.js, ['js']);
  // gulp.watch(src.img, ['img'])
  gulp.watch(build.html).on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'sass', 'js'])






































// var gulp = require('gulp');
// var sass = require('gulp-sass');
// var browserSync = require('browser-sync').create();
// var useref = require('gulp-useref');
// var uglify = require('gulp-uglify');
// var gulpIf = require('gulp-if');
// var cssnano = require('gulp-cssnano');
// var del = require('del');
// var runSequence = require('run-sequence');
// var autoprefixer = require('gulp-autoprefixer');

// Creating gulp tasks
// gulp.task('task-name', function(){
//     // stuff here
// });

//Gulp watch syntax
// gulp.watch('files-to-watch', ['tasks', 'to', 'run']);

//Watch more than one file
// gulp.task('watch', function(){
//     gulp.watch('files-to-watch', ['tasks', 'to', 'run']);
// });


// compiles sass to css
// gulp.task('sass', function(){
//     return gulp.src('src/sass/*.scss')
//         .pipe(sass())//Using gulp-sass
//         .pipe(autoprefixer('last 2 version'))
//         .pipe(gulp.dest('src/css'))
//         .pipe(browserSync.reload({
//             stream: true
//         }))
// })
//
// // watches for changes
// gulp.task('watch', ['browserSync', 'sass', 'useref'], function(){
//     gulp.watch('src/sass/*.scss', ['sass']);
//     gulp.watch('src/*.html', browserSync.reload);
//     gulp.watch('src/js/*.js')
// });
//
// // starts up a live server
// gulp.task('browserSync', function(){
//     browserSync.init({
//         server: {
//             baseDir: 'src'
//         },
//     })
// });
//
// // Takes all js files and puts into one js file
// gulp.task('useref', function(){
//     return gulp.src('src/*.html')
//     .pipe(useref())
//     .pipe(gulpIf('*.js', uglify()))//Minifes only if a js file
//     .pipe(gulpIf('*.css', cssnano()))//Minifes only if a css file
//     .pipe(gulp.dest('build'))
// });
//
// gulp.task('clean:build', function(){
//     return del.sync('build');
// })
//
// gulp.task('build', function(callback){
//     runSequence('clean:build',
//         ['sass', 'useref'],
//         callback
//     )
// })
// gulp.task('default', function(callback){
//     runSequence(['sass', 'browserSync', 'watch'])
//     callback
// })

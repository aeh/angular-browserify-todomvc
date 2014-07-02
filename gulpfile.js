var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('gulp-browserify'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    envify = require('envify'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    protractor = require('gulp-protractor').protractor,
    uglify = require('gulp-uglify'),
    webdriver_update = require('gulp-protractor').webdriver_update;

// modules for webserver and livereload
var embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = process.env.PORT || 3000;

// dev default
gulp.task('default', ['dev']);

// build task
gulp.task('build', ['static', 'styles', 'browserify']);

// dev task
gulp.task('dev', ['lint', 'build', 'test', 'watch'], function() {
  // setup and start an express server
  var server = express();
  server.use(livereload({ port: livereloadport }));
  server.use(express.static('./dist'));
  server.all('/*', function(req, res) {
    res.sendfile('index.html', { root: 'dist' });
  });
  server.listen(serverport);
  // start live reload server
  lrserver.listen(livereloadport);
});

// jshint task
gulp.task('lint', function() {
  gulp.src('app/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// build styles
gulp.task('styles', function() {
  gulp.src('app/styles/*.less')
    .pipe(less({
      paths: [ __dirname + '/node_modules/twitter-bootstrap-3.0.0/less' ],
      onError: function(e) { console.log(e); } // prevent gulp from crashing with less mistakes
    }))
    .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css/'))
    .pipe(refresh(lrserver));
});

// browserify
gulp.task('browserify', function() {
  gulp.src(['app/scripts/app.js']) // single point of entry
    .pipe(browserify({
      insertGlobals: true,
      transform: ['envify'],
      debug: true
    }))
    .pipe(concat('bundle.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('dist/js'));
});

// copy static files
gulp.task('static', function() {
  gulp.src('dist/**/*.{html,gif,jpg}', { read: false })
    .pipe(clean());
  gulp.src('app/**/*.{html,gif,jpg}')
    .pipe(gulp.dest('dist/'))
    .pipe(refresh(lrserver));
});

gulp.task('webdriver_update', webdriver_update);
gulp.task('test', function(cb) {
  // setup and start express test server
  var app = express();
  app.use(express.static('./dist'));
  app.all('/*', function(req, res) {
    res.sendfile('index.html', { root: 'dist' });
  });
  var server = require('http').createServer(app);
  server.listen(0);

  function cleanup() {
    server.close();
    cb();
  }

  gulp.src(['tests/**/*.js'])
    .pipe(protractor({
      configFile: 'protractor.config.js',
      args: ['--baseUrl', 'http://' + server.address().address + ':' + server.address().port]
    }))
    .on('error', cleanup)
    .on('end', cleanup);
});

// watch for changes
gulp.task('watch', function() {
  gulp.watch(['app/scripts/**/*.js'],['lint', 'browserify']);
  gulp.watch(['app/styles/**/*.less'], ['styles']);
  gulp.watch(['app/**/*.html'], ['views']);
  gulp.watch(['test/**/*.js', 'dist/**/*.{js,html}'], ['test']);
});

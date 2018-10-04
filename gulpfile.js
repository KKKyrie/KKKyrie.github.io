var gulp = require('gulp');
var connect = require('gulp-connect');
var minifyJs = require('gulp-minify');
var minifyCss = require('gulp-clean-css');

gulp.task('connect', function(){
	connect.server({
		root: './',
		port: 3000,
		livereload: true,
		host: 'localhost'
	});
});

gulp.task('refresh', function(){
	gulp.src('./index.html')
	.pipe(connect.reload());
});


gulp.task('minifyJs', function(){
	gulp.src(['./src/js/*.js'])
	.pipe(minifyJs())
	.pipe(gulp.dest('./static/js'))
	.pipe(connect.reload());
});

gulp.task('minifyCss', function(){
	gulp.src(['./src/css/*.css'])
	.pipe(minifyCss())
	.pipe(gulp.dest('./static/css'))
	.pipe(connect.reload());
});

gulp.task('watch', function(){
	var watcher = gulp.watch(
		[
			'./src/css/*.css',
			'./*.html',
			'./src/js/*.js'
		], 
		[
			'minifyCss', 
			'minifyJs'
		]
	);

	watcher.on('change', function(ev){
		console.log(ev.path + ' was ' + ev.type);
	});
});

gulp.task('default', ['connect', 'watch', 'minifyCss', 'minifyJs']);
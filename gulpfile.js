var gulp = require('gulp');
var connect = require('gulp-connect');

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

gulp.task('watch', function(){
	var watcher = gulp.watch([
		'./*.css',
		'./*/*.css',
		'./*.html',
		'./*/*.html',
		'./*.js',
		'./*/*.js'
	], ['refresh']);
	watcher.on('change', function(ev){
		console.log(ev.path + ' was ' + ev.type);
	});
});

gulp.task('default', ['refresh', 'connect', 'watch']);
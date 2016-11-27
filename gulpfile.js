var gulp            = require('gulp');
var less            = require('gulp-less');
var autoprefixer    = require('gulp-autoprefixer');
var uglify          = require('gulp-uglify');
var csscomb         = require('gulp-csscomb');
var imagemin        = require('gulp-imagemin');
var browserSync     = require('browser-sync');
var reload          = browserSync.reload;

// Paths
var paths = {
	less: {
		src: 'less/design.less',
		dest: 'public/css/',
		watch: 'less/**'
	},
	html: {
		watch: 'public/*.*'
	},
	js: {
		src: 'assets/js/*.js',
		dest: 'public/js/',
		watch: 'assets/js/**'
	},
	imgs: {
		src: 'assets/img/*',
		dest: 'public/img/',
		watch: 'assets/img/*.*'
	}
};

// Compile LESS + Autoprefix
gulp.task('less', function () {
	gulp.src(paths.less.src)
		.pipe(less())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(paths.less.dest))
		.pipe(reload({stream:true}));
});

// Uglify JS
gulp.task('uglify', function(){
	gulp.src(paths.js.src)
		.pipe(uglify())
		.pipe(gulp.dest(paths.js.dest))
		.pipe(reload({stream:true}));
});

// Images
gulp.task('imagemin', function () {
	gulp.src(paths.imgs.src)
	.pipe(imagemin())
	.pipe(gulp.dest(paths.imgs.dest));
});

// Browser sync
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: "public",
			directory: true
		}
	});
});

gulp.task('bs-reload', function () {
	browserSync.reload();
});

gulp.task('watch', ['browser-sync'], function () {
	gulp.watch(paths.less.watch, ['less']);
	gulp.watch(paths.js.watch, ['uglify']);
	gulp.watch(paths.html.watch, ['bs-reload']);
	gulp.watch(paths.imgs.watch, ['imagemin']);

});

gulp.task('default', ['less', 'uglify', 'imagemin']);

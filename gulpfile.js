/**
 * Created by czzou on 2016/1/18.
 */
var gulp = require("gulp");
var concat = require('gulp-concat')
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var uglify = require('gulp-uglify');//压缩JS
runSequence = require('run-sequence'); //执行顺序，避免


/**
 * 使用正式配置打包
 */
//
gulp.task('webpack-build', ['concat-dll'], function (callback) {
    webpack(webpackConfig(false), function (err, stats) {
        if (err) { console.log(err) }
        callback();
    });
});

gulp.task('webpack-dev', ['concat-dll'], function (callback) {
    webpack(webpackConfig(true), function (err, stats) {
        if (err) { console.log(err) }
        callback();
    });
});

/**
 * 合并lib文件
 */
gulp.task('concat-dll', function () {
    gulp.src(['./view/dev/assets/dll/vue*.js'])
        .pipe(concat('dll.js'))
        .pipe(uglify({
            compress: { drop_console: true }
        }))
        .pipe(gulp.dest('./view/dist/assets/lib'))
})




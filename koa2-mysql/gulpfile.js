var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
gulp.task('default', function() {
    nodemon({
        script: 'app.js',
        ext: 'js ejs css scss',
        env: {
            NODE_ENV: 'development'
        }
    })
})
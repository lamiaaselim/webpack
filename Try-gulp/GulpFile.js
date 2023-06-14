// function task1(){
//     // logic
//     return Promise.resolve()
// }

// // // defualt export // gulp
// // exports.defualt =task1();

// // named export // gulp t1
// exports.t1 =task1
// 
// global object 
const globs = {
    html: "oldProject/*.html",
    css: "oldProject/style/**/*.css",
    js: "oldProject/scripts/**/*.js",
    img: "oldProject/image/*"
}
// ================================================================
const { src, dest, series, parallel, watch } = require('gulp');
const htmlmin = require('gulp-htmlmin');

function htmlTask(){
    // read html file 
    return src(globs.html)
    // minify file 
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    // move to dist
    .pipe(dest('dist'));
    

}
exports.html = htmlTask;

// css task
const concat = require('gulp-concat');
const cleancss = require('gulp-cleancss');
function cssTask(){
    // read html file 
    return src(globs.css)
    // combine fils
    .pipe(concat("style.min.css"))
    // minify file 
    .pipe(cleancss())
    // move to dist
    .pipe(dest("dist/assets"))
    

}
exports.css = cssTask;

// Js Task
const terser = require('gulp-terser');
function jsTask(){
    // read html file 
    return src(globs.js)
    // combine fils
    .pipe(concat("script.min.css"))
    // minify file 
    .pipe(terser())
    // move to dist
    .pipe(dest("dist/assets"))
    
}
exports.js = jsTask;

// Images Task
const optimizeImages =require("gulp-optimize-images");
function imgTask(){
    // read html file 
    return src(globs.img)
    // combine fils
    .pipe(optimizeImages({compressOptions:{
        jpeg: {
            quality: 80,
            progressive: true,
        },
        png: {
            quality: 90,
            progressive: true,
            compressionLevel: 6,
        },
        webp: {
            quality: 80,
        },
    }}))
    // move to dist
    .pipe(dest("dist/assets/imgs"))
    
}
exports.img = imgTask;

function watchTask(){
    watch(globs.html, htmlTask)
    watch(globs.css, cssTask)
    watch(globs.js, jsTask)
    watch(globs.img, imgTask)
}

// To run all tasks 
exports.default = series( 
    parallel(htmlTask, cssTask, jsTask, imgTask),
    watchTask);
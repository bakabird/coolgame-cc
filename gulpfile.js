const gulp = require('gulp')
const rollup = require('rollup')
const ts = require('gulp-typescript');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;
const dts = require('dts-bundle')
const tsProject = ts.createProject('tsconfig.json', { declaration: true });

const onwarn = warning => {
    // Silence circular dependency warning for moment package
    if (warning.code === 'CIRCULAR_DEPENDENCY')
        return

    console.warn(`(!) ${warning.message}`)
}

gulp.task('buildJs', () => {
    return tsProject.src().pipe(tsProject()).pipe(gulp.dest('./build'));
})

gulp.task("rollup", async function () {
    let config = {
        input: "build/CoolGameCC.js",
        external: ['cc', 'cc/env'],
        output: {
            file: 'dist/coolgame-cc.mjs',
            format: 'esm',
            extend: true,
            name: 'coolgame',
        }
    };
    const subTask = await rollup.rollup(config);
    await subTask.write(config.output);
});

gulp.task("uglify", function () {
    return gulp.src("dist/coolgame-cc.mjs")
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify(/* options */))
        .pipe(gulp.dest("dist/"));
});

gulp.task('buildDts', function () {
    return new Promise(function (resolve, reject) {
        dts.bundle({ name: "coolgame-cc", main: "./build/CoolGameCC.d.ts", out: "../dist/coolgame-cc.d.ts" });
        resolve();
    });
})

gulp.task('build', gulp.series(
    'buildJs',
    'rollup',
    'uglify',
    'buildDts'
))
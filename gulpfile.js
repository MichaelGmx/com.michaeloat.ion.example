const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');

const clean = require('gulp-clean');
const runSequence = require('run-sequence');

const concat = require('gulp-concat');
const ngmin = require('gulp-ngmin');
const uglify = require('gulp-uglify');
const stripDebug = require('gulp-strip-debug');
const ngAnnotate = require('gulp-ng-annotate');

const htmlreplace = require('gulp-html-replace');
const replace = require('gulp-replace');
const gulpif = require('gulp-if');

const GB_PROJECT = require('./src/environment');
const srcDir = 'src';
const wwwDir = 'www';

var paths = {
  sass: ['./scss/**/*.scss', './src/**/*.scss'],

  pathJsModel: `./models/**/*.js`,

  pathHtmlIndex: `./${srcDir}/index.html`,
  pathHtmlTemplate: `./${srcDir}/**/*.html`,

  pathJsUtil: `./${srcDir}/js/**/*.js`,
  pathJsMainJs: [`./${srcDir}/main.js`, `./${srcDir}/environment.js`],
  pathJsConstant: `./${srcDir}/constants/**/*.js`,
  pathJsConfig: `./${srcDir}/configs/**/*.js`,
  pathJsRouting: `./${srcDir}/routings/**/*.js`,
  pathJsRun: `./${srcDir}/runs/**/*.js`,
  pathJsDirective: `./${srcDir}/directives/**/*.js`,
  pathJsFilter: `./${srcDir}/filters/**/*.js`,
  pathJsService: `./${srcDir}/services/**/*.service.js`,
  pathJsComponent: [`./${srcDir}/components/**/*.js`, `./${srcDir}/pages/**/components/**/*.js`],
  pathJsPage: `./${srcDir}/pages/**/*.page.js`
};

/**
 * ionic1 default task
 */
gulp.task('default', ['sass']);

function sassTask(srcPath, outPath) {
  return gulp.src(srcPath)
  .pipe(sass())
  .on('error', sass.logError)
  .pipe(gulp.dest(outPath))
  .pipe(cleanCss({
    keepSpecialComments: 0
  }))
  .pipe(rename({ extname: '.min.css' }))
  .pipe(gulp.dest(outPath));
}

gulp.task('sass', () => {
  sassTask('./scss/ionic.app.custom.scss', `./${srcDir}/css/`);
  sassTask('./scss/style.scss', `./${srcDir}/css/`);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
});



/**
 * custom task
 */

 // 清空www目錄
gulp.task('clean', () => {
  return gulp.src(`./${wwwDir}/*`)
    .pipe(clean());
});

// 压缩 Models
gulp.task('minModels', () => {
  return gulp.src(paths.pathJsModel)
    .pipe(concat('models.js'))
    .pipe(gulp.dest(`./${srcDir}/js`))
    .pipe(rename('models.min.js'))
    .pipe(uglify({ compress: true }))
    .pipe(gulp.dest(`./${srcDir}/js`));
});

// index.html 字符替換
gulp.task('uxHtmlIndex', () => {
  return gulp.src(paths.pathHtmlIndex)
    // 使用壓縮后的js
    .pipe(htmlreplace({
      'constantjs': `js/ux-constants.${GB_PROJECT.ENV === 'REAL' ? 'min.' : ''}js?v=${GB_PROJECT.VERSION}`,
      'configjs': `js/ux-configs.${GB_PROJECT.ENV === 'REAL' ? 'min.' : ''}js?v=${GB_PROJECT.VERSION}`,
      'routingjs': `js/ux-routings.${GB_PROJECT.ENV === 'REAL' ? 'min.' : ''}js?v=${GB_PROJECT.VERSION}`,
      'runjs': `js/ux-runs.${GB_PROJECT.ENV === 'REAL' ? 'min.' : ''}js?v=${GB_PROJECT.VERSION}`,
      'directivejs': `js/ux-directives.${GB_PROJECT.ENV === 'REAL' ? 'min.' : ''}js?v=${GB_PROJECT.VERSION}`,
      'filterjs': `js/ux-filters.${GB_PROJECT.ENV === 'REAL' ? 'min.' : ''}js?v=${GB_PROJECT.VERSION}`,
      'servicejs': `js/ux-services.${GB_PROJECT.ENV === 'REAL' ? 'min.' : ''}js?v=${GB_PROJECT.VERSION}`,
      'componentjs': `js/ux-components.${GB_PROJECT.ENV === 'REAL' ? 'min.' : ''}js?v=${GB_PROJECT.VERSION}`,
      'pagejs': `js/ux-pages.${GB_PROJECT.ENV === 'REAL' ? 'min.' : ''}js?v=${GB_PROJECT.VERSION}`
    }))

    // 正式版 使用壓縮版js
    .pipe(gulpif(GB_PROJECT.ENV === 'REAL', replace('<script src="js/models.js?v=0.0.0"></script>', '<script src="js/models.min.js?v=0.0.0"></script>')))

    // 添加版本號
    .pipe(replace('?v=0.0.0', `?v=${GB_PROJECT.VERSION}`))

    // 正式版 去除 注釋
    // .pipe(gulpif(GB_PROJECT.ENV === 'REAL', replace('<!-- real-use ', '')))
    // .pipe(gulpif(GB_PROJECT.ENV === 'REAL', replace(' real-use -->', '')))
    .pipe(gulpif(GB_PROJECT.PLATFORM === 'APP', replace('<!-- app-use ', '')))
    .pipe(gulpif(GB_PROJECT.PLATFORM === 'APP', replace(' app-use -->', '')))
    // // 正式版 去除 測試提示
    // .pipe(gulpif(GB_PROJECT.ENV === 'REAL', replace('<div class="test-tip-board">當前為：測試版</div>', '')))

    .pipe(gulp.dest(`./${wwwDir}/`));
});

// 複製 template
gulp.task('uxHtmlTemplate', () => { // page、component、modal 的template html
  return gulp.src([paths.pathHtmlTemplate, '!'+paths.pathHtmlIndex])
    .pipe(gulp.dest(`./${wwwDir}`));
});

// 壓縮 Pure Js
function minPureJs(taskName, sourcePath, outputDir) {
  gulp.task(taskName, () => {
    return gulp.src(sourcePath)
      .pipe(uglify({ compress: true }))
      .pipe(gulp.dest(outputDir));
  });
}

minPureJs('copyUtilJs', paths.pathJsUtil, `./${wwwDir}/js`);
minPureJs('copyMainJs', paths.pathJsMainJs, `./${wwwDir}/`);

// 壓縮 AngularJs
function minNgJs(taskName, sourcePath, outputFileName) {
  gulp.task(taskName, () => {
    return gulp.src(sourcePath)
      .pipe(concat(outputFileName + '.js'))
      .pipe(gulp.dest(`./${wwwDir}/js`))
      .pipe(rename(outputFileName + '.min.js'))
      .pipe(ngAnnotate())
      .pipe(ngmin({ dynamic: false }))
      .pipe(stripDebug())
      .pipe(uglify({ compress: true }))
      .pipe(gulp.dest(`./${wwwDir}/js`));
  });
}

minNgJs('minConstant', paths.pathJsConstant, 'ux-constants');
minNgJs('minConfig', paths.pathJsConfig, 'ux-configs');
minNgJs('minRouting', paths.pathJsRouting, 'ux-routings');
minNgJs('minRun', paths.pathJsRun, 'ux-runs');
minNgJs('minDirective', paths.pathJsDirective, 'ux-directives');
minNgJs('minFilter', paths.pathJsFilter, 'ux-filters');
minNgJs('minService', paths.pathJsService, 'ux-services');
minNgJs('minComponent', paths.pathJsComponent, 'ux-components');
minNgJs('minPage', paths.pathJsPage, 'ux-pages');

// 複製 圖片
gulp.task('copyImage', () => {
  return gulp.src('./src/img/**/*.*')
    .pipe(gulp.dest(`./${wwwDir}/img`));
});

// 複製 插件庫
gulp.task('copyLib', () => {
  return gulp.src('./src/lib/**/*.*')
    .pipe(gulp.dest(`./${wwwDir}/lib`));
});

// 複製 css
gulp.task('copyCss', () => {
  return gulp.src('./src/css/**/*.*')
    .pipe(gulp.dest(`./${wwwDir}/css`));
});

// 構建 發佈
gulp.task('build', ['clean'], () => {
  runSequence('clean',
              ['copyImage', 'copyLib', 'copyCss'],
              'uxHtmlTemplate',
              'uxHtmlIndex',
              ['sass',
               'copyUtilJs', 'copyMainJs',
               'minConstant', 'minConfig', 'minRouting', 'minRun', 'minDirective', 'minFilter', 'minService', 'minComponent', 'minPage']);
});

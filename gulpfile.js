var gulp       = require('gulp'), // Подключаем Gulp
    sass         = require('gulp-sass'), //Подключаем Sass пакет,
    pug         = require('gulp-pug'), //Подключаем Pug пакет,
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    concat      = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minify     = require('gulp-htmlmin');
    
gulp.task('sass', () => { // Создаем таск Sass
    return gulp.src('app/scss/main.scss') // Берем источник
        .pipe(sass().on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('pug', () => { // Создаем таск Pug
    return gulp.src('app/pug/**/*.pug') // Берем источник
        .pipe(pug()) // Преобразуем Pug в Html посредством gulp-pug
        .pipe(minify()) // Удаляем лишние Пробелы/комментарии
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true})) // Обновляем Html на странице при изменении
});

gulp.task('browserSync', (done) => { // Создаем таск browser-sync
    browserSync.init({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'dist' // Директория для сервера - dist
        },
        notify: false // Отключаем уведомления
    });
    browserSync.watch('dist').on('change', browserSync.reload)
    done();
});

gulp.task('scripts', () => {
    return gulp.src('app/js/**/*.js')
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js')); // Выгружаем в папку dist/js
});

gulp.task('clean', (done) => {
    del.sync(['dist']); // Удаляем папку dist перед сборкой
    done();
});

gulp.task('build', gulp.series('clean', 'pug', 'sass', 'scripts', (done) => {
    gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'))
    gulp.src('app/img/**/*') // Переносим IMG в продакшен
    .pipe(gulp.dest('dist/img'));
    done();
}));

gulp.task('watch', gulp.series('build', 'browserSync', (done) => {
    gulp.watch('app/pug/**/*.pug', gulp.series('pug')); // Наблюдение за PUG файлами
    gulp.watch('app/scss/**/*.scss', gulp.series('sass')); // Наблюдение за sass файлами
    gulp.watch('app/js/common.js', gulp.series('scripts'));   // Наблюдение за JS файлами в папке js
    done();
}));

gulp.task('default', gulp.series('watch'));
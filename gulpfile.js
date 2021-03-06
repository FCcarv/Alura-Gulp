var gulp = require('gulp')
,imagemin = require('gulp-imagemin')
,clean = require('gulp-clean')
,concat = require('gulp-concat')
,htmlReplace = require('gulp-html-replace')
,uglify = require('gulp-uglify')
,usemin = require('gulp-usemin')
,cssmin = require('gulp-cssmin')
,browserSync = require('browser-sync')
,autoprefixer = require('gulp-autoprefixer');

/*esta a tarefa que esta dando o start e faz com que todas as 3 buid-img, 
buid-js*,buid-html e funciona juntas em paralelo**/
// gulp.task('default',['copy'], function() {
//     gulp.start('build-img','build-js','build-html');
// });



/*foi modificada esta tarefa que esta dando o start e faz com que todas as 2 buid-img, 
usemin e funciona juntas em paralelo*/
gulp.task('default',['copy'], function() {
    gulp.start('build-img','usemin');
});

/*roda depois da tarefa clean e copia todas as pastas e os arquivos, p pasta dist*/
gulp.task('copy',['clean'], function() {
    return gulp.src('src/**/*')
      .pipe(gulp.dest('dist'));
});

/*limpa a pasta dist é a primeira que roda*/
gulp.task('clean', function() {
    return gulp.src('dist')
    .pipe(clean());
});

/*tem a função de diminuir as imgs sem perda de qualidade*/
gulp.task('build-img', function() {

    gulp.src('dist/img/**/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img/'));
});

// /*junta e concatena todos os arquivos js pra dentro da pasta dist na ordem abaixo :
// 1-jquery.js', 2-dist/js/home.js',3-dist/js/produto.js */
// gulp.task('build-js', function() {

//     gulp.src(['dist/js/jquery.js', 'dist/js/home.js','dist/js/produto.js'])
//     .pipe(concat('all.js'))
//     .pipe(uglify()) //minifica o arquivo all.js antes de mandar pra pasta dist
//     .pipe(gulp.dest('dist/js'));
// });

// /*modifica os nome dos aquivos js na chamadas das paginas html,
// indenticadas pelo comentario build:js */
// gulp.task('build-html', function() {
    
//     gulp.src('dist/**/*.html')
//     .pipe(htmlReplace({
//     	js:'js/all.js'
//     }))
//     .pipe(gulp.dest('dist'));
// });


/*Essa tarefa substitui outras duas 'build-js','build-html',*/
/*modifica os nome dos aquivos js na chamadas das paginas html, 
indenticadas pelo comentario build:js e tbm arquivos css build:css */
/*E ainda minifica os arquivos css e js*/
gulp.task('usemin', function() {
   //SÓ P/ SABER:nessas chamadas abaixo de pluglins que rodam eM paralelo no js ou css poderia colocar mais algumas 
   //na sequencia que o usemin aceitaria tranquilamente. 
    gulp.src('dist/**/*.html')
    	.pipe(usemin({
    		'js':[uglify],
    		'css':[autoprefixer, cssmin]
    	}))
    	.pipe(gulp.dest('dist'));

});

gulp.task('server', function() {
    
    browserSync.init({

    	server:{
    		baseDir:'src'
    	}
    	//localhost:3000  na url seria a raiz da pasta src.
    });
    gulp.watch('src/**/*').on('change', browserSync.reload);
});
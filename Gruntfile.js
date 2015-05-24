module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt, {scope: 'dependencies'});

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		less: {
			style: {
				files: {
					'css/style.css': 'less/style.less'
				}
			}
		},

		sass: {
			style: {
				files: {
					'css/style.css': 'sass/style.scss'
				}
			}
		},

		lintspaces: {
			test: {
				src: [
					'*.html',
					'js/*.js',
					'less/*.less',
					'sass/*.sass'
				],
				options: {
					editorconfig: '.editorconfig'
				}
			}
		},

		githooks: {
			test: {
				'pre-commit': 'lintspaces:test',
			}
		},

		copy: {
			gosha: {
				files: [{
					expand: true,
					src: [
						'*.html',
						'css/**',
						'img/**',
						'js/**'
					],
					dest: 'gosha',
				}]
			}
		},

		clean: {
			gosha: [
				'gosha/img/README',
				'gosha/js/README'
			]
		},

		watch: {
			styles: {
				files: ['less/**/*.*'],
				tasks: ['styles'],
				options: {
					spawn: false,
				}
			},
		},

		notify: {
			less: {
				options: {
					title: 'Готово!',
					message: 'LESS скомпилирован'
				}
			},
			make: {
				options: {
					title: 'Готово!',
					message: 'make завершен!'
				}
			},
		},
	});

	grunt.registerTask('test', ['lintspaces:test']);

	grunt.registerTask('styles', [
		'less',
		'notify:less'
	]);

	grunt.registerTask('make', [
		'styles',
		'notify:make'
	]);

	grunt.registerTask('default', [
		'make',
	]);

	grunt.registerTask('w', [
		'watch',
	]);

	if (grunt.file.exists(__dirname, 'less', 'style.less')) {
		grunt.registerTask('gosha', ['less:style', 'copy:gosha', 'clean:gosha']);
	} else if (grunt.file.exists(__dirname, 'sass', 'style.scss')) {
		grunt.registerTask('gosha', ['sass:style', 'copy:gosha', 'clean:gosha']);
	} else {
		grunt.registerTask('gosha', ['copy:gosha', 'clean:gosha']);
	}
};

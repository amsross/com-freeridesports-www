"use strict";

module.exports = function(grunt) {
	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		watch: {
			img: {
				files: [
					"_assets/img/**"
				],
				tasks: ["imagemin"],
				options: {
					livereload: true,
				},
			},
			less: {
				files: [
					"!*.swp",
					"_assets/less/*.less"
				],
				tasks: ["less"],
				options: {
					livereload: true
				}
			}
		},
		less: {
			dist: {
				files: {
					"assets/css/main.min.css": [
						"_assets/less/app.less"
					]
				},
				options: {
					compress: true,
					outputSourceFiles: true,
					sourceMap: true,
					sourceMapBasepath: "../../",
					sourceMapFilename: "assets/css/main.min.css.map",
					sourceMapURL: "main.min.css.map"
				}
			}
		},
		imagemin: {
			dist: {
				options: {
					interlaced: true,
					optimizationLevel: 7,
					pngquant: true,
					progressive: true
				},
				files: [{
					expand: true,
					cwd: "_assets/img/",
					src: [
						"**/*.*",
						"!**/Thumbs.db",
						"!**/.DS_Store",
					],
					dest: "assets/img/"
				}]
			}
		},
		jekyll: {
			dist: {
				options: {
					config: "_config.yml"
				}
			}
		}
	});

	//Load NPM tasks
	grunt.loadNpmTasks("grunt-contrib-imagemin");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-jekyll");

	//Making grunt default to force in order not to break the project.
	grunt.option("force", true);

	//Default task(s).
	grunt.registerTask("default", [
		"less",
		"imagemin"
	]);

	grunt.registerTask("dev", [
		"default",
		"watch"
	]);

	grunt.registerTask("build", [
		"default",
		"jekyll"
	]);
};

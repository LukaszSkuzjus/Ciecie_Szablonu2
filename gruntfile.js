module.exports = function(grunt) {

  //2. krok - konfiguracja tasków
  grunt.initConfig({

    jshint: {
        all: ['js/*.js']
    },
    sass: {
    	options: {
      		sourceMap: true
        },
        dist: {
        	files: [{
        		'css/reset.css': 'scss/reset.scss',
			'css/styles.css': 'scss/styles.scss',
			'css/rwd.css': 'scss/rwd.scss'
      }]
    }
  },

  imagemin: {
    dynamic: {
        files: [{
            expand: true,
            cwd: 'images/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'images/build/'
        }]
    }
  },

  uglify: {
    my_target: {
    files: {
      'dest/output.min.js': 'js/*.js'
    }
    }
  },

cssmin: {
  minify: {
    expand: true,
    cwd: 'css/',
    src: ['*.css', '!*.min.css'],
    dest: 'release/css/',
    ext: '.min.css'
  }
},

   browserSync: {
      default_options: {
        bsFiles: {
          src: [
            "release/css/*.css",
	    "dest/*.js",
	    "images/build/*.{png,jpg,gif}",
            "*.html"
          ]
        },
        options: {
          watchTask: true,
          server: {
             baseDir: "./"
          }
        }
      }
    },

  watch: {

	sass:{
        	files: ['scss/*.scss'],
        	tasks: ['sass', 'cssmin'],
        	options: {
            		spawn: false,
            		livereload: true
        	},
    
	},

	
	imagemin: {
        	files: ['images/*.{png,jpg,gif,jpeg}'],
        	tasks: ['imagemin'],
        	options: {
            		spawn: false,
			livereload: true
        	},
    	},
	uglify: {
        	files: ['js/*.js'],
        	tasks: ['uglify'],
        	options: {
            		spawn: false,
			livereload: true
        	},
    	},
	jshint: {
        	files: ['js/*.js'],
        	tasks: ['jshint'],
        	options: {
            		spawn: false,
        	},
    	}

	


  }//koniec watch





  });

  // 1. krok -> ³adowanie paczki z npm-a
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-jshint');


  // 3. W³¹czanie tasków
  grunt.registerTask('default', ["imagemin","jshint","sass", "uglify","cssmin","browserSync","watch"]);
};
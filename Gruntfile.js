module.exports = function (grunt) {

  var banner = [
    '//     <%= pkg.name %> <%= pkg.version %>',
    '//     <%= pkg.homepage %>',
    '//     (c) 2014 <%= pkg.author %>',
    '//     <%= pkg.name %> may be freely distributed under the MIT license.'
  ].join('\n');

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    rig: {
      compile: {
        options: {
          banner: banner + '\n\n'
        },
        files: {
          'build/tcomb-commons.js': [
            'src/tcomb-commons.js'
          ]
        }
      }
    },
    
    mochaTest: {
      all: {
        src: ['test/**/*.js']
      }
    },

    watch: {
      options: {
        interrupt: true,
        debounceDelay: 250
      },
      files: [
        'src/*',
        'test/*'
      ],
      tasks: [
        'default'
      ]
    },

    emu: {
      'README.md': 'build/tcomb-commons.js'
    }

  });

  // plugins
  grunt.loadNpmTasks('grunt-rigger');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // tasks
  grunt.registerMultiTask('emu', function () {
    var emu = require('emu'),
      fs = require('fs'),
      source = fs.readFileSync(this.data, 'utf8');

    fs.writeFileSync(this.target, emu.getComments(source));
  });
  grunt.registerTask('doc', ['rig', 'emu']);
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('default', ['rig', 'test', 'watch']);
  grunt.registerTask('build', ['rig', 'test', 'emu']);
};
/*global module*/
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*\n<%= pkg.name %> v.<%= pkg.version %> - <%= pkg.description %>\n<%= grunt.template.today("dd-mm-yyyy") %>\n*/\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': 'src/<%= pkg.name %>.js'
        }
      }
    },

    bump: {
      scripts: {
        files: ['package.json', 'bower.json', 'README.md'],
        updateConfigs: ['pkg'],
        //commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        //push: false,
        //pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('default', ['bump', 'uglify']);

};

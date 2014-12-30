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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify']);

};

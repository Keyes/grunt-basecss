/*
 * grunt-basecss
 * https://github.com/kernjuli/grunt-basecss
 *
 * Copyright (c) 2015 Julian Kern
 * Licensed under the MIT license.
 */

'use strict';

var Basecss = require('basecss');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('basecss', 'Wrapper for "basecss", an NPM module which extracts basic CSS rules for inlining them in your index.html, similar to critical CSS', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});

    delete options.htmlFile;
    delete options.cssFile;

    options.overwriteCSS = false;
    options.showLog = false;

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).forEach(function(s) {

        options.htmlFile = f.dest;
        options.cssFile = s;

        new Basecss(options).run();
      });
    });
  });

};

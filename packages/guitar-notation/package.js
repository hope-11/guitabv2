Package.describe({
  name: 'houpeng:guitar-notation',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.5.1');
  api.use(['ecmascript', 'jquery']);
  api.addFiles([
      'parameters.js',
      'tab.js',
      'tab-head.js',
      'guitar-bar.js',
      'guitar-note.js',
      'guitar-chord.js',
      'numbered-note.js',
      'numbered-bar.js',
      'notation-legato.js'
  ], 'client');
  api.export(['SVG', 'guitarTab'], 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('houpeng:guitar-notation');
  api.mainModule('guitar-notation-test.js');
});

Npm.depends({
    'svg.js': '2.6.3'
});

Package.describe({
  name: 'tomi:diff',
  version: '1.0.1',
  // Brief, one-line summary of the package.
  summary: 'Visualises differences between two textual files (diff)',
  // URL to the Git repository containing the source code for this package.
  git: 'https://tomitrescak@github.com/tomitrescak/meteor-diff.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');

  api.addFiles(['difflib.js'], ['client', 'server']);
  api.addFiles(['diffview.js', 'diffview.css'], ['client']);
  api.addFiles(['diffviewsimple.js'], ['server', 'client']);

  api.export('DiffView', ['client']);
  api.export('DiffViewSimple', ['client', 'server']);
});

//Package.onTest(function(api) {
//  api.use('tinytest');
//  api.use('tomi:simplediff');
//  api.addFiles('tomi:simplediff-tests.js');
//});

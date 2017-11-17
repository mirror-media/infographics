var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var handlebars = require('handlebars');

handlebars.registerHelper('if_eq', function(a, b, opts) {
  if (a == b) {
      return opts.fn(this);
  } else {
      return opts.inverse(this);
  }
});

Metalsmith(__dirname)
  .metadata({
    title: 'out of the spotlight',
    description: 'out of the spotlight',
    generator: "Metalsmith",
    url: 'https://www.mirrormedia.mg/projects/out-of-the-spotlight/'
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(collections({          // group all blog posts by internally
    posts: 'posts/*.md',       // adding key 'collections':'posts'
    index: '/index.md'
  })) 
  .use(markdown())
  .use(permalinks({           // change URLs to permalink URLs
    relative: false           // put css only in /css
  }))
  .use(layouts({
    engine: 'handlebars'
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
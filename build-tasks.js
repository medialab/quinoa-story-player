const copy = require('copy');

const toCopy = [
  'src/**/*.json',
  'src/**/*.xml',
  'src/**/*.csl',
  'src/**/*.scss',
  'src/**/*.css',
  'src/**/*.ttf',
  'src/**/*.woff',
  'src/**/*.woff2',
];

toCopy.map(pattern => 
  copy(pattern, 'build', function(err, files) {
    if (err) throw err;
     console.log('copied %s files for pattern %s', files.length, pattern);
  })
)
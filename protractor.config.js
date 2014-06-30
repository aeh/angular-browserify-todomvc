exports.config = {
  specs: ['test/**/*.js'],
  framework: 'mocha',
  mochaOpts: {
    reporter: 'spec',
    slow: 3000
  },
  capabilities: {
    'browserName': 'chrome'
  }
};

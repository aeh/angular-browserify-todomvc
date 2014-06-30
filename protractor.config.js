var config = {
  specs: ['test/**/*.js'],
  framework: 'mocha',
  mochaOpts: {
    reporter: 'spec',
    slow: 3000
  },
  capabilities: {
    'browserName': 'chrome',
  }
}

if (process.env.TRAVIS_BUILD_NUMBER) {
  config.sauceUser = process.env.SAUCE_USERNAME,
  config.sauceKey = process.env.SAUCE_ACCESS_KEY,
  config.capabilitied = {
    'browserName': 'chrome',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    'build': process.env.TRAVIS_BUILD_NUMBER,
    'name': 'Angular TodoMVC Tests / Travis Build ' + process.env.TRAVIS_BUILD_NUMBER
  };
};

exports.config = config;

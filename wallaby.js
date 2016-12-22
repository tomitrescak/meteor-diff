module.exports = function (wallaby) {
  return {
    files: [
      '*.js'
    ],

    tests: [
      'tests/*.js'
    ],

    env: {
      type: "node"
    },

    testFramework: 'mocha'
  };
};
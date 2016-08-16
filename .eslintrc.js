module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
    "mocha"
  ],
  "rules": {
    "mocha/no-exclusive-tests": "error"
  },
  globals: {
    describe: true,
    it: true,
    expect: true,
    before: true
  }
};
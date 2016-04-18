const expect = require('chai').expect;
const App = require('../src/app')();

describe("App.loadExtension", function() {
  it("resolves with the given extension", function() {
    return App.extensions.load('test').then(function(ext) {
      expect(typeof ext.render).to.eq('function');
    })
  });
});

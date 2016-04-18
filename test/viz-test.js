"use strict";
const expect = require('chai').expect;
const Viz = require('../src/viz')

describe("viz.extensions", function() {
  it("resolves with the given extension", function() {
    let viz = Viz()
    return viz.extensions.load('test').then(function(ext) {
      expect(typeof ext.render).to.eq('function');
    })
  });

  it("keeps track of loaded extensions", function() {
    let viz = Viz()
    expect(viz.extensions.length).to.eq(0);
    return viz.extensions.load('test').then(function(ext) {
      expect(viz.extensions.length).to.eq(1);
    })
  });
});

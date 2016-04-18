"use strict";
const expect = require('chai').expect;
const Viz = require('../src/viz');
const sinon = require('sinon');
var sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);
const axios = require('axios');

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

describe("viz.dataset", function() {
  var promise;
  beforeEach(function () {
    promise = sinon.stub(axios, 'get').returnsPromise()
  });

  afterEach(function () {
    axios.get.restore()
  });

  it("resolves data by DataSet ID", function() {
    let viz = Viz();
    let data = { some: "data" }
    promise.resolves(data)
    return viz.dataset.load(1).then(function(res) {
      expect(res).to.deep.eq(data)
    })
  });
});

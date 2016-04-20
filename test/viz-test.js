"use strict";
const expect = require('chai').expect;
const Viz = require('../src/viz');
const sinon = require('sinon');
require('sinon-stub-promise')(sinon);
const axios = require('axios');
const studentDataFixture = require('./fixtures/student-data');

//const bucketMappingTestData = require('./fixtures/bucket-mapping-test-data');
//const bucketMappingTestMapping = require('./fixtures/bucket-mapping-test-mapping');
//const bucketMappingTestExpectation = require('./fixtures/bucket-mapping-test-expectation');

describe("viz.extensions", function() {
  it("resolves with the given extension", function() {
    let viz = Viz()
    return viz.extensions.load('test').then(function(ext) {
      expect(typeof ext.script.render).to.eq('function');
    })
  });

  it("keeps track of loaded extensions", function() {
    let viz = Viz()
    expect(viz.extensions.length).to.eq(0);
    return viz.extensions.load('test').then(function(ext) {
      expect(viz.extensions[0].name).to.eq('test');
      expect(viz.extensions.length).to.eq(1);
    })
  });

  it("loads the extension's schema", function() {
    let viz = Viz()
    return viz.extensions.load('test').then(function(ext) {
      expect(ext.schema["example"]).to.eq("stuff")
    })
  })
});

describe("viz.dataset", function() {
  var promise;
  beforeEach(function () {
    promise = sinon.stub(axios, 'get').returnsPromise()
  });

  afterEach(function () {
    axios.get.restore()
  });

  describe(".load", function() {
    it("resolves data by DataSet ID", function() {
      let viz = Viz();
      let data = { some: "data" }
      promise.resolves(data)
      return viz.dataset.load(1).then(function(res) {
        var path = promise.getCall(0).args[0];
        expect(path).to.eq('/datasets/1');
        expect(res).to.deep.eq(data);
      })
    });
  });

  describe.skip(".applyBucketMapping", function() {
    it("returns a copy of the dataset for which the bucket mappings have been applied", function() {
      let viz = Viz();
      let result = viz.dataset.applyBucketMapping(bucketMappingTestData, bucketMappingTestMapping);
      expect(result).to.deep.eq(bucketMappingTestExpectation);
    })
  });
});

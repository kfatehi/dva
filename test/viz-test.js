"use strict";
const expect = require('chai').expect;
const Viz = require('../src/viz');
const sinon = require('sinon');
require('sinon-stub-promise')(sinon);
const axios = require('axios');
const studentDataFixture = require('./fixtures/student-data');

//for null
const bucketMappingTestDataNull = require('./fixtures/bucket-mapping-test-data-null.json');
const bucketMappingTestExpectedNull = require('./fixtures/bucket-mapping-expected-null.json');
const bucketMappingTestMapping = require('./fixtures/bucket-mapping-test-mapping.json');

//for a small amount of data
const bucketMappingTestDataSmall = require('./fixtures/bucket-mapping-test-data-small.json');
const bucketMappingTestExpectedSmall = require('./fixtures/bucket-mapping-expected-small.json');

//for a larger set of data
const bucketMappingTestData = require('./fixtures/bucket-mapping-test-data.json');
const bucketMappingTestExpected = require('./fixtures/bucket-mapping-expected.json');

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

  describe(".applyBucketMappingNull", function() {
    it("returns a copy of the dataset for which the bucket mappings have been applied", function() {
      let viz = Viz();
      let result = viz.dataset.applyBucketMapping(bucketMappingTestDataSmall, bucketMappingTestMapping);
      expect(result).to.deep.eq(bucketMappingTestExpectedSmall);
    })
  });

  describe(".applyBucketMappingSmall", function() {
    it("returns a copy of the dataset for which the bucket mappings have been applied", function() {
      let viz = Viz();
      let result = viz.dataset.applyBucketMapping(bucketMappingTestDataSmall, bucketMappingTestMapping);
      expect(result).to.deep.eq(bucketMappingTestExpectedSmall);
    })
  });

  describe(".applyBucketMapping", function() {
    it("returns a copy of the dataset for which the bucket mappings have been applied", function() {
      let viz = Viz();
      let result = viz.dataset.applyBucketMapping(bucketMappingTestData, bucketMappingTestMapping);
      expect(result).to.deep.eq(bucketMappingTestExpected);
    })
  });

});

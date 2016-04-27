"use strict";
const expect = require('chai').expect;
const Viz = require('../src/viz');
const sinon = require('sinon');
require('sinon-stub-promise')(sinon);
const axios = require('axios');

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

});

import applyBucketMapping from '../src/apply-bucket-mapping';

const bucketMappingTestMapping = {
  "series":["name"],
  "group":["city", "zip"],
  "value":["transactions"]
}

//for a small amount of data
const bucketMappingTestDataSmall = require('./fixtures/bucket-mapping-test-data-small.json');
const bucketMappingTestExpectedSmall = require('./fixtures/bucket-mapping-expected-small.json');

//for a larger set of data
const bucketMappingTestData = require('./fixtures/bucket-mapping-test-data.json');
const bucketMappingTestExpected = require('./fixtures/bucket-mapping-expected.json');

//for a different mapping
const bucketMappingTestMappingV2 = require('./fixtures/bucket-mapping-test-mapping-v2.json');
const bucketMappingTestExpectedSmallV2 = require('./fixtures/bucket-mapping-expected-small-v2.json');

describe(".applyBucketMapping", function() {
  it("empty dataset returns empty dataset", function() {
    let result = applyBucketMapping([], bucketMappingTestMapping);
    expect(result).to.deep.eq([]);
  });

  it("small dataset returns correct result", () => {
    let result = applyBucketMapping(bucketMappingTestDataSmall, bucketMappingTestMapping);
    expect(result).to.deep.eq(bucketMappingTestExpectedSmall);
  })

  it("default behavior", () => {
    let result = applyBucketMapping(bucketMappingTestData, bucketMappingTestMapping);
    expect(result).to.deep.eq(bucketMappingTestExpected);
  });

  it("default behavior, another example", () => {
    let result = applyBucketMapping(bucketMappingTestDataSmall, bucketMappingTestMappingV2);
    expect(result).to.deep.eq(bucketMappingTestExpectedSmallV2);
  });
});

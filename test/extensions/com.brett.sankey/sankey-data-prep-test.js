import sankeyDataPrep from "../../../src/extensions/com.brett.sankeyV2/sankey-data-prep.js";

//requiring input tests and their correspinding expected files
const jsonInput1 = require('./sankey-test-data/sankey-test-input-data-v1.json');
const jsonExpected1 = require('./sankey-test-data/sankey-test-expected-data-v1.json');


describe("Sankey Data Preparation", function() {
  //no input test
  it("empty dataset returns empty preped dataset", function(){
    let result = sankeyDataPrep([]);
     expect(result).to.deep.eq({"nodes" : [], "links" :[]});  
  })
  
  //small input test
  it("small dataset returns correct result", function(){
    let result = sankeyDataPrep(
      [{
        "source": "Barry",
        "target": "Elvis",
        "value" : 2
      }]);

    expect(result).to.deep.eq({ 
      "nodes" : [{"name" : "Barry"},
        {"name" : "Elvis"}], 
        "links" :[{"source" : 0, "target":1, "value": 2}]});
  })

  it("small dataset using arrays with one string in it also works", function(){
    let result = sankeyDataPrep(
      [{
        "source": ["Barry"],
        "target": ["Elvis"],
        "value" : [2]
      }]);

    expect(result).to.deep.eq({ 
      "nodes" : [{"name" : "Barry"},
        {"name" : "Elvis"}], 
        "links" :[{"source" : 0, "target":1, "value": 2}]});
  })


  //testing default behavior
  it("default behavior", function(){

    //using the jasonInput1 file for data input
    let result = sankeyDataPrep(jsonInput1); 

    //testing against the jsonExpected1
    expect(result).to.deep.eq(jsonExpected1)

  });

})

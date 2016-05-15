import sankeyDataPrep from "../../../src/extensions/com.brett.sankeyV2/sankey-data-prep.js";

describe("Sankey Data Preparation", function() {
  //no input test
  it("empty dataset returns empty preped dataset", function(){
    let result = sankeyDataPrep({"nodes" : [], "links" :[]});
     expect(result).to.deep.eq({"nodes" : [], "links" :[]});  
  })
  
  //small input test
  it.skip("small dataset returns correct result", function(){
    let result = sankeyDataPrep({"nodes" : [], "links" :[]});
    expect(prepedJsonObject).to.equal("");  

  })
  
  it.skip("default behavior", function(){
    
    
    
  })
})

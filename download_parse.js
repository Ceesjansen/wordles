function keyValuesFunction(data){
let selection = extractKeyValues(parsedata);
let filters = {}; // Empty object to store our active filters in 
// Loop over all groups with inputs
  $(".selectiongroup").each(function(){
    
    // Find all inputs within the current group that are checked
    let checked = $(this).find("input:checked");
    
    // If there's inputs that are checked
    if(checked.length>0) {
      
      // Create empty array to hold the values from the inputs (value=.. attribute)
      let values = [];
      
      // For each checked input (using Jquery each()), put the value in the above array
      checked.each(function() {
        values.push(parseInt($(this).val(),10));
      });
      
      // Create a new key in the object with the correct name and give it an array as value
      filters[$(this).find("h4").text()] = [...values];
   }
  });
  // Map/loop over all keys in the filter object (so val is equal to the key value)
  Object.keys(filters).map((val,i) => {
    
    // For each key, lookup what string the numbers are in the selection list
    filters[val] = filters[val].map((sub) => {
      return selection[val][sub];
    });
  });
  return filters;
}

function addKeyValues(filteredData){
  //gets the selected options and values
  let tempKeys = keyValuesFunction(filteredData);
  let keyValues = Object.keys(tempKeys);

  //extracts those values in a new array
  let values = Object.keys(tempKeys).map((val)=>{
    return tempKeys[val];
  });

  //add data to object Associaties
  function SubFilters(data){
    this.Associations = data;
  }; 

  //map over filtered data and create an array of objects
  let csvData= filteredData.map((val) =>{
    return new SubFilters(val);
  });

  //map over selected options and add these to the array of object (csvData)
  values.map((val,i) => 
    val.map((sub) => 
      keyValues[i]+": "+sub))
      .map((val) => {
        return val.map((sub)=>{
          return  csvData.unshift({Associations: sub});
        });
      });
 
  return csvData;
}

//download the csv file 
function downloadCsv(options){
  var config = {
    delimiter: "",
    skipEmptyLines: true,
    header: false,
  };
  let csv = Papa.unparse(options, config);
  var blob= new Blob(["\ufeff", csv]);
  var pom = document.createElement('a');
  var url = URL.createObjectURL(blob);
  pom.href = url;
  pom.setAttribute('download', 'test.csv');
  pom.click();
}

document.getElementById('downloadbtn').addEventListener('click', function clickSave(e) {
  let csvOptions = addKeyValues(wordleData);
  downloadCsv(csvOptions);
});

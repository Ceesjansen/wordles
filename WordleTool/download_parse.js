
function addKeyValues(filteredData){
  //gets the selected options and values
  let selection = dataService.getSelection();
  dataService.checkFilterSelection();
  let filters = dataService.getFilterSelection();
  let tempKeys = mapLoopOverKeysInFilterObject(selection, filters);
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
  pom.setAttribute('download', 'wordledata.csv');
  pom.click();
}

document.getElementById('downloadbtn').addEventListener('click', function clickSave(e) {
  let csvOptions = addKeyValues(dataService.getWordleData());
  downloadCsv(csvOptions);
});

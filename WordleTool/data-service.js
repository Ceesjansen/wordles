function DataService(results) {

    let isInit = false;

    function initData(results) {
        let parsedata = results.data;
        // const spelling = trainSpelling(parsedata);
        let filteredparse = parsedata.filter((val)=> val[Object.keys(parsedata[0])[0]] !=='')
        isInit = true;
        return filteredparse;
    }

    let data = initData(results);
    let selection = extractKeyValues(data);
    let wordleData;
    let filters;
    let scaling;
    let drawnArray=[];
    showSelections(selection);

function extractKeyValues(data) {
  // data = doneParse();
  // Get all possible keys; delete empty keys and ignore column 1
  let keys = Object.keys(data[0]).filter((val) => val !== "");
  if (keys.length > 1){
  keys = keys.slice(1,keys.length);
  }else{
    return keys;
  }
  // Create global object to hold the selection
  let selection = {};
  
  // Get all possible values for each key, then put the unique array into selection object
  // Result: selection = {key1: [value1, value2, value3], key2: [value1, value2, value3]}
  keys.map((val) => {
    let tempdata = data.map((sub) => sub[val]);
    let tempset = new Set(tempdata);
    selection[val] = [...tempset];
  });
  return selection;
}
    return {
        getData() {
            if (!isInit) throw new Error(`You did not init the DataService yet dummy!!`);
            return data;
        },
        setWordleData(data) {
            wordleData = checkFilters(data)
        },
        getWordleData(){
            return wordleData;
        },
        updateWordleData(data){
            wordleData = wordleData;
        },
        getSelection() {
            return selection;
        },
        updateSelectionGroup(data) {
            selection = extractKeyValues(data);
        },
        checkFilterSelection(){
            filters = loopOverGroupsWithGivenInput();
        },
        getFilterSelection(){
            return filters;
        },
        setDrawnArray(data){
            drawnArray.push(data);
        },
        clearDrawnArray(){
            drawnArray=[];
        },
        getDrawnArray(){
            return drawnArray;
        }
    }
}
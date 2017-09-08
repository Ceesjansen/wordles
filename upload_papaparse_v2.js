let parsedata= {};
let wordleData = [];
function doneParse(results){
  parsedata = results.data;
  const selection = extractKeyValues(parsedata);
  console.log(parsedata);
  // const spelling = trainSpelling(parsedata);
  showSelections(selection);
  return parsedata;
  }

function previewFile(){	
	var file = document.querySelector('#files').files[0];
	var reader = new FileReader();
	if (file) {
		reader.readAsDataURL(file);
	}
}

// Initialize a high resolution timer (time in ms)
const time1 = performance.now();

// Run our function to get all possible keys and all possible values


// Second high res timer
const time2 = performance.now();

// Subtract time1 from time2 to determine how long it took our code to run
const elapsedTime = time2-time1;

console.log(elapsedTime, time1, time2);

// Returns an object with all keys (excludes first key) with an array of possible values for each key
function extractKeyValues(data) {
  // data = doneParse();
  // Get all possible keys; delete empty keys and ignore column 1
  let keys = Object.keys(data[0]).filter((val) => val !== "");
  if (keys.length > 1){
  keys = keys.slice(1,keys.length);
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


// Output checkboxes for user selection
function showSelections(selection) {
  $('.selectiongroup').html('');
  const keys = Object.keys(selection);
  keys.map((key,j) => {
    let html = `<div class="btn-group selectiongroup"><button type="button" class="btn btn-default dropdown-toggle step2buttons" data-toggle="dropdown" ><h4>${key}</h4></button>
    <ul id="list${j}" class="dropdown-menu"><li><label class="btn btn-primary category-label" for="${j}-check99"><input class="categorybtn" type="checkbox" id="${j}-check99" value="99" autocomplete="off"> Geen selectie</label><br></li>`;
    selection[key].map((val,i) => {
      html+= `<li id="li${i}-${j}"><label class="btn btn-primary category-label" for="check${i}-${j}"><input class="categorybtn" type="checkbox" id="check${i}-${j}" value=${i} autocomplete="off"> ${val}</label><br></li>`;
    });
    html+=`</ul></div>`;
    $("#selection").append(html);
  });
}

// Filters data object based on user selection
function checkFilters(data) {
  let selection = extractKeyValues(parsedata);
  let tempData = data; // Create a local copy of data
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
    // Filters is now an object with arrays of strings from selected checkboxes as values
    
    // Filter the data by checking if the value of each key (we're doing this for each checked key) is in the value array
    tempData = tempData.filter((item) => {
        return (filters[val].indexOf(item[val]) !== -1);
    });
  });
  

 //checks if the array has multiple keys or not and extracts relevant data (Associations)
  if(Object.keys(tempData[0]).length == 1){
    tempData = tempData.map((val) => {
      return val[(Object.keys(tempData[0]))];
    });
      } else {
      tempData = tempData.map((val)=> {
        return val[(Object.keys(tempData[0])[0])];
      });
      }

  //runs the tempData through a cleanup function
  let filteredStory = tempData.map((val) => { 
    return cleanUp(val) 
  });
  // All done, just write the data to the DOM.
  filteredStory.map((val) => {
    $("#association-container").append(val+", ");
  });
  return filteredStory;
}
//function to replace multiple words in to one
function changeWords(replacee, replaced){
	let allWords= wordleData;
  $('#association-container').html('');
  //maps over the to be replaced words and stores these in a new array
	let mapObj = replacee.map((val) =>{
		return {[val]: replaced,};
  });
	let merged = Object.assign(...mapObj);
	let alteredWords = replaceAll(allWords, merged);
	$('#association-container').append(alteredWords);
	return alteredWords;
}
//function that finds and replaces the words given by changeWords
function replaceAll(str,mapObj){
    var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
		return str.map((val)=>{
			return val.replace(re, function(matched){
        return mapObj[matched.toLowerCase()];
			});
		});
}


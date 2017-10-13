function previewFile() {
    let file = document.querySelector('#files').files[0];
    let reader = new FileReader();
    if (file) {
        reader.readAsDataURL(file);
    }
}


// Output checkboxes for user selection
function showSelections(selection) {
    $('#selection').html('');
    $('.selectiongroup').html('');
    let html;
    const keys = Object.keys(selection);
    if (keys.length > 1) {
        // keys.filter((key)=> { return key !== ""});
        keys.map((key, j) => {
            html = `<div class="btn-group selectiongroup"><button type="button" class="btn btn-default dropdown-toggle step2buttons" data-toggle="dropdown" ><h4>${key}</h4></button>
    <ul id="list${j}" class="dropdown-menu"><li><label class="btn btn-primary category-label" for="${j}-check99"><input class="categorybtn" type="checkbox" id="${j}-check99" value="99" autocomplete="off"> Geen selectie</label><br></li>`;
            selection[key].filter((val)=> val!== "#NULL!")
            selection[key].map((val, i) => {
                html += `<li id="li${i}-${j}"><label class="btn btn-primary category-label" for="check${i}-${j}"><input class="categorybtn" type="checkbox" id="check${i}-${j}" value=${i} autocomplete="off"> ${val}</label><br></li>`;
            });
            html += `</ul></div>`;
            $("#selection").append(html);
        });
    }
}

// Filters data object based on user selection
function checkFilters(data) {
    dataService.updateSelectionGroup(data);
    let selection = dataService.getSelection();
    dataService.checkFilterSelection();
    let filters = dataService.getFilterSelection();
    // Map/loop over all keys in the filter object (so val is equal to the key value)
    Object.keys(filters).map((val, i) => {

        // For each key, lookup what string the numbers are in the selection list
        filters[val] = filters[val].map((sub) => {
            return selection[val][sub];
        });
        // Filters is now an object with arrays of strings from selected checkboxes as values

        // Filter the data by checking if the value of each key (we're doing this for each checked key) is in the value array
        data = data.filter((item) => {
            return (filters[val].indexOf(item[val]) !== -1);
        });
    });

    data = checkForMultipleKeys(data);
    const filteredStory = runTempDataThroughCleanup(data);

    return filteredStory;
}

function loopOverGroupsWithGivenInput() {
    let filters = {}; // Empty object to store our active filters in

    $(".selectiongroup").each(function () {

        // Find all inputs within the current group that are checked
        let checked = $(this).find("input:checked");

        // If there's inputs that are checked
        if (checked.length > 0) {

            // Create empty array to hold the values from the inputs (value=.. attribute)
            let values = [];

            // For each checked input (using Jquery each()), put the value in the above array
            checked.each(function () {
                values.push(parseInt($(this).val(), 10));
            });

            // Create a new key in the object with the correct name and give it an array as value
            filters[$(this).find("h4").text()] = [...values];
        }
    });

    return filters;
}

function mapLoopOverKeysInFilterObject(selection, filters, data) {

    // Map/loop over all keys in the filter object (so val is equal to the key value)
     Object.keys(filters).map((val, i) => {
        
        // For each key, lookup what string the numbers are in the selection list
        filters[val] = filters[val].map((sub) => {
            return selection[val][sub];
        });
        
    });
    return filters;
}


function checkForMultipleKeys(tempData) {
    //checks if the array has multiple keys or not and extracts relevant data (Associations)
    if (Object.keys(tempData[0]).length === 1) {
        tempData = tempData.map((val) => {
            return val[(Object.keys(tempData[0]))];
        });
    } else {
        tempData = tempData.map((val) => {
            return val[(Object.keys(tempData[0])[0])];
        });
    }

    return tempData;
}

function runTempDataThroughCleanup(tempData) {
    //runs the tempData through a cleanup function
    let filteredStory = tempData.map((val) => {
        return cleanUp(val)
    });
    var percentage = (Math.round(filteredStory.length/dataService.getData().length*1000)/1000)*100;
    $("#percentage").html("<p>percentage: "+percentage+"%</p>");
    $('#percentage').css('visibility', 'visible');
    // All done, just write the data to the DOM.
    filteredStory.map((val) => {
        $("#association-container").append(val + "\n");
    });

    console.log(`Filtered Story length: ${filteredStory.length} && tempData length: ${tempData.length}`);

    return filteredStory;
}

//function to replace multiple words in to one
function changeWords(replacee, replaced) {
    let allWords = dataService.getWordleData();
    $('#association-container').html('');
    //maps over the to be replaced words and stores these in a new array
    let mapObj = replacee.map((val) => {
        return {[val]: replaced,};
    });
    let merged = Object.assign(...mapObj);
    let alteredWords = replaceAll(allWords, merged);
    alteredWords.map((val)=>{
        $('#association-container').append(val + "\n");
    });
    dataService.updateWordleData(alteredWords);
    return alteredWords;
}

//function that finds and replaces the words given by changeWords
function replaceAll(str, mapObj) {
    let re = new RegExp(Object.keys(mapObj).join("|"), "gi");
    return str.map((val) => {
        return val.replace(re, function (matched) {
            return mapObj[matched.toLowerCase()];
        });
    });
}


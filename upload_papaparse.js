


//function that is called once parsing is done, this in turn calls the addCategory and cleanParse
//functions
var parseData;
function doneParse(results){
	parseData = results.data;
	selectReturnValue(parseData);
	return parseData;
}

function getKeys(val){
	val.map((val) => {Object.keys(val[0]) } 
}


//Adds categories when parsing is done, categories are based upon the keys of the first object
//it will then append the categories to the add-categories id.
function selectReturnValue(results){
	var categories = Object.keys(parseData[0]);
	for (var i=0; i<categories.length; i++){
		$('#return-choice').append($('<li>').addClass('return-category').append(
		$('<a>').attr('href','#').append(categories[i])));
	}
}


function checkInputCategory(el){
	var userCategory = [];
	var categories = Object.keys(parseData[0]);
		for (var i=0; i<el.length; i++){
			if($('#add-categories').find('input').eq(i).prop('checked')){
				userCategory.push(Object.keys(el[0])[i]);
			}
		}
		console.log(userCategory);
	return userCategory;
}


//Adds categories when parsing is done, categories are based upon the keys of the first object
//it will then append the categories to the add-categories id.
function addCategory(results){
	var categories = Object.keys(parseData[0]);
	for (var i=0; i<categories.length; i++){
		if (categories[i] !== ""){
		$('#add-categories').append($('<li>').append($('<label>').append($('<input>').attr('type','checkbox')).append(categories[i])));
			}
		}
}

//function to append category values once a category has been selected by the function above

function checkInputValue(el){
	var userValue = [];
		for (var i=0; i<el.length; i++){
			if($('#category-value').find('input').eq(i).prop('checked')){
				userValue.push($("#category-value").find('li').eq(i).text());
			}
		}
		console.log(userValue);
	return userValue;
}
//cleans the text of the filtered/selected categories
	function cleanParse (obj){
		var result = [];
		for (var i=0; i<Object.keys(obj).length; i++){
			if(obj[i].story !== undefined){       //checks whether object[i] is undefined, if true skips the iteration
				result.push({number: obj[i].number, story:cleanUp(obj[i].story)}); 
			}
		}
		return result;
	}
//creates a html table with the filteredStory data
	function filteredTable(obj){
		var table=0;
		table = $('<table>').attr('id', 'table');
		for (var i=0; i<Object.keys(obj).length; i++){
			if(obj[i].story !== undefined){  				//checks whether object[i] is undefined, if true skips the iteration
				tableRow = $('<tr><td>').text(obj[i].number +": "+obj[i].story)
				table.append(tableRow);
			}
		}
		if (wordleKey === "Verhaal"){
		$('#story-container').append(table);
		} else if(wordleKey==="Associaties"){
			$('#association-container').append(table);
		}
	}


sentiment = new Sentimood();




















		// var dutchWord = [];
		// var dutchPolarity =[];
		// var wordSet = new Set();
		// function getWords(){
		// for (var i=0; i<Object.keys(afinnDutch.sentiment.word[0]).length; i++){
		// 	console.log("works")
		// 	dutchWord.push(Object.keys(afinnDutch.sentiment.word[0])[i]);
		// 	dutchPolarity.push(afinnDutch.sentiment.word[0][Object.keys(afinnDutch.sentiment.word[0])[i]])
		// 	dutchPolarity [i]= Math.round(dutchPolarity[i]*20); 
		// 	}
		// }

		// var sentiment = new Sentimood();
		// console.log(dutchPolarity);
		// var sentimentWord=[];
		// var sentimentstuff=[];
		// function combineWords (){
		// 	for (var i=0; i<dutchWord.length; i++){
		// 		sentimentWord.push({word: dutchWord[i], polarity: dutchPolarity[i]});
				// if (i >= 1){
				// 	if (sentimentWord[i].polarity >= 0){
				// 		if (sentimentWord[i].word ==sentimentWord[i-1].word){
				// 			if(sentimentWord[i].polarity > sentimentWord[i-1].polarity){
				// 			sentimentstuff.push({word: dutchWord[i], polarity: dutchPolarity[i]});
				// 			}
				// 		}else {
				// 		 sentimentstuff.push({word: dutchWord[i], polarity: dutchPolarity[i]});
				// 		}
				// 	}else if (sentimentWord[i].polarity <=0){
				// 		if (sentimentWord[i].word ==sentimentWord[i-1].word){
				// 			if (sentimentWord[i].polarity < sentimentWord[i-1].polarity){
				// 			 sentimentstuff.push({word: dutchWord[i], polarity: dutchPolarity[i]});
				// 			}
				// 		}else{
				// 			sentimentstuff.push({word: dutchWord[i], polarity: dutchPolarity[i]});

				// 		}
				// 	}
				// } else{
		// 		sentimentstuff.push({word: dutchWord[i], polarity: dutchPolarity[i]});
				
		// 	}
		// }
		// function createTableWords(){
		// 	var tablestuff = $('<table>').attr('id', 'table');
		// 	for(i=0; i<sentimentstuff.length; i++){
		// 		tableRow = $('<tr><td>').text('"'+sentimentstuff[i].word+'"'+": "+sentimentstuff[i].polarity+",");
		// 		tablestuff.append(tableRow);
		// 	}
		// 	$('#story-table').append(tablestuff);
		// }
		//  getWords();
		//  combineWords();
		// createTableWords();


		// for (i=0; i<Object.keys(words[0]).length; i++){
		// 	console.log(Object.keys(words.afinn[0])[i]);
		// }
// function createTableWords(){
// 	var tablestuff = $('<table>').attr('id', 'table');
// 	var roundedScore=[];
// 	for(var i=0; i<Object.keys(words.afinn[0]).length; i++){
// 		roundedScore[i] = words.afinn[0][Object.keys(words.afinn[0])[i]];
// 		roundedScore[i] = Math.round(roundedScore[i]*5);
// 		tempkey = Object.keys(words.afinn[0])[i];
// 		tableRow = $('<tr><td>').text('"'+tempkey+'"'+": "+roundedScore[i]+",");
// 		tablestuff.append(tableRow);
// 	}
// 	$('#story-table').append(tablestuff);
// }
// createTableWords();


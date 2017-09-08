
	//If document is ready and upload id has been clicked start parsing
$(document).ready(function(){
	$('#submit-file').on("click", function(e){
		$('#return-choice li').remove();
		e.preventDefault();
		$('#files').parse({
			config: {
				delimiter: "",
				skipEmptyLines: true,
				header: true,
				encoding: "utf-8",
				complete: doneParse,
			},
			before: function(file, inputElem)
			{
				console.log("Parsing file...", file);
			},
			error: function(err, file)
			{
				console.log("ERROR:", err, file);
			},
			complete: function()
				{
				}
			});
			console.log('parse worked');
		});

$(document).on('click', '#selection .dropdown-menu', function (e) {
  e.stopPropagation();
});
});

$('#changewords').on('click', function(e){
	e.preventDefault;
	$('body').loading('toggle');
  setTimeout(function(){
		let replaceWord = document.getElementById("replacewords").value.split(' ');
		let replaceWith = document.getElementById("replaced").value;
		wordleData = changeWords(replaceWord, replaceWith);
		}, 100);
  $('body').loading('stop');
});

$("#check").click(function(e) {
  e.preventDefault;
  $('body').loading('toggle');
  setTimeout(function(){
    $('#association-container').html('');
    wordleData = checkFilters(parsedata);
  	}, 100);
  $('body').loading('stop');
});


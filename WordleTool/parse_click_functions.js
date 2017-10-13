let dataService;

function initDataService(results) {
	dataService = DataService(results);
}

	//If document is ready and upload id has been clicked start parsing
$(document).ready(function(){
	$('#submit-file').on("click", function(e){
		$('#return-choice li').remove();
		$('#check').prop('disabled', false);
		e.preventDefault();
		$('#files').parse({
			config: {
				delimiter: "",
				skipEmptyLines: true,
				header: true,
				encoding: "utf-8",
				complete: initDataService,
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

$("#check").click(function(e) {
		e.preventDefault;
		$('#scalefactor').val(100);
		$('#replacewords').val('');
		$('#replaced').val('');
		var canvas = document.getElementById('wordle-canvas');
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		$('#warning-message').css("visibility", "hidden");
		$('#wordle-container').css({'border': '1px solid black'});
    $('body').loading('toggle');
    setTimeout(function(){
				$('#association-container').html('');
				$('.wordleButtons').prop('disabled', false);
				// wordleData = checkFilters(dataService.getData());
				dataService.setWordleData(dataService.getData());
				dataService.clearDrawnArray();
				drawWordle();
    }, 100);
    $('body').loading('stop');
});
let toggleswitch = false;

$('#options-button').click(function(){
	if(toggleswitch==false){
	$('#hidden-options').show();
	$('#hidde-options').css('position', 'absolute');
	toggleswitch=true;
}else{
	$('#hidden-options').hide();
	toggleswitch=false;
}
})
$('#changewords').on('click', function(e){
	e.preventDefault;
	$('#warning-message').css("visibility", "hidden");
	$('#wordle-container').css({'border': '1px solid black'});
	$('body').loading('toggle');
  setTimeout(function(){
		let replaceWord = document.getElementById("replacewords").value.split(' ');
		let replaceWith = document.getElementById("replaced").value;
		changeWord = changeWords(replaceWord, replaceWith);
		drawWordle();
		$('#inputwords').click();
		}, 100);
  $('body').loading('stop');
});


function new_count(word) {
  word = word.toLowerCase();                                     //word.downcase!
  if(word.length <= 2) { return 1; }                             //return 1 if word.length <= 3
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');   //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    word = word.replace(/^y/, '');     //word.sub!(/^y/, '')
    word = word.match(/[aeiouy]{1,2}/g);
    if(word) { return word.length}
    return 1;                    //word.scan(/[aeiouy]{1,2}/).size
}


function readability(text) {
  let textvars = {
    caps: text.replace(/[^A-Z]/g, "").length, 
    totalLength: text.replace(/\W/g, "").length,
    word: text.split(/\s/g).map(val => val.replace(/\W/g, "")),
    words: text.split(/\s/g).map(val => val.replace(/\W/g, "")).length,
    longWords: text.split(/\s/g).filter(val => val.length >= 6).length,
    sentences: text.split(/\. /g).length,
    sentenceLength: text.split(/\./g).map(val => val.split(/\s/g).length)
  }
  console.log("caps "+ textvars.caps);
  var total = 0;
  for(var i = 0; i<textvars.words; i++) {
   total += new_count(textvars.word[i]);
  }
  console.log("syl" + total);
  let sentenceLengthAvg = textvars.sentenceLength.reduce((acc, curr) => acc + curr)/textvars.sentenceLength.length;
  console.log('sentencelength', sentenceLengthAvg);
  console.log("longwords", textvars.longWords);
  console.log(textvars.sentenceLength);
  console.log(textvars.totalLength, textvars.words, textvars.sentences);
  let cli = 0.0588 * textvars.totalLength / textvars.words * 100 - 0.296 * textvars.sentences / textvars.words * 100 - 15.8;
  let ari = 4.71 * Math.ceil(textvars.totalLength) / Math.ceil(textvars.words) + 0.5 * Math.ceil(textvars.words) / Math.ceil(textvars.sentences) - 21.43;
  let fk = 0.39 * (textvars.words / textvars.sentences) + 11.8 * (total / textvars.words) - 15.59;
  let fkDutch = 206.84 - 77 * (total/textvars.words) - 0.93 *(textvars.words / textvars.sentences);
  let rix = (textvars.longWords / textvars.words);
  let avg = (fk * 0.5 + cli * 0.25 + ari * 0.25);
  return {cli, ari, fk, fkDutch, avg, rix};
};

$("#calculate").click(function() {
  var story = readability($("#story").val());
  console.log(story);
  $("#cli").text(Math.round(story.cli*10)/10);
  $("#ari").text(Math.round(story.ari*10)/10);
  $("#fk").text(Math.round(story.fkDutch*10)/10);
  $("#avg").text(Math.round(story.avg*10)/10);
});
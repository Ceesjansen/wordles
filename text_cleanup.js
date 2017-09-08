
//functions for text cleaning!
//removes all special characters (this does not include words, whitespaces or any of the following characters: (),’'"!?.)
// function removeSpecialSign(el){
//   return el.replace(/[^\s\w(),’'"&!?.ïöéëüóòèìíáà][\W]*/g, "");
// }
// removes remaining special characters, if more than 3 are in consectutive order. Characters include: (),’'"!?.
function removeMultipleSign(el){
  return el.replace(/[^\s\w]{1,}/g, function(match) {
    if (match.length > 3 ) {
      return match.slice(0,3);
    } else {
      return match;
    }
    });
}
//inserts a whitespace after a special character. Special character includes: (),’'"!?.
function spaceAfterSign(el){
  return el.replace(/[^\s\w]{1,}[\W]{1,}/g, function(match){
  if (match == /[\W\s]/g ){
    return match;
  } else{
    return match.replace(match, ""+match);
  }
  })
}
//removes isntances with more than 1 whitespace
function multipleSpaces(el){
  return el.replace(/\s{2,}/g, " ");
}
function placeDotEndSentence(el){
  if (el.slice(-1)==="." || el.slice(-1)===" "){
    return el;
  } else {
  return el.replace(el, el+". ");
  }
}

// function applySentenceCase(str) {
//   return str.replace(/.+?[\.\?\!](\s|$)/g, function (txt) {
//     return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
// });
// }
function removeDots (str){
  return str.replace(/\./g, '').toLowerCase();
}
function removeSignsOnly(str){
  if(str.length < 4){
    return str.replace(/[^\s\w]/g, '');
  }else {
    return str;
  }
}

 //runs all the cleanup functions and returns the cleaned-up text 
function cleanUp(value){
  // var textTemp=removeSpecialSign(value);
  var textTemp=removeMultipleSign(value);
  textTemp=multipleSpaces(textTemp);
  textTemp=spaceAfterSign(textTemp);
  textTemp=placeDotEndSentence(textTemp);
  // textTemp=applySentenceCase(textTemp);
  textTemp=removeDots(textTemp);
  textTemp=removeSignsOnly(textTemp);
  return textTemp;
}

// sentiment = new Sentimood();

// var analyze = sentiment.analyze(),
//     positivity = sentiment.positivity(),
//     negativity = sentiment.negativity();

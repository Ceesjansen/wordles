/* global WordCloud */

let wordcloud;

// Blacklist with ignored words for each language (Dutch, English, German and French for now)
const blacklist = {
  none: [],
  nl: ['de', 'en', 'van', 'ik', 'te', 'dat', 'die', 'in', 'een', 'hij', 'het',
 'niet', 'zijn', 'is', 'was', 'op', 'aan', 'met', 'als', 'voor', 'had', 'er', 'maar', 'om', 'hem',
  'dan', 'zou', 'of', 'wat', 'mijn', 'men', 'dit', 'zo', 'door', 'over', 'ze', 'zich', 'bij',
  'ook', 'tot', 'je', 'mij', 'uit', 'der', 'daar', 'haar', 'naar', 'heb', 'hoe', 'heeft', 'hebben',
  'deze', 'u', 'want', 'nog', 'zal', 'me', 'zij', 'nu', 'ge', 'geen', 'omdat', 'iets', 'worden',
  'toch', 'al', 'waren', 'veel', 'meer', 'doen', 'toen', 'moet', 'ben', 'zonder', 'kan', 'hun',
  'dus', 'alles', 'onder', 'ja', 'eens', 'hier', 'wie', 'werd', 'altijd', 'doch', 'wordt', 'wezen',
  'kunnen', 'ons', 'zelf', 'tegen', 'na', 'reeds', 'wil', 'kon', 'niets', 'uw', 'iemand', 'geweest',
  'andere', 'wij', 'we', 'z\'n', 'z\'n', 'zo\'n', 'zo\'n'],
  en: ['i', 'me', 'my', 'myself', 'we', 'us', 'our', 'ours', 'ourselves', 'you', 'your', 'yours',
  'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it',
  'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom',
  'whose', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been',
  'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'will', 'would', 'should',
  'can', 'could', 'ought', 'i\'m', 'you\'re', 'he\'s', 'she\'s', 'it\'s', 'we\'re', 'they\'re',
  'i\'ve', 'you\'ve', 'we\'ve', 'they\'ve', 'i\'d', 'you\'d', 'he\'d', 'she\'d', 'we\'d', 'they\'d',
  'i\'ll', 'you\'ll', 'he\'ll', 'she\'ll', 'we\'ll', 'they\'ll', 'isn\'t', 'aren\'t', 'wasn\'t',
  'weren\'t', 'hasn\'t', 'haven\'t', 'hadn\'t', 'doesn\'t', 'don\'t', 'didn\'t', 'won\'t',
  'wouldn\'t', 'shan\'t', 'shouldn\'t', 'can\'t', 'cannot', 'couldn\'t', 'mustn\'t', 'let\'s',
  'that\'s', 'who\'s', 'what\'s', 'here\'s', 'there\'s', 'when\'s', 'where\'s', 'why\'s', 'how\'s',
  'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by',
  'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after',
  'above', 'below', 'to', 'from', 'up', 'upon', 'down', 'in', 'out', 'on', 'off', 'over', 'under',
  'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any',
  'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own',
  'same', 'so', 'than', 'too', 'very', 'say', 'says', 'said', 'shall'],
  de: ['aber', 'alle', 'allem', 'allen', 'aller', 'alles', 'als', 'also', 'am', 'an', 'ander',
  'andere', 'anderem', 'anderen', 'anderer', 'anderes', 'anderm', 'andern', 'anders', 'auch', 'auf',
  'aus', 'bei', 'bin', 'bis', 'bist', 'da', 'damit', 'dann', 'das', 'dass', 'daÃŸ', 'dasselbe',
  'dazu', 'dein', 'deine', 'deinem', 'deinen', 'deiner', 'deines', 'dem', 'demselben', 'den',
  'denn', 'denselben', 'der', 'derer', 'derselbe', 'derselben', 'des', 'desselben', 'dessen',
  'dich', 'die', 'dies', 'diese', 'dieselbe', 'dieselben', 'diesem', 'diesen', 'dieser', 'dieses',
  'dir', 'doch', 'dort', 'du', 'durch', 'ein', 'eine', 'einem', 'einen', 'einer', 'eines', 'einige',
  'einigem', 'einigen', 'einiger', 'einiges', 'einmal', 'er', 'es', 'etwas', 'euch', 'euer', 'eure',
  'eurem', 'euren', 'eurer', 'eures', 'fÃ¼r', 'gegen', 'gewesen', 'hab', 'habe', 'haben', 'hat',
  'hatte', 'hatten', 'hier', 'hin', 'hinter', 'ich', 'ihm', 'ihm', 'ihn', 'ihnen', 'ihr', 'ihre',
  'ihrem', 'ihren', 'ihrer', 'ihres', 'im', 'in', 'indem', 'ins', 'ist', 'jede', 'jedem', 'jeden',
  'jeder', 'jedes', 'jene', 'jenem', 'jenen', 'jener', 'jenes', 'jetzt', 'kann', 'kein', 'keine',
  'keinem', 'keinen', 'keiner', 'keines', 'kÃ¶nnen', 'kÃ¶nnte', 'machen', 'man', 'manche', 'manchem',
  'manchen', 'mancher', 'manches', 'mein', 'meine', 'meinem', 'meinen', 'meiner', 'meines', 'mich',
  'mir', 'mit', 'muss', 'musste', 'nach', 'nicht', 'nichts', 'noch', 'nun', 'nur', 'ob', 'oder',
  'ohne', 'sehr', 'sein', 'seine', 'seinem', 'seinen', 'seiner', 'seines', 'selbst', 'sich', 'sie',
  'sind', 'so', 'solche', 'solchem', 'solchen', 'solcher', 'solches', 'soll', 'sollte', 'sondern',
  'sonst', 'Ã¼ber', 'um', 'und', 'uns', 'unser', 'unsere', 'unserem', 'unseren', 'unseres', 'unter',
  'viel', 'vom', 'von', 'vor', 'wÃ¤hrend', 'war', 'waren', 'warst', 'was', 'weg', 'weil', 'weiter',
  'welche', 'welchem', 'welchen', 'welcher', 'welches', 'wenn', 'werde', 'werden', 'wie', 'wieder',
  'will', 'wir', 'wird', 'wirst', 'wo', 'wollen', 'wollte', 'wÃ¼rde', 'wÃ¼rden', 'zu', 'zum', 'zur',
  'zwar', 'zwischen'],
  fr: ['ai', 'au', 'aux', 'avec', 'ce', 'ces', 'dans', 'de', 'des', 'du', 'elle', 'en', 'et', 'eux',
  'il', 'je', 'la', 'le', 'les', 'leur', 'lui', 'ma', 'mais', 'me', 'mÃªme', 'mes', 'moi', 'mon',
  'ne', 'nos', 'notre', 'nous', 'on', 'ou', 'par', 'pas', 'pour', 'qu', 'que', 'qui', 'sa', 'se',
  'ses', 'son', 'sur', 'ta', 'te', 'tes', 'toi', 'ton', 'tu', 'un', 'une', 'vos', 'votre', 'vous',
  'c', 'd', 'j', 'l', 'Ã ', 'm', 'n', 's', 't', 'y', 'Ã©tÃ©', 'Ã©tÃ©e', 'Ã©tÃ©es', 'Ã©tÃ©s', 'Ã©tant',
  'Ã©tante', 'Ã©tants', 'Ã©tantes', 'suis', 'es', 'est', 'sommes', 'Ãªtes', 'sont', 'serai', 'seras',
  'sera', 'serons', 'serez', 'seront', 'serais', 'serait', 'serions', 'seriez', 'seraient', 'Ã©tais',
  'Ã©tait', 'Ã©tions', 'Ã©tiez', 'Ã©taient', 'fus', 'fut', 'fÃ»mes', 'fÃ»tes', 'furent', 'sois', 'soit',
  'soyons', 'soyez', 'soient', 'fusse', 'fusses', 'fÃ»t', 'fussions', 'fussiez', 'fussent', 'ayant',
  'ayante', 'ayantes', 'ayants', 'eu', 'eue', 'eues', 'eus', 'ai', 'as', 'avons', 'avez', 'ont',
  'aurai', 'auras', 'aura', 'aurons', 'aurez', 'auront', 'aurais', 'aurait', 'aurions', 'auriez',
  'auraient', 'avais', 'avait', 'avions', 'aviez', 'avaient', 'eut', 'eÃ»mes', 'eÃ»tes', 'eurent',
  'aie', 'aies', 'ait', 'ayons', 'ayez', 'aient', 'eusse', 'eusses', 'eÃ»t', 'eussions', 'eussiez',
  'eussent'],
};

// Count the occurence of items in the array by sorting them and seeing if the next iteration of the
// loop matches the previous one
function makeCountArray(arr) {
  const a = [];
  const b = [];
  let prev;
  arr.sort();
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      a.push(arr[i]);
      b.push(1);
    } else {
      b[b.length - 1] ++;
    }
    prev = arr[i];
  }
  return [a, b];
}

// Function to format the words into a counted, sorted and sliced array
function makeWordArray(words) {
  const tempWords = words
    .filter(word => { // Filter the words: remove if the word is on the blacklist,
      // remove if the word is empty and remove if length of word is 1 or less
      const lang = document.getElementById('language').value;
      return (blacklist[lang].indexOf(word) === -1) && (word.length > 1) &&
      (document.getElementById('ignored')
        .value.replace(' ', '')
        .split(',')
        .map(val => val.toLowerCase().trim())
        .indexOf(word) === -1);
    });
  const wordCount = makeCountArray(tempWords); // Create an array with counts
  const max = Math.max.apply(null, wordCount[1]); // Figure out the max count
  // const maxVal = 50; // Set the max value we want in final array
  const minVal = 4; // Set the min value we want in final array
  // Calculate the values with a quadratic function and a set max
  const counts = wordCount[1].map(val => Math.round((val / max) * 46 + minVal));

  const result = []; // Can probably skip and work directly on wordCount
  for (let i = 0; i < wordCount[0].length; i++) { // See above
    result.push([wordCount[0][i], counts[i]]);
  }
  result // See above
    .sort((a, b) => b[1] - a[1]); // Sort descending based on count

  // Next few lines are to introduce a slight degree of randomness in the first three items
  const temp = result.splice(0, 3); // Get the first three elements
  temp.sort(() => 0.5 - Math.random()); // And shuffle them in the most basic way possible
  result.unshift(...temp); // Put the shuffled front 3 items back in the array
  return result;
}

function getRandomColor(col) {
  if (col === 'red' || col === 'green' || col === 'shootingstar') {
    // var letters + color are the variables for randomizing green and red
    const letters = 'abc56789';
    let color = '';
    // var shootingStarColor is the variable for the shooting star effect
    const shootingStarColor = ['#954F12', '#955A12', '#952512', '#682B21', '#953B12', '#481D2F', '#1E102E', '#141040', '#481D36'];
    let shootingStar = '';
    // generates letters to use in allgreen + allred
    for (let i = 0; i < 2; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    // get all colors from shootingStarColor array and randomize them 
    if (col === 'shootingstar') {
      for (let x = 0; x < shootingStarColor.length; x++) {
        shootingStar = shootingStarColor[Math.floor(Math.random() * shootingStarColor.length)];
      }
      return shootingStar;
    }
     // If statement that return the correct color when function getRandomColor is
     // defined with red/green

    if (col === 'red') {
      return `#${color}2222`;
    }
    return `#22${color}22`;
  }
  // Picks a random number and put it in the var random
  const random = Math.floor(Math.random() * (99 - 20 + 1) + 20);
  return `#${random}${random}${random}`;
}
// Function to draw the wordcloud. Feed it a properly formatted wordArray (sort descending, make
// an array like ["word",5],["word2",3]). Canvas is the id of the target canvas element.

function makeWordCloud(canvas) {
  const cloud = makeWordArray(wordcloud).slice(0,
    parseInt(document.getElementById('wordnumber').value, 10));
  const scale = parseInt(document.getElementById('scalefactor').value, 10) / 100;
  document.getElementById('error').style.display = 'none';
  WordCloud(document.getElementById(canvas), {
    list: cloud,
    rotateRatio: 0, // Odds of word rotation
    fontFamily: 'Raleway', // CSS font
    gridSize: 7, // Spacing between words
    ellipticity: 0.4, // Higher = rounder
    minSize: 4, // Minimum pixel size for a word
    origin: [250, 150], // Starting point in the canvas element
    shape: 'cardioid', // Kidney-shaped
    shuffle: true,
    drawOutOfBound: false, // Permission to go over the edge
    backgroundColor: 'transparent',
    color: () => getRandomColor(document.getElementById('colortype').value),
    weightFactor: (size) => (((size * 200) / 2500) * size + size) * scale,
    // Based on a max initial size of 50, this makes differences more extreme.
    // Returns max double the size.
    click: (item) => {
      wordcloud = wordcloud.filter(word => (word !== item[0]));
        // When a word is clicked, filter the array for the clicked word to remove it
      makeWordCloud(canvas); // And call itself to re-draw with the modified data.
    },
  });
} // End of function makeWordCloud

// Create function to perform basic array cleaning and cache the result
function cleanWordInput(element) {
  const words = 
    $('#'+element).text() // Get the relevant input
    .replace(/[^\w~'().\-=?!\u00C0-\u017F]+/g, ' ')
    // Replace whitespace with a space, except ~ (that signifies a
    // combination of words)
    .split(' ') // Split with each space to seperate words.
    .map((word) => // Clean up the words
      word
        .trim()
        .toLowerCase()
        .replace(/~/g, ' ')
    );
  const words2 = words.filter(v=>v!='');
  return words2;
}

function trainSpellCheck (data){
  var lines = data;
  console.log('lines', lines);
  var count = lines.length;
  lines.forEach(function (line) {
    setTimeout(function () {
      speller.train(line);
      count--;
    }, 0);
  });
  console.log('speller', speller);
}
function spellCheck(data){
  var word = data;
  // let correctWord;
  console.log('spellcheckword', word);
  // setTimeout(function () {
   let correctWord = speller.correct(word);
  // }, 0);
  console.log('correctword', correctWord);
  return correctWord;
}

document.getElementById('btn-save').addEventListener('click', function clickSave(e) {
  const url = document.getElementById('wordle-canvas').toDataURL();
  if ('download' in document.createElement('a')) {
    this.href = url;
  } else {
    e.preventDefault();
    alert('Please right click and choose "Save As..." to save the generated image.');
    window.open(url, '_blank', 'width=500,height=300,menubar=yes');
  }
});

document.getElementById('inputwords').addEventListener('click', () => {
  wordcloud = cleanWordInput('association-container');
  // var postSpellCheck = spellCheck(tempWords);
  // console.log(spellCheck(wordleData));
  // let temptemp = ["angezond", "cafeinn"];
  // let temp2= spellCheck(temptemp);
  makeWordCloud('wordle-canvas');
});

document.getElementById('rerender').addEventListener('click', () => {
  if (wordcloud !== '') {
    makeWordCloud('wordle-canvas');
  } else {
    // do nothing
  }
});
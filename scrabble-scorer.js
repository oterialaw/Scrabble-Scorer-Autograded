// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";

	for (let i = 0; i < word.length; i++) {
      for (const pointValue in oldPointStructure) {
         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }
      }
	}
	return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let scrabbleCandidate = input.question("Let's play some scrabble!\n\nEnter a word to score: ");
   // let storeScore = oldScrabbleScorer(scrabbleCandidate);
   // let storeScore = simpleScorer(scrabbleCandidate);
   // let storeScore = vowelBonusScorer(scrabbleCandidate);
   //let storeScore = scorerPrompt(scrabbleCandidate);
   return scrabbleCandidate;
};

const newPoints = {
   1: ['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
};

function simpleScorer(word){
   word = word.toUpperCase();
   let points = 0;

   for (let i =0; i < word.length; i++) {
      for(const newPointValue in newPoints) {
         if(newPoints[newPointValue].includes(word[i])) {
            points = points+1
         }
      }
   }
   return points;
};

const newVowelPoints = {
   1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
   3: ['A', 'E', 'I', 'O', 'U'],
};

function vowelBonusScorer(word){
   word = word.toUpperCase();
   let vowelPoints = 0;

   for (let i=0; i < word.length; i++){
      for(const vowelPointValue in newVowelPoints) {
         if(newVowelPoints[vowelPointValue].includes(word[i])) {
            vowelPoints += +vowelPointValue
         }
      }
   }
   return vowelPoints
};

function scrabbleScorer(word){
   word = word.toLowerCase();
   let newLetterPoints = 0;

   for(let i=0; i < word.length; i++){
      newLetterPoints += +newPointStructure[word[i]]
   }
   return newLetterPoints;
};

const scoringAlgorithms = [
   {name: 'Simple Score', description: 'Each letter is worth 1 point.', scorerFunction: simpleScorer},
   {name: 'Bonus Vowels', description: 'Vowels are 3 pts, consonants are 1 pt.', scorerFunction: vowelBonusScorer},
   // {name: 'Scrabble', description: 'The traditional scoring algorithm.', scoringFunction: oldScrabbleScorer},
   {name: 'Scrabble', description: 'The traditional scoring algorithm.', scorerFunction: scrabbleScorer},
];
// failed originally w/ scoring function ... why ?

function scorerPrompt() {
   const userCandidate = input.question('Please enter your scoring algorithm of choice. \n\n 0 - Simple Score: One point per letter \n\n 1 - Bonus Vowels: Only Vowels are worth 3 points. Consonants are 1 point. \n\n 2 - Scrabble: Traditional scoring algorithm \n\n Enter 0, 1, or 2: ');
   if(userCandidate !=='0' && userCandidate !=='1' && userCandidate !=='2'){
      console.log(`\n*** Response can't be ${userCandidate}... Please enter 0, 1, or 2 ***\n`);
      // Call this function again and return a valid response object
      return scorerPrompt();
   } else {
      // Can immediately return the valid object
      return scoringAlgorithms[userCandidate];
   }
};

function transform(pointStructure){
   const transformedObject = {};
   for (const point in pointStructure){
      for(let characterIndex =0; characterIndex < pointStructure[point].length; characterIndex++){
         transformedObject[pointStructure[point][characterIndex].toLowerCase()] = +point;
      }
   };
   return transformedObject;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   // initialPrompt();
   const runScore = initialPrompt();
   const getScore = scorerPrompt();
   console.log(`Score for '${runScore}': ${getScore['scoringFunction'](runScore)}`);
};

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

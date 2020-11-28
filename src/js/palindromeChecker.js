/*
You'll need to remove all non-alphanumeric characters (punctuation, spaces and symbols)
and turn everything into the same case (lower or upper case) in order to check for palindromes
*/

// var regex = /\W|\s/gi;
// will match letters, numbers, and underscore
var regex = /\w/gi;

// ("2_A3*3#A 2");

var lettersAndNums = "2_A3*3#A 2".match(regex);
//letterAndNums will return an array of these values: ["2", "_", "A", "3", "3", "A", "2"]

//using filter method to filter out the underscore. leaving us letters and numbers.
var withoutUnderscore = lettersAndNums.filter(function removeUnderscore(
  eachValue
) {
  return eachValue != "_";
});

var reverseOurStr = [];

/*** reverse our string ***/
//loop our withoutUnderscore array start at array.length - 1. we want to use 0 <= i because when i is 0 we will enter our loop.
//if we used 0 < i when i is 0 i is no longer greater than 0 it equals to 0. we won't enter our loop.
for (let i = withoutUnderscore.length - 1; 0 <= i; i--) {
  var eachChar = withoutUnderscore[i];
  reversedStr.push(eachChar);
}

function palindromeChecker(strInput) {
  var lowerCased = strInput.toLowerCase();
  var regex = /\w/gi;
  var lettersAndNums = lowerCased.match(regex);
  var withoutUnderscore = lettersAndNums.filter(function removeUnderscore(
    eachChar
  ) {
    return eachChar != "_";
  });
  //
  var reversedStr = [];
  console.log(withoutUnderscore);
  /* ["m", "y", "a", "g", "e", "i", "s", "0", "0", "s", "i", "e", "g", "a", "y", "m"] */
  for (let i = withoutUnderscore.length - 1; 0 <= i; i--) {
    var eachValue = withoutUnderscore[i];
    reversedStr.push(eachValue);
  }
  /* ["m", "y", "a", "g", "e", "i", "s", "0", "0", "s", "i", "e", "g", "a", "y", "m"] */
  console.log(reversedStr);
  /*use map? our reversed string and original string will have the same length*/
  /*feels dirty but we might have to have a nested loop*/
  //if our array do not have the same length return false
  var ourAnswer;
  if (withoutUnderscore.length != reversedStr.length) {
    return false;
  } else {
    reversedStr.forEach(function matchEachChar(eachChar) {
      ourAnswer = withoutUnderscore.every(function checkingEachChar(innerChar) {
        return innerChar == eachChar;
      });
    });
  }
  console.log(ourAnswer);
}
// const collaborator = {
//   name: "Toan Khuong",
//   interests: "Anything that involves JavaScript",
//   // profession: {
//   //   workingTowards: "Software Engineer/Senior Developer",
//   //   status: "Pending",
//   // },
//   goals: {
//     current: "Get better every day. Always Be Coding",
//     // willAchieve: {
//     //   year: "2021",
//     //   position: "Junior Developer",
//     //   company: "A great comapny that focus on helping others",
//     // },
//   },
//   favoriteQuotes: {
//     denzelWashington: "Keep moving, keep growing, KEEP LEARNING!",
//   },
// };

// const collaborator = {
//   name: "Toan Khuong",
//   goals: {
//     current: "Get better every day. Always Be Coding"
//   },
//   favoriteQuotes: {
//     denzelWashington: "Keep moving, keep growing, KEEP LEARNING!"
//   },
// };

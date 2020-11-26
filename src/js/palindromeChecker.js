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
  reverseOurStr.push(eachChar);
}

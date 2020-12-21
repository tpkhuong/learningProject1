/*** *
 * The user may fill out the form field any way they choose as long as it has the format of a valid US number.
 * The following are examples of valid formats for US numbers (refer to the tests below for other variants):

555-555-5555
(555)555-5555
(555) 555-5555
555 555 5555
5555555555
1 555 555 5555
For this challenge you will be presented with a string such as 800-692-7753 or 8oo-six427676;laskdjf.
Your job is to validate or reject the US phone number based on any combination of the formats provided above.
The area code is required. If the country code is provided, you must confirm that the country code is 1. Return true if the string is a valid US phone number; otherwise return false.
 * **/

/*** 
 * Specify Only the Lower Number of MatchesPassed
You can specify the lower and upper number of patterns with quantity specifiers using curly brackets.
Sometimes you only want to specify the lower number of patterns with no upper limit.

To only specify the lower number of patterns, keep the first number followed by a comma.

For example, to match only the string "hah" with the letter a appearing at least 3 times, your regex would be /ha{3,}h/.
 * ***/

var regex = /^1 |^1/g;
// var regexTwo = /.\d{3}.\d{3}.\d{4}/;
var regexTwo = /\d+|\W/g;
var regexTest = /[\W\s]\d+[\W\s]\d{3}.\d{4}/g;
var regexTestTwo = /^.{4,}\d{3}.\d{4}/g;
var regexTestThree = /[\W\s]{2,}\d{3}.\d{4}/g;
var regexTestFour = /[(\s]\d+[)\s]{1,2}\d{3}.\d{4}/g;
var regexTestFive = /\({2}|\)/g;
var regexTextSix = /\d{3}.\d{3}.\d{4}/g;

function telephoneCheck(strInput) {
  //if the length is less than 10 or includes letters return false
  var letterRegex = /[a-z]gi/;
  var checkForLetters = letterRegex.test(strInput);
  var checkForNegative = /^[-]/.test(strInput);
  if (
    strInput.length < 10 ||
    checkForLetters === true ||
    checkForNegative === true
  ) {
    return false;
  } else if (strInput.length > 10) {
    //check if string begins with 1
    let checkForOneRegex = /^1/.test(strInput);
    if (checkForOneRegex) {
      if (strInput.length > 16) return false;
      //copy first two strings then check for space. let's go with that
      let firstCharIsOneWithSpace = checkFirstTwoCharsForSpace(strInput);
      //copy the string based on if the string contains a space or not
      if (firstCharIsOneWithSpace) {
        let copiedStrWithSpace = strInput.slice(2);
        return helperFunc(copiedStrWithSpace) === true ? true : false;
      } else {
        let copiedStrWithoutSpace = strInput.slice(1);
        return helperFunc(copiedStrWithoutSpace) === true ? true : false;
      }
    } else {
      //our regex checks are specific. we don't have to worry about checking if the string starts with a number or do any other checks or check for length. this will work.
      //we will pass the string into our helper function and let our helper function perform the checks for us.
      //we are checking if the first two char includes a space
      let firstCharIsNotOne = /^[2-9]/.test(strInput);
      let firstCharIsNotOneWithSpace = checkFirstTwoCharsForSpace(strInput);
      let firstCharIsNotOneWithLeftParens = /^[2-9][()]/.test(strInput);
      if (firstCharIsNotOneWithSpace) {
        return false;
      } else if (firstCharIsNotOneWithLeftParens && strInput.length > 10) {
        return false;
      } else {
        var checkIfStrContainBothParens = checkForParens(strInput);
        if (checkIfStrContainBothParens) {
          return helperFunc(strInput) === true ? true : false;
        } else {
          return false;
        }
      }
    }
  } else {
    let allNumRegex = /\d{10}/;
    return allNumRegex.test(strInput);
  }
  function helperFunc(ourInput) {
    var regexTestOne = /\d{3}[-\s]\d{3}[-\s]\d{4}/g;
    var regexTestTwo = /[(\s]\d{3}[)\s]{1,2}\d{3}.\d{4}/g;
    var arrOfRegex = [regexTestOne, regexTestTwo];
    //loop through our array of regex passing in the string and see if the string passes one of the regex.
    return arrOfRegex.some(function checkOurRegex(eachRegex) {
      return eachRegex.test(ourInput);
    });
  }
  function checkFirstTwoCharsForSpace(stringInput) {
    let copyFirstTwoChars = stringInput.slice(0, 2);
    let checkForSpaceRegex = /\s/.test(copyFirstTwoChars);
    return checkForSpaceRegex;
  }
  function checkForParens(ourStringInput) {
    var checkForLeftParens = /\(/;
    var checkForRightParens = /\)/;

    var arrOfParansRegex = [checkForLeftParens, checkForRightParens];

    return arrOfParansRegex.every(function runStrThroughArr(eachParens) {
      return eachParens.test(ourStringInput);
    });
  }
}

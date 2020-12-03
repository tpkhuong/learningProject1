/*
1: I,
5: V,
10: X,
50: L,
100: C,
500: D,
1000: M
*/
/*

*/
function convertToRoman(num) {
  //our answer will be string type
  var romanNums = {
    1: "I",
    5: "V",
    10: "X",
    50: "L",
    100: "C",
    500: "D",
    1000: "M",
  };
  return num;
}
/*helper functions*/
function getDigit(num) {
  /*Math.pow(10, 0): will be 1. Math.pow(10, 1) will be 10*/
  var lengthOfLoop = digitCount(num);
  var valueOfNum = [];
  var lengthOfEachValue = [];
  //looping lengthOfLoop
  /*arrayOfObjs will be [{value: 1000, length: 4}, {value: 900, length: 3}]*/
  var arrayOfObjs = [];
  for (let i = 0; i < lengthOfLoop; i++) {
    /*if we passed in 1985, our valueOfNum array will be [1000,900,80,5]
    lengthOfEachValue will be [4,3,2,1]
    */
    let placedToTheTenth = Math.pow(10, i);
    let eachValue =
      (Math.floor(Math.abs(num) / Math.pow(10, i)) % 10) * placedToTheTenth;
    valueOfNum.unshift(eachValue);
    lengthOfEachValue.unshift(digitCount(eachValue));
    arrayOfObjs.unshift({
      value: String(eachValue),
      length: digitCount(eachValue),
    });
  }
}

function digitCount(num) {
  if (num == 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function calculateOurNums(valueInput, lengthInput) {}
// [1000, 900, 80, 5].forEach(function findLength(eachValue) {
//   console.log(digitCount(eachValue));
// });

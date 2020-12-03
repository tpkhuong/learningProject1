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

  var valuesBeforeConvert = arrayOfObjs.map(function sameLengthArray({
    value,
    length,
  }) {
    return calculateNumsBeforeConvert(value, length);
  });
  /*** we will loop through array with our objs. we will pass in the value and length into our function ***/
  /*** implement function that will return an array of subarrays: if we passded in 1985 we want an array that look like this:
   * we want the array to hold string type of these values.
   * [[1000], [100,1000],[50,10,10,10],[5]] then we can loop through this array and convert it to romanNumeral
   * ***/
  console.log(valuesBeforeConvert);
}

function digitCount(num) {
  if (num == 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function calculateNumsBeforeConvert(valueInput, lengthInput) {
  var numsOfZerosToAddToEnd = lengthInput - 1;
  var objOfZeros = {
    1: "0",
    2: "00",
    3: "000",
  };
  console.log(
    objOfZeros[numsOfZerosToAddToEnd],
    typeof objOfZeros[numsOfZerosToAddToEnd]
  );
  var checkNumAndLoopThisNum = Number(valueInput[0]);
  var arrOfNumsBeforeAddZeros = [];
  /*** using triple equal just incase we can a string of 0, empty string "" or empty array [] ***/
  if (checkNumAndLoopThisNum == 5) {
    //.push() will return the length SO WE WERE PUSHING/RETURNING THE LENGTH TO OUR MAP METHOD. THAT IS WHY OUR ARRAY LOOKED LIKED THIS: [["1"],1,["5","1","1","1"],1]
    arrOfNumsBeforeAddZeros.push("5");
    return arrOfNumsBeforeAddZeros;
  }
  if (checkNumAndLoopThisNum == 4) {
    arrOfNumsBeforeAddZeros.push("1", "5");
    return arrOfNumsBeforeAddZeros;
  }
  if (checkNumAndLoopThisNum == 9) {
    arrOfNumsBeforeAddZeros.push("1", "10");
    return arrOfNumsBeforeAddZeros;
  }
  if (checkNumAndLoopThisNum < 5) {
    for (let i = 0; i < checkNumAndLoopThisNum; i++) {
      arrOfNumsBeforeAddZeros.push("1");
    }
    return arrOfNumsBeforeAddZeros;
  } else {
    arrOfNumsBeforeAddZeros.push("5");
    for (let i = 6; i <= checkNumAndLoopThisNum; i++) {
      arrOfNumsBeforeAddZeros.push("1");
    }
    return arrOfNumsBeforeAddZeros;
  }
}
// [1000, 900, 80, 5].forEach(function findLength(eachValue) {
//   console.log(digitCount(eachValue));
// });

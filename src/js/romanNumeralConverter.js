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
  return getDigitAndConvertToRomanNums(num, romanNums);
}
/*helper functions*/
function getDigitAndConvertToRomanNums(numInput, objInput) {
  /*Math.pow(10, 0): will be 1. Math.pow(10, 1) will be 10*/
  var lengthOfLoop = digitCount(numInput);
  // var valueOfNum = [];
  // var lengthOfEachValue = [];

  //looping lengthOfLoop
  /*arrayOfObjs will be [{value: 1000, length: 4}, {value: 900, length: 3}]*/
  var arrayOfObjs = [];
  for (let i = 0; i < lengthOfLoop; i++) {
    /*if we passed in 1985, our valueOfNum array will be [1000,900,80,5]
    lengthOfEachValue will be [4,3,2,1]
    */
    let placedToTheTenth = Math.pow(10, i);
    let eachValue =
      (Math.floor(Math.abs(numInput) / Math.pow(10, i)) % 10) *
      placedToTheTenth;
    // valueOfNum.unshift(eachValue);
    // lengthOfEachValue.unshift(digitCount(eachValue));
    arrayOfObjs.unshift({
      value: String(eachValue),
      length: digitCount(eachValue),
    });
  }

  var valuesBeforeConvert = arrayOfObjs.map(function sameLengthArray({
    value,
    length,
  }) {
    return returnArrayOfNumsBeforeConvert(value, length);
  });
  /*** we will loop through array with our objs. we will pass in the value and length into our function ***/
  /*** implement function that will return an array of subarrays: if we passded in 1985 we want an array that look like this:
   * we want the array to hold string type of these values.
   * [[1000], [100,1000],[50,10,10,10],[5]] then we can loop through this array and convert it to romanNumeral
   works
   * 
   * ***/
  var convertToRomanNumeral = valuesBeforeConvert.flat();
  var romanNumeralFormat = convertToRomanNumeral
    .map(function convertToRoman(eachValue) {
      return objInput[eachValue];
    })
    .join("");

  /*** using reduce ***/
  var reduceVersion = valuesBeforeConvert.reduce(function iLoveReduce(
    buildingUp,
    currentValue
  ) {},
  []);
  return romanNumeralFormat;
}

function digitCount(num) {
  if (num == 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function returnArrayOfNumsBeforeConvert(valueInput, lengthInput) {
  var numsOfZerosToAddToEnd = lengthInput - 1;
  var objOfZeros = {
    1: "0",
    2: "00",
    3: "000",
  };
  var addTheseManyZeros = objOfZeros[numsOfZerosToAddToEnd];
  // console.log(
  //   objOfZeros[numsOfZerosToAddToEnd],
  //   typeof objOfZeros[numsOfZerosToAddToEnd]
  // );
  var checkNumAndLoopThisNum = Number(valueInput[0]);
  var arrOfNumsAndAddZeros = [];
  /*** using triple equal just incase we can a string of 0, empty string "" or empty array [] ***/
  if (checkNumAndLoopThisNum == 5) {
    //.push() will return the length SO WE WERE PUSHING/RETURNING THE LENGTH TO OUR MAP METHOD. THAT IS WHY OUR ARRAY LOOKED LIKED THIS: [["1"],1,["5","1","1","1"],1]
    if (numsOfZerosToAddToEnd > 0) {
      arrOfNumsAndAddZeros.push("5".concat(addTheseManyZeros));
      return arrOfNumsAndAddZeros;
    } else {
      arrOfNumsAndAddZeros.push("5");
      return arrOfNumsAndAddZeros;
    }
  }
  if (checkNumAndLoopThisNum == 4) {
    if (numsOfZerosToAddToEnd > 0) {
      arrOfNumsAndAddZeros.push(
        "1".concat(addTheseManyZeros),
        "5".concat(addTheseManyZeros)
      );
      return arrOfNumsAndAddZeros;
    } else {
      arrOfNumsAndAddZeros.push("1", "5");
      return arrOfNumsAndAddZeros;
    }
  }
  if (checkNumAndLoopThisNum == 9) {
    if (numsOfZerosToAddToEnd > 0) {
      arrOfNumsAndAddZeros.push(
        "1".concat(addTheseManyZeros),
        "10".concat(addTheseManyZeros)
      );
      return arrOfNumsAndAddZeros;
    } else {
      arrOfNumsAndAddZeros.push("1", "10");
      return arrOfNumsAndAddZeros;
    }
  }
  if (checkNumAndLoopThisNum < 5) {
    if (numsOfZerosToAddToEnd > 0) {
      for (let i = 0; i < checkNumAndLoopThisNum; i++) {
        arrOfNumsAndAddZeros.push("1".concat(addTheseManyZeros));
      }
      return arrOfNumsAndAddZeros;
    } else {
      for (let i = 0; i < checkNumAndLoopThisNum; i++) {
        arrOfNumsAndAddZeros.push("1");
      }
      return arrOfNumsAndAddZeros;
    }
  } else {
    if (numsOfZerosToAddToEnd > 0) {
      arrOfNumsAndAddZeros.push("5".concat(addTheseManyZeros));
      for (let i = 6; i <= checkNumAndLoopThisNum; i++) {
        arrOfNumsAndAddZeros.push("1".concat(addTheseManyZeros));
      }
      return arrOfNumsAndAddZeros;
    } else {
      arrOfNumsAndAddZeros.push("5");
      for (let i = 6; i <= checkNumAndLoopThisNum; i++) {
        arrOfNumsAndAddZeros.push("1");
      }
      return arrOfNumsAndAddZeros;
    }
  }
}

/*** Testing something. USED REDUCE METHOD WITH OUR function calculateNumsBeforeConvert()
 * since our calculateNumsBeforeConvert returns an array with the string form of our number we can use .reduce() and .concat()
 * we will pass in an array as our initial value to our reduce method then we will use .concat() that will combine the initial value our empty array with the array returned by our
 * calculateNumsBeforeConvert. since .concat() returns a new array with the values in both arrays. the array that is return from .concat() it will be our buildingUp value
 * for the next iteration.
 * ***/

function getDigitAndConvertToRomanNums(numInput, objInput) {
  /*Math.pow(10, 0): will be 1. Math.pow(10, 1) will be 10*/
  var lengthOfLoop = digitCount(numInput);
  // var valueOfNum = [];
  // var lengthOfEachValue = [];

  //looping lengthOfLoop
  /*arrayOfObjs will be [{value: 1000, length: 4}, {value: 900, length: 3}]*/
  var arrayOfObjs = [];
  for (let i = 0; i < lengthOfLoop; i++) {
    /*if we passed in 1985, our valueOfNum array will be [1000,900,80,5]
    lengthOfEachValue will be [4,3,2,1]
    */
    let placedToTheTenth = Math.pow(10, i);
    let eachValue =
      (Math.floor(Math.abs(numInput) / Math.pow(10, i)) % 10) *
      placedToTheTenth;
    // valueOfNum.unshift(eachValue);
    // lengthOfEachValue.unshift(digitCount(eachValue));
    arrayOfObjs.unshift({
      value: String(eachValue),
      length: digitCount(eachValue),
    });
  }

  var valuesBeforeConvert = arrayOfObjs.reduce(function sameLengthArray(
    buildingUp,
    { value, length }
  ) {
    return buildingUp.concat(calculateNumsBeforeConvert(value, length));
  },
  []);
  /*** we will loop through array with our objs. we will pass in the value and length into our function ***/
  /*** implement function that will return an array of subarrays: if we passded in 1985 we want an array that look like this:
   * we want the array to hold string type of these values.
   * [[1000], [100,1000],[50,10,10,10],[5]] then we can loop through this array and convert it to romanNumeral
   works
   var convertToRomanNumeral = valuesBeforeConvert.flat();
   * 
   * ***/
  var romanNumeralFormat = valuesBeforeConvert
    .map(function convertToRoman(eachValue) {
      return objInput[eachValue];
    })
    .join("");

  return romanNumeralFormat;
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
  var addTheseManyZeros = objOfZeros[numsOfZerosToAddToEnd];
  // console.log(
  //   objOfZeros[numsOfZerosToAddToEnd],
  //   typeof objOfZeros[numsOfZerosToAddToEnd]
  // );
  var checkNumAndLoopThisNum = Number(valueInput[0]);
  var arrOfNumsAndAddZeros = [];
  /*** using triple equal just incase we can a string of 0, empty string "" or empty array [] ***/
  if (checkNumAndLoopThisNum == 5) {
    //.push() will return the length SO WE WERE PUSHING/RETURNING THE LENGTH TO OUR MAP METHOD. THAT IS WHY OUR ARRAY LOOKED LIKED THIS: [["1"],1,["5","1","1","1"],1]
    if (numsOfZerosToAddToEnd > 0) {
      arrOfNumsAndAddZeros.push("5".concat(addTheseManyZeros));
      return arrOfNumsAndAddZeros;
    } else {
      arrOfNumsAndAddZeros.push("5");
      return arrOfNumsAndAddZeros;
    }
  }
  if (checkNumAndLoopThisNum == 4) {
    if (numsOfZerosToAddToEnd > 0) {
      arrOfNumsAndAddZeros.push(
        "1".concat(addTheseManyZeros),
        "5".concat(addTheseManyZeros)
      );
      return arrOfNumsAndAddZeros;
    } else {
      arrOfNumsAndAddZeros.push("1", "5");
      return arrOfNumsAndAddZeros;
    }
  }
  if (checkNumAndLoopThisNum == 9) {
    if (numsOfZerosToAddToEnd > 0) {
      arrOfNumsAndAddZeros.push(
        "1".concat(addTheseManyZeros),
        "10".concat(addTheseManyZeros)
      );
      return arrOfNumsAndAddZeros;
    } else {
      arrOfNumsAndAddZeros.push("1", "10");
      return arrOfNumsAndAddZeros;
    }
  }
  if (checkNumAndLoopThisNum < 5) {
    if (numsOfZerosToAddToEnd > 0) {
      for (let i = 0; i < checkNumAndLoopThisNum; i++) {
        arrOfNumsAndAddZeros.push("1".concat(addTheseManyZeros));
      }
      return arrOfNumsAndAddZeros;
    } else {
      for (let i = 0; i < checkNumAndLoopThisNum; i++) {
        arrOfNumsAndAddZeros.push("1");
      }
      return arrOfNumsAndAddZeros;
    }
  } else {
    if (numsOfZerosToAddToEnd > 0) {
      arrOfNumsAndAddZeros.push("5".concat(addTheseManyZeros));
      for (let i = 6; i <= checkNumAndLoopThisNum; i++) {
        arrOfNumsAndAddZeros.push("1".concat(addTheseManyZeros));
      }
      return arrOfNumsAndAddZeros;
    } else {
      arrOfNumsAndAddZeros.push("5");
      for (let i = 6; i <= checkNumAndLoopThisNum; i++) {
        arrOfNumsAndAddZeros.push("1");
      }
      return arrOfNumsAndAddZeros;
    }
  }
}

// [1000, 900, 80, 5].forEach(function findLength(eachValue) {
//   console.log(digitCount(eachValue));
// });

/* diagonal sum */
/*
Given a square matrix, calculate the absolute difference between the sums of its diagonals.

For example, the square matrix  is shown below:

[[3],[1, 2, 3],
[4, 5, 6],
[9, 8, 9]]  

[[3],
[11, 2, 4],
[4, 5, 6],
[10, 8, -12]]

Function description

Complete the  function in the editor below.

diagonalDifference takes the following parameter:

int arr[n][m]: an array of integers
Return

int: the absolute diagonal difference
Input Format

*/

function diagonalDifference(arrInput) {
  var arrayMatrix = checkLength(arrInput);
  var [firstSubarray, secondSubarray, thirdSubarray] = arrayMatrix;
  var [leftFirstValue, ignore, rightFirstValue] = firstSubarray;
  var [ignoreTwo, useInBothCalc, ignoreThree] = secondSubarray;
  var [rightSecondValue, ignoreFour, leftSecondValue] = thirdSubarray;

  var leftSideCalc = calcTheSum([
    leftFirstValue,
    useInBothCalc,
    leftSecondValue,
  ]);
  var rightSideCalc = calcTheSum([
    rightFirstValue,
    useInBothCalc,
    rightSecondValue,
  ]);

  return Math.abs(leftSideCalc - rightSideCalc);
}

function calcTheSum(arrInput) {
  return arrInput.reduce(function addStuff(buildingUp, currentValue) {
    return (buildingUp += currentValue);
  }, 0);
}

function checkLength(arrInput) {
  return arrInput.filter(function sameLengthArrOnly(eachValue) {
    return eachValue.length == 3;
  });
}

function diagonalDifference(arrInput) {
  var arrayMatrix = checkLength(arrInput);
  var valueInBothCalc;
  var firstValues;
  var secondValues;
  //if index is not 1, make copy of first and third value of array.
  arrayMatrix.forEach(function (eachSubarray, currIndex, list) {
    if (currIndex != 1) {
      if (currIndex == 0) {
        firstValues = [eachSubarray[0], eachSubarray[2]];
      }
      if (currIndex == 2) {
        secondValues = [eachSubarray[0], eachSubarray[2]];
      }
    } else {
      for (let i = 0; i < eachSubarray.length; i++) {
        if (i == 1) valueInBothCalc = eachSubarray[i];
      }
    }
  });
  //calculation algorithm
  var [leftFirstValue, rightFirstValue] = firstValues;
  var [rightSecondValue, leftSecondValue] = secondValues;

  var leftSide = calcTheSum([leftFirstValue, valueInBothCalc, leftSecondValue]);
  var rightSide = calcTheSum([
    rightFirstValue,
    valueInBothCalc,
    rightSecondValue,
  ]);

  return Math.abs(leftSide - rightSide);
}

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
  return num;
}
/*helper functions*/
function getDigit(num) {
  /*Math.pow(10, 0): will be 1. Math.pow(10, 1) will be 10*/
  var lengthOfLoop = digitCount(num);
  var valueOfNum = [];
  //looping lengthOfLoop
  for (let i = 0; i < lengthOfLoop; i++) {
    /*if we passed in 1985, our valueOfNum array will be [1000,900,80,5]*/
    let placement = Math.pow(10, i);
    valueOfNum.unshift(
      (Math.floor(Math.abs(num) / Math.pow(10, i)) % 10) * placement
    );
  }
}

function digitCount(num) {
  if (num == 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

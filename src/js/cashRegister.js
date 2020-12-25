/*** 
 * Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash),
 * and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (ONE)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)

See below for an example of a cash-in-drawer array:

//[String, number]
[
  ["PENNY", 1.01], => $1.01 in pennies 101 pennies => 1.01 / .01
  ["NICKEL", 2.05], => $2.05 in nickels 41 nickels => 2.05 / .05
  ["DIME", 3.1], => $3.1 in dime 31 nickels => 3.1 / .1
  ["QUARTER", 4.25], => $4.25 in quarters 17 quarters => 4.25 / .25
  ["ONE", 90], => $90 in ones 90 in ones => 90 / 1
  ["FIVE", 55], => $55 in fives 11 in fives => 55 / 5
  ["TEN", 20], => $20 in tens 2 tens => 20 / 10
  ["TWENTY", 60], => $60 in twenty 3 twenties => 60 / 20
  ["ONE HUNDRED", 100] => $100 will be 1 $100 bill => 100 / 100
]
 * ***/

//we want to return an object with {status: "string", change:[array]}
// return change;
//make an object with converted string to currency
/*
  {
    currency: "PENNY",
    valueInDecimal: .01,
    quantities: 
  }
  */

/***
 * This problem is easier when you know the value of each bill or coin you are working with, rather than just the sum of each in the register.
 * For example, it’s useful to know that a nickel is worth .05, along with the fact that you have $2.05 worth of nickels in the cash register.
 * ***/

function checkCashRegister(price, cash, cid) {
  //we want to use .toFixed(2) on our number to keep it at 2 decimals
  //cid is an array with subarrays
  //let's get total of cash in drawer first
  /*
  var justNames = [
    "PENNY",
    "NICKEL",
    "DIME",
    "QUARTER",
    "ONE",
    "FIVE",
    "TEN",
    "TWENTY",
    "ONE HUNDRED"
  ]
 
  justNames.forEach(function printNames(eachStr) {
    console.log(convertToDecimal[eachStr]);
  });
  */

  var reversedCID = [];

  for (let i = cid.length - 1; 0 <= i; i--) {
    var eachValue = cid[i];
    reversedCID.push(eachValue);
  }

  var convertToDecimal = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    "ONE HUNDRED": 100,
  };

  var objOfCurrAndQuantities = objToUseInFundsCalculation(
    convertToDecimal,
    cid
  );
  var totalOfCID = Number(calculateTotalOfCashInDrawer(cid));
  var change = cash - price;
  // console.log(typeof totalOfCID);
  if (change > totalOfCID) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (change < totalOfCID) {
    //if the value of the currency in the CID is greater than the change we want to filter that out.
    var currThatIsLessThanChange = reversedCID.filter(
      function getLessThanValues([strCurrency, valueOfCurInCID]) {
        return valueOfCurInCID < change;
      }
    );
    console.log(currThatIsLessThanChange);
    return { status: "OPEN", change: [] };
  } else {
    return { status: "CLOSED", change: [] };
  }
}

function calculateTotalOfCashInDrawer(listInput) {
  var total = listInput.reduce(function addSecondValueInArr(
    buildingUp,
    eachSubarray
  ) {
    return (buildingUp += eachSubarray[1]);
  },
  0);
  return total.toFixed(2);
}

function objToUseInFundsCalculation(objInput, cidInput) {
  return cidInput.map(function calculateQuanity(eachSubarray) {
    var currencyString = eachSubarray[0];
    var totalOfCurInCID = eachSubarray[1];
    var calculatedQuanity = Number(
      (totalOfCurInCID / objInput[currencyString]).toFixed()
    );
    return {
      currency: currencyString,
      totalOfCurInCID,
      valueInDecimal: objInput[currencyString],
      quantities: calculatedQuanity,
    };
  });
}
/***
 * checkCashRegister(3.26, 100,
 * [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60],
 * ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}
 * ***/

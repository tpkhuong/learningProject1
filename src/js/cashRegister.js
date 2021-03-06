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
    currencyInNumFormat: .01,
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
  var change = cash - price;
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

  /*
  objOfCurrAndQuantities looks like:

  [
    {
    currency: "PENNY"
    quantities: 101
    totalOfCurrencyInCID: 1.01
    currencyInNumFormat: 0.01
  }
]
  */
  var objOfCurrAndQuantities = objToUseInFundsCalculation(
    convertToDecimal,
    reversedCID
  );
  var totalOfCID = Number(calculateTotalOfCashInDrawer(cid));

  // console.log(typeof totalOfCID);
  if (change > totalOfCID) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (change < totalOfCID) {
    //if the value of the currency in the CID is greater than the change we want to filter that out. might not have to use filter method, we can use reduce instead.
    /*
    var currThatIsLessThanChange = reversedCID.filter(
      function getLessThanValues([strCurrency, valueOfCurInCID]) {
        return convertToDecimal[strCurrency] < change;
      }
    );
    let copiedChanged = change;
    */
    let arrOfStrformValuetosubtractAndUpdatedquantities = [];
    /*** calculate newChange for each iteration and pass it to the next iteration? ***/
    var copyOfCidArray = [...reversedCID];

    var checkIfChangeIsZero = change;
    /*** before calling reduce to perform calculation 

    var saveThisValue = objOfCurrAndQuantities.reduce(function mainCalculations(
      buildingUp,
      currentValue,
      currentIndex,
      ourList
    ) {
      var arrWePassIntoHelperFunc = ourList.slice(currentIndex);
      var objOfValuesFromHelperFunc = findAndSortQuantityAndCalculateNewChange(
        arrWePassIntoHelperFunc,
        arrOfStrformValuetosubtractAndUpdatedQuantities,
        buildingUp
      );
      //we can calculate newChnage in our findAndSortQuantityAndCalculateNewChange function return it as a value in an obj
      //return that newChange which will be used as buildingUp in the next iteration.
      var { newChange, addThisArr } = objOfValuesFromHelperFunc;
      arrOfStrformValuetosubtractAndUpdatedQuantities.push(addThisArr);
    /*** updating our copied array of cash in drawer /
      return newChange;
    },
    change);***/
    //we might have to use a for loop

    for (let i = 0; i < objOfCurrAndQuantities.length; i++) {
      var arrWePassIntoHelperFunc = objOfCurrAndQuantities.slice(i);
      var objOfValuesFromHelperFunc = findAndSortQuantityAndCalculateNewChange(
        arrWePassIntoHelperFunc,
        arrOfStrformValuetosubtractAndUpdatedquantities,
        checkIfChangeIsZero
      );
      var { newChange, addThisArr } = objOfValuesFromHelperFunc;
      arrOfStrformValuetosubtractAndUpdatedquantities.push(addThisArr);
      checkIfChangeIsZero = newChange;
      if (checkIfChangeIsZero == 0) break;
    }
    /*** this array has the values we want to use to get our answer: strForm, updatedQuantities, valueToSubtract: [[strForm, valueToSubtract, updatedQuantities]] ***/
    var spreadThisArr = arrOfStrformValuetosubtractAndUpdatedquantities.map(
      function getStrFormAndValueToSubtract([strForm, valueToSubtract]) {
        return [strForm, valueToSubtract];
      }
    );
    /*** updateCID ***/
    var updatedCidArray = updateCID(
      copyOfCidArray,
      arrOfStrformValuetosubtractAndUpdatedquantities
    );
    console.log(updatedCidArray);
    return { status: "OPEN", change: [...spreadThisArr] };
  } else {
    return { status: "CLOSED", change: [] };
  }
  function findAndSortQuantityAndCalculateNewChange(
    arrInput,
    listInput,
    changeInput
  ) {
    //sort this array, use shift() to get the var changeDivideByEachCurrency = [];
    //we don't want to want to check currencyFormatTwice "PENNY" or "TWENTY" it was used in the calculation of the newChange.
    var justStrFormsOfCurrency = listInput.reduce(function getStrForms(
      buildingUp,
      currentValue
    ) {
      return buildingUp.concat(currentValue[0]);
    },
    []);

    var currFormatNotUsedToCalcNewChange = arrInput.filter(
      function notInJustStrFormArr({ currency }) {
        return !justStrFormsOfCurrency.includes(currency);
      }
    );
    /*** use reduce ***/

    var changeDivideByEachCurrency = currFormatNotUsedToCalcNewChange.reduce(
      function valuesPushedIntoArr(buildingUp, currentValue) {
        var pushThisValueIntoArrBeforeSorting;
        if (currentValue.currencyInNumFormat < changeInput) {
          pushThisValueIntoArrBeforeSorting =
            changeInput / currentValue.currencyInNumFormat;
        } else {
          return buildingUp;
        }

        return buildingUp.concat([
          {
            dividedValue: Math.floor(pushThisValueIntoArrBeforeSorting),
            strFormatOfValue: currentValue.currency,
            currInNumForm: currentValue.currencyInNumFormat,
            quantitiesInFindAndSortFunc: currentValue.quantities,
          },
        ]);
      },
      []
    );
    /* forEach method 
    arrInput.forEach(function valuesPushedIntoArr(eachItem) {
      var pushThisValueIntoArrBeforeSorting;
      if (eachItem.currencyInNumFormat < changeInput) {
        pushThisValueIntoArrBeforeSorting =
          changeInput / eachItem.currencyInNumFormat;
      }
      changeDivideByEachCurrency.push({
        dividedValue: Math.floor(pushThisValueIntoArrBeforeSorting),
        strFormatOfValue: eachItem.currency,
        currInNumForm: eachItem.currencyInNumFormat,
      });
    });
    */
    var sortedArray = changeDivideByEachCurrency.sort(function sortPlease(
      { dividedValue: a },
      { dividedValue: b }
    ) {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    var {
      dividedValue: lowestValueInSortedArr,
      strFormatOfValue,
      currInNumForm,
      quantitiesInFindAndSortFunc,
    } = sortedArray.shift();

    //need to get the quantities of that match the strFormOfTheCurrency
    // if (strFormatOfValue == objInput.currency) {
    //   otherValueToCompare = objInput.quantities;
    // }
    var otherValueToCompare = quantitiesInFindAndSortFunc;
    var valueOfQuantityToAddToChangeArrAndMultiply = Math.min(
      lowestValueInSortedArr,
      otherValueToCompare
    ); //we want to subtract this value/quantity from the original array which is an array of subarray with ["PENNY", Quantity].
    //use this number to get amount we want to subtract from changeInput.
    var subtractThisFromChange =
      valueOfQuantityToAddToChangeArrAndMultiply * currInNumForm;
    var newCalculatedChange = changeInput - subtractThisFromChange;
    var arrOfCurrInStringFormatAndQuantity = [
      strFormatOfValue,
      subtractThisFromChange,
      valueOfQuantityToAddToChangeArrAndMultiply,
    ];
    return {
      addThisArr: arrOfCurrInStringFormatAndQuantity,
      newChange: Number(newCalculatedChange.toFixed(2)),
    };
  }
}

function updateCID(copiedArrInput, updatedValuesArr) {
  //loop through array. look for stringForm of currency.
  var getStrFormForUpdateCidFunc = updatedValuesArr.reduce(
    function strFormForUpdateFunc(buildingUp, [stringForm]) {
      return buildingUp.concat(stringForm);
    },
    []
  );
  var objFormOfUpdatedValuesArr = updatedValuesArr.reduce(function turnToObj(
    buildingUp,
    [strFormInUpdateCID, valueInUpdateCIDFunc]
  ) {
    return buildingUp.concat({
      strFormInUpdateCID,
      valueInUpdateCIDFunc,
    });
  },
  []);

  console.log(objFormOfUpdatedValuesArr);
  /*** not sure we need this filteredArray ***/
  var filteredArrOfOriginalArray = copiedArrInput.filter(
    function strFormMatched([filterMethodStringForm]) {
      return getStrFormForUpdateCidFunc.includes(filterMethodStringForm);
    }
  );

  console.log(filteredArrOfOriginalArray);
  var cidUpdatedWithCurrentValues = copiedArrInput.reduce(
    function subtractThenUpdate(buildingUp, currentValue) {
      var [reduceStringForm, valueOfOriginalInCid] = currentValue;
      if (getStrFormForUpdateCidFunc.includes(reduceStringForm)) {
        //get the object with the matched strForm
        let {
          valueInUpdateCIDFunc: valueToSubtract,
        } = objFormOfUpdatedValuesArr
          .filter(function findThatObjThatMatchTheStrForm({
            strFormInUpdateCID,
          }) {
            return reduceStringForm == strFormInUpdateCID;
          })
          .pop();
        // console.log(filterOurObjArr);
        // let { valueInUpdateCIDFunc: valueToSubtract } = filterOurObjArr[0];
        let updatedValueToAddToCID = valueOfOriginalInCid - valueToSubtract;
        console.log(updatedValueToAddToCID);
        buildingUp.push([reduceStringForm, updatedValueToAddToCID]);
        return buildingUp;
      } else {
        buildingUp.push(currentValue);
        return buildingUp;
      }
    },
    []
  );

  return cidUpdatedWithCurrentValues;
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
    var totalOfCurrencyInCID = eachSubarray[1];
    var calculatedQuanity = Number(
      (totalOfCurrencyInCID / objInput[currencyString]).toFixed()
    );
    return {
      currency: currencyString,
      totalOfCurrencyInCID,
      currencyInNumFormat: objInput[currencyString],
      quantities: calculatedQuanity,
    };
  });
}

/***
 * checkCashRegister(3.26, 100,
 * [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60],
 * ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}
 *
 * ***/

/*** get the stringFormOfOurCurrency 
 
 works!
var getStrForm = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90]];

var strForms = getStrForm.reduce((buildingUp, currentValue) => {
  return buildingUp.concat(currentValue[0]);
}, [])

***/

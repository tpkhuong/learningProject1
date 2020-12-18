/*** 
 * One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.

Write a function which takes a ROT13 encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.
 * ***/

function caesarsCipher(strInput) {
     
}
 
/*** testing our regex ***/


function nonLetters(strInput, numInput) {
    /*** our regex will match punctuation and white spaces
     * nonLetters("S%E^&RR YB#I@R?0!0_9")
     * will return:
     * ["%", "^", "&", " ", "#", "@", "?", "!", "_"]
     * ***/
    var splitStr = strInput.split("");
    //excludes letters and numbers
    // var testRegex = /[^a-z0-9]|\s/gi;
    //excludes only letters
    var testRegex = /[^a-z]|\s/gi;
    var findNonLetters = strInput.match(testRegex);
    var shiftedChars = splitStr.map(function addOrSubstractThirteen(eachValue) {
        if (findNonLetters.includes(eachValue)) {
            return eachValue;
        } else {
            let convertToStr;
            //get charCode
            let getCharCode = eachValue.charCodeAt()
            if (getCharCode >= 65 && getCharCode <= 77) {
                let addThirteen = getCharCode + 13;
                convertToStr = String.fromCharCode(addThirteen);
                return convertToStr;
            }
            if (getCharCode >= 78 && getCharCode <= 90) {
                let substractThirteen = getCharCode - 13;
                convertToStr = String.fromCharCode(substractThirteen);
                return convertToStr
            }
        }
    });
    return shiftedChars.join("");
    /*** 
     * we will loop through our array of string chars. we will check if the char is included in the findNonLetters array.
     * if it is we will not shift the char 13 places
     * ***/
/*** if the code is between 65 and 77 we add 13 
 * if the code is between 78 and 90 we substract 13
 * ***/
    /*** when we use || it will include 78 because it is greater than 65 and it will include 64 because it is less than 77
     * so we want to use &&
     *  ***/
    // if (numInput >= 65 || numInput <= 77) {
    //     console.log(findNonLetters);
    //     console.log(Array.isArray(findNonLetters));
    // }
    if (numInput >= 65 && numInput <= 77) {
        console.log(findNonLetters);
        console.log(Array.isArray(findNonLetters));
    }
    if (numInput >= 78 && numInput <= 90) {
        console.log("we want to substract 13");
        console.log(splitStr);
    }
}
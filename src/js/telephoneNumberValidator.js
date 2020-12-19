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

var regex = /^1/g;
// var regexTwo = /.\d{3}.\d{3}.\d{4}/;
var regexTwo = /\d+|\W/g;
var regexTest = /[\W\s]\d+[\W\s]\d{3}.\d{4}/g;
var regexTestTwo = /^.{4,}\d{3}.\d{4}/g;
var regexTestThree = /[\W\s]{2,}\d{3}.\d{4}/g;
var regexTestFour = /[(\s]\d+[)\s]{1,2}\d{3}.\d{4}/g;


function telephoneCheck(strInput) {
    var startsWithNumberOne = strInput.match(regex);
    var phoneNum = strInput.match(regex);
}
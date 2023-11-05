/** FizzBuzz
 * Ask the candidate to write a function that prints numbers 
 * from 1 to 100. For multiples of 3, print "Fizz" instead 
 * of the number, for multiples of 5, print "Buzz", and
 * for numbers which are multiples of both 3 and 5, print "FizzBuzz".
 * 
 *  @charlesldefreeseiii@gmail.com
 */

// for (let i = 1; i <= 100; i++) {
//     if (i % 3 == 0 && i % 5 == 0) {
//         console.log("FizzBuzz")
//     }
//     else if (i % 3 == 0) {
//         console.log("Fizz")
//     }
//     else if (i % 5 == 0) {
//         console.log("Buzz")
//     }
//     else {
//         console.log(i)
//     }
// }

// example of a closure
function outerFunction() {
    let outerVariable = "I'm an outer variable";

    function innerFunction() {
        console.log(outerVariable);
    }

    return innerFunction;
}

const closureFunction = outerFunction();
console.log(closureFunction())
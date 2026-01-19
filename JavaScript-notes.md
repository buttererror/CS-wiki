### Increment (++) operator:
The ++ operator is overloaded for two types of operands: number and BigInt. It first coerces the operand to a numeric value and tests the type of it. It performs BigInt increment if the operand becomes a BigInt; otherwise, it performs number increment.

If used postfix, with operator after operand (for example, x++), the increment operator increments and returns the value before incrementing.

If used prefix, with operator before operand (for example, ++x), the increment operator increments and returns the value after incrementing.

The increment operator can only be applied on operands that are references (variables and object properties; i.e., valid assignment targets). ++x itself evaluates to a value, not a reference, so you cannot chain multiple increment operators together.
```
let x = 3;
const y = x++;

console.log(`x:${x}, y:${y}`);
// Expected output: "x:4, y:3"

let a = 3;
const b = ++a;

console.log(`a:${a}, b:${b}`);
// Expected output: "a:4, b:4"
```
### BigInt
BigInt values represent integer values which are too high or too low to be represented by the number primitive.

Description

A BigInt value, also sometimes just called a BigInt, is a bigint primitive, created by appending n to the end of an integer literal, or by calling the BigInt() function (without the new operator) and giving it an integer value or string value.
______________________

### Closures 
A **closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives a function access to its outer scope. In JavaScript, closures are created every time a function is created, at function creation time.

Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures

### Pure functions

A pure function is a function that:

Always returns the same output for the same input

Does not change anything outside itself

That’s it. Those two conditions.

#### Side effects

A side effect is anything a function does besides returning a value.

Common side effects:

Modifying a variable outside the function

Writing to a file

Making an HTTP request

Logging to console

Reading the current time

Updating the DOM

Mutating an object passed by reference
___________________________
### Array.prototype.slice()
```
const animals = ["ant", "bison", "camel", "duck", "elephant"];

console.log(animals.slice(2));
// Expected output: Array ["camel", "duck", "elephant"]
```
________________________
### Array.prototype.reduce()
```
const sumWithInitial = array.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
);

console.log(sumWithInitial);
// Expected output: 10
```

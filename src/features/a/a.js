// 1. Write a program to reverse a string without using the reverse() method.
function reverseString(str) {
  let reversed = "";
  for (let char of str) {
    reversed = char + reversed;
  }
  return reversed;
}
console.log(reverseString("ReactJS")); // Output: SJtcaeR
console.log(add(2, 3)); // ✅ 5
function add(a, b) {
  return a + b;
}

// 2. What is a generator function in JavaScript? How does it work?
// A generator function is a special type of function in JavaScript that can pause its execution and resume later. It is defined using the function* syntax.
function* generatorFunction() {
  yield "Hello";
  yield "World";
}
const gen = generatorFunction();
console.log(gen.next().value); // "Hello"
console.log(gen.next().value); // "World"
console.log(gen.next().done);  // true

// 3. Explain closures in JavaScript.
// A closure is a function that retains access to its parent scope, even after the parent function has closed.
function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log(`Outer: ${outerVariable}, Inner: ${innerVariable}`);
  };
}
const closure = outerFunction("React");
closure("JS"); // Output: Outer: React, Inner: JS

// 4. What are higher-order components (HOCs) in React?
// HOCs are functions that take a component and return a new component with additional functionality.
// const withExtraProps = (WrappedComponent) => {
//   return (props) => <WrappedComponent {...props} extra="Extra Props" />;
// };

// 5. Explain the difference between state and props in React.
// Props: Immutable, passed from parent to child, used for communication.
// State: Mutable, managed within the component, used for dynamic data handling.

// 6. What is a Callback function?
// A callback function is a function passed as an argument to another function, to be executed later.

// 7. Explain the spread operator in JavaScript.
// The spread operator (...) is used to expand elements of an array or object.
const arr = [1, 2, 3];
const newArr = [...arr, 4, 5];
console.log(newArr); // [1, 2, 3, 4, 5]

// 8. Difference between a shallow copy and a deep copy?
// Shallow Copy: Only copies the first level of properties.
// Deep Copy: Recursively copies all levels of properties.
 const shallow = [...arr]; //Shallow
 const deep = JSON.parse(JSON.stringify(obj)); //Deep

// 9. What is the Virtual DOM in React?
// The Virtual DOM is a lightweight copy of the real DOM. React uses it to optimize UI updates.

// 10. What are hooks in React? Name some commonly used hooks.
// Hooks are functions that let you use React features in functional components.
// Common Hooks: useState, useEffect, useMemo, useCallback.

// 11. Explain useMemo and React.memo, and describe the differences between them.
// useMemo: Memoizes a value.
// React.memo: Prevents unnecessary re-renders of a component.

// 12. What are the use cases for useCallback and useMemo?
// useCallback: Memoizes a function.
// useMemo: Memoizes a value or result of a calculation.

// 13. Implement a timer functionality with start and stop buttons.
// import React, { useState, useRef } from "react";
// function Timer() {
//   const [time, setTime] = useState(0);
//   const timerRef = useRef(null);

//   const startTimer = () => {
//     if (!timerRef.current) {
//       timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
//     }
//   };

//   const stopTimer = () => {
//     clearInterval(timerRef.current);
//     timerRef.current = null;
//   };

//   return (
//     <div>
//       <h1>Timer: {time}s</h1>
//       <button onClick={startTimer}>Start</button>
//       <button onClick={stopTimer}>Stop</button>
//     </div>
//   );
// }
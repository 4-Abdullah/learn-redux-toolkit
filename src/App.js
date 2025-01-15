import logo from './logo.svg';
import './App.css';
import React from "react";
import {
  decrement,
  increment,
  selectCount,
} from '../features/counter/counterSlice';
import { useSelector, useDispatch } from 'react-redux'

const count = useSelector(selectCount)
const dispatch = useDispatch()
// Dispatch increment action
const incrementerClicked = () => {
  dispatch(increment());
}
// Dispatch decrement action
const decrementerClicked = () => {
  dispatch(decrement());
}


export function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
          <p id='counter'>{count}</p>
        <button id='incrementer' onClick={incrementerClicked}>+</button>
        <button id='decrementer' onClick={decrementerClicked}>-</button>
      </main>
    </div>
  );
}
import {
  decrement,
  increment,
  selectCount,
} from './features/counter/counterSlice';

const Counter = () => {
     // Get the count from the store
  const count = useSelector((state) => state.counter.value);
    // Dispatch increment action
  const incrementerClicked = () => {
    dispatch(increment());
  }
  // Dispatch decrement action
  const decrementerClicked = () => {
    dispatch(decrement());
  }
  
return(
    <>
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
            <main>
               <p id='counter'>{count}</p>
               <button className='button' id='incrementer' onClick={incrementerClicked}>+</button>
               <button className='button' id='decrementer' onClick={decrementerClicked}>-</button>
              <br/>
            </main>
      </>
 )
}
export default Counter;
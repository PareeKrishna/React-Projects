import { useState } from 'react'

import './App.css'

function App() {
  
  const [counter, setCounter] = useState(0);//first value is the variable, second is the function to update the variable 
  //let counter = 15;

  const addValue = () => {
    setCounter(counter + 1);
    //setCounter((prevCounter) => prevCounter + 1);
    //this is another way to update the state using a function
    //if we duplicate setCounter((prevCounter) => prevCounter + 1) 4 times
    //it will increase the counter by 4
    //because react will use the previous state value for each update
    //means it will take the latest value of counter after each update
  }
  const removeValue = () => {
    setCounter(counter - 1);
    //if we duplicate setCounter(counter - 1); it will only decrease by 1 not by 2
    //because react batches the state updates for performance
    //which means it combines multiple state updates 
    // into a single update to avoid unnecessary re-renders
  }
  return (
    <>
      <h1>Create a counter in React {counter}</h1>
      <h2>Counter value: {counter} </h2>
      <button
      onClick={addValue}
      >Add Value</button> {"  "}
      <button
      onClick={removeValue}
      >Remove Value</button>
      <p>footer: {counter} </p>
    </>
  )
}

export default App

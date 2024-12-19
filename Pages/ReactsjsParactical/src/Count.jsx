import  { useState, useEffect } from 'react';

const Example = () => {
  const [count, setCount] = useState(0);

  const getData = () =>{
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log('API Call', json))
  }


  useEffect(() => {
    getData()
  },[]);
  

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
export default Example;

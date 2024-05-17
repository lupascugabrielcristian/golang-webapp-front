import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [data, setData] = useState('Press the button');
  const [error, setError] = useState(null);

  const fetchData = async () =>  {
    const body = {
      firstName: 'cristi',
      lastName: 'dani',
    };

    try {
      const response = await fetch('https://v68vdaivab.execute-api.eu-central-1.amazonaws.com/on_path_robotics_2', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      let postsData = await response.json();
      setData(postsData);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {

    }
  };

  const LambdaButton = () => {
    const testLambdaFc = () => {
      fetchData().then(response => setData(response));
    };

    return <div className='btn' role="button" tabIndex={0} onClick={testLambdaFc}>Test Lambda function</div>
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> On Path Robotics 2
        </p>
      </header>
      <LambdaButton></LambdaButton>
      <p>{data}</p>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { post } from 'aws-amplify/api';


function App() {
  const [data, setData] = useState('Press the button');
  const [error, setError] = useState(null);

  // const fetchData = async () =>  {
  //   const body = {
  //     firstName: 'cristi',
  //     lastName: 'dani',
  //   };

  //   try {
  //     const response = await fetch('https://qkb8myc9t1.execute-api.eu-central-1.amazonaws.com/prod/robots', {
  //       method: 'POST',
  //       headers: {
  //       },
  //       body: JSON.stringify(body),
  //     });
  //     if (!response.ok) {
  //       throw new Error(`HTTP error: Status ${response.status}`);
  //     }
  //     let postsData = await response.json();
  //     setData(postsData);
  //     setError(null);
  //   } catch (err) {
  //     setError(err.message);
  //     setData(null);
  //   } finally {

  //   }
  // };

  async function postRobots() {
      
    try {
      const reqData = {firstName: 'cristi', lastName: 'dani',};
      const restOperation = post({
        apiName: 'ocn-path',
        path: '/robots',
        opetions: {
          body: reqData
        }
      });
      const response = await restOperation.response;
      console.log('PUT call succeded');
      setData(response);
      setError(null);
    } catch (e) {
      console.log(e);
      console.log('PUT call failed');
      setData(null);
      setError('PUT call failed');
    }
  }


  const LambdaButton = () => {
    const testLambdaFc = () => {
      postRobots();
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
      <p className='data'>{data}</p>
    </div>
  );
}

export default App;

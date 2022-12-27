import React, { useEffect, useState } from 'react';
import Map from './components/functions/Map'
import './index.css'
import './App.scss'
import DataContext from './contexts/DataContext';
import {Fridge} from "./types/Types";

/**
 * This App creates an interactive map for users to find local community fridges in Boston and
 * to see their status, communicate through images, and seek out resources.
 * @return {JSX.Element} A Map with ways to interact with it.
 */
function App() {

  const [data, updateData] = useState<Fridge[] | undefined>(undefined);

  let callBackendAPI = async () => {
      // https://fostered-food-backend.fly.dev/
    const response = await fetch('http://localhost:5001/fridge_info');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  useEffect(() => {
      callBackendAPI()
          .then(res => {
            updateData(res.express)
            console.log('Data Updated.');
          })
          .catch(err => console.log(`FAILED FETCH: ${err}`));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
          <DataContext.Provider value={data}>
              <Map updateData={updateData}/>
          </DataContext.Provider>
      </header>
    </div>
  );
}

export default App;

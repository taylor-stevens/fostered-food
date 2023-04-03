import React, { useEffect, useState } from 'react';
import Map from './components/functions/Map'
import './index.css'
import './App.scss'
import DataContext from './contexts/DataContext';
import {Fridge} from "./types/Types";

/**
 * This App creates an interactive map for users to find local community fridges in Boston and
 * to see their status, comsmunicate through images, and seek out resources.
 * ** NPM RUN DEPLOY ***
 * @return {JSX.Element} A Map with ways to interact with it.
 */
function App() {

  const [data, updateData] = useState<Fridge[] | undefined>(undefined);

  let callBackendAPI = async () => {
    const response = await fetch('https://fosteredfood.fly.dev/');
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

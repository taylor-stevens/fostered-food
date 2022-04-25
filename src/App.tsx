import React, { useEffect, useState } from 'react';
import Map from "./components/Map"
import "./index.css"
import "./App.scss"

/**
 * This App creates an interactive map for users to find local community fridges in Boston and
 * to see their status, communicate through images, and seek out resources.
 * @return {JSX.Element} A Map with ways to interact with it.
 */
function App() {

  const [data, updateData] = useState(null);

  let callBackendAPI = async () => {
    const response = await fetch('/fridge_info');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    console.log(body);
    return body;
  };

  useEffect(() => {
    // callBackendAPI()
    //   .then(res => updateData(res.express))
    //   .catch(err => console.log(err));
  })

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Map />
          {/* Fridge Temp: {data} */}
        </div>
      </header>
    </div>
  );
}

export default App;

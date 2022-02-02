import React, { useEffect, useState } from 'react';

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
    callBackendAPI()
      .then(res => updateData(res.express))
      .catch(err => console.log(err));
  })

  return (
    <div className="App">
      <header className="App-header">
        <div>
          Fridge Temp: {data}
        </div>
      </header>
    </div>
  );
}

export default App;

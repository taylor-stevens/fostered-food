import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import {DataProvider} from "./contexts/DataContext";

ReactDOM.render(
  <React.StrictMode>
      <DataProvider>
          <App />
      </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


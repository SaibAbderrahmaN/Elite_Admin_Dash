import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { Provider } from 'react-redux';
import store from './store';

window.store = store;

ReactDOM.render(
  <Provider store={store}> 
  
  <React.StrictMode>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </React.StrictMode>
  </Provider>,

  document.getElementById("root")
);

import React from 'react'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import { store } from "./configureStore/store.ts";
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import {Navbar} from './features/Navbar.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
      <Navbar/>
      <App />
    </Provider>
    </Router>
  </React.StrictMode>,
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

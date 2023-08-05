import ReactDOM from 'react-dom/client'
// import { Provider } from 'react-redux';
// import { Provider } from "react-redux";
import {Provider} from "react-redux"
// import { BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import store from './Home/api';

import "./index.css"
import { StrictMode } from 'react';
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <StrictMode>
    <Provider store={store}>
         <Router>
       
            <App/>
            
          </Router>
    </Provider>
  // </StrictMode>
    
);

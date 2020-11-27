import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import jwtDecode from 'jwt-decode';
import createStore from './store';
import setAuthToken from './setAuthToken';
import {logoutUser ,setCurrentUser} from './actions/authAction';


const store = createStore();

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const curr_time = Date.now()/1000;
  if(decoded.exp < curr_time){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
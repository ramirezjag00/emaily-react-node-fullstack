//npm install i -S materialize in client dir and import it only inside the root js file like index.js. Now, we can use materialize-css class names
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
//Provider is a component that makes the store accessible to every component in the app
//came from react-redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
//import all reducers
import reducers from './reducers';
//for testing purposes for development
import axios from 'axios';
window.axios = axios;

//pass in reducers as the first argument in the store
//pass in reduxThunk as an argument of applyMiddleware
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render( 
	//provider is a react component, that knows how to read changes from our redux store, and everytime the redux store has some new state produced inside of it, the provider will inform all of its children components
	<Provider store={store}><App /></Provider>, 
	document.querySelector('#root')
);
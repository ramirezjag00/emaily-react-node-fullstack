import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => async dispatch => {
//add another proxy in package.json of client for "/api/*"
//whenever the action creator fetchUser is called, it will return a function, redux-thunk will check/use the function and will automatically call it with the dispatch. We then make a request,wait til we get response from the API, once we have the response, only in that point in  time we dispatch our action
//refactored to use async await syntax instead of using function and .then for promises
//we can also refactor this using the value of res variable and put that inside the payload to make everythign shorter
	const res = await axios.get('/api/current_user');
	//we only care about that "data" property from the res output of axios request so we only need to pass the res.data
	dispatch({type: FETCH_USER, payload: res.data});
};

//post action to handle token and show the credits in the header component
export const handleToken = (token) => async dispatch => {
	const res = await axios.post('/api/stripe', token);
	//we assume that we're gonna get back the same user model, dispatch same action type, to update the user model inside of the auth reducer
	dispatch({type: FETCH_USER, payload: res.data});
};

export const submitSurvey = (values, history) => async dispatch => {
	const res = await axios.post('/api/surveys', values);

	history.push('/surveys');
	dispatch({ type: FETCH_USER, payload: res.data});
};

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get('/api/surveys');

	dispatch({type: FETCH_SURVEYS, payload: res.data});
};
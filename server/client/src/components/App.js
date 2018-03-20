import React, { Component } from 'react';
//BrowserRouter is what interacts with a history library and decides what to do based on the URL. basically says, I want browserRouter to look entirely on the URL on deciding what components to show on the screen

//Route, is the real work course of the react router, this is the react component that can render inside in any other react component that we put together inside the react app, the purpose of the route component is to provide the configuration that will say hey, if the url looks like this then i wanna show, this component and if the url looks like that I wanna show that component. it provides the customization or the configuration to react-router

//the SWITCH component takes in a collection of diff routes. and matches the first route then show its component. best practice is to put most specific routes above the "/" route
import { BrowserRouter, Route/*, Switch*/} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
	//Life Cycle Method
	//componentWillMount in the current versions/future will be called multiple times and it has no difference in request speed time with componentDidMount, which is currently preferred than componentWillMount.
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<div className="container">
						{/*<Switch>*/}
							{/*path is an attribute that gets the url and works with the component attribute to show that component*/}
							{/*consider the path exactly exact={true} or exact property*/}
							<Header />
							<Route exact path="/" component={Landing} />
							<Route exact path="/surveys" component={Dashboard} />
							<Route path="/surveys/new" component={SurveyNew} />
						{/*</Switch>*/}
					</div>
				</BrowserRouter>	
			</div>
		);
	}
}

export default connect(null, actions)(App);
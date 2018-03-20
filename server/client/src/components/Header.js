import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
	//helper method that help what to render depending on the authentication for logged in user to show in the Header Component
	renderContent() {
		//this props is produced by the auth reducer
		switch (this.props.auth) {
			//null is making request to backend to get current user
			case null:
				return;
			//false is request done, user *is not* logged in
			case false:
				return (
					<li><a href="/auth/google">Login With Google</a></li>
				);
			//User Model request complete, user is logged in	
			default:
				return [
					// we can use key value of our choice as this is just an identifier since we are using this in an array
					<li key="1"><Payments /></li>,
					<li key="3" style={{ margin: '0 10px' }}>
					{/*go to authReducer, this fetches the action.payload, go to index.js of actions, you will notice that everytime a post has been done, it will get the latest user model, dispatch the same action type and show the updates of the credits here.*/}
						Credits: {this.props.auth.credits}
					</li>,
					<li key="2"><a href="/api/logout">Logout</a></li>
				];
		}
	}

	render() {
		return (
			<nav>
				<div className="nav-wrapper">
			{/*link component from react-router-dom, the purpose is to navigate to a different route rendered by react router*/}
		{/*if logged in, go to /surveys , else, go to root route*/}
				<Link 
					to={this.props.auth ? '/surveys' : '/' }
					className="left brand-logo"
				>
					Emaily
				</Link>
					<ul className="right">
						{this.renderContent() }
					</ul>
				</div>
			</nav>
			);
	}
}

//destructure argument "state" that returns auth: state.auth to {auth} argument that returns {auth}
function mapStateToProps({auth}) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
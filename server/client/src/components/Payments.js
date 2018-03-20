import React, { Component } from 'react';
//npm i -S react-stripe-checkout
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
	render() {
		//debugger to see actual js code generated by the StripeCheckout statement
		return (
			//this is the component of Stripe Checkout, basically the show form which we will call inside the Header Component
			//default is in USD currency, in cents
			//4242 4242 4242 4242 is the cc number for testing
			<StripeCheckout
				name="Emaily"
				description="$5 for 5 email credits"
				//5 dollars 
				amount={500}
				//token is expecting a cb function, which will be called after we successfully received an authorization token from the STRIPE API
				token={token => this.props.handleToken(token)} 
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				{/*this will show a different look than other buttons since we want to have a unique feel on buttons pertaining to money/billing or anything related to draw the users eye*/}
				<button className="btn">
					Add Credits
				</button>
			</StripeCheckout>
		);
	}
}

export default connect(null, actions)(Payments);
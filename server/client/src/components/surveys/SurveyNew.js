//SurveyNew shows the SurveyForm and the SurveyFormReview

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
	//equal to the ff
	// 	constructor(props) {
	// 		super(props);

	// 		this.state = { new : true };
	// 	}
	state = { showFormReview: false };

	renderContent() {
		if ( this.state.showFormReview ) {
			return (
				<SurveyFormReview 
					onCancel={() => this.setState({ showFormReview: false})}
				/>
			);
		}
		//totally okay to not put this in an else statement
		//will return SurveyForm component while state showFormReview is true
		return (
			<SurveyForm
			//callback for setting the state showFormReview to true
				onSurveySubmit={() => this.setState({ showFormReview : true })}
			/>
		);
	}



	render() {
		return(
			<div>
				{this.renderContent()}
			</div>
		);
	}
}

//this will solve issue of values in the form when navigating with SurveyNew cancel and add survey on Dashboard
//if we navigate away from surveynew (survey form and surveyform review) dump all the values
export default reduxForm({
	form: 'surveyForm'
})(SurveyNew);
//SurveyFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

//property list
const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {
	//({name, label}) es6 destructuring for field for field.name and field.label
	const reviewFields = _.map(formFields, ({name, label}) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>
					{formValues[name]}
				</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Please confirm your entries</h5>
			{reviewFields}
			<button 
				className="yellow white-text darken-3 btn-flat" 
				onClick={onCancel}>
				Back
			</button>
			<button 
				onClick={() => submitSurvey(formValues, history)}
				className="green white-text btn-flat right">
				Send Survey<i className="material-icons right">email</i>
			</button>
		</div>
	);
};
// taking our redux state and transforming it to redux props to send down to the component

function mapStateToProps(state) {
		/*check this by console.log(state)*/
		return { formValues: state.form.surveyForm.values };
}

//You can get access to the history object’s properties and the closest <Route>'s match via the withRouter higher-order component. withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
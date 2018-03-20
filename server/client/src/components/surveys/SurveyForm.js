//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
//reduxForm allows us to communicate with redux store
//reduxForm nearly identical with connect of react-redux
//Field is a react component wired up automatically on redux-form
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
	renderFields() {
		return _.map(formFields, ({label, name}) => {
			return <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
		});
	}

	render() {
		/*redux-form covers handleSubmit functionality by providing a respective handler that you pass as a prop - that is, a handleSubmit method for you to pass to onSubmit.

		With that in mind, you can think of the redux-form handleSubmit as a middle layer for your form's submit handler. Simply write your components as you normally would, passing handleSubmit where appropriate

		callback, onSurveySubmit is from SurveyNew.js
		*/

		return(
			<div>
				<form
					
					onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
				>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>			
					<button className="teal btn-flat right white-text" type="submit">
						NEXT
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

const validate = (values) => {
	const errors = {};

	//this will return all invalid emails otherwise, undefined or nothing
	errors.recipients = validateEmails(values.recipients || '');

	//works just like .map function, much better than using multiple if statements
	//if you want a custom error message for each field, customize function noValueError inside FIELDS array of objects and feed noValueError beside destructured name prop and define it on errors[name]
	_.each(formFields, ({name}) => {
		if(!values[name]){
			errors[name] = 'You must provide a value';
		}
	});

	return errors;
}
// destroyOnUnmount if true, by default, reduxform will kill the form that we are working on anytime the form is unmounted or no longer shown on the screen but if false, don't destroy the form, keep the form values
export default reduxForm({
	validate,
	form: 'surveyForm',
	destroyOnUnmount: false
})(SurveyForm);
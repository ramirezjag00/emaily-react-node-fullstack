//surveyField contains logic to render a single label and text input
import React from 'react';
//props.input = {input}
//props event handlers from redux-form
//props label is what we can pass to survey form
//The props under the meta key are metadata about the state of this field that redux-form is tracking for you.
//nested destructuring for error and touched
export default ({ input, label, meta: { error, touched } }) => {
	return (
		<div>
			<label>{label}</label>
			{/*redux form will handle this when we pass this as a value inside the survey form*/}
			{/*spread syntax for the event handler*/}
			<input {...input} style={{marginBottom: '5px'}}/>
			<div className="red-text" style={{marginBottom: '20px'}}>
			{touched && error}
			</div>
		</div>
	);
};

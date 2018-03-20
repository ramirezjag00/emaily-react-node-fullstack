const keys = require('../../config/keys');

//js file that outputs html of survey template
//the purpose of the survey ID is that for us to be able to narrow down what survey the recipient clicked on or participated on
module.exports = survey => {
	return `
		<html>
			<body>
				<div style="text-align: center;">
					<h3>I'd like your input</h3>
					<p>Please answer the following question:</p>
					<p>${survey.body}</p>
					<div>
						<a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
					</div>
					<div>
						<a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
					</div>
				</div>
			</body>
		</html>
	`;
};
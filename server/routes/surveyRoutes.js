const _ = require('lodash');
//to get path/parts of URL
const Path = require('path-parser');
//url is a default, in nodeJS,
//url has helpers that can help parse url
//we only need the URL function, that's why we destructured
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');
module.exports = app => {
	//to pull out surveys from DB of a user
	app.get('/api/surveys', requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id })
		//http://mongoosejs.com/docs/api.html#query_Query-select
		//select specifies which document fields to include or exclude (also known as the query "projection")
		//we don't want the recipients bec. there might be a lot of recipients and it will just give us a large amount of data which we don't want to reflect on the front end.
		.select({ recipients: false});
		//send back the surveys
		res.send(surveys);
	});

	//this is the route where the recipients will go after they clicked on links from the email
	//we can also have a customized route (with a lot of additional codes) for yes or no links so that we can improve our app.
	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for voting!');
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		//object of path assigned to p
		//this is a matcher
		const p = new Path('/api/surveys/:surveyId/:choice');
		//chain function from lodash lib, which is quite advanced is to remove the repetitive syntax/pattern we have in our code and make life easier. by using this, we can stop the use of the temporary variables and pass multiple functions as we can then lastly, call .value function
		_.chain(req.body)
		//event is where the url we care about is located
		//instad of passing "event", we only passed an object of what we care about "({email, url})"
			.map(({email, url}) => {
				//to get the path name (portion of the url) that we care about in the whole url
				//url is from event.url
				//to get a string from the whole path, use test function
				//return an object or null if key.test was not able to extract both the surveyID and the choice 
				const match = p.test(new URL(url).pathname);
				//if there is a match return all the properties we care about
				if(match){
					return {email, surveyId: match.surveyId, choice: match.choice};
				}
			})
			//will return only events objs and no elements are undefined
			//compact is a lodash function that removes all elements that are undefined
			.compact()
			//uniqBy is a lodash function that will go through the list of elements and look at every element, look at email and surveyId properties, and any duplicates will be removed
			.uniqBy('email', 'surveyId')
			//run over every single element in the events array but we only care about ({surveyId, email, choice}) inside "events"
			.each(({surveyId, email, choice}) => {
				//find a survey with these criterias and update it with the next object using mongo operators
				//email = 'a@a.com'
				//choice = 'yes' || 'no'
				Survey.updateOne({
					_id: surveyId,
					recipients: {
						//mongoDB Query $elemMatch
						$elemMatch: {
							email: email, responded: false
						}
					}
				}, {
					//mongo operator to increment the choice property, make it value 1
					$inc: { [ choice ]: 1},
					//$ will find the $elemMatch and change responded to true
					$set: { 'recipients.$.responded': true },
					//when the user clicked on a link date inside the email received
					lastResponded: new Date()
					//exec = execute, to execute the query/update and push to database
				}).exec();
			})
			.value();
		//currently if you press the link in the email sent n times, it will console log n times, so we tell sendgrid that "we're good!"
		res.send({});
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;
		//instance of a survey
		const survey = new Survey({
			 //es6 syntax title:title to title
			 title,
			 subject,
			 body,
			 //recipients will get the recipients email and separate it with comma and we can map each email with the user
			 //es6 syntax
			 // recipients: recipients.split(',').map(email => return {{ email:email }})
			 //Remember that the list of emails is supposed to be separated by commas and spaces.  We split by commas here, but there still might be some trailing or leading spaces on each email.  As such, we should make sure that we cut out any extra white space.
			 recipients: recipients.split(',').map(email => ({ email: email.trim() })), 
			 _user: req.user.id,
			 dateSent: Date.now()
		});

		//Great place to send an email!
		//create an instance of Mailer class and pass in survey model and the surveyTemplate that contains the body of the email
		const mailer = new Mailer(survey, surveyTemplate(survey));
		//error handling / check every time an instance of mailer has been used
		try {
			//from mailer.js file to send the emails using sendgrid
			await mailer.send();
			//save the survey
			await survey.save();
			//subtract 1 credit from user credits
			req.user.credits -= 1;
			//save the new user model
			const user = await req.user.save();
			//send and update new user model
			res.send(user);
		} catch (err) {
			//http status code, unprocessable entity = something wrong with the data you've sent
			res.status(422).send(err);
		}
	});
};
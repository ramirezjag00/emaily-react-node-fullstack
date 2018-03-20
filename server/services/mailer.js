const sendgrid = require('sendgrid');
//getting property of sendgrid object 'mail'
//helps us create the Mailer
const helper = sendgrid.mail;
const keys = require('../config/keys');

//helper.Mail is an object that takes a lot of configuraton and spits out a Mailer. We want to take out the Mailer Class and provide some functions
class Mailer extends helper.Mail {
	constructor({ subject, recipients }, content) {
		super();

		//we use sendgrid function/library to pass in keys of sendgridkey that will return an object for us to use sgApi property
		this.sgApi = sendgrid(keys.sendGridKey);

		//prop for the email from when we send an email
		//prop for the subject of the email (from survey instance)
		//prop for the email body that accepts text/html as 1st argument and the content as 2nd argument (from survey instance)
		//prop for the recipients that has all the email addresses of recipients (from survey instance)
		this.from_email = new helper.Email('no-reply@emaily.com');
		this.subject = subject;
		this.body = new helper.Content('text/html', content);
		this.recipients = this.formatAddresses(recipients);

		//assign the body of the email to a helper function
		this.addContent(this.body);
		//track the click events with a helper function
		this.addClickTracking();
		this.addRecipients();

	}

	//this.recipients is an array of email objects
	formatAddresses(recipients) {
		//since we are using destructuring, we need to have the () outside {email}
		return recipients.map(({email}) => {
			return new helper.Email(email);
		});
	}

	//read sendgrid.com documentation for the click tracking
	addClickTracking() {
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}

	//read sendgrid.com documentation for adding recipients
	//we added a personalize variable and iterate over the this.recipients, and for each recipient, add them to personalize object, after, call this.addPersonalization defined from the mail based class, and add entire personalize object
	addRecipients() {
		const personalize = new helper.Personalization();
		this.recipients.forEach(recipient => {
			personalize.addTo(recipient);
		});
		this.addPersonalization(personalize);
	}

	//make network request to send the emails with async/await syntax since we will be working with promises
	//kindly read, again, sendgrid documentation
	async send() {
		const request = this.sgApi.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON()
		});

		//send request/email to sendgrid
		//API is a function provided by sendgrid
		//lastly, return the response to the send function
		const response = await this.sgApi.API(request);
		return response;
	}
}

module.exports = Mailer;
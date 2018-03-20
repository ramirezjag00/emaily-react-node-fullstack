//this regex populates an error on console
// const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails) => {
	//split each email with comma 
	//trim spaces using map function
	//filter using regex for javascript from http://emailregex.com/ 
	//use test function to keep email/s that will return true from filter function and capture the emails that will return false
	const invalidEmails = emails
	.split(',')
	.map(email => email.trim())
	.filter(email => re.test(email) === false)
	//make sure that the last email should not have a comma

	if(invalidEmails.length) {
		return `These emails are invalid: ${invalidEmails}`;
	}

	return;
};
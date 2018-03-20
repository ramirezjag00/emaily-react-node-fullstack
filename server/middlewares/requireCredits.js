module.exports = (req, res, next) => {
	if(req.user.credits < 1) {
		//http status code 402 is Payment Required but the code is reserved for future use.
		//so we will use 403 or Forbidden instead
		return res.status(403).send({error: 'Not enough credits'});
	}

	next();
};
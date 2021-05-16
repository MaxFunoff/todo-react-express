const validation = (req) => {
	const now = new Date().getTime();
	const provided = new Date(req.body.endDate).getTime();

	if (provided && provided < now) {
		throw new Error('End date must be in the future');
	}

	if (req.body.content && req.body.content.length < 5) {
		throw new Error('Task name length must be greater then 4');
	}
};

module.exports = validation;

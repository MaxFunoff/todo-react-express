const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const validation = require('../utils/validation');

const Task = mongoose.model('Task');
const ObjectId = mongoose.Types.ObjectId;

// Get all documents
router.get('/', (req, res) => {
	const criteria = req.query.byDate === 'asc' ? 'asc' : 'desc';

	// Finds all documents
	// If client passed a search param it will find anything that includes that value
	// criteria by default is descending by date
	Task.find({ content: new RegExp(req.query.search, 'i') })
		.sort({ createdAt: criteria })
		.exec((err, doc) => {
			if (!err) {
				res.status(200).json({ success: true, err: null, data: doc });
			} else {
				console.log(err);

				res.status(500).json({
					success: false,
					err: 'Try again later',
					data: null,
				});
			}
		});
});

// Get document by ID
router.get('/:id', (req, res) => {
	const _id = req.params.id;

	// Check if ID provided is valid mongoDB id
	if (!ObjectId.isValid(_id)) {
		return res
			.status(400)
			.json({ success: false, err: 'id is not valid', data: null });
	}

	// Finds one document by ID
	Task.findById(_id, (err, doc) => {
		if (!err) {
			res.status(200).json({ success: true, err: null, data: doc });
		} else {
			console.log(err);

			res.status(500).json({
				success: false,
				err: 'Try again later',
				data: null,
			});
		}
	});
});

// Post document
router.post('/', (req, res) => {

	// Validation
	try {
		validation(req);
	} catch (error) {
		console.log(error)
		return res.status(400).json({
			success: false,
			err: error.message,
			data: null,
		});
	}


	// Check if body has id to update with or to create a new entry
	if (!req.body._id) {
		insertRecord(req, res);
	} else {
		updateRecord(req, res);
	}
});

// Delete document
router.delete('/:id', (req, res) => {
	const _id = req.params.id;

	// Check if ID provided is valid mongoDB id
	if (!ObjectId.isValid(_id)) {
		return res
			.status(400)
			.json({ success: false, err: 'id is not valid', data: null });
	}

	// Find document with the provided ID and delete it
	Task.findByIdAndDelete(_id, (err, doc) => {
		if (!err) {
			res.status(200).json({ success: true, err: null, data: doc });
		} else {
			console.log('Error while deleting ' + err);

			res.status(500).json({
				success: false,
				err: 'Try again later',
				data: null,
			});
		}
	});
});

// Insert new document
const insertRecord = (req, res) => {
	const task = new Task();
	task.content = req.body.content;
	task.endDate = req.body.endDate;
	task.completed = false;
	task.createdAt = new Date();

	// Saving new document
	task.save((err, doc) => {
		if (!err) {
			res.status(200).json({
				success: true,
				err: null,
				data: doc,
			});
		} else {
			console.error('Error during insert: ' + err);

			res.status(500).json({
				success: false,
				err: 'Try again later',
				data: null,
			});
		}
	});
};

// Update existing document
const updateRecord = (req, res) => {
	Task.findOneAndUpdate(
		{ _id: req.body._id },
		{ $set: req.body },
		{ new: true, useFindAndModify: false },
		(err) => {
			if (!err) {
				res.status(204).json({
					success: true,
					err: null,
					data: null,
				});
			} else {
				console.error('Error during update ', err);

				res.status(500).json({
					success: false,
					err: 'Try again later',
					data: null,
				});
			}
		}
	);
};

module.exports = router;

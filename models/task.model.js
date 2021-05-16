const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: 'This field is required'
  },
  endDate:{
    type: Date,
    required: 'This field is required'
  },
  createdAt: {
    type: Date,
    required: 'This field is required'
  },
  completed:{
    type: Boolean,
    required: 'This field is required'
  }
});

mongoose.model('Task', taskSchema)
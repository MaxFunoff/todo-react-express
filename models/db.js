const mongoose = require('mongoose');

//Mongoose connection
mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
},
err =>{
  if(!err){
    console.log('Connection succeeded');
  }else{
    console.error('Error in connection ' + err);
  }
});

require('./task.model');
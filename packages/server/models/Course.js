var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
  id: String,
  name: String,
  //   course: String,
  courseId: String,
  // courseId:[
  //     {type: mongoose.Schema.Types.ObjectId, ref: 'Student'}
  //   ],
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', CourseSchema);


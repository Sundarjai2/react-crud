var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
  id: String,
  name: String,
  // course: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  rollnumber: String,
  address: String,
  birth_year: { type: Number, min: 1950, max: 2016 },
  gender: String,
  updated_date: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Student', StudentSchema);


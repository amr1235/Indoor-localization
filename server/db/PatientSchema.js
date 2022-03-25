const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
   HeartRate: Number,
   Location: String,
   Date: Date
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
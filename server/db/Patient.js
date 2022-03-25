const Patient = require("./PatientSchema");

async function InserReading(heartRate, location) {
    let currentDate = new Date(Date.now());
    const newPatient = {
        Date: currentDate.toISOString(),
        HeartRate: heartRate,
        Location: location
    };
    Patient.insertMany([newPatient]).then(() => {
        console.log("new Read has been inserted");
    }).catch(console.log);
}

async function GetReadingsBetween(startDateTime, endDateTime) {
    let records = await Patient.find({ Date: { $gte: startDateTime, $lt: endDateTime } });
    return records;
}
module.exports = {
    InserReading,
    GetReadingsBetween
}
const mongoose = require('mongoose');
const schema = mongoose.Schema;

//Create the shema of a student

const studentSchema = new schema({
    nom: String,
    prenom: String,
    matricule: String,
    email: String,
    groupeA: Number
});

//Create the model of the student

const student_permut = mongoose.model('permut', studentSchema);

module.exports = student_permut;
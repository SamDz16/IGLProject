const mongoose = require('mongoose');
const schema = mongoose.Schema;

/**
 * Create the schema of the student for testing 
 * {@link student_permuts}
 */

const studentSchema = new schema({
    nom: String,
    prenom: String,
    matricule: String,
    email: String,
    groupeA: Number,
    groupeV: Number
});

/**
 * Create the model of the student for testing */


const student_test = mongoose.model('test', studentSchema);

/**
 * Module the student schema for testing.
 *
 * @type {const}
 */
module.exports = student_test;
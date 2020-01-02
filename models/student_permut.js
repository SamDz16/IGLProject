const mongoose = require('mongoose');
const schema = mongoose.Schema;

/**
 * Create the schema of the student */
 /**
                            * student  information
                            * @typedef {Object} Student1
                            * @property {String}familyname - Student  familyname
                            * @property {string} name - Student name
                            * @property {string|number} [matricule] - 
                            * @property {String} email - Student's email
                            * @property {number} [groupeA] - Student group 
*/
 

const studentSchema = new schema({
    nom: String,
    prenom: String,
    matricule: String,
    email: String,
    groupeA: Number
});

/**
 * Create the model of the student
 */


const student_permut = mongoose.model('permut', studentSchema);

/**
 * Module the student schema.
 *
 * @type {const}
 */
module.exports = student_permut;
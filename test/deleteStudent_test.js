/** 
 * See {@tutorial test-tutorials}
 * @module delete_student_test */ 



const assert = require('assert');
const Astudent = require('../models/student_test');

//Describe the tests
describe("Delete A Student In The Database", () => {

    var student;

    //Add a new student before making te first test with the name of 'studentName' to the collection for the tests
    beforeEach((done) => {
        student = new Astudent({
            nom: 'studentName',
            prenom: 'studentLastName',
            matricule: '17/000',
            email: 'ex_exemple@esi.dz',
            groupeA: 5,
            groupeV: 1
        })

        student
            .save()
            .then(() => {
                done();
            })
    })

    //Create new test
    it('OK, delets a student in the permutation database with a specific ID', (done) => {

        Astudent.findOneAndDelete({
            _id: student._id
        }).then(function () {
            Astudent.findOne({
                _id: student._id
            }).then(function (result) {
                assert(result === null);
                done();
            })
        })
    })
})
const assert = require('assert');
const Astudent = require('../models/student_test');

//Describe the tests
describe("Find A Student In The Database", () => {

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
    //Create new tests
    it('OK, finds a student in the permutation database with the name of "studentName"', (done) => {

        Astudent.findOne({
            nom: 'studentName'
        }).then(function (result) {
            assert(result.nom === 'studentName');
            done();
        })
    })

    it('OK, finds a student in the permutation database by ID', (done) => {

        Astudent.findOne({
            _id: student._id
        }).then(function (result) {
            assert(result._id.toString() === student._id.toString());
            done();
        })
    })
})
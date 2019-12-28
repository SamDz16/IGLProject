const mongoose = require('mongoose');
const assert = require('assert');
const Astudent = require('../models/student_test');
mongoose.set('useFindAndModify', false);

//Describe the tests
describe("Update A Student In The Database", () => {

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
    it('OK, updates a student in the permutation database', (done) => {

        Astudent.findOneAndUpdate({
            nom: 'studentName'
        }, {
            nom: 'updatedName'
        }).then(function () {
            Astudent.findOne({
                nom: 'updatedName'
            }).then(function (result) {
                assert(result.nom === 'updatedName');
                done();
            });
        });
    });
});
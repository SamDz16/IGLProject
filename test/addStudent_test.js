const assert = require('assert');
const Astudent = require('../models/student_test');

/** 
 * Describe the tests
 */ 

describe("Add New Student To The Database", () => {
    /**
     * @description Create new tests
     */
    it('OK, adds new student to the permutation database', (done) => {
         /**
          * testing the add function of the student to the database 
          *  @example 
          * nom: 'studentName',
          * prenom: 'studentLastName',
          *matricule: '17/000',
          * email: 'ex_exemple@esi.dz',
          * groupeA: 5,
          * groupeV: 1
           
          */
        var student = new Astudent({
            nom: 'studentName',
            prenom: 'studentLastName',
            matricule: '17/000',
            email: 'ex_exemple@esi.dz',
            groupeA: 5,
            groupeV: 1
        });

        student
            .save()
            .then(() => {
                assert(student.isNew === false);
                done();
            })
    })
})
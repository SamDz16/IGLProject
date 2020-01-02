/** 
 * See {@tutorial test-tutorials}
 * @module AddStudentTest */ 

 


const assert = require('assert'); 

const Astudent = require('../models/student_test');
   




describe("Add New Student To The Database", () => {
   
    it('OK, adds new student to the permutation database', (done) => {
    
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

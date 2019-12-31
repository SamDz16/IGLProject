
const mongoose = require('mongoose');
const Astudent = require('../models/student');
const StudentPermut = require('../models/student_permut');
mongoose.set('useFindAndModify', false); 

 /**
 * permuter module
 * @module permuter
 */
/**
 * 
 * first we get the last student added to the database than research for the compatible student with him in our database 
 * if we found a matching result than the permutation is possible 
 *   we delete the student found from our database and permute his group with the student added previously
 *   we add both students after permutation to our permutation collection in database 
 * else 
 * we just insert the student to our request collection in database
 */
var permuter = function () {

    var groupeActuel;
    var groupeVoulu;
    var result1;

    Astudent.find({}).then(function (result) {

        //Get the last student added to the database
        result1 = result[result.length - 1];

        groupeActuel = result1.groupeA
        groupeVoulu = result1.groupeV

        Astudent.findOne({
            groupeA: groupeVoulu,
            groupeV: groupeActuel
        }).then(function (result2) {

            if (result2 != null) {

                // Permutation is possible
                result1.groupeA = groupeVoulu
                result2.groupeA = groupeActuel

                Astudent.findOneAndDelete({
                    matricule: result1.matricule
                }).then(function () {
                    console.log("The student : " + result1.nom + " has been removed successfully");

                    Astudent.findOneAndDelete({
                        matricule: result2.matricule
                    }).then(function () {
                        console.log("The student : " + result2.nom + " has been removed successfully")
                        /**
                            * student 1 information
                            * @typedef {Object} Student1
                            * @property {String}familyname - Student  familyname
                            * @property {string} name - Student name
                            * @property {string|number} [matricule] - 
                            * @property {String} email - Student's email
                            * @property {number} [groupeA] - Student group 
                            */
                        var student1 = new StudentPermut({
                            nom: result1.nom,
                            prenom: result1.prenom,
                            matricule: result1.matricule,
                            email: result1.email,
                            groupeA: result1.groupeA
                        })
                        student1.save().then(function () {
                            console.log("the student : " + result1.nom + " has been added to the permuts collection")
                            /**
                            * student 2 information
                            * @typedef {Object} Student2
                            * @property {String}familyname - Student  familyname
                            * @property {string} name - Student name
                            * @property {string|number} [matricule] - 
                            * @property {String} email - Student's email
                            * @property {number} [groupeA] - Student group 
                             */
                             
                            var student2 = new StudentPermut({
                                nom: result2.nom,
                                prenom: result2.prenom,
                                matricule: result2.matricule,
                                email: result2.email,
                                groupeA: result2.groupeA
                            })
                            student2.save().then(function () {
                                console.log("The student : " + result2.nom + " has been added to the permuts collection")
                            })
                        })
                    })
                })
            } else {
                console.log('There is no student to permut with');
            }
        })
    })
}

module.exports = permuter;
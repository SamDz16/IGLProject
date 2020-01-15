const mongoose = require('mongoose');
const assert = require('assert');
const Astudent = require('../models/student');
const webdriver = require('selenium-webdriver'),
    By = webdriver.By;
const {
    suite
} = require("selenium-webdriver/testing");

//Connecting to the database

suite(function (env) {

    describe("Testing adding a student to the database using SELENIUM", () => {

        before(function (done) {
            mongoose.connect('mongodb://localhost:27017/PERMUTATION', {
                useUnifiedTopology: true,
                useNewUrlParser: true
            });
            mongoose.connection.once('open', () => {
                console.log('Connected to the database');
                done();
            }).on('error', (error) => {
                console.log('Error while connecting to the database : ', error);
            })
        })

        it('Ok, Adds new student to the database', function (done) {

            //var driver = new webdriver.Builder().forBrowser('chrome').build();
            env.builder().build().then(function (driver) {
                driver.get('http://localhost:7000');
                driver.manage().window().maximize();

                driver.findElement(By.id('student-radio')).click().then(function () {

                    //When the student radio button is selected, we click the button ...
                    driver.findElement(By.id('btn-suivant')).click().then(function () {

                        //Retreive all the input in the form ...
                        let nom = driver.findElement(By.name('nom'));
                        nom.sendKeys('testNom');

                        let prenom = driver.findElement(By.name('prenom'));
                        prenom.sendKeys('testPrenom');

                        let matricule = driver.findElement(By.name('matricule'));
                        matricule.sendKeys('17/000');

                        let email = driver.findElement(By.name('email'));
                        email.sendKeys('test_selenium@esi.dz');

                        let grA = driver.findElement(By.name('grA'));
                        grA.sendKeys(1);

                        let grV = driver.findElement(By.name('grV'));
                        grV.sendKeys(9);


                        driver.findElement(By.css('.button1')).click().then(function () {

                            Astudent.findOne({
                                matricule: '17/000'
                            }).then(function (result) {
                                assert(result.nom === 'testNom');
                                driver.quit();
                                //done();
                            })
                        })
                    })
                })
            })
            done();
        })
    })
})
const mongoose = require('mongoose');
const assert = require('assert');
const Astudent = require('../models/student');
const webdriver = require('selenium-webdriver'),
    {
        describe,
        it,
        before,
        after
    } = require('selenium-webdriver/testing'),
    By = webdriver.By,
    until = webdriver.until;

describe("Testing adding a student to the database using SELENIUM", () => {

    beforeEach(function () {
        driver.get('http://localhost:7000');
        driver.manage().window().maximize();
    })

    afterEach(function () {
        // driver.sleep(5000); //Sleep the driver for five (05) seconds
        driver.quit();
    })

    it('Ok, Adds new student to the database', function (done) {

        var driver = new webdriver.Builder().forBrowser('chrome').build();

        // driver.get('http://localhost:7000').then(function () {
        // driver.manage().window().maximize();
        driver.findElement(By.id('student-radio')).click().then(function () {

            //When the student radio button is selected, we click the button ...
            driver.findElement(By.id('btn-suivant')).click().then(function () {

                //Retreive all the input in the form ...
                let nom = driver.findElement(By.name('nom'));
                let prenom = driver.findElement(By.name('prenom'));
                let matricule = driver.findElement(By.name('matricule'));
                let email = driver.findElement(By.name('email'));
                let grA = driver.findElement(By.name('grA'));
                let grV = driver.findElement(By.name('grV'));

                //And then we fill in them all ...
                nom.sendKeys('testNom');
                prenom.sendKeys('testPrenom');
                matricule.sendKeys('17/000');
                email.sendKeys('test_selenium@esi.dz');
                grA.sendKeys(1);
                grV.sendKeys(9);

                driver.findElement(By.css('.button1')).click().then(function () {

                    console.log('The student has been added to the database');

                    mongoose.connect('mongodb://localhost:27017/PERMUTATION', {
                        useUnifiedTopology: true,
                        useNewUrlParser: true
                    });

                    //Testing the connection to the database
                    mongoose.connection.once('open', () => {

                        console.log("Connected to the database");
                        // it('should do something...', function (done) {
                        Astudent.findOne({
                            matricule: '17/000'
                        }).then(function (result) {
                            assert(result.nom === 'testNom');
                            done();
                        })

                    }).on('error', (error) => {
                        console.log('Error while connecting to the database : ', error);
                    })
                })
            })
        })
    })
})
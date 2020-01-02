/** 
 * See {@tutorial test-tutorials}
 * @module Connection_to_database */ 

const mongoose = require('mongoose');


//Connect to the database before any tests
before((done) => {

    //Connect to database
    mongoose.connect('mongodb://localhost:27017/TEST', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    //Testing the connection to the database
    mongoose.connection.once('open', () => {
        console.log("Connected to the database");
        done();
    }).on('error', (error) => {
        console.log('Error while connecting to the database : ', error);
    })
})

//Delete the collection before running each test
beforeEach(function (done) {
    mongoose.connection.collections.tests.drop(function () {
        done();
    })
})
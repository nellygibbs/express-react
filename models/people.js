// Require Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
const peopleSchema = new Schema({
    name: String,
    image: String,
    title: String
});

// Export the model to be accessed in server.js
module.export = mongoose.model('People', peopleSchema);
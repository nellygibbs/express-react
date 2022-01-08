// Require Dependencies
const express = require('express');
const mongoose = require('mongoose');
const People = require('./models/people');
const cors = require('cors');
const morgan = require('morgan');


// Initialize Application
const app = express();

// Configure Settings
require('dotenv').config()

// Connect to and config mongoDB with mongoose
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

// Set up MongoDB Event Listeners
db.on('connected', () => console.log('Connected to MongoDB'));
db.on('err', () => console.log('MongoDB Error: ' + err.message));


// Mount Middleware
app.use(cors()); //prevents cors errors, open access to all origins
app.use(morgan("dev")); //logging
app.use(express.json()); //parse json bodies

//Mount Routes
app.get('/', (req, res) => {
    res.send('hello world');
});

// Index Route
app.get('/people', async (req, res) => {
    try {
        // Send all ppl
        res.json(await People.find({})) // empty object means find all the people
    } catch (error) {
        // or send an error
        res.status(400).json(error)
    }
});

// Create Route
app.post('/people', async (req, res) => {
    try {
        // send all the ppl entered
        res.json(await People.create(req.body))
    } catch (error) {
        // or send an error
        res.status(400).json(error)
    }
});

// Delete Route
app.delete('/people/:id', async (req, res) => {
    try {
        // send all the ppl entered
        res.json(await People.findByIdAndDelete(req.params.id))
    } catch (error) {
        // or send an error
        res.status(400).json(error)
    }
});

// Update Route
app.put('/people/:id', async (req, res) => {
    try {
        res.json(
            await People.findByIdAndUpdate(
                req.params.id, 
                req.body,
                 { new: true}))
    } catch (error) {
        res.status(400).json(error)
    }
});

// Tell App to Listen
const { PORT = 3001 } = process.env

app.listen(PORT, () => console.log(`Express is listening on PORT: ${PORT}`))


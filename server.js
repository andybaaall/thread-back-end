const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 3000;
const config = require('./config.json');

app.listen(port, () => {
    console.clear();
    console.log(`application is running on port ${port}`)
});

mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER_NAME}.mongodb.net/summative3?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`We're connected to MongoDB!`);
});

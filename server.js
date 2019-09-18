const express = require('express');
const app = express();
const mongoose = require('mongoose');
<<<<<<< HEAD
const port = 3000;
const config = require('./config.json');
=======
>>>>>>> 11abf5b34393a2700262d75d2c88491d360af0e2
const cors = require('cors');
const bodyParser = require('body-parser');
//BCRYPT WILL NEED FURTHER SET UP WHEN WE START TO DO USER LOGIN
const bcrypt = require('bcryptjs');
const multer = require('multer');

<<<<<<< HEAD
const User = require('./models/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.listen(port, () => {
    console.clear();
    console.log(`application is running on port ${port}`)
});
=======
const port = 3000;
const config = require('./config.json');

const User = require ('./models/user.js');
const Item = require ('./models/item.js');
const Comment = require ('./models/comment.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
>>>>>>> 11abf5b34393a2700262d75d2c88491d360af0e2

mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER_NAME}.mongodb.net/summative3?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`We're connected to MongoDB!`);
});

app.use(function(req, res, next){
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/', function(req, res){
    res.send('Welcome to our Products API. Use endpoints to filter out the data');
});

<<<<<<< HEAD
app.post('/users',function(req,res){
  User.findOne({ username:req.body.username}, function(err, result){
    if (result) {
        res.send('Sorry, this is already existed');
    } else {
      const hash = bcrypt.hashSync(req.body.password);
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        password: hash
      });
      user.save().then(result => {
        res.send(result)
      }).catch(err => res.send(err))
    }
  })
})

app.get('/getUser', function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username}, function(err, checkUser){
    if (checkUser) {
        if (bcrypt.compareSync(req.body.password,checkUser.password)) {
          console.log('password matched');
          res.send(checkUser)
        } else {
          console.log('password does not matched');
          res.send('Invalid password');
        }
    } else {
      res.send('Invalid user')
    }
  })
})
=======
// ADD NEW ITEM BELOW




// SEE SINGLE ITEM BASED ON ID BELOW




// UPDATE ITEM BASED ON ID BELOW




// DELETE ITEM BASED ON ID BELOW




// ADD COMMENT BELOW




// DELETE COMMENT BELOW




// REGISTER USER BELOW
app.post('/users', function(req, res){
    // check database to see if username already exists
    User.findOne({ username: req.body.username }, function (err, checkUser) {
        if(checkUser){
            res.send('Sorry, that username is already taken');
        } else {
            //this will encrypt the user's password
            const hash = bcrypt.hashSync(req.body.password);
            // Create a user based on the User Model and fill it with the values from the front end
            // Make sure to save your hashed password and not the regular one
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
            // Save the user in the database
            user.save().then(result => {
                // send the result back to the front end.
                res.send(result);
            }).catch(err => res.send(err));
        }
    });
})



// LOGIN USER BELOW






app.listen(port, () => {
    console.clear();
    console.log(`application is running on port ${port}`)
});
>>>>>>> 11abf5b34393a2700262d75d2c88491d360af0e2

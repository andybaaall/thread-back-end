const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 3000;
const config = require('./config.json');
const cors = require('cors');
const bodyParser = require('body-parser');
//BCRYPT WILL NEED FURTHER SET UP WHEN WE START TO DO USER LOGIN
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const multer = require('multer');

const User = require('./models/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors())

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

app.use(function(req, res, next){
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/', function(req, res){
    res.send('Welcome to our Products API. Use endpoints to filter out the data');
});

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

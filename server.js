const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const config = require('./config.json');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const multer = require('multer');

const Schema = mongoose.Schema;
const User = require('./models/users');
const Item = require('./models/items');

// const Story = mongoose.model('Story', storySchema);
// const Person = mongoose.model('Person', personSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER_NAME}.mongodb.net/summative3?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`We're connected to MongoDB!`);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
})

const filterFile = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        req.validationError = 'invalid extension';
        cb(null, false, req.validationError);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: filterFile
});

app.use(function(req, res, next){
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/', function(req, res){
    res.send('Welcome to our API. Use endpoints to filter out the data');
});

// CREATE A NEW USER
//////////////////////
app.post('/users',function(req,res){
  User.findOne({username:req.body.username}, function(err,result){
    if (result) {
      res.send('Invalid user');
    } else {
      const hash = bcrypt.hashSync(req.body.password);
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        password: hash
      });
      user.save().then(result => {
        res.send(result);
      }).catch(err => res.send(err));
    }
  });
});

// CREATE A NEW ITEM
//////////////////////
app.post('/addItem', function(req, res){

    // Item.findOne({item_name:req.body.itemName}, function(err,result){
          // if (result) {
            // res.send('item already exists');
        // } else {
            const item = new Item({
                // _id object -has- to be called _id
                _id:  new mongoose.Types.ObjectId(),
                item_name: req.body.itemName,
                item_description: req.body.itemDescription,
                clothing_type:   req.body.itemType,
                // image_URL: String,
                // you need to get Multer working!
                price: req.body.itemPrice,
                condition: req.body.itemCondition,
                user_id: req.body.userID,
                bought: req.body.itemBought
            });
            item.save().then(result => {
              res.send(result);
            }).catch(err => res.send(err));
        // }
    // });
});

//READ ITEMS
//////////////////////
app.get('/allItems', function(req, res){
    console.log('working');
    Item.find().then(result => {
        res.send(result);
    })
});

//UPDATE Item
//////////////////////
app.post('/addItem/:id', function(req,res){
    const id = req.params.id;
    Item.findById(id, function(err, item){
        if (item['user_id'] == req.body.userID) {
            res.send(item);
        } else {
            res.send('401')
        }
    });
});

app.patch('/editItem/:id', function(req,res){
   const id = req.params.id;
   console.log('working');
   Item.findById(id, function(err,item){
     console.log(id);
      if (item['user_id'] == req.body.userID) {
        const newItem = {
          item_name: req.body.itemName,
          item_description: req.body.itemDescription,
          clothing_type:   req.body.itemType,
          // image_URL: String,
          // you need to get Multer working!
          price: req.body.itemPrice,
          condition: req.body.itemCondition,
          user_id: req.body.userID,
          bought: req.body.itemBought
        }
        Item.updateOne({_id: id}, newItem).then(result =>{
          res.send(result);
        }).catch(err => res.send(err));
      } else {
        res.send('401');
      }
   }).catch(err=> res.send('cannot find Item with that id'));
});


// VALIDATE A USER
//////////////////////
app.post('/getUser', function(req,res){
    User.findOne({username: req.body.username}, function(err, getUser){
        if(getUser){
             if(bcrypt.compareSync(req.body.password, getUser.password)){
                 res.send(getUser);
             } else {
                 console.log('invalid password');
             }
        } else {
            res.send('user does not exist');
        }
    });
});

// Update user details (username, email, password) based on id
////////////////
app.patch('/users/:id', function(req, res){
    const id = req.params.id;
    const hash = bcrypt.hashSync(req.body.password);
    User.findById(id, function(err, user){
        // CHECK THE LINE BELOW: Should 'user.id' be 'user_id'? Is "userId" ok?
        if(user['user.id'] == req.body.userId){
            const newUser = {
                username: req.body.username,
                email: req.body.email,
                password: hash
            };
            User.updateOne({ _id: id}, newUser).then(result => {
                res.send(result);
            }).catch(err => res.send(err));
        } else {
            res.send('401');
        }
    }).catch(err => res.send('Sorry, cannot find user with that id'));
});

app.listen(port, () => {
    console.log(`application is running on port ${port}`);
});

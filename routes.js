const express = require('express');
const router = new express.Router();
const Club = require('./models.js').Club;
const User = require('./models.js').User;
const _ = require('underscore');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.send('Welcome to the PennClubReview API!');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if(err) res.send("Error logging in");
    else if(user){
      bcrypt.compare(req.body.password, user.password, function(err, resp) {
        if(resp === true) res.redirect('/api/user/?id='+ user.id);
        else res.send("Incorrect Password");
      });
    } else res.send("No user with that email, please sign up.")
  });
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/newuser', (req, res) => {
  Club.find({}, (err, clubs) => {
    if(err) console.log("Error finding clubs");
    else {
      bcrypt.hash(req.body.password, 10, (err, hash)=> {
        if(err) console.log("Error hashing", err);
        else {
          newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            clubRank: [],
          });
          newUser.save((err, resp) => {
            if(err) res.send("Error saving user");
            else res.redirect('/api/login')
          });
        }
      });
    }
  });
});

router.get('/user', (req, res) => {
  User.findById(req.query.id)
  .populate('clubRank')
  .exec((err, user) => {
    if (err) res.send("Error getting user");
    else res.json({
      name: user.name,
      email: user.email,
      clubRank: user.clubRank,
    });
  });
});

router.get('/clubs', (req, res) => {
  Club.find({}, (err, clubs) => {
    if(err) res.send("Error finding clubs");
    else res.json(clubs);
  });
});

router.post('/clubs', (req, res) => {
  var newClub = new Club({
    name: req.body.name,
    size: req.body.size,
  });
  newClub.save((err, resp) => {
    if(err) res.send("Error saving club");
    else res.send("Club saved");
  });
});

router.get('/rankings', (req, res) => {
  User.findOne({name: "Jennifer"})
  .populate('clubRank')
  .exec((err, user) => {
    if (err) res.send("Error finding Jennifer");
    else res.json(user.clubRank);
  });
});

router.post('/rankings', (req, res) => {
  User.findOneAndUpdate({name: "Jennifer"}, {clubRank: JSON.parse(req.body.rank)}, (err, user) => {
    if (err) res.send("Error updating ranking");
    else res.send("Ranking updated");
  });
});

router.get('/clubs/ranked', (req, res) => {
  //initalize holding array
  var rankings = [];
  Club.find()
  .exec((err, clubs) => {
    clubs.forEach((club) => {
      rankings.push({club: club, rank: []});
    });
    //populate array w info from users
    User.find()
    .populate('clubRank')
    .exec((err, users) => {
      if (err) res.send("Error getting user");
      else {
        users.forEach((user) => {
          user.clubRank.forEach((club, i) => {
            _.find(rankings, (obj) => obj.club.id === club.id).rank.push(i + 1);
          });
        });
        //map ranking array to average ranking
        rankings = _.map(rankings, (obj) => {
          var sum = _.reduce(obj.rank, (acc, num) => acc + num);
          obj.rank = sum / obj.rank.length;
          return obj;
        });
        //sort average ranking
        rankings = _.sortBy(rankings, 'rank');
        //send json of club and rank
        res.json(rankings);
      }
    });
  });
})


router.post('/', (req, res) => {
  res.send('The request body is: ' + req.body);
});

module.exports = router;

const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// Create a feed query const (qFeed ;) 
const qFeed = require('./db_feed');

// Create a user query 
const qUser = require('./db_user');

// root page
app.get('/', (req, res) => {
  res.send('Hello API!');
  console.log('Request to /');
});


// Get logged in user feeds
app.get('/api/feeds/:uid', (req, res) => {
  //request uid from the path
  res.send(req.params.uid);
  
  // log uid to console for troubleshooting
  console.log(`Request to /api/feeds/${req.params.uid}`);
  
  // call findUserFeeds() to get the users Feeds
  db.findUserFeeds(parseInt(req.params.uid));
});

//Add feed to user 
app.get('/api/addfeed/:uid/:feed/', (req, res) => {
  const uid = req.params.uid;
  const newFeed = req.params.feed;
  console.log(`Adding feed ${newFeed} to userID ${uid}`);
  db.addUserFeed(uid,newFeed);
  console.log(`==== DONE ADDING FEED ====`)
  res.send(req.params.feed);
});

//get user data
app.get('/api/user/:uname', (req, res) => {
  //req.params.uid()
  qUser.getUserData(req.params.uname);
  res.send(req.params.uname);
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


/*
You have been given an express server which has a few endpoints.

Your task is to create a global middleware (app.use) which will rate limit the requests from a user to only 5 request per second
If a user sends more than 5 requests in a single second, the server should block them with a 404.
User will be sending in their user id in the header as 'user-id'
You have been given a numberOfRequestsForUser object to start off with which clears every one second
*/

import express from 'express'

const app = express()
let numberOfRequestsForUser = {};
setInterval(() => {numberOfRequestsForUser = {}}, 1000)


app.use(function isMiddleware(req, res, next) {
  const username = req.headers['user-id'];

  if (numberOfRequestsForUser[username]) {
    numberOfRequestsForUser[username] = numberOfRequestsForUser[username] + 1;

    if (numberOfRequestsForUser[username] > 5) {
      return res.status(429).send('too many requests');
    }
  } else {
    numberOfRequestsForUser[username] = 1;
  }

  next();
});


app.get("/user", function (req, res) {
    // return a json response with name as Bharat
    res.status(200).json({ name: "Bharat" });
});


app.post("/user", function (req, res) {
    // return a json response with message "created dummy user
    res.status(200).json({ msg: "created dummy user" });
});

// Start the server on port 3000
app.listen(3000, ()=> {
    console.log('Listen at http://localhost:3000')
});


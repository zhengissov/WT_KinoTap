/*
* @Author: bobur
* @Date:   2018-02-08 01:32:36
* @Last Modified by:   bobur
* @Last Modified time: 2018-02-10 18:46:07
*/

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// main app
const app = express();

// our Data Base, for simplicity it just json file
const DATA_FILE = path.join(__dirname, 'movie.json');
const DATA_FILE2 = path.join(__dirname, 'tv.json');
const DATA_FILE3 = path.join(__dirname, 'news.json');
const DATA_FILE4 = path.join(__dirname, 'users.json');
const DATA_FILE5 = path.join(__dirname, 'profile.json');
// set port to server
app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// header middleware
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});


// root path
// method: {GET}
app.get('/api', function(req, res){
  res.json({"hello": "REST API"});
});

// List of timers
// method={GET}
app.get('/api/timers', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.get('/api/timers2', (req, res) => {
  fs.readFile(DATA_FILE2, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.get('/api/timers3', (req, res) => {
  fs.readFile(DATA_FILE3, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.get('/api/timers4', (req, res) => {
  fs.readFile(DATA_FILE4, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.get('/api/timers5', (req, res) => {
  fs.readFile(DATA_FILE5, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});


// Create new timer
// method: {POST}
// params: id, title, project

app.post('/api/timers4', (req, res) => {
  fs.readFile(DATA_FILE4, (err, data) => {
    const timers = JSON.parse(data);
    const newTimer = {
      id: req.body.id,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      movieList: req.body.movieList
    };
    timers.push(newTimer);
    fs.writeFile(DATA_FILE4, JSON.stringify(timers, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(timers);
    });
  });
});

// Update timer
// method: {PUT}
// params: id, title, project

app.put('/api/timers5', (req, res) => {
  fs.readFile(DATA_FILE5, (err, data) => {
    const timers = JSON.parse(data);
    timers.forEach((timer) => {
        timer.id = req.body.id;
        timer.email = req.body.email;
        timer.username = req.body.username;
        timer.password = req.body.password;
        timer.movieList = req.body.movieList;
    });
    fs.writeFile(DATA_FILE5, JSON.stringify(timers, null, 4), () => {
      res.json({});
    });
  });
});

// start app in localhost with port
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});

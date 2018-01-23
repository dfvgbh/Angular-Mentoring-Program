const express = require('express');
const router  = express.Router();
const fs      = require('fs');
const path    = require('path');

const USERS_PATH      = path.join(__dirname, '../models/users.json');

router.post('/login', (req, res, next) => {
  fs.readFile(USERS_PATH, (err, data) => {
    if (err) throw err;

    const { login, password } = req.body;
    const users = JSON.parse(data);
    const user = users.find(user => user.login === login && user.password === password);

    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.send({
      username: user.username,
      token: generateToken()
    })
  });
});


router.post('/logout', (req, res, next) => {
  res.sendStatus(200);
});

function generateToken() {
  return `token${new Date().toLocaleString()}`;
}

module.exports = router;

const express = require('express');
const router  = express.Router();

const authors = require('../models/authors.json');

router.get('/', (req, res, next) => {
  res.status(200).send(authors);
});

module.exports = router;

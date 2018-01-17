const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const COURSES_PATH = path.join(__dirname, '../models/courses.json');

/* GET courses listing. */
router.get('/', (req, res, next) => {
  fs.readFile(COURSES_PATH, (err ,data) => {
    if (err) throw err;
    res.send(JSON.parse(data));
  })
});

router.delete('/', (req, res, next) => {
  const id = parseInt(req.query.id, 10);

  if (isNaN(id)) {
    res.sendStatus(404);
    return;
  }

  fs.readFile(COURSES_PATH, (err ,data) => {
    if (err) throw err;

    const courses = JSON.parse(data);
    const filteredCourses = courses.filter(course => course.id !== id);

    if (filteredCourses.length === courses.length) {
      res.sendStatus(404);
      return;
    }

    const resultData = JSON.stringify(filteredCourses, null, 1);

    fs.writeFile(COURSES_PATH, resultData, err => {
      if (err) throw err;
      res.sendStatus(200);
    });
  })
});

module.exports = router;

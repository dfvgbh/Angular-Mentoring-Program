const express = require('express');
const router  = express.Router();
const fs      = require('fs');
const path    = require('path');

const COURSES_PATH      = path.join(__dirname, '../models/courses.json');
const DEFAULT_PAGE_SIZE = 10;

/* GET courses listing. */
router.get('/', (req, res, next) => {
  const params     = req.query;
  const resultData = {};

  fs.readFile(COURSES_PATH, (err, data) => {
    if (err) throw err;

    resultData.content = JSON.parse(data);

    if (params.name !== undefined && params.name !== '') {
      const name = params.name.toLowerCase();

      resultData.content = resultData.content
        .filter(item => item.name.toLowerCase().indexOf(name) !== -1);
    }

    resultData.totalItems = resultData.content.length;

    if (params.page !== undefined) {
      const pageSize = params.pageSize === undefined
        ? DEFAULT_PAGE_SIZE
        : params.pageSize;
      const page = params.page;

      resultData.content = resultData.content
        .slice((page - 1) * pageSize, page * pageSize);
    }

    res.send(resultData);
  });
});

router.get('/:id', (req, res, next) => {
  const id     = +req.params.id;

  fs.readFile(COURSES_PATH, (err, data) => {
    if (err) throw err;
    const courses = JSON.parse(data);
    const result = courses.find(course => course.id === id);

    result === undefined ? res.send({}) : res.send(result);
  });
});

router.put('/:id', (req, res, next) => {
  const id = +req.params.id;
  const body = req.body;

  fs.readFile(COURSES_PATH, (err, data) => {
    if (err) throw err;
    const courses = JSON.parse(data);
    const target = courses.find(course => course.id === id);

    Object.assign(target, body);

    const result = JSON.stringify(courses, null, 1);

    fs.writeFile(COURSES_PATH, result, err => {
      if (err) throw err;
      res.status(200).send({ status: 'OK'});
    });
  });
});

router.delete('/', (req, res, next) => {
  const id = parseInt(req.query.id, 10);

  if (isNaN(id)) {
    res.sendStatus(404);
    return;
  }

  fs.readFile(COURSES_PATH, (err, data) => {
    if (err) throw err;

    const courses         = JSON.parse(data);
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
  });
});

router.post('/', (req, res, next) => {
  const body = req.body;

  fs.readFile(COURSES_PATH, (err, data) => {
    if (err) throw err;
    const courses = JSON.parse(data);
    body.id = courses[courses.length - 1].id + 1;
    courses.push(body);

    const result = JSON.stringify(courses, null, 1);

    fs.writeFile(COURSES_PATH, result, err => {
      if (err) throw err;
      res.status(200).send({ status: 'OK'});
    });
  });
});

module.exports = router;

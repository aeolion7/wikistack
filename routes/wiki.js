const express = require('express');
const addPage = require('../views/addPage');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.redirect('/');
  // res.status(200).send('got to GET');
});

router.get('/add', (req, res, next) => {
  res.status(200).send(addPage());
});

router.post('/', (req, res, next) => {
  // res.status(201).send('got to POST');
  res.json(req.body);
});

module.exports = router;

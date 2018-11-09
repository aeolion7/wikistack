const express = require('express');
// const addPage = require('../views/addPage');
const router = express.Router();
const { Page } = require('../models');
const { addPage } = require('../views');

router.get('/', (req, res, next) => {
  res.redirect('/');
  // res.status(200).send('got to GET');
});

router.get('/add', (req, res, next) => {
  res.status(200).send(addPage());
});

router.post('/', async (req, res, next) => {
  // res.status(201).send('got to POST');
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });

  try {
    await page.save();
    //res.redirect('/');
    res.send(page.slug);
  } catch (error) { next(error) }
});

module.exports = router;

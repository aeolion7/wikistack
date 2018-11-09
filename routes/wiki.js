const express = require('express');
// const addPage = require('../views/addPage');
const router = express.Router();
const { Page } = require('../models');
const { addPage } = require('../views');
const wikipage = require('../views/wikipage');

router.get('/', (req, res, next) => {
  res.redirect('/');
  // res.status(200).send('got to GET');
});

router.get('/add', (req, res, next) => {
  res.status(200).send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const slug = await Page.findOne({
      where: { slug: req.params.slug },
    });
    res.send(wikipage(slug));
  } catch (error) {
    console.error(error.message);
  }
  // res.send(`hit dynamic route at ${req.params.slug}`);
});

router.post('/', async (req, res, next) => {
  // res.status(201).send('got to POST');
  const page = new Page({
    name: req.body.name,
    email: req.body.email,
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
  });

  try {
    await page.save();
    console.log(page);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;

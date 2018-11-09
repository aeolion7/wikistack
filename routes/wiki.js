const express = require('express');
// const addPage = require('../views/addPage');
const router = express.Router();
const { User, Page } = require('../models');
const { addPage, wikiPage, editPage } = require('../views');
const main = require('../views/main');

router.get('/', async (req, res, next) => {
  try {
    const allPages = await Page.findAll();
    res.send(main(allPages));
  } catch (err) {
    console.error(err.message);
  }
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
    const author = await slug.getAuthor();
    res.send(wikiPage(slug, author));
  } catch (error) {
    console.error(error.message);
  }
  // res.send(`hit dynamic route at ${req.params.slug}`);
});

router.get('/:slug/edit', async (req, res, next) =>{
  try {
    const slug = await Page.findOne({
      where: { slug: req.params.slug }
    });
    const author = await slug.getAuthor();
    res.send(editPage(slug, author));
  } catch (error) {
    console.error(error.message);
  }
});

router.post('/', async (req, res, next) => {
  // res.status(201).send('got to POST');
  try {
    const [user, wasCreated] = await User.findOrCreate({
     where: {
       name: req.body.name,
       email: req.body.email
     }
    });
    const page = await Page.create(req.body);
    page.setAuthor(user);
    console.log(page);
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.post('/:slug', async (req, res, next) => {
  try {
    const slug = await Page.findOne({
      where: { slug: req.params.slug }
    });
    slug.update({
      content: req.body.content
    });
    res.redirect(`/wiki/${req.params.slug}`);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;

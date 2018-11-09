const express = require('express');
const router = express.Router();
const { userList, userPages } = require('../views');
const { Page, User } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.send(userList(allUsers));
  } catch (error) {
    console.error(error.message);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const pages = await Page.findAll({
      where: {
        authorId: req.params.userId
      }
    });

    res.send(userPages(user, pages));
  } catch (error) { next(error); }
});

module.exports = router;

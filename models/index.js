// require sequelize and connect it to the currently-running database process
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

// create a schema for page and user models
// to define mappings between a model and a table, use .define()
const Page = db.define('page', {
  title: {
    type: Sequelize.STRING
  },
  slug: { // url-safe version of the page title, for links
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
});

module.exports = { db };

// require sequelize and connect it to the currently-running database process
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

module.exports = {
  db
};

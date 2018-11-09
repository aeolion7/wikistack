const morgan = require('morgan');
const express = require('express');
const path = require('path');
const layout = require('./views/layout');
const { db } = require('./models'); // connect to database

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// test that database is connected
db.authenticate().then(() => {
  console.log('connected to the database');
});

app.get('/', (req, res, next) => {
  res.send(layout(''));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

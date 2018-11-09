const morgan = require('morgan');
const express = require('express');
const path = require('path');
const layout = require('./views/layout');
const models = require('./models'); // connect to database
const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// test that database is connected
models.db.authenticate().then(() => {
  console.log('connected to the database');
});

const init = async () => {
  await models.db.sync();

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
};

init();

app.get('/', (req, res, next) => {
  res.send(layout(''));
});

const morgan = require('morgan');
const express = require('express');
const path = require('path');
const layout = require('./views/layout');
const models = require('./models'); // connect to database
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
const PORT = 3000;

const app = express();

// models.db.sync({ force: true });

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

// test that database is connected
models.db.authenticate().then(() => {
  console.log('connected to the database');
});

const init = async () => {
  try {
    await models.db.sync({ force: true });
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
  }
};

init();

app.get('/', (req, res, next) => {
  res.send(layout(''));
});

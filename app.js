//@ts-nocheck
const express = require('express');
const path = require('path');
const chalk = require('chalk');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');

const app = express();

app.use(
  session({
    secret: 'gr33np4r4d153',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.engine(
  'hbs',
  expressHandlebars({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout',
    extname: 'hbs',
  })
);

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
const contactRoutes = require('./routes/contacts');
const db = require('./util/database');

app.use('/', contactRoutes);
app.use((req, res, next) => {
  console.log(req);
  res.status(404).send('<h1>Page not found</h1>');
});

db.execute('SELECT * FROM contacts')
  .then((result) => {
    console.log('data', result[0]);
    console.log(chalk.blue.bold('##############################'));
    console.log(chalk.red.bold('##############################'));
    console.log(chalk.green.bold('##############################'));
    console.log(chalk.yellow.bold('##############################'));
    db.end();
  })
  .catch((err) => {
    console.log(err);
  });

const port = 5500;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

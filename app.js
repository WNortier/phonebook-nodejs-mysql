//@ts-nocheck
const express = require('express');
const path = require('path');

const flash = require('express-flash')
const session = require('express-session')
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');

const app = express();

app.use(session({
  secret: "gr33np4r4d153",
  resave: false,
  saveUninitialized: true
}));
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
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

const contactRoutes = require('./routes/contacts');

app.use('/', contactRoutes);

app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found</h1>');
});

const port = 5010;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// file: app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const usersRoutes = require('./routes/users.route');
const categoriesRoutes = require('./routes/categories.route');
const articlesRoutes = require('./routes/articles.routes');
const seedRoutes = require('./routes/seed.route');

const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1', articlesRoutes);
app.use('/api/v1', seedRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello world!!!');
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});

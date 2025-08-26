// file: app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth.route');
const taskRoutes = require('./routes/task.route');
const userRoutes = require('./routes/user.route');

const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/user', userRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello world!!!');
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});

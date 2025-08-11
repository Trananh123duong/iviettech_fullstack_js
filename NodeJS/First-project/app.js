const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const productRoutes = require('./routes/product.route')
const brandRoutes = require('./routes/brand.route')
const categoryRoutes = require('./routes/category.route')
const authRoutes = require('./routes/auth.route')
const userRoutes = require('./routes/user.route')

const errorHandler = require('./middleware/errorHandler')

const app = express();

const port = 3000;

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/brands', brandRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/users', userRoutes)

app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('Hello world!!!');
})

app.listen(port, () => {
  console.log(`Web run in port ${port}`)
})
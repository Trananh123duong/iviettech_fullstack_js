const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const port = 3000;

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world!!!');
})

app.get('/products', (req, res) => {
  res.send("Get all products")
})

app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  res.send(`Get product by id: ${productId}`)
})

app.post('/products', (req, res) => {
  res.send(req.body);
})

app.put('/products/:id', (req, res) => {
  const productId = req.params.id;
  res.send(req.body);
})

app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;
  res.send(`Delete product by id: ${productId}`)
})

app.listen(port, () => {
  console.log(`Web run in port ${port}`)
})
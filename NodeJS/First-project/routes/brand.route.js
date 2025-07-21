const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')

let brandList = [
  {
    id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    name: 'Apple',
  },
]

router.get('/', (req, res) => {
  res.status(200).send(brandList)
})

router.get('/:id', (req, res) => {
  const brandId = req.params.id;
  const brand = brandList.find((item) => item.id === brandId)
  if (brand) {
    res.status(200).json(brand)
  } else {
    res.status(404).json({ message: 'Không tìm thấy sản phẩm' })
  }
})

router.post('/', (req, res) => {
  const newBrand = {
    id: uuidv4(),
    ...req.body
  }
  brandList.unshift(newBrand)
  res.status(201).json(newBrand)
})

router.patch('/:id', (req, res) => {
  const brandId = req.params.id;
  const newBrand = {
    id: brandId,
    ...req.body
  }
  const currentIndex = brandList.findIndex((item) => item.id === brandId)
  if (currentIndex !== -1) {
    brandList.splice(currentIndex, 1, newBrand)
    res.status(200).json(newBrand)
  } else {
    res.status(400).json({ message: 'Id không tồn tại' })
  }
})

router.delete('/:id', (req, res) => {
  const brandId = req.params.id;
  const currentIndex = brandList.findIndex((item) => item.id === brandId)
  if (currentIndex !== -1) {
    brandList.splice(currentIndex, 1)
    res.status(200).json({ message: 'Đã xóa sản phẩm' })
  } else {
    res.status(400).json({ message: 'Id không tồn tại' })
  }
})

module.exports = router
const express = require('express')
const uuidv4 = require('uuid/v4');


const validateProduct = require('./products.validate');

let products = require('../../db').products;

const productsRoutes = express.Router()

productsRoutes.get('/', (req, res) => {
  res.json(products);
});

productsRoutes.post('/', validateProduct, (req, res) => {
  const newProduct = { ...req.body, id: uuidv4() };
  products.push(newProduct);
  res.json(newProduct);
})

///products/098as908asd098asd089
productsRoutes.put('/:id', (req, res) => {
  const filterProduct = products.filter(product => product.id === req.params.id)[0];

  const updatedProduct = { ...filterProduct, ...req.body  };

  res.json(updatedProduct);
})

// DESTROY

productsRoutes.delete('/:id', (req, res) => {
  const filterProduct = products.filter(product => product.id === req.params.id)[0];

  const productsWithoutSelected = products.filter(product => product.id !== req.params.id)[0];

  products = productsWithoutSelected;

  res.json(filterProduct);
});


module.exports = productsRoutes;

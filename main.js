const express = require('express');
const path = require('path');
const prodactsList = require('./goodsList');
const validation = require('./middelware/validation');

const server = express();
const PORT = 4300;

server.get('/', validation, (req, res) => {
   res.status(200).json(prodactsList);
});

server.get('/api/filter', validation, (req, res) => {
   const { productName, price } = req.query;
   let responseData = [...prodactsList];

   if (productName) {
      responseData = responseData.filter(product => product.prodactName === productName);
   }

   if (price) {
      responseData = responseData.filter(product => product.price <= price);
   }

   if (responseData.length < 1) {
      responseData = "not found products";
   }

   res.status(200).json(responseData);
});

server.get('/api/:id', validation, (req, res) => {
   const id = req.params.id;
   const responseData = prodactsList.find(product => product.id === id);

   if (responseData) {
      res.status(200).json(responseData);
   } else {
      res.status(404).json({ error: "Product not found" });
   }
});

server.get('*', (req, res) => {
   res.status(404).json({ error: "Wrong URI" });
   
});

server.listen(PORT, () => {
   console.log("Server started on port: " + PORT);
});

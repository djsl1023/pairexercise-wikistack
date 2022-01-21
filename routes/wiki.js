const express = require('express');
const addpage = require('../views/addPage');

const wikiRouter = express.Router();

wikiRouter.get('/', (req, res, next) =>{
  res.send('got to GET /wiki/')
})

wikiRouter.get('/add', (req, res, next) => {
  res.send(addpage());
})

wikiRouter.post('/', (req, res, next) => {
  res.send('got to POST /wiki/')
})


module.exports = {wikiRouter};

const morgan = require('morgan');
const express = require('express');
const layout = require('./views/layout');
const {db} = require('./models');

const app = express();
const port = 3000;

//static
app.use(express.static('public'));
//morgan
app.use(morgan("dev"));
//body parser
app.use(express.urlencoded({ extended: false }));

db.authenticate().then(() =>{
  console.log('connected to the database');
})

app.get('/', (req, res, next) => {
  res.send(layout());
})

const connection = async() => {
  try {
    await db.sync({force:true})
    console.log('db is synced')
    app.listen(port, function(){
      console.log("Connecting")
    })
    
    
  } catch (error) {
    console.log(error)
  }
}


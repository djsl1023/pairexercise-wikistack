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
//Routers
const {wikiRouter} = require('./routes/wiki');
const {userRouter} = require('./routes/users');
//localhost:3000/wiki
app.use('/wiki', wikiRouter);
//localhost:3000/user
app.use('/user', userRouter);

db.authenticate().then(() =>{
  console.log('connected to the database');
})

//Homepage - localhost:3000/
app.get('/', (req, res, next) => {
  res.redirect('/wiki');
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

connection();

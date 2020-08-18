const express = require("express");
const path = require("path");

const { syncAndSeed, models: { Restaurant, Reservation }} = require('./db');


const app = express();

// logging and body-parsing
app.use(express.json());

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

app.get('/api/data', async(req, res, next)=> {
  try {
    const [  reservations, restaurants ] = await Promise.all([
      Reservation.findAll(),
      Restaurant.findAll(),
    ]);
    res.send({ reservations, restaurants });
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/reservations', async(req, res, next)=> {
  try {
    res.send(res.send( await Reservation.create(req.body)));
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/reservations/:id', async(req, res, next)=> {
  try {
    await Reservation.destroy({ where: { id: req.params.id }});
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// handle any errors
app.use(function(err, req, res, next) {
  console.error(err, err.stack);
  res.status(err.status || 500);
  res.send("Something went wrong: " + err.message);
});

// listen on a port
const PORT = process.env.PORT || 3000;

const init = async function() {
  await syncAndSeed()
  app.listen(PORT, function() {
    console.log(`Server is listening on port ${PORT}!`);
  });
}

init();

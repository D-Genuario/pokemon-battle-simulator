const express = require('express');
const app = express();

const mongoose = require('mongoose');
const pokemonController = require('./controllers/pokemonController');

const MONGO_URI = 'mongodb+srv://dgenuario:SzGEgEP30GPHfuya@cluster0.jau5jaa.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: ''
})
    .then(() => console.log('Connected to Mongo DB.'))
    .catch(err => console.log(err));

const port = 3000;

app.use(express.json());

const pokemonRouter = express.Router();
app.use('/pokemon', pokemonRouter)

// Create a pokemon in the database
// http://localhost:3000/pokemon
pokemonRouter.post('/', pokemonController.createPokemon, (req, res) => {
    return res.send(res.locals.newPokemon)
});

// Get a pokemon from the database
// http://localhost:3000/pokemon/"name"
pokemonRouter.get('/:name', pokemonController.getPokemon, (req, res) => {
    return res.send(res.locals.retrievedPokemon)
});

// Change a pokemon name
// http://localhost:3000/pokemon/"name"
pokemonRouter.patch('/:name', pokemonController.updatePokemon, (req, res) => {
    return res.send(res.locals.updatedPokemon)
});

// Delete a pokemon from the database
// http://localhost:3000/pokemon/"name"
pokemonRouter.delete('/:name', pokemonController.deletePokemon, (req, res) => {
    return res.send("Your pokemon died bro")
});

app.get('/stop', (req,res) => {
    console.log('Exiting server');
    process.exit();
})

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('One page at a time please, I can only code so much in three days'));

//  global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

/*
SzGEgEP30GPHfuya

mongodb+srv://dgenuario:<password>@cluster0.jau5jaa.mongodb.net/?retryWrites=true&w=majority

mongodb+srv://dgenuario:SzGEgEP30GPHfuya@cluster0.jau5jaa.mongodb.net/?retryWrites=true&w=majority
*/
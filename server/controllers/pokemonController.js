const Pokemon = require('../models/pokemonModel');

const pokemonController = {};

//Asynchronous put request to the database which returns the new Pokemon document
pokemonController.createPokemon = async (req, res, next) => {
    const newPokemon = await Pokemon.create(req.body)
    console.log('newPokemon ', newPokemon);
    res.locals.newPokemon = newPokemon;
    return next();
};

//Asynchronous get request to the database which returns the all Pokemon documents
pokemonController.getAllPokemon = async (req, res, next) => {
    const allRetrievedPokemon = await Pokemon.find({})
    console.log('allRetrievedPokemon ', allRetrievedPokemon);
    res.locals.allRetrievedPokemon = allRetrievedPokemon;
    return next();
};

//Asynchronous get request to the database which returns a Pokemon document based on name
pokemonController.getPokemon = async (req, res, next) => {
    const retrievedPokemon = await Pokemon.findOne({name: req.params.name})
    console.log('retrievedPokemon ', retrievedPokemon);
    res.locals.retrievedPokemon = retrievedPokemon;
    return next();
};

//Asynchronous patch request to the database which updates and returns a Pokemon document based on name
pokemonController.updatePokemon = async (req, res, next) => {
   const updatedPokemon = await Pokemon.findOneAndUpdate({name: req.params.name}, req.body) 
   console.log('updatedPokemon ', updatedPokemon);
   res.locals.updatedPokemon = updatedPokemon;
   return next();
};

//Asynchronous delete request to the database which deletes a Pokemon document based on name
pokemonController.deletePokemon = async (req, res, next) => {
    const deletedPokemon = await Pokemon.deleteOne({name: req.params.name});
    // console.log('deletedPokemon ', deletedPokemon)
    const { acknowledged , deletedCount } = deletedPokemon;
    if(acknowledged === true && deletedCount === 1){
        return next();
    }
    return next({
        log: 'Express error handler caught error in PokemonController.deletePokemon',
        status: 500,
        message: { err: 'Failed to delete Pokemon' },
      })

};

module.exports = pokemonController;
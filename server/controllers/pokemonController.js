const Pokemon = require('../models/pokemonModel');

const pokemonController = {};

pokemonController.createPokemon = async (req, res, next) => {
    const newPokemon = await Pokemon.create(req.body)
    console.log('newPokemon ', newPokemon);
    res.locals.newPokemon = newPokemon;
    return next();
};

pokemonController.getPokemon = async (req, res, next) => {
    const retrievedPokemon = await Pokemon.findOne({name: req.params.name})
    console.log('retrievedPokemon ', retrievedPokemon);
    res.locals.retrievedPokemon = retrievedPokemon;
    return next();
};

pokemonController.updatePokemon = async (req, res, next) => {
   const updatedPokemon = await Pokemon.findOneAndUpdate({name: req.params.name}, req.body) 
   console.log('updatedPokemon ', updatedPokemon);
   res.locals.updatedPokemon = updatedPokemon;
   return next();
};

pokemonController.deletePokemon = async (req, res, next) => {
    await Pokemon.deleteOne({name: req.params.name});
    console.log('Pokemon successfully deleted');
    return next();
};

module.exports = pokemonController;
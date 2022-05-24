const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
    name: {type: String, required: true},
    attack: {type: Number, required: true},
    hp: {type: Number, required: true},
})

const Pokemon = mongoose.model('pokemon', pokemonSchema);

module.exports = Pokemon;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
    name: {type: String, required: true},
    attack: {type: Number, required: true},
    hp: {type: Number, required: true},
    xp: {type: Number, default: 0},
    imgSrc: {type: String, default: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/132.png'}
})

const Pokemon = mongoose.model('pokemon', pokemonSchema);

module.exports = Pokemon;
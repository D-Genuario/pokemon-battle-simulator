import React, { Component } from "react";
import { render } from "react-dom";
import Pokemon from "./Pokemon.jsx";

class PokemonHolder extends Component{
   constructor(props) {
       super(props);
       this.state = {
           fetchedPokemon: this.props.fetchedPokemon,
           pokemon: []
       }

       console.log('this.props.fetchedPokemon ', this.props.fetchedPokemon)
       this.queryAllPokemon = this.queryAllPokemon.bind(this);
   }

   queryAllPokemon(){
    fetch(`/pokemon/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'Application/JSON'
        }
    })
        .then(response => response.json())
        .then((pokemon) => {
            return this.setState({
                pokemon,
                fetchedPokemon: true
            });
        })
        .catch(err => console.log(`retrieveAllPokemon fetch /pokemon/ ERROR: `, err))
   }

   componentDidMount(){
        this.queryAllPokemon();
   }

   componentDidUpdate(){
    this.queryAllPokemon();
   }

    render(){

        if(!this.state.pokemon) return (
            <div>
                <h2>Loading pokemon, please wait...</h2>
            </div>
        );

        const { pokemon } = this.state;
        
        const pokemonElems = pokemon.map((elem, i) => {
            if(elem.name === 'Poopachu' || elem.name === 'Charishard' || elem.name === 'Jeebus') return;

            return (
                <div class='pokemonCard'>
                    <Pokemon 
                    key={i}
                    name={elem.name}
                    attack={elem.attack}
                    hp={elem.hp}/>
                </div>

            );
        });

        return (
            <div class='flex'>
             <div>Pokemon available for summon...</div>
             {pokemonElems}
            </div>
         )
    }
}

export default PokemonHolder

/*
            data.forEach(elem => {
                console.log('elem name ', elem.name);
                console.log('elem attack ', elem.attack);
                console.log('elem hp ', elem.hp);
                pokemonArray.push(<Pokemon name={elem.name} attack={elem.attack} hp={elem.hp}/>)
            })
    
            console.log('pokemonArray ', pokemonArray)
*/
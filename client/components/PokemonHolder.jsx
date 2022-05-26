import React, { Component } from "react";
import { render } from "react-dom";
import Pokemon from "./Pokemon.jsx";

//Component to model our database for greater visibility into what pokemon can be queried/summoned
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

   //query method bound to this component which gets the current list of pokemon from the database
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

   //Query all pokemon is nested within didMount so that it populates on first render
   componentDidMount(){
        this.queryAllPokemon();
   }

    //Query all pokemon is nested within didUpdate so that it requeries whenever a pokemon is added or dies
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
                    hp={elem.hp}
                    xp={elem.xp}
                    imgSrc={elem.imgSrc}/>
                </div>

            );
        });

        return (
            <div class='gridContainer'>
                 {pokemonElems}
            </div>
         )
    }
}

export default PokemonHolder
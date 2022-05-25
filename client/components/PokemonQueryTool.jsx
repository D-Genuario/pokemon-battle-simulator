import React, { useState, useEffect, useRef} from 'react';
import { render } from 'react-dom';
import Pokemon from './Pokemon.jsx'
import PokemonHolder from './PokemonHolder.jsx';

const PokemonQueryTool = () => {

    //Set up state for the query selector
    const [queryName, setQueryName] = useState('');
    const [queryAttack, setQueryAttack] = useState('');
    const [queryHp, setQueryHp] = useState('');

    //Set up state for the opponent's pokemon
    const [opponentName, setOpponentName] = useState('');
    const [opponentAttack, setOpponentAttack] = useState();
    const [opponentHp, setOpponentHp] = useState();

    //Set up state for the user's pokemon
    const [userName, setUserName] = useState('');
    const [userAttack, setUserAttack] = useState();
    const [userHp, setUserHp] = useState();

    //Set up a piece of state for the Pokemonholder
    const [fetchedPokemon, setFetchedPokemon] = useState(false)

    //Set up all the query methods we want to use
    const createNewPokemon = (pName, pAttack, pHp) => {
        const newPokemon = {
            name: pName,
            attack: pAttack,
            hp: pHp
        }
    
        console.log('newPokemon within createNewPokemon button ', newPokemon)
    
        fetch('/pokemon', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(newPokemon)
        })
            .then(response => response.json())
            .then(data => {
                console.log('data ', data);
            })
            .catch(err => console.log('createNewPokemon fetch /pokemon: ERROR: ', err))
    }
    
    const retrieveSelectedPokemon = (name, target) => {
        fetch(`/pokemon/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/JSON'
            }
        })
            .then(response => response.json())
            .then(data => {
                if(target === 'opponent'){
                    setOpponentName(data.name);
                    setOpponentAttack(data.attack);
                    setOpponentHp(data.hp)
                }
                if(target === 'user'){
                    setUserName(data.name)
                    setUserAttack(data.attack)
                    setUserHp(data.hp)
                }
            })
            .catch(err => console.log(`retrieveCreatedPokemon fetch /pokemon/${name}: ERROR: `, err))
    }
    
    const deleteSelectedPokemon = (name) => {
        fetch(`/pokemon/${name}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'Application/JSON'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('data ', data);
            })
            .catch(err => console.log(`deleteSelectedPokemon fetch /pokemon/${name}: ERROR: `, err))
    }
    
    const beginBattle = () => {
        if(userAttack * Math.random() > opponentAttack * Math.random()){
            console.log('You win! Your opponent will now be terminated...')
            setOpponentName('');
            setOpponentAttack();
            setOpponentHp()
            return
        } 
        if(userAttack * Math.random()< opponentAttack * Math.random()){
            console.log('You lose! Your Pokemon will now be terminated...')
            deleteSelectedPokemon(userName)
            setUserName('')
            setUserAttack()
            setUserHp()
            setFetchedPokemon(false)
            return
        }
        return console.log('Wow what are the odds of that happening!')
    }

    //return the components we want to render
    return (
      <section>
        <div id='opponentContainer' class='container'>
            <h2 id='firstH2'>The Pokemon you are challenging is...</h2>
            <Pokemon name={opponentName} attack={opponentAttack} hp={opponentHp}/>
            <button class='challengeButton' onClick={() => retrieveSelectedPokemon('Poopachu', 'opponent')}>Challenge Poopachu</button>
            <button class='challengeButton' onClick={() => retrieveSelectedPokemon('Charishard', 'opponent')}>Challenge Charishard</button>
            <button class='challengeButton' onClick={() => retrieveSelectedPokemon('Jeebus', 'opponent')}>Challenge Jeebus</button>
        </div>
        <div id='userContainer' class='container'>
            <h2>Your Summoned Pokemon is...</h2>
            <Pokemon name={userName} attack={userAttack} hp={userHp}/>  
            <button  id='beginBattleButton' onClick={beginBattle}>Begin battle</button>
        </div>
        <div id='queryContainer' class='container'>
            <h2>Pokemon Query Tool 9000...</h2>
            <span>Name: </span><input value={queryName} onChange={e => setQueryName(e.target.value)}/>
            <span>Attack: </span><input value={queryAttack} onChange={e => setQueryAttack(e.target.value)}/>
            <span>HP: </span><input value={queryHp} onChange={e => setQueryHp(e.target.value)}/>
            <button class='queryButton' onClick={() => createNewPokemon(queryName, queryAttack, queryHp)}>Create New Pokemon</button>
            <button class='queryButton' onClick={() => retrieveSelectedPokemon(queryName, 'user')}>Summon Pokemon (based on name)</button>
            <button class='queryButton' onClick={() => deleteSelectedPokemon(queryName)}>Release Pokemon (based on name)</button>
        </div>
        <div id='summonContainer' class='gridContainer'>
            <PokemonHolder fetchedPokemon={fetchedPokemon}/>
        </div>
      </section>
    );
  }

  export default PokemonQueryTool;
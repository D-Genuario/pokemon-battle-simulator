import React, { useState, useEffect, useRef} from 'react';
import { render } from 'react-dom';
import Pokemon from './Pokemon.jsx'
import PokemonHolder from './PokemonHolder.jsx';

const PokemonQueryTool = () => {

    //Set up state for the query selector
    const [queryName, setQueryName] = useState('');
    const [queryAttack, setQueryAttack] = useState('');
    const [queryHp, setQueryHp] = useState('');
    const [queryImgSrc, setQueryImgSrc] = useState();

    //Set up state for the opponent's pokemon
    const [opponentName, setOpponentName] = useState('');
    const [opponentAttack, setOpponentAttack] = useState();
    const [opponentHp, setOpponentHp] = useState();
    const [opponentImgSrc, setOpponentImgSrc] = useState();

    //Set up state for the user's pokemon
    const [userName, setUserName] = useState('');
    const [userAttack, setUserAttack] = useState();
    const [userHp, setUserHp] = useState();
    const [userXp, setUserXp] = useState();
    const [userImgSrc, setUserImgSrc] = useState();

    //Set up a piece of state for the Pokemonholder
    const [fetchedPokemon, setFetchedPokemon] = useState(false)



    //Query method to create a new pokemon in the database using the name, attack, and hp input fields in the 'query tool' component
    const createNewPokemon = (pName, pAttack, pHp, pImgSrc) => {
        const newPokemon = {
            name: pName,
            attack: pAttack,
            hp: pHp,
            imgSrc: pImgSrc,
        }
    
        fetch('/pokemon', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(newPokemon)
        })
            .then(response => response.json())
            .then(data => {
                // Once the query resolves, reset the query input boxes 
                setQueryName('');
                setQueryAttack('');
                setQueryHp('');
                setQueryImgSrc('');
                // Set fetched pokemon to false so the Pokemon holder refreshes
                setFetchedPokemon(false);
            })
            .catch(err => console.log('createNewPokemon fetch /pokemon: ERROR: ', err))
    }
    
    //Query method to find an existing pokemon in the database using the name input field in the 'query tool' component
    const retrieveSelectedPokemon = (name, target) => {
        fetch(`/pokemon/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/JSON'
            }
        })
            .then(response => response.json())
            .then(data => {
                //Take the database document and use it to populate the appropriate pokemon component
                if(target === 'opponent'){
                    setOpponentName(data.name);
                    setOpponentAttack(data.attack);
                    setOpponentHp(data.hp);
                    setOpponentImgSrc(data.imgSrc);
                }
                if(target === 'user'){
                    setUserName(data.name);
                    setUserAttack(data.attack);
                    setUserHp(data.hp);
                    setUserXp(data.xp);
                    setUserImgSrc(data.imgSrc);
                }
                // Once the query resolves, reset the query input boxes 
                setQueryName('');
                setQueryAttack('');
                setQueryHp('');
                setQueryImgSrc('');
                // Set fetched pokemon to false so the Pokemon holder refreshes
                setFetchedPokemon(false);
            })
            .catch(err => console.log(`retrieveCreatedPokemon fetch /pokemon/${name}: ERROR: `, err))
    }
    
    //Query method to delete an existing pokemon in the database using the name input field in the 'query tool' component
    const deleteSelectedPokemon = (name) => {
        fetch(`/pokemon/${name}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'Application/JSON'
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log('data ', data);
                // Once the query resolves, reset the query input boxes 
                setQueryName('');
                setQueryAttack('');
                setQueryHp('');
                setQueryImgSrc('');
                // Set fetched pokemon to false so the Pokemon holder refreshes
                setFetchedPokemon(false);
            })
            .catch(err => console.log(`deleteSelectedPokemon fetch /pokemon/${name}: ERROR: `, err))
    }
    
    //Function which compares the attack values of the two pokemon components rendered on the screen to determine a winner
    const beginBattle = () => {
        if(userAttack * Math.random() > opponentAttack * Math.random()){
            console.log('You win! Your opponent will now be terminated...')
            //If the user wins, reset the opponent pokemon component
            setOpponentName('');
            setOpponentAttack();
            setOpponentHp();
            //Give the user 100 xp
            setUserXp(userXp + 100);
            return
        } 
        if(userAttack * Math.random()< opponentAttack * Math.random()){
            console.log('You lose! Your "Pokeymun" will now be terminated...');
            //If the opponent wins, reset the user pokemon component and delete the pokemon from the database
            deleteSelectedPokemon(userName);
            setUserName('');
            setUserAttack();
            setUserHp();
            setUserXp();
            setUserImgSrc();
            // Set fetched pokemon to false so the Pokemon holder refreshes
            setFetchedPokemon(false);
            return
        }
        return console.log('Wow what are the odds of that happening!')
    }

    //return the components we want to render
    return (
      <section>
        <div id='opponentContainer' class='container'>
            <h2 id='firstH2'>The "Pokeymun" you are challenging is...</h2>
            <Pokemon name={opponentName} attack={opponentAttack} hp={opponentHp} imgSrc={opponentImgSrc}/>
            <button class='challengeButton' onClick={() => retrieveSelectedPokemon('Poopachu', 'opponent')}>Challenge Poopachu</button>
            <button class='challengeButton' onClick={() => retrieveSelectedPokemon('Charishard', 'opponent')}>Challenge Charishard</button>
            <button class='challengeButton' onClick={() => retrieveSelectedPokemon('Jeebus', 'opponent')}>Challenge Jeebus</button>
        </div>
        <div id='userContainer' class='container'>
            <h2>Your Summoned "Pokeymun" is...</h2>
            <Pokemon name={userName} attack={userAttack} hp={userHp} xp={userXp} imgSrc={userImgSrc}/>  
            <button  id='beginBattleButton' onClick={beginBattle}>Begin battle</button>
        </div>
        <div id='queryContainer' class='container'>
            <h2>"Pokeymun" Query Tool 9000...</h2>
            <span>Name: </span><input value={queryName} onChange={e => setQueryName(e.target.value)}/>
            <span>Attack: </span><input value={queryAttack} onChange={e => setQueryAttack(e.target.value)}/>
            <span>HP: </span><input value={queryHp} onChange={e => setQueryHp(e.target.value)}/>
            <span>Image Source: </span><input value={queryImgSrc} onChange={e => setQueryImgSrc(e.target.value)}/>
            <button class='queryButton' onClick={() => createNewPokemon(queryName, queryAttack, queryHp, queryImgSrc)}>Create New Pokemon</button>
            <button class='queryButton' onClick={() => retrieveSelectedPokemon(queryName, 'user')}>Summon Pokemon (based on name)</button>
            <button class='queryButton' onClick={() => deleteSelectedPokemon(queryName)}>Release Pokemon (based on name)</button>
        </div>
        <div id='summonContainer' class='container'>
            <h2>"Pokeymun" available for summon...</h2>
            <PokemonHolder fetchedPokemon={fetchedPokemon}/>
        </div>
      </section>
    );
  }

  export default PokemonQueryTool;
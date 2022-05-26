import React, { useState, useEffect} from 'react';
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

    //Set up a piece of state to determine if a battle is ongoing
    const [battleInProgress, setBattleInProgress] = useState(false)

    //UseEffect hook watching user and opponent HP to detect if either pokemon dies
    useEffect(() => {
        if(battleInProgress){
            if(opponentHp <= 0){
                console.log('You win! Your opponent will now be terminated...')
                //If the user wins, reset the opponent pokemon component
                setOpponentName('');
                setOpponentAttack();
                setOpponentHp();
                //Give the user 100 xp
                setUserXp(userXp + 100);
                setOpponentImgSrc('data:image/png;base64,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')
                setBattleInProgress(false);
                return
            }
    
            if(userHp <= 0){
                console.log('You lose! Your "Pokeymun" will now be terminated...');
                //If the opponent wins, reset the user pokemon component and delete the pokemon from the database
                deleteSelectedPokemon(userName);
                setUserName('');
                setUserAttack();
                setUserHp();
                setUserXp();
                setUserImgSrc('data:image/png;base64,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');
                // Set fetched pokemon to false so the Pokemon holder refreshes
                setFetchedPokemon(false);
                setBattleInProgress(false);
                return
            }
            // beginBattle();
        }
    }, [userHp, opponentHp])

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
        setBattleInProgress(true);
        if(userAttack * Math.random() > opponentAttack * Math.random()){
            setOpponentHp(opponentHp - userAttack);
            console.log(`${opponentName} took ${userAttack} damage!`)
            return
        } 
        if(userAttack * Math.random()< opponentAttack * Math.random()){
            setUserHp(userHp - opponentAttack);
            console.log(`${userName} took ${opponentAttack} damage!`)
            return
        }
        return console.log('A tie? Wow what are the odds of that happening!')
    }

    //return the components we want to render
    return (
      <section>
        <div id='opponentContainer' class='container'>
            <h2 id='firstH2'>The "Pokeymun" you are challenging is...</h2>
            <Pokemon name={opponentName} attack={opponentAttack} hp={opponentHp} imgSrc={opponentImgSrc}/>
            <button class='challengeButton' onClick={() => retrieveSelectedPokemon('Pikachoo', 'opponent')}>Challenge Pikachoo</button>
            <button class='challengeButton' onClick={() => retrieveSelectedPokemon('Charishard', 'opponent')}>Challenge Charishard</button>
            <button class='challengeButton' onClick={() => retrieveSelectedPokemon('Jeebus', 'opponent')}>Challenge Jeebus</button>
            <button class='challengeButton' onClick={() => retrieveSelectedPokemon('MALENIA, BLADE OF MIQUELLA', 'opponent')}>Challenge MALENIA, BLADE OF MIQUELLA</button>
        </div>
        <div id='userContainer' class='container'>
            <h2>Your Summoned "Pokeymun" is...</h2>
            <Pokemon name={userName} attack={userAttack} hp={userHp} xp={userXp} imgSrc={userImgSrc}/>  
            <button  id='beginBattleButton' onClick={beginBattle}>Attack opponent</button>
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
import React from 'react';
import PropTypes from 'prop-types';

//Presentational component to render individual pokemon
const Pokemon = (props) => {
    const { name, attack, hp, xp } = props;

    return (
        <div>
            <div>Name: {name} </div>
            <div>Attack: {attack} </div> 
            <div>HP: {hp}</div>
            <div>XP: {xp}</div> 
        </div>
    )
}

Pokemon.propTypes = {
    name: PropTypes.string.isRequired,
    attack: PropTypes.number.isRequired,
    hp: PropTypes.number.isRequired,
    xp: PropTypes.number.isRequired,
}

export default Pokemon;
import React from 'react';
import PropTypes from 'prop-types';

const Pokemon = (props) => {
    const { name, attack, hp } = props;

    return (
        <div>
            <div>Name: {name}</div>
            <div>Attack: {attack}</div>
            <div>HP: {hp}</div>
        </div>
    )
}

Pokemon.propTypes = {
    name: PropTypes.string.isRequired,
    attack: PropTypes.number.isRequired,
    hp: PropTypes.number.isRequired,
}

export default Pokemon;
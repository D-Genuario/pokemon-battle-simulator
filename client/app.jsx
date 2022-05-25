import React, { Component } from 'react';
import { render } from 'react-dom';
import PokemonQueryTool from './components/PokemonQueryTool.jsx';

import './stylesheets/styles.scss';

class App extends Component{

    render(){
        return(
            <main>
                <h1>This is a React App that automatically reloads...extremely slowly</h1>
                <PokemonQueryTool />
            </main>
        )
    }
}

render(<App />, document.querySelector('#root'))
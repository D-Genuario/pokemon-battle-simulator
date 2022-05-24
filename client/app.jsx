import React, { Component } from 'react';
import { render } from 'react-dom';
import Pokemon from './components/Pokemon';

class App extends Component{
    render(){
        return(
            <div>
                <h1>This is a React App that automatically reloads?</h1>
                <div><Pokemon name='Poopachu' attack={69} hp={420}/></div>
            </div>
        )
    }
}

render(<App />, document.querySelector('#root'))
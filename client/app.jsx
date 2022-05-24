import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component{
    render(){
        return(
            <div>
                <h1>This is a React App that automatically reloads? Please reload</h1>
            </div>
        )
    }
}

render(<App />, document.querySelector('#root'))
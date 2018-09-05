import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Main from './page/Main'
import About from './page/About'
import Project from './page/Project'

class App extends Component {
    render() {
        return (

            <Router>
                <div>
                    <Route path="/" exact={true} component={Main}/>
                    <Route path="/about" component={About}/>
                    <Route path="/project" component={Project}/>
                </div>
            </Router>
        );
    }
}

export default App;

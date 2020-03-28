import React from 'react';
import './App.css';
import Wrapper from "./components/Wrapper";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router} from "@reach/router";

function App() {
    return (
        <div>
            <Router>
                <Wrapper path='/'/>
                <Wrapper path='/:wildcard'/>
                <Wrapper path='/:name/:id'/>
            </Router>
        </div>
    );
}

export default App;
import logo from '../logo.svg';
import '../App.css';
import { useState, useEffect } from 'react';
import { sampleApiCall } from './apiCalls';
import React from 'react';

function Home() {

    const [result, setResult] = useState("")

    useEffect(async () => {
        const apiRes = await sampleApiCall();
        console.log(apiRes);
        setResult(apiRes);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React with {result}
                </a>
            </header>
        </div>
    );
}

export default Home;

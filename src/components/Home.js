import logo from '../logo.svg';
import '../App.css';
import { useState, useEffect } from 'react';
import CalorieAxiosMiddleware from '../apicalls/calorieApi';
import React from 'react';
import Profile from './authComponents/Profile';

function Home() {

    const [result, setResult] = useState("")
    const calorieAxios = CalorieAxiosMiddleware();

    useEffect(() => {
        // async function fetchData() {
        //     calorieAxios.get("/").then(response => {
        //         setResult(response.data)
        //     }).catch(error => { return error; });
        // }
        
        // fetchData();
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

                <Profile />

            </header>
        </div>
    );
}

export default Home;

import logo from '../logo.svg';
import '../App.css';
import { useState, useEffect } from 'react';
import useAxiosConfigured from '../apicalls/AxiosConfigured';
import React from 'react';
import Profile from './authComponents/Profile';

function Home() {
    const [result, setResult] = useState("");
    const axiosInstance = useAxiosConfigured();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axiosInstance.get("/api-user");
                console.log("Response:", response);
                setResult(response.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }

        fetchData();
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

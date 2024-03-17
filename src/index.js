import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithHistory from './components/authComponents/Auth0ProviderWrapper';
import { MyProvider } from "./components/userContext"

ReactDOM.render(
  <MyProvider>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </MyProvider>,
  document.getElementById("root")
);
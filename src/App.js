import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home.js"
import ErrorPage from './components/ErrorPages/ErrorPage.js';
import ForbiddenPage from './components/ErrorPages/ForbiddenPage.js';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />
      </Routes>
    </div>
  );
}

export default App;

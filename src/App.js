import logo from "./logo.svg";
import "./App.css";
import Welcome from "./components/Welcome";
import { Route, Routes } from "react-router-dom";
import CountryInfo from "./components/CountryInfo";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/info" element={<CountryInfo />} />
            </Routes>
        </>
    );
}

export default App;

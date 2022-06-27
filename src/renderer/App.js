import { useEffect, useState, useCallback } from "react";
import logo from "../logo.svg";
import "./App.css";

const titleText = {
    0: "Bienvenue !",
    1: "C'est à vous de voir !",
};

const App = () => {
    const [title, setTitle] = useState(0);
    const handleClick = () => {
        window.electron.send("get-new-title", title);
    };

    const handleTitleChange = useCallback((data) => {
        setTitle(data);
    }, []);

    useEffect(() => {
        window.electron.receive("display-new-title", handleTitleChange);
    }, [handleTitleChange]);

    return (
        <div className="App">
            <header className="App-header">
                <img id="logo" src={logo} className="App-logo" alt="logo" />
                <div className="title">
                    <h1>{titleText[title]}</h1>
                    <img
                        src="./potion.svg"
                        className="App-potion"
                        alt="potion"
                    />
                </div>
                <p> Boilerplate officiel pour une application React Electron</p>
                <a
                    title="Site La Manu"
                    className="App-link"
                    href="https://lamanu.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visitez La Manu
                </a>
                <button onClick={handleClick} id="changeTitle">
                    Changer titre
                </button>
            </header>
        </div>
    );
};

export default App;

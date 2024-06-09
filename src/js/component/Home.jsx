import React, { useState, useEffect } from "react";
import Card from './Card'; // Asegúrate de que la ruta sea correcta

const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    const fetchTodos = () => {
        fetch('https://playground.4geeks.com/todo/user/alesanchezr')
            .then(response => response.json())
            .then(data => setTodos(data))
            .catch(error => console.error("Error fetching todos:", error));
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== "") {
            const newTodos = [...todos, { label: inputValue, done: false }];
            setTodos(newTodos);
            updateTodosOnServer(newTodos);
            setInputValue("");
        }
    };

    const deleteTodo = (indexToDelete) => {
        const newTodos = todos.filter((_, index) => index !== indexToDelete);
        setTodos(newTodos);
        updateTodosOnServer(newTodos);
    };

    const resetTodos = () => {
        setTodos([]);
        updateTodosOnServer([]);
    };

    const updateTodosOnServer = (newTodos) => {
        fetch('https://playground.4geeks.com/todo/user/alesanchezr', {
            method: "PUT",
            body: JSON.stringify(newTodos),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => console.log("Updated todos on server:", data))
        .catch(error => console.error("Error updating todos:", error));
    };

    return (
        <div>
            <div className="container">
                <h1 className="text-center mt-5">My todos</h1>
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="input-group">
                            <input
                                type="text"
                                onChange={(e) => setInputValue(e.target.value)}
                                value={inputValue}
                                onKeyPress={handleKeyPress}
                                placeholder="What do you need to do"
                                className="form-control"
                            />
                        </div>
                    </li>
                    {todos.map((item, index) => (
                        <li key={index} className="list-group-item">
                            <div className="input-group">
                                <input
                                    type="text"
                                    value={item.label}
                                    readOnly
                                    className="form-control"
                                />
                                <div className="input-group-append">
                                    <span
                                        className="input-group-text"
                                        onClick={() => deleteTodo(index)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <button className="btn btn-danger mt-3" onClick={resetTodos}>Clear All</button>
            </div>
        </div>
    );
};

export default Home;

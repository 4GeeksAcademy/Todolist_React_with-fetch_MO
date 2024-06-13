import React, { useEffect, useState } from "react";

export const Home = () => {
	const [task, setTask] = useState([]);
	const [tasks, setTasks] = useState("");
	const [user, setUser] = useState("");

	const createUser = async () => {
		await fetch("https://playground.4geeks.com/todo/marolivieri", { method: "POST" })
			.then(resp => {
				if (resp.ok) {
					alert("Usuario creado correctamente");
					getUser();
				}
			});
	};

	const getUser = async () => {
		await fetch("https://playground.4geeks.com/todo/users/marolivieri")
			.then(resp => {
				if (!resp.ok) {
					createUser();
				} else {
					return resp.json();
				}
			})
			.then(user => setUser(user))
			.catch(error => console.error("Error al obtener el usuario:", error));
	};

	useEffect(() => {
		getUser();
	}, []);

	const createTask = async (task) => {
		await fetch("https://playground.4geeks.com/todo/users/marolivieri/todos", {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				"label": task,
				"done": false
			})
		}).then(resp => {
			if (resp.ok) {
				return resp.json();
			}
		}).then(newTask => {
			const userTasks = user.todos;
			const newUser = {
				...user,
				todos: [...userTasks, newTask]
			};
			setUser(newUser);
		});
	};

	const validateTask = (task) => {
		if (!task || !task.trim()) {
			alert("El valor de la tarea no puede ser vacío");
			return;
		}
		createTask(task);
		setTask("");
	};

	const deleteTask = async (task) => {
		const id = task.id;
		await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE"
		}).then(resp => {
			if (resp.ok) {
				const userTasks = user.todos.filter(item => item.id !== task.id);
				const newUser = {
					...user,
					todos: userTasks
				};
				setUser(newUser);
			}
		});
	};

	return (
		<>
			<div className="container">
				<h1 className="text-center mt-5">Lista de Tareas</h1>
				<img src={"imagen"} style={{
					width: "200px",
					position: "absolute",
					top: "30px",
					right: "30px"
				}} />

				<div className="todolist">
					<input
						placeholder="Agregar tarea"
						onChange={(e) => setTask(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && validateTask(task)}
						type="text"
						value={task} />

					<ul>
						{user && user.todos.map((item) => (
							<li key={item.id}>
								{item.label}
								<span onClick={() => deleteTask(item)}>
									<i className="fas fa-trash-alt"></i>
								</span>
							</li>
						))}
					</ul>
				</div>
				<p className="text-center">
					{user && user.todos.length ? (
						<span>Tienes {user.todos.length} tareas pendientes</span>
					) : (
						<span>No hay tareas pendientes</span>
					)}
				</p>
			</div>
		</>
	);
};
export default Home;
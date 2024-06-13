import React, { useState, useEffect } from "react";
import List from "./list.jsx";

const Home = () => {

	const [todoItem, setTodoItem] = useState("");
	const [todoList, setTodoList] = useState([]);

	const [user, setUser] = useState("molivieri");

	/**
	 * Crear usuario
	 */
	function createUser() {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/molivieri',

			
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify([])
			})
			.then(resp => resp.json())
			.then(data => console.log(data))
			.catch(err => console.error(err))
	}

	/**
	 * Consigue los datos del usuario de la api y los almacena en la lista local
	 */
	const getUserList = async () => {
		await fetch('https://assets.breatheco.de/apis/fake/todos/user/moliveiri',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((response) => response.json()) //esta linea convierte la respuesta en un json
			.then((data) => setTodoList(data)) //esta linea guarda la info transformada en un objeto
			.catch((err) => console.error(err)) //el catch te comunica si algo salió mal
	}

	/**
	 * Envia los datos de la lista local a la api
	 * @param {Array} list Lista local de tareas pendientes por hacer, 
	
	 */
	const putUserList = async (list = todoList) => {
		await fetch('https://assets.breatheco.de/apis/fake/todos/user/moliveiri',
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(list)
			})
			.then((response) => response.json())
			// .then((data)=>console.log(data))
			.catch(err => console.error(err))
	}

	/**
	 * Inserta un nuevo item en el array, ademas de limpiar el input y enviar los datos
	 * @param {React.KeyboardEvent} e Evento de teclado del input
	 */
	const handlerNewItem = (e) => {
		if (e.key === "Enter" && e.target.value !== '') {
			setTodoList([...todoList, { label: todoItem, done: false }]);
			setTodoItem("");
			putUserList();
		}
	}

	/**
	 * Elimina del array el elemento seleccionado y envia el array a la api,
	 * si no quedan elementos envia un array vacio
	 * @param {Number} index Indice actual del elemento
	 */
	const handleRemoveItem = (index) => {
		setTodoList(todoList.filter(( i) => i !== index));

		todoList.length > 0
			? putUserList()
			: putUserList([]);

	}

	/**
	 * Marca un elemento como completado y lo envia a la api
	 * @param {Number} index Indice actual del elemento
	 */
	const handleDone = async (index) => {
		todoList[index].done = !todoList[index].done;

		await putUserList()
		await getUserList()
	}

	/**
	 * Comprobará si la lista de tareas tiene elementos y devolvera su numero
	 * @param {Array} list Lista local de tareas pendientes por hacer, 
	 * por defecto tomará el valor de `todoList`
	 * @returns Longitud actual de list o `0`
	 */
	const leftTasks = (list = todoList) =>
		list?.length > 0
			? list.length - list.filter(item => item.done === true).length
			: 0

	useEffect(() => {
		// createUser() // descomentar para crear el usuario y volver a comentar una vez creado

		getUserList()
	}, [])




	
	return (
		<main className="container my-sm-2 my-lg-5 mx-auto p-lg-5 ">
			<h1 className="text-center fw-bolder text-light">To-do List</h1>
			<div className="container">
				<input
					type="text"
					name="todo"
					id="todo"
					className="fs-3 p-2 w-100 mx-auto border border-light rounded"
					onChange={(e) => setTodoItem(e.target.value)}
					onKeyDown={handlerNewItem}
					value={todoItem}
					placeholder="Add a new todo"
				/>
				<ul className="list-group list-group-flush fs-3">
					<List items={todoList} onDone={handleDone} onRemoveItem={handleRemoveItem}></List>
				</ul>
				<div className={`p-2 mt-1 bg-light rounded${todoList.length > 0 ? " border-top" : ""}`}>
					<small >{`${leftTasks()} item${leftTasks() == 1 ? "" : "s"} left`}</small>
				</div>
			</div>
		</main>
	);
};

export default Home;

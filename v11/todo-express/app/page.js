"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// const obj = {"title": "hej"}
// const str = JSON.stringify(obj)  // "{"title": "hej"}" - Gör om js object till sträng
// const obj2 = JSON.parse(str) // {"title": "hej"} - Gör om sträng till object

const BASE_URL = "ec2-54-217-175-86.eu-west-1.compute.amazonaws.com";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState([]);

  // Hämta todo items från backend
  async function getTodos() {
    const respons = await fetch(`http://${BASE_URL}:4000/todos`, {
      method: "GET",
    });
    const data = await respons.json();

    setTodos(data);
  }

  useEffect(() => {
    getTodos();
  }, []);

  async function addTodo() {
    const newTodo = { id: Date.now(), text: input };

    setInput("");

    await fetch(`http://${BASE_URL}:4000/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });

    setTodos([...todos, newTodo]);
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo"
        />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={addTodo}>
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="border p-2 cursor-pointer hover:bg-gray-100"
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

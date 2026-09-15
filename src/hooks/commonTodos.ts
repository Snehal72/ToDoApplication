import { useState } from "react";
import type { Todo } from "../types/todo";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: "Create Application",
      completed: false,
    },
    {
      id: 2,
      title: "Login Changes",
      completed: true,
    },
  ]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id: number, title: string) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, title } : todo))
    );
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
  };
};

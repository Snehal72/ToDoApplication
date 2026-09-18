import { useEffect, useState } from "react";
import type { Todo } from "../types/todo";
import { getTodos } from "../services/todoService";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = (title: string) => {
    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: Date.now(),
        title,
        completed: false,
      },
    ]);
  };

  const editTodo = (id: number, title: string) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, title } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    );
  };

  const toggleTodo = (id: number) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  return {
    todos,
    isLoading,
    isError,
    addTodo,
    editTodo,
    deleteTodo,
    toggleTodo,
  };
};
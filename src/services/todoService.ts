import type { Todo } from "../types/todo";

const API_URL = "https://dummyjson.com/todos";

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}?limit=10`);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  const data = await response.json();

  return data.todos.map((item: any) => ({
    id: item.id,
    title: item.todo,
    completed: item.completed,
  }));
};
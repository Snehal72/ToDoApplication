import type { Todo } from "../types/todo";

const API_URL = "https://dummyjson.com/todos";

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}?limit=10`);

  if (!response.ok) {
    throw new Error(`Failed to fetch todos: ${response.status}`);
  }

  const data = await response.json();

  return data.todos.map(
    (item: { id: number; todo: string; completed: boolean }) => ({
      id: item.id,
      title: item.todo,
      completed: item.completed,
    })
  );
};

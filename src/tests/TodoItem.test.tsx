import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import TodoItem from "../components/TodoItem";
import type { Todo } from "../types/todo";

describe("TodoItem component", () => {
  const todo: Todo = {
    id: 1,
    title: "Learn React",
    completed: false,
  };

  test("renders todo title and status", () => {
    render(
      <TodoItem
        todo={todo}
        onToggle={jest.fn()}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
      />
    );

    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  test("calls onToggle when Complete is clicked", async () => {
    const user = userEvent.setup();
    const handleToggle = jest.fn();

    render(
      <TodoItem
        todo={todo}
        onToggle={handleToggle}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
      />
    );

    await user.click(screen.getByRole("button", { name: "Complete" }));

    expect(handleToggle).toHaveBeenCalledWith(1);
  });

  test("calls onDelete when Delete is clicked", async () => {
    const user = userEvent.setup();
    const handleDelete = jest.fn();

    render(
      <TodoItem
        todo={todo}
        onToggle={jest.fn()}
        onDelete={handleDelete}
        onEdit={jest.fn()}
      />
    );

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(handleDelete).toHaveBeenCalledWith(1);
  });

  test("calls onEdit when Edit is clicked", async () => {
    const user = userEvent.setup();
    const handleEdit = jest.fn();

    render(
      <TodoItem
        todo={todo}
        onToggle={jest.fn()}
        onDelete={jest.fn()}
        onEdit={handleEdit}
      />
    );

    await user.click(screen.getByRole("button", { name: "Edit" }));

    expect(handleEdit).toHaveBeenCalledWith(todo);
  });
});

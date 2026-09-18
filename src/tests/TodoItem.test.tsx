import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import TodoItem from "../components/TodoItem";
import type { Todo } from "../types/todo";
import { renderWithMantine } from "./testUtils";

describe("TodoItem component", () => {
  const todo: Todo = {
    id: 1,
    title: "Learn React",
    completed: false,
  };

  test("renders todo title and status", () => {
   renderWithMantine(
      <TodoItem
        todo={todo}
        onToggle={jest.fn()}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
      />,
    );

    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

test("calls onToggle when Complete is clicked", () => {
  const handleToggle = jest.fn();

  renderWithMantine(
    <TodoItem
      todo={todo}
      onToggle={handleToggle}
      onDelete={jest.fn()}
      onEdit={jest.fn()}
    />
  );

  fireEvent.click(
    screen.getByRole("button", { name: "Complete" })
  );

  expect(handleToggle).toHaveBeenCalledWith(1);
});

  test("calls onDelete when Delete is clicked", async () => {
  const user = userEvent.setup();
    const handleDelete = jest.fn();

    renderWithMantine(
      <TodoItem
        todo={todo}
        onToggle={jest.fn()}
        onDelete={handleDelete}
        onEdit={jest.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(handleDelete).toHaveBeenCalledWith(1);
  });

 test("calls onEdit when Edit is clicked", () => {
  const handleEdit = jest.fn();

  renderWithMantine(
    <TodoItem
      todo={todo}
      onToggle={jest.fn()}
      onDelete={jest.fn()}
      onEdit={handleEdit}
    />
  );

  fireEvent.click(
    screen.getByRole("button", { name: "Edit" })
  );

  expect(handleEdit).toHaveBeenCalledWith(todo);
});
});

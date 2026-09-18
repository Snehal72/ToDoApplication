import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "../App";
import { useTodos } from "../hooks/commonTodos";
import { MantineProvider } from "@mantine/core";

jest.mock("../hooks/commonTodos");

const mockUseTodos = useTodos as jest.MockedFunction<typeof useTodos>;

const renderApp = () =>
  render(
    <MantineProvider>
      <App />
    </MantineProvider>,
  );

describe("Todo Application", () => {
  const addTodo = jest.fn();
  const editTodo = jest.fn();
  const deleteTodo = jest.fn();
  const toggleTodo = jest.fn();

  const todos = [
    {
      id: 1,
      title: "Learn React",
      completed: false,
    },
    {
      id: 2,
      title: "Learn Jest",
      completed: true,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseTodos.mockReturnValue({
      todos,
      isLoading: false,
      isError: false,
      addTodo,
      editTodo,
      deleteTodo,
      toggleTodo,
    });
  });

  test("renders todos", () => {
    renderApp();

    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Learn Jest")).toBeInTheDocument();
  });

  test("adds a todo", async () => {
    const user = userEvent.setup();

    renderApp();

    const input = screen.getByRole("textbox", {
      name: "Todo",
    });

    await user.type(input, "Learn TypeScript");

    await user.click(screen.getByRole("button", { name: "Add Todo" }));

    expect(addTodo).toHaveBeenCalledWith("Learn TypeScript");
  });

  test("validates todo title", async () => {
    const user = userEvent.setup();

    renderApp();

    const input = screen.getByRole("textbox", {
      name: "Todo",
    });

    await user.type(input, "ab");

    await user.click(screen.getByRole("button", { name: "Add Todo" }));

    expect(
      screen.getByText("Title must be at least 3 characters"),
    ).toBeInTheDocument();

    expect(addTodo).not.toHaveBeenCalled();
  });

  test("edits a todo", () => {
    renderApp();

    fireEvent.click(screen.getAllByRole("button", { name: "Edit" })[0]);

    expect(
      screen.getByRole("button", { name: "Update Todo" }),
    ).toBeInTheDocument();

    const input = screen.getByRole("textbox");

    fireEvent.change(input, {
      target: {
        value: "Updated Todo",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: "Update Todo" }));

    expect(screen.getByText("Updated Todo")).toBeInTheDocument();
  });

  test("filters active todos", async () => {
    const user = userEvent.setup();

    renderApp();

    await user.click(screen.getByRole("button", { name: "Active" }));

    expect(screen.getByText("Learn React")).toBeInTheDocument();

    expect(screen.queryByText("Learn Jest")).not.toBeInTheDocument();
  });

  test("filters completed todos", async () => {
    const user = userEvent.setup();

    renderApp();

    await user.click(screen.getByRole("button", { name: "Completed" }));

    expect(screen.getByText("Learn Jest")).toBeInTheDocument();

    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
  });

  test("cancel editing", () => {
    renderApp();

    fireEvent.click(screen.getAllByRole("button", { name: "Edit" })[0]);

    expect(
      screen.getByRole("button", { name: "Update Todo" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(
      screen.getByRole("button", { name: "Add Todo" }),
    ).toBeInTheDocument();
  });
});

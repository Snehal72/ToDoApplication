import { useMemo, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { Container, Group, Stack, Text, TextInput, Title } from "@mantine/core";

import Button from "./components/Button";
import TodoItem from "./components/TodoItem";
import type { Todo } from "./types/todo";

import { useTodos } from "./hooks/commonTodos";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Todo title is required")
    .min(3, "Title must be at least 3 characters"),
});

function App() {
  const {
    todos,
    isLoading,
    isError,
    addTodo,
    editTodo,
    deleteTodo,
    toggleTodo,
  } = useTodos();

  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [editingId, setEditingId] = useState<number | null>(null);

  const formik = useFormik({
    initialValues: {
      title: "",
    },

    validationSchema,

    onSubmit: (values) => {
      console.log("Submitted:", values);
    },
  });

  const filteredTodos = useMemo(() => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    }

    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }, [todos, filter]);

  const handleAddTodo = async () => {
    const errors = await formik.validateForm();

    if (Object.keys(errors).length > 0) {
      formik.setTouched({
        title: true,
      });

      return;
    }

    const todoTitle = formik.values.title.trim();

    if (editingId !== null) {
      editTodo(editingId, todoTitle);
      setEditingId(null);
    } else {
      addTodo(todoTitle);
    }

    formik.resetForm();
  };

  if (isLoading) {
    return <Text>Loading todos...</Text>;
  }

  if (isError) {
    return <Text c="red">Failed to load todos</Text>;
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Title order={3}>Todo Application</Title>

        <Group align="flex-start">
          <div style={{ flex: 1 }}>
            <TextInput
              label="Todo"
              placeholder="Enter todo"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.title && formik.errors.title
                  ? formik.errors.title
                  : undefined
              }
            />
          </div>
          <div style={{ paddingTop: 24 }}>
            <Group gap="sm">
              <Button onClick={handleAddTodo} size="sm">
                {editingId !== null ? "Update Todo" : "Add Todo"}
              </Button>
              {editingId !== null && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingId(null);
                    formik.resetForm();
                  }}
                >
                  Cancel
                </Button>
              )}
            </Group>
          </div>
        </Group>

        <Text fw={500}>Todos: {todos.length}</Text>

        <Group>
          <Button
            variant={filter === "all" ? "filled" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>

          <Button
            variant={filter === "active" ? "filled" : "outline"}
            onClick={() => setFilter("active")}
          >
            Active
          </Button>

          <Button
            variant={filter === "completed" ? "filled" : "outline"}
            onClick={() => setFilter("completed")}
          >
            Completed
          </Button>
        </Group>

        <Stack>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={(todo) => {
                setEditingId(todo.id);
                formik.setFieldValue("title", todo.title);
              }}
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}

export default App;

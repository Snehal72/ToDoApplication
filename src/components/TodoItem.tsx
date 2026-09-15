import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import {
  IconCheck,
  IconEdit,
  IconTrash,
  IconRotateClockwise,
} from "@tabler/icons-react";

import type { Todo } from "../types/todo";
import Card from "./Card";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  return (
    <Card>
      <Group justify="space-between">
        <div>
          <Text
            size="sm"
            fw={500}
            td={todo.completed ? "line-through" : undefined}
          >
            {todo.title}
          </Text>

          <Text size="xs" c="dimmed">
            {todo.completed ? "Completed" : "Active"}
          </Text>
        </div>

        <Group gap="xs">
          <Tooltip label="Edit">
            <ActionIcon
              variant="light"
              onClick={() => onEdit(todo)}
              aria-label="Edit"
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label={todo.completed ? "Undo" : "Complete"}>
            <ActionIcon
              variant="light"
              onClick={() => onToggle(todo.id)}
              aria-label={todo.completed ? "Undo" : "Complete"}
            >
              {todo.completed ? (
                <IconRotateClockwise size={16} />
              ) : (
                <IconCheck size={16} />
              )}
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Delete">
            <ActionIcon
              variant="light"
              color="red"
              onClick={() => onDelete(todo.id)}
              aria-label="Delete"
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </Card>
  );
}

export default TodoItem;

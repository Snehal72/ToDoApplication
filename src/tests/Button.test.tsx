import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MantineProvider } from "@mantine/core";
import { renderWithMantine } from "./testUtils";

import Button from "../components/Button";
import userEvent from "@testing-library/user-event";

describe("Button component", () => {
  test("renders Add Todo button", () => {
    render(
      <MantineProvider>
        <Button>Add Todo</Button>
      </MantineProvider>,
    );

    expect(
      screen.getByRole("button", { name: "Add Todo" }),
    ).toBeInTheDocument();
  });

  test("calls onClick when Add Todo is clicked", async () => {
   const user = userEvent.setup();
   
    const handleClick = jest.fn();

    renderWithMantine(<Button onClick={handleClick}>Add Todo</Button>);

    await user.click(screen.getByRole("button", { name: "Add Todo" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

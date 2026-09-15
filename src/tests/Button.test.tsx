import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Button from "../components/Button";

describe("Button component", () => {
  test("renders Add Todo button", () => {
    render(<Button>Add Todo</Button>);

    expect(
      screen.getByRole("button", { name: "Add Todo" })
    ).toBeInTheDocument();
  });

  test("calls onClick when Add Todo is clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Add Todo</Button>);

    await user.click(screen.getByRole("button", { name: "Add Todo" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "../App";

describe("Todo Application", () => {
  test("renders Todo Application heading", () => {
    render(<App />);

    expect(screen.getByText("Todo Application")).toBeInTheDocument();
  });

  test("renders existing todos", () => {
    render(<App />);

    expect(screen.getByText("Create Application")).toBeInTheDocument();

    expect(screen.getByText("Login Changes")).toBeInTheDocument();
  });

  test("renders filter buttons", () => {
    render(<App />);

    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Active" })).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Completed" })
    ).toBeInTheDocument();
  });
});

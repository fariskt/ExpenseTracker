import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders dashboard link", () => {
  render(<App />);

  expect(screen.getByRole("link", { name: /dashboard/i })).toBeInTheDocument();
});

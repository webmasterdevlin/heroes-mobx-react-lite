import { render, screen } from "@testing-library/react";
import HomePage from "../HomePage";

it("should render welcome message", () => {
  render(<HomePage />);

  const title = screen.getByRole("heading", {
    name: "Welcome to Mobx 6 Course 🧑‍🏫 💻",
  });

  expect(title).toBeInTheDocument();
});

import { render, screen } from "test-utils/testing-library-utils";
import HeroesPage from "../HeroesPage";

test("HeroesPage's title is visible", () => {
  render(<HeroesPage />);

  const title = screen.getByRole("heading", { name: "Heroes Page" });

  expect(title).toBeInTheDocument();
});

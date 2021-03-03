import { render, screen } from "test-utils/testing-library-utils";
import HeroesPage from "../HeroesPage";

test.skip("HeroesPage's title is visible", () => {
  render(<HeroesPage />);

  const title = screen.getByRole("heading", { name: "Super HeroesPage" });

  expect(title).toBeInTheDocument();
});

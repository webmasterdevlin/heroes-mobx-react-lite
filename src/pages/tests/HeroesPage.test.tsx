import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "test-utils/testing-library-utils";
import HeroesPage from "../HeroesPage";

describe("Heroes Page", () => {
  it("should render title", () => {
    render(<HeroesPage />);

    const title = screen.getByRole("heading", { name: "Heroes Page" });
    expect(title).toBeInTheDocument();
  });

  it("should render inputs", async () => {
    render(<HeroesPage />);

    const firstName = screen.getByRole("textbox", {
      name: "First Name",
    });
    await waitFor(() => {
      fireEvent.change(firstName, { target: { value: "Gokou" } });
    });
    expect(firstName).toHaveValue("Gokou");
  });

  it("should show exact number of heroes in main content and navigation bar", async () => {
    render(<HeroesPage />);

    await waitFor(() => {
      expect(screen.getAllByRole("card")).toHaveLength(5);
      expect(screen.getByText("Total heroes: 5")).toBeInTheDocument();
    });
  });
});

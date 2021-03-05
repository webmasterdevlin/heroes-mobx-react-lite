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

    const firstName: any = await screen.queryByRole("textbox", {
      name: "First Name",
    });
    await waitFor(() => {
      fireEvent.change(firstName, { target: { value: "Gokou" } });
    });
    expect(firstName.value).toBe("Gokou");
  });

  it("should render heroes", async function () {
    render(<HeroesPage />);

    await waitFor(() => {
      expect(screen.queryAllByRole("button")).toHaveLength(11);
      expect(screen.getByText("Total heroes: 5")).toBeInTheDocument();
    });
  });
});

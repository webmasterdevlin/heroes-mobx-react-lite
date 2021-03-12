import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "test-utils/testing-library-utils";
import AntiHeroesPage from "../AntiHeroesPage";

describe("Anti Heroes Page", () => {
  it("should render title", () => {
    render(<AntiHeroesPage />);

    const title = screen.getByRole("heading", { name: "Anti Heroes Page" });
    expect(title).toBeInTheDocument();
  });

  it("should render inputs", async () => {
    render(<AntiHeroesPage />);

    const firstName: any = screen.getByRole("textbox", {
      name: "First Name",
    });
    await waitFor(() => {
      fireEvent.change(firstName, { target: { value: "Devlin" } });
    });
    expect(firstName).toHaveValue("Devlin");
  });

  it("should show exact number of anti heroes in main content and navigation bar", async () => {
    render(<AntiHeroesPage />);

    await waitFor(() => {
      expect(screen.getAllByRole("card")).toHaveLength(6);
      expect(screen.getByText("Total anti-heroes: 6")).toBeInTheDocument();
    });
  });
});

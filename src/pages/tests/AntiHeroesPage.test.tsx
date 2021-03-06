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

    const firstName: any = screen.queryByRole("textbox", {
      name: "First Name",
    });
    await waitFor(() => {
      fireEvent.change(firstName, { target: { value: "Devlin" } });
    });
    expect(firstName).toHaveValue("Devlin");
  });

  it("should render anti heroes", async function () {
    render(<AntiHeroesPage />);

    await waitFor(() => {
      expect(screen.queryAllByRole("card")).toHaveLength(6);
      expect(screen.getByText("Total anti-heroes: 6")).toBeInTheDocument();
    });
  });
});

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

    const firstName: any = await screen.queryByRole("textbox", {
      name: "First Name",
    });
    await waitFor(() => {
      fireEvent.change(firstName, { target: { value: "Devlin" } });
    });
    expect(firstName.value).toBe("Devlin");
  });

  it("should render anti heroes", async function () {
    render(<AntiHeroesPage />);

    await waitFor(() => {
      expect(screen.queryAllByRole("button")).toHaveLength(13);
      expect(screen.getByText("Total anti-heroes: 6")).toBeInTheDocument();
    });
  });
});

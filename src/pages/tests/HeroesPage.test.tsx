import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "test-utils/testing-library-utils";
import HeroesPage from "../HeroesPage";
import userEvent from "@testing-library/user-event";

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
      expect(screen.getAllByRole("card")).toHaveLength(2);
      expect(screen.getByText("Total heroes: 2")).toBeInTheDocument();
    });
  });

  it("should add new anti hero", async () => {
    const { rerender } = render(<HeroesPage />);

    const firstNameTextInput = await screen.findByLabelText("First Name");
    expect(firstNameTextInput).toBeInTheDocument();
    await waitFor(() =>
      fireEvent.change(firstNameTextInput, { target: { value: "Devlin" } })
    );
    expect(firstNameTextInput).toHaveValue("Devlin");

    const lastNameTextInput = await screen.findByLabelText("Last Name");
    expect(lastNameTextInput).toBeInTheDocument();
    await waitFor(() =>
      fireEvent.change(lastNameTextInput, { target: { value: "Duldulao" } })
    );
    expect(lastNameTextInput).toHaveValue("Duldulao");

    const houseTextInput = await screen.findByLabelText("House");
    expect(houseTextInput).toBeInTheDocument();
    await waitFor(() =>
      fireEvent.change(houseTextInput, { target: { value: "Marvel" } })
    );
    expect(houseTextInput).toHaveValue("Marvel");

    const knownAsTextInput = await screen.findByLabelText("Known as");
    expect(knownAsTextInput).toBeInTheDocument();
    await waitFor(() =>
      fireEvent.change(knownAsTextInput, { target: { value: "React Man" } })
    );
    expect(knownAsTextInput).toHaveValue("React Man");

    const createButton = screen.getByRole("button", {
      name: "Create",
    });
    expect(createButton).toBeEnabled();
    await waitFor(() => {
      userEvent.click(createButton);
    });

    rerender(<HeroesPage />);

    const cards = await screen.findAllByRole("card");
    expect(cards).toHaveLength(3);
    expect(screen.getByText("Total heroes: 3")).toBeInTheDocument();
  });
});

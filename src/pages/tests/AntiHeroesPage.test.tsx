import { render, screen, waitFor } from "test-utils/testing-library-utils";
import AntiHeroesPage from "pages/AntiHeroesPage";
import userEvent from "@testing-library/user-event";

describe("Anti Heroes Page", () => {
  it("should render title", () => {
    render(<AntiHeroesPage />);

    const title = screen.getByRole("heading", { name: "Anti-Heroes Page" });
    expect(title).toBeInTheDocument();
  });

  it("should render loading message", async () => {
    render(<AntiHeroesPage />);

    const loading = screen.getByRole("heading", {
      name: "Loading.. Please wait..",
    });
    expect(loading).toHaveTextContent("Loading.. Please wait..");
  });

  it("should save character button be in disabled", () => {
    render(<AntiHeroesPage />);

    const saveCharacterButton = screen.getByRole("button", {
      name: "Save Character",
    });
    expect(saveCharacterButton).toBeDisabled();
  });

  it("should show exact number of anti heroes in main content and navigation bar", async () => {
    render(<AntiHeroesPage />);

    const cards = await screen.findAllByRole("card");
    expect(cards).toHaveLength(2);
    const counter = screen.getByRole("total-anti-heroes");
    expect(counter).toHaveTextContent("2");
  });

  it("should add new anti hero", async () => {
    const { rerender } = render(<AntiHeroesPage />);

    const firstNameTextInput = await screen.findByLabelText("First Name");
    expect(firstNameTextInput).toBeInTheDocument();
    userEvent.type(firstNameTextInput, "Devlin");
    expect(firstNameTextInput).toHaveValue("Devlin");

    const lastNameTextInput = await screen.findByLabelText("Last Name");
    expect(lastNameTextInput).toBeInTheDocument();
    userEvent.type(lastNameTextInput, "Duldulao");
    expect(lastNameTextInput).toHaveValue("Duldulao");

    const houseTextInput = await screen.findByLabelText("House");
    expect(houseTextInput).toBeInTheDocument();
    userEvent.type(houseTextInput, "Marvel");
    expect(houseTextInput).toHaveValue("Marvel");

    const knownAsTextInput = await screen.findByLabelText("Known As");
    expect(knownAsTextInput).toBeInTheDocument();
    userEvent.type(knownAsTextInput, "React Man");
    expect(knownAsTextInput).toHaveValue("React Man");

    const saveCharacterButton = await screen.findByRole("button", {
      name: "Save Character",
    });
    expect(saveCharacterButton).toBeEnabled();
    userEvent.click(saveCharacterButton);

    rerender(<AntiHeroesPage />);

    await waitFor(() => {
      const cards = screen.getAllByRole("card");
      expect(cards).toHaveLength(3);
      const counter = screen.getByRole("total-anti-heroes");
      expect(counter).toHaveTextContent("3");
    });
  });

  it("should delete a hero from the database", async () => {
    render(<AntiHeroesPage />);

    const buttons = await screen.findAllByRole("button", {
      name: "DELETE in DB",
    });
    userEvent.click(buttons[0]);
    expect(await screen.findByRole("card")).toBeInTheDocument();
    expect(screen.getByRole("total-anti-heroes")).toHaveTextContent("1");
  });

  it("should remove an anti hero from the store", async () => {
    render(<AntiHeroesPage />);

    const buttons = await screen.findAllByRole("button", {
      name: "Remove",
    });
    userEvent.click(buttons[0]);
    expect(screen.getByRole("card")).toBeInTheDocument();
    expect(screen.getByRole("total-anti-heroes")).toHaveTextContent("1");
  });

  it("should mark an anti hero", async () => {
    render(<AntiHeroesPage />);

    const buttons = await screen.findAllByRole("button", {
      name: "Mark",
    });
    expect(buttons).toHaveLength(2);
    userEvent.click(buttons[0]);
    const cards = await screen.findAllByRole("card");
    expect(cards[0]).toHaveTextContent("marked");
  });
});

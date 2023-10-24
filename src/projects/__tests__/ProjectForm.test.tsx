import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Project } from "../Project";
import ProjectForm from "../ProjectForm";
import { Provider } from "react-redux";
import { store } from "../../state";
import userEvent from "@testing-library/user-event";

describe("<ProjectForm/>", () => {
  let project;
  let updatedProject;
  let handleCancel;
  let nameTextBox;
  let descriptionTextBox;
  let budgetTextBox;

  const setup = () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProjectForm project={project} onCancel={handleCancel} />
        </MemoryRouter>
      </Provider>,
    );
    nameTextBox = screen.getByRole("textbox", {
      name: /project name/i,
    });
    descriptionTextBox = screen.getByRole("textbox", {
      name: /project description/i,
    });
    budgetTextBox = screen.getByRole("spinbutton", {
      name: /project budget/i,
    });
  };

  beforeEach(() => {
    project = new Project({
      id: 1,
      name: "Mission Impossible",
      description: "This is really difficult",
      budget: 100,
    });
    updatedProject = new Project({
      name: "Ghost Protocol",
      description:
        "Blamed for a terrorist attack on the Kremlin, Ethan Hunt (Tom Cruise) and the entire IMF agency...",
    });
    handleCancel = jest.fn();
  });
  test("should load project into form", () => {
    setup();
    expect(
      screen.getByRole("form", {
        name: /edit a project/i,
      }),
    ).toHaveFormValues({
      name: project.name,
      description: project.description,
      budget: project.budget,
      isActive: project.isActive,
    });
  });
  test("Should accept input", async () => {
    setup();
    const user = userEvent.setup();

    act(() => {
      user.clear(nameTextBox);
      user.type(nameTextBox, updatedProject.name);
    });
    await waitFor(() => {
      expect(nameTextBox).toHaveValue(updatedProject.name);
    });

    act(() => {
      user.clear(descriptionTextBox);
      user.type(descriptionTextBox, updatedProject.description);
    });

    await waitFor(() => {
      expect(descriptionTextBox).toHaveValue(updatedProject.description);
    });

    act(() => {
      user.clear(budgetTextBox);
      user.type(budgetTextBox, updatedProject.budget);
    });
    await waitFor(() => {
      expect(budgetTextBox).toHaveValue(updatedProject.budget);
    });
  });
  test("name should display required validation", async () => {
    setup();
    const user = userEvent.setup();
    act(() => {
      user.clear(nameTextBox);
    });
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  test("name should display minlength 0 validation", async () => {
    setup();
    const user = userEvent.setup();

    await waitFor(async () => {
      await user.clear(nameTextBox);
      await user.type(nameTextBox, "a");
      expect(screen.getByRole("alert")).toBeInTheDocument();
      await user.type(nameTextBox, "c");
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  test("budget should display not 0 validation", async () => {
    setup();
    const user = userEvent.setup();
    act(() => {
      user.clear(budgetTextBox);
      user.type(budgetTextBox, "0");
    });

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    act(() => {
      user.type(budgetTextBox, "1");
    });

    await waitFor(() => {
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });
});

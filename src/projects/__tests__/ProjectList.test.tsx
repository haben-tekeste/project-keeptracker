import { render, screen, waitFor, act } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import ProjectList from "../ProjectList";
import { MOCK_PROJECTS } from "../MockProject";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../state";

describe("<ProjectList />", () => {
  const setup = () =>
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProjectList projects={MOCK_PROJECTS} />
        </MemoryRouter>
      </Provider>,
    );

  beforeEach(() => {});

  test("Should render without crashing", () => {
    setup();
    expect(screen).toBeDefined();
  });

  test("Should display list of projects", () => {
    setup();
    expect(screen.getAllByRole("heading")).toHaveLength(MOCK_PROJECTS.length);
    expect(screen.getAllByRole("img")).toHaveLength(MOCK_PROJECTS.length);
    expect(screen.getAllByRole("link")).toHaveLength(MOCK_PROJECTS.length);
    expect(screen.getAllByRole("button")).toHaveLength(MOCK_PROJECTS.length);
  });

  test("Should display form when edit button is clicked", async () => {
    setup();
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const user = userEvent.setup();

    await user.click(
      screen.getByRole("button", { name: /edit Wisozk Group/i }),
    );

    await waitFor(() => {
      expect(
        screen.getByRole("form", { name: /edit a project/i }),
      ).toBeInTheDocument();
    });
  });
});

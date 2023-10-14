import { render, screen } from "@testing-library/react";
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
});

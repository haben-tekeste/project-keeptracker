import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../state";
import ProjectsPage from "../ProjectsPage";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

describe("<ProjectsPage />", () => {
  function renderComponent() {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProjectsPage />
        </MemoryRouter>
      </Provider>
    );
  }

  test("should render without crashing", () => {
    renderComponent();
    expect(screen).toBeDefined();
  });
});
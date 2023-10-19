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
import { rest } from "msw";
import { setupServer } from "msw/node";
import { url as projectsUrl } from "../projectApi";
import { MOCK_PROJECTS } from "../MockProject";

// api mock
const server = setupServer(
  // capture "GET http://localhost:3000/projects" requests
  rest.get(projectsUrl, (req, res, ctx) => {
    // respond with mocked json body
    return ctx.json(MOCK_PROJECTS);
  }),
);

describe("<ProjectsPage />", () => {
  function renderComponent() {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProjectsPage />
        </MemoryRouter>
      </Provider>,
    );
  }

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("should render without crashing", () => {
    renderComponent();
    expect(screen).toBeDefined();
  });

  test("should display loading", () => {
    renderComponent();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});

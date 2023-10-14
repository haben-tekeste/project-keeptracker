import { render, screen } from "@testing-library/react";
import ProjectCard from "../ProjectCard";
import { Project } from "../Project";
import { MemoryRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";
import renderer from "react-test-renderer";

describe("<ProjectCard/>", () => {
  let project: Project;
  let handleEdit: jest.Mock;

  const setup = () =>
    render(
      <MemoryRouter>
        <ProjectCard project={project} onEdit={handleEdit} />
      </MemoryRouter>,
    );

  beforeEach(() => {
    project = new Project({
      id: 1,
      name: "Mission Impossible",
      description: "This is really difficult",
      budget: 100,
    });
    handleEdit = jest.fn();
  });

  it("Should initially render", () => {
    setup();
  });

  it("Should render project properly", () => {
    setup();
    expect(screen.getByRole("heading")).toHaveTextContent(project.name);
    screen.getByText(/this is really difficult/i);
    screen.getByText(/budget : 100/i);
  });

  it("Should call handler when edit is clicked", async () => {
    setup();

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /edit/i }));
    expect(handleEdit).toBeCalledTimes(1);
    expect(handleEdit).toBeCalledWith(project);
  });

  test("snapshot", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <ProjectCard project={project} onEdit={handleEdit} />
        </MemoryRouter>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

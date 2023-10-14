import { render, screen } from "@testing-library/react";
import ProjectCard from "../ProjectCard";
import { Project } from "../Project";
import { MemoryRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";

describe("<ProjectCard/>", () => {
  let project: Project;
  let handleEdit: jest.Mock;

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
    render(
      <MemoryRouter>
        <ProjectCard project={project} onEdit={handleEdit} />
      </MemoryRouter>,
    );
  });

  it("Should render project properly", () => {
    render(
      <MemoryRouter>
        <ProjectCard project={project} onEdit={handleEdit} />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading")).toHaveTextContent(project.name);
    screen.getByText(/this is really difficult/i);
    screen.getByText(/budget : 100/i);
  });

  it("Should call handler when edit is clicked", async () => {
    render(
      <MemoryRouter>
        <ProjectCard project={project} onEdit={handleEdit} />
      </MemoryRouter>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /edit/i }));
    expect(handleEdit).toBeCalledTimes(1);
    expect(handleEdit).toBeCalledWith(project);
  });
});

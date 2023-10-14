import { render, screen } from "@testing-library/react";
import ProjectCard from "../ProjectCard";
import { Project } from "../Project";
import { MemoryRouter } from "react-router-dom";

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
    jest.fn();
  });

  it("Should initially render", () => {
    render(
      <MemoryRouter>
        <ProjectCard project={project} onEdit={handleEdit} />
      </MemoryRouter>,
    );
  });
});

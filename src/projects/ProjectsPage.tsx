import { MOCK_PROJECTS } from "./MockProject";
import ProjectList from "./ProjectList";
import { Project } from "./Project";
import { useState } from "react";
import { Fragment } from "react";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const saveProject = (project: Project) => {
    const updatedProjects = projects.map((p: Project) => {
      return p.id === project.id ? project : p;
    });
    setProjects(updatedProjects);
  };
  return (
    <Fragment>
      <h1>Projects</h1>
      <ProjectList projects={projects} onSave={saveProject} />
    </Fragment>
  );
}

export default ProjectsPage;

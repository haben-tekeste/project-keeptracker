import { MOCK_PROJECTS } from "./MockProject";
import ProjectList from "./ProjectList";
import { Project } from "./Project";
import { useState, useEffect, Fragment } from "react";
import { projectApi } from "./projectApi";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const saveProject = (project: Project) => {
    const updatedProjects = projects.map((p: Project) => {
      return p.id === project.id ? project : p;
    });
    setProjects(updatedProjects);
  };

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const data = await projectApi.get(1);
        setError("");
        setProjects(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  });
  return (
    <Fragment>
      <h1>Projects</h1>
      <ProjectList projects={projects} onSave={saveProject} />
      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </Fragment>
  );
}

export default ProjectsPage;

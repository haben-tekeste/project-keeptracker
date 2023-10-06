import { MOCK_PROJECTS } from "./MockProject";
import ProjectList from "./ProjectList";
import { Project } from "./Project";

function ProjectsPage() {
 const saveProject = (project:Project) => {
  console.log("Saving project")
 }
  return (
    <>
      <h1>Projects</h1>
      <ProjectList projects={MOCK_PROJECTS} onSave={saveProject}/>
    </>
  );
}

export default ProjectsPage;

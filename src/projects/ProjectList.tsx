import { useState } from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

type projectListProps = {
  projects: Project[];
};

function ProjectList({ projects }: projectListProps) {
  const [projectBeingEdited, setProjectBeingEdited] = useState<Project | {}>(
    {},
  );

  const handleEdit = (project: Project) => {
    setProjectBeingEdited(project);
  };

  const handleCancel = () => {
    setProjectBeingEdited({});
  };

  return (
    <ul className="row">
      {projects.map((project) => (
        <div className="cols-sm" key={project.id}>
          {project === projectBeingEdited ? (
            <ProjectForm onCancel={handleCancel} project={project} />
          ) : (
            <ProjectCard project={project} onEdit={handleEdit} />
          )}
        </div>
      ))}
    </ul>
  );
}
export default ProjectList;

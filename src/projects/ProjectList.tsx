import { Project } from "./Project";
import ProjectCard from "./ProjectCard";


type projectListProps = {
  projects: Project[];
};

function ProjectList({ projects }: projectListProps) {
  return (
    <ul className="row">
      {projects.map((project) => (
        <ProjectCard project={project} />
      ))}
    </ul>
  );
}
export default ProjectList;

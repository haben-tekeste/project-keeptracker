import { Project } from "./Project";

type projectCardProps = {
  project: Project;
};

function formatDescription(description: string): string {
  return description.substring(0, 60) + " ...";
}

function ProjectCard({ project }: projectCardProps) {
  return (
    <div className="cols-sm" key={project.id}>
      <div className="card">
        <img src={project.imageUrl} alt={project.name} />
        <section className="section dark">
          <h5 className="strong">
            <strong>{project.name}</strong>
          </h5>
          <p>{formatDescription(project.description)}</p>
          <p>Budget: {project.budget.toLocaleString()}</p>
        </section>
      </div>
    </div>
  );
}

export default ProjectCard;

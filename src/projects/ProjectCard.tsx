import { Project } from "./Project";

type projectCardProps = {
  project: Project;
  onEdit: (project: Project) => void;

};

function formatDescription(description: string): string {
  return description.substring(0, 60) + " ...";
}

function ProjectCard({ project, onEdit }: projectCardProps) {
  const handleEditClick = (project: Project) => {
    onEdit(project);
  };

  return (
    <div className="card">
      <img src={project.imageUrl} alt={project.name} />
      <section className="section dark">
        <h5 className="strong">
          <strong>{project.name}</strong>
        </h5>
        <p>{formatDescription(project.description)}</p>
        <p>Budget: {project.budget.toLocaleString()}</p>
        <button className="bordered" onClick={() => handleEditClick(project)}>
          <span className="icon-edit "></span>
          Edit
        </button>
      </section>
    </div>
  );
}

export default ProjectCard;

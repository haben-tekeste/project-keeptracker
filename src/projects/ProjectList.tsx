import { Project } from "./Project";

type projectListProps = {
  projects: Project[];
};

function ProjectList({ projects }: projectListProps) {
  return (
    <ul className="row">
      {projects.map((project) => (
        <div className="cols-sm" key={project.id}>
          <div className="card">
            <img src={project.imageUrl} alt={project.name} />
            <section className="section dark">
              <h5 className="strong">
                <strong>{project.name}</strong>
              </h5>
              <p>{project.description}</p>
              <p>{project.budget.toLocaleString()}</p>
            </section>
          </div>
        </div>
      ))}
    </ul>
  );
}
export default ProjectList;

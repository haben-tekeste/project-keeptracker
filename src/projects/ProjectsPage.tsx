import { MOCK_PROJECTS } from "./MockProject";
import ProjectList from "./ProjectList";
import { loadProjects } from "./state/projectActions";
import { Project } from "./Project";
import { useState, useEffect, Fragment } from "react";
import { projectAPI } from "./projectApi";
import { AppState } from "../state";
import { useSelector, useDispatch } from "react-redux";

function ProjectsPage() {
  const {
    loading,
    error,
    page: currentPage,
    projects,
  } = useSelector((appState: AppState) => appState.projectState);
  const dispatch = useDispatch();

  const saveProject = (project: Project) => {
    projectAPI
      .put(project)
      .then((updatedProject) => {
        let updatedProjects = projects.map((p: Project) => {
          return p.id === project.id ? new Project(updatedProject) : p;
        });
        // setProjects(updatedProjects);
      })
      .catch((e) => {
        if (e instanceof Error) {
          // setError(e.message);
        }
      });
  };

  const handleMoreClick = () => {
    dispatch(loadProjects(currentPage + 1) as any);
  };

  useEffect(() => {
    dispatch(loadProjects(1) as any);
  }, [currentPage]);
  return (
    <Fragment>
      <h1>Projects</h1>
      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}

      <ProjectList projects={projects} onSave={saveProject} />
      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}
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

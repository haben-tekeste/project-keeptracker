import { MOCK_PROJECTS } from "./MockProject";
import ProjectList from "./ProjectList";
import { loadProjects } from "./state/projectActions";
import { Project } from "./Project";
import { useState, useEffect, Fragment } from "react";
import { projectAPI } from "./projectApi";
import { AppState } from "../state";
import { useSelector, useDispatch } from "react-redux";
import { ProjectState } from "./state/projectTypes";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

function ProjectsPage() {
  const {
    loading,
    error,
    page: currentPage,
    projects,
  } = useSelector((appState: AppState) => appState.projectState);
  const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();

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
    dispatch(loadProjects(currentPage + 1));
  };

  useEffect(() => {
    dispatch(loadProjects(1));
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

      <ProjectList projects={projects} />
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

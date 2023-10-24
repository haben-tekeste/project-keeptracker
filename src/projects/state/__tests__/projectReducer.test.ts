import { projectReducer, initialProjectState } from "../projectReducer";
import { SAVE_PROJECT_SUCCESS } from "../projectTypes";
import { Project } from "../../Project";
import { MOCK_PROJECTS } from "../../MockProject";

describe("Project reducer", () => {
  test("Should update an existing project", () => {
    const project = MOCK_PROJECTS[0];
    const updatedProject = Object.assign(new Project(), project, {
      name: project.name + " updated",
    });
    const currentState = { ...initialProjectState, projects: [project] };
    const updatedState = {
      ...initialProjectState,
      projects: [updatedProject],
    };
    expect(
      projectReducer(currentState, {
        type: SAVE_PROJECT_SUCCESS,
        payload: updatedProject,
      }),
    ).toEqual(updatedState);
  });
});

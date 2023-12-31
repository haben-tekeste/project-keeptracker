import configureMockStore from "redux-mock-store";
import ReduxThunk from "redux-thunk";
import { initialAppState } from "../../../state";
import { loadProjects } from "../projectActions";
import {
  LOAD_PROJECTS_REQUEST,
  LOAD_PROJECTS_FAILURE,
  LOAD_PROJECTS_SUCCESS,
} from "../projectTypes";
import { projectAPI } from "../../projectApi";
import { MOCK_PROJECTS } from "../../MockProject";

jest.mock("../../projectApi");

const middlewares = [ReduxThunk];
const mockStoreCreator = configureMockStore(middlewares);

describe("Project Actions", () => {
  let store;

  beforeEach(() => {
    store = mockStoreCreator(initialAppState);
  });

  test("Should load projects successfully", () => {
    const expectedActions = [
      {
        type: LOAD_PROJECTS_REQUEST,
      },
      {
        type: LOAD_PROJECTS_SUCCESS,
        payload: { projects: MOCK_PROJECTS, page: 1 },
      },
    ];

    return store.dispatch(loadProjects(1)).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  test("Should return error when loading project fails", () => {
    projectAPI.get = jest.fn().mockImplementationOnce(() => {
      return Promise.reject("failed");
    });

    const expectedActions = [
      { type: LOAD_PROJECTS_REQUEST },
      { type: LOAD_PROJECTS_FAILURE, payload: "failed" },
    ];

    return store.dispatch(loadProjects(1)).then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
});

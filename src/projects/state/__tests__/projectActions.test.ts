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

jest.mock("../../projectAPI");

const middlewares = [ReduxThunk];
const mockStoreCreator = configureMockStore(middlewares);

describe("Project Actions", () => {
  let store;

  beforeEach(() => {
    store = mockStoreCreator(initialAppState);
  });
});

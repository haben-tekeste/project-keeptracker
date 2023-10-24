import { MOCK_PROJECTS } from "../MockProject";

const projectAPI = {
  get(page = 1, limit = 20) {
    return Promise.resolve(MOCK_PROJECTS);
  },
};

export { projectAPI };

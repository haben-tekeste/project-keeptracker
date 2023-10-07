import { Project } from "./Project";

const baseUrl = "http://localhost:4000";
const url = `${baseUrl}/projects`;

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return "Please login again";
    case 403:
      return "You don't have permission to view project(s)";
    default:
      return "There was an error retrieving the project(s). Please try again.";
  }
}

function checkStatus(response: any) {
  if (response.ok) {
    return response;
  }
  const httpErrorInfo = {
    status: response.status,
    statusText: response.statusText,
    url: response.url,
  };

  console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

  let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
  throw new Error(errorMessage);
}

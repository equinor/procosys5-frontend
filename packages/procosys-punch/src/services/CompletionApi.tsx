import { CompletionApiSetting, FetchOperationProps } from "../types";
import objectToCamelCase from "../utils/objectToCamelCase";
import { HTTPError } from "./HTTPError";

const settings: CompletionApiSetting = {
  baseURL: "https://backend-procosys-completion-api-dev.radix.equinor.com",
  token: "YOUR_TOKEN",
};
/**
 * Remove baseurl, including /api/.
 */
export const removeBaseUrlFromUrl = (fullUrl: string): string => {
  return fullUrl.substring(
    fullUrl.indexOf("/api/") + 5, //todo: is there a better way?
    fullUrl.length
  );
};

export const getErrorMessage = async (response: Response): Promise<string> => {
  let errorMessage;
  const text = await response.text();
  if (text) {
    errorMessage = text;
  } else {
    errorMessage = `Server responded with http error code ${response.status}. ${response.statusText}`;
  }
  console.error("Error occured on server call.", errorMessage);
  return errorMessage;
};

/**
 * Generic method for doing a GET call. Should be used by all GET calls with json string (or blank) as respons.
 */
export const getByFetch = async (
  url: string,
  plant?: string,
  abortSignal?: AbortSignal
): Promise<any> => {
  const { baseURL, token } = settings;
  const myToken = await token;
  const GetOperation: FetchOperationProps = {
    abortSignal: abortSignal,
    method: "GET",
    headers: {
      "x-plant": `PCS$${plant}`,
      Authorization: `Bearer ${myToken}`,
    },
  };
  const res = await fetch(`${baseURL}/${url}`, GetOperation);
  if (res.ok) {
    const jsonResult = await res.json();
    const resultObj = objectToCamelCase(jsonResult);
    return resultObj;
  } else {
    console.error("Get by fetch failed. Url=" + url, res);
    throw new HTTPError(res.status, res.statusText);
  }
};

/**
 * Generic method for doing a POST call with json as body data.
 * If the request fails because of http error code from server, HTTPError will be thrown.
 * If the request fails because of network issues etc, Error will be thrown.
 */
export const postByFetch = async (
  url: string,
  bodyData?: any
): Promise<any> => {
  const { baseURL, token } = settings;
  const myToken = await token;
  const PostOperation = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${myToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  };

  let response = new Response();
  try {
    response = await fetch(`${baseURL}/${url}`, PostOperation);
  } catch (error) {
    console.error("Something went wrong when accessing the server.", error);
    throw new Error("Something went wrong when accessing the server.");
  }

  if (response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const jsonResult = await response.json();
      const resultObj = objectToCamelCase(jsonResult);
      return resultObj;
    } else if (contentType === "text/plain;charset=UTF-8") {
      const textResponse = await response.text();
      return await JSON.parse(textResponse);
    } else {
      return;
    }
  } else {
    const errorMessage = await getErrorMessage(response);
    console.error("Error occured on postByFetch", errorMessage);
    throw new HTTPError(response.status, errorMessage);
  }
};

export const patchByFetch = async (
  url: string,
  bodyData?: any
): Promise<any> => {
  const { baseURL, token } = settings;
  const myToken = await token;
  const PostOperation = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${myToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  };

  let response = new Response();
  try {
    response = await fetch(`${baseURL}/${url}`, PostOperation);
  } catch (error) {
    console.error("Something went wrong when accessing the server.", error);
    throw new Error("Something went wrong when accessing the server.");
  }

  if (response.ok) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const jsonResult = await response.json();
      const resultObj = objectToCamelCase(jsonResult);
      return resultObj;
    } else if (contentType === "text/plain;charset=UTF-8") {
      const textResponse = await response.text();
      return await JSON.parse(textResponse);
    } else {
      return;
    }
  } else {
    const errorMessage = await getErrorMessage(response);
    console.error("Error occured on postByFetch", errorMessage);
    throw new HTTPError(response.status, errorMessage);
  }
};

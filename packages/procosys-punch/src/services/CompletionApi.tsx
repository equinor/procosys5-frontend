import { CompletionApiSetting, FetchOperationProps } from "../types";
import objectToCamelCase from "../utils/objectToCamelCase";
import { HTTPError } from "./HTTPError";

const settings: CompletionApiSetting = {
  baseURL: "https://backend-procosys-completion-api-dev.radix.equinor.com",
  token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImtXYmthYTZxczh3c1RuQndpaU5ZT2hIYm5BdyIsImtpZCI6ImtXYmthYTZxczh3c1RuQndpaU5ZT2hIYm5BdyJ9.eyJhdWQiOiJhcGk6Ly82N2IyZjA1My0zMGJmLTRmZmMtOTIwNi1lZjU3ZjYzMWVmY2IiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8zYWE0YTIzNS1iNmUyLTQ4ZDUtOTE5NS03ZmNmMDViNDU5YjAvIiwiaWF0IjoxNzA3MzEzNjc4LCJuYmYiOjE3MDczMTM2NzgsImV4cCI6MTcwNzMxOTA2MCwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhWQUFBQW1qTkhIb29mTkFPYlFxaU1ES1NqelpDS0c0d09qV21ER3IvL21BTzMvQm5xTmoyVWNORktZQk9KQU1lTW9VVTJ6TFRUbkFRL01JWm9VbkJERWs0eGgxMGhyWnVCZ2tnT3UwaXVVY3hKdm04PSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwaWQiOiI5NzUwNTYxNy0zMDJmLTQwOWEtYTM3ZS03Y2E4NTliNWI1NmMiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IlNrasOmdmVsYW5kIiwiZ2l2ZW5fbmFtZSI6IkFubmUgTGlzZSIsImlwYWRkciI6IjkyLjIyMS4xNTkuMTQiLCJuYW1lIjoiQW5uZSBMaXNlIFNrasOmdmVsYW5kIChCb3V2ZXQgQVNBKSIsIm9pZCI6IjM3NDQ2OTU1LTdhYjktNGI2NC1iMGZkLWUzMjI2MWFiN2JkMCIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yMjA1MjMzODgtMTA4NTAzMTIxNC03MjUzNDU1NDMtMjcwMzk1MSIsInJoIjoiMC5BUUlBTmFLa091SzIxVWlSbFhfUEJiUlpzRlB3c21lX01QeFBrZ2J2Vl9ZeDc4c0NBS0kuIiwic2NwIjoiUmVhZFdyaXRlIiwic3ViIjoiV2lCN3V2VThJcFczc2tyeXJGTzUtbnVyVHpaMjA5WE9UYnpBT3JPVlcyRSIsInRpZCI6IjNhYTRhMjM1LWI2ZTItNDhkNS05MTk1LTdmY2YwNWI0NTliMCIsInVuaXF1ZV9uYW1lIjoiQU5TS0BlcXVpbm9yLmNvbSIsInVwbiI6IkFOU0tAZXF1aW5vci5jb20iLCJ1dGkiOiJaUnlWNXcxTUNrV0FQUHdrdWxCT0FBIiwidmVyIjoiMS4wIn0.SMLMnX-bbWRGuOwfVz34qt-UI32LtWltT7fHvHOoxh1ILiK4PgxiUNN9EU1gPQbxlxb91q8CLNLXcjPhizk7z6a4qmD97ddQZ_06Zalpqx0V9DfEnII3pdmdpomZtVvQwTsmbebcoQyqz3mtaqwsXzj1QfoEom2nA5y_vvxNH72PNUr_BvqLjNGhnNatZvjzDsvmvySZHXgjAG_w50oBPuZrb-GtbOpKtuU6uL7nO8ISiN-VW_GiSH53pvmtLGv3yJvGPwvfXpFbfO7NerI2rVIk3BtG-td_5fqmGr09F5q736JSDTkzhV2LuU7sItZBLeTE0H6lZRNuSocol40oOQ",
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

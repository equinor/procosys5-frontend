export type FetchOperationProps = {
  abortSignal?: AbortSignal;
  method: string;
  headers: any;
  responseType?: string;
  body?: string | FormData;
};

export type CompletionApiSetting = {
  baseURL: string;
  token: string;
};

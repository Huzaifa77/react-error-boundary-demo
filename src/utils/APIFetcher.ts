import axios from "axios";

type AxiosConfig = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
  headers?: Record<string, string>;
  body?: Record<string, unknown> | string | null;
};

export const APIFetcher = async (
  url: string,
  args: AxiosConfig & Record<string, unknown> = { method: "GET" }
) => {
  try {
    const { method, body, headers, ...restConfigs } = args;
    const response = await axios({
      url,
      method,
      headers,
      data: body,
      ...restConfigs,
    });

    return response;
  } catch (error) {
    console.log("🚀 ~ file: APIFetcher.ts:15 ~ APIFetcher ~ error:", error);
    throw error;
  }
};

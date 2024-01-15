import type { SWRConfiguration } from "swr";
import { APIFetcher } from "@/utils";

export const swrConfig: SWRConfiguration = {
  fetcher: APIFetcher,
  onError: (error) => {
    if (error) {
      throw error;
    }
  },
};

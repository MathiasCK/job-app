import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async <T>(
  endpoint: string,
  query: {
    job_id?: string;
    query?: string;
    page?: string;
    num_pages?: string;
  },
): Promise<{ data?: T[]; error?: boolean }> => {
  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
      ...query,
    },
    headers: {
      "X-RapidAPI-Key": process.env.EXPO_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);

    return {
      data: response.data.data as T[],
    };
  } catch (e) {
    console.error(e);
    return {
      error: true,
    };
  }
};

const useFetch = <T>(
  endpoint: string,
  query: {
    job_id?: string;
    query?: string;
    page?: string;
    num_pages?: string;
  },
) => {
  return useQuery({
    queryKey: [endpoint, query],
    queryFn: () => fetchData<T>(endpoint, query),
  });
};

export default useFetch;

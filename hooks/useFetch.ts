import { useCallback, useEffect, useState, useMemo } from "react";
import axios from "axios";

const useFetch = <T>(
  endpoint: string,
  query: {
    job_id?: string;
    query?: string;
    page?: string;
    num_pages?: string;
  },
): {
  data: T[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
} => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const options = useMemo(
    () => ({
      method: "GET",
      url: `https://jsearch.p.rapidapi.com/${endpoint}`,
      params: {
        ...query,
      },
      headers: {
        "X-RapidAPI-Key": process.env.EXPO_PUBLIC_RAPID_API_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    }),
    [endpoint, query],
  );

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
    } catch (error) {
      alert("There is an error");
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;

import { useState, useEffect, useCallback } from "react";

type LoginResult<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
  fetchData: () => Promise<void>;
};

export const OPTIONS = {
    method: 'POST',
    headers: {
      accept: 'application/json',
    }
  };

export const useLogin = <T,>(url: string, options?: RequestInit): LoginResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      console.log('response', response)
      if (!response.ok) {
        throw new Error("Error: Something went wrong");
      }
      const result: T = await response.json();
      setData(result);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, fetchData };
};

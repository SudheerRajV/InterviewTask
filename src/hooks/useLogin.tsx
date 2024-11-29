import axios from "axios";
import { useState, useEffect, useCallback } from "react";

type LoginResult = {
  data: any | null;
  error: string | null;
  loading: boolean;
  fetchData: (email:string, password:string) => Promise<void>;
};

interface ApiResponse {
    token: string;
  }

export const useLogin = (): LoginResult => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async (email: string, password:string) => {
    setLoading(true);
    setError(null);

    try {
    console.log('options', {email, password});
    const response = await axios.post<ApiResponse>(
        "http://localhost:5001/api/login", // Replace with your API URL
        {email, password}
      );
      console.log('response', response);
      // Handle success response
      setData(response.data.token);
      setError(""); // Clear previous errors
      //setData(result);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, fetchData };
};

import axios from "axios";
import { useState, useCallback } from "react";
import { setToken } from "../service/StorageService";
import { LOGIN_URL } from "../config/config";

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
    const response = await axios.post<ApiResponse>(
        LOGIN_URL,
        {email, password}
      );
      console.log('response', response);
      if(response && response.data)
      {
      setData(response.data.token);
      setToken(response.data.token)
      }
      setError("");
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, fetchData };
};

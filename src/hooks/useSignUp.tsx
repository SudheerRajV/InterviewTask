import axios from "axios";
import { useState,  useCallback } from "react";
import { REGISTER_URL } from "../config/config";

type SignUpResult = {
  data: any | null;
  error: string | null;
  loading: boolean;
  fetchData: (email:string, password:string,firstName:string, lastName:string) => Promise<void>;
};

interface ApiResponse {
    message: string;
  }

export const useSignUp = (): SignUpResult => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async (email: string, password:string, firstName:string, lastName:string) => {
    setLoading(true);
    setError(null);

    try {
    const response = await axios.post<ApiResponse>(
        REGISTER_URL,
        {email, password, firstName, lastName}
      );
      setData(response.data.message);
      setError("");
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, fetchData };
};

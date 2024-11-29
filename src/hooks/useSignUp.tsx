import axios from "axios";
import { useState, useEffect, useCallback } from "react";

type SignUpResult = {
  data: any | null;
  error: string | null;
  loading: boolean;
  fetchData: (email:string, password:string,firstnName:string, lastName:string) => Promise<void>;
};

interface ApiResponse {
    message: string;
  }

export const useSignUp = (): SignUpResult => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async (email: string, password:string, firstnName:string, lastName:string) => {
    setLoading(true);
    setError(null);

    try {
    const response = await axios.post<ApiResponse>(
        "http://localhost:5001/api/register", // Replace with your API URL
        {email, password, firstnName, lastName}
      );
      //console.log('response', response);
      // Handle success response
      setData(response.data.message);
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

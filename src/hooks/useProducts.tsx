import axios from "axios";
import { useState,  useCallback, useEffect } from "react";

type ProductResult = {
  data: any | null;
  error: string | null;
  loading: boolean
};

interface ApiResponse {
    products: [];
  }

export const useProducts = (): ProductResult => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
    const response = await axios.post<ApiResponse>(
        "http://localhost:5001/api/products"
      );
      console.log('response', response);
      // Handle success response
      setData(response.data);
      setError(""); // Clear previous errors
      //setData(result);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect (()=>{fetchData()},[])

  return { data, error, loading };
};

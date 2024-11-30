import axios from "axios";
import { useState,  useCallback, useEffect } from "react";
import { PRODUCTS_URL } from "../config/config";

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
    const response = await axios.get<ApiResponse>(
        PRODUCTS_URL
      );
      console.log('response', response);
      setData(response.data);
      setError("");
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect (()=>{fetchData()},[fetchData])

  return { data, error, loading };
};

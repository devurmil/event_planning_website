import { useState, useEffect, useCallback } from "react";
import { resolvers } from "@/lib/db";

// Mock implementation of useQuery
export function useQuery<T = any>(queryKey: any, args?: any) {
  // queryKey is expected to be a string or object from localApi, e.g. "events:featured"
  // If the user passed `api.events.getFeaturedEvents`, it's actually just a string/object config in our fake api 
  // currently we just passed strings in `localApi` in db.ts
  
  // Resolve the actual key string
  const key = typeof queryKey === 'string' ? queryKey : queryKey?._key || queryKey;
  
  const [data, setData] = useState<T | undefined>(undefined);

  // stringify args to use as dependency
  const argsString = JSON.stringify(args);

  const fetchData = useCallback(() => {
    if (!key) return;
    const resolver = resolvers[key as keyof typeof resolvers];
    if (resolver) {
      const result = resolver(args?._id ? { id: args._id } : args);
      setData(result as T);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, argsString]);

  useEffect(() => {
    fetchData();

    const handleUpdate = () => fetchData();
    window.addEventListener("db-update", handleUpdate);
    return () => window.removeEventListener("db-update", handleUpdate);
  }, [fetchData]);

  return data;
}

// Mock implementation of useMutation
export function useMutation(mutationKey: any) {
    const key = typeof mutationKey === 'string' ? mutationKey : mutationKey?._key || mutationKey;

    return useCallback(async (args?: any) => {
        const resolver = resolvers[key as keyof typeof resolvers];
        if (resolver) {
             return resolver(args);
        }
        throw new Error(`Mutation not found: ${key}`);
    }, [key]);
}

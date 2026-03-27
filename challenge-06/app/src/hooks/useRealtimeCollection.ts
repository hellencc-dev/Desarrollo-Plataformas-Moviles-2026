import { useEffect, useState } from "react";
import { onValue, push, ref, remove, set } from "firebase/database";
import { realtimeDb } from "../firebase/config";

export default function useRealtimeCollection<T extends Record<string, any>>(table: string) {
  const [results, setResults] = useState<(T & { id: string })[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsPending(true);

    const dbRef = ref(realtimeDb, table);

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = Object.entries(snapshot.val()).map(([id, value]) => ({
            id,
            ...(value as T),
          }));
          setResults(data);
        } else {
          setResults([]);
        }
        setIsPending(false);
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsubscribe();
  }, [table]);

  const add = async (data: T) => {
    setIsPending(true);
    setError(null);

    try {
      const newRef = push(ref(realtimeDb, table));
      await set(newRef, {
        ...data,
        createdAt: new Date().toISOString(),
      });
      setIsPending(false);
      return newRef;
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
      return null;
    }
  };

  const update = async (id: string, data: Partial<T>) => {
    setIsPending(true);
    setError(null);

    try {
      const current = results.find((item) => item.id === id);
      if (!current) {
        setIsPending(false);
        return false;
      }

      await set(ref(realtimeDb, `${table}/${id}`), {
        ...current,
        ...data,
        updatedAt: new Date().toISOString(),
      });

      setIsPending(false);
      return true;
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
      return false;
    }
  };

  const deleteItem = async (id: string) => {
    setIsPending(true);
    setError(null);

    try {
      await remove(ref(realtimeDb, `${table}/${id}`));
      setIsPending(false);
      return true;
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
      return false;
    }
  };

  return { results, isPending, error, add, update, deleteItem };
}
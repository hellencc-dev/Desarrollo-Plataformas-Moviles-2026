import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { localDb, type Fruit } from "../db/dexie";

export default function useDexie() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const results = useLiveQuery(
    () => localDb.fruits.orderBy("id").reverse().toArray(),
    [],
    []
  );

  const add = async (nombre: string) => {
    setIsPending(true);
    setError(null);

    try {
      await localDb.fruits.add({
        nombre,
        createdAt: new Date().toISOString(),
      });
      setIsPending(false);
      return true;
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
      return false;
    }
  };

  const update = async (id: number, data: Partial<Fruit>) => {
    setIsPending(true);
    setError(null);

    try {
      await localDb.fruits.update(id, data);
      setIsPending(false);
      return true;
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
      return false;
    }
  };

  const deleteItem = async (id: number) => {
    setIsPending(true);
    setError(null);

    try {
      await localDb.fruits.delete(id);
      setIsPending(false);
      return true;
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
      return false;
    }
  };

  return {
    results: results ?? [],
    isPending,
    error,
    add,
    update,
    deleteItem,
  };
}
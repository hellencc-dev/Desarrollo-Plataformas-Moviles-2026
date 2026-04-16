import { useState } from "react";
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";

export const useFilesystem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const writeJson = async (path: string, data: unknown) => {
    try {
      setLoading(true);
      setError(null);

      await Filesystem.writeFile({
        path,
        data: JSON.stringify(data),
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });

      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const readJson = async <T = unknown>(path: string): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);

      const result = await Filesystem.readFile({
        path,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });

      return JSON.parse(result.data as string) as T;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    writeJson,
    readJson,
  };
};
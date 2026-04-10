import { useState } from "react";
import {
  Filesystem,
  Directory,
  Encoding,
} from "@capacitor/filesystem";

export default function useFilesystem() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const writeFile = async (path: string, data: string) => {
    try {
      setLoading(true);
      setError("");

      await Filesystem.writeFile({
        path,
        data,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });

      return true;
    } catch (err: any) {
      setError(err?.message || "No se pudo escribir el archivo");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const readFile = async (path: string) => {
    try {
      setLoading(true);
      setError("");

      const result = await Filesystem.readFile({
        path,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });

      return String(result.data);
    } catch (err: any) {
      setError(err?.message || "No se pudo leer el archivo");
      return "";
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (path: string) => {
    try {
      setLoading(true);
      setError("");

      await Filesystem.deleteFile({
        path,
        directory: Directory.Documents,
      });

      return true;
    } catch (err: any) {
      setError(err?.message || "No se pudo eliminar el archivo");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const listFiles = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await Filesystem.readdir({
        path: "",
        directory: Directory.Documents,
      });

      return result.files.map((item: any) => item.name || item);
    } catch (err: any) {
      setError(err?.message || "No se pudieron listar los archivos");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, writeFile, readFile, deleteFile, listFiles };
}
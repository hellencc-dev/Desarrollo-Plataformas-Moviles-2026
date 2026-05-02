import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import {
  getTasksApi,
  getTaskByIdApi,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
} from "../services/tasksApi";

export interface Task {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

type TasksContextType = {
  tasks: Task[];
  loading: boolean;
  addTask: (title: string, description: string) => Promise<void>;
  updateTask: (id: number, title: string, description: string) => Promise<void>;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => Promise<void>;
  getTaskById: (id: number) => Promise<Task | undefined>;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const normalizeTask = (task: any): Task => ({
    id: Number(task.id),
    title: task.title ?? "",
    description: task.description ?? task.body ?? "",
    done: task.done ?? false,
  });

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const raw = localStorage.getItem("tasks");

        if (raw) {
          const parsed = JSON.parse(raw);
          setTasks(parsed.map((task: any) => normalizeTask(task)));
        } else {
          const data = await getTasksApi();
          const normalized = data.slice(0, 10).map((task: any) => normalizeTask(task));
          setTasks(normalized);
        }
      } catch (error) {
        console.error("Error loading tasks:", error);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = async (title: string, description: string) => {
    try {
      const newTaskFromApi = await createTaskApi({
        title,
        body: description,
        userId: 1,
      });

      const newTask: Task = {
        id: Number(newTaskFromApi?.id ?? Date.now()),
        title,
        description,
        done: false,
      };

      setTasks((prev) => [newTask, ...prev]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (id: number, title: string, description: string) => {
    try {
      await updateTaskApi(String(id), {
        title,
        body: description,
        userId: 1,
      });

      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, title, description } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = async (id: number) => {
    try {
      await deleteTaskApi(String(id));
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const getTaskById = async (id: number) => {
    const localTask = tasks.find((task) => task.id === id);
    if (localTask) return localTask;

    try {
      const taskFromApi = await getTaskByIdApi(String(id));
      if (!taskFromApi) return undefined;
      return normalizeTask(taskFromApi);
    } catch (error) {
      console.error("Error getting task by id:", error);
      return undefined;
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        updateTask,
        toggleTask,
        deleteTask,
        getTaskById,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("debe usarse dentro de TasksProvider");
  }

  return context;
}
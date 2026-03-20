import { createContext, useContext, useEffect, useState } from "react";

export interface Task {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

type TasksContextType = {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  updateTask: (id: number, title: string, description: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  getTaskById: (id: number) => Task | undefined;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("tasks");
    if (raw) {
      const parsed = JSON.parse(raw);
      const normalized = parsed.map((task: any) => ({
        id: task.id,
        title: task.title ?? "",
        description: task.description ?? "",
        done: task.done ?? false,
      }));
      setTasks(normalized);
    } else {
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      done: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: number, title: string, description: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title, description } : task
      )
    );
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const getTaskById = (id: number) => {
    return tasks.find((task) => task.id === id);
  };

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, updateTask, toggleTask, deleteTask, getTaskById }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("Error");
  }
  return context;
}
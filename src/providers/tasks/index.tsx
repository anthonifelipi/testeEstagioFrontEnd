import apiTasks from "../../services/index";
import { createContext, FC, ReactNode, useState } from "react";

interface ITasks {
  createdAt: string;
  id?: string;
  title: string;
  description: string;
  completed?: boolean;
  userId?: string;
}

interface TasksContextProps {
  tasks: ITasks[];
  setTasks: React.Dispatch<React.SetStateAction<ITasks[]>>;
  createTask: (item: ITasks) => void;
  removeTask: (item: ITasks) => void;
}
export const TasksContext = createContext<TasksContextProps>({
  tasks: [],
  setTasks: () => {},
  createTask: () => {},
  removeTask: () => {},
});

export const TasksProvider: FC<{ children: ReactNode }> = ({
  children,
}): any => {
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const createTask = (item: ITasks) => {
    setTasks((tasks) => [...tasks, item]);
  };

  const removeTask = (item: ITasks) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== item.id));
  };

  return (
    <TasksContext.Provider value={{ tasks, createTask, removeTask, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

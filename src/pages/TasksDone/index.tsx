import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useContext, useEffect } from "react";
import { TasksContext } from "../../providers/tasks";
import apiTasks from "../../services/index";
import Card from "../../components/Card";

const TasksDone = ({
  authenticated,
  setAuthenticated,
}: {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated, navigate]);

  const { tasks, setTasks, createTask, removeTask } = useContext(TasksContext);
  const token = localStorage.getItem("@Tasks:token") || "";

  const handleLogout = () => {
    localStorage.removeItem("@Tasks:token");
    localStorage.removeItem("@Tasks:user");
    setAuthenticated(false);
    navigate("/login");
  };

  const loadTasks = () => {
    apiTasks
      .get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setTasks(res.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar as tarefas", error);
      });
  };

  const deleteTask = (taskId: string | undefined) => {
    apiTasks
      .delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId
              ? { ...task, completed: res.data.completed }
              : task
          )
        );
      })
      .catch((err) => console.error("Erro ao atualizar a tarefa", err));
  };

  return (
    <div className="flex flex-col justify-center ">
      <header className=" text-white py-4 border-b border-gray-300 ">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-black font-['Roboto_Mono']">
            Tarefas concluidas
          </h1>
          <nav className="flex items-center gap-8 w-4/12">
            <Button
              onClick={() => navigate("/dashBoard")}
              children={"Voltar a Tarefas "}
              whiteSchema
            />
            <Button onClick={handleLogout} children={"Logout"} />
          </nav>
        </div>
      </header>

      <div className="flex flex-wrap mt-8 px-[38px] justify-center">
        {tasks
          .filter((item) => item.completed == true)
          .map(
            (item) => (
              console.log(item),
              (
                <Card
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  createdAt={item.createdAt}
                  onClick={() => deleteTask(item.id)}
                  onDelete={() => deleteTask(item.id)}
                  children={"Excluir Tarefa"}
                  editButton={false}
                />
              )
            )
          )}
      </div>
    </div>
  );
};
export default TasksDone;

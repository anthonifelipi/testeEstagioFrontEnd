import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { FiEdit2 } from "react-icons/fi";
import Card from "../../components/Card";
import { TasksContext } from "../../providers/tasks";
import apiTasks from "../../services/index";
import { toast } from "react-toastify";

const DashBoard = ({ authenticated }: { authenticated: boolean }) => {
  const { tasks, setTasks, createTask, removeTask } = useContext(TasksContext);

  const token = localStorage.getItem("@Tasks:token") || "";
  const [user] = useState(
    JSON.parse(localStorage.getItem("@Tasks:user") || "")
  );
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      return navigate("/login");
    }
  }, [authenticated, navigate]);

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

  useEffect(() => {
    loadTasks();
  }, []);

  const onSubmit = async (data: any) => {
    const tarefa = {
      title: data.title,
      description: data.description,
    };
    if (!data.title || !data.description) {
      return toast.error("Preencha os campos para inserir uma tarefa");
    }
    apiTasks
      .post("/tasks", tarefa, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setTasks((prevTasks) => [...prevTasks, res.data]))
      .catch((err) => console.error("Erro ao criar a tarefa", err));
  };

  return (
    <div className="flex flex-col justify-center px-8 mt-4">
      <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
        <section className="flex flex-col items-center">
          <Input
            icon={FiEdit2}
            placeholder={"Titulo"}
            register={register}
            name={"title"}
          />
          <Input
            icon={FiEdit2}
            placeholder={"Descrição da tarefa"}
            register={register}
            name={"description"}
          />
          <div className="flex flex-1 ">
            <Button
              type="submit"
              children={"Criar tarefa"}
              // onClick={() =>()}
            />
          </div>
        </section>
      </form>
      <div className="flex flex-wrap mt-8 px-[38px]">
        {tasks.map(
          (item) => (
            console.log(item),
            (
              <Card
                key={item.id}
                title={item.title}
                description={item.description}
                onClick={() => {
                  console.log(tasks);
                }}
              />
            )
          )
        )}
      </div>
    </div>
  );
};
export default DashBoard;

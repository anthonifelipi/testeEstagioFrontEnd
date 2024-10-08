import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { FiEdit2 } from "react-icons/fi";
import Card, { ITasks } from "../../components/Card";
import { TasksContext } from "../../providers/tasks";
import apiTasks from "../../services/index";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";

interface ITasksResponse extends ITasks {
  createdAt: string;
  updatedAt: string;
  user: {};
  userId: string;
}

const DashBoard = ({
  authenticated,
  setAuthenticated,
}: {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}) => {
  const navigate = useNavigate();
  const [ModalIsOpen, setModalOpen] = useState(false);
  const [taskOnModal, setTaskOnModal] = useState<ITasksResponse | null>(null);

  const openModal = (item: any) => {
    setTaskOnModal(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setTaskOnModal(null);
    setModalOpen(false);
  };

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated, navigate]);

  const { tasks, setTasks, createTask, removeTask } = useContext(TasksContext);

  const token = localStorage.getItem("@Tasks:token") || "";
  const [user] = useState(() => {
    const storedUser = localStorage.getItem("@Tasks:user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const { register, handleSubmit } = useForm();

  const loadTasks = () => {
    apiTasks
      .get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
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

  const handleLogout = () => {
    localStorage.removeItem("@Tasks:token");
    localStorage.removeItem("@Tasks:user");
    setAuthenticated(false);
    navigate("/login");
  };

  const updatedTask = (task: any) => {
    apiTasks
      .patch(`/tasks/${task.id}`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTasks((prevTasks) =>
          prevTasks.map((item) =>
            task.id === item.id
              ? { ...task, completed: res.data.completed }
              : task
          )
        );
        setModalOpen(false);
        loadTasks();
        toast.success("Tarefa atualizada com sucesso.");
      })
      .catch((err) => console.error("Erro ao atualizar a tarefa", err));
  };

  const deletedTask = (taskId: string | undefined) => {
    apiTasks
      .delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        toast.success("Tarefa deletada com sucesso");
      })
      .catch((err) => console.error("Erro ao excluir a tarefa", err));
  };

  return (
    <div className="flex flex-col justify-center ">
      <header className=" text-white py-4 border-b border-gray-300 ">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-black font-['Roboto_Mono']">
            Gerencie suas tarefas rápido e prático
          </h1>
          <nav className="flex items-center gap-8 w-4/12">
            <Button
              onClick={() => navigate("/tasksDone")}
              children={"Tarefas concluidas "}
              whiteSchema
            />
            <Button onClick={handleLogout} children={"Logout"} />
          </nav>
        </div>
      </header>
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
          <div className="flex flex-1 w-2/12 mt-4">
            <Button type="submit" children={"Criar tarefa"} />
          </div>
        </section>
      </form>
      <div className="flex flex-wrap mt-8 px-[38px] justify-center">
        {tasks
          .filter((item) => item.completed == false)

          .map(
            (item) => (
              (
                <Card
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  createdAt={item.createdAt}
                  onClick={() => updatedTask({ id: item.id, completed: true })}
                  onDelete={() => deletedTask(item.id)}
                  onUpdate={() => openModal(item)}
                  children={"Concluir Tarefa"}
                  editButton={true}
                />
              )
            )
          )}
        {ModalIsOpen && taskOnModal && (
          <Modal
            isOpen={ModalIsOpen}
            onClose={closeModal}
            title="Editar Tarefa"
          >
            <form onSubmit={handleSubmit(updatedTask)}>
              <Input
                type="hidden"
                placeholder={"Id"}
                register={register}
                name={"id"}
                value={taskOnModal.id}
              />

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

              <div className="flex justify-end mt-2">
                <Button type="submit" children={"Salvar"} />
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};
export default DashBoard;

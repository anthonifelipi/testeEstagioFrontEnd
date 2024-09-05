import Input from "../../components/Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiMail, FiLock } from "react-icons/fi";
import apiTasks from "../../services";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button";
import imgLogin from "../../assets/login.svg";
// Importação do Toast (opcional)
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginProps {
  autentication: boolean;
  setAutentication: (auth: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ autentication, setAutentication }) => {
  const schema = yup.object().shape({
    email: yup.string().required("Campo obrigatório"),
    password: yup
      .string()
      .min(8, "Mínimo 8 dígitos")
      .required("Campo obrigatório"),
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: {}) => {
    apiTasks
      .post("/login", data)
      .then((res) => {
        const { token, user } = res.data;
        localStorage.setItem("@Doit:token", JSON.stringify(token));
        localStorage.setItem("@Doit:user", JSON.stringify(user));
        setAutentication(true);
        toast.success("Bem-vindo");
        return navigate("/dashboard");
      })
      .catch(() => {
        toast.error("Usuário não encontrado");
      });
  };

  return (
    <div className="h-screen flex items-stretch">
      <div className="flex flex-col items-center justify-center animate-slide-in h-screen">
        <h1 className="text-4xl mb-4">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
          <Input
            register={register}
            name="email"
            icon={FiMail}
            label="Email"
            placeholder="Seu melhor email"
            error={errors.email?.message}
          />

          <Input
            name="password"
            register={register}
            icon={FiLock}
            label="Senha"
            placeholder="Senha"
            type="password"
            error={errors.password?.message}
          />
          <Button type="submit">Enviar</Button>
          <p className="mt-4">
            Não possui uma conta?{" "}
            <Link to="/signup" className="text-blue-500">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>

      <div className="flex justify-center items-center h-screen animate-slideIn bg-gray-100">
        <img src={imgLogin} alt="Imagem de login" className="max-w-md" />
      </div>
    </div>
  );
};

export default Login;

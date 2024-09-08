import Input from "../../components/Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiMail, FiLock } from "react-icons/fi";
import apiTasks from "../../services";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button";
import imgLogin from "../../assets/login.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

interface LoginProps {
  authenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

const Login = ({ authenticated, setAuthenticated }: LoginProps): any => {
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

  const onSubmit = (data: LoginFormData) => {
    apiTasks
      .post("/login", data)
      .then((res) => {
        const { token, userReturn } = res.data.user;
        localStorage.setItem("@Tasks:token", token);
        localStorage.setItem("@Tasks:user", JSON.stringify(userReturn));
        setAuthenticated(true);
        toast.success("Bem-vindo");
        return navigate("/dashboard");
      })
      .catch(() => {
        toast.error("Email ou senha incorreto");
      });
  };

  useEffect(() => {
    if (authenticated) {
      return navigate("/dashboard");
    }
  }, [authenticated]);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center animate-slide-in h-screen w-1/2">
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
            <Link to="/register" className="text-blue-500">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
      <div className="bg-black h-full w-1/2 flex justify-center flex-auto">
        <div
          className="flex flex-1 items-center justify-center bg-no-repeat bg-cover bg-center animate-slideIn"
          style={{ backgroundImage: `url(${imgLogin})` }}
        ></div>
      </div>
    </div>
  );
};

export default Login;

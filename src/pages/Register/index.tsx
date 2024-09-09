import registerImg from "../../assets/signup.svg";
import Input from "../../components/Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import apiTasks from "../../services";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button";
import imgLogin from "../../assets/login.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginProps {
  authenticated: boolean;
}

interface user {
  name: string;
  email: string;
  cpf: string;
  password: string;
}

const Register = ({ authenticated }: LoginProps): any => {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().required("Campo obrigatório").email(),
    cpf: yup.string().required("Campo obrigatório"),
    password: yup
      .string()
      .min(8, "Mínimo 8 dígitos")
      .required("Campo obrigatório"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas diferentes")
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

  const onSubmit = ({ name, email, cpf, password }: user) => {
    const user = { name, email, cpf, password };
    apiTasks
      .post("users", user)
      .then(() => {
        toast.success("Cadastrado com sucesso");
        return navigate("/login");
      })
      .catch((err) => toast.error("Algo deu errado", err));
  };

  if (authenticated) {
    return navigate("/dashboard");
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="bg-black h-full w-1/2 flex justify-center flex-auto">
        <div
          className="flex flex-1 items-center justify-center bg-no-repeat bg-cover bg-center animate-slideIn"
          style={{ backgroundImage: `url(${registerImg})` }}
        ></div>
      </div>
      <div className="flex flex-col items-center justify-center animate-slide-in h-screen w-1/2">
        <h1 className="text-4xl mb-4">Registre-se</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
          <Input
            register={register}
            name="name"
            icon={FiUser}
            label="Nome"
            placeholder="Seu nome"
            error={errors.name?.message}
          />
          <Input
            register={register}
            name="cpf"
            icon={FiUser}
            label="CPF"
            placeholder="Insira seu cpf"
            error={errors.name?.message}
          />
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
          <Input
            register={register}
            name="confirmPassword"
            icon={FiLock}
            label="Confirmar senha"
            placeholder="Confirmar senha"
            type="password"
            error={errors.confirmPassword?.message}
          />
          <div className="mt-4">
            <Button type="submit">Enviar</Button>
          </div>
          <p className="mt-4">
            Já possui uma conta?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Register;

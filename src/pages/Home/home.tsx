import Button from "../../components/Button";
import { useNavigate } from "react-router";

const Home = ({ authenticated }: any): any => {
  const navigate = useNavigate();

  if (authenticated) {
    return navigate("/dashboard");
  }

  return (
    <div className="flex items-center justify-center text-center h-screen">
      <div className="max-w-[700px]">
        <h1 className="text-4xl">Tasks</h1>
        <span className="text-2xl">Organize suas tarefas rapido e facil</span>

        <div className="flex gap-4 mt-4">
          <Button children={"Login"} onClick={() => navigate("/login")} />
          <Button
            children={"Cadastre-se"}
            onClick={() => navigate("/signup")}
            whiteSchema
          />
        </div>
      </div>
    </div>
  );
};
export default Home;

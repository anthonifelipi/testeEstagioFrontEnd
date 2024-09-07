import Button from "../../components/Button";
import { FiCalendar, FiClipboard } from "react-icons/fi";

interface ITasks {
  title: string;
  description: string;
  onClick: () => void;
}

const Card = ({ title, description, onClick }: ITasks) => {
  return (
    <div className="bg-white rounded-lg flex flex-col items-center w-[250px] h-[250px] p-4 shadow-md shadow-black/30 border border-black text-black mt-3 mr-7">
      <span>
        {" "}
        <FiClipboard /> {title}
      </span>
      <hr className="w-11/12 my-4 border-t border-gray-300" />
      <time>
        {" "}
        <FiCalendar />{" "}
      </time>
      <Button onClick={onClick} children={"Finalizar tarefa"} />
    </div>
  );
};
export default Card;

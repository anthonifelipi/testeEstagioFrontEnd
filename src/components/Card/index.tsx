import Button from "../../components/Button";
import { FiCalendar, FiClipboard } from "react-icons/fi";

interface ITasks {
  id?: string;
  title: string;
  description: string;
  createdAt: string;
  onClick: () => void;
  children: string;
}

const Card = ({ title, description, onClick, createdAt, children }: ITasks) => {
  const newDate = new Date(createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-lg flex flex-col justify-between w-[250px] h-[250px] p-4 shadow-md shadow-black/30 border border-black text-black mt-3 mr-7">
      <div>
        <div>
          <span className="flex justify-start">
            {" "}
            <FiClipboard className="m-1" /> {title}
          </span>
        </div>

        <hr className="w-11/12 my-4 border-t border-gray-300" />
        <div className="flex flex-col ">
          <time className="flex font-bold">
            {" "}
            <FiCalendar className="m-1" />
            <span>{newDate}</span>
          </time>
          <div className="flex  w-12/12 h-12/12">
            <h5 className="line-clamp-3 overflow-hidden ">
              Descrição: {description}
            </h5>
          </div>
        </div>
      </div>
      <Button onClick={onClick} children={children} />
    </div>
  );
};
export default Card;

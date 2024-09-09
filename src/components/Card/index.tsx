import Button from "../../components/Button";
import { FiCalendar, FiClipboard } from "react-icons/fi";

export interface ITasks {
  id?: string;
  title: string;
  description: string;
  createdAt: string;
  onClick: () => void;
  onDelete?: () => void;
  onUpdate?: () => void;
  children: string;
  editButton: boolean;
}

const Card = ({
  title,
  description,
  onClick,
  createdAt,
  children,
  onDelete,
  onUpdate,
  editButton,
}: ITasks) => {
  const newDate = new Date(createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-lg flex flex-col justify-between w-[250px] h-[250px] p-4 shadow-md shadow-black/30 border border-black text-black mt-3 mr-7">
      <div>
        <div className="flex justify-between items-center">
          <div>
            <span className="flex justify-start text-lg ">
              {" "}
              <FiClipboard className="m-1" /> {title}
            </span>
          </div>
          <div className="w-2/12 flex m-none">
            <Button children={"x"} onClick={onDelete} />
          </div>
        </div>
        <hr className="w-11/12 my-4 border-t border-gray-300" />
        <div className="flex flex-col ">
          <time className="flex font-bold">
            {" "}
            <FiCalendar className="m-1" />
            <span>{newDate}</span>
          </time>
          <div className="flex w-12/12 h-12/12">
            <h5 className="line-clamp-3 overflow-hidden ">
              Descrição: {description}
            </h5>
          </div>
        </div>
      </div>
      <div className="flex gap-1">
        {editButton && <Button onClick={onUpdate} children={"Editar"} />}
        <Button onClick={onClick} children={children} />
      </div>
    </div>
  );
};
export default Card;

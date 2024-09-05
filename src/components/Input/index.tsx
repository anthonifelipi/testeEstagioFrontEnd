

const Input = ({
  label,
  icon: Icon,
  register,
  name,
  error = "",
  ...rest
}: any) => {
  
  return (
    <div className="container text-left">
      <div className="mb-2">
        {label} {!!error && <span className="text-red-500"> - {error} </span>}
      </div>
      <div
        className={`bg-white rounded-lg border-2 p-4 w-full flex transition duration-400 ${
          !!error
            ? "border-red-500 text-red-500"
            : "border-gray-500 text-gray-500"
        }`}
      >
        {Icon && <Icon size={20} />}
        <input
          className="bg-transparent flex-1 border-0 text-black placeholder-gray-500"
          {...register(name)}
          {...rest}
        />
      </div>
    </div>
  );
};

export default Input;

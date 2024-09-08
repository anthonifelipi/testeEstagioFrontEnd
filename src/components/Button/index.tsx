interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  whiteSchema?: boolean;
  type?: "button" | "submit" | "reset";
}
const Button = ({
  onClick,
  children,
  whiteSchema,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`h-11 rounded-lg border-2 border-black font-['Roboto_Mono'] mt-4 w-full transition duration-500 hover:border-[#c85311] ${
        whiteSchema
          ? "bg-[#f5f5f5] text-[#0c0d0d]"
          : "bg-[#0c0d0d] text-[#f5f5f5]"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;

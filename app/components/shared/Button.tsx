import { FC, PropsWithChildren } from "react";

interface ButtonProps {
  onClick: () => void;
  text?: string;
  className?: string;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  onClick,
  text,
  className = "",
  children,
}) => {
  return (
    <button
      className={`${className} flex items-center justify-center`}
      onClick={onClick}
    >
      {text || ""}
      {children}
    </button>
  );
};

export default Button;

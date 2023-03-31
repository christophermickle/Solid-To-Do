import { Component, JSX } from "solid-js";

type ParentProps<P = {}> = P & { children?: JSX.Element };

interface ButtonProps {
  type: "button" | "submit" | "reset";
  onClick: () => void;
}

const Button: Component<ParentProps<ButtonProps>> = (props) => {
  return (
    <button type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;

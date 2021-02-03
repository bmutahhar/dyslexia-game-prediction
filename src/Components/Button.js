import React from "react";
import "./styles/Button.css";

const STYLES = ["btn--primary", "btn--outline"];

const SIZES = [
  "btn--large",
  "btn--medium",
  "btn--mobile",
  "btn--wide",
  "btn--small",
];

const COLORS = ["primary", "blue", "green", "red"];

const Button = ({
  children,
  type,
  onClick,
  onSubmit,
  buttonStyle,
  buttonSize,
  buttonColor,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonColor = COLORS.includes(buttonColor)
    ? buttonColor
    : COLORS[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonColor}`}
      onClick={onClick}
      onSubmit={onSubmit}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
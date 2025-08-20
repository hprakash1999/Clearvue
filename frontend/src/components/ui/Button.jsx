const Button = ({ children, variant = "primary", onClick, className }) => {
  // Button variant styles definition
  switch (variant) {
    case variant === "primary":
      break;

    case variant === "secondary":
      break;

    default:
      break;
  }

  return (
    <button className={`${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

import { Button as MantineButton } from "@mantine/core";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "filled" | "outline" | "light";
  color?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

function Button({
  children,
  onClick,
  variant = "filled",
  color = "blue",
  size = "sm",
}: ButtonProps) {
  return (
    <MantineButton onClick={onClick} variant={variant} color={color}>
      {children}
    </MantineButton>
  );
}

export default Button;

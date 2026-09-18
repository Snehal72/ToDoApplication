import { Button as MantineButton } from "@mantine/core";
import type { ButtonProps as MantineButtonProps } from "@mantine/core";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "filled" | "outline" | "light";
  color?: string;
  size?: MantineButtonProps["size"];
}

function Button({
  children,
  onClick,
  variant = "filled",
  color = "blue",
  size = "sm",
}: ButtonProps) {
  return (
    <MantineButton
      size={size}
      px="xs"
      onClick={onClick}
      variant={variant}
      color={color}
    >
      {children}
    </MantineButton>
  );
}

export default Button;

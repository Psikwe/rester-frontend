export type IButton = {
  type?: "button" | "reset" | "submit";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
};

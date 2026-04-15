import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-gradient-to-br from-[var(--primary)] to-[var(--primary-container)] text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-[var(--primary)]/25",
    secondary: "bg-[var(--surface-container-high)] text-[var(--on-surface)] hover:bg-[var(--surface-container)]",
    outline: "border-2 border-[var(--outline-variant)] text-[var(--on-surface)] hover:border-[var(--primary)] hover:text-[var(--primary)]",
    ghost: "text-[var(--on-surface)] hover:bg-[var(--surface-container-low)]"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl"
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
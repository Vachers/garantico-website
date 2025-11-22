import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  const baseStyles = "font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-primary-ocean text-white hover:bg-primary-accent focus:ring-primary-ocean",
    secondary: "bg-success-green text-white hover:bg-emerald-700 focus:ring-success-green",
    outline: "border-2 border-primary-ocean text-primary-ocean hover:bg-primary-ocean hover:text-white focus:ring-primary-ocean",
    ghost: "text-primary-ocean hover:bg-primary-light/10 focus:ring-primary-ocean",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};


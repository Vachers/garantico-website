import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "default" | "elevated" | "outlined";
}

export const Card: React.FC<CardProps> = ({ children, className, hover = false, variant = "default" }) => {
  const variants = {
    default: "bg-white shadow-md border border-gray-200",
    elevated: "bg-white shadow-xl border border-gray-100",
    outlined: "bg-white border-2 border-gray-200",
  };

  return (
    <div
      className={cn(
        "rounded-xl p-6",
        variants[variant],
        hover && "hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return <div className={cn("mb-4", className)}>{children}</div>;
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => {
  return (
    <h3 className={cn("text-xl font-bold text-text-dark", className)}>
      {children}
    </h3>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return <div className={cn("text-text-light", className)}>{children}</div>;
};


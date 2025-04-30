"use client";
import React from "react";

type Props = {
  title: string;
  className?: string;
  onSubmit?: () => void;
  children: React.ReactNode;
};

const AuthFormLayout = ({
  children,
  title = "",
  className = "",
  onSubmit = () => {},
}: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex items-center justify-center bg-indigo-400 dark:bg-gray-900 px-4"
    >
      <div
        className={`w-full max-w-[380px] bg-white dark:bg-gray-800 space-y-4 p-6 rounded-lg shadow-lg ${className}`}
      >
        <h2 className="uppercase text-xl font-bold text-center text-gray-800 dark:text-white mb-6">
          {title}
        </h2>
        {children}
      </div>
    </form>
  );
};

export default AuthFormLayout;

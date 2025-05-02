"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import AuthFormLayout from "@/app/component/layout/AuthFormLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import CommonSelect from "@/app/component/common/CommonSelect";
import { handleInputChange } from "@/app/lib/constant";
import CommonModal, { ModalStatus } from "@/app/component/common/CommonModal";
import Cookies from "js-cookie";
import { useControllerLogin } from "@/app/api/api";

const Login = () => {
  // Dynamic form state initialization
  const [form, setForm] = useState({
    role: "STUDENT",
    email: "",
    password: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<{
    message: string;
    status: ModalStatus;
  }>({
    message: "",
    status: "success",
  });

  // Options for the role selection
  const options = [
    { label: "Student", value: "STUDENT" },
    { label: "Instructor", value: "INSTRUCTOR" },
    { label: "Admin", value: "ADMIN" },
  ];

  // Handle form submission
  const onSubmit = () => {
    useControllerLogin(form)
      .then((res) => {
        Cookies.set("token", res.token);
        setModalMessage({
          status: res?.status,
          message: res?.message,
        });
        setIsOpen(true);
      })
      .catch((err) => {
        setModalMessage({
          status: err?.status,
          message: err?.message,
        });
        setIsOpen(true);
      });
  };

  return (
    <>
      <AuthFormLayout onSubmit={onSubmit} title="Login">
        <Input
          required
          type="text"
          name="email"
          value={form.email}
          placeholder="Email"
          className="shadow-none rounded"
          onChange={(e) => handleInputChange(e, setForm)}
        />
        <Input
          required
          type="password"
          name="password"
          value={form.password}
          placeholder="Password"
          className="shadow-none rounded"
          onChange={(e) => handleInputChange(e, setForm)}
        />
        <CommonSelect
          items={options}
          defaultValue={form.role}
          placeholder="Select Role"
          onChange={(value) => setForm({ ...form, role: value })}
        />
        <div className="flex items-center space-x-2 cursor-pointer">
          <Checkbox id="terms" className="cursor-pointer" />
          <label
            htmlFor="terms"
            className="user-select-none text-xs cursor-pointer font-medium text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
        <Button className="w-full cursor-pointer mt-2">Login</Button>

        <Label className="text-xs text-center w-full flex gap-1 items-center justify-center">
          Don't you have an account?
          <Button
            asChild
            className="p-0 leading-normal h-auto text-xs"
            variant="link"
          >
            <Link href="/signup">Signup</Link>
          </Button>
        </Label>
      </AuthFormLayout>

      <CommonModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title={`Login ${
          modalMessage?.status?.charAt(0).toUpperCase() +
          modalMessage?.status?.slice(1)
        }`}
        variant={modalMessage?.status}
        footer={
          <Button className="cursor-pointer" onClick={() => setIsOpen(false)}>
            Ok
          </Button>
        }
      >
        <p className="text-gray-500">{modalMessage?.message}</p>
      </CommonModal>
    </>
  );
};

export default Login;

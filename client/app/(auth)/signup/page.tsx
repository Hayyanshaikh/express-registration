"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import AuthFormLayout from "@/app/component/layout/AuthFormLayout";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import CommonSelect from "@/app/component/common/CommonSelect";
import { handleInputChange, USER_ROLE_OPTIONS } from "@/app/lib/constant";
import CommonModal from "@/app/component/common/CommonModal";
import { useControllerSignup } from "@/app/api/api";
import CommonButton from "@/app/component/common/CommonButton";
import { ModalMessageState } from "@/app/types";
import { Login } from "@/app/api/types";

const Signup = () => {
  // Dynamic form state initialization
  const [form, setForm] = useState<Login>({
    name: "",
    role: "STUDENT",
    email: "",
    password: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<ModalMessageState>({
    message: "",
    status: "success",
  });

  const { mutateAsync: signup } = useControllerSignup();

  // Handle form submission
  const onSubmit = () => {
    signup(form)
      .then((res) => {
        setModalMessage({
          status: res?.status,
          message: res?.message,
        });
        setIsOpen(true);
      })
      .catch((err) => {
        setModalMessage({
          status: err?.response?.data?.status,
          message: err?.response?.data?.message,
        });
        setIsOpen(true);
      });
  };

  return (
    <>
      <AuthFormLayout onSubmit={onSubmit} title="Signup">
        <Input
          required
          type="text"
          name="name"
          value={form.name}
          placeholder="Name"
          className="shadow-none rounded"
          onChange={(e) => handleInputChange(e, setForm)}
        />
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
          items={USER_ROLE_OPTIONS}
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
        <CommonButton type="submit" className="w-full cursor-pointer mt-2">
          Signup
        </CommonButton>

        <Label className="text-xs text-center w-full flex gap-1 items-center justify-center">
          Already have account?
          <CommonButton
            variant="link"
            className="p-0 leading-normal h-auto text-xs"
          >
            <Link href="/login">Login</Link>
          </CommonButton>
        </Label>
      </AuthFormLayout>

      <CommonModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Signup ${modalMessage?.status}`}
        variant={modalMessage?.status}
      >
        <p className="text-gray-500">{modalMessage?.message}</p>
      </CommonModal>
    </>
  );
};

export default Signup;

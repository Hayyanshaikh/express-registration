"use client";
import React, { useState } from "react";
import AuthFormLayout from "@/app/component/layout/AuthFormLayout";
import Link from "next/link";
import CommonSelect from "@/app/component/common/CommonSelect";
import { handleInputChange, USER_ROLE_OPTIONS } from "@/app/lib/constant";
import CommonModal from "@/app/component/common/CommonModal";
import Cookies from "js-cookie";
import { useControllerLogin } from "@/app/api/api";
import { useRouter } from "next/navigation";
import CommonButton from "@/app/component/common/CommonButton";
import { ModalMessageState } from "@/app/types";
import CommonInput from "@/app/component/common/CommonInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Login = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<ModalMessageState>({
    message: "",
    status: "success",
  });

  const [form, setForm] = useState({
    role: "STUDENT",
    email: "",
    password: "",
  });

  const { mutateAsync: login } = useControllerLogin();

  const onSubmit = () => {
    login(form)
      .then((res) => {
        Cookies.set("token", res.token);
        Cookies.set("user", JSON.stringify(res.data));
        router.push("/");
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
      <AuthFormLayout onSubmit={onSubmit} title="Login">
        <CommonInput
          name="email"
          type="text"
          value={form.email}
          placeholder="Email"
          required
          onChange={(e) => handleInputChange(e, setForm)}
        />
        <CommonInput
          name="password"
          type="password"
          value={form.password}
          placeholder="Password"
          required
          onChange={(e) => handleInputChange(e, setForm)}
        />
        <CommonSelect
          items={USER_ROLE_OPTIONS}
          defaultValue={form.role}
          placeholder="Select Role"
          onChange={(value) => setForm({ ...form, role: value })}
        />
        <div className="flex items-center space-x-2 cursor-pointer">
          <Checkbox id="remember" className="cursor-pointer" />
          <label
            htmlFor="remember"
            className="text-xs cursor-pointer font-medium text-gray-600 leading-none"
          >
            Remember me
          </label>
        </div>
        <CommonButton type="submit" className="w-full cursor-pointer mt-2">
          Login
        </CommonButton>

        <Label className="text-xs text-center w-full flex gap-1 items-center justify-center">
          Don&apos;t you have an account?
          <CommonButton
            variant="link"
            className="p-0 leading-normal h-auto text-xs"
          >
            <Link href="/signup">Signup</Link>
          </CommonButton>
        </Label>
      </AuthFormLayout>

      <CommonModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Login ${modalMessage?.status}`}
        variant={modalMessage?.status}
      >
        <p className="text-gray-500">{modalMessage?.message}</p>
      </CommonModal>
    </>
  );
};

export default Login;

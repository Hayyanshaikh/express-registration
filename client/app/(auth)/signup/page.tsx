"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import AuthFormLayout from "@/app/component/layout/AuthFormLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import CommonSelect from "@/app/component/common/CommonSelect";

const Login = () => {
  const options = [
    { label: "Student", value: "STUDENT" },
    { label: "Instructor", value: "INSTRUCTOR" },
    { label: "Admin", value: "ADMIN" },
  ];

  return (
    <AuthFormLayout title="Login">
      <Input type="text" placeholder="Email" className="shadow-none rounded" />
      <Input
        type="password"
        placeholder="Password"
        className="shadow-none rounded"
      />
      <CommonSelect
        items={options}
        defaultValue="STUDENT"
        placeholder="Select Role"
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
      <Button className="w-full cursor-pointer mt-2">Signup</Button>

      <Label className="text-xs text-center w-full flex gap-1 items-center justify-center">
        Already have account?
        <Button
          asChild
          className="p-0 leading-normal h-auto text-xs"
          variant="link"
        >
          <Link href="/login">Login</Link>
        </Button>
      </Label>
    </AuthFormLayout>
  );
};

export default Login;

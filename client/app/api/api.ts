import { Login } from "./types";
import {
  FindAllCoursesEndpoint,
  LoginEndpoint,
  MenuEndpoint,
  SignupEndpoint,
} from "./endpoints";
import axiosInstance from "./axiosInstance";
import { useQuery, useMutation } from "@tanstack/react-query";

// API call to login
const loginFn = async (payload: Login) => {
  const response = await axiosInstance.post(LoginEndpoint, payload);
  return response.data;
};

// API call to signup
const signupFn = async (payload: Login) => {
  const response = await axiosInstance.post(SignupEndpoint, payload);
  return response.data;
};

// API call to fetch courses
const fetchCourses = async () => {
  const response = await axiosInstance.get(FindAllCoursesEndpoint);
  return response.data;
};

// API call to fetch courses
// API call to fetch menus with role
const fetchMenus = async (role: string) => {
  const response = await axiosInstance.get(`${MenuEndpoint}/${role}`);
  return response.data;
};

// React Query hook: Login
export const useControllerLogin = () => {
  return useMutation({ mutationFn: loginFn });
};

// React Query hook: Signup
export const useControllerSignup = () => {
  return useMutation({ mutationFn: signupFn });
};

// React Query hook: Find All Courses
export const useControllerFindAllCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });
};

// React Query hook: Fetch Menus
export const useControllerFindAllMenus = (role: string) => {
  return useQuery({
    queryKey: ["menus", role], // We add role to queryKey to refetch when role changes
    queryFn: () => fetchMenus(role), // Pass role to fetchMenus function
  });
};

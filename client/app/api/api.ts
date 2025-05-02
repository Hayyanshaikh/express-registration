import { Login } from "./types";
import { LoginEndpoint, SignupEndpoint } from "./endpoints";
import axiosInstance from "./axiosInstance";

// API call to fetch services
export const useControllerLogin = async (payload: Login) => {
  try {
    const response = await axiosInstance.post(LoginEndpoint, payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const useControllerSignup = async (payload: Login) => {
  try {
    const response = await axiosInstance.post(SignupEndpoint, payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

import axios, { AxiosInstance } from "axios";
import { useState } from "react";

export const BASE_URL = `https://3.27.190.204/`;

const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    async (config) => {
        try {
            return config;
        } catch (error) {
            return Promise.reject(error);
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default api;

export type APIStatus = "loading" | "success" | "failed" | "";

export const useServerStatus = () => {
    const [apiStatus, setApiStatus] = useState<APIStatus>("");

    return { apiStatus, setApiStatus };
};

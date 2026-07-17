import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../lib/axios";
import type { AxiosError } from "axios";

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (data: { firstName: string, lastName: string, email: string, password: string, phone: string }, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/register", data);
            return res.data;
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>
            return rejectWithValue(
                error.response?.data?.message || "failed to register"
            );
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (data: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/login", data);
            return res.data;

        } catch (err) {
            const error = err as AxiosError<{ message: string }>
            return rejectWithValue(error.response?.data?.message || "failed to login");
        }
    }
)
import { useState } from "react";
import axios from "axios";
import { BASE_URL, showToast, styleConsole } from "../../util/helper/Helper";


export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const userLogin = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.post(`${BASE_URL}auth/login`, { email, password },
                { headers: { "Content-Type": "application/json" } }
            );
            return data;
        } catch (error) {
            styleConsole("🚀 ~ useAuth.js:19 ~ userLogin ~ error:", "userLogin", error.message)
            setError(error.message);
            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };
        } finally {
            setLoading(false);
        }
    };

    const userRegister = async (name, email, password, dateOfBirth, mobile) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.post(`${BASE_URL}auth/register`, { email, password, name, dateOfBirth, mobile },
                { headers: { "Content-Type": "application/json" } }
            );
            return data;
        } catch (error) {
            styleConsole("🚀 ~ useAuth.js:36 ~ userRegister ~ error:", "userRegister", error.message)
            setError(error.message);
            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };
        } finally {
            setLoading(false);
        }
    };


    const varifyOTP = async (email, otp) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.post(`${BASE_URL}auth/varifyotp`, { email, otp },
                { headers: { "Content-Type": "application/json" } }
            );
            return data;
        } catch (error) {
            styleConsole("🚀 ~ useAuth.js:54 ~ varifyOTP ~ error:", "varifyOTP", error.message)
            setError(error.message);
            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };
        } finally {
            setLoading(false);
        }
    };


    const getAllLocker = async (limit, page, token = "") => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${BASE_URL}auth/getLocker`, {
                params: { limit, page },
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            });
            return data;
        } catch (error) {
            styleConsole("🚀 ~ useAuth.js:75 ~ getAllLocker ~ error:", "getAllLocker", error.message)
            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };
        } finally {
            setLoading(false);
        }
    };


    const getLockerById = async (id, token = "") => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${BASE_URL}auth/getlockerbyid/${id}`, {
                params: { limit, page },
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            });
            return data;
        } catch (error) {
            styleConsole("🚀 ~ useAuth.js:95 ~ getLockerById ~ error:", "get by id", error.message)
            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };
        } finally {
            setLoading(false);
        }
    };


    const pregetAllLocker = async (search) => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}previous/previousAllLocker`, {
                params: search ? { search } : {},
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return response.data;
        } catch (error) {
            styleConsole("🚀 ~ useAuth.js:115 ~ pregetAllLocker ~ error:", "pregetAllLocker", error.message);
            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };
        } finally {
            setLoading(false);
        }
    };


    const preGetById = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}previous/getbyid/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return response.data;
        } catch (error) {
            styleConsole("🚀 ~ useAuth.js:134 ~ preGetById ~ error:", error.message)
            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };
        } finally {
            setLoading(false);
        }
    };


    const getAdminLocker = async (page, limit) => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}admin/adminGetAllLocker`, {
                params: { page, limit },
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return response.data;
        } catch (error) {
            console.log("🚀 ~ useAuth.js:153 ~ getAdminLocker ~ error:", error.message)

            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };
        } finally {
            setLoading(false);
        }
    };

    const adminGetById = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}admin/getAdminLockerById/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return response.data;
        } catch (error) {
            styleConsole("🚀 ~ useAuth.js:173 ~ adminGetById ~ error:", error.message)

            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };
        } finally {
            setLoading(false);
        }
    };



    const adminUpdateById = async (id, data) => {
        setLoading(true);
        try {
            const response = await axios.put(`${BASE_URL}admin/updatebyid/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data;
        } catch (error) {
            styleConsole("🚀 ~ useAuth.js:194 ~ adminUpdateById ~ error:", error.message)
            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };
        } finally {
            setLoading(false);
        }
    };


    const preAdminUpdate = async (sr_no, locker_no, code, name, status, mobile, department, shoe_size, public_id, url, before) => {
        setLoading(true);
        try {
            const { data } = await axios.put(`${BASE_URL}previous/adminpreupdate`, { sr_no, locker_no, code, name, status, mobile, department, shoe_size, public_id, url, before },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return data;
        } catch (error) {
            console.log("🚀 ~ useAuth.js:215 ~ previosUpdateLocker ~ error:", error)
            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };
        }
        finally {
            setLoading(false);
        }
    };


    const preGetAdminLocker = async (search) => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}previous/preAdmin`, {
                params: search ? { search } : {},
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return response.data;
        } catch (error) {
            console.log("🚀 ~ useAuth.js:236 ~ preGetAdminLocker ~ error:", error.message)

            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };
        } finally {
            setLoading(false);
        }
    };

    const preAdminGetById = async (id) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${BASE_URL}previous/getPreAdminById/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return data;
        } catch (error) {
            styleConsole("🚀 ~ useAuth.js:255 ~ preAdminGetById ~ error:", error.message)
            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };
        } finally {
            setLoading(false);
        }
    };


    const searchAdmin = async (search) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${BASE_URL}admin/search/?search=${search}`,
                {

                    headers: {
                        "Content-Type": "Application/json",
                    },
                }
            );
            return data;
        } catch (error) {
            console.log("🚀 ~ useAuth.js:276 ~ searchLocker ~ error:", error)
            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };

        } finally {
            setLoading(false);
        }
    };

    const searchLocker = async (search, token = "") => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${BASE_URL}auth/search/?search=${search}`,
                {

                    headers: {
                        "Content-Type": "Application/json",
                        ...(token && { Authorization: `Bearer ${token}` }),

                    },
                }
            );
            return data;
        } catch (error) {
            console.log("🚀 ~ useAuth.js:299 ~ searchLocker ~ error:", error.message)
            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };
        } finally {
            setLoading(false);
        }
    };

    const GetGoggle = async (search, page, limit) => {
        setLoading(true);
        try {

            const params = {};

            if (search) params.search = search;
            if (page) params.page = page;
            if (limit) params.limit = limit;

            const response = await axios.get(`${BASE_URL}goggle/goggle`, {
                params,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return response.data;
        } catch (error) {
            console.log("🚀 ~ useAuth.js:318 ~ GetGoggle ~ error:", error.message)

            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };
        } finally {
            setLoading(false);
        }
    };

    const createGoggle = async (name, emp_code, employer, department, issue_quantity) => {
        setLoading(true);
        try {
            const { data } = await axios.post(`${BASE_URL}goggle/createGoggle`, { name, emp_code, employer, department, issue_quantity },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return data;
        } catch (error) {
            console.log("🚀 ~ useAuth.js:345 ~ createGoggle ~ error:", error)
            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };
        }
        finally {
            setLoading(false);
        }
    };

    const GetShoe = async (search, page, limit) => {
        setLoading(true);
        try {

            const params = {};

            if (search) params.search = search;
            if (page) params.page = page;
            if (limit) params.limit = limit;

            const response = await axios.get(`${BASE_URL}goggle/shoe`, {
                params,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return response.data;
        } catch (error) {
            console.log("🚀 ~ useAuth.js:372 ~ GetLocker ~ error:", error)

            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };
        } finally {
            setLoading(false);
        }
    };


    const createShoes = async (name, emp_code, employer, department, issue_quantity, mobile, shoe_size) => {
        setLoading(true);
        try {
            const { data } = await axios.post(`${BASE_URL}goggle/createShoe`, { name, emp_code, employer, department, issue_quantity, mobile, shoe_size },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return data;
        } catch (error) {
            console.log("🚀 ~ useAuth.js:393 ~ createShoe ~ error:", error)
            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };
        }
        finally {
            setLoading(false);
        }
    };


    const deleteShoes = async (id) => {
        setLoading(true);
        try {
            const { data } = await axios.delete(`${BASE_URL}goggle/deletebyid/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return data;
        } catch (error) {
            console.log("🚀 ~ useAuth.js:414 ~ deleteShoes ~ error:", error)
            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };
        }
        finally {
            setLoading(false);
        }
    };

    const deleteGoggle = async (id) => {
        setLoading(true);
        try {
            const { data } = await axios.delete(`${BASE_URL}goggle/deleteGoggleById/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return data;
        } catch (error) {
            console.log("🚀 ~ useAuth.js:414 ~ deleteShoes ~ error:", error)
            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };
        }
        finally {
            setLoading(false);
        }
    };


    const updateLockerById = async (code, name, role, status, mobile, department, shoe_size, aadhar, address, isLeft, id, token = "") => {
        setLoading(true);
        try {
            const { data } = await axios.put(`${BASE_URL}auth/updatelocker/${id}`, { code, name, role, status, mobile, department, shoe_size, aadhar, address, isLeft },
                {
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { Authorization: `Bearer ${token}` }),
                    },
                }
            );
            return data;
        } catch (error) {
            console.log("🚀 ~ useAuth.js:456 ~ updateLockerById ~ error:", error)
            return error.response?.data || { message: "An unexpected error occurred || port is wrong" };
        } finally {
            setLoading(false);
        }
    };


    return {
        userLogin,
        userRegister,
        loading,
        error,
        varifyOTP,
        getAllLocker,
        getLockerById,
        pregetAllLocker,
        preGetById,
        getAdminLocker,
        adminGetById,
        adminUpdateById,
        preAdminUpdate,
        preGetAdminLocker,
        preAdminGetById,
        searchAdmin,
        searchLocker,
        GetGoggle,
        createGoggle,
        createShoes,
        GetShoe,
        deleteShoes,
        deleteGoggle,
        updateLockerById
    };
};

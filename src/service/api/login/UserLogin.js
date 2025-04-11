import axios from "axios";
import { BASE_URL } from "../../../util/helper/Helper";



export const userLogin = async (email, password) => {
    try {
        const { data } = await axios.post(`${BASE_URL}auth/login`, { email, password },
            { headers: { "Content-Type": "application/json" } }
        );
        return data;
    } catch (error) {
        console.log("🚀 ~ UserLogin.js:13 ~ userLogin ~ error:", error)
        if (!error.response?.data) {
            return { message: "An unexpected error occurred || port is wrong" };
        }
        return error.response?.data;
    }
};


export const userRegister = async (name, email, password, dateOfBirth, mobile) => {
    try {
        const { data } = await axios.post(`${BASE_URL}auth/register`, { name, email, password, dateOfBirth, mobile },
            { headers: { "Content-Type": "application/json" } }
        );
        return data;
    } catch (error) {
        console.log("🚀 ~ UserLogin.js:29 ~ userRegister ~ error:", error)
        if (!error.response?.data) {
            return { message: "An unexpected error occurred || port is wrong" };
        }
        return error.response?.data;
    }
};




export const previosUpdateLocker = async (combine, sr_no, location, locker_no, unit, code, name, role, status, mobile, department, shoe_size, aadhar, address, public_id, url) => {
    try {
        const { data } = await axios.put(`${BASE_URL}previous/updatebyid`, { combine, sr_no, location, locker_no, unit, code, name, role, status, mobile, department, shoe_size, aadhar, address, public_id, url },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return data;
    } catch (error) {
        console.log("🚀 ~ UserLogin.js:69 ~ userRegister ~ error:", error)
        if (!error.response?.data) {
            return { message: "An unexpected error occurred || port is wrong" };
        }
        return error.response?.data;
    }
};


export const getLokerById = async (id, token = "") => {
    try {
        const { data } = await axios.get(`${BASE_URL}auth/getlockerbyid/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` }),

                },
            }
        );
        return data;
    } catch (error) {
        console.log("🚀 ~ UserLogin.js:91 ~ getLokerById ~ error:", error)
        if (!error.response?.data) {
            return { message: "An unexpected error occurred || port is wrong" };
        }
        return error.response?.data;
    }
};



export const updatePhoto = async (id, token = "", formData) => {
    try {
        const { data } = await axios.put(`${BASE_URL}auth/updateUserPhoto/${id}`, formData,
            {

                headers: {
                    "Content-Type": "multipart/form-data",
                    ...(token && { Authorization: `Bearer ${token}` }),

                },
            }
        );
        return data;
    } catch (error) {
        console.log("🚀 ~ UserLogin.js:115 ~ getLokerById ~ error:", error)
        if (!error.response?.data) {
            return { message: "An unexpected error occurred || port is wrong" };
        }
        return error.response?.data;
    }
};



export const searchLocker = async (search, token = "") => {
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
        console.log("🚀 ~ UserLogin.js:139 ~ getLokerById ~ error:", error)
        if (!error.response?.data) {
            return { message: "An unexpected error occurred || port is wrong" };
        }
        return error.response?.data;
    }
};
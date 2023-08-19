import axios from "axios";

export const mainAPI = axios.create({
    baseURL: "http://127.0.0.1:8000/",
});

export default {
    mainAPI,
};
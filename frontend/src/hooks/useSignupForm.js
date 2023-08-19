import { useState } from "react";
import { mainAPI } from "../api/axios";
import axios from "axios";

export default function useSignupForm() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [cpasswordError, setCpasswordError] = useState("");

    const getterPair = {
        email,
        name,
        password,
        cpassword,
        emailError,
        nameError,
        passwordError,
        cpasswordError,
    };
    const setterPair = {
        setEmail,
        setName,
        setPassword,
        setCpassword,
        setEmailError,
        setNameError,
        setPasswordError,
        setCpasswordError,
    };

    const signupForm = {
        ...getterPair,
        ...setterPair,
        clear() {
            const setters = [setEmail, setName, setPassword, setCpassword];
            for (let set of setters) {
                set("");
            }
        },
    };

    const trimExtraSpace = (value = "") => {
        return value.trim().split(" ").filter((v) => v !== "").join(" ");
    }

    const errorMessageGenerator = {
        emailError(value = signupForm.email) {
            const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return value.length === 0 ? "*Email harus diisi"
                : !emailRegex.test(value) ? "*Email tidak valid"
                : "";
        },

        nameError(value = signupForm.name) {
            const nameRegex = /[a-zA-Z ]+/;
            return value.length === 0 ? "*Nama wajib diisi"
                : !nameRegex.test(value) ? "Nama tidak valid"
                : "";
        },

        passwordError(value = signupForm.password) {
            return value.length === 0 ? "*Password harus diisi"
                : /\s/g.test(value) ? "*Password tidak boleh menggunakan spasi"
                : value.length < 8 ? "*Password minimal 8 karakter"
                : "";
        },

        cpasswordError(value = signupForm.cpassword) {
            return value.length === 0 ? "*Konfirmasi password harus diisi"
                : /\s/g.test(value) ? "*Konfirmasi password tidak boleh menggunakan spasi"
                : value.length < 8 ? "*Konfirmasi password minimal 8 karakter"
                : "";
        }
    };

    const validate = (callback = Function(), errCallback = Function()) => {
        const errorObj = { emailError: "", nameError: "", passwordError: "", cpasswordError: "" };
        const errorSetters = [setEmailError, setNameError, setPasswordError, setCpasswordError];
        const errorObjKeys = Object.keys(errorObj);
        const inputs = [email, name, password, cpassword];
        for (let i = 0; i < inputs.length; i++) {
            const [key, value] = [errorObjKeys[i], trimExtraSpace(inputs[i])];
            const errorMessage = errorMessageGenerator[key](value);
            errorObj[key] = errorMessage;
            errorSetters[i](errorMessage);
        }
        const isFormError = Boolean(errorObj.emailError || errorObj.nameError || errorObj.passwordError || errorObj.cpasswordError);
        !isFormError ? callback() : errCallback(errorObj);
    };

    const submitForm = () => {
        const payload = { email, name, password };
        const config = {
            headers: {
                "X-CSRF-TOKEN": "KDRWSckjTSxiVN4uAz6DH7H1wLSh07YME3eWyX3c",
            },
        }
        axios.post("http://127.0.0.1:8000/signup", payload, config)
        .then((response) => {
            console.log(response?.data);
        });
    };

    return { signupForm, validate, submitForm };
}
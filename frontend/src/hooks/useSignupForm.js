import { useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import { mainAPI } from "../api/axios";

export default function useSignupForm() {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["otp_email"]);

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
        const inputSetters = [setEmail, setName, setPassword, setCpassword];
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            const [key, value] = [errorObjKeys[i], trimExtraSpace(input)];
            const errorMessage = errorMessageGenerator[key](value);
            inputSetters[i](trimExtraSpace(input));
            errorObj[key] = errorMessage;
            errorSetters[i](errorMessage);
        }
        const isFormError = Boolean(errorObj.emailError || errorObj.nameError || errorObj.passwordError || errorObj.cpasswordError);
        !isFormError ? callback() : errCallback(errorObj);
    };

    const setPostErrors = (errorData) => {
        const setterPostError = {
            email: setEmailError,
            name: setNameError,
        };
        for (let key in errorData) {
            setterPostError[key](errorData[key]);
        }
    };

    const submitForm = () => {
        const payload = {
            email: trimExtraSpace(email),
            name: trimExtraSpace(name),
            password: trimExtraSpace(password),
        };
        mainAPI.post("/api/signup", payload).then((response) => {
            const { data } = response;
            const errorData = data?.error;
            const isError = errorData?.email || errorData?.name;
            if (isError) return setPostErrors(errorData);
            // setCookie(null, "", {
            //     expires
            // })
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        });
    };

    return { signupForm, validate, submitForm };
}
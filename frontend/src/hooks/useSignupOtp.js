import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { mainAPI } from "../api/axios";

export default function useSignupOtp() {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(["temp_user_data"]);
    const [otpInput, setOtpInput] = useState("");
    const [otpError, setOtpError] = useState("");
    const signupOtp = {
        otp: otpInput,
        otpError,
        setOtp: setOtpInput,
        setOtpError,
    }

    const trimExtraSpace = (value = "") => {
        return value.trim().split(" ").filter((v) => v !== "").join(" ");
    }

    const getCookieData = () => {
        const rawData = cookies.temp_user_data ?? "{}";
        const data = JSON.parse(decodeURIComponent(rawData));
        const email = data?.email ?? "";
        const name = data?.name ?? "";
        const password = data?.password ?? "";
        const output = { email, name, password };
        return output;
    };

    const submitForm = () => {
        const payload = {
            ...getCookieData(),
            otp: otpInput,
        };
    };

    return { signupOtp, submitForm };
}
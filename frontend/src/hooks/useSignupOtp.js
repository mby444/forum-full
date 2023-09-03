import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { mainAPI } from "../api/axios";

export default function useSignupOtp() {
    const navigate = useNavigate();
    const [cookies, setCookie, deleteCookie] = useCookies(["temp_user_data", "user_data"]);
    const [otpInput, setOtpInput] = useState("");
    const [otpError, setOtpError] = useState("");
    const signupOtp = {
        otp: otpInput,
        otpError,
        setOtp: setOtpInput,
        setOtpError,
    }

    const redirectWhenExpired = (callback = Function()) => {
        const isCookieExists = !!cookies.temp_user_data;
        if (!isCookieExists) return navigate("../../signup");
        callback(null);
    };

    useEffect(() => {
        redirectWhenExpired();
    }, []);

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

    const validate = (callback = Function(), errCallback = Function()) => {
        redirectWhenExpired();
        const otp = trimExtraSpace(otpInput);
        const errorMessage = otp.length === 0 ? "Kode OTP harus diisi" :
            otp.length !== 6 ? "Kode OTP harus 6 digit angka" : "";
        const isError = Boolean(errorMessage);
        if (isError) setOtpError(errorMessage);
        !isError ? callback() : errCallback(errorMessage);
    };

    const deleteOtpRecord = (token) => mainAPI.delete(`/api/signup/otp/${token}`);

    const submitForm = () => {
        // const cookieData = getCookieData();
        const cookieToken = cookies.temp_user_data ?? "";
        const payload = {
            token: cookieToken,
            otp: trimExtraSpace(otpInput),
        };

        if (!cookieToken) return navigate("../../signup");

        mainAPI.post("/api/signup/otp", payload).then(async (response) => {
            const { data } = response;

            const end = async (navigateTo = "/") => {
                await deleteOtpRecord(cookieToken);
                deleteCookie("temp_user_data");
                return navigate(navigateTo);
            };

            if (data?.shouldRedirect) return await end("../../signup");
            if (data?.error?.otp) return setOtpError(data?.error?.otp ?? "");
            
            end("/");
        });
    };

    return { signupOtp, validate, submitForm };
}
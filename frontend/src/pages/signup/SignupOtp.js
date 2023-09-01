import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import useSignupOtp from "../../hooks/useSignupOtp";

function SignupOtpResend({ countdown = 0 }) {
    const [count, setCount] = useState(countdown);

    const decrease = () => {

    };

    const handleResendBtn = () => {

    };

    useEffect(() => {

    }, []);

    if (count > 0) return (
        <div className="signup-otp-resend-text">Kirim ulang email dalam {count} detik</div>
    );

    return (
        <button className="signup-otp-resend-btn" onClick={handleResendBtn}>Kirim ulang email</button>
    );
}

export default function SignupOtp() {
    const { signupOtp } = useSignupOtp();

    const handleClickBtn = () => {

    };

    return (
        <div className="signup-otp-wrapper">
            <div className="signup-otp-container">
                <div className='signup-otp-header'>
                    <h3 className='signup-otp-header-text'>Verifikasi</h3>
                </div>
                <div className='signup-otp-body'>
                    <div className='signup-otp-input-container'>
                        <label className='signup-otp-input-label'>Kode OTP</label>
                        <input className='signup-otp-input' value={signupOtp.otp} onChange={(ev) => signupOtp.setOtp(ev.target.value)} />
                        <label className='signup-otp-input-error-label'>{signupOtp.otpError}</label>
                    </div>
                    <div className="signup-otp-resend-container">
                        <SignupOtpResend countdown={60} />
                    </div>
                    <div className="signup-otp-btn-container">
                        <button className='signup-otp-btn' onClick={handleClickBtn}>Verifikasi</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

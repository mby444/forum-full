import useSignupForm from "../../hooks/useSignupForm";

export default function Signup() {
    const { signupForm, validate, submitForm } = useSignupForm();

    const handleClickBtn = () => {
        validate(() => {
            submitForm();
        });
    };

    return (
        <div className="signup-wrapper">
            <div className="signup-container">
                <div className='signup-header'>
                    <h3 className='signup-header-text'>Daftar</h3>
                </div>
                <div className='signup-body'>
                    <div className='signup-input-container'>
                        <label className='signup-input-label'>Email</label>
                        <input className='signup-input' value={signupForm.email} onChange={(ev) => signupForm.setEmail(ev.target.value)} />
                        <label className='signup-input-error-label'>{signupForm.emailError}</label>
                    </div>
                    <div className='signup-input-container'>
                        <label className='signup-input-label'>Nama</label>
                        <input className='signup-input' value={signupForm.name} onChange={(ev) => signupForm.setName(ev.target.value)} />
                        <label className='signup-input-error-label'>{signupForm.nameError}</label>
                    </div>
                    <div className='signup-input-container'>
                        <label className='signup-input-label'>Kata Sandi</label>
                        <input className='signup-input' value={signupForm.password} onChange={(ev) => signupForm.setPassword(ev.target.value)} />
                        <label className='signup-input-error-label'>{signupForm.passwordError}</label>
                    </div>
                    <div className='signup-input-container'>
                        <label className='signup-input-label'>Konfirmasi Kata Sandi</label>
                        <input className='signup-input' value={signupForm.cpassword} onChange={(ev) => signupForm.setCpassword(ev.target.value)} />
                        <label className='signup-input-error-label'>{signupForm.cpasswordError}</label>
                    </div>
                    <div className="signup-btn-container">
                        <button className='signup-btn' onClick={handleClickBtn}>Daftar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

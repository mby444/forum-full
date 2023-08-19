export default function Login() {
    return (
      <div className="login-wrapper">
          <div className="login-container">
              <div className='login-header'>
                  <h3 className='login-header-text'>Masuk</h3>
              </div>
              <div className='login-body'>
                  <div className='login-input-container'>
                      <label className='login-input-label'>Email</label>
                      <input className='login-input' />
                  </div>
                  <div className='login-input-container'>
                      <label className='login-input-label'>Kata Sandi</label>
                      <input className='login-input' />
                  </div>
                  <div className="login-btn-container">
                    <button className='login-btn'>Masuk</button>
                  </div>
              </div>
          </div>
      </div>
    );
  }
  
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="title-container">
          <h1><Link to="/" className="title-link">Forum Random</Link></h1>
      </div>
      <div className="sign-btn-container">
        <Link to="/signup" className="sign-btn signup-btn">Daftar</Link>
        <Link to="/login" className="sign-btn login-btn">Masuk</Link>
      </div>
    </div>
  );
}